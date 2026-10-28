# Foliensatz (deutsch) — Wie Sprachmodelle funktionieren

Deutsche Fassung des Workshop-Foliensatzes: 33 Folien, Notizen zu jeder Folie, 22 schrittweise
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

Die Foliennummer steht in der Adresse: `index.html#18` öffnet unmittelbar die Folie zum Harness.

## Aufbau des Vortrags

**Teil 1 — Wie ein Sprachmodell funktioniert (Folien 3–19).** Programmierte Regeln und gelernte
Parameter; ein Neuron; Training als schrittweise Anpassung; ein Trainingsschritt im Detail; warum
mehrere Schichten nötig sind; die Vorhersage des nächsten Tokens als Trainingsziel; Tokenisierung;
Embeddings; Attention; der Vorwärtslauf; Sampling und Temperatur; Autoregression; Parameter und
Kontext; Halluzination; Modell und System (Harness). Folie 19 fasst Teil 1 in einer Tabelle
zusammen, die jedem Mechanismus seine Folge für die Praxis zuordnet.

**Teil 2 — Was daraus für die Praxis folgt (Folien 20–33).** Die Begriffe in GitHub Copilot in
VS Code; das durchgehende Beispiel; Modellauswahl; Tokens und Credits; Kosten einer Aufgabe;
Kontext; Arbeitsmodi; Zerlegung; drei Arten von Kontrolle; angemessener Aufwand; Prompt Injection;
Prüfung; Zusammenfassung.

Die Reihenfolge folgt einer Argumentationslinie: was Lernen ist, wie ein Sprachmodell trainiert
wird, wie es Text verarbeitet und erzeugt, was es deshalb weiß und nicht weiß, und was es umgibt.
Hat ein Mechanismus eine unmittelbare Folge für die Praxis, steht sie auf der Folie in einem orange
umrandeten Kasten **Folge für die Praxis**. Teil 2 baut auf diesen Folgen auf.

## Aufbau der Dateien

| Datei | Inhalt |
|---|---|
| `index.html` | Die 33 Folien, ihre SVG-Diagramme und die Notizen |
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
Konzept, kurze Sätze. Folientitel benennen das jeweilige Konzept („Tokenisierung: Text wird in
Tokens zerlegt“) und sind keine Schlagzeilen. Zuspitzungen, Wortspiele und rhetorische Fragen in
Folientexten werden vermieden; die Notizen enthalten Fragen an das Publikum, weil sie dort eine
didaktische Funktion haben. Die Kennzeichnung oberhalb des Titels nennt Teil und Abschnitt des
Vortrags; die Kursmodule stehen in den Notizen.

Die Begriffszuordnung Englisch–Deutsch steht im Referenzblatt unter
[`../../handout/de/handout.html`](../../handout/de/handout.html), Abschnitt *Terminologie*. Sie
gilt für beide Materialien.

**Der Beispielsatz bleibt englisch.** „The nightly run failed because it timed out.“ wird im
gesamten Kurs analysiert, und die Beispielwerte der Attention- und Temperatur-Darstellung sind auf
genau diesen Satz abgestimmt. Eine Übersetzung hätte erfundene Gewichte erfordert. Folie 10 enthält
die deutsche Entsprechung, und die Notizen dieser Folie behandeln die Tokenisierung des Deutschen,
die mehr Tokens je Inhalt benötigt.

## GitHub Copilot

Folie 21 ordnet die Begriffe aus Teil 1 den Funktionen von GitHub Copilot in VS Code zu
(Modellauswahl, Kontext, Anweisungsdateien, Modi Ask/Plan/Agent, Tools, Freigaben, Abrechnung in
GitHub AI Credits). Die Folien in Teil 2 greifen das jeweils in einer Zeile oder in den Notizen
auf. Diese Angaben sind Stand Oktober 2026 und stammen aus Sekundärquellen, weil die
Dokumentationsserver von GitHub und VS Code aus der Arbeitsumgebung nicht erreichbar waren. Vor
dem Workshop in der eigenen Installation prüfen: Bezeichnungen der Modi, freigegebene Modelle,
zentrale Vorgaben für Freigaben.

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
