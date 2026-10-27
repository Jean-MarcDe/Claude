# Foliensatz (deutsch) — Von Tokens zu Entscheidungen

Deutsche Fassung des Workshop-Foliensatzes: 30 Folien, Notizen zu jeder Folie, 14 schrittweise
aufgedeckte Elemente und sechs interaktive Darstellungen.

## Verwendung

`index.html` in einem aktuellen Browser öffnen. Kein Build-Schritt, kein Server, keine
Netzwerkverbindung erforderlich.

| Taste | Wirkung |
|---|---|
| `→` `Leer` | Nächster Schritt, dann nächste Folie |
| `←` | Vorheriger Schritt, dann vorherige Folie |
| `↓` `↑` | Folie vor / zurück, ohne Schritte |
| `Pos1` `Ende` | Erste / letzte Folie |
| `S` oder `N` | Notizen |
| `D` | Helle / dunkle Ansicht |
| `?` oder `H` | Tastaturhilfe |

Die Foliennummer steht in der Adresse: `index.html#16` öffnet unmittelbar die Folie zum Harness.

## Aufbau der Dateien

| Datei | Inhalt |
|---|---|
| `index.html` | Die 30 Folien, ihre SVG-Diagramme und die Notizen |
| `deck.de.js` | Deutsche Zeichenketten für die Widgets und die Oberfläche |
| `../deck.css` | Gemeinsames Layout und Farbschema beider Sprachfassungen |
| `../deck.js` | Gemeinsame Engine und die sechs Widgets |

**Engine und Stylesheet werden mit der englischen Fassung geteilt.** `deck.js` liest die Sprache
aus `<html lang="de">` und schlägt jede sichtbare Zeichenkette in `window.DECK_DICT` nach, das
`deck.de.js` setzt. Fehlt ein Eintrag, erscheint das englische Original — eine Übersetzung kann
daher nicht stillschweigend verloren gehen. Die Schlüssel sind die englischen Originaltexte, und
`deck.de.js` muss vor `../deck.js` geladen werden.

Zahlen werden nach Sprache formatiert: Die deutsche Fassung zeigt Dezimalkomma und Tausenderpunkt
(`0,365` · `200.000`), die englische Punkt und Komma. Die zugrunde liegenden Werte sind in beiden
Fassungen identisch und stehen ausschließlich in `../deck.js`.

## Sprachliche Festlegungen

Der Text folgt dem Register technischer Dokumentation: sachlich, deklarativ, ein Begriff je
Konzept. Zuspitzungen und rhetorische Fragen in Folientexten werden vermieden; die Notizen
enthalten Fragen an das Publikum, weil sie dort eine didaktische Funktion haben.

Die Begriffszuordnung Englisch–Deutsch steht im Referenzblatt unter
[`../../handout/de/handout.html`](../../handout/de/handout.html), Abschnitt *Terminologie*. Sie
gilt für beide Materialien.

**Der Beispielsatz bleibt englisch.** „The nightly run failed because it timed out.“ wird im
gesamten Kurs analysiert, und die Beispielwerte der Attention- und Temperatur-Darstellung sind auf
genau diesen Satz abgestimmt. Eine Übersetzung hätte erfundene Gewichte erfordert. Folie 10 enthält
die deutsche Entsprechung, und die Notizen dieser Folie behandeln die Tokenisierung des Deutschen,
die mehr Tokens je Inhalt benötigt.

## Nach einer Änderung prüfen

```
node ../deck-test.js    de/index.html   # Überlauf, fehlende Notizen, Konsolenfehler
node ../widget-test.js  de/index.html   # Ergebnisse aller sechs Widgets
node ../svg-fit-test.js de/index.html   # Beschriftungen, die ihren Kasten sprengen
```

Die Befehle sind aus dem Verzeichnis `presentation/` auszuführen. Beide letztgenannten Prüfungen
sind für die deutsche Fassung wesentlich: Deutscher Text ist länger als englischer. Beim Erstellen
dieser Fassung liefen fünf Folien über die feste Höhe von 720 px hinaus und sechs
SVG-Beschriftungen über ihren Kasten; beides fällt beim bloßen Durchsehen nicht auf.

`svg-fit-test.js` meldet auf Folie 13 zwei Beschriftungen, die absichtlich außerhalb des
gestrichelten Blocks stehen. Dieselben zwei meldet die englische Fassung. Maßgeblich ist der
Vergleich beider Fassungen, nicht der Wert null.

## Verhältnis zu den übrigen Materialien

| Material | Zweck |
|---|---|
| [`../../course/`](../../course/) | Der vollständige Kurstext (englisch); maßgebliche Quelle für alle Aussagen |
| Dieser Foliensatz | Visuelle Darstellung für eine begleitete Veranstaltung |
| [`../../handout/de/`](../../handout/de/) | Kompaktes Referenzblatt für während und nach dem Workshop |
| [`../index.html`](../index.html) | Englische Fassung dieses Foliensatzes |

Der Kurs ist maßgeblich. Wo dieser Foliensatz vereinfacht, weisen die Notizen darauf hin; es wird
keine fachliche Aussage getroffen, die der Kurs nicht trifft.
