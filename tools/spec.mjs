// Dump the visible layout + computed styles of a page as an indented outline.
// Usage: node tools/spec.mjs <baseUrl> <outDir> <width> [page ...]
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { PAGES } from "./pages.mjs";

const [, , base, outDir, widthArg, ...only] = process.argv;
const width = Number(widthArg || 1280);
const pages = only.length ? only : PAGES;
fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: process.env.REDUCED ? "reduce" : "no-preference" });
const page = await ctx.newPage();

for (const p of pages) {
  await page.goto(`${base.replace(/\/$/, "")}/${p}`, { waitUntil: "load", timeout: 90000 }).catch((e) => console.error("goto", p, e.message));
    await page.waitForTimeout(1500);
  await page.evaluate(async () => {
    document.documentElement.style.scrollBehavior = "auto";
    for (let y = 0; y < document.body.scrollHeight; y += 400) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 100));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 1000));
  });
  const out = await page.evaluate(() => {
    const lines = [];
    const DEF = {
      backgroundColor: "rgba(0, 0, 0, 0)", borderRadius: "0px", boxShadow: "none",
      borderTopWidth: "0px", opacity: "1", backdropFilter: "none", filter: "none",
    };
    const sx = window.scrollX, sy = window.scrollY;
    function visible(el, cs, r) {
      return cs.display !== "none" && cs.visibility !== "hidden" && r.width > 0 && r.height > 0;
    }
    function ownText(el) {
      let t = "";
      for (const n of el.childNodes) if (n.nodeType === 3) t += n.textContent;
      return t.replace(/\s+/g, " ").trim();
    }
    function walk(el, depth, parentFont) {
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      if (cs.display === "contents") {
        for (const k of el.children) walk(k, depth, parentFont);
        return;
      }
      if (!visible(el, cs, r)) return;
      const tag = el.tagName.toLowerCase();
      if (["script", "style", "noscript", "link", "meta"].includes(tag)) return;
      const parts = [`${tag}`, `@${Math.round(r.x + sx)},${Math.round(r.y + sy)} ${Math.round(r.width)}x${Math.round(r.height)}`];
      for (const [k, d] of Object.entries(DEF)) if (cs[k] !== d) {
        if (k === "borderTopWidth") parts.push(`border:${cs.borderTopWidth} ${cs.borderTopStyle} ${cs.borderTopColor}`);
        else parts.push(`${k}:${cs[k]}`);
      }
      if (cs.display.includes("flex")) parts.push(`flex:${cs.flexDirection} gap:${cs.gap} jc:${cs.justifyContent} ai:${cs.alignItems}`);
      if (cs.display.includes("grid")) parts.push(`grid:${cs.gridTemplateColumns} gap:${cs.gap}`);
      const pad = [cs.paddingTop, cs.paddingRight, cs.paddingBottom, cs.paddingLeft].join(" ");
      if (pad !== "0px 0px 0px 0px") parts.push(`pad:${pad}`);
      if (cs.position === "fixed" || cs.position === "sticky") parts.push(`pos:${cs.position}`);
      if (cs.overflow !== "visible") parts.push(`overflow:${cs.overflow}`);
      if (tag === "img") parts.push(`src:${(el.currentSrc || el.src).split("/").pop().split("?")[0]} fit:${cs.objectFit}`);
      if (tag === "a") parts.push(`href:${el.getAttribute("href")}`);
      if (tag === "iframe") parts.push(`iframe:${el.src.slice(0, 160)}`);
      const bgImg = cs.backgroundImage;
      if (bgImg && bgImg !== "none") parts.push(`bgimg:${bgImg.slice(0, 160)}`);
      // Skip carousel clones far outside the viewport.
      if (r.x + sx > window.innerWidth + 40 || r.right + sx < -40) return;
      // Text blocks (headings/paragraphs) made of inline spans: print once, mark accent words.
      if (/^(h[1-6]|p|li|label)$/.test(tag) && [...el.querySelectorAll("*")].every((d) => /^(span|strong|em|a|br|b|i|u)$/i.test(d.tagName))) {
        const leaf = el.querySelector("span,strong,em") || el;
        const lcs = getComputedStyle(leaf);
        const base = lcs.color;
        let marked = "";
        const walkText = (n, styleEl) => {
          if (n.nodeType === 3) {
            const c = getComputedStyle(styleEl);
            let t = n.textContent;
            if (!t.trim()) { marked += t; return; }
            if (c.color !== base) t = `{${t}|${c.color}}`;
            if (+c.fontWeight >= 600 && +lcs.fontWeight < 600) t = `**${t}**`;
            if (c.fontStyle === "italic" && lcs.fontStyle !== "italic") t = `_${t}_`;
            if (styleEl.tagName === "A") t = `[${t}](${styleEl.getAttribute("href")})`;
            marked += t;
          } else if (n.nodeType === 1) {
            if (n.tagName === "BR") { marked += "⏎"; return; }
            for (const c of n.childNodes) walkText(c, n);
          }
        };
        for (const c of el.childNodes) walkText(c, el.nodeType === 1 && c.nodeType === 3 ? el : el);
        const f = `${lcs.fontFamily.split(",")[0]} ${lcs.fontSize}/${lcs.lineHeight} w${lcs.fontWeight} ls:${lcs.letterSpacing} ${lcs.color} ${lcs.textAlign}${lcs.textTransform !== "none" ? " " + lcs.textTransform : ""}`;
        lines.push("  ".repeat(depth) + `${parts.join(" | ")} | T[${f}] "${marked.replace(/\s+/g, " ").trim()}"`);
        return;
      }
      const text = ownText(el);
      const font =`${cs.fontFamily.split(",")[0]} ${cs.fontSize}/${cs.lineHeight} w${cs.fontWeight} ls:${cs.letterSpacing} ${cs.color} ${cs.textAlign}${cs.textTransform !== "none" ? " " + cs.textTransform : ""}${cs.fontStyle !== "normal" ? " " + cs.fontStyle : ""}${cs.textDecorationLine !== "none" ? " " + cs.textDecorationLine : ""}`;
      if (text) {
        parts.push(`FONT[${font}]`);
        parts.push(`"${text.slice(0, 140)}"`);
      }
      // Skip wrapper divs that add nothing (same box as only child, no styling).
      const kids = [...el.children];
      const extra = parts.slice(2).filter((x) => x !== "flex:column gap:normal jc:flex-start ai:normal");
      const boring = tag === "div" && extra.length === 0 && !text;
      if (!boring) lines.push("  ".repeat(depth) + parts.join(" | ").replace(/boxShadow:rgba\(212, 212, 212, 0\.04\)[^|]*/, "shadow:INSET_SOFT ").replace(/ jc:flex-start ai:normal| gap:normal/g, ""));
      if (tag === "svg") return;
      for (const k of kids) walk(k, boring ? depth : depth + 1, font);
    }
    walk(document.querySelector("#main") || document.body, 0, "");
    return lines.join("\n");
  });
  const name = `${(p || "home").replace(/\//g, "__")}.${width}.txt`;
  fs.writeFileSync(path.join(outDir, name), out);
  console.log("saved", name, out.split("\n").length, "lines");
}
await browser.close();
