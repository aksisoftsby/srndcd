"""Vectorize logo-surendo-hitam.png into SVG paths (own implementation).

Pipeline:
  1. Upsample RGBA 3x (LANCZOS) for sub-pixel smooth boundaries.
  2. Classify pixels into ink classes: red / gray / dark (by dominance & luminance).
  3. Trace each connected component (crack-following contour walk, own impl)
     plus its holes (evenodd rings).
  4. Simplify (Ramer-Douglas-Peucker) -> smooth (Chaikin x2) -> simplify again.
  5. Emit SVG paths with measured fill colors, fill-rule evenodd.
"""
from PIL import Image
import sys, math

SRC = 'assets/uploads/2019/02/logo-surendo-hitam.png'
OUT1 = 'rekomendasi1/images/logo-surendo.svg'
OUT2 = 'rekomendasi2/images/logo-surendo.svg'
UP = 3  # upsample factor

DIRS = [(1, 0), (0, 1), (-1, 0), (0, -1)]  # R, D, L, U (y grows downward)


def classify(im):
    """Return (class->set of (x,y)), image size, and measured mean colors.

    Two-pass: measure cluster means from saturated core pixels, then assign
    every visible pixel to the nearest cluster (keeps anti-aliased edges).
    """
    im = im.convert('RGBA')
    w, h = im.size
    px = im.load()
    # pass 1: seed clusters from unambiguous pixels
    seeds = {'red': [], 'gray': [], 'dark': []}
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a < 250:
                continue
            lum = 0.299 * r + 0.587 * g + 0.114 * b
            spread = max(r, g, b) - min(r, g, b)
            if r - max(g, b) > 45:
                seeds['red'].append((r, g, b))
            elif spread < 18:
                if lum < 90:
                    seeds['dark'].append((r, g, b))
                elif 140 <= lum <= 205:
                    seeds['gray'].append((r, g, b))
    means = {}
    for k, lst in seeds.items():
        n = len(lst)
        means[k] = (sum(p[0] for p in lst)/n, sum(p[1] for p in lst)/n, sum(p[2] for p in lst)/n) if n else None
    print('cluster means:', {k: tuple(round(v) for v in m) for k, m in means.items() if m}, file=sys.stderr)
    # pass 2: nearest-cluster assignment for every visible pixel
    classes = {'red': set(), 'gray': set(), 'dark': set()}
    sums = {'red': [0, 0, 0, 0], 'gray': [0, 0, 0, 0], 'dark': [0, 0, 0, 0]}
    keys = [k for k in ('red', 'gray', 'dark') if means[k]]
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a < 128:
                continue
            best, bd = keys[0], 1e18
            for k in keys:
                mr, mg, mb = means[k]
                d = (r-mr)**2 + (g-mg)**2 + (b-mb)**2
                if d < bd:
                    bd, best = d, k
            classes[best].add((x, y))
            s = sums[best]
            s[0] += r; s[1] += g; s[2] += b; s[3] += 1
    colors = {}
    for k, s in sums.items():
        if s[3]:
            colors[k] = '#%02x%02x%02x' % (round(s[0]/s[3]), round(s[1]/s[3]), round(s[2]/s[3]))
    return classes, colors, w, h


def upsample(classes, w, h):
    out = {}
    for k, cells in classes.items():
        out[k] = {(x * UP + dx, y * UP + dy) for (x, y) in cells
                  for dx in range(UP) for dy in range(UP)}
    return out, w * UP, h * UP


# --- crack-following contour extraction on binary grid ---

def contours(cells, side='right'):
    cellset = set(cells)
    if not cellset:
        return []
    start = min(cellset, key=lambda c: (c[1], c[0]))
    sx, sy = start

    def filled(x, y):
        return (x, y) in cellset

    def left_cell(x, y, d):
        if d == (1, 0):   return (x, y - 1)
        if d == (0, 1):   return (x, y)
        if d == (-1, 0):  return (x - 1, y)
        if d == (0, -1):  return (x - 1, y - 1)

    def right_cell(x, y, d):
        if d == (1, 0):   return (x, y)
        if d == (0, 1):   return (x - 1, y)
        if d == (-1, 0):  return (x - 1, y - 1)
        if d == (0, -1):  return (x, y - 1)

    def crack_exists(x, y, d):
        l, rr = left_cell(x, y, d), right_cell(x, y, d)
        if side == 'right':
            return filled(*rr) and not filled(*l)
        return filled(*l) and not filled(*rr)

    x, y = sx, sy
    d = (1, 0)
    pts = [(x, y)]
    maxsteps = 6 * len(cellset) + 16
    for _ in range(maxsteps):
        order = (1, 0, -1) if side == 'right' else (-1, 0, 1)
        step = None
        for turn in order:
            nd = DIRS[(DIRS.index(d) + turn) % 4]
            if crack_exists(x, y, nd):
                step = nd
                break
        if step is None:
            break
        d = step
        x += d[0]; y += d[1]
        pts.append((x, y))
        if (x, y) == (sx, sy) and len(pts) > 3:
            break
    return pts


def rdp(points, eps):
    if len(points) < 3:
        return points
    def pld(p, a, b):
        ax, ay = a; bx, by = b; ppx, ppy = p
        dx, dy = bx - ax, by - ay
        L = math.hypot(dx, dy)
        if L == 0:
            return math.hypot(ppx - ax, ppy - ay)
        return abs(dy * (ppx - ax) - dx * (ppy - ay)) / L
    keep = [False] * len(points)
    keep[0] = keep[-1] = True
    stack = [(0, len(points) - 1)]
    while stack:
        i, j = stack.pop()
        if j <= i + 1:
            continue
        dmax, idx = -1, -1
        for k in range(i + 1, j):
            dd = pld(points[k], points[i], points[j])
            if dd > dmax:
                dmax, idx = dd, k
        if dmax > eps:
            keep[idx] = True
            stack.append((i, idx)); stack.append((idx, j))
    return [p for p, k in zip(points, keep) if k]


def chaikin(pts, iterations=2):
    for _ in range(iterations):
        out = []
        n = len(pts)
        for i in range(n):
            x1, y1 = pts[i]
            x2, y2 = pts[(i + 1) % n]
            out.append((0.75 * x1 + 0.25 * x2, 0.75 * y1 + 0.25 * y2))
            out.append((0.25 * x1 + 0.75 * x2, 0.25 * y1 + 0.75 * y2))
        pts = out
    return pts


def area(points):
    s = 0
    n = len(points)
    for i in range(n):
        x1, y1 = points[i]; x2, y2 = points[(i + 1) % n]
        s += x1 * y2 - x2 * y1
    return s / 2


def flood(seed, allowed):
    comp = set()
    stack = [seed]
    while stack:
        c = stack.pop()
        if c in comp or c not in allowed:
            continue
        comp.add(c)
        x, y = c
        stack += [(x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)]
    return comp


def components(cells):
    remaining = set(cells)
    comps = []
    while remaining:
        comp = flood(next(iter(remaining)), remaining)
        remaining -= comp
        comps.append(comp)
    comps.sort(key=len, reverse=True)
    return comps


def smooth_ring(pts, eps1, eps2):
    # moving-average pre-smooth kills staircase noise while keeping corners
    n = len(pts)
    W = 2
    avg = []
    for i in range(n):
        sx = sy = 0
        for k in range(-W, W + 1):
            p = pts[(i + k) % n]
            sx += p[0]; sy += p[1]
        avg.append((sx / (2 * W + 1), sy / (2 * W + 1)))
    simp = rdp(avg, eps1)
    if len(simp) < 4 or abs(area(simp)) < 300:
        return None
    sm = chaikin(simp, 3)
    final = rdp(sm, eps2)
    if len(final) < 4 or abs(area(final)) < 300:
        return None
    return final


def trace_group(cells):
    rings = []
    for comp in components(cells):
        pts = contours(comp, side='right')
        if len(pts) > 8:
            r = smooth_ring(pts, 1.6, 0.9)
            if r:
                rings.append(r)
        # holes: empty cells inside bbox not reachable from bbox edge
        xs = [c[0] for c in comp]; ys = [c[1] for c in comp]
        x0, x1, y0, y1 = min(xs), max(xs), min(ys), max(ys)
        inside_empty = {(xx, yy) for yy in range(y0, y1 + 1) for xx in range(x0, x1 + 1)
                        if (xx, yy) not in comp}
        ext = set()
        stack = [(x0, yy) for yy in range(y0, y1 + 1) if (x0, yy) not in comp]
        stack += [(x1, yy) for yy in range(y0, y1 + 1) if (x1, yy) not in comp]
        stack += [(xx, y0) for xx in range(x0, x1 + 1) if (xx, y0) not in comp]
        stack += [(xx, y1) for xx in range(x0, x1 + 1) if (xx, y1) not in comp]
        while stack:
            c = stack.pop()
            if c in ext or c not in inside_empty:
                continue
            ext.add(c)
            x, y = c
            stack += [(x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)]
        holes = inside_empty - ext
        while holes:
            hseed = next(iter(holes))
            hcomp = flood(hseed, holes)
            holes -= hcomp
            hpts = contours(hcomp, side='left')
            if len(hpts) > 8:
                r = smooth_ring(hpts, 1.6, 0.9)
                if r:
                    rings.append(r)
    return rings


def to_path(rings, scale):
    parts = []
    for r in rings:
        d = 'M' + ' '.join('%g %g' % (round(x / scale, 2), round(y / scale, 2)) for x, y in r) + 'Z'
        parts.append(d)
    return ' '.join(parts)


def main():
    im = Image.open(SRC)
    classes, colors, w, h = classify(im)
    print('colors:', colors, file=sys.stderr)
    classes, W, H = upsample(classes, w, h)
    out = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 %g %g">' % (w, h)]
    order = ['dark', 'gray', 'red']
    for k in order:
        if classes[k]:
            rings = trace_group(classes[k])
            out.append('<path fill="%s" fill-rule="evenodd" d="%s"/>' % (colors[k], to_path(rings, UP)))
            print(k, 'rings:', len(rings), file=sys.stderr)
    out.append('</svg>')
    svg = '\n'.join(out)
    with open(OUT1, 'w') as f:
        f.write(svg)
    with open(OUT2, 'w') as f:
        f.write(svg)
    # white variant for dark backgrounds: ink -> white, gray -> light steel, red stays
    white = svg
    if colors.get('dark'):
        white = white.replace('fill="%s"' % colors['dark'], 'fill="#ffffff"')
    if colors.get('gray'):
        white = white.replace('fill="%s"' % colors['gray'], 'fill="#c3ccda"')
    with open('rekomendasi1/images/logo-surendo-white.svg', 'w') as f:
        f.write(white)
    with open('rekomendasi2/images/logo-surendo-white.svg', 'w') as f:
        f.write(white)
    print('bytes:', len(svg), file=sys.stderr)


if __name__ == '__main__':
    main()
