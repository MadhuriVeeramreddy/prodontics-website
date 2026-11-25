// Extract every visible inline SVG (with <use> refs resolved) from a page.
// Usage: node tools/svgs.mjs <url> <outFile.json>
import { chromium } from "playwright";
import fs from "node:fs";

const [, , url, out] = process.argv;
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await page.goto(url, { waitUntil: "load", timeout: 90000 });
await page.waitForTimeout(2000);
const svgs = await page.evaluate(() => {
  const res = [];
  const seen = new Set();
  for (const svg of document.querySelectorAll("svg")) {
    const r = svg.getBoundingClientRect();
    if (!r.width || !r.height) continue;
    const clone = svg.cloneNode(true);
    for (const u of clone.querySelectorAll("use")) {
      const id = (u.getAttribute("href") || u.getAttribute("xlink:href") || "").slice(1);
      const ref = id && document.getElementById(id);
      if (ref) {
        const vb = ref.getAttribute("viewBox");
        if (vb) clone.setAttribute("viewBox", vb);
        const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        g.innerHTML = ref.tagName.toLowerCase() === "symbol" || ref.tagName.toLowerCase() === "svg" ? ref.innerHTML : ref.outerHTML;
        u.replaceWith(g);
      }
    }
    clone.removeAttribute("style");
    clone.removeAttribute("color");
    // Framer colours icons through CSS variables; map them to currentColor / their fallback.
    for (const n of [clone, ...clone.querySelectorAll("*")]) {
      for (const a of ["fill", "stroke"]) {
        const v = n.getAttribute(a);
        if (v && v.startsWith("var(")) n.setAttribute(a, "currentColor");
      }
      for (const a of ["fill-opacity", "stroke-opacity", "stroke-width", "opacity"]) {
        const v = n.getAttribute(a);
        const m = v && v.match(/^var\([^,]+,\s*([^)]+)\)$/);
        if (m) n.setAttribute(a, m[1].trim());
      }
      n.removeAttribute("color");
      for (const a of ["id", "height", "width"]) if (n !== clone || a === "id") n.removeAttribute(a);
    }
    clone.removeAttribute("class");
    const html = clone.outerHTML;
    if (seen.has(html)) continue;
    seen.add(html);
    // Label: nearest text in the closest container
    let el = svg.parentElement, label = "";
    for (let i = 0; i < 6 && el && !label; i++, el = el.parentElement) label = (el.innerText || "").trim().split("\n")[0].slice(0, 50);
    res.push({ label, w: Math.round(r.width), h: Math.round(r.height), color: getComputedStyle(svg).color, html });
  }
  return res;
});
fs.writeFileSync(out, JSON.stringify(svgs, null, 1));
console.log(svgs.length, "unique svgs");
for (const s of svgs) console.log(`${s.w}x${s.h} ${s.label} :: ${s.html.length} chars`);
await browser.close();
