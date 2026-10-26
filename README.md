# Tokens to Decisions

A two-part learning course on how modern AI works and how to operate it well.

**Part One** explains the mechanism — from gradient descent to agents — for a reader with no
background in machine learning. **Part Two** spends that understanding on the decisions you make
every time you use an AI system: which model, what it costs, what to put in front of it, how much
to supervise, how to break up a large task, how to make what worked repeatable, and how to know
whether the result is right.

**No programming experience is required anywhere in the course.** Lacking it is not the same as
being unable to follow a mechanism, so the material keeps its technical depth — including
mathematics where mathematics explains something — while assuming no familiarity with code, Git,
terminals or development environments. Software development appears as one application among
several rather than as the default setting.

## Contents

| File | What it is |
|---|---|
| [`course_style_guide.md`](course_style_guide.md) | Editorial and pedagogical conventions — audience, prose style, formatting budgets, mathematical notation, the three recurring examples, verification rules for volatile product facts. Governs future additions as well as the current text |
| [`course/index.html`](course/index.html) | Course overview: concept map, full syllabus, the mechanism-to-practice table, and four ways to run it |
| [`course/part-1-theory.html`](course/part-1-theory.html) | **Part One** — Modules 1–7, 14 diagrams, 11 exercises. Machine learning, neural networks, training, gradient descent, backpropagation, inference, tokenisation, embeddings, attention, transformers, next-token prediction, temperature, context, hallucination, harnesses, reasoning, tools, agents, skills, retrieval, and security |
| [`course/part-2-practice.html`](course/part-2-practice.html) | **Part Two** — Modules 8–14, 5 diagrams, 9 exercises, a 5-stage workshop. Model selection and benchmarking, the economics of tokens and credits, context engineering, interaction modes and autonomy, planning and orchestration, personalisation, skills and tools, evaluation and safety |
| [`course/resources.html`](course/resources.html) | 46 annotated further-learning sources, from 3Blue1Brown and Karpathy to the specifications and vendor documentation behind Part Two |
| [`REVISION-NOTES.md`](REVISION-NOTES.md) | What changed across revisions, and what remains unverified |

## Reading it

Each page is a **self-contained HTML file** — no build step, no dependencies, no server. Open
`course/index.html` in a browser, or view the published version:

**https://claude.ai/artifact/WDTEAh7PkdBk2yjkxdrQLw**

The pages follow the reader's light or dark theme, work at phone width, and have print
stylesheets, so a module can be printed as a handout. Fonts load from Google Fonts; everything
else — including all 20 diagrams, which are hand-authored inline SVG — is embedded in the file.

## How it teaches

Three worked examples recur and accumulate rather than each concept getting its own analogy:

- **A neuron learning logical AND** (Module 1) — computed by hand, including a full
  gradient-descent update and a two-layer backward pass, before the reader meets a model with
  hundreds of billions of parameters.
- **"The nightly run failed because it timed out."** (Modules 2–4) — carried from tokenisation
  through embeddings and attention to sampling. Chosen because *run* is sense-ambiguous and *it*
  needs a referent, so the sentence poses the exact problems attention solves.
- **A supplier assessment** (Module 5 onward) — three vendor reports and a spreadsheet of
  measurements, to be compared into a recommendation memo. It exercises context budgeting, tool
  use, injection from untrusted documents, decomposition, reusable skills and evaluation without
  requiring a line of code.

Mathematics appears where it explains rather than decorates, and all numerical results — the
gradient-descent arithmetic, the temperature distributions, the cost comparisons — were verified
computationally. Twenty inline exercises sit beside the explanations they reinforce, each with an
expected answer.

## Which parts expire

- **Part One covers mechanism** and is vendor-neutral. Its mathematical foundations — gradient
  descent, backpropagation, attention, sampling — are stable. Several topics in Modules 5 to 7,
  including post-training, reasoning, agentic systems, long-context behaviour and evaluation, are
  areas of active research where current understanding continues to change.
- **Part Two describes products, prices and features that change monthly.** Volatile facts appear
  in dated verification tables saying what was checked and against what, rather than in prose. Where
  a figure depends on your organisation's configuration, the text names what an administrator must
  confirm.

The maintenance job is Part Two's Modules 8 and 12–13, and the operating section of the resources
page.

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
planning, interactive and autonomous working · choosing a mode · what autonomy costs · why
planning is a separate step · the plan as an artefact · delegating to smaller models · the costs
of delegation · manual and automatic orchestration · scopes of instruction · style profiles ·
output templates · when persistent instructions hurt · prompts, skills, agents, subagents, tools,
MCP servers and hooks distinguished · building a skill · tools and permissions · custom agents ·
acceptance criteria · evaluation sets · proportionate oversight · working safely with untrusted
material · an integrated workshop

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

## Licence and attribution

No licence file is included — add one that suits your organisation before distributing.

Written for people who want to understand the tools they use rather than memorise tips for them.
