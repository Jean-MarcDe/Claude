# Wie Sprachmodelle funktionieren — Referenzblatt

Die Definitionen, Zusammenhänge und Entscheidungskriterien des Workshops zum Nachschlagen im
Arbeitsalltag. Grundlage ist der englische Kurs *Tokens to Decisions*.

Vollständiger Kurs (englisch): `../../course/index.html` · Foliensatz: `../../presentation/de/index.html` ·
Englische Fassung dieses Blatts: `../handout.html`

Die Ziffern in eckigen Klammern verweisen auf den Abschnitt des Kurses, der den Eintrag entwickelt.

**Zur Sprache.** Der Kurs ist auf Englisch verfasst. Dieses Referenzblatt verwendet die im
deutschsprachigen Fachgebrauch üblichen Begriffe und nennt bei der ersten Erwähnung den englischen
Originalbegriff. Abschnitt *Terminologie* am Ende enthält die vollständige Zuordnung.

---

## Teil Eins — Wie ein Sprachmodell funktioniert

### Lernen und Training

**Maschinelles Lernen** (machine learning) — die Regeln werden durch ein Suchverfahren ermittelt und
nicht von einer Person geschrieben. Beim **überwachten Lernen** (supervised learning) werden Eingaben
zusammen mit den gewünschten Ausgaben vorgegeben. Beim **selbstüberwachten Lernen**
(self-supervised learning) werden die Zielwerte aus den Daten selbst gebildet; auf diese Weise werden
Sprachmodelle trainiert: Der folgende Textabschnitt wird verdeckt und vorhergesagt. Eine Annotation
entfällt, die Menge verfügbarer Trainingsdaten ist daher praktisch unbegrenzt. [1.1, 1.9]

**Neuronales Netz** (neural network) — Schichten einfacher Einheiten. Jede Einheit bildet eine
gewichtete Summe ihrer Eingaben, addiert eine Konstante und wendet eine nichtlineare Funktion an.
Ohne diese Nichtlinearität lassen sich gestapelte Schichten algebraisch zu einer einzigen Schicht
zusammenfassen. [1.2, 1.5]

**Parameter** — die gelernten Zahlen: die **Gewichte** (weights), mit denen jede Eingabe
multipliziert wird, und der **Bias**, der zur Summe addiert wird. Ein aktuelles großes Modell hat
in der Größenordnung von 10¹¹ Parameter. Davon zu unterscheiden sind **Hyperparameter** (Anzahl der
Schichten, Lernrate), die vor dem Training festgelegt und nicht gelernt werden. [1.2]

> ```
> z = w₁x₁ + w₂x₂ + b        ŷ = σ(z) = 1 / (1 + e⁻ᶻ)
> ```

**Verlustfunktion** (loss) — eine einzelne Zahl, die angibt, wie falsch eine Vorhersage war. Sie ist
die vollständige Spezifikation des Trainingsziels. Für einfache Regression eignet sich der
quadratische Fehler ½(ŷ − y)². Sprachmodelle verwenden die **Kreuzentropie** (cross-entropy), also
−log der Wahrscheinlichkeit, die dem tatsächlich aufgetretenen Token zugewiesen wurde. Sie bestraft
eine Wahrscheinlichkeit nahe null für ein Ereignis, das dann eintritt. [1.3, 1.9]

**Gradientenabstieg** (gradient descent) — die Steigung der Verlustfunktion wird bezüglich jedes
Parameters berechnet, anschließend wird jeder Parameter um einen kleinen Betrag in Richtung des
Abstiegs verschoben.

> ```
> w ← w − η · ∂L/∂w          η ist die Lernrate
> ```
>
> Ist die Schrittweite zu klein, verläuft das Training sehr langsam; ist sie zu groß, überschreitet
> jeder Schritt das Ziel. In der Praxis wird der Gradient aus einem kleinen zufälligen **Batch**
> geschätzt und nicht aus dem gesamten Datenbestand. [1.4]

**Backpropagation** — ein Verfahren, das alle benötigten Ableitungen in einem einzigen Rückwärtslauf
berechnet, mit etwa dem Aufwand eines zusätzlichen Vorwärtslaufs. Backpropagation berechnet
Ableitungen; der Gradientenabstieg führt die Anpassung durch. Beide Begriffe werden häufig
gleichgesetzt und bezeichnen verschiedene Vorgänge. [1.6]

**Generalisierung und Überanpassung** (overfitting) — maßgeblich ist das Verhalten bei
ungesehenen Eingaben. Ein Modell mit ausreichender Kapazität kann seine Trainingsdaten auswendig
lernen und bei neuen Eingaben schlecht abschneiden; ein zurückgehaltener Datensatz macht dies
sichtbar. Große Modelle behalten zudem wörtliche Ausschnitte der Trainingsdaten, was eine
lizenzrechtliche Frage unabhängig von der Qualität ist. [1.7]

**Inferenz** (inference) — die Anwendung des trainierten Modells. Die Parameter sind unveränderlich,
es wird nichts zurückgeschrieben, und keine Nutzung verändert das Modell. Was wie Erinnerung wirkt,
ist stets Text, den die umgebende Software erneut übermittelt hat. [1.8]

### Von Text zu Vorhersage

**Token** — ein Textabschnitt aus einem festen Vokabular von etwa 100.000 bis 200.000 Einträgen. Das
Vokabular wird vor dem Training gebildet, indem wiederholt das häufigste benachbarte Zeichenpaar
zusammengefasst wird (**Byte-Pair-Encoding**). Die Häufigkeit bestimmt die Granularität. Ein
führendes Leerzeichen gehört zum jeweiligen Token, und das Modell kann die einzelnen Zeichen
innerhalb eines Tokens nicht erkennen. [2.1]

**Spracheffekte** — das Vokabular wurde aus einem Korpus gebildet, in dem Englisch und Quellcode
überwiegen. Derselbe Inhalt benötigt in den meisten anderen Sprachen mehr Tokens. **Für Deutsch ist
dieser Effekt relevant:** Komposita und längere Wortformen werden in mehrere Tokens zerlegt, sodass
ein deutscher Text in der Regel mehr Tokens benötigt als die englische Entsprechung. Der Faktor
sollte für die eigenen Texte gemessen und nicht geschätzt werden. Er wirkt auf die Kosten und über
das Kontextfenster auch darauf, wie viel Material hineinpasst. [2.5]

**Embedding** — die erste Schicht ist eine Tabelle mit einer Zeile je Vokabulareintrag. Die über die
Token-Kennung ausgewählte Zeile ist das **statische Embedding**, geschrieben **e**(*t*). Das Training
ordnet die Zeilen so an, dass ähnlich verwendete Tokens benachbart liegen.

> Einzelne Dimensionen entsprechen **keinen** interpretierbaren Eigenschaften. Bedeutungstragende
> Richtungen setzen sich aus vielen Koordinaten zusammen. Zweidimensionale Darstellungen sind
> Projektionen, die nahezu die gesamte Struktur verwerfen. [2.3]

**Kontextuelle Repräsentation** — geschrieben **h**ᵢ⁽ˡ⁾, der Vektor an Position *i* nach Schicht *l*,
nachdem Attention Informationen aus anderen Positionen eingemischt hat. Ein statisches Embedding je
Token, viele kontextuelle Repräsentationen: Das statische Embedding hängt nur vom Token ab, die
kontextuelle Repräsentation vom Token *und seinem Satz*. [3.2]

**Attention** (Aufmerksamkeitsmechanismus) — jede Position erzeugt eine Anfrage (query), die
beschreibt, welche Information sie benötigt; jede Position bietet einen Schlüssel (key); jede
Position erhält eine gewichtete Mischung der Werte (values) der übrigen Positionen.

> ```
> Attention(Q,K,V) = softmax( QKᵀ / √dₖ ) V
> ```
>
> Die Skalierung mit √dₖ hält die Softmax-Funktion außerhalb ihres gesättigten Bereichs. Der Aufwand
> wächst quadratisch mit der Sequenzlänge; lange Kontexte sind deshalb rechenaufwendig. Attention-Gewichte zeigen, woher Information bezogen
> wurde; sie sind **keine** Erklärung der Ausgabe. [3.2, 3.3]

**Transformer** — gestapelte Blöcke, die jeweils Multi-Head-Attention mit einem
Feed-Forward-Netz verbinden, mit Residualverbindungen und Normalisierung um beide. Attention bewegt
Information zwischen Positionen; das Feed-Forward-Netz verarbeitet Information an einer Position.
[3.4]

**Logits und Softmax** — der Vorwärtslauf endet mit einem Rohwert je Vokabulareintrag. Die
Softmax-Funktion überführt diese Werte in eine Wahrscheinlichkeitsverteilung mit der Summe eins.
[3.5]

**Temperatur** — teilt die Logits vor der Softmax-Funktion. Werte unter 1 verschärfen die
Verteilung, Werte über 1 flachen sie ab.

> ```
> p(t) = e^(zₜ/T) / Σ e^(zₜ′/T)
> ```
>
> Das Abflachen hebt die Wahrscheinlichkeit des *gesamten* Vokabulars an, und dieser Rest ist groß:
> Bei etwa 200.000 Tokens summiert sich ein geringer Zuwachs je Token zum überwiegenden Teil der
> Wahrscheinlichkeitsmasse. **Top-p** beschränkt vor dem Ziehen auf die kleinste Menge von Tokens,
> deren Wahrscheinlichkeiten sich zu p summieren; aus diesem Grund wird das Verfahren zusammen mit
> der Temperatur eingesetzt. [4.3, 4.4]

**Autoregression** — ein Token je Vorwärtslauf. Das Token wird an den Kontext angehängt, anschließend
läuft der gesamte Vorgang erneut. Daraus folgt: Die Kosten wachsen mit der Kontextlänge, Fehler
verstärken sich, und erzeugter Text ist von zugeliefertem Text nicht mehr zu unterscheiden. [4.6]

**Kontextfenster** (context window) — die maximale Eingabe in Tokens. Der Platz ist begrenzt und wird
geteilt: Anweisungen konkurrieren mit Material. Eine angegebene Länge beschreibt, was *entgegen­genommen*
wird, nicht, wie zuverlässig Material an beliebiger Stelle *verwendet* wird. Das Auffinden einer
bestimmten Angabe wird mit wachsender Eingabe unzuverlässiger; der mittlere Bereich eines langen
Kontexts ist am schwächsten. [4.7]

**Halluzination** — flüssige, inhaltlich falsche Ausgabe. Kein Schritt des Verfahrens prüft eine
Aussage gegen die Wirklichkeit. Es handelt sich um denselben Mechanismus, der korrekte Antworten
erzeugt, angewendet auf einen Bereich, in dem die Trainingsdaten ihn nicht eingeschränkt haben.
Gegenmaßnahmen sind daher struktureller Art und keine nachträgliche Korrektur. [4.8]

**Pretraining und Post-Training** — das Pretraining liefert das Wissen. Das **überwachte Nachtrainieren**
(supervised fine-tuning) vermittelt das Frage-Antwort-Format; das **präferenzbasierte Nachtrainieren**
(RLHF und verwandte Verfahren) prägt Tonfall, Hilfsbereitschaft und Ablehnungsverhalten — und damit
auch eine Neigung zur Zustimmung. Sicherheitsverhalten ist eine antrainierte Disposition und keine
technisch erzwungene Beschränkung. [5.1]

### Systeme um das Modell

**Harness** (Rahmenprogramm) — das Programm, das das Modell umgibt: Es stellt den Kontext zusammen,
liefert die Tool-Definitionen, wertet die Ausgabe aus, führt Tools aus und entscheidet über den
Abbruch. Dasselbe Modell verhält sich in verschiedenen Harnesses unterschiedlich; vieles, was dem
Modell zugeschrieben wird, legt der Harness fest. GitHub Copilot in VS Code ist ein solcher Harness.
[5.4]

**Tool / Tool-Aufruf** — das Modell gibt eine strukturierte Anforderung aus, die ein Tool und dessen
Argumente benennt; der Harness prüft die Berechtigungen, führt den Code aus und hängt das Ergebnis an
den Kontext an. **Das Modell führt nichts selbst aus.** Tool-Beschreibungen sind Teil des Prompts;
Tool-Ergebnisse sind nicht vertrauenswürdige Eingaben. [5.8]

**Agentische Schleife** (agentic loop) — beobachten, entscheiden, handeln, wiederholen, bis eine
Abbruchbedingung erfüllt ist. Die Zuverlässigkeit hängt überwiegend davon ab, welche Rückmeldung
innerhalb der Schleife verfügbar ist. [5.9]

**Retrieval (RAG)** — Dokumente werden einmalig eingebettet, zu einer Frage werden die nächstgelegenen
Abschnitte ermittelt und in den Kontext eingefügt. Dies ist die wirksamste Einzelmaßnahme gegen
Halluzination. Die auftretenden Fehler sind Suchfehler; zur Fehlersuche ist daher zu prüfen, was
abgerufen wurde. [5.11]

**Prompt Injection** — Text, der dort platziert wird, wo ein Modell ihn liest, und als Anweisung
formuliert ist. Bei der **indirekten** Variante steht der Text in einem Dokument, einer Webseite oder
einem Datensatz aus externer Quelle. Das Verfahren funktioniert, weil Anweisungen und Daten denselben
Eingabekanal verwenden und die Herkunft nicht festgehalten wird. Es handelt sich um eine Eigenschaft
der Architektur; eine allgemeine Korrektur gibt es derzeit nicht. [6.1, 6.2]

### Was aus der Funktionsweise folgt

| Mechanismus | Folge für die Praxis |
|---|---|
| Parameter werden aus Beispielen gelernt | Ob ein Modell eine Aufgabe beherrscht, zeigt nur ein Test mit bekannten Antworten |
| Trainingsziel: das nächste Token vorhersagen | Ausgaben sind plausibel, aber nicht geprüft |
| Text wird in Tokens zerlegt | Buchstaben zählen und exaktes Rechnen sind unzuverlässig; Kosten und Kontext werden in Tokens gemessen; Deutsch braucht mehr Tokens |
| Das nächste Token wird gezogen | Dieselbe Anfrage kann verschiedene Antworten ergeben |
| Jedes erzeugte Token wird angehängt | Lange Kontexte kosten mehr; frühe Fehler setzen sich fort; die Herkunft von Text ist nicht gekennzeichnet |
| Feste Parameter, begrenzter Kontext | Kein Gedächtnis zwischen Dialogen; neuere und interne Informationen sind nur bekannt, wenn sie im Kontext stehen |
| Kein Schritt prüft Aussagen | Halluzinationen sind zu erwarten; Ergebnisse müssen geprüft werden |
| Ein Harness umgibt das Modell | Vieles, was man „der KI“ zuschreibt, ist eine Einstellung des Systems |

---

## Teil Zwei — Was daraus für die Praxis folgt

### Die Begriffe in GitHub Copilot

Stand Oktober 2026, aus Sekundärquellen; Bezeichnungen ändern sich zwischen Versionen.

| Begriff | In GitHub Copilot in VS Code |
|---|---|
| Modell | Auswahlliste im Chat. Welche Modelle erscheinen, legt die Organisation fest. |
| Kontext | Angehängte Dateien und Ordner (mit `#` im Eingabefeld), der bisherige Chat, je nach Einstellung die geöffnete Datei. |
| Dauerhafte Anweisungen | Anweisungsdateien im Projekt, z. B. `.github/copilot-instructions.md`; Prompt-Dateien (`*.prompt.md`) für wiederkehrende Anfragen. |
| Arbeitsmodi | *Ask*: Fragen und Antworten. *Plan*: Plan vor der Ausführung. *Agent*: arbeitet selbstständig mit Tools. |
| Tools, agentische Schleife | Im Agent-Modus: Dateien lesen und ändern, Terminalbefehle ausführen. Erweiterbar über MCP-Server. |
| Technische Beschränkung | Freigabe von Tool-Aufrufen und Terminalbefehlen; Vorgaben der Organisation. |
| Kosten | GitHub AI Credits seit 1. Juni 2026, berechnet nach verbrauchten Tokens; 1 Credit = 0,01 US$. Die Code-Vervollständigung verbraucht keine Credits. |

### Modellauswahl

| Eigenschaft | Besonders wichtig bei |
|---|---|
| Leistung bei schwierigen Aufgaben | Mehrstufiger Arbeit, bei der sich ein früher Fehler fortsetzt |
| Befolgen von Anweisungen | Vorgaben, die über eine lange Ausgabe hinweg gelten müssen |
| Strukturierte Ausgabe | Einer vorgegebenen Form, zuverlässig bei jedem Durchlauf |
| Tool-Nutzung | Auswahl des richtigen Tools und korrekter Auswertung des Ergebnisses |
| Verarbeitung langer Kontexte | Material, das weit vom Ende des Fensters entfernt steht |
| Antwortzeit | Dialogbetrieb mit häufigem Wechsel |
| Kosten | Allem, was wiederholt ausgeführt wird |

**Reasoning Effort** (Umfang der Zwischenberechnung) — eine Einstellung je Aufgabe, keine feste
Eigenschaft des Modells. Zusätzliche Berechnung zur Laufzeit hilft bei Aufgaben mit tatsächlicher
Schlussfolgerungstiefe; bei Abruf oder Umformatierung erhöht sie nur Kosten und Antwortzeit. Das
Ausmaß des Nutzens hängt von Modell, Aufgabe und Budget ab und ist durch Vergleich zu bestimmen, nicht
durch Annahme. [8.1]

**Benchmarks** — als erster Filter geeignet, nicht als Entscheidungsgrundlage. Zusammengesetzte
Indizes enthalten eine Gewichtung, die jemand anderes festgelegt hat; die Testbedingungen variieren;
veröffentlichte Benchmarks gelangen in spätere Trainingsdaten; gesättigte Benchmarks verringern
sichtbare Unterschiede; und keiner von ihnen bildet die eigene Aufgabe ab. Geeignet sind sie, um aus
dreißig Modellen drei auszuwählen. [8.2]

**Eigene Evaluation** — fünf bis zehn reale Aufgaben mit bekanntem Sollergebnis; Abnahmekriterien,
die *vor* den Durchläufen festgelegt werden; je Aufgabe drei Durchläufe, da die Ausgabe gezogen wird
und ein einzelner Durchlauf den Zufall misst; Bewertung anhand der Kriterien unter Erfassung von
Kosten und Dauer. Der Aufwand beträgt etwa einen halben Tag und beantwortet die Frage, die eine
Rangliste nicht beantworten kann. [8.3, 14.2]

### Kosten

| Einheit | Was sie bezeichnet | Festgelegt durch |
|---|---|---|
| Token | Ein verarbeiteter Textabschnitt | Den Tokenizer — technisch |
| Modellaufruf | Eine Anfrage mit eigenem Kontext | Die Systemarchitektur |
| Ihre Anweisung | Eine angeforderte Leistung | Sie — kann viele Aufrufe auslösen |
| Credit | Eine Verrechnungseinheit mit festgelegtem Wert | Den Anbieter, durch Richtlinie |
| Kontingent | Credits je Lizenz und Abrechnungszeitraum | Ihren Vertrag |

**Token-Preise** — Eingabe, zwischengespeicherte Eingabe und Ausgabe werden getrennt berechnet. Die
Ausgabe kostet in der Regel ein Mehrfaches der Eingabe, da sie sequenziell erzeugt wird.
Zwischengespeicherte Eingabe — ein Präfix, das der Anbieter bereits verarbeitet hat — kostet häufig
etwa ein Zehntel der Eingabe. Daraus folgt der finanzielle Wert stabiler Anweisungen. **Tokens für
Zwischenberechnungen werden als Ausgabe abgerechnet und sind oft nicht sichtbar.** [8.4]

> **Eine Anweisung kann viele Modellaufrufe auslösen.** Ein agentischer Ablauf erzeugt aus einem Satz
> leicht zwanzig. Wie Tokens in Credits umgerechnet werden, legt der Anbieter fest. [8.5]

**Was den Verbrauch erhöht**

- Lange angehängte Dokumente, die bei jedem Dialogschritt erneut übermittelt werden
- Lange Dialoge, da der gesamte Verlauf je Schritt erneut übermittelt wird
- Hoher Reasoning Effort
- Agentische Schleifen: mehr Schritte und bei jedem Schritt wachsender Kontext
- Veränderte Prompt-Präfixe, wodurch die Zwischenspeicherung entfällt
- Wiederholungen aufgrund einer unzureichend spezifizierten Aufgabe

**Gesamtkosten** — die Modellkosten sind in der Regel der kleinere Posten. Eine Prüfung von zwanzig
Minuten übersteigt sie, bewertet mit einem Vollkostensatz, meist um ein Vielfaches. Der günstigste
Weg ist daher derjenige, der die wenigsten Korrekturen erfordert. Zu berücksichtigen sind
Modellkosten, Durchlaufzeit, Wiederholungen, menschliche Prüfung und die Kosten eines Fehlers, der
unbemerkt bleibt. [8.7]

### Context Engineering

**Inhalt des Kontexts** — der System-Prompt des Anbieters, die Tool-Definitionen, Ihre dauerhaften
Anweisungen, Material aus Ihrer Arbeitsumgebung, abgerufene Abschnitte, der bisherige Dialog und
zuletzt Ihre Eingabe. Ihre Eingabe ist davon ein kleiner Anteil. [9.1]

**Aufbau eines Prompts**

| Bestandteil | Schwach | Belastbar |
|---|---|---|
| Ziel | „Vergleiche die Lieferanten“ | „Eine vierseitige Empfehlung für einen Lieferanten, für die Sitzung am Donnerstag“ |
| Hintergrund | *fehlt* | „Die Anlagen laufen im Dauerbetrieb; der Dauerdurchsatz ist wichtiger als der Spitzenwert“ |
| Vorgaben | „Sei genau“ | „Herstellerangaben nie als Messwert darstellen“ |
| Ausgabeform | „Schreib das auf“ | „Tabelle, dann Widersprüche, dann Annahmen, dann Empfehlung“ |
| Abnahmekriterien | *fehlt* | „Jede Zahlenangabe auf Seite oder Zeilenbereich zurückführbar“ |
| Umgang mit Lücken | *fehlt* | „Aufführen, was nicht überprüft werden konnte und was stattdessen angenommen wurde“ |

Die beiden letzten Bestandteile fehlen am häufigsten und verändern das Ergebnis am stärksten. [9.5]

**Wann ein neuer Dialog zu beginnen ist**

- Die Aufgabe hat sich geändert
- Drei Korrekturen sind erfolglos geblieben — der Kontext enthält nun drei falsche Ansätze
- Die Qualität hat über eine lange Sitzung nachgelassen
- Der Wechsel von der Erkundung zur eigentlichen Arbeit steht an
- Vor Arbeitsschritten, bei denen eine übrig gebliebene frühere Anweisung teuer wäre

**Lange Sitzungen** — Harnesses behandeln das Anwachsen unterschiedlich: Manche verwerfen die
frühesten Schritte, manche fassen fortlaufend zusammen, manche rufen gezielt ab, viele fügen
dauerhafte Anweisungen bei jeder Anfrage erneut ein. Welches Verfahren Ihr System verwendet, ist
festzustellen. Bei Arbeiten über mehrere Sitzungen ist jede Sitzung mit einer kurzen Übergabenotiz zu
beenden und die folgende damit zu beginnen. [9.4]

### Arbeitsmodi

| Modus | Sie beurteilen | Geeignet für |
|---|---|---|
| Dialog | Jede Antwort | Verstehen, Entwerfen, Festlegen des Vorgehens |
| Planung | Den Plan, vor der Ausführung | Umfangreiche oder unklare Aufgaben |
| Interaktiv | Jede einzelne Aktion | Die meisten umfangreicheren Arbeiten; jeden ersten Durchlauf |
| Autonom | Nur das Ergebnis | Eingeführte, prüfbare, wiederkehrende Aufgaben |

**Auswahl** — Wie eindeutig ist die Aufgabe? Wie umkehrbar sind die Aktionen? Welche Kosten
verursacht ein Fehler? Lässt sich der Erfolg automatisch prüfen? Worauf können die Tools zugreifen?
Wie viel nicht dokumentiertes Urteilsvermögen ist erforderlich? Zu beginnen ist mit dem geringsten
Autonomiegrad, der die Aufgabe erfüllen kann; für jeden ersten Durchlauf ist der interaktive Modus zu
verwenden. In GitHub Copilot entspricht *Ask* dem Dialog und *Plan* der Planung; *Agent* arbeitet
interaktiv oder autonom, je nachdem, ob Aktionen einzeln oder automatisch freigegeben werden.
[10.2, 10.3]

### Drei Arten von Kontrolle

| | Bestimmt | Beispiel |
|---|---|---|
| **Anweisung** — Prompts, Vorgaben, Stilregeln | Was *wahrscheinlich* ist | „Zu jeder Zahl eine Seitenangabe nennen“ |
| **Orchestrierung** — Schritte, Verzweigungen, Abbruchbedingungen | Was *üblicherweise* geschieht | Ein Prüfschritt, der die Belege kontrolliert |
| **Technische Beschränkung** — Berechtigungen, Sandbox, Freigabe | Was *möglich* ist | Kein Schreibzugriff außerhalb des Entwurfsordners |

Die Formulierung „verändere keine Dateien“ ist eine Anweisung und kann verdrängt werden. Ein
Nur-Lese-Zugriff ist eine technische Beschränkung und kann es nicht. Alles, was teuer oder nicht
umkehrbar ist, gehört in die dritte Zeile. In GitHub Copilot ist eine Anweisungsdatei eine
Anweisung, die Freigabe von Tool-Aufrufen eine technische Beschränkung. [10.5]

### Planung und Delegation

**Wann Planung sinnvoll ist** — die Aufgabe ist umfangreich, unklar oder teuer zu wiederholen;
mehrere Beteiligte müssen sich darüber verständigen, was „fertig“ bedeutet; die Arbeit wird delegiert;
oder ein erster Versuch ist unerwartet ausgefallen. Ein Planungsdurchlauf kostet einen Bruchteil
eines vollständigen Versuchs und macht Missverständnisse in einem kurzen Zwischenergebnis sichtbar.
[11.1]

**Ein brauchbarer Plan** nennt das Ziel in den Worten des Modells, die fehlenden Informationen, das
Arbeitsergebnis, die Vorgaben und Abnahmekriterien, die Zerlegung, die Abhängigkeiten, je Teilaufgabe
ein vorgeschlagenes Modell und einen Modus sowie den Schritt der Zusammenführung. [11.2]

**Wann Delegation sinnvoll ist** — die Aufgabe übersteigt, was ein Kontext zuverlässig aufnimmt; die
Teilaufgaben unterscheiden sich deutlich im Schwierigkeitsgrad; Teile können parallel laufen; oder
die Arbeit wiederholt sich häufig genug, um eine einmalige Spezifikation zu rechtfertigen.

**Was Delegation kostet** — Kontext wird zwischen Teilaufgaben nicht übertragen; die Spezifikation
ist eigener Aufwand; Fehler setzen sich fort, ohne erneut geprüft zu werden; die Zusammenführung ist
ein Beurteilungsschritt, der häufig als reine Routine behandelt wird; sequenzielle Abhängigkeiten
erhöhen die Durchlaufzeit. Ein einzelnes leistungsfähiges Modell mit sorgfältig zusammengestelltem
Kontext liefert häufiger bessere Ergebnisse als eine schlecht orchestrierte Kette. [11.4]

### Dauerhafte Konfiguration

| Geltungsbereich | Aufwand je Anfrage | Geeignet für |
|---|---|---|
| Einmalige Anweisung | Einmalig | Was an dieser Anfrage besonders ist |
| Persönliche Voreinstellungen | Jede Anfrage, überall | Schreibstil, Sprache, Detailgrad |
| Projektanweisungen | Jede Anfrage im Projekt | Terminologie, Konventionen, Aufbau |
| Pfadbezogene Anweisungen | Nur bei passender Arbeit | Regeln für eine bestimmte Materialart |
| Gespeicherte Prompt-Vorlage | Beim Aufruf | Eine wiederkehrende Anfrage in gleicher Form |
| Skill | Beschreibung immer; Inhalt bei Bedarf | Ein Verfahren mit festgelegten Anforderungen |
| Organisationsrichtlinie | Unterschiedlich | Was unabhängig von Vorlieben gelten muss |

Jede Anweisung gehört in den engsten Geltungsbereich, der noch alle Fälle erfasst. Anbieter
trainieren Modelle in der Regel darauf, Anweisungen aus dem Systemkanal Vorrang vor Benutzereingaben
und vor Dokumentinhalten einzuräumen. Diese Rangfolge besteht tatsächlich, sie ist jedoch eine
antrainierte Disposition und keine erzwungene Regel; für Konflikte *innerhalb* einer Ebene existiert
keine dokumentierte Auflösung. Widersprüche sind daher zu beseitigen und nicht einer Rangfolge zu
überlassen. [12.1]

**Ein Stilprofil wirkt, wenn es Entscheidungen benennt** — Stimme, Tempus, Person, Schreibweise von
Überschriften, Satzlänge, zu vermeidende Wörter — statt gutes Schreiben zu beschreiben. Es ist
vierteljährlich zu prüfen und zu kürzen; jede Zeile wird mit jeder Anfrage übermittelt. [12.2, 12.4]

### Skills, Agenten und Tools

| Begriff | Stellt bereit | Wird ausgelöst durch |
|---|---|---|
| Prompt | Text, einmalig | Sie, durch Eingabe |
| Gespeicherte Prompt-Datei | Text, wiederverwendbar | Sie, über den Namen |
| Dauerhafte Anweisungen | Text, immer vorhanden | Niemanden — stets aktiv |
| **Skill** | Text und optional Dateien, bei Bedarf | Das Modell, sofern die Auswahl automatisch erfolgt |
| **Eigener Agent** | Anweisungen, Tool-Auswahl, teils ein Modell | Sie, durch Auswahl |
| **Subagent** | Dasselbe, innerhalb eines größeren Ablaufs | Das orchestrierende System |
| **Tool** | Die Fähigkeit, außerhalb von Text zu handeln | Modell fordert an, Harness führt aus |
| **MCP-Server** | Ein Paket aus Tools und Ressourcen | Einmalige Konfiguration |
| **Hook** | Code an festgelegter Stelle, bei jedem Durchlauf | Niemanden — deterministisch |

**Skills** arbeiten mit gestufter Offenlegung (progressive disclosure): Ein kurzer Name und eine
Beschreibung verbleiben im Kontext; der Inhalt wird bei Relevanz geladen; zugehörige Dateien werden
nur bei Bedarf geöffnet. Wo ein Harness Skills automatisch auswählt, trägt die Beschreibung die
Hauptlast, da sie dem Modell bei der Entscheidung meist als einzige Information vorliegt. Manche
Umgebungen verlangen stattdessen den Aufruf über den Namen. [13.2]

**MCP und Tools** — einen Server hinzuzufügen bedeutet, fremden Code mit den erteilten
Zugangsdaten zu installieren. Zu klären sind der Herausgeber, eine feste Version, die einmalige
Durchsicht der Tool-Beschreibungen, die Beschränkung der Zugangsdaten auf das Notwendige und ein
Verzeichnis des Installierten. Nur die Tools freigeben, die für die Aufgabe nötig sind. [13.4]

### Umfang der zu erstellenden Struktur

| Vorgehen | Einrichtungsaufwand | Angemessen, wenn |
|---|---|---|
| Einzelne Anfrage im Dialog | Keiner | Einmalige Arbeit, oder das Ziel ist noch offen |
| Strukturierte Aufgabenspezifikation | Minuten | Es darauf ankommt und der erste Versuch fehlschlug |
| Gespeicherte Prompt-Vorlage | Unter einer Stunde | Dieselbe Anfrage wiederholt sich |
| Dauerhafte Anweisungen | Eine Stunde zzgl. Pflege | Eine Vorgabe gilt für viele Aufgaben |
| Wiederverwendbarer Skill | Ein halber Tag zzgl. Pflege | Ein mehrstufiges Verfahren, regelmäßig genutzt |
| Agent mit Tool-Zugriff | Einrichtung und Berechtigungsprüfung | Aktionen nötig, die Text allein nicht leisten kann |
| Mehrere abgestimmte Agenten | Erheblich | Teilaufgaben unterscheiden sich stark oder laufen parallel |
| **Herkömmliche Software** | Oft geringer als erwartet | **Das Verfahren ist exakt und die Eingaben sind strukturiert** |

Häufigkeit, Variabilität der Eingaben, Fehlerkosten, Anzahl der Beteiligten und Stabilität der
Aufgabe verschieben die Antwort. Ein Modell rechtfertigt seine Kosten, wo Eingaben unregelmäßig sind,
Urteilsvermögen erforderlich ist oder die Aufgabe sich nicht vorab exakt spezifizieren lässt. [13.6]

### Prüfung

**Abnahmekriterien** sollten auch von einer anderen Person als der verfassenden anwendbar sein. Sie
sind vor der Arbeit festzulegen: Nachträglich formuliert beschreiben sie das, was entstanden ist. Im
Prompt genannt verbessern sie zugleich die Ausgabe. [14.1]

| Dimension | Ein prüfbares Kriterium |
|---|---|
| Sachliche Richtigkeit | Jede genannte Zahl stimmt mit der angegebenen Seite oder dem Zeilenbereich überein |
| Vollständigkeit | Alle vereinbarten Kriterien erscheinen für alle Gegenstände |
| Nachvollziehbarkeit | Keine Aussage ohne Quelle; „nicht angegeben“, wo eine Angabe fehlt |
| Rechnerische Richtigkeit | Berechnete Werte lassen sich bei erneuter Rechnung reproduzieren |
| Strukturelle Gültigkeit | Alle geforderten Abschnitte vorhanden und nicht leer |
| Klare Abgrenzung | Angaben aus Quellen werden nie als Messwerte dargestellt |
| Wiederholbarkeit | Drei Durchläufe liefern dieselben *Zahlen*, wenn auch nicht denselben Text |

**Angemessener Prüfumfang** — erkundende Arbeit erfordert eine Durchsicht; Material, das in die
eigene Meinungsbildung eingeht, erfordert Stichproben; Arbeit, die an Kolleginnen und Kollegen geht,
erfordert die Rückführung jeder Sachaussage auf ihre Quelle; alles, was in eine Entscheidung, einen
Vertrag oder eine externe Mitteilung eingeht, erfordert eine vollständige Prüfung einschließlich
unabhängiger Nachrechnung der Zahlen. [14.3]

**Prüfbarkeit einplanen.** Ein Dokument, in dem jede Zahl ihre Quelle nennt, ist in Minuten geprüft.
Dasselbe Dokument ohne Quellenangaben erfordert eine Stunde, da zunächst zu ermitteln ist, was zu
prüfen ist.

### Aktionen, die besondere Sorgfalt erfordern

- Alles Nicht-Umkehrbare: Versenden, Einreichen, Bestellen, Löschen
- Alles, was auf Material aus externer Quelle angewendet wird
- Alles mit Schreibzugriff auf gemeinsam genutzte Ablagen
- Zahlen, die in eine Entscheidung, einen Vertrag oder eine externe Mitteilung eingehen
- Abläufe, die vertrauliche Daten, nicht vertrauenswürdige Inhalte und einen ausgehenden Kanal
  verbinden — eines der drei Elemente ist zu entfernen
- Erste Durchläufe, auch nach einem Wechsel von Modell oder Konfiguration

**Nicht einzugeben sind** gültige Zugangsdaten, personenbezogene Daten identifizierbarer Personen,
Material, das Dritten gegenüber vertraulich ist, sowie Unterlagen unter rechtlicher
Aufbewahrungspflicht. Gelangt ein Zugangsdatum in einen Prompt, ist es zu wechseln; ein
Dialogverlauf ist eine protokollierte Datenablage. Übliches Arbeitsmaterial der eigenen Organisation
ist in der Regel unbedenklich. [14.4]

---

## Terminologie

Die deutschsprachige Fachliteratur verwendet für einen Teil dieser Begriffe die englischen Ausdrücke.
Dieses Blatt folgt dem jeweils üblichen Gebrauch. Die Tabelle ordnet beide Formen einander zu, damit
englischsprachige Quellen — einschließlich des Kurses selbst — anschlussfähig bleiben.

| Englisch | In diesem Dokument | Anmerkung |
|---|---|---|
| machine learning | maschinelles Lernen | |
| self-supervised learning | selbstüberwachtes Lernen | Zielwerte stammen aus dem Text selbst |
| neural network | neuronales Netz | |
| weights / bias | Gewichte / Bias | „Bias“ unübersetzt, da etabliert |
| loss | Verlustfunktion | |
| cross-entropy | Kreuzentropie | |
| gradient descent | Gradientenabstieg | |
| backpropagation | Backpropagation | unübersetzt, da etabliert |
| overfitting | Überanpassung | |
| inference | Inferenz | |
| token / vocabulary | Token / Vokabular | |
| embedding | Embedding | „Einbettung“ ist seltener |
| contextual representation | kontextuelle Repräsentation | |
| attention | Attention | „Aufmerksamkeitsmechanismus“ bei Ersterwähnung |
| context window | Kontextfenster | |
| sampling | Sampling (Ziehen) | Auswahl des nächsten Tokens |
| temperature | Temperatur | |
| hallucination | Halluzination | |
| harness | Harness (Rahmenprogramm) | kein etablierter deutscher Begriff |
| tool / tool call | Tool / Tool-Aufruf | |
| agentic loop | agentische Schleife | |
| retrieval | Retrieval | |
| prompt injection | Prompt Injection | unübersetzt, da Fachbegriff |
| reasoning effort | Reasoning Effort | Umfang der Zwischenberechnung |
| guidance | Anweisung | eine der drei Arten von Kontrolle |
| orchestration | Orchestrierung | |
| enforcement | technische Beschränkung | |
| acceptance criteria | Abnahmekriterien | |
| progressive disclosure | gestufte Offenlegung | |
| skill / agent / hook | Skill / Agent / Hook | unübersetzt, da Produktbegriffe |

---

## Weiterführende Quellen

Die kommentierte Quellensammlung des Kurses mit 46 Einträgen steht unter
`../../course/resources.html`. Die wichtigsten Einstiegspunkte sind englischsprachig:

- **3Blue1Brown**, neuronale Netze und Transformer — eine anschauliche visuelle Darstellung
- **Andrej Karpathy**, *Deep Dive into LLMs like ChatGPT* und *Neural Networks: Zero to Hero*
- **Anthropic**, *Building effective agents* — Entwurfsmuster und Hinweise, wann sie ungeeignet sind
- **Simon Willison**, Sammlung zu Prompt Injection — fortlaufende Dokumentation des Problems
- **OWASP Top 10 for LLM Applications** — anerkannte Systematik der Schwachstellen

**Produktdokumentation.** Für alles, was vom Tarif, der Version oder der Preisgestaltung abhängt, ist
die jeweils aktuelle Dokumentation des Anbieters heranzuziehen und nicht dieses Blatt. GitHub
Copilot, die Agentenkonfiguration von VS Code, das Model Context Protocol und die
Agent-Skills-Spezifikation veröffentlichen jeweils eigene Referenzen.

> **Hinweis zur Überprüfung.** Produktverhalten und alle kommerziellen Angaben dieses Blatts wurden
> im Oktober 2026 aus Sekundärquellen zusammengestellt, da die primären Dokumentationsserver aus der
> Arbeitsumgebung nicht erreichbar waren. Die Umstellung auf GitHub AI Credits zum 1. Juni 2026
> beruht auf Suchergebnissen zur Ankündigung von GitHub vom April 2026. Vor einer verbindlichen
> Festlegung sind die Angaben zu bestätigen.
> Vier Fragen kann nur die eigene Administration beantworten: welches Abrechnungsmodell der Vertrag
> vorsieht; wie hoch das Kontingent ist und ob es organisationsweit zusammengefasst wird; ob eine
> Überschreitung zugelassen ist und was bei Erschöpfung geschieht; und welcher Bericht den Verbrauch
> wem gegenüber ausweist.
