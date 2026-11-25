"""Compare text block geometry between original and rebuild spec dumps.
usage: python3 tools/posdiff.py orig.txt mine.txt [threshold=4]"""
import re, sys
from difflib import SequenceMatcher
def load(p):
    out = []
    for line in open(p, encoding="utf-8"):
        m = re.search(r'^\s*(\w+) \| @(-?\d+),(-?\d+) (\d+)x(\d+) .*?T\[([^\]]+)\] "(.*)"', line)
        if m:
            tag, x, y, w, h, font, text = m.groups()
            t = re.sub(r'\{([^|}]*)\|[^}]*\}', r'\1', text)
            t = re.sub(r'[*_\[\]]|\(\./[^)]*\)', '', t).strip().lower()[:60]
            out.append((t, int(x), int(y), int(w), int(h), font, tag))
    return out
a, b = load(sys.argv[1]), load(sys.argv[2])
th = int(sys.argv[3]) if len(sys.argv) > 3 else 4
sm = SequenceMatcher(None, [x[0] for x in a], [x[0] for x in b], autojunk=False)
prev_dy = 0
for op, i1, i2, j1, j2 in sm.get_opcodes():
    if op == "equal":
        for k in range(i2 - i1):
            A, B = a[i1 + k], b[j1 + k]
            dy = B[2] - A[2]
            issues = []
            if abs(dy - prev_dy) > th: issues.append(f"Δy {dy - prev_dy:+d} (cum {dy:+d})")
            if abs(B[1] - A[1]) > th: issues.append(f"x {A[1]}→{B[1]}")
            if abs(B[3] - A[3]) > th: issues.append(f"w {A[3]}→{B[3]}")
            if abs(B[4] - A[4]) > th: issues.append(f"h {A[4]}→{B[4]}")
            fa = re.sub(r'"', '', A[5]); fb = re.sub(r'"', '', B[5])
            fa = re.sub(r'Good Times Regular', 'Good Times', fa); fa = re.sub(r'Canva Sans Regular', 'Canva Sans', fa)
            if fa.split(" start")[0].split(" left")[0].split(" center")[0] != fb.split(" start")[0].split(" left")[0].split(" center")[0]:
                issues.append(f"font {A[5]} → {B[5]}")
            if issues: print(f"@{A[2]:>5} {A[6]:>3} {A[0][:38]:<38} " + "; ".join(issues))
            prev_dy = dy
    else:
        for x in a[i1:i2]: print(f"@{x[2]:>5} ONLY-ORIG  {x[0][:50]}")
        for x in b[j1:j2]: print(f"@{x[2]:>5} ONLY-MINE  {x[0][:50]}")
