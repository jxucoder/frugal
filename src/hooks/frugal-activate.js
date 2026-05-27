#!/usr/bin/env node
// frugal — SessionStart hook
//
// If frugal mode is active (flag file exists), reads SKILL.md and emits it
// as hidden system context via stdout. If not active, emits a one-liner.

const fs = require('fs');
const path = require('path');
const os = require('os');
const { getClaudeDir, getFlagPath, readFlag } = require('./frugal-config');

const claudeDir = getClaudeDir();
const flagPath = getFlagPath();
const mode = readFlag(flagPath);

if (mode !== 'on') {
  process.stdout.write('Frugal plugin available. Type /frugal to activate cost-saving discipline.');
  process.exit(0);
}

// Read SKILL.md — single source of truth for frugal behavior.
let skillContent = '';
try {
  skillContent = fs.readFileSync(
    path.join(__dirname, '..', '..', 'skills', 'frugal', 'SKILL.md'), 'utf8'
  );
} catch (e) {}

let output;
if (skillContent) {
  const body = skillContent.replace(/^---[\s\S]*?---\s*/, '');
  output = 'FRUGAL MODE ACTIVE\n\n' + body;
} else {
  output =
    'FRUGAL MODE ACTIVE\n\n' +
    'Minimize total session cost (turns x tokens) without sacrificing correctness. ' +
    'Plan before acting. Checkpoint before pivoting. Exit early on dead ends. ' +
    'Check .frugal/skills/ before ad-hoc work. Use subagents for research.';
}

// Detect missing statusline config — nudge Claude to offer setup
try {
  const settingsPath = path.join(claudeDir, 'settings.json');
  let hasStatusline = false;
  if (fs.existsSync(settingsPath)) {
    const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
    if (settings.statusLine) hasStatusline = true;
  }
  if (!hasStatusline) {
    const scriptPath = path.join(__dirname, 'frugal-statusline.sh');
    const command = 'bash "' + scriptPath + '"';
    const snippet = '"statusLine": { "type": "command", "command": ' + JSON.stringify(command) + ' }';
    output += '\n\nSTATUSLINE SETUP NEEDED: The frugal plugin includes a [FRUGAL] statusline badge. ' +
      'It is not configured yet. To enable, add this to ' + settingsPath + ': ' + snippet + ' ' +
      'Proactively offer to set this up for the user on first interaction.';
  }
} catch (e) {}

process.stdout.write(output);
