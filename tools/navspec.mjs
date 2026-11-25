import { chromium } from "playwright";
const [, , base, S] = process.argv;
const b = await chromium.launch();
const dump = (p) => p.evaluate(() => {
  const out = [];
  const walk = (el, d) => {
    const cs = getComputedStyle(el), r = el.getBoundingClientRect();
    if (cs.display === "contents") { for (const k of el.children) walk(k, d); return; }
    if (cs.display === "none" || cs.visibility === "hidden" || !r.width || !r.height || +cs.opacity === 0) return;
    if (el.tagName === "svg") { out.push("  ".repeat(d) + `svg ${Math.round(r.x)},${Math.round(r.y)} ${Math.round(r.width)}x${Math.round(r.height)} color:${cs.color}`); return; }
    let t = [...el.childNodes].filter(n => n.nodeType === 3).map(n => n.textContent.trim()).join(" ");
    const bits = [el.tagName.toLowerCase(), `${Math.round(r.x)},${Math.round(r.y)} ${Math.round(r.width)}x${Math.round(r.height)}`];
    if (cs.backgroundColor !== "rgba(0, 0, 0, 0)") bits.push("bg:" + cs.backgroundColor);
    if (cs.borderRadius !== "0px") bits.push("r:" + cs.borderRadius);
    if (cs.boxShadow !== "none") bits.push("sh:" + cs.boxShadow);
    if (cs.borderBottomWidth !== "0px") bits.push("bb:" + cs.borderBottomWidth + " " + cs.borderBottomColor);
    const pad = [cs.paddingTop, cs.paddingRight, cs.paddingBottom, cs.paddingLeft].join(" ");
    if (pad !== "0px 0px 0px 0px") bits.push("pad:" + pad);
    if (cs.display.includes("flex")) bits.push(`flex:${cs.flexDirection} gap:${cs.gap}`);
    if (el.getAttribute("href")) bits.push("href:" + el.getAttribute("href"));
    if (t) bits.push(`F[${cs.fontFamily.split(",")[0]} ${cs.fontSize}/${cs.lineHeight} w${cs.fontWeight} ls:${cs.letterSpacing} ${cs.color}] "${t}"`);
    out.push("  ".repeat(d) + bits.join(" | "));
    for (const k of el.children) walk(k, d + 1);
  };
  walk(document.querySelector("nav").parentElement, 0);
  return out.join("\n");
});
let p = await b.newPage({ viewport: { width: 1280, height: 800 } });
await p.goto(base, { waitUntil: "load" }); await p.waitForTimeout(2500);
await p.locator("nav a[href='./services']").first().hover(); await p.waitForTimeout(800);
console.log("=== DESKTOP DROPDOWN\n" + (await dump(p)));
p = await b.newPage({ viewport: { width: 390, height: 844 } });
await p.goto(base, { waitUntil: "load" }); await p.waitForTimeout(2500);
console.log("=== PHONE CLOSED\n" + (await dump(p)));
await p.mouse.click(350, 48); await p.waitForTimeout(1000);
console.log("=== PHONE OPEN\n" + (await dump(p)));
await p.getByText("Services", { exact: true }).first().click(); await p.waitForTimeout(1000);
await p.screenshot({ path: `${S}/mm-services.png` });
console.log("=== PHONE SERVICES\n" + (await dump(p)));
await b.close();
