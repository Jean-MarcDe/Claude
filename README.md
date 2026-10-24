# Tokens to Pull Requests

A two-part learning course on modern AI and its use inside GitHub Enterprise.

**Part One** explains how a language model actually works — from gradient descent to agents.
**Part Two** spends that understanding on GitHub Copilot in an enterprise setting: instruction
files, prompting, code review, coding agents, and the governance around them.

The course is designed so that almost every practical recommendation in Part Two is traceable to
a mechanism in Part One. Concept blocks in Part One end with a **bridge** marker pointing at the
practice they determine; sections in Part Two point back. A practice you can derive is a practice
you can adapt when the product changes underneath you.

## Contents

| File | What it is |
|---|---|
| [`course/index.html`](course/index.html) | Course overview: concept map, full syllabus, the theory→practice bridge table, and four ways to run it (2-hour skim, 2-day workshop, 6-week study group, reference) |
| [`course/part-1-theory.html`](course/part-1-theory.html) | **Part One** — Modules 1–7, 17 figures. ML vs traditional software, neural networks, training, gradient descent, backpropagation, inference, tokenisation, encoding, embeddings, attention, transformers, next-token prediction, temperature, seeds, autoregression, context, hallucination, chat, the harness, reasoning, prompting, tools, agents, skills, retrieval, MCP, evaluation, and security |
| [`course/part-2-practice.html`](course/part-2-practice.html) | **Part Two** — Modules 8–14, 3 figures, 8 labs. The Copilot surface area, context engineering in a repository, prompting, code review, coding agents, security and governance, rollout, and hands-on exercises |
| [`course/resources.html`](course/resources.html) | 38 annotated further-learning resources — 3Blue1Brown, Karpathy, Jay Alammar, interactive explainers, OWASP, official GitHub docs, courses and papers. Each says what it uniquely gives you, how long it takes, and which module it extends |

## Reading it

Each page is a **self-contained HTML file** — no build step, no dependencies, no server. Open
`course/index.html` in a browser, or view the published version:

**https://claude.ai/artifact/WDTEAh7PkdBk2yjkxdrQLw**

The pages follow the reader's light or dark theme, work at phone width, and have print
stylesheets, so a module can be printed as a handout for a workshop.

Fonts load from Google Fonts; everything else — including all 20 diagrams, which are hand-authored
inline SVG — is embedded in the file. The pages render fine offline with fallback fonts.

## Which parts expire

This matters for maintenance, so it is worth stating plainly:

- **Part One is mechanism.** Nothing in it has changed materially since the transformer paper in
  2017, and none of it is vendor-specific. It does not need maintenance.
- **Part Two describes a product surface that changes monthly.** File names, feature names, model
  lists and plan boundaries all move. Every specific is written as a pointer into GitHub's own
  documentation rather than as a fact to rely on, and the page says so at the top.

If you adopt this course internally, the maintenance job is Part Two's Modules 8–12 and the
GitHub section of the resources page. Check them against
[GitHub's Copilot documentation](https://docs.github.com/en/copilot) and the
[changelog](https://github.blog/changelog/) before standardising anything across an organisation.

## Covered concepts

Everything requested, in dependency order rather than the order it was asked for, plus the
connective concepts needed to make the sequence hold together.

**As requested:** machine learning vs traditional software · neural networks · training · gradient
descent · backpropagation · inference · transformers · language and transformers · effects of
human language on token usage and output quality · tokenisation · encoding · embedding · attention
· context · next-token prediction from context plus parameters · probability of the next token ·
temperature · seeds and determinism · output becoming input · hallucination · chatbots · the
harness · reasoning · prompting (user-written and automatic) · custom modifications · security
(prompt injection, jailbreaking) · skills · agents · tools

**Added where the sequence needed them:** loss functions · parameters vs hyperparameters ·
overfitting and generalisation · vocabularies and byte-pair encoding · positional encoding ·
queries, keys and values · multi-head attention · residual stream and layer normalisation · KV
cache · logits and softmax · top-k and top-p sampling · context rot and the lost-in-the-middle
effect · post-training (SFT, RLHF) · chat templates · test-time compute · retrieval-augmented
generation · MCP · evaluation and LLM-as-judge · the lethal trifecta · exfiltration channels ·
tool and supply-chain poisoning · insecure generated code · defence in depth · the jagged frontier
· the inference cost model

## Labs

Eight exercises in Part Two, Module 14. Four need only a browser; four use a repository.

1. Measure what your language costs — tokeniser comparison across languages and file types
2. Watch the distribution move — temperature and sampling, hands-on
3. A/B your instruction file — 0 lines vs 40 lines vs a deliberately bad 400 lines
4. Encode a checklist as a prompt file
5. Same task, two specifications — vague vs well-shaped agent task
6. Red-team your own repository — benign indirect prompt injection, in a disposable private repo
7. Review an AI pull request properly — against the six-point list
8. Write your team's conventions — the one page you keep

Lab 6 carries explicit scope rules: a private disposable repository, no real secrets, a benign
marker-file payload, no exfiltration, nothing run against shared or third-party infrastructure.

## Licence and attribution

No licence file is included — add one that suits your organisation before distributing.

Written for teams adopting AI tooling who want to understand it rather than memorise tips.
