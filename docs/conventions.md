# Conventions

This fixture follows the approved five-package trial in [plan.md](plan.md).

- Web and scene are separate React/Vite hosts; scene uses Fiber and Three.
- Terminal uses Ink through source and built CLI entries. Desktop bundles its
  Electron main and reuses the web build through a secure standard app scheme.
- Shared is framework-independent TypeScript source consumed with `workspace:*`.
- Versions live in root catalogs and the single lockfile; strict peers remain on.
- Every code package owns real typecheck, lint, format and test commands. Root
  commands coordinate them and check root configuration.
- Lockfile-only Prettier printWidth 200 is a known-parser comparison condition,
  with formatting still enforced. It is not a production parser fix.
