# Answer key

Read this *after* you have the model's assessment in front of you, not before. The point of
the exercise is to find out what checking an answer actually costs you — and you cannot
discover that if you already know the answer.

Every figure below was computed directly from `readings-q3.csv`. You can reproduce all of
them in a spreadsheet; the formula is given where it is not obvious.

## The checkable facts

| # | Fact | Value |
|---|---|---|
| 1 | Rows of data | 60 (plus a header row) |
| 2 | Days throughput reached 1,200 or more | **6** — R-005, R-013, R-020, R-031, R-045, R-060 |
| 3 | Highest single reading | **1,248** on **2026-09-22** (R-060) |
| 4 | Lowest single reading | 1,061 on 2026-07-06 (R-004) |
| 5 | Mean throughput across all 60 days | **1,130.2** units per hour |
| 6 | Median throughput | 1,123.5 |
| 7 | Rows with no downtime reading | **6** — R-005, R-018, R-024, R-039, R-046, R-053 |
| 8 | Mean downtime over the 54 rows that have one | **14.3** minutes |
| 9 | Mean downtime if the six blanks are treated as zero | 12.9 minutes |
| 10 | Days with downtime above 15 minutes | **18** of the 54 recorded |
| 11 | Highest downtime | 31 minutes on 2026-08-12 (R-031) |

Spreadsheet equivalents, for columns C (throughput) and D (downtime), rows 2–61:

```
2  =COUNTIF(C2:C61,">=1200")
3  =MAX(C2:C61)          and  =INDEX(A2:A61,MATCH(MAX(C2:C61),C2:C61,0))
5  =AVERAGE(C2:C61)
7  =COUNTBLANK(D2:D61)
8  =AVERAGE(D2:D61)      — AVERAGE already ignores blanks
9  =SUM(D2:D61)/60
10 =COUNTIF(D2:D61,">15")
```

Note what rows 8 and 9 show: the same question, two defensible methods, a difference of 1.4
minutes that lands on either side of the supplier's figure. A note that gives one number
without saying which method produced it has hidden the only interesting thing about it.

## The three judgements

These are what separate a usable assessment from a fluent one. A model may find none, one,
or all three. Each is visible in the data to anyone who looks.

**The sustained throughput claim is not supported.** The brief claims 1,200 units per hour
sustained. The trial reached that figure on 6 days out of 60 — 10% of the time — and the
mean was 1,130.2, about 6% below the claim. "Sustained" is the supplier's word, and the
trial does not bear it out.

**The two highest readings were taken outside the rated operating envelope.** R-031 (1,226)
and R-060 (1,248) both carry the operator note *ran above rated load on operator request*.
The brief itself puts rated load at 1,180 and excludes above-rated operation from both the
sustained figure and the warranty. So the peak that appears to vindicate the supplier's
"up to 1,250" is a peak the supplier has already disclaimed. Excluding those two runs, the
highest reading under normal operation is **1,215** (R-020, 2026-07-28), and 4 days rather
than 6 reached 1,200.

**The missing downtime readings are not missing at random.** Of the six blanks, two say
the sensor was offline, two say the logger was replaced, one records a maintenance window,
and one says no reading was taken. Downtime is most likely to be *understated* on exactly
the days where it was not recorded, so treating the blanks as zero — which is what a naive
average over 60 rows does — biases the figure downward. The honest statement is the one in
row 8 with its denominator attached: 14.3 minutes over the 54 days with a reading.

## Scoring your own run

| What to check | Where it usually goes wrong |
|---|---|
| Are facts 2, 3, 5, 7, 8 all present and correct? | A plausible-looking figure with no row range behind it |
| Is the denominator stated for every average? | "Average downtime was 12.9 minutes" — over what? |
| Are the supplier's figures marked as claims? | The brief's 1,250 quoted beside measurements as though equivalent |
| Did it find the above-rated-load note? | The two peak rows reported without their operator note |
| Did it say what it could not determine? | Silence, which reads as completeness |

An assessment that gets every number right and misses all three judgements is worse than
useless, because it is checkable, confident and wrong about what the data means. That is
the failure mode worth learning to recognise, and it is why the course asks for acceptance
criteria before the work rather than approval after it.

## What could not be determined

The material supplied does not contain: the trial unit's configuration or its age, the
conditions the supplier's own figures were measured under, whether the 60 days are
representative of normal operation, what happened on the six unrecorded days, the price,
or the terms of §7 of the warranty. A note that does not list these has implied they do not
exist.
