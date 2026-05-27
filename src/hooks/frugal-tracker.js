#!/usr/bin/env node
// frugal — UserPromptSubmit hook
//
// 1. Detects /frugal and /frugal off commands, writes/clears flag file
// 2. Emits per-turn reinforcement when frugal mode is active

const fs = require('fs');
const { getFlagPath, safeWriteFlag, readFlag } = require('./frugal-config');

const flagPath = getFlagPath();

let input = '';
process.stdin.on('data', chunk => { input += chunk; });
process.stdin.on('end', () => {
  try {
    const data = JSON.parse(input);
    const prompt = (data.prompt || '').trim().toLowerCase();

    if (prompt.startsWith('/frugal')) {
      const parts = prompt.split(/\s+/);
      const arg = parts[1] || '';

      if (parts[0] === '/frugal' || parts[0] === '/frugal:frugal') {
        if (!arg) {
          safeWriteFlag(flagPath, 'on');
        } else if (arg === 'off' || arg === 'stop' || arg === 'disable') {
          try { fs.unlinkSync(flagPath); } catch (e) {}
        }
      }
    }

    // Per-turn reinforcement when active
    const active = readFlag(flagPath);
    if (active === 'on') {
      process.stdout.write(JSON.stringify({
        hookSpecificOutput: {
          hookEventName: "UserPromptSubmit",
          additionalContext:
            "FRUGAL MODE ACTIVE. " +
            "Minimize turns: plan before acting, target precisely, checkpoint before pivoting, " +
            "exit early on dead ends (3 failures = reframe). " +
            "Check .frugal/skills/ before ad-hoc work. Use subagents for research."
        }
      }));
    }
  } catch (e) {
    // Silent fail
  }
});
