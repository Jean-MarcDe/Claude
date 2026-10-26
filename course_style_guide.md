# Course style guide

Editorial and pedagogical conventions for *Tokens to Decisions*. It governs the prose inside
`course/*.html`, applies to revisions as well as new material, and exists so that a chapter written
six months from now still reads as part of the same book.

A note on format: the course ships as four self-contained HTML pages rather than Markdown, because
the diagrams are hand-authored inline SVG and the pages are meant to be opened, printed and handed
out without a build step. Everything below concerns the writing; where it mentions headings, lists
or callouts, it means the corresponding HTML elements and the classes defined in each page's
stylesheet.

---

## 1. Audience and purpose

The course is written for employees across a range of professional backgrounds — engineers,
analysts, researchers, project managers and other knowledge workers. Participants can follow
technical reasoning and elementary algebra. **No programming experience may be assumed anywhere in
the course.**

That constraint is narrower than it sounds, and it is important not to over-apply it. Lacking
programming experience is not the same as being unable to understand a mechanism. Participants
should come away understanding neural networks, parameters, embeddings, attention, inference,
context management, tool use and agentic systems, with mathematics where mathematics explains
something. What must never be assumed is familiarity with Python, Git, APIs, terminals,
repositories, build systems or development environments.

In practice this means: a mechanism may be explained with an equation, but not with a code
listing the reader is expected to parse. A file may be referred to, but the concept of a working
directory must be introduced rather than presumed. Software development remains a legitimate
application domain and appears as one example among several — it is no longer the default setting
for every illustration.

The course succeeds if, having finished it, a participant can predict how an AI system will behave
in a situation the course never discussed, and act on that prediction: choosing a model,
interpreting what it costs, deciding how much context to supply, picking an interaction mode,
decomposing a large task, and judging whether the result can be trusted. It fails if they have
merely acquired vocabulary, or a list of prompt formulas.

This has a direct consequence for depth. A mechanism explained in two sentences produces
recognition; the reader nods and retains nothing usable. The same mechanism developed over four
paragraphs, with a worked example and an explicit statement of what it cannot do, produces a model
the reader can reason with. When those two options conflict, choose the longer one — but only for
mechanisms that carry weight later. Material that no subsequent chapter depends on should be short
or absent.

### Platform neutrality

The organisation provides GitHub Copilot through GitHub Enterprise, used mainly in VS Code. That is
the practical environment the course writes against, not its subject. Teach the general mechanism
first and name the product as one implementation of it, so that what participants learn transfers
to ChatGPT, Claude Code, Codex and whatever arrives next.

Concretely: write "an instruction file that applies to every request" and then note what the file
is called in this environment, rather than writing about `copilot-instructions.md` as though the
filename were the concept. Where a capability exists in one harness and not another, say so. Never
imply that a feature of one product is a property of language models in general.

## 2. Prose

Write continuous explanatory prose. The default unit is the paragraph, not the bullet, and a
section should develop a single line of reasoning from beginning to end rather than present a
series of independent observations.

Paragraphs run four to eight sentences. A page of three-sentence paragraphs reads as a list with
the bullets removed, which is the failure mode this guide most exists to prevent. Consecutive
paragraphs should connect: the second should take up something the first established, and the
reader should never have to ask why a paragraph is where it is.

Introduce terminology at the point of need. Do not open a section with definitions of terms whose
relevance has not yet been established; name the thing once the reader can see what it is for. When
a term is introduced, mark it once in bold and never again.

Vary construction deliberately. The guard against formulaic writing is not a different formula but
genuine variation in sentence length, paragraph shape and how sections open. Some sections should
begin with a question the previous section raised; some with a concrete case; some by stating the
mechanism directly. If three consecutive sections open the same way, rewrite two of them.

### Patterns to eliminate

These are recurring failures in the first edition, with measured counts, and the revision removes
them:

- **Summary boxes closing sections.** The original closed most subsections with a "Key idea"
  callout restating what had just been said. Seventeen of these existed. A section that needs a
  summary box has not explained itself.
- **"Which is exactly why…"** as a connective. Fourteen occurrences. It asserts a causal link
  rather than demonstrating one.
- **Dramatic contrast** — "X is not A; it is B", "not a bug but a feature". Rhetorically cheap and
  usually imprecise, because the thing generally *is* partly A.
- **Forced enumeration.** "Three things follow from this." If exactly three things genuinely
  follow, say them in prose; the number is rarely load-bearing and the count tends to be padded to
  reach it.
- **Promotional language.** "Enormously powerful", "the single most important", "remarkably".
  State the magnitude or omit the adverb.
- **Rhetorical questions** used as transitions.
- **Repetition in conclusions.** A closing paragraph should say something the body did not.

### Formatting budgets

Measured against the first edition's 31,400 words, which contained 120 callouts, 405 list items and
413 bold spans. These are ceilings, not targets:

| Device | Budget | Rationale |
|---|---|---|
| Callouts | ≤ 1 per 1,200 words | Reserved for definitions, warnings, and qualifications that would derail a paragraph |
| List items per paragraph | ≤ 0.30 | Lists are for genuine enumerations, not for decomposed prose |
| Bold spans | ≤ 1 per 400 words | First use of a term, and nothing else |
| Headings | One per conceptual transition | Never to break up a long passage that is doing fine |

Use a list when the items are genuinely parallel and unordered (distinct alternatives, technical
requirements), or genuinely ordered (procedural steps, a derivation). Use a table when the reader
needs to compare items along shared dimensions. Use prose for everything else, including — this is
the common error — causes, consequences, and reasons.

### Spelling and mechanics

British English throughout (*tokenisation*, *behaviour*, *normalise*), except inside code,
identifiers, file names and direct quotations, which keep their source spelling. Sentence case for
all headings. Serial comma. Spell out numbers below ten except in measurements and
mathematics. Write "a language model", not "an LLM", in prose; the abbreviation is acceptable in
tables and figure labels.

## 3. Mathematical notation

The audience can read mathematics when it is motivated and the symbols are explained. Use equations
where they carry explanatory load that prose cannot: parameterised models, loss functions, gradient
descent, attention, softmax and sampling. Do not use them decoratively.

Every equation is followed by a sentence naming each new symbol and a sentence saying what the
relationship means behaviourally. An equation the reader cannot translate back into words has
failed.

| Symbol | Meaning |
|---|---|
| *x*, *y* | input, target (scalars) |
| **x**, **w** | vectors (bold lowercase) |
| **W**, **Q**, **K**, **V** | matrices (bold uppercase) |
| *θ* | all parameters of a model, collectively |
| *ŷ* | the model's prediction |
| *z* | pre-activation sum, or a logit |
| *σ* | the logistic (sigmoid) function |
| *L* | loss |
| *η* | learning rate |
| *a*⁽ˡ⁾ | activations at layer *l* |
| *t*ᵢ | the token at position *i* |
| **e**(*t*) | the static embedding of token *t* |
| **h**ᵢ⁽ˡ⁾ | the contextual representation at position *i*, layer *l* |
| *V* | the vocabulary |
| *T* | sampling temperature |

Notation is consistent across all modules. In particular, **e**(*t*) and **h**ᵢ⁽ˡ⁾ are always
distinguished, because conflating the static embedding with the contextual representation is the
single most common misconception the course has to prevent.

## 4. The recurring examples

The first edition explained each concept with whatever example suited it locally, so the reader
never accumulated a reference case. Three examples now run through the course, each introduced once
and extended as new mechanisms arrive. A new example is justified only when none of the three can
carry the point.

### Example A — a neuron that learns logical AND

Carries Modules 1 and parts of 3. The reader meets a single artificial neuron with two binary
inputs, computes its output by hand, measures its error, performs one gradient-descent update with
real arithmetic, and watches the loss fall. The example then grows: why one neuron cannot represent
XOR, why that forces a hidden layer, and why a layered computational graph needs backpropagation
rather than direct differentiation.

The point is that the reader should have *performed* learning on a parameterised function before
meeting a model with hundreds of billions of parameters. It must use concrete numbers, not
descriptions of numbers.

Fixed setup, used everywhere this example appears:

```
inputs (x₁,x₂) and targets y:  (0,0)→0  (0,1)→0  (1,0)→0  (1,1)→1
model:        ŷ = σ(w₁x₁ + w₂x₂ + b)
loss:         L = ½(ŷ − y)²
initial:      w₁ = 0.5,  w₂ = −0.4,  b = 0.2,  η = 1.0
```

### Example B — "The nightly run failed because it timed out."

Carries Modules 2, 3 and 4. One sentence, chosen because it contains a token whose sense depends on
its neighbours (*run* as a scheduled job instance, not the verb) and a pronoun requiring resolution
(*it*). The sentence is tokenised, encoded, embedded, given positional information, passed through
attention, and finally used to produce a next-token distribution that is then sampled.

Each mechanism in the sequence must answer a limitation of the previous one. Static embeddings
cannot distinguish the two senses of *run*; that is the problem attention solves. Attention alone
is order-blind; that is the problem positional encoding solves. The reader should experience the
architecture as a series of answers, not a tour of components.

### Example C — the supplier assessment

Carries Module 5 and the whole of Part Two. An analyst must evaluate three competing suppliers.
The inputs are three vendor technical reports of forty to sixty pages each, written to different
conventions, and a spreadsheet of roughly twelve thousand rows of test measurements taken in-house.
The deliverable is a short comparison memo for a decision meeting: where the vendors' claims
conflict with the measured data, which assumptions each vendor made, and a recommendation with its
reasoning stated.

The example was chosen because it exercises nearly every mechanism in the course without requiring
a line of code. The inputs are far larger than a context window, so context budgeting is a real
constraint rather than a hypothetical one. The measurements must be totalled and compared, which a
language model cannot do reliably by itself and which therefore motivates tool use. The vendor
reports are documents from outside the organisation, which makes prompt injection concrete in a
non-software setting. The task decomposes naturally, which motivates planning and delegation. It
recurs every quarter, which motivates reusable skills. And it has checkable acceptance criteria,
which makes evaluation teachable rather than abstract.

Fixed setup, used wherever the example appears:

```
Inputs
  vendor-a-report.pdf      54 pages, prose with embedded tables
  vendor-b-report.pdf      61 pages, prose with embedded tables
  vendor-c-report.pdf      38 pages, slide-style with appendices
  measurements-q3.xlsx     ~12 000 rows: date, unit_id, vendor, metric, value

Deliverable
  A four-page memo: comparison table, conflicts between claimed and
  measured performance, assumptions each vendor made, recommendation.

Acceptance criteria
  Every numeric claim traceable to a row range or a report page.
  Every conflict names both sources.
  Assumptions listed separately from findings.
  No claim without a citation.
```

Software development may still supply an example where it genuinely illustrates a mechanism better
than the supplier assessment would — a code review is a good instance of verification under
fluency bias. It appears as one domain among several, never as the default.

## 5. How to develop an explanation

Not a template to apply visibly, and sections should not all have the same shape. As a working
order:

1. State the problem or limitation that makes the concept necessary.
2. Build intuition on a concrete case, preferably one of the three recurring examples.
3. Name the mechanism and introduce its terminology.
4. Develop the mechanism properly, with mathematics where it clarifies.
5. State what the mechanism does not do, what the simplification omits, and which misconception is
   most likely here.
6. Draw the consequence — for a later concept, or for practice.

Step five is the one most often skipped and the one that most distinguishes a textbook from
marketing material. Every simplification introduced must be flagged as a simplification at the
point of use, and no simplification may be introduced that a later chapter has to undo.

## 6. Exercises

Exercises sit beside the explanation they reinforce, not collected at the end. Each targets one
objective and requires the reader to apply a model rather than recall a fact: predict an outcome,
perform a calculation, or diagnose a failure. Each carries a short expected answer, written for an
instructor to use or a self-study reader to check against.

Keep them small. A reader who must open an editor will skip it; a reader who can do it in their
head or on the back of the page will do it. The larger hands-on labs remain in Part Two, and the
inline exercises do not duplicate them.

## 7. Diagrams

A diagram earns its place by showing a mechanism the prose cannot: where data flows, what changes
between two cases, what a transformation does to a representation. A diagram that restates a
paragraph should be deleted.

Hand-authored inline SVG, no libraries. Strokes and text inherit `currentColor` or use the page's
CSS custom properties so that both themes work; a literal colour marks the one element carrying
meaning. Label arrows with verbs. Every figure has a `figcaption` stating the claim it makes and an
`aria-label` carrying the same claim. Notation inside a figure matches section 3 exactly — a
diagram using *w* where the text uses *θ* is a defect.

## 8. Stable theory and product-specific material

Part One describes mechanisms that have been stable since 2017 and are vendor-neutral. Part Two
describes products, prices and features that change monthly. Keeping the two apart is the single
most important editorial discipline in the course, because a product behaviour presented as a
technical principle will mislead a reader long after the product has changed.

Nothing in Part One may name a vendor or a product. Where Part Two makes a claim that depends on a
plan, a policy, a configuration, a subscription tier or a software version, that claim is marked as
such and written as a pointer to official documentation rather than as a durable fact.

### Three categories, treated differently

**Durable mechanism.** How tokenisation affects cost, why a context window is zero-sum, what a
tool call is, why an agent needs a feedback signal. Stated plainly, no caveat needed, belongs in
the main prose.

**Product capability.** Which file names a harness reads, which interaction modes exist, whether a
feature is generally available. Named with the product, phrased so that the underlying concept
survives a rename, and accompanied by a pointer to the vendor's documentation.

**Commercial and volatile fact.** Prices, credit allowances, quotas, benchmark rankings, model
version names. These carry a **verification date** and appear in a table rather than in prose, so
that a reader can see at a glance what needs rechecking. Never build an explanation whose logic
depends on a specific number remaining true; build it on the structure, and let the number be an
illustration the reader can substitute.

### Verified-as-of tables

Any section containing commercial or volatile facts carries a short table recording what was
checked, when, and against what. Where a fact could not be verified against a primary source, the
table says so rather than implying confirmation. Where a fact depends on the organisation's own
configuration, the table names what an administrator must confirm, because that is actionable and
a vague warning is not.

This is not defensive boilerplate. A reader deciding how to spend a budget needs to know whether
the figure in front of them was read from a vendor's pricing page last week or inferred from a
secondary source six months ago, and the course is more useful, not less, for saying which.

### Worked examples with numbers

Cost calculations, token estimates and model comparisons should use explicitly labelled
illustrative rates, chosen to make the arithmetic clear, with a sentence telling the reader to
substitute their own current figures. A worked example that teaches the method survives a price
change; one that teaches a price does not.

## 9. Terminology

Use these consistently; the distinctions are load-bearing.

| Use | Not | Because |
|---|---|---|
| parameters | weights (when meaning all of them) | weights and biases are different things; *parameters* covers both |
| architecture / parameters / training / inference | "the model" for all four | the course's central distinction |
| model / system | "the AI" | a model is weights and architecture; a system adds context, tools and a harness |
| pretraining, supervised fine-tuning, preference-based post-training | "training" undifferentiated | they do different jobs and have different failure modes |
| static embedding / contextual representation | "embedding" for both | see section 3 |
| context window / context | interchangeable use | the window is the limit; the context is what is in it |
| token | word | the difference is the point of Module 2 |
| supervised learning | machine learning | supervised learning is one paradigm among several |
| samples from a distribution | "predicts" / "decides" | the mechanism is sampling, and the word choice matters |

Avoid anthropomorphism that implies mechanism the course has not established. "The model attends
to" is accurate and fine. "The model understands", "knows", "wants" or "decides" should be used
only where the surrounding text has made clear what is meant, or replaced with the operation
actually performed. Observable capability and internal explanation are different claims: write
"performs better on multi-step problems when it generates intermediate steps", not "reasons through
the problem".
