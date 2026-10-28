# Tokens to Decisions

A course on how modern AI systems work and how to operate them well, with four pieces of
material for four different situations.

**Part One** explains the mechanism — from gradient descent to agents — for a reader with no
background in machine learning. **Part Two** spends that understanding on the decisions you make
every time you use an AI system: which model, what it costs, what to put in front of it, how much
to supervise, how to break up a large task, how to make what worked repeatable, and how to know
whether the result is right.

**No programming experience is required anywhere.** Lacking it is not the same as being unable to
follow a mechanism, so the material keeps its technical depth — including mathematics where
mathematics explains something — while assuming no familiarity with code, Git, terminals or
development environments. Software development appears as one application among several rather
than as the default setting.

---

## The four materials

| | For | Form | Time |
|---|---|---|---|
| **[The course](course/index.html)** | Reading and working through, alone or over several sessions | Four HTML pages, ~42,000 words, 20 diagrams, 20 exercises, a 5-stage workshop | A day, or seven sittings |
| **[The deck](presentation/index.html)** | Teaching it to a room | 33 slides, 6 interactive demonstrations, speaker notes throughout | About two hours (estimate), or two sessions of about an hour |
| **[The handout](handout/handout.html)** | Keeping beside you afterwards | 8 printed pages of definitions and decision tables | Consulted, not read |
| **[The practical guide](practical-guide/index.html)** | Actually doing it, on a real tool | 14 sections plus a 40-minute exercise with an answer key | An afternoon |

**In German:** the deck and the handout also exist as
[`presentation/de/`](presentation/de/) and [`handout/de/`](handout/de/) — a full translation in
the register of technical documentation, with a terminology table mapping the English terms to the
German ones. The course and the practical guide remain English.

**The course is the authority.** The other three simplify; none of them introduces a technical
claim the course does not make. Where a slide or a handout entry compresses something, it points
at the section that does not.

### Choosing between them

- **Learning this for yourself** — the course, in order. The practical guide afterwards if you
  use GitHub Copilot.
- **Teaching a workshop** — the deck for the session, the handout printed for the room, the
  course as your own preparation and as what you point people to afterwards.
- **You have used these tools for a year and want to use them better** — Part Two and the
  handout. Part One is there when something in Part Two does not sit right.
- **Someone on your team has never opened an editor** — the practical guide, on its own. It is
  written to stand alone and links back where interest arises.
- **Half a day and a team to convince** — the deck's second part, then the practical guide's
  exercise run live. The exercise is built so that a plausible wrong answer and a good one look
  visibly different, which is the argument that lands.

---

## Contents

| Path | What it is |
|---|---|
| [`course_style_guide.md`](course_style_guide.md) | Editorial and pedagogical conventions — audience, prose style, formatting budgets, mathematical notation, the three recurring examples, verification rules for volatile product facts. Governs future additions as well as the current text |
| [`course/index.html`](course/index.html) | Course overview: concept map, full syllabus, the mechanism-to-practice table, and four ways to run it |
| [`course/part-1-theory.html`](course/part-1-theory.html) | **Part One** — Modules 1–7, 15 figures, 11 exercises. Machine learning, neural networks, training, gradient descent, backpropagation, inference, tokenisation, embeddings, attention, transformers, next-token prediction, temperature, context, hallucination, harnesses, reasoning, tools, agents, skills, retrieval, and security |
| [`course/part-2-practice.html`](course/part-2-practice.html) | **Part Two** — Modules 8–14, 5 diagrams, 9 exercises, a 5-stage workshop. Model selection and benchmarking, the economics of tokens and credits, context engineering, interaction modes and autonomy, planning and orchestration, personalisation, skills and tools, evaluation and safety |
| [`course/resources.html`](course/resources.html) | 46 annotated further-learning sources, from 3Blue1Brown and Karpathy to the specifications behind Part Two |
| [`presentation/`](presentation/) | The workshop deck — `index.html`, `deck.css`, `deck.js`, and [its README](presentation/README.md) on running, projecting and printing it |
| [`handout/`](handout/) | The reference handout as Markdown, printable HTML and PDF, with [a build script](handout/build-pdf.js) |
| [`practical-guide/`](practical-guide/) | The GitHub Copilot companion and its `exercise/` folder — data, a supplier brief, acceptance criteria and an exact answer key |
| [`presentation/de/`](presentation/de/) | **Foliensatz (deutsch)** — the same 33 slides, sharing the English engine and stylesheet |
| [`handout/de/`](handout/de/) | **Referenzblatt (deutsch)** — ten A4 pages in Markdown, HTML and PDF, with the terminology table |
| [`REVISION-NOTES.md`](REVISION-NOTES.md) | What changed across revisions, and what remains unverified |

---

## Running them

Everything is **self-contained HTML** — no build step, no dependencies, no server. Open any
`index.html` in a browser, or view the published course:

**https://claude.ai/artifact/WDTEAh7PkdBk2yjkxdrQLw**

The pages follow the reader's light or dark theme, work at phone width, and carry print
stylesheets. The deck and the handout are designed to work on a disconnected laptop in a
workshop room: they use system fonts and contain all their own styling, scripting and graphics.
The course and the practical guide load three fonts from Google Fonts and degrade gracefully
without them.

```
node handout/build-pdf.js              # both handout PDFs (8 pages EN, 10 pages DE)
node handout/build-pdf.js de           # just the German one
```

To print either deck, use the browser's print dialogue — every slide prints on its own page with
all progressive steps revealed. `presentation/README.md` has the headless Chromium equivalent.

The German editions are translations, not separate works: the deck shares the English engine and
stylesheet and looks its strings up by their English originals, so a missing translation falls
through to English rather than breaking. Where German needed different wording to fit a slide or a
diagram box, the wording changed and the claim did not.

---

## How it teaches

Three worked examples recur and accumulate rather than each concept getting its own analogy:

- **A neuron learning logical AND** (Module 1) — computed by hand, including a full
  gradient-descent update and a two-layer backward pass, before the reader meets a model with
  hundreds of billions of parameters. The deck makes it interactive: move the weights, take a
  training step, watch the loss fall.
- **"The nightly run failed because it timed out."** (Modules 2–4) — carried from tokenisation
  through embeddings and attention to sampling. Chosen because *run* is sense-ambiguous and *it*
  needs a referent, so the sentence poses the exact problems attention solves.
- **A supplier assessment** (Module 5 onward) — vendor claims against a spreadsheet of
  measurements, to be turned into a recommendation. It exercises context budgeting, tool use,
  injection from untrusted documents, decomposition, reusable skills and evaluation without
  requiring a line of code. The practical guide's exercise is a small, fully reproducible version
  of it, with an exact answer key.

Mathematics appears where it explains rather than decorates, and all numerical results — the
gradient-descent arithmetic, the temperature distributions, the cost comparisons, the exercise's
answer key — were verified computationally. Twenty inline exercises sit beside the explanations
they reinforce, each with an expected answer.

---

## Which parts expire

- **Part One covers mechanism** and is vendor-neutral. Its mathematical foundations — gradient
  descent, backpropagation, attention, sampling — are stable. Several topics in Modules 5 to 7,
  including post-training, reasoning, agentic systems, long-context behaviour and evaluation, are
  areas of active research where current understanding continues to change.
- **Part Two describes products, prices and features that change monthly.** Volatile facts appear
  in dated verification tables saying what was checked and against what, rather than in prose.
  Where a figure depends on your organisation's configuration, the text names what an
  administrator must confirm.
- **The practical guide describes an interface that moves several times a year.** Every step is
  flagged Stable, Verify or Unconfirmed, and roughly two-thirds are reconstructions rather than
  confirmations. There are no screenshots, deliberately — see that guide's README.
- **The German editions track the English ones.** A change to the English deck or handout needs
  the same change in `de/`; nothing enforces that automatically. The terminology table in
  `handout/de/` is what keeps the two German materials consistent with each other.

All product-specific material was compiled in **October 2026 without network access**, including
no access to GitHub's or Microsoft's own documentation. That constraint shaped the structure
rather than being worked around: volatile claims are dated, scoped and flagged rather than
asserted. `REVISION-NOTES.md` lists what to confirm before relying on it.

The maintenance job is Part Two's Modules 8 and 12–13, the operating section of the resources
page, and the practical guide's step boxes.

---

## Covered concepts

**Part One — mechanism.** Machine learning versus rule-based programming · supervised,
unsupervised, reinforcement and self-supervised learning · parameterised functions · neurons,
weights, biases and activation functions · loss functions · gradient descent · backpropagation ·
layers and why depth needs non-linearity · generalisation and overfitting · inference ·
self-supervision and next-token prediction · tokenisation and byte-pair encoding · encoding ·
static embeddings and what their geometry does and does not mean · positional information · the
effect of human language choice on cost and quality · attention · queries, keys and values ·
multi-head attention · contextual representations · the full forward pass · logits and softmax ·
temperature · top-k and top-p · seeds and determinism · autoregression · the context window and
its limits · hallucination · post-training · chat as a text format · the harness · reasoning and
test-time compute · prompting · tools · agents · skills · retrieval · MCP · evaluation · the trust
boundary · prompt injection · jailbreaking · the lethal trifecta · poisoned inputs · fluency and
the review problem · defence in depth · the jagged frontier · the cost model

**Part Two — operation.** What differs between models · reasoning effort · reading benchmarks and
their failure modes · building an internal benchmark · tokens as the unit of cost · input, output,
cached and reasoning tokens · credits, requests, allowances and quotas · a four-way worked cost
comparison · total cost including verification · the quality–cost–latency frontier · what is
actually in the context · supported versus usable context · curating a brief · long sessions,
growth and compaction · task specification · the layers of an AI system · conversational,
planning, interactive and autonomous working · choosing a mode · what autonomy costs · guidance,
orchestration and enforced constraints distinguished · why planning is a separate step · the plan
as an artefact · delegating to smaller models · the costs of delegation · manual and automatic
orchestration · scopes of instruction · the instruction hierarchy and its limits · style profiles ·
output templates · when persistent instructions hurt · prompts, skills, agents, subagents, tools,
MCP servers and hooks distinguished · building a skill · tools and permissions · custom agents ·
how much structure a task justifies, including when to write software instead · acceptance
criteria · evaluation sets · proportionate oversight · working safely with untrusted material ·
an integrated workshop

---

## Exercises and workshop

Twenty short exercises sit beside the explanations they reinforce, each with an expected answer:
predicting the effect of a saturated sigmoid, computing one gradient-descent update, computing
cross-entropy for two confidence profiles, reasoning about near-uniform attention, diagnosing a
"the model forgot" report, estimating the token cost of a language choice, judging the evidential
weight of a single comparison, pricing a cache-invalidating change, deciding what to extract
versus attach, choosing an interaction mode, reading a plan's "missing information" section,
comparing a decomposed workflow against a single-model one, turning reactions to prose into a
style profile, testing a skill description in isolation, and applying the trifecta to a proposed
automation.

Part Two closes with a five-stage workshop — specify and select, plan and decompose, execute with
the right autonomy, make it repeatable, verify and account — run on a task the participant brings
from their own work. The deliverable is a repeatable process with honest evidence about what it
costs and where it fails, not a document.

The practical guide closes with a separate, smaller exercise that supplies its own data and an
exact answer key, so a reader who has no suitable task of their own can still do the thing the
workshop is about.

---

## Licence and attribution

No licence file is included — add one that suits your organisation before distributing.

Written for people who want to understand the tools they use rather than memorise tips for them.
