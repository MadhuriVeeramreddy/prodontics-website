"""Extract treatment-page content from the original's 1280px spec dumps into JSON.
usage: python3 tools/extract_services.py <specDir> <meta.json> <out.json> page..."""
import json, re, sys

BRAND = "rgb(13, 141, 196)"
spec_dir, meta_path, out_path, *pages = sys.argv[1:]
meta = json.load(open(meta_path))

LINE = re.compile(r'^(\s*)(\w+) \| @(-?\d+),(-?\d+) (\d+)x(\d+)(.*?)\| T\[([^\]]+)\] "(.*)"$')
IMG = re.compile(r'^\s*img \| @(-?\d+),(-?\d+) (\d+)x(\d+).*src:(\S+)')

def accent(text, base_color):
    """{word|rgb} -> {word} when colour differs from the block's base colour."""
    def rep(m):
        return "{" + m.group(1) + "}" if m.group(2) != base_color else m.group(1)
    t = re.sub(r"\{([^|}]*)\|([^}]*)\}", rep, text)
    return re.sub(r"\}\s*\{", " ", t)  # merge adjacent accent words

def parse(page):
    items = []
    for raw in open(f"{spec_dir}/{page}.1280.txt", encoding="utf-8"):
        m = LINE.match(raw.rstrip("\n"))
        if m:
            ind, tag, x, y, w, h, _, font, text = m.groups()
            color = re.search(r"rgb\([^)]*\)", font).group(0)
            weight = int(re.search(r" w(\d+)", font).group(1))
            size = re.match(r'"?[^"]*"? ?(\d+)px', font.replace('"', ''))
            items.append(dict(kind="text", tag=tag, x=int(x), y=int(y), w=int(w), h=int(h), font=font, color=color, weight=weight,
                              text=text.replace("⏎", "\n").strip()))
            continue
        m = IMG.match(raw)
        if m:
            x, y, w, h, src = m.groups()
            items.append(dict(kind="img", x=int(x), y=int(y), w=int(w), h=int(h), src=src.rsplit(".", 1)[0]))
    return items

def clean(t):
    t = re.sub(r"[ \t\r\f\v]+", " ", t)
    t = re.sub(r" *\n *", "\n", t)
    return t.strip()

def hero_pad(page, w):
    """Bottom padding of the hero container at width w (px)."""
    for raw in open(f"{spec_dir}/{page}.{w}.txt", encoding="utf-8"):
        m = re.search(r"pad:(\d+)px \d+px (\d+)px \d+px", raw)
        if m and "section" not in raw and re.match(r"^\s{4,8}div", raw):
            return int(m.group(2))
    return 0

import os
def layout(page):
    """Per-breakpoint sizes that differ between pages: [phone, tablet, desktop, wide]."""
    res = {"heroImg": [], "card": [], "stepsImg": [], "faq": []}
    for w in (390, 1024, 1280, 1440):
        f = f"{spec_dir}/{page}.{w}.txt"
        if not os.path.exists(f):
            f = f"{spec_dir}/{page}.1280.txt"
        lines = open(f, encoding="utf-8").read().split("\n")
        h2y = next(int(m.group(1)) for l in lines if (m := re.search(r"^\s*h2 \| @-?\d+,(\d+)", l)))
        def size(pat, cond=lambda x, y: True):
            for l in lines:
                m = re.search(r"@(-?\d+),(\d+) (\d+)x(\d+)", l)
                if m and re.search(pat, l) and cond(int(m.group(1)), int(m.group(2))):
                    return [int(m.group(3)), int(m.group(4))]
            return None
        res["heroImg"].append(size(r"^\s*img \| @-?\d+,\d+ \d{3,4}x", lambda x, y: y < h2y))
        res["card"].append((size(r"backgroundColor:rgba\(224, 222, 222, 0.2\)") or [0])[0])
        res["stepsImg"].append(size(r"img \|.*borderRadius:17px"))
        res["faq"].append((size(r"shadow:INSET_SOFT \| flex:column gap:0px") or [0])[0])
    return res

out = {}
for page in pages:
    it = parse(page)
    texts = [i for i in it if i["kind"] == "text"]
    imgs = [i for i in it if i["kind"] == "img"]
    d = {"slug": page}
    mt = meta.get(page, {})
    d["metaTitle"], d["metaDescription"] = mt.get("title"), mt.get("desc")
    h1 = next(t for t in texts if t["tag"] == "h1")
    d["title"] = accent(h1["text"], h1["color"])
    i1 = texts.index(h1)
    d["heroText"] = clean(texts[i1 + 1]["text"])
    d["heroBold"] = texts[i1 + 1]["weight"] >= 600
    d["heroPad"] = [hero_pad(page, w) for w in (390, 1024, 1280)]
    first_h2 = next(t for t in texts if t["tag"] == "h2")
    big = [im for im in imgs if im["w"] >= 1000 and im["y"] < first_h2["y"]]
    d["heroImage"] = big[0]["src"] if big else None

    def idx(pred, start=0):
        for k in range(start, len(texts)):
            if pred(texts[k]):
                return k
        return None

    k_what = idx(lambda t: t["tag"] == "h2" and t["font"].startswith("Inter 22px") and t["text"].lower().startswith("what"))
    k_why = idx(lambda t: t["tag"] == "h2" and t["text"].lower().startswith("why choose"))
    k_steps = idx(lambda t: t["tag"] == "h2" and "Procedure" in t["text"])
    k_rec = idx(lambda t: t["tag"] == "h2" and t["text"].startswith("Recovery"))
    k_faq = idx(lambda t: "doubts" in t["text"].lower())
    k_book = idx(lambda t: "Hassle-Free" in t["text"])

    def paras(a, b):
        res = []
        for t in texts[a:b]:
            if t["tag"] == "p" and "Book Appointment" not in t["text"]:
                txt = clean(t["text"])
                if t["weight"] >= 600:
                    txt = "**" + txt.replace("**", "") + "**"
                res.append(txt)
        return res

    wp = [t for t in texts[k_what + 1:k_why] if t["tag"] == "p"]
    joined = len(wp) > 1 and wp[1]["y"] - (wp[0]["y"] + wp[0]["h"]) < 4
    d["what"] = {"title": clean(texts[k_what]["text"]), "paragraphs": paras(k_what + 1, k_why), "joined": joined}
    why_items = [clean(t["text"]) for t in texts[k_why + 1:k_steps] if t["tag"] == "h3"]
    why_p = paras(k_why + 1, k_steps)
    d["why"] = {"title": clean(texts[k_why]["text"]), "items": why_items, "paragraphs": why_p}

    st = texts[k_steps]
    d["steps"] = {"title": accent(st["text"], st["color"])}
    after = texts[k_steps + 1:k_rec]
    d["steps"]["intro"] = clean(after[0]["text"])
    steps = []
    for k, t in enumerate(after):
        if t["tag"] == "h3":
            body = next((u for u in after[k + 1:] if u["tag"] == "p"), None)
            steps.append({"title": clean(t["text"]), "text": clean(body["text"]) if body else "", "h": body["h"] if body else 0})
    d["steps"]["items"] = steps
    step_img = [im for im in imgs if 500 <= im["w"] <= 600 and im["y"] > st["y"] - 800 and im["y"] < texts[k_rec]["y"]]
    d["steps"]["image"] = step_img[0]["src"] if step_img else None

    rc = texts[k_rec]
    rec = texts[k_rec + 1:k_faq]
    d["recovery"] = {
        "title": accent(rc["text"], rc["color"]),
        "intro": clean(rec[0]["text"]),
        "items": [clean(t["text"]) for t in rec if t["tag"] == "h3"],
        "outro": next((clean(t["text"]) for t in rec[[i for i, t in enumerate(rec) if t["tag"] == "h3"][-1] + 1:]
                       if t["tag"] == "p" and "Book Now" not in t["text"]), ""),
    }
    faq = []
    seg = texts[k_faq + 1:k_book]
    for k, t in enumerate(seg):
        if t["tag"] == "p" and t["color"] == BRAND and t["weight"] == 500 and t["font"].startswith("Satoshi 18px"):
            a = next((u for u in seg[k + 1:] if u["font"].startswith("Inter 16px")), None)
            faq.append({"q": clean(t["text"]), "a": clean(a["text"]) if a else ""})
    d["faq"] = faq
    d["layout"] = layout(page)
    out[page] = d
    print(page, "| what", len(d["what"]["paragraphs"]), "| why", len(why_items), "| steps", len(steps), "| rec", len(d["recovery"]["items"]), "| faq", len(faq), "| imgs", d["heroImage"], d["steps"]["image"])

json.dump(out, open(out_path, "w"), indent=1, ensure_ascii=False)
