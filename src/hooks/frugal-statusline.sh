#!/bin/bash
# frugal — statusline badge for Claude Code
# Outputs [FRUGAL] when frugal mode is active.

FLAG="${CLAUDE_CONFIG_DIR:-$HOME/.claude}/.frugal-active"

[ -L "$FLAG" ] && exit 0
[ ! -f "$FLAG" ] && exit 0

MODE=$(head -c 64 "$FLAG" 2>/dev/null | tr -d '\n\r' | tr '[:upper:]' '[:lower:]')
MODE=$(printf '%s' "$MODE" | tr -cd 'a-z0-9-')

case "$MODE" in
  on) ;;
  *) exit 0 ;;
esac

printf '\033[38;5;34m[FRUGAL]\033[0m'
