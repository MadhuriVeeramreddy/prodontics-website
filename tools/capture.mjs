// Full-page screenshots of a site at the four Framer breakpoints.
// Usage: node tools/capture.mjs <baseUrl> <outDir> [page ...]
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

import { PAGES, WIDTHS } from "./pages.mjs";

const [, , base, outDir, ...only] = process.argv;
if (!base || !outDir) {
  console.error("usage: node tools/capture.mjs <baseUrl> <outDir> [page ...]");
  process.exit(1);
}
const pages = only.length ? only : PAGES;
fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
for (const [bp, width] of Object.entries(WIDTHS)) {
  const ctx = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  for (const p of pages) {
    await page.goto(`${base.replace(/\/$/, "")}/${p}`, { waitUntil: "load", timeout: 90000 }).catch((e) => console.error("goto", p, e.message));
    await page.waitForTimeout(1500);
    // Scroll through the page so every scroll-triggered animation plays.
    await page.evaluate(async () => {
      document.documentElement.style.scrollBehavior = "auto";
      const step = 400;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 120));
      }
      window.scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 800));
    });
    // Hide things that differ every load (map tiles, sliders mid-transition stay as-is).
    const name = `${(p || "home").replace(/\//g, "__")}.${bp}.png`;
    await page.screenshot({ path: path.join(outDir, name), fullPage: true, animations: "disabled" });
    console.log("saved", name);
  }
  await ctx.close();
}
await browser.close();
