Help me plan my day for DylanWorkout.

1. Read this project's Obsidian note:
```bash
obsidian read file="DylanWorkout" vault="Obsidian Vault"
```

2. Read today's daily note:
```bash
obsidian daily:read vault="Obsidian Vault"
```

3. Get open tasks from the vault filtered to this project:
```bash
obsidian tasks vault="Obsidian Vault" todo
```
Only show tasks that mention DylanWorkout or are linked from the [[DylanWorkout]] note.

Based on what you find, suggest a daily plan scoped to this project:

**Today's Focus (DylanWorkout):**
- Top 3 priorities for this project
- Any deadlines or time-sensitive items
- Blockers or dependencies to resolve

If the daily note doesn't mention DylanWorkout yet, offer to append the plan:
```bash
obsidian daily:append content="- [[DylanWorkout]]: [plan summary]" vault="Obsidian Vault"
```

Wait for my confirmation before writing anything to the vault.
