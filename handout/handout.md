# How language models work — reference handout

The definitions, relationships and decision criteria from the workshop, for reference at work. The
underlying course is *Tokens to Decisions*.

Full course: `../course/index.html` · Deck: `../presentation/index.html` ·
Getting started in the organisation's environment: `../practical-guide/`

Section numbers in square brackets point to the course text.

---

## Part One — how a language model works

### Learning and training

**Machine learning** — rules are found by a search procedure rather than written by a person. In
**supervised learning** you supply inputs paired with desired outputs. In **self-supervised**
learning the targets are constructed from the data itself, which is how language models are
trained: hide what comes next and predict it. No annotation is needed, so the supply of training
data is effectively unlimited. [1.1, 1.9]

**Neural network** — layers of simple units. Each unit computes a weighted sum of its inputs, adds
a constant, and applies a non-linear function. Without that non-linearity, stacked layers collapse
algebraically into a single layer. [1.2, 1.5]

**Parameters** — the learned numbers: the **weights** multiplying each input and the **bias** added
to the sum. A frontier model has on the order of 10¹¹ of them. Distinct from
**hyperparameters** (layer count, learning rate), which are chosen before training. [1.2]

> ```
> z = w₁x₁ + w₂x₂ + b        ŷ = σ(z) = 1 / (1 + e⁻ᶻ)
> ```

**Loss** — one number saying how wrong a prediction was; the complete specification of the
training goal. Squared error, ½(ŷ − y)², suits simple regression. Language models use
**cross-entropy**, −log of the probability assigned to the token that actually occurred, which
penalises assigning near-zero probability to something that then happens. [1.3, 1.9]

**Gradient descent** — compute the slope of the loss with respect to every parameter, then step
each one a small distance downhill.

> ```
> w ← w − η · ∂L/∂w          η is the learning rate
> ```
>
> Too small and training crawls; too large and each step overshoots. In practice the gradient is
> estimated from a small random **batch** rather than the full dataset. [1.4]

**Backpropagation** — an efficient method for obtaining every derivative in one backward sweep,
at roughly the cost of one extra forward pass. It computes derivatives; gradient descent does the
learning. [1.6]

**Generalisation and overfitting** — the goal is behaviour on unseen inputs. A model with enough
capacity can memorise its training data and perform poorly on anything new; a held-out set
detects this. Large models also retain verbatim fragments of training data, which is a licensing
question independent of quality. [1.7]

**Inference** — running the trained model forward. Parameters are frozen, nothing is written back,
and nothing you do while using a model changes it. Apparent memory is always text that surrounding
software re-sent. [1.8]

### From text to prediction

**Token** — a chunk of text from a fixed vocabulary of roughly 100,000–200,000 entries, built
before training by repeatedly merging the most frequent adjacent pairs (**byte-pair encoding**).
Frequency determines granularity, a leading space belongs to its token, and the model cannot see
the characters inside one. [2.1]

**Language effects** — the vocabulary was built from a corpus dominated by English and code, so
the same meaning costs more tokens in most other languages. Measure your own rather than assuming;
the gap affects cost and, through the window, how much material fits. [2.5]

**Embedding** — the first layer is a table with one row per vocabulary entry. The row selected by
a token's id is its **static embedding**, written **e**(*t*). Training arranges rows so that
tokens used similarly sit near one another.

> Individual dimensions do **not** correspond to interpretable properties. Meaningful directions
> combine many coordinates, and two-dimensional pictures are projections that discard almost
> everything. [2.3]

**Contextual representation** — written **h**ᵢ⁽ˡ⁾, the vector at position *i* after layer *l*,
once attention has mixed in information from other positions. One static embedding, many
contextual representations: the static embedding depends only on the token, the contextual
representation on the token *and its sentence*. [3.2]

**Attention** — each position emits a query describing what it needs; every position offers a key;
each receives a weighted blend of the others' values.

> ```
> Attention(Q,K,V) = softmax( QKᵀ / √dₖ ) V
> ```
>
> The scaling by √dₖ keeps the softmax out of its saturated region. Costs grow with the square of
> sequence length. Attention weights show where information was gathered from; they are **not** an
> explanation of the output. [3.2, 3.3]

**Transformer** — stacked blocks, each pairing multi-head attention with a feed-forward network,
with residual connections and normalisation around both. Attention moves information between
positions; the feed-forward network processes at a position. [3.4]

**Logits and softmax** — the pass ends with one raw score per vocabulary entry; softmax turns them
into a probability distribution summing to one. [3.5]

**Temperature** — divides logits before the softmax. Below 1 sharpens, above 1 flattens.

> ```
> p(t) = e^(zₜ/T) / Σ e^(zₜ′/T)
> ```
>
> Flattening promotes the *entire* vocabulary, and the tail is large: with ~200,000 tokens, a
> modest increase each aggregates into most of the mass. **Top-p** truncates to the smallest set
> summing to p before sampling, which is why it accompanies temperature. [4.3, 4.4]

**Autoregression** — one token per forward pass, appended to the context, then the whole thing
runs again. Costs grow with context length, errors compound, and generated text becomes
indistinguishable from supplied text. [4.6]

**Context window** — the maximum input in tokens. Zero-sum: instructions compete with material.
A stated length says what will be *accepted*, not how reliably material anywhere in it will be
*used*; retrieval of a specific detail becomes less reliable as input grows, and the middle of a
long context is the weakest region. [4.7]

**Hallucination** — fluent output that is false. No step in the process checks a claim against the
world. This is the same mechanism that produces correct answers, operating where training data did
not constrain it, which is why mitigations are architectural rather than corrective. [4.8]

**Pretraining and post-training** — pretraining supplies knowledge. **Supervised fine-tuning**
teaches the question-and-answer format; **preference-based post-training** (RLHF and relatives)
installs tone, helpfulness and refusal behaviour, and with them a tendency to agree. Safety
behaviour is trained disposition, not an enforced constraint. [5.1]

### Systems around the model

**Harness** — the program surrounding the model: it assembles the context, supplies tool
definitions, parses output, executes tools, decides when to stop. The same model behaves
differently in different harnesses; much of what is attributed to the model is set by the harness.
GitHub Copilot in VS Code is such a harness. [5.4]

**Tool / tool calling** — the model emits a structured request naming a tool and arguments; the
harness checks permissions and runs the code, then appends the result to the context. **The model
never executes anything.** Tool descriptions are prompt text; tool results are untrusted input.
[5.8]

**Agentic loop** — observe, decide, act, repeat, until a stopping condition. Reliability is set
largely by the quality of feedback available in the loop. [5.9]

**Retrieval (RAG)** — embed documents once, find the nearest to a question, place those passages
in the context. The most effective measure against hallucination. Its failures are search
failures, so debug by inspecting what was retrieved. [5.11]

**Prompt injection** — text placed where a model will read it, phrased as instruction. Indirect
injection arrives inside a document, web page or data record from outside. It works because
instructions and data share one input channel and nothing records provenance. It is a property
of the architecture; no general fix exists at present. [6.1, 6.2]

### What follows from how it works

| Mechanism | In practice |
|---|---|
| Parameters are learned from examples | Only a test with known answers shows whether a model can do a task |
| Training objective: predict the next token | Output is plausible, but not checked |
| Text is split into tokens | Counting letters and exact arithmetic are unreliable; cost and context are measured in tokens; other languages need more tokens than English |
| The next token is drawn | The same request can give different answers |
| Each generated token is appended | Long contexts cost more; early mistakes carry forward; nothing marks where text came from |
| Fixed parameters, limited context | No memory between conversations; recent and internal information is known only if it is in the context |
| No step checks statements | Hallucinations are to be expected; results must be checked |
| A harness surrounds the model | Much of what is attributed to "the AI" is a setting of the system |

---

## Part Two — what follows in practice

### The concepts in GitHub Copilot

As of October 2026, from secondary sources; names change between versions.

| Concept | In GitHub Copilot in VS Code |
|---|---|
| Model | A drop-down list in the chat. Which models appear is set by your organisation. |
| Context | Attached files and folders (with `#` in the chat box), the conversation so far, and, depending on settings, the open file. |
| Persistent instructions | Instruction files in the project, e.g. `.github/copilot-instructions.md`; prompt files (`*.prompt.md`) for recurring requests. |
| Working modes | *Ask*: questions and answers. *Plan*: a plan before execution. *Agent*: works on its own with tools. |
| Tools, agentic loop | In agent mode: reading and changing files, running terminal commands. Extensible through MCP servers. |
| Enforcement | Approval of tool calls and terminal commands; organisation policies. |
| Cost | GitHub AI Credits since 1 June 2026, charged by the tokens used; one credit is US$0.01. Code completion does not consume credits. |

### Choosing a model

| Property | Matters most for |
|---|---|
| Depth on hard problems | Multi-step work where an early error propagates |
| Instruction following | Constraints that must hold across a long output |
| Structured output | A required shape, reliably, every time |
| Tool use | Choosing the right tool and reading its result |
| Long-context handling | Material far from the end of the window |
| Latency | Conversational back-and-forth |
| Cost | Anything run repeatedly |

**Reasoning effort** — a per-task setting, not a fixed property. Additional inference-time
computation helps on tasks with genuine inferential depth and adds cost and latency on retrieval
or reformatting. How much it helps depends on the model, the task and the budget; settle it by
comparison rather than assumption. [8.1]

**Benchmarks** — useful as a first filter, not as a decision. Composite indices hide a weighting
chosen by someone else; test conditions vary; published benchmarks leak into later training data;
saturated benchmarks compress real differences; and none of them is your task. Use one to narrow
thirty models to three. [8.2]

**Your own evaluation** — five to ten real tasks with known-good outcomes, acceptance criteria
written in advance, each run three times because output is sampled, scored against the criteria
with cost and elapsed time recorded. An afternoon's work, and it answers the question a
leaderboard cannot. [8.3, 14.2]

### Cost

| Unit | What it is | Defined by |
|---|---|---|
| Token | A chunk of text processed | The tokeniser — technical |
| Model call | One request with its own context | The system architecture |
| Your instruction | One thing you asked for | You — may cause many calls |
| Credit | An accounting unit with a stated value | The vendor, by policy |
| Allowance | Credits included per seat per period | Your plan |

**Token pricing** — input, cached input and output are priced separately. Output usually costs
several times input, because generation is sequential. Cached input — a prefix the provider has
already processed — is often around a tenth of input, which is why stable instructions matter
financially. **Reasoning tokens are billed as output and are often invisible.** [8.4]

> **One instruction can trigger many model calls.** An agentic workflow easily turns one sentence
> into twenty. How tokens convert into credits is set by the vendor. [8.5]

**What increases consumption**

- Long attached documents, re-sent on every turn of a conversation
- Long conversations, because the whole transcript goes back each turn
- High reasoning effort
- Agentic loops: more steps, and growing context at each one
- Changing prompt prefixes, which invalidates caching
- Retries caused by an under-specified task

**Total cost** — model spend is usually the small term. Verification at twenty minutes against a
loaded hourly rate commonly exceeds it by a large factor, so the cheapest route is the one needing
fewest corrections. Weigh model cost, elapsed time, retries, human verification, and the cost of
an error that gets through. [8.7]

### Context engineering

**What is in the context** — the vendor's system prompt, tool definitions, your persistent
instructions, material gathered from your working environment, retrieved passages, the
conversation so far, and finally your words. Yours are a small fraction. [9.1]

**Prompt structure**

| Element | Weak | Strong |
|---|---|---|
| Objective | "Compare the suppliers" | "A four-page memo recommending one, for Thursday's meeting" |
| Background | *(omitted)* | "We run these continuously; sustained throughput matters more than peak" |
| Constraints | "Be accurate" | "Never present a vendor's figure as a measurement" |
| Output | "Write it up" | "Table, then conflicts, then assumptions, then recommendation" |
| Acceptance | *(omitted)* | "Every numeric claim traceable to a page or row range" |
| Uncertainty | *(omitted)* | "List what you could not verify and what you assumed" |

The last two are most often omitted and change the result most. [9.5]

**When to start a new conversation**

- The task has changed
- Three corrections have failed — the context now holds three wrong approaches
- Output quality has drifted over a long session
- You are moving from exploration to the actual work
- Before anything where a stray earlier instruction would be costly

**Long sessions** — harnesses manage growth differently: some drop the earliest turns, some
summarise progressively, some retrieve selectively, many re-insert standing instructions every
request. Find out which yours does. For work spanning sessions, end each one with a short handover
note and open the next with it. [9.4]

### Working modes

| Mode | You judge | Suits |
|---|---|---|
| Conversational | Every answer | Understanding, drafting, deciding what to do |
| Planning | The plan, before work happens | Anything large or ambiguous |
| Interactive | Each action | Most substantial work; any first run |
| Autonomous | Only the result | Established, checkable, repeated tasks |

**Choosing** — how ambiguous is the task; how reversible are the actions; what does a mistake
cost; can success be checked automatically; what can the tools reach; how much undocumented
judgement is needed. Start at the least autonomous mode that could work; use interactive for
anything done the first time. In GitHub Copilot, *Ask* corresponds to conversational and *Plan* to
planning; *Agent* is interactive or autonomous depending on whether actions are approved one at a
time or automatically. [10.2, 10.3]

### Three kinds of control

| | Determines | Example |
|---|---|---|
| **Guidance** — instructions, prompts, style | What is *likely* | "Cite a page for every figure" |
| **Orchestration** — steps, routing, stopping | What *ordinarily happens* | A review step that checks citations |
| **Enforcement** — permissions, sandbox, approval | What is *possible* | No write access outside the drafts folder |

Writing "do not modify any files" is guidance and can be displaced. Read-only access is
enforcement and cannot. Put anything costly or irreversible in the third row. In GitHub Copilot an
instruction file is guidance; approval of tool calls is enforcement. [10.5]

### Planning and delegation

**When planning is worth it** — the task is large, ambiguous, or expensive to redo; several people
must agree what "done" means; the work will be delegated; or you have been surprised by a first
attempt. A planning pass costs a fraction of a full attempt and surfaces misunderstandings in a
two-minute artefact. [11.1]

**A plan worth having** states the objective in the model's own words, the missing information,
the deliverable, the constraints and acceptance criteria, the decomposition, the dependencies, a
suggested model and mode per subtask, and the integration step. [11.2]

**When delegation is worthwhile** — the task exceeds what one context holds well; subtasks differ
markedly in difficulty; parts can run in parallel; or the work recurs often enough to justify
specifying it once.

**What delegation costs** — context does not transfer between subtasks; specification is real
work; errors propagate without being revisited; integration is a judgement step often treated as
clerical; sequential dependencies add latency. A single capable model with a well-curated context
beats a poorly orchestrated pipeline more often than expected. [11.4]

### Persistent configuration

| Scope | Cost paid | Good for |
|---|---|---|
| One-off instruction | Once | Anything unusual about this request |
| Personal preferences | Every request, everywhere | Writing style, language, level of detail |
| Project instructions | Every request in that project | Terminology, conventions, layout |
| Path-scoped instructions | Only on matching work | Rules for one kind of material |
| Saved prompt template | When invoked | A request repeated in the same form |
| Skill | Description always; body on demand | A procedure with standards |
| Organisational policy | Varies | What must hold regardless of preference |

Push each instruction to the narrowest scope that still catches every case. Providers generally
train models to treat system-channel instructions as taking priority over user messages and over
document content, so there is a real hierarchy — but it is a trained disposition, not an enforced
rule, and conflicts *within* a level have no documented resolution. Remove contradictions rather
than relying on one to win. [12.1]

**A style profile works when it names decisions** — voice, tense, person, heading case, sentence
length, words to avoid — rather than describing good writing. Review and prune quarterly; every
line is sent with every request. [12.2, 12.4]

### Skills, agents and tools

| Thing | Supplies | Activated by |
|---|---|---|
| Prompt | Text, once | You, typing |
| Saved prompt file | Text, reused | You, by name |
| Persistent instructions | Text, always present | Nobody — always on |
| **Skill** | Text plus optional files, on demand | The model, where selection is automatic |
| **Custom agent** | Instructions + tool set + sometimes a model | You, by selecting it |
| **Subagent** | The same, inside a larger workflow | The orchestrating system |
| **Tool** | The ability to act outside text | Model requests, harness executes |
| **MCP server** | A package of tools and resources | Configured once |
| **Hook** | Code at a fixed point, every time | Nobody — deterministic |

**Skills** use progressive disclosure: a short name and description stay in context; the body loads
when relevant; supporting files open only if needed. Where a harness selects skills automatically
the description does unusual work, since it is typically all the model has when deciding. Some
environments require invoking by name instead. [13.2]

**MCP and tools** — adding a server is installing third-party code with the credentials you give
it. Establish the publisher, pin the version, read the tool descriptions once, scope credentials to
the minimum, and keep an inventory. Enable only the tools the task needs. [13.4]

### How much structure to build

| Approach | Setup | Appropriate when |
|---|---|---|
| Single conversational request | None | One-off, or still deciding what you want |
| Structured task specification | Minutes | It matters and the first attempt missed |
| Saved prompt template | Under an hour | The same request recurs |
| Persistent instructions | An hour + upkeep | A preference spans many tasks |
| Reusable skill | Half a day + upkeep | A multi-step procedure, used regularly |
| Tool-supported agent | Setup + permissions review | Needs actions text cannot perform |
| Several coordinated agents | Substantial | Subtasks differ markedly or run in parallel |
| **Conventional software** | Often less than expected | **The procedure is exact and inputs structured** |

Frequency, input variability, cost of error, number of people involved, and how stable the task is
all move the answer. A model is worth its cost where inputs are irregular, judgement is required,
or the task cannot be specified exactly in advance. [13.6]

### Verification

**Acceptance criteria** should be checkable by someone other than their author. Write them before
the work: written afterwards they describe whatever was produced, and stated in the prompt they
improve the output as well as the review. [14.1]

| Dimension | A checkable criterion |
|---|---|
| Factual accuracy | Each cited figure matches the cited page or row range |
| Completeness | All agreed criteria appear for all subjects |
| Traceability | No claim without a source; "not stated" where absent |
| Numerical correctness | Computed values reproduce when recalculated |
| Structural validity | All required sections present and non-empty |
| Honest boundaries | Claims from sources never presented as measurements |
| Repeatability | Three runs give the same *figures*, if not the same prose |

**Proportionate oversight** — exploratory work needs a skim; material informing your own thinking
needs spot checks; work circulating to colleagues needs every factual claim traced; anything
entering a decision, a contract or an external communication needs full verification and
independent recomputation of numbers. [14.3]

**Design for cheap checking.** A document whose every figure carries a source is verified in
minutes; the same document without sources takes an hour, because the checker must first find what
to check.

### Actions requiring extra caution

- Anything irreversible: sending, filing, submitting, purchasing, deleting
- Anything acting on material from outside the organisation
- Anything with write access to shared locations
- Numbers entering a decision, contract or external communication
- Workflows combining private data, untrusted content and an outward channel — remove one
- First runs of anything, and first runs after a model or configuration change

**Do not paste** live credentials, personal data about identifiable people, material confidential
to a third party, or anything under legal hold. If a credential reaches a prompt, rotate it — a
transcript is a logging surface. Your own organisation's working material is normally fine, which
covers most of what people actually want to paste. [14.4]

---

## Sources and further reading

The course's annotated reading list is at `../course/resources.html`. The most useful starting
points:

- **3Blue1Brown**, neural networks and transformers — a clear visual explanation and a good start
- **Andrej Karpathy**, *Deep Dive into LLMs like ChatGPT* and *Neural Networks: Zero to Hero*
- **Anthropic**, *Building effective agents* — design patterns, and when not to use them
- **Simon Willison**, prompt-injection archive — the running record of this problem
- **OWASP Top 10 for LLM Applications** — a recognised vulnerability taxonomy

**Product documentation** — for anything plan-dependent, version-dependent or priced, consult the
vendor's own documentation rather than this handout. GitHub Copilot, VS Code agent customisation,
the Model Context Protocol and the Agent Skills specification all publish current references.

> **Verification note.** Product behaviour and all commercial figures in this handout were
> compiled in October 2026 from secondary sources, because the primary documentation hosts were not
> reachable from the environment in which it was written. The move to GitHub AI Credits on 1 June
> 2026 rests on search results about GitHub's announcement of April 2026. Confirm before
> standardising on any of them. Four questions only your administrator can answer: which billing model your agreement is
> on, what the allowance is and whether it pools, whether overage is enabled and what happens at
> exhaustion, and which report shows consumption to whom.
