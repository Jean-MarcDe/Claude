# Revision notes

A summary of the editorial and pedagogical revision of *Tokens to Pull Requests*, carried out
against [`course_style_guide.md`](course_style_guide.md). It records what changed and why, which
technical claims were corrected, and what remains open.

## Approach

The revision followed four phases: a repository-wide assessment that measured the style problems
rather than asserting them, an editorial style guide written to give the rewrite measurable
targets, a module-by-module revision, and a quality pass over rendering, cross-references and
arithmetic.

The first phase produced the numbers that justified the rest. Across 31,400 words the first
edition carried 120 callouts (one per 261 words), 405 list items against 583 paragraphs, 413 bold
spans, and 15 mathematical glyphs in the whole of the theory part. The diagnosis of fragmented,
under-developed prose was correct and measurable.

## Pedagogical changes

**Three recurring examples replaced ad-hoc ones.** The first edition explained each concept with
whatever example suited it locally, so nothing accumulated. Now:

- **Example A** — a single neuron learning logical AND — carries Modules 1.2 to 1.6. The reader
  computes the neuron's output on all four rows, measures the loss, performs one gradient-descent
  update with real arithmetic, watches the loss fall from 0.09055 to 0.06180, and then sees why no
  parameters can represent XOR, which is what forces a hidden layer and in turn backpropagation.
  A two-layer backward pass is worked in full.
- **Example B** — *"The nightly run failed because it timed out."* — carries Modules 2 to 4. It is
  chosen because *run* is sense-ambiguous and *it* needs a referent, so the sentence poses the two
  problems that attention exists to solve. It is tokenised, encoded, embedded, given positional
  information, passed through attention that resolves both ambiguities, and finally used to produce
  a next-token distribution which is then sampled at three temperatures.
- **Example C** — adding retry logic to a payment function — is introduced in Module 5 and runs to
  the end of Part Two. It is underspecified in a way that matters: retrying a charge without an
  idempotency key can bill a customer twice. The example is re-run as capability is added
  (repository context, instruction files, file-reading tools, test execution, full agency), and
  reappears as the injection target in Module 6, the path-scoped instruction example in 9.2, the
  prompt file in 10.3, the quadrant case in 11.2, and Lab 5.

**Mathematics was added where it explains.** The theory part had almost none. It now develops the
neuron and sigmoid, squared-error and cross-entropy loss, the gradient-descent update rule, the
chain rule and the delta recursion, softmax, scaled dot-product attention including why the scaling
factor exists, and temperature scaling. Every symbol is named at introduction and the notation is
fixed in the style guide. **All numerical results were verified computationally**, including the
temperature distributions, which were recomputed after a first attempt used an unrealistic tail and
produced misleading figures.

**Eleven inline exercises** sit beside the explanations they reinforce, each with an expected
answer in a collapsible block. They require applying a model rather than recalling a fact —
predicting the effect of a saturated sigmoid, computing cross-entropy for two confidence profiles,
reasoning about what a near-uniform attention distribution means, diagnosing a "the model forgot"
report, deciding which trifecta circle a given control removes.

**Module 1 was reordered** so that one example develops through it, rather than presenting neural
networks, training, gradient descent and backpropagation as four separate abstract blocks. A new
section 1.9 covers self-supervision and next-token prediction, which the first edition skipped
entirely — it jumped from supervised training to tokenisation, leaving the most important training
fact unexplained.

**Prose was de-fragmented.** Measured against the style guide's budgets:

| | Before | After | Budget |
|---|---|---|---|
| Part One callouts | 60 | 2 | ≤ 17 |
| Part One list items per paragraph | 0.73 | 0.20 | ≤ 0.30 |
| Part One "Key idea" summary boxes | 13 | 0 | 0 |
| Part Two callouts | 52 | 4 | ≤ 8 |
| Part Two (Modules 8–13) list items per paragraph | 0.78 | 0.27 | ≤ 0.30 |
| "which is exactly why" | 14 | 0 | — |
| "worth noting / stating" | 5 | 0 | — |

Module 14's list density remains high at 1.52, which is deliberate: labs are tutorial content, and
Diátaxis puts procedural steps in lists.

## Technical corrections

- **Supervised learning is no longer conflated with machine learning generally.** Unsupervised,
  reinforcement and self-supervised learning are distinguished, with self-supervision identified as
  the hinge that makes language models possible.
- **Next-token training is described accurately.** The first edition implied one prediction per
  forward pass. The loss is computed at every position in a sequence simultaneously, which is why
  training is affordable, and causal masking is what permits it.
- **Embedding dimensions are no longer implied to be interpretable.** The revision states
  explicitly that meaningful directions are diagonal combinations rather than individual
  coordinates, that models appear to represent more features than they have dimensions, and that
  any two-dimensional picture is a projection discarding almost everything. The old
  "king − man + woman" style figure was replaced with one that makes a more useful point.
- **Static embeddings and contextual representations are separated**, notationally as
  **e**(*t*) versus **h**ᵢ⁽ˡ⁾, and given their own figure showing the same static embedding moving
  in different directions in different sentences. The style guide calls this the single most
  important misconception to prevent.
- **Attention weights are explicitly not presented as explanations.** The figure caption now states
  that they show where information was gathered from, which is a different claim.
- **Scaling behaviour is no longer asserted as settled mechanism.** The revision says held-out loss
  keeps improving past the memorisation threshold and that why this happens is an open research
  question, rather than offering a confident account.
- **Reasoning claims are behavioural.** "Performs better on multi-step problems when it generates
  intermediate steps" replaces language implying an internal process, with an explicit note that
  the visible chain of thought is generated text and not a log of the computation.
- **Feed-forward layers and factual storage** are described as an association supported by evidence
  rather than as established fact.
- **Model, inference, context, tools, harness and system** are distinguished consistently, with the
  style guide fixing the terminology.

## Remaining issues

- **Product specifics in Part Two are unverified against primary sources.** This environment's
  network policy blocks `docs.github.com` and `github.blog`, so Module 8 to 12 content was grounded
  in web search rather than official documentation. Every specific is written as a pointer with a
  warning at the top of the page, but file paths, precedence rules, model availability and content-
  exclusion coverage should be checked before any organisation standardises on them. Adding those
  two hosts to the environment's allowed domains would let this be closed properly.
- **Token-count figures in Module 2.5 are indicative, not measured.** The chart is labelled as such
  and Lab 1 exists to replace it with the reader's own numbers, but it remains the least rigorous
  quantitative claim in Part One.
- **The illustrative token IDs** in Modules 2.1 and 4.2 are plausible rather than drawn from a real
  tokeniser. The text says so.
- **Part One grew by about a third** (15,800 to 21,300 words), driven by worked arithmetic,
  mathematics, exercises and Example C. Part Two shrank slightly. The growth is deliberate under
  the style guide's depth-over-brevity rule, but a future pass could compress Modules 5.10 to 5.13,
  which remain closer to reference material than to developed explanation.
- **Module 14's labs were only lightly revised.** They are sound and now cross-reference the
  exercises and Example C, but they predate the style guide and would benefit from the same
  treatment the explanatory modules received.
- **No external resource link has been verified** for the same network reason; two were corrected
  from search results during the first edition.

## Files

| File | Role |
|---|---|
| `course_style_guide.md` | Editorial and pedagogical conventions; governs future additions |
| `course/index.html` | Overview, concept map, syllabus, theory-to-practice table |
| `course/part-1-theory.html` | Modules 1–7, 14 diagrams, 11 exercises |
| `course/part-2-practice.html` | Modules 8–14, 3 diagrams, 8 labs |
| `course/resources.html` | 38 annotated further-learning sources |
