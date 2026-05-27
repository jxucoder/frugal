# CLAUDE.md — frugal

## Project overview

Frugal is a Claude Code plugin that makes AI coding sessions progressively cheaper. Caveman compresses output; frugal compresses the *process* — better decisions, fewer wrong turns, compound learning from extracted skills. Tagline: "Every session makes the next one cheaper."

## What lives where

```
frugal/
├── .claude-plugin/plugin.json        # Plugin manifest
├── skills/
│   ├── frugal/SKILL.md               # Behavioral rules + 10 principles (source of truth)
│   └── frugal-reflect/SKILL.md       # Skill extraction workflow
├── src/hooks/
│   ├── package.json                  # CJS marker
│   ├── frugal-config.js              # Shared: flag ops, symlink-safe read/write
│   ├── frugal-activate.js            # SessionStart: emit rules if active
│   ├── frugal-tracker.js             # UserPromptSubmit: /frugal commands + reinforcement
│   └── frugal-statusline.sh          # [FRUGAL] badge
├── research/                         # Design research and analysis
├── resources/                        # Reference repos (gitignored)
├── README.md
└── CLAUDE.md                         # This file
```

## Hook system

Two hooks + shared config + statusline. Communicate via flag file at `$CLAUDE_CONFIG_DIR/.frugal-active`.

- `frugal-config.js` — exports `safeWriteFlag`, `readFlag`, `getFlagPath`. Symlink-safe, size-capped, whitelist-validated.
- `frugal-activate.js` — SessionStart. Reads flag; if active, reads `skills/frugal/SKILL.md` and emits as system context.
- `frugal-tracker.js` — UserPromptSubmit. Detects `/frugal` and `/frugal off`. Emits per-turn reinforcement when active.
- `frugal-statusline.sh` — Reads flag, outputs `[FRUGAL]` badge. Refuses symlinks, whitelist-validates.

`package.json` with `{"type": "commonjs"}` prevents ESM/CJS conflicts.

All hooks silent-fail on filesystem errors. Never block session start.

## Key rules

- Edit `skills/frugal/SKILL.md` for behavior changes. It's the single source of truth.
- All flag file writes go through `safeWriteFlag()`. Never use `fs.writeFileSync` directly.
- Hooks must respect `CLAUDE_CONFIG_DIR` env var.
- Per-turn reinforcement in frugal-tracker.js keeps the model aligned after context compression or competing plugin injections.

## Skill library

Users accumulate project-specific skills in `.frugal/skills/` (in their project directory, not this plugin). Created via `/frugal-reflect` after solving non-trivial problems. The `SKILL.md` tells the agent to check this directory before ad-hoc work.

## Stacking with caveman

Different hooks, different flag files, different concerns. Caveman compresses output (~65-75% token savings). Frugal compresses process (~30-50% fewer turns). They stack.
