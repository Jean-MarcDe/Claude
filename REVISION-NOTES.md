# Revision notes

What changed across the revisions of this course, why, and what remains unverified.
Most recent first.

---

# Revision 4 — rhetoric, corrections, and three new materials

Four objectives: remove the remaining rhetorical overstatement from the course, make six specific
technical corrections, and produce three teaching materials the course did not have — a
presentation, a handout, and a beginner's practical guide.

## Part A — the course

### Rhetorical overstatement

The brief named seven constructions to eliminate. A sweep found **45 instances** across the two
course pages. All were rewritten. One survived into this revision's final check — a "does not
merely X; it Y" in §4.3 — and was rewritten so that the informative claim leads and the
correction is subordinate. The current count of the named constructions across all four materials
is **zero**.

The pattern that produced them is worth naming, because it will recur. Each one worked by
withholding the claim for a beat to make it land harder: set up a wrong belief, pause, deliver the
right one. It reads as emphasis and functions as padding, and at density it makes a text sound
like it is selling something. The replacement in every case was to state the claim first and let
the contrast be subordinate.

### Six technical corrections

| | Was | Now |
|---|---|---|
| §8.1 | Reasoning effort described as a property models have | A per-task configurable quantity; helps where there is inferential depth, costs where there is not; the amount it helps depends on model, task and budget and is settled by comparison |
| §3.3, §4.7 | Attention cost and context length conflated in places | Attention cost grows with the square of sequence length; a stated context length is a capacity claim about what is accepted, separate from how reliably material in it is used |
| §12.1 | Instruction hierarchy described as a rule | A trained disposition that mostly holds, with no documented resolution for conflicts within a level — so contradictions must be removed rather than arbitrated |
| §13.2 | Skill discovery described as automatic | Automatic in some harnesses, by-name in others; where it is automatic the description does the selecting, which is why it should say when the skill applies rather than what it contains |
| §9.4 | Context management described as one behaviour | Harnesses differ — dropping, summarising, retrieving, re-inserting — and which one yours does determines what disappears |
| Throughout | Durable and changing facts interleaved | Separated, with volatile claims moved into dated verification tables carrying per-row confidence |

### §10.5 — three kinds of control

Added. Guidance (prompts and instructions) determines what is *likely*. Orchestration (steps,
routing, stopping rules) determines what *ordinarily* happens. Enforcement (permissions,
sandboxing, approval) determines what is *possible*. The distinction is the one that decides how
much latitude an agentic task should get, and conflating the first with the third is the most
common reasoning error in this area. It now carries through the deck (slide 25), the handout and
the practical guide (§10).

### §13.6 — how much structure to build

Strengthened, with conventional software added as the final row of the table. A model earns its
cost where inputs are irregular, judgement is required, or the task cannot be specified exactly in
advance. Where none of those holds, a script is cheaper, faster and repeatable — and that option
is routinely skipped in favour of the interesting one.

## Part B — the practical guide (`practical-guide/`)

A standalone companion for readers who have never opened a code editor: 8,200 words, fourteen
sections, one diagram, and a reproducible exercise.

Its structural decision is a **two-layer separation**. Prose describes mechanisms and should hold
for years. Step boxes describe the interface and each carries a confidence flag — **Stable**
(5 boxes), **Verify** (7), **Unconfirmed** (5). Roughly two-thirds of the interface instructions
are reconstructions rather than confirmations, and the flags say so rather than hiding it.

**There are no screenshots.** This is deliberate and is stated in the guide's second section. The
material was written without network access, including none to GitHub's or Microsoft's
documentation; a screenshot would look like evidence it is not, and would be stale within months
regardless.

### The exercise

Sixty rows of trial measurements, a fictional supplier brief, eight acceptance criteria, and an
exact answer key. About forty minutes.

It is built around one specific failure: an assessment can get all five headline figures right and
still be unusable. Two of the highest readings carry an operator note putting them outside the
rated operating envelope the supplier's own brief defines, and the six missing downtime readings
are not missing at random — the reasons given (sensor offline, logger replaced) are the reasons
downtime would have been high. A numbers-only review passes that answer. The exercise exists so
someone can discover that once, cheaply, on data where the right answer is known.

Every figure in `answer-key.md` was computed from the CSV rather than estimated, and spreadsheet
formulas are given so a reader can reproduce each one without programming. If the data is edited,
the key must be recomputed.

## Part C — the presentation (`presentation/`)

Thirty slides in two acts, with speaker notes on every slide, fourteen progressive disclosure
steps, and six interactive demonstrations: a neuron that trains, an attention matrix, a
temperature distribution, a model comparison whose ranking flips with the weighting, a cost
calculator, and a context composition toggle.

All widget values are fixed and illustrative, match the course text, and are labelled as
illustrative on the slide. None is a measurement of a real model or a live price.

Verified by rendering rather than by inspection: all 30 slides fit the 720px frame, all have
notes, all steps reveal, printing produces 30 pages with chrome hidden and steps revealed, and
each widget produces its intended pedagogical result. Three slides initially overflowed and were
fixed by reducing global padding rather than by trimming three slides in isolation.

Two bugs found by testing rather than by reading: the deck ignored hash changes, so direct links
to a slide silently did nothing; and the temperature widget's first implementation used a tail
logit that made the tail swamp the distribution at T=1.0, producing a figure that was wrong and
that undercut the point the slide makes.

## Part D — the handout (`handout/`)

Seven A4 pages in three formats: Markdown source, print-first HTML, and a generated PDF.
Definitions, relationships and decision tables, with section numbers in the margin pointing back
to the course.

The Markdown and the HTML are maintained in parallel by hand rather than by a converter, because
the print layout needs control Markdown cannot express — column breaks, table widths, which boxes
must not split across a page. Each of the seven pages was rendered and inspected.

## Incidental corrections

- **`course/index.html` had no document wrapper** — no doctype, no charset, no `<html>` or
  `<body>`. It had been authored as a fragment while its three siblings were complete documents,
  so it rendered in quirks mode with an undeclared encoding when opened as a local file. Fixed.
- **README counts were wrong.** The course is ~42,000 words, not ~37,000; Part One has 15 figures
  of which 14 are SVG diagrams, not 15 diagrams. Both corrected against the files.
- **The practical guide's README misstated its own flag counts** (6/8/7 rather than 5/7/5),
  caught before commit.

---

## What remains unverified

**The network constraint has not changed.** Every documentation host the briefs cite is blocked by
this environment's network policy — confirmed by direct test, with the proxy logging 403 CONNECT
rejections for `docs.github.com`, `code.visualstudio.com`, `modelcontextprotocol.io`,
`agentskills.io`, `artificialanalysis.ai`, `developers.openai.com` and `github.blog`.

This was handled structurally rather than worked around. Volatile facts live in dated verification
tables with per-row confidence, never in prose; the practical guide flags every interface
instruction; and four questions that only an administrator can answer are named as such rather
than guessed at.

### Confirm before relying on these

| Claim | Where | Why it is uncertain |
|---|---|---|
| Copilot's model list, and which models an organisation sees | Guide §4 | Set by plan and by administrator; changes without notice |
| Mode names — Ask, Edit, Agent | Guide §5 | These names have changed before |
| `.github/copilot-instructions.md` as the per-folder instruction file | Guide §12 | Believed current; the scoped `.github/instructions/` variant is newer and less certain |
| `.github/prompts/*.prompt.md` as Copilot's skill mechanism | Guide §13 | Several related mechanisms exist at different maturities; which your version supports is unconfirmed |
| Where usage and quota are reported | Guide §11 | Has moved more than once; organisation-wide figures may be admin-only |
| Allow-list and approval setting names | Guide §10 | Version-dependent and sometimes centrally managed |
| All pricing, allowances and request accounting | Part Two §8, handout | Vendor policy, revisable, and organisation-specific |

### Four questions for an administrator

Named in Part Two §8.5, the handout and the practical guide §11, because none can be answered from
inside the product: which billing model the agreement is on; what the allowance is and whether it
pools; whether overage is enabled and what happens at exhaustion; and which report shows
consumption, to whom.

### Areas of genuine research uncertainty

Distinct from product volatility, and flagged in the text rather than smoothed over:
post-training and what it does to disposition, reasoning and test-time compute, long-context
behaviour, agentic reliability, and evaluation. The course says where understanding is contested
rather than presenting one account as settled.

## Remaining issues in this revision

- **The handout's Markdown and HTML can drift.** They are maintained by hand. A converter would
  prevent drift and lose the print control; the trade was made deliberately and is noted in
  `handout/README.md`.
- **The deck's widget values are illustrative and hard-coded.** They match the course, but if a
  course figure changes, the widget will not notice. There is no test tying them together.
- **The practical guide's exercise has one scenario.** A reader who has done it once cannot
  repeat it usefully. Generating variants was out of scope here.
- **Three fonts load from Google Fonts** in the course and the practical guide. The deck and the
  handout are fully offline; those two are not, and degrade to system fonts rather than failing.


---


# Revision 3 — audience and practical refocus

Two objectives: widen the audience from software teams to knowledge workers generally, and refocus
Part Two away from AI-assisted software development towards the operation of AI systems. Part One
was preserved and adjusted rather than rewritten.

## The course was renamed

**"Tokens to Pull Requests" is now "Tokens to Decisions".** This was not requested and is easy to
reverse. The reason: the old title named a software-development artefact that no longer appears
anywhere in Part Two, for a course now explicitly aimed at readers assumed to have no programming
experience. A title that misdescribes the audience undercuts the refocus it sits on top of. The new
title keeps the original's shape — mechanism on the left, outcome on the right.

## Audience

The style guide now defines the reader as an employee from any professional background who can
follow technical reasoning and elementary algebra, with **no programming experience assumed
anywhere**. It also states the distinction that keeps this from becoming a dilution: lacking
programming experience is not the same as being unable to understand a mechanism. Mathematics
stays. Code listings the reader is expected to parse do not.

A platform-neutrality rule was added: teach the general mechanism, name the product as one
implementation, so that what is learned transfers rather than expiring with a rename.

## Example C was replaced

The payment-retry function was a programming example carrying Module 5 and all of Part Two. It is
now a **supplier assessment**: three vendor technical reports of forty to sixty pages, a
spreadsheet of about twelve thousand test measurements, and a four-page comparison memo due before
a decision meeting.

It exercises more of the course than its predecessor and requires no code. The inputs exceed any
context window, so context budgeting is a real constraint. The measurements need arithmetic, which
motivates tool use from necessity rather than convenience. The reports come from parties with a
commercial interest in the outcome, which makes prompt injection concrete in a non-software
setting — in the rewritten Module 6.2 the attacker is a supplier hiding an instruction in their own
report, with no system breached and nothing exfiltrated, the harm being a procurement decision made
on a corrupted summary. The task decomposes, recurs quarterly, and has checkable acceptance
criteria, which carry Modules 11, 13 and 14 respectively.

## Part One: preserved, with targeted changes

Examples A and B are untouched. The mathematics, the figures and the structure of Modules 1 to 4
are as they were. What changed:

- Module 5's running example, and its appearances in 5.2, 5.4, 5.6, 5.8, 5.9 and 5.11.
- Module 6.2's injection narrative and figure, rebuilt around the supplier scenario.
- Modules 6.3, 6.4 and 6.5 broadened from repository-specific framing to any untrusted input.
- Module 6.7 retitled from "Insecure generated code" to **"Fluency and the review problem"**. The
  calibration failure it describes applies to any generated output; insecure code is now one case
  within it, with the document case given first — four sourced figures, one from a vendor's
  marketing summary, one invented, all formatted identically.
- Module 7's capability lists generalised away from compilers, refactors and test suites.
- Scattered software vocabulary removed: 42 repository and pull-request references reduced to one
  factual citation.

## Part Two: rebuilt

Seven modules replacing seven. The old material on instruction files, code review and PR workflow
was relocated rather than discarded — its mechanisms now appear as the general cases they were
always instances of.

| Module | Subject |
|---|---|
| 8 | Model selection, benchmarking, and the economics of tokens and credits |
| 9 | Context engineering and prompting |
| 10 | Harnesses, interaction modes and autonomy |
| 11 | Planning, decomposition and orchestration |
| 12 | Personalisation and persistent instructions |
| 13 | Skills, agents and tools |
| 14 | Evaluation, safety and an integrated workshop |

### New material of substance

**The economics of AI usage** (8.4–8.7) is now a developed treatment. It separates the technical
unit (tokens) from the commercial one (credits), explains why one instruction may cause twenty
model calls, and works one task four ways: a single large model (US$0.384), a single small one
($0.032), a planner delegating to small executors ($0.135), and a fourteen-step agentic loop
($0.365). The agentic figure carries the lesson — it lands near the single-pass cost only because
375,000 of its 410,000 input tokens are cached reads; without caching it costs $1.378. Section 8.7
then argues all of this is the small term, since twenty minutes of verification at a realistic
loaded rate costs roughly fifty times the model usage. All figures were computed, not estimated.

**Planning and orchestration** (Module 11) is new and given the weight the brief asked for. It
covers the eight-part plan artefact and delegation to smaller models, and — at equal length — what
delegation costs: context that does not transfer, specification effort, error propagation,
integration treated as clerical when it is the judgement step, and coordination latency. It states
plainly that a single capable model with a well-curated context beats a badly orchestrated
pipeline more often than enthusiasm suggests.

**Personalisation** (Module 12) is new: scopes of instruction and what each costs per request,
style profiles built from checkable decisions rather than adjectives, output templates with a
mandatory "not assessed" section, and the ways persistent instructions decay.

**Interaction modes** (10.2–10.4) replaces the old agency spectrum with four patterns named by
behaviour rather than product label, a figure showing where human judgement enters each, six
criteria for choosing, and an honest account of what autonomy costs.

**The workshop** (14.5) is a five-stage exercise on a task the participant brings. The stated
deliverable is a repeatable process with evidence about its cost and failure modes, not a document.

### Counts

| | Before | After |
|---|---|---|
| Part Two words | 10,694 | 15,074 |
| Part Two diagrams | 3 | 5 |
| Part Two exercises | 0 inline | 9 inline + 5 workshop stages |
| Course total words | ~37,000 | 42,500 |
| Course exercises | 11 | 20 |

## Verification and what remains unverified

The environment's network policy blocks `docs.github.com`, `code.visualstudio.com`,
`modelcontextprotocol.io`, `agentskills.io`, `artificialanalysis.ai`, `developers.openai.com` and
`github.blog`. Every one was requested as a source; all were confirmed blocked by direct test and
the proxy logged each refusal. Grounding came from web search, which returns summaries of those
pages rather than the pages.

The course handles this structurally rather than with a disclaimer: volatile facts appear in dated
tables stating what was checked and with what confidence, never in prose. The style guide now
requires this for any commercial or version-dependent claim.

**Specifically unverified:**

- **GitHub Copilot billing.** Multiple consistent secondary sources report that AI Credits replaced
  premium requests on 1 June 2026 at one credit per US$0.01, that completions do not consume
  credits, and that Enterprise seats include roughly $39 of pooled credits monthly. None was
  confirmed against GitHub's billing documentation. Sources disagreed on Pro and Pro+ allowances and
  on when promotional allowances ended. Module 8.5 presents these with confidence stated per row.
- **Four organisation-specific questions** no documentation can answer, named explicitly in 8.5:
  which billing model your agreement is on; what the allowance is and whether it pools; whether
  overage is enabled and what happens at exhaustion; which report shows consumption, to whom.
- **VS Code customisation specifics** — exact file locations, whether skills are enabled by default,
  whether selection is automatic. Modules 12.1 and 13.2 describe the concepts and flag the names.
- **The Agent Skills specification.** The official site was unreachable; the three-tier structure in
  13.2 comes from secondary sources that broadly agree, with one Microsoft page reported as saying
  four stages rather than three.
- **Benchmark methodology.** Artificial Analysis's weighting and confidence intervals are described
  from search results. The contamination discussion in 8.2 is general reasoning about how benchmarks
  work, not a report of that site's policy.
- **No external link on the resources page has been opened.**

## Remaining issues

- Part One grew to 21,900 words across revisions 2 and 3. Modules 5.10–5.13 remain closer to
  reference material than developed explanation and would benefit from the treatment Modules 1–4
  received.
- The illustrative cost rates in 8.6 are deliberately round. They teach the method correctly and are
  not a price list; the text says so, but a skimming reader could mistake them.
- Token-count figures in Module 2.5 remain indicative rather than measured.
- Module 14's workshop has not been run with a group, so stage timings are estimates.

---

# Revision 2 — editorial and pedagogical

Applied `course_style_guide.md` to a first edition that was technically sound and pedagogically
thin. Recurring examples replaced ad-hoc ones, mathematics was added where it explains, and prose
was de-fragmented.

**Measured against the first edition:** Part One callouts 60 to 2, list items per paragraph 0.73 to
0.20, "Key idea" summary boxes 13 to 0, mathematical blocks 0 to 15, exercises 0 to 11. Part Two
callouts 52 to 4, list items per paragraph 0.78 to 0.27 across explanatory modules.

**Technical corrections:** supervised learning distinguished from machine learning generally, with
self-supervision introduced as the hinge that makes language models possible; next-token training
described accurately, including loss computed at every position in one pass; embedding dimensions no
longer implied to be interpretable; static embeddings and contextual representations separated
notationally and given their own figure; attention weights explicitly not presented as explanations;
scaling behaviour no longer asserted as settled mechanism; reasoning claims made behavioural rather
than about internal process.

---

# Revision 1 — first edition

A two-part course covering the requested concepts in dependency order, with hand-authored SVG
diagrams, published as four self-contained HTML pages.
