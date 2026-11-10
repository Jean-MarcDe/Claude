# Vortrag: Vom Token zur Entscheidung

Deutscher Foliensatz (48 Folien, ca. 90 Minuten) und Handbuch zur Theorie hinter LLMs
und zu ihrem Einsatz mit GitHub Copilot Enterprise in VS Code.

| Datei | Inhalt |
|---|---|
| `index.html` | Der Foliensatz. Eine Datei, läuft offline, Schriften eingebettet. |
| `handbuch.html` / `handbuch.pdf` | Das Handbuch (A4, 12 Seiten) zum Ausdrucken und Nachschlagen. |
| `src/` | Quellen: `slides-1.html`, `slides-2.html`, `deck.css`, `deck.js`, `handbuch.html`, `fonts/`. |
| `build.py`, `build-pdf.sh` | Setzen die Quellen zusammen bzw. drucken das PDF. |

## Präsentieren

`index.html` im Browser öffnen, `F` für Vollbild.

| Taste | Wirkung |
|---|---|
| `→` `Leertaste` | nächster Schritt, dann nächste Folie |
| `←` | zurück |
| `↓` `↑` | Folie vor / zurück ohne Schritte |
| `O` | Übersicht aller Folien |
| `E` | Texte direkt bearbeiten, `Cmd/Strg+S` exportiert |
| `?` | Tastenhilfe |

`index.html#29` springt direkt zu Folie 29. `index.html?static` schaltet alle Animationen ab.

Live-Demos: Folie 9 (Gradient Descent), 12 (Tokenization), 14 (Attention), 16 (Temperature),
19 (Context Window), 29 (Kostenrechner).

## Ändern

Quellen in `src/` bearbeiten, dann:

    python3 build.py && ./build-pdf.sh

## Stand der Fakten

Preise, AI Credits, Modellnamen und Dateipfade stammen aus den offiziellen GitHub Docs und
VS Code Docs, abgerufen am 10.11.2026. Illustrativ (keine Messung): die Zerlegungen der
Tokenizer-Demo, die Attention-Gewichte, die Logits der Temperature-Demo und der Richtwert
1,3–1,5 für den Token-Mehrbedarf deutscher Texte.

Stil: Preset „Swiss Modern“ des Skills `frontend-slides`, ergänzt um Token-Chips und die
Loss-Landscape als thematische Elemente. Schriften: Archivo, Nunito, JetBrains Mono (SIL OFL).
