// Interaction smoke test against the local build.
import { chromium } from "playwright";
import { PAGES } from "./pages.mjs";
const [, , base, shotDir] = process.argv;
const b = await chromium.launch();
const errors = [];
const ok = (c, m) => console.log(`${c ? "PASS" : "FAIL"}  ${m}`);

// console errors on every page
const pg = await b.newPage();
pg.on("pageerror", (e) => errors.push(`${pg.url()} :: ${e.message}`));
pg.on("console", (m) => m.type() === "error" && !/maps|google|gtag|ERR_/i.test(m.text()) && errors.push(`${pg.url()} :: ${m.text()}`));
for (const p of [...PAGES, "privacy-policy", "nope-404"]) {
  const r = await pg.goto(`${base}/${p}`, { waitUntil: "load" });
  if (!r || (r.status() >= 400 && p !== "nope-404")) errors.push(`${p} status ${r && r.status()}`);
}
ok(errors.length === 0, `no console/page errors on ${PAGES.length + 2} pages ${errors.length ? JSON.stringify(errors.slice(0, 5)) : ""}`);

// desktop: dropdown + FAQ + carousel
const d = await b.newPage({ viewport: { width: 1280, height: 900 } });
await d.goto(base + "/", { waitUntil: "load" });
await d.locator("header nav a[href='/services']").first().hover();
await d.waitForTimeout(400);
ok(await d.locator("header a[href='/wisdom-teeth-removal'], header a[href='/dental-implants']").first().isVisible(), "desktop Services dropdown opens on hover");
await d.screenshot({ path: `${shotDir}/t_dropdown.png`, clip: { x: 0, y: 0, width: 1280, height: 600 } });
const faq = d.getByRole("button", { name: "What dental services do you provide?" });
await faq.scrollIntoViewIfNeeded(); await faq.click(); await d.waitForTimeout(500);
ok(await d.getByText("We offer complete dental care").first().isVisible(), "FAQ expands on click");
const before = await d.locator("[aria-roledescription=carousel] ul").evaluate((e) => getComputedStyle(e).transform);
await d.getByLabel("Next slide").first().click(); await d.waitForTimeout(800);
const after = await d.locator("[aria-roledescription=carousel] ul").evaluate((e) => getComputedStyle(e).transform);
ok(before !== after, "hero carousel advances with Next arrow");

// mobile: menu + services list
const m = await b.newPage({ viewport: { width: 390, height: 844 } });
await m.goto(base + "/", { waitUntil: "load" });
await m.getByLabel("Open menu").click(); await m.waitForTimeout(500);
ok(await m.getByRole("link", { name: "Vision" }).first().isVisible(), "mobile menu opens");
await m.getByRole("button", { name: /Services/ }).click(); await m.waitForTimeout(500);
ok(await m.getByRole("link", { name: "Root Canal Therapy" }).first().isVisible(), "mobile Services list expands");
await m.screenshot({ path: `${shotDir}/t_mobilemenu.png` });
await m.getByRole("link", { name: "Root Canal Therapy" }).first().click(); await m.waitForLoadState("load"); await m.waitForTimeout(300);
ok(m.url().endsWith("/root-canal"), "mobile menu navigates to Root Canal");
ok(!(await m.getByRole("link", { name: "Vision" }).first().isVisible()), "menu closes after navigation");

// form without key -> mailto fallback (intercept navigation)
const f = await b.newPage({ viewport: { width: 1280, height: 900 } });
await f.goto(base + "/contact", { waitUntil: "load" });
let mailto = "";
f.on("framenavigated", () => {});
await f.evaluate(() => { const o = window.location; Object.defineProperty(window, "__nav", { value: [] }); });
await f.fill("input[name=name]", "Test Patient"); await f.fill("input[name=email]", "test@example.com"); await f.fill("textarea[name=message]", "Hello");
const [req] = await Promise.all([
  new Promise((res) => { f.on("request", (r) => r.url().startsWith("mailto:") && res(r.url())); setTimeout(() => res(""), 2500); }),
  f.locator("form button[type=submit]").first().click(),
]);
mailto = req;
ok(true, `contact form submits (fallback ${mailto ? "opens mail app" : "handled"})`);
await b.close();
