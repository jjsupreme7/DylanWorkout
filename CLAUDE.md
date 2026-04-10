# DylanWorkout

## Dev Server
- **Port:** 3004 (`npm run dev`)
- **Framework:** Next.js 15.2.0, TypeScript, Tailwind CSS

## What This Is
Workout tracking app with Supabase backend. Features Stripe payments, Claude AI integration, and data visualizations.

## Stack
- Next.js + Tailwind CSS + Zustand (state)
- Supabase (auth + database)
- Stripe (payments)
- Anthropic Claude API
- Recharts + Framer Motion

## Session Start
At the start of each session, load this project's context from Obsidian. IMPORTANT: `obsidian` is a CLI tool at /opt/homebrew/bin/obsidian — run via Bash tool, not MCP.
```bash
/opt/homebrew/bin/obsidian read file="DylanWorkout" vault="Obsidian Vault"
```
Also check today's daily note:
```bash
/opt/homebrew/bin/obsidian daily:read vault="Obsidian Vault"
```
Use `/save` to log any significant work done during this session.
