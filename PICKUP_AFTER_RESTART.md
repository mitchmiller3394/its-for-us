# Pickup After VS Code Restart

## Current Status

- React app scaffolded with Vite
- GitHub Pages build output configured to `docs/` via `vite.config.js`
- Supabase client (`@supabase/supabase-js`) installed
- Supabase env vars added in `.env.local`
- Sample `instruments` table created and app connection confirmed
- Supabase plugin install completed:
  - `npx plugins add supabase-community/supabase-plugin --yes`

## First Steps After Reopen

1. Restart VS Code fully.
2. Open this project folder again.
3. Confirm Copilot/Supabase plugin is active.
4. Complete Supabase MCP auth flow if prompted (browser login + org/project access).

## Quick Verification Prompts (ask Copilot)

- "Use Supabase MCP to list my projects."
- "Use Supabase MCP to list tables in project `jnxjtmtjofyfcybhzxuh`."
- "Use Supabase MCP to run: select * from public.instruments limit 10;"

## App Run Commands

```bash
npm run dev
```

Open: http://localhost:5173/

## Build for GitHub Pages

```bash
npm run build
```

Build output is emitted to `docs/` for Pages-from-main-branch workflow.

## Notes

- `npm run dev -- --host 0.0.0.0` is optional (only needed for LAN/remote access).
- Keep real secrets out of source control. `.env.local` should remain local-only.

## Suggested Next Task

- Replace the sample `instruments` query with your real schema and add RLS policies for production-safe access.
