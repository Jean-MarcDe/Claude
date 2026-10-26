# Practical guide — GitHub Copilot in VS Code

A companion to the course for readers who have never opened a code editor. It assumes no
programming, no command line and no prior tool, and takes a reader from installing nothing to
running, checking and correcting a real piece of work.

| File | Contents |
|---|---|
| `index.html` | The guide. Fourteen sections and a worked exercise. |
| `exercise/readings-q3.csv` | Sixty trial measurements. The exercise's data. |
| `exercise/vendor-claims.md` | A fictional supplier brief making claims the data tests. |
| `exercise/acceptance-criteria.md` | The eight things the finished note has to do. |
| `exercise/answer-key.md` | Every checkable figure, three judgements, spreadsheet formulas. |

## The two-layer structure

The guide separates what does not go stale from what does.

**Prose** describes mechanisms — what a workspace is, why attaching everything is a bad
strategy, why a tool result is untrusted input. It should hold for years.

**Step boxes** describe the interface, and each carries a confidence flag in its header:

| Flag | Meaning |
|---|---|
| **Stable** | The shape of the interaction has been consistent. Names and icons may differ. |
| **Verify** | The interaction exists; its location or label moves between versions. |
| **Unconfirmed** | Reconstructed rather than checked, or dependent on local configuration. |

There are 17 flagged step boxes: 5 stable, 7 verify, 5 unconfirmed (an eighteenth box carries no
flag — it is the legend). The honest summary is that roughly two-thirds of the interface
instructions here are reconstructions or best guesses rather than confirmations.

**There are no screenshots, deliberately.** This material was written in an environment with no
network access, including none to GitHub's or Microsoft's documentation. A screenshot would look
like evidence it is not, and would be stale within months regardless. The flags say what to trust
instead.

## The exercise

About forty minutes, fully reproducible, and the answer key is exact — every figure in it was
computed from the CSV rather than estimated.

It is built around a specific failure: an assessment can get all five headline figures right and
still be unusable, because it misses that the two highest readings carry an operator note putting
them outside the rated operating envelope, and that the six missing downtime readings are not
missing at random. A numbers-only review passes that answer. The exercise exists to let someone
discover that once, cheaply, on data where the right answer is known.

**If you edit the data**, recompute the key. The figures in `answer-key.md` are not approximate
and the exercise depends on them being right. The formulas are given in the key itself, and the
file's own tables state which rows each fact comes from.

## If you update it

The thing most worth maintaining is the honesty of the flags, not the currency of the steps. A
step box corrected against the live product should be promoted to **Stable** or **Verify** and
dated in the text. A box that turns out to be wrong should be corrected rather than deleted — the
wrong version is evidence about how fast this surface moves.

Terminology follows `../course_style_guide.md` §9, and the guide should introduce no technical
claim that `../course/` does not make. Where it simplifies, it links to the section that does not.
