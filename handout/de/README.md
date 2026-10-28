# Referenzblatt (deutsch)

Deutsche Fassung des kompakten Referenzblatts. Zehn A4-Seiten.

| Datei | Rolle |
|---|---|
| `handout.md` | Pflegbare Quelle. Änderungen am Text hier zuerst. |
| `handout.html` | Druckfassung: A4, zweispaltiger Fließtext, Tabellen über die volle Breite. |
| `handout.pdf` | Aus der HTML-Fassung erzeugt. |

PDF neu erzeugen, aus dem Verzeichnis `handout/`:

```
node build-pdf.js de      # nur die deutsche Fassung
node build-pdf.js         # beide Fassungen
```

## Inhalt

Teil Eins endet mit einer Tabelle, die jedem Mechanismus seine Folge für die Praxis zuordnet. Teil
Zwei beginnt mit einer Tabelle, die zeigt, wo die Begriffe in GitHub Copilot in VS Code vorkommen.
Beide entsprechen dem Foliensatz (Folien 19 und 21). Die Angaben zu GitHub Copilot sind Stand
Oktober 2026 und vor einer verbindlichen Festlegung zu prüfen.

## Unterschiede zur englischen Fassung

- Ein zusätzlicher Abschnitt **Terminologie** ordnet die englischen Fachbegriffe den in diesem
  Dokument verwendeten deutschen zu. Er ist die verbindliche Begriffsliste für alle deutschen
  Materialien, auch für den Foliensatz.
- Der Abschnitt zu **Spracheffekten** benennt den Mehrbedarf an Tokens für deutsche Texte, der in
  der englischen Fassung allgemeiner gehalten ist.
- **Silbentrennung ist aktiviert** (`hyphens: auto`, setzt `lang="de"` voraus). Ohne sie entstehen
  in den schmalen Spalten durch Komposita große Lücken.
- Zehn Seiten statt acht: Deutscher Text ist länger, und die Terminologie kommt hinzu. Die
  Terminologie beginnt keine neue Seite, sondern folgt direkt auf Teil Zwei; ihre Tabelle darf
  zwischen zwei Zeilen umbrechen.

## Register

Der Text folgt dem Register technischer Dokumentation: sachlich, deklarativ, ein Begriff je
Konzept, keine Zuspitzungen. Fachbegriffe werden bei der ersten Erwähnung mit dem englischen
Original genannt.

Fachlich entspricht das Blatt der englischen Fassung. Es trifft keine Aussage, die
[`../../course/`](../../course/) nicht trifft.

## Bei Änderungen

Zehn Seiten sind die Obergrenze. Kommt etwas hinzu, ist zu entscheiden, was entfällt. Nach einer
Änderung `node build-pdf.js de` ausführen und Seitenzahl sowie Tabellen prüfen, die nun über einen
Seitenwechsel fallen könnten.
