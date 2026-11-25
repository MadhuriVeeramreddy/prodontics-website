import { chromium } from "playwright";
const [, , base, S] = process.argv;
const b = await chromium.launch();
// desktop dropdown
let p = await b.newPage({ viewport: { width: 1280, height: 800 } });
await p.goto(base, { waitUntil: "load" }); await p.waitForTimeout(2500);
await p.locator("nav a[href='./services']").first().hover();
await p.waitForTimeout(800);
await p.screenshot({ path: `${S}/dd-hover.png`, clip: { x: 0, y: 0, width: 1280, height: 600 } });
await p.locator("nav a[href='./services']").first().click({ trial: false }).catch(() => {});
await p.waitForTimeout(800);
await p.screenshot({ path: `${S}/dd-click.png`, clip: { x: 0, y: 0, width: 1280, height: 600 } });
// mobile menu
p = await b.newPage({ viewport: { width: 390, height: 844 } });
await p.goto(base, { waitUntil: "load" }); await p.waitForTimeout(2500);
const box = await p.evaluate(() => { const n = document.querySelector("nav"); const r = n.getBoundingClientRect(); return { h: r.height }; });
await p.mouse.click(390 - 40, 48);
await p.waitForTimeout(1000);
await p.screenshot({ path: `${S}/mm-open.png` });
console.log(box);
await b.close();
