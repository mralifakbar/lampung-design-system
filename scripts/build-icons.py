"""Build two ligature icon fonts (regular from Solar *-outline, fill from Solar *-bold).
Usage: python build-icons.py <@iconify-json/solar icons.json> <icons/icons.json> <out dir> [<ttf out dir>]
The woff2 files (CFF outlines) go to <out dir>. With <ttf out dir>, the same glyphs are also
written as TrueType (quadratic glyf outlines) for Flutter, which cannot load woff2."""
import json, sys, re
import xml.etree.ElementTree as ET
import pathops
from fontTools.fontBuilder import FontBuilder
from fontTools.pens.t2CharStringPen import T2CharStringPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.ttGlyphPen import TTGlyphPen
from fontTools.pens.cu2quPen import Cu2QuPen
from fontTools.svgLib.path import parse_path
from fontTools.feaLib.builder import addOpenTypeFeaturesFromString

ICONS_JSON, MAP_JSON, OUT_DIR = sys.argv[1], sys.argv[2], sys.argv[3]
TTF_DIR = sys.argv[4] if len(sys.argv) > 4 else None
icons = json.load(open(ICONS_JSON))["icons"]

MAP = json.load(open(MAP_JSON))["icons"]

def load_paths(body):
    root = ET.fromstring('<svg xmlns="http://www.w3.org/2000/svg">' + body + "</svg>")
    out = []
    def walk(el, inherited_rule):
        tag = el.tag.split("}")[-1]
        rule = el.get("fill-rule", inherited_rule)
        if el.get("opacity") not in (None, "1"):
            return
        if el.get("fill") == "none" and tag != "g":
            return
        p = pathops.Path()
        pen = p.getPen()
        drew = True
        if tag == "path":
            parse_path(el.get("d"), pen)
        elif tag == "circle":
            cx, cy, r = (float(el.get(k)) for k in ("cx", "cy", "r"))
            ellipse(pen, cx, cy, r, r)
        elif tag == "ellipse":
            cx, cy, rx, ry = (float(el.get(k)) for k in ("cx", "cy", "rx", "ry"))
            ellipse(pen, cx, cy, rx, ry)
        elif tag == "rect":
            x, y, w, h = (float(el.get(k, 0)) for k in ("x", "y", "width", "height"))
            rx = float(el.get("rx", 0))
            rrect(pen, x, y, w, h, rx)
        else:
            drew = False
        if drew:
            p.fillType = pathops.FillType.EVEN_ODD if rule == "evenodd" else pathops.FillType.WINDING
            p.simplify()
            out.append(p)
        for c in el:
            walk(c, rule)
    for c in root:
        walk(c, "nonzero")
    return out

K = 0.5522847498
def ellipse(pen, cx, cy, rx, ry):
    pen.moveTo((cx + rx, cy))
    pen.curveTo((cx + rx, cy + ry * K), (cx + rx * K, cy + ry), (cx, cy + ry))
    pen.curveTo((cx - rx * K, cy + ry), (cx - rx, cy + ry * K), (cx - rx, cy))
    pen.curveTo((cx - rx, cy - ry * K), (cx - rx * K, cy - ry), (cx, cy - ry))
    pen.curveTo((cx + rx * K, cy - ry), (cx + rx, cy - ry * K), (cx + rx, cy))
    pen.closePath()

def rrect(pen, x, y, w, h, r):
    if not r:
        pen.moveTo((x, y)); pen.lineTo((x + w, y)); pen.lineTo((x + w, y + h)); pen.lineTo((x, y + h)); pen.closePath(); return
    k = r * K
    pen.moveTo((x + r, y)); pen.lineTo((x + w - r, y)); pen.curveTo((x + w - r + k, y), (x + w, y + r - k), (x + w, y + r))
    pen.lineTo((x + w, y + h - r)); pen.curveTo((x + w, y + h - r + k), (x + w - r + k, y + h), (x + w - r, y + h))
    pen.lineTo((x + r, y + h)); pen.curveTo((x + r - k, y + h), (x, y + h - r + k), (x, y + h - r))
    pen.lineTo((x, y + r)); pen.curveTo((x, y + r - k), (x + r - k, y), (x + r, y)); pen.closePath()

LETTERS = {c: c for c in "abcdefghijklmnopqrstuvwxyz"}
LETTERS.update({"_": "underscore", "0": "zero", "1": "one", "2": "two", "3": "three", "4": "four", "5": "five", "6": "six", "7": "seven", "8": "eight", "9": "nine"})
S = 1000 / 24

def build(style, family, filename, ttf_filename=None):
    missing = []
    outlines = {}
    glyph_order = [".notdef", "space"] + list(LETTERS.values())
    charstrings, advances = {}, {}
    def empty(w):
        pen = T2CharStringPen(w, None); return pen.getCharString()
    charstrings[".notdef"] = empty(0); advances[".notdef"] = (0, 0)
    charstrings["space"] = empty(0); advances["space"] = (0, 0)
    for g in LETTERS.values():
        charstrings[g] = empty(0); advances[g] = (0, 0)
    fea = []
    for name, solar in MAP.items():
        key = solar + "-" + style
        if key not in icons:
            alt = solar + "-outline"
            if alt in icons:
                key = alt
            else:
                missing.append((name, solar)); continue
        paths = load_paths(icons[key]["body"])
        merged = pathops.Path()
        if len(paths) > 1:
            pathops.union(paths, merged.getPen())
        elif paths:
            merged = paths[0]
        gname = "icon_" + name
        outlines[gname] = merged
        pen = T2CharStringPen(1000, None)
        merged.draw(TransformPen(pen, (S, 0, 0, -S, 0, 24 * S)))
        charstrings[gname] = pen.getCharString()
        advances[gname] = (1000, 0)
        glyph_order.append(gname)
        fea.append("  sub " + " ".join(LETTERS[c] for c in name) + " by " + gname + ";")
    fb = FontBuilder(1000, isTTF=False)
    fb.setupGlyphOrder(glyph_order)
    cmap = {ord(c): g for c, g in LETTERS.items()}
    cmap[32] = "space"
    fb.setupCharacterMap(cmap)
    fb.setupCFF(family.replace(" ", ""), {"FullName": family}, charstrings, {})
    fb.setupHorizontalMetrics(advances)
    fb.setupHorizontalHeader(ascent=1000, descent=0)
    fb.setupNameTable({"familyName": family, "styleName": "Regular"})
    fb.setupOS2(sTypoAscender=1000, sTypoDescender=0, sTypoLineGap=0, usWinAscent=1000, usWinDescent=0)
    fb.setupPost()
    addOpenTypeFeaturesFromString(fb.font, "languagesystem DFLT dflt;\nlanguagesystem latn dflt;\nfeature liga {\n" + "\n".join(fea) + "\n} liga;\nfeature calt {\n" + "\n".join(fea) + "\n} calt;\n")
    fb.font.flavor = "woff2"
    fb.save(OUT_DIR + "/" + filename)
    if TTF_DIR and ttf_filename:
        build_ttf(family, glyph_order, cmap, advances, outlines, fea, TTF_DIR + "/" + ttf_filename)
    return missing

def build_ttf(family, glyph_order, cmap, advances, outlines, fea, path):
    """Same glyphs, metrics and ligatures as the woff2, with quadratic outlines in a glyf table."""
    glyphs = {}
    for g in glyph_order:
        pen = TTGlyphPen(None)
        if g in outlines:
            outlines[g].draw(TransformPen(Cu2QuPen(pen, max_err=1, reverse_direction=True), (S, 0, 0, -S, 0, 24 * S)))
        glyphs[g] = pen.glyph()
    fb = FontBuilder(1000, isTTF=True)
    fb.setupGlyphOrder(glyph_order)
    fb.setupCharacterMap(cmap)
    fb.setupGlyf(glyphs)
    fb.setupHorizontalMetrics(advances)
    fb.setupHorizontalHeader(ascent=1000, descent=0)
    fb.setupNameTable({"familyName": family, "styleName": "Regular"})
    fb.setupOS2(sTypoAscender=1000, sTypoDescender=0, sTypoLineGap=0, usWinAscent=1000, usWinDescent=0)
    fb.setupPost()
    addOpenTypeFeaturesFromString(fb.font, "languagesystem DFLT dflt;\nlanguagesystem latn dflt;\nfeature liga {\n" + "\n".join(fea) + "\n} liga;\nfeature calt {\n" + "\n".join(fea) + "\n} calt;\n")
    fb.save(path)

print("outline missing:", build("outline", "LDS Icons", "lds-icons.woff2", "lds-icons.ttf"))
print("bold missing:", build("bold", "LDS Icons Fill", "lds-icons-fill.woff2", "lds-icons-fill.ttf"))
