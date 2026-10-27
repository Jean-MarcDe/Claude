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

## Unterschiede zur englischen Fassung

- Ein zusätzlicher Abschnitt **Terminologie** ordnet die englischen Fachbegriffe den in diesem
  Dokument verwendeten deutschen zu. Er ist die verbindliche Begriffsliste für alle deutschen
  Materialien, auch für den Foliensatz.
- Der Abschnitt zu **Spracheffekten** benennt den Mehrbedarf an Tokens für deutsche Texte, der in
  der englischen Fassung allgemeiner gehalten ist.
- **Silbentrennung ist aktiviert** (`hyphens: auto`, setzt `lang="de"` voraus). Ohne sie entstehen
  in den schmalen Spalten durch Komposita große Lücken.
- Zehn Seiten statt sieben: Deutscher Text ist länger, und die Terminologie kommt hinzu.

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
