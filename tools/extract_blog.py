"""Extract blog posts (title, hero image, clean article HTML, meta) from the original pages.
usage: python3 tools/extract_blog.py <pagesDir> <meta.json> <specDir> <out.json>"""
import html, json, re, sys
from html.parser import HTMLParser

pages_dir, meta_path, spec_dir, out_path = sys.argv[1:]
meta = json.load(open(meta_path))
SLUGS = [
    "advanced-implant-surgery-severely-atrophic-maxilla",
    "how-much-do-dental-implants-cost-in-india",
    "how-much-does-wisdom-teeth-removal-cost-hyderbad",
]
KEEP = {"h1", "h2", "h3", "h4", "h5", "h6", "p", "ul", "ol", "li", "a", "strong", "em", "b", "i", "br", "img", "table", "thead", "tbody", "tr", "th", "td", "blockquote", "code", "hr"}
VOID = {"br", "img", "hr"}


class Grab(HTMLParser):
    """Collect every RichTextContainer's inner HTML (raw)."""

    def __init__(self):
        super().__init__(convert_charrefs=False)
        self.depth = 0
        self.cur = None
        self.found = []

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        raw = self.get_starttag_text()
        if self.cur is not None:
            if tag not in VOID:
                self.depth += 1
            self.cur.append(raw)
        elif a.get("data-framer-component-type") == "RichTextContainer":
            self.cur, self.depth = [], 1

    def handle_endtag(self, tag):
        if self.cur is None:
            return
        if tag in VOID:
            return
        self.depth -= 1
        if self.depth == 0:
            self.found.append("".join(self.cur))
            self.cur = None
        else:
            self.cur.append(f"</{tag}>")

    def handle_data(self, d):
        if self.cur is not None:
            self.cur.append(d)

    def handle_entityref(self, n):
        if self.cur is not None:
            self.cur.append(f"&{n};")

    def handle_charref(self, n):
        if self.cur is not None:
            self.cur.append(f"&#{n};")


class Clean(HTMLParser):
    """Keep semantic tags only; map links to site-relative paths; bold via style -> <strong>."""

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.out = []
        self.stack = []

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag not in KEEP:
            self.stack.append(None)
            return
        attr = ""
        if tag == "a":
            href = a.get("href") or ""
            href = re.sub(r"^(\.\./)+", "/", href)
            href = re.sub(r"^\./", "/blog/", href)
            ext = href.startswith("http")
            attr = f' href="{html.escape(href)}"' + (' target="_blank" rel="noopener noreferrer"' if ext else "")
        elif tag == "img":
            src = (a.get("src") or "").split("?")[0]
            name = src.rsplit("/", 1)[-1].rsplit(".", 1)[0]
            attr = f' src="/images/{name}.webp" alt="{html.escape(a.get("alt") or "")}" loading="lazy"'
        if tag in VOID:
            self.out.append(f"<{tag}{attr}>")
            return
        self.out.append(f"<{tag}{attr}>")
        self.stack.append(tag)

    def handle_endtag(self, tag):
        if tag in VOID:
            return
        t = self.stack.pop() if self.stack else None
        if t:
            self.out.append(f"</{t}>")

    def handle_data(self, d):
        self.out.append(html.escape(d, quote=False))


def clean(raw):
    c = Clean()
    c.feed(raw)
    h = "".join(c.out)
    h = re.sub(r"<(p|li|h\d)>\s*</\1>", "", h)
    return h.strip()


posts = []
for slug in SLUGS:
    src = open(f"{pages_dir}/blog__{slug}.html", encoding="utf-8").read()
    body = src[src.find("<body"):]
    g = Grab()
    g.feed(body)
    article = max(g.found, key=len)  # the post body is by far the longest rich text block
    spec = open(f"{spec_dir}/blog__{slug}.1280.txt", encoding="utf-8").read()
    title = re.search(r'h1 \| @\d+,\d+ \d+x\d+ \| T\[[^]]*center[^]]*\] "([^"]*)"', spec).group(1)
    hero = re.search(r"img \| @178,\d+ 924x\d+.*?src:(\S+)", spec)
    m = meta.get(f"blog__{slug}", {})
    posts.append({
        "slug": slug,
        "title": html.unescape(title),
        "heroImage": hero.group(1).rsplit(".", 1)[0] if hero else None,
        "metaTitle": m.get("title"),
        "metaDescription": m.get("desc"),
        "html": clean(article),
    })
    print(slug, "|", title, "|", posts[-1]["heroImage"], "|", len(posts[-1]["html"]), "chars")

# listing cards (title / excerpt / image) from the blog index spec
idx = open(f"{spec_dir}/blog.1280.txt", encoding="utf-8").read()
for p in posts:
    blk = idx[idx.find(f"href:./blog/{p['slug']}"):]
    p["cardImage"] = re.search(r"src:(\S+)", blk).group(1).rsplit(".", 1)[0]
    p["cardTitle"] = re.search(r'h3 \| [^"]*"([^"]*)"', blk).group(1)
    p["excerpt"] = re.search(r'^\s+p \| [^"]*"([^"]*)"', blk, re.M).group(1)

json.dump(posts, open(out_path, "w"), indent=1, ensure_ascii=False)
