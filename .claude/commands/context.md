Load context for DylanWorkout only.

IMPORTANT: `obsidian` is a CLI tool installed at /opt/homebrew/bin/obsidian. Run these as shell commands using the Bash tool — this is NOT an MCP server.

1. Read this project's Obsidian note (run via Bash tool):
```bash
/opt/homebrew/bin/obsidian read file="DylanWorkout" vault="Obsidian Vault"
```

2. Read today's daily note for any relevant entries (run via Bash tool):
```bash
/opt/homebrew/bin/obsidian daily:read vault="Obsidian Vault"
```

3. Check for any backlinks to this project (run via Bash tool):
```bash
/opt/homebrew/bin/obsidian backlinks file="DylanWorkout" vault="Obsidian Vault"
```

Present a summary of:
- **Recent work**: What was last done on this project
- **Today's entries**: Anything logged today related to DylanWorkout
- **Connected notes**: Any linked references

Then ask: "What would you like to work on?"
