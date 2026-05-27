---
name: frugal-reflect
description: "Extract reusable skills from the current session. Use after solving a non-trivial problem to compound learning across sessions."
---

# Skill Extraction

Review this session and extract reusable skills into `.frugal/skills/`.

## Process

1. Identify what was solved and the approach that worked
2. Identify what was tried and failed (anti-patterns)
3. Write a skill file to `.frugal/skills/<name>.md` (create directory if needed)
4. Summarize what was extracted

## Skill File Format

```markdown
---
name: <kebab-case-name>
description: "<What it does>. Use when: <trigger conditions>."
trigger: "<keyword1|keyword2|keyword3>"
created: <today's date>
---

## When to use
<1-2 sentences describing the problem this skill solves>

## Steps
1. <concrete, actionable step>
2. <concrete, actionable step>

## Anti-patterns
- Don't <thing that was tried and failed, and why>

## Files to check first
- <project-specific file paths relevant to this problem>
```

## Guidelines

- Only extract if the session solved something non-trivial
- Steps must be concrete and actionable, not generic advice
- Anti-patterns prevent future waste — they're as valuable as steps
- "Files to check first" is project-specific — that's the compound learning
- One skill per problem. Don't bundle unrelated solutions.
- If `.frugal/skills/` already has a similar skill, update it instead of creating a duplicate
