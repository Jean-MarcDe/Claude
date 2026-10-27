# Handout — Tokens to Decisions

A compact reference for during and after the workshop: the definitions, relationships and decision
criteria worth keeping to hand, with section numbers pointing back to the course.

| File | Role |
|---|---|
| `handout.md` | Maintainable source. Edit prose here first. |
| `handout.html` | Print-first rendering: A4, two-column prose, full-width decision tables. |
| `handout.pdf` | Generated from the HTML. Seven A4 pages. |
| `build-pdf.js` | Regenerates the PDFs. |
| `de/` | The German edition — same three formats, plus a terminology table. |

The Markdown and the HTML are kept in agreement by hand rather than by a converter, because the
print layout needs control the Markdown cannot express — column breaks, table widths, which boxes
must not split across a page. The Markdown is the better source to read in a terminal or diff; the
HTML is the one to print.

## Regenerating the PDFs

```
node build-pdf.js         # both languages
node build-pdf.js de      # one of them
```

Chromium and Playwright are preinstalled in this environment, so there is nothing to install. The
script prints at A4 with a footer carrying the title and page number. Or just print `handout.html`
from a browser — the stylesheet does the work either way, though the browser dialogue decides its
own header and footer.

## If you edit it

Keep it to ten printed pages. The constraint is the point: a reference that grows into a second
course stops being consulted. When something new has to go in, decide what comes out.

Check after editing: `node build-pdf.js`, then look at the page count and at any table that now
falls across a page break. Tables and note boxes carry `break-inside: avoid`, so a table that no
longer fits will push itself to the next page and leave a gap rather than split.

Terminology follows `../course_style_guide.md` §9, and every claim here is the course's claim —
nothing in the handout should say anything `../course/` does not.

## The German edition

`de/` holds a German handout: ten printed pages rather than seven, because German text runs longer
and because it adds a **terminology table** mapping the English terms to the German ones used
throughout. That table is the reference for all German material, including the deck. The German
page enables automatic hyphenation, without which compounds leave large gaps in the narrow
columns. See `de/README.md`.
