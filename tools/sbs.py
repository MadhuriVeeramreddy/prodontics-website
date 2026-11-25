"""Side-by-side: original | rebuild, split into vertical chunks.
usage: python3 tools/sbs.py <origDir> <mineDir> <name> <outPrefix> [chunk=1600] [scale=0.4]"""
import sys
from PIL import Image, ImageDraw
o, m, name, out = sys.argv[1:5]
chunk = int(sys.argv[5]) if len(sys.argv) > 5 else 1600
scale = float(sys.argv[6]) if len(sys.argv) > 6 else 0.4
a = Image.open(f"{o}/{name}").convert("RGB"); b = Image.open(f"{m}/{name}").convert("RGB")
W = a.width; H = max(a.height, b.height)
print(name, "orig", a.size, "mine", b.size)
n = 0
for y in range(0, H, chunk):
    h = min(chunk, H - y)
    c = Image.new("RGB", (W * 2 + 10, h), "red")
    c.paste(a.crop((0, y, W, y + h)), (0, 0)); c.paste(b.crop((0, y, W, y + h)), (W + 10, 0))
    c = c.resize((int(c.width * scale), int(h * scale)))
    c.save(f"{out}{n}.jpg", quality=70); n += 1
print(n, "chunks")
