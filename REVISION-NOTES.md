# Revision notes

What changed across the revisions of this course, why, and what remains unverified.
Most recent first.

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
