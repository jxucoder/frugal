# frugal

**Every session makes the next one cheaper.**

Frugal is a Claude Code plugin that reduces AI coding session costs by 30-50% through behavioral discipline and compound learning — without losing intelligence.

## How it works

| Layer | What it does | Cost |
|---|---|---|
| **Behavioral discipline** | 10 research-backed principles that prevent the most expensive anti-patterns: wrong debugging paths, unnecessary file reads, circular approaches | ~250 tokens on session start + ~40 tokens/turn |
| **Compound learning** | Extract reusable skills from successful sessions. Next time you hit the same problem, the agent follows a proven playbook instead of exploring from scratch | One-time extraction cost, then free forever |

## Install

```bash
# From GitHub
claude plugin add jxucoder/frugal
```

## Usage

```
/frugal          # Activate frugal mode
/frugal off      # Deactivate
/frugal-reflect  # Extract skills from current session
```

When active, the `[FRUGAL]` badge appears in your statusline.

## What you get

| Feature | What it does |
|---|---|
| `/frugal` | Activates 10 behavioral principles: plan before acting, checkpoint before pivoting, exit early on dead ends, proportional effort, precision over exploration, and more |
| `/frugal-reflect` | After solving a hard problem, extracts a reusable skill to `.frugal/skills/`. Next session, the agent finds and follows it automatically |
| Per-turn reinforcement | Keeps the agent disciplined even after context compression or competing plugin injections |
| `[FRUGAL]` statusline | Visual confirmation that frugal mode is active |

## The 10 Principles

Each principle is grounded in published research, production systems, or both.

| # | Principle | What it prevents | Source |
|---|---|---|---|
| 1 | Precision over exploration | Reading entire files when you need 10 lines | [Observation masking](https://arxiv.org/abs/2508.21433) (Lindenbauer et al., JetBrains/NeurIPS 2025) — simple masking of verbose tool outputs matched or beat LLM summarization in 4/5 settings, ~50% cost reduction |
| 2 | Plan cheaply, execute once | Rushing into wrong approaches (15-turn detours) | [FrugalGPT](https://arxiv.org/abs/2305.05176) (Chen et al., Stanford, 2023) — cascade philosophy: cheapest viable approach first, escalate only when needed |
| 3 | Checkpoint before pivoting | Circular debugging — the #1 money burner | [AgentDiet](https://arxiv.org/abs/2509.23586) (Xiao et al., 2025) — up to 20.3% token reduction by compacting agent trajectories; JetBrains found LLM summarization caused "trajectory elongation" where agents didn't realize how stuck they were |
| 4 | Proportional effort | Opus-level reasoning for a variable rename | [Adaptive thinking](https://docs.anthropic.com/en/docs/build-with-claude/extended-thinking) (Anthropic) — up to 26% accuracy gain on MATH-500 using only 63% of thinking tokens by matching effort to difficulty |
| 5 | Isolate research from execution | Context pollution from verbose search output | [FlashCompact](https://www.morphllm.com/flashcompact) (Morph) — prevention-first context management via subagent isolation; [ACON](https://arxiv.org/abs/2510.00615) (Kang et al., ICLR 2026) — 26-54% peak token reduction |
| 6 | Learn from every session | Solving the same problem twice | [AutoRefine](https://arxiv.org/abs/2601.22758) (Qiu et al., 2026) — 20-73% step reductions by extracting experience patterns from agent trajectories |
| 7 | Negative knowledge is knowledge | Trying approaches that already failed | [Contrastive reflection](https://arxiv.org/abs/2603.20441) (Li et al., McGill, 2026) — training-free self-improvement using contrastive reflection on what worked vs. what didn't |
| 8 | Reuse before reinvent | Reinventing what the codebase (or a skill) already has | [SkillFlow](https://arxiv.org/abs/2504.06188) (Li et al., UC Davis, 2025) — +78.3% pass@1 via multi-stage skill retrieval; [compound-engineering](https://github.com/EveryInc/compound-engineering-plugin) `docs/solutions/` pattern |
| 9 | Exit early on dead ends | Trying a 4th variation of a failed approach | [SICA](https://arxiv.org/abs/2504.15228) (Robeyns et al., 2025) — self-improving agents that edit their own heuristics based on outcomes (17% → 53% on SWE-Bench); [AutoMix](https://arxiv.org/abs/2310.12963) self-verification dilemma |
| 10 | Transparency over magic | Silent strategy switches that confuse the user | [pstack](https://github.com/cursor/plugins/tree/main/pstack) (Lauren Tan) — principle citation requirement: name the principle that shaped each decision; [goal-forge](https://github.com/michaelpersonal/goal-forge) scorecard pattern |

## Compound learning

The real value is compound. Every `/frugal-reflect` creates a skill in `.frugal/skills/` that makes future sessions cheaper:

```
Session 1: Debug hydration error — 12 turns
Session 2: Same error → follows extracted skill — 4 turns
Session 3: Similar error → adapts skill — 3 turns
```

Skills are project-specific. A Next.js project's debugging skills don't apply to a Python CLI, and they shouldn't.

## Stacking with caveman

Frugal and [caveman](https://github.com/JuliusBrussee/caveman) are complementary:

| | Caveman | Frugal | Both |
|---|---|---|---|
| **Compresses** | Output tokens | Process (turns) | Both |
| **Savings** | ~65-75% per turn | ~30-50% fewer turns | ~75-85% total |
| **Mechanism** | Terse prose | Better decisions | Stack |

```bash
# Use both
claude plugin add JuliusBrussee/caveman
claude plugin add jxucoder/frugal
```

## Research basis

Built on findings from 25+ research papers. Key influences:

- **FrugalGPT** (Chen et al., Stanford, 2023) — cascade philosophy: cheap first, escalate only when needed
- **Observation masking** (Lindenbauer et al., JetBrains/NeurIPS 2025) — masking verbose outputs beats LLM summarization
- **AutoRefine** (Qiu et al., 2026) — 20-73% step reductions via extracted experience patterns
- **SICA** (Robeyns et al., 2025) — self-improving agents that edit their own heuristics
- **SkillFlow** (Li et al., UC Davis, 2025) — targeted skill retrieval outperforms bulk loading
- **Adaptive thinking** (Anthropic) — match reasoning effort to task difficulty

Full research notes in [`research/`](./research/).

## License

MIT
