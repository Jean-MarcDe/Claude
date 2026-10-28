/* ============================================================
   Deutsche Zeichenketten für die Widgets und die Oberfläche.

   Die Schlüssel sind die englischen Originalzeichenketten aus
   deck.js. Fehlt ein Schlüssel, zeigt der Foliensatz das
   englische Original an; eine Übersetzung kann daher nicht
   stillschweigend verloren gehen.

   Diese Datei wird vor deck.js geladen und setzt window.DECK_DICT.
   Zahlenwerte stehen nicht hier, sondern in deck.js: Sie sind in
   beiden Fassungen identisch.

   Hinweis: Ein Schlüssel muss in einer Zeile stehen. In einem
   Objektliteral darf ein Schlüssel kein zusammengesetzter
   Ausdruck sein; nur der Wert darf über Zeilen verteilt werden.
   ============================================================ */
window.DECK_DICT = {
  de: {

    /* --- Oberfläche ------------------------------------------------ */
    'No notes for this slide.': 'Keine Notizen zu dieser Folie.',

    /* --- 1. Neuron ------------------------------------------------- */
    'A neuron learning AND': 'Ein Neuron lernt die UND-Verknüpfung',
    'target': 'Soll',
    'loss': 'Verlust',
    'mean loss': 'mittlerer Verlust',
    'epoch': 'Epoche',
    'Train one step': 'Ein Schritt',
    'Run 50 steps': '50 Schritte',
    'Reset': 'Zurücksetzen',

    /* --- 2. Temperatur --------------------------------------------- */
    'Sampling temperature': 'Temperatur beim Ziehen',
    'Context:': 'Kontext:',
    'Fixed illustrative logits, not a measurement of any model.':
      'Feste Beispielwerte für die Logits, keine Messung an einem realen Modell.',
    'tail': 'Rest',
    '&ldquo;tail&rdquo; = the other %1 tokens combined':
      '„Rest“ = die übrigen %1 Tokens zusammengenommen',

    /* --- 3. Attention ---------------------------------------------- */
    'Attention &mdash; choose a token to see what it draws on':
      'Attention &mdash; ein Token auswählen, um zu sehen, worauf es zugreift',
    'Illustrative weights for one head in one layer. Real models run many heads per layer and these patterns are not an explanation of the model&rsquo;s output.':
      'Beispielhafte Gewichte für einen Head in einer Schicht. Reale Modelle verwenden viele ' +
      'Heads je Schicht, und diese Muster sind keine Erklärung der Ausgabe des Modells.',
    'Positions to the right of &ldquo;%1&rdquo; are masked: a token may not see what follows it.':
      'Positionen rechts von „%1“ sind maskiert: Ein Token kann nicht sehen, was ihm folgt.',

    /* --- 4. Kontext ------------------------------------------------ */
    'What is in the context': 'Inhalt des Kontexts',
    'System prompt + tools': 'System-Prompt + Tools',
    'Your instructions': 'Ihre Anweisungen',
    'Three vendor reports (full)': 'Drei Herstellerberichte (vollständig)',
    'Extracted sections only': 'Nur die entnommenen Abschnitte',
    'Measurement summary': 'Zusammenfassung der Messwerte',
    'Conversation so far': 'Bisheriger Dialog',
    'Your question': 'Ihre Frage',
    'headroom %1%': 'frei %1%',
    '<b class="mono">%1</b> of %2 tokens used &middot; your question is <b class="mono">%3%</b> of it':
      '<b class="mono">%1</b> von %2 Tokens belegt &middot; Ihre Frage macht davon ' +
      '<b class="mono">%3%</b> aus',

    /* --- 5. Kosten ------------------------------------------------- */
    'What one task costs': 'Kosten einer einzelnen Aufgabe',
    'Approach': 'Vorgehen',
    'Model cost': 'Modellkosten',
    'Credits': 'Credits',
    'One large model, single pass': 'Ein großes Modell, ein Durchlauf',
    'One small model, single pass': 'Ein kleines Modell, ein Durchlauf',
    'Large plans, small models execute': 'Großes Modell plant, kleine führen aus',
    'Agentic loop, 14 steps': 'Agentische Schleife, 14 Schritte',
    'Prompt caching enabled': 'Zwischenspeicherung aktiv',
    'review min': 'Prüfung (Min.)',
    'No verification time counted.': 'Keine Prüfzeit berücksichtigt.',
    'Verification at %1 min &times; $%2/h = <b>$%3</b>, about <b>%4&times;</b> the model cost of approach 1.':
      'Prüfung: %1 Min. &times; %2 $/h = <b>%3 $</b>, etwa das <b>%4-Fache</b> ' +
      'der Modellkosten von Vorgehen 1.',
    'Illustrative rates in US$ per million tokens: large 3.00 in / 0.30 cached / 15.00 out; small 0.25 / 0.025 / 1.25. Credits shown at 1 credit = $0.01. Substitute your own current figures.':
      'Beispielhafte Preise in US$ je Million Tokens: groß 3,00 Eingabe / 0,30 ' +
      'zwischengespeichert / 15,00 Ausgabe; klein 0,25 / 0,025 / 1,25. Credits zu ' +
      '1 Credit = 0,01 $. Eigene aktuelle Werte einsetzen.',

    /* --- 6. Modellvergleich ---------------------------------------- */
    'Weighting the three axes': 'Gewichtung der drei Achsen',
    'Large, high effort': 'Groß, hoher Aufwand',
    'Large, low effort': 'Groß, geringer Aufwand',
    'Small, high effort': 'Klein, hoher Aufwand',
    'Small, low effort': 'Klein, geringer Aufwand',
    'Option': 'Option',
    'quality': 'Qualität',
    'cost': 'Kosten',
    'speed': 'Tempo',
    'latency': 'Antwortzeit',
    'score': 'Punktwert',
    'Illustrative profiles, not measurements. The point is that the ranking changes with the weighting, so &ldquo;best&rdquo; is not a property of a model alone.':
      'Beispielhafte Profile, keine Messungen. Maßgeblich ist, dass sich die Rangfolge mit ' +
      'der Gewichtung ändert; „am besten“ ist daher keine Eigenschaft eines Modells allein.'
  }
};
