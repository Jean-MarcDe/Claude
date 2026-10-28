# Workshop deck — How language models work

A browser-based presentation supporting an instructor-led version of the course. It illustrates
mechanisms that are hard to see from text alone; the course text explains them, and the handout is
for recall afterwards.

## Running it

Open `index.html` in a modern browser. There is no build step, no server, and no network
dependency — the deck uses system fonts and contains all of its own styling, scripting and
graphics. It works on a disconnected laptop in a workshop room.

| Key | Action |
|---|---|
| `→` `space` | Next step, then next slide |
| `←` | Previous step, then previous slide |
| `↓` `↑` | Next / previous slide, skipping steps |
| `Home` `End` | First / last slide |
| `S` or `N` | Speaker notes panel |
| `D` | Light / dark theme |
| `?` or `H` | Keyboard help |

The slide number is in the URL, so `index.html#18` opens the harness slide directly. That is the
simplest way to resume after a break or to jump to a specific diagram during a discussion.

### Projection

Designed for 16:9. The slide is a fixed 1280×720 area scaled to fit whatever window it is in, so
it behaves predictably on an unfamiliar projector. Check contrast in the actual room: the light
theme suits a lit room, the dark theme a darkened one, and `D` switches between them at any
point.

### Printing and PDF export

Use the browser's print dialogue. Every slide prints on its own page at 1280×720, with all
progressive steps revealed, and the navigation chrome removed. Interactive widgets print as their
current state with a note that they are interactive.

To produce a PDF from the command line with Chromium installed:

```
chromium --headless --print-to-pdf=deck.pdf \
         --no-pdf-header-footer index.html
```

## Files

| File | Contents |
|---|---|
| `index.html` | All 33 slides, their SVG diagrams, and speaker notes in `<template class="notes">` blocks |
| `deck.css` | Visual language, layout, print rules, theme tokens |
| `deck.js` | Navigation engine, progressive disclosure, notes panel, and the six interactive widgets |
| `deck-test.js` | Walks every slide with steps revealed; reports overflow, missing notes, console errors |
| `widget-test.js` | Finds all six widgets by name, drives them and prints what they produced |
| `svg-fit-test.js` | Finds diagram labels that have outgrown their boxes |
| `de/` | The German edition — its own slides and string table, this engine and stylesheet |

Content, styling and behaviour are separated, so editing a slide does not require touching the
engine and changing the palette does not require touching the slides.

## Structure

Thirty-three slides in two parts. Each slide title names the concept it covers, and the small label
above it says which part and section of the talk the slide belongs to.

**Part 1 — how a language model works (slides 3–19).** Programmed rules and learned parameters; a
neuron; training as step-by-step adjustment; one training step in detail; why several layers are
needed; next-token prediction as the training objective; tokenisation; embeddings; attention; the
forward pass; sampling and temperature; autoregression; what the model uses (parameters and
context); hallucination; the model and the system around it (the harness). Slide 19 closes the part
with a table that pairs each mechanism with its consequence for practice.

**Part 2 — what follows in practice (slides 20–33).** Where the concepts appear in GitHub Copilot in
VS Code; the running example; model choice; tokens and credits; the cost of one task; what the
model actually sees; working modes and autonomy; decomposition; three kinds of control; how much
structure to build; prompt injection; verification; summary.

The order follows one line of argument: what learning is, how a language model is trained, how it
processes and generates text, what it therefore knows and does not know, and what surrounds it.
Each mechanism slide whose mechanism has a direct practical consequence states it in an orange
**In practice** box at the bottom, and Part 2 builds on those consequences.

Each slide carries speaker notes giving the learning objective, the mechanism being shown, the
caveats worth stating aloud, a reference back to the course section, and in most cases a question
to put to the room before revealing an answer. Where the slide concerns GitHub Copilot, the notes
say how the concept appears there and what to check in your own installation. Open the notes with
`S`.

## The interactive widgets

Six, each tied to one learning objective. All use fixed illustrative values that match the course
text. **None is a measurement of a real model and none is a live price.** Where a widget shows
money, the rates are stated on the slide and chosen round for legibility.

| Slide | Widget | What it demonstrates |
|---|---|---|
| 6 | Neuron learning AND | Learning is arithmetic on three numbers; one gradient step lowers the loss |
| 12 | Attention | A token's representation is built from other positions, and which ones |
| 14 | Temperature | Raising it promotes the whole vocabulary, so the tail dominates |
| 23 | Model comparison | The ranking flips with the weighting, so "best" is not a property of a model |
| 25 | Cost of one task | Caching dominates agentic cost; verification time dwarfs model cost |
| 26 | Context composition | Curation beats accumulation, for cost and for reliability |

Running them live is worth more than describing them. The notes for each say how to work the
demonstration and what to ask before revealing the result.

## Accessibility and robustness

- Keyboard navigation throughout; focus states are visible on all controls.
- `prefers-reduced-motion` is honoured: transitions are disabled and nothing depends on animation
  to be understood. Progressive steps still reveal, they simply appear rather than fade.
- Diagrams carry `role="img"` and an `aria-label` describing the claim they make.
- Text and diagram strokes derive from theme tokens, so both themes keep legible contrast.
- No external fonts, scripts or images, so nothing breaks without a network.

## Maintaining it

**Adding a slide.** Copy an existing `<section class="slide">`, including its
`<template class="notes">`. Slide numbers are positional, so inserting one shifts the URLs of
those after it.

**Progressive disclosure.** Add `class="step"` to any element or SVG group. Steps reveal in
document order, one key press each, and all are revealed in print.

**Diagrams.** Hand-authored inline SVG using the classes in `deck.css` (`.box`, `.chip`, `.hl`,
`.warn`, `.good`, `.flow`, `.flow-a`, `.head`, `.t-sm`, `.t-xs`). Using those rather than literal
colours is what keeps both themes working.

**A new widget.** Add `widgets.yourName = function (root) { ... }` in `deck.js` and place
`<div class="widget" data-widget="yourName"></div>` on a slide. It initialises the first time its
slide is shown. Keep illustrative data at the top of the function and label it as illustrative on
the slide.

**What to check after editing.** Run the three test scripts, on each language you changed:

```
node deck-test.js                    # overflow, missing notes, console errors
node widget-test.js                  # each widget still produces its intended result
node svg-fit-test.js                 # diagram labels wider than their boxes
node deck-test.js de/index.html      # and the same three for the German deck
```

The fixed 720px height is unforgiving, and overflow is the failure that most often slips through
a read-through. `widget-test.js` prints each demonstration's output rather than asserting on it,
so a change that quietly breaks one shows up as a wrong number instead of as nothing. Then print
to PDF and confirm the page count matches the slide count.

`svg-fit-test.js` reports two labels on slide 13 in both languages: they sit deliberately outside
the dashed transformer block, so compare the two decks rather than expecting zero.

## The German edition

`de/` holds a German deck with the same 33 slides. It shares this `deck.css` and `deck.js`; only
the slides and a string table are its own.

`deck.js` reads the language from `<html lang>` and looks every visible string up in
`window.DECK_DICT`, which `de/deck.de.js` sets. **The English strings are the lookup keys**, so a
missing translation falls through to English and the English deck cannot drift. Numbers follow the
locale — `0,365` and `200.000` in German — while the values themselves live only in `deck.js` and
are identical in both.

German prose runs longer than English. Building that edition pushed five slides past the 720px
frame and six diagram labels past their boxes, none of which is visible from reading the markup —
hence the two layout checks above. `de/README.md` covers the rest, including why the example
sentence stays in English.

## Relationship to the other materials

| Material | Purpose |
|---|---|
| [`../course/`](../course/) | The full text. Detailed explanation, the authoritative source for everything here |
| This deck | Visual and interactive explanation for an instructor-led session |
| [`../handout/`](../handout/) | Compact reference for during and after the workshop |
| [`de/`](de/) | This deck in German |
| [`../practical-guide/`](../practical-guide/) | Getting started in the organisation's own environment |

The course is the authority. Where this deck simplifies, the notes say so; nothing here introduces
a technical claim the course does not make.
