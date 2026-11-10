#!/usr/bin/env python3
"""Setzt den Foliensatz aus src/ zu einer einzigen, offline lauffähigen Datei zusammen.

    python3 build.py        ->  vortrag/index.html, vortrag/handbuch.html
    ./build-pdf.sh          ->  vortrag/handbuch.pdf (braucht einen Chromium-Browser)

Eingebettet werden: Stylesheet, Engine, alle Folien und die drei Schriften
(Archivo, Nunito, JetBrains Mono; SIL Open Font License) als base64.
"""
import base64
import pathlib

ROOT = pathlib.Path(__file__).parent
SRC = ROOT / "src"

FONTS = [
    ("Archivo", "archivo.woff2", "400 900"),
    ("Nunito", "nunito.woff2", "400 800"),
    ("JetBrains Mono", "jetbrainsmono.woff2", "400 700"),
]

# Loss Landscape: Höhenlinien und ein Gradient-Descent-Pfad (Signature-Element)
LAND = """<svg class="land{cls}" viewBox="0 0 1920 1080" aria-hidden="true">
  <g transform="rotate(-14 1440 620)">
    <ellipse cx="1440" cy="620" rx="60" ry="34"/><ellipse cx="1440" cy="620" rx="130" ry="76"/>
    <ellipse cx="1440" cy="620" rx="215" ry="128"/><ellipse cx="1440" cy="620" rx="315" ry="190"/>
    <ellipse cx="1440" cy="620" rx="430" ry="262"/><ellipse cx="1440" cy="620" rx="560" ry="344"/>
    <ellipse cx="1440" cy="620" rx="705" ry="436"/>
  </g>
  <polyline class="path" points="1800,240 1616,316 1658,452 1520,482 1540,570 1462,580 1452,612 1440,620"/>
  <circle class="dot" cx="1800" cy="240" r="9"/><circle class="dot" cx="1616" cy="316" r="7"/>
  <circle class="dot" cx="1658" cy="452" r="7"/><circle class="dot" cx="1520" cy="482" r="6"/>
  <circle class="dot" cx="1540" cy="570" r="6"/><circle class="dot" cx="1440" cy="620" r="13"/>
  <text x="1700" y="212">loss = 4.21</text><text x="1468" y="668">loss = 0.03</text>
</svg>"""


def font_css():
    out = []
    for family, fname, weight in FONTS:
        data = base64.b64encode((SRC / "fonts" / fname).read_bytes()).decode()
        out.append(
            "@font-face{font-family:'%s';font-style:normal;font-weight:%s;font-display:block;"
            "src:url(data:font/woff2;base64,%s) format('woff2');}" % (family, weight, data)
        )
    return "\n".join(out)


def main():
    slides = "".join((SRC / n).read_text(encoding="utf-8") for n in ("slides-1.html", "slides-2.html")
                     if (SRC / n).exists())
    slides = slides.replace("{{LAND_LIGHT}}", LAND.format(cls=" on-light")).replace("{{LAND}}", LAND.format(cls=""))
    html = (SRC / "shell.html").read_text(encoding="utf-8")
    html = (html.replace("/*{{FONTS}}*/", font_css())
                .replace("/*{{CSS}}*/", (SRC / "deck.css").read_text(encoding="utf-8"))
                .replace("<!--{{SLIDES}}-->", slides)
                .replace("/*{{JS}}*/", (SRC / "deck.js").read_text(encoding="utf-8")))
    out = ROOT / "index.html"
    out.write_text(html, encoding="utf-8")
    print("%s  %d Folien  %.0f KB" % (out.name, slides.count('<section class="slide'), len(html.encode()) / 1024))

    # Handbuch: dieselben eingebetteten Schriften, eine Datei
    hb = (SRC / "handbuch.html").read_text(encoding="utf-8").replace("/*{{FONTS}}*/", font_css())
    (ROOT / "handbuch.html").write_text(hb, encoding="utf-8")
    print("handbuch.html  %.0f KB" % (len(hb.encode()) / 1024))


if __name__ == "__main__":
    main()
