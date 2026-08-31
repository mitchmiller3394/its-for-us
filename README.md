# ItsForUs

A React + Vite app shell for a future GitHub Pages site with Supabase-backed data and auth.

## Local development

Use the default Vite command for normal local work:

```bash
npm run dev
```

The `-- --host 0.0.0.0` flag is optional. It is useful when you want the app to be reachable from another device, VM, or a local network, but it is not required for everyday development on your Mac. In other words:

- `npm run dev` = standard local development
- `npm run dev -- --host 0.0.0.0` = expose the app to the network

Then open the local Vite URL in the terminal output, usually:

- http://localhost:5173/

## Production build

```bash
npm run build
```

## GitHub Pages

This app is configured to emit the production build into a root-level `docs` directory, which is suitable for GitHub Pages deployment from the main branch.

```bash
npm run build
```

## Notes

- The app is scaffolded with Vite and React.
- The current shell is intentionally lightweight and easy to evolve.
- It is a good starting point for a static GitHub Pages deployment and later Supabase integration.
