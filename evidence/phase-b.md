# Phase B: fixture assembly and install

Effective tools: explicitly selected Node 24.21.0 / pnpm 10.34.5. Default fresh-worktree PATH instead selects Node 25.8.2 / pnpm 8.1.1; no global configuration changed.

Exact create-vite 9.2.1 generated the React/TypeScript web and scene hosts. The retained inventory records local ignores/docs, Oxlint configuration and demonstration assets, with no nested lockfile. These were consciously consolidated/replaced with the agreed root ESLint/TypeScript toolchain and bounded fixture content.

Strict peer installation succeeded, with narrowly approved Electron/esbuild lifecycle policy. Frozen offline reinstall succeeded with the formatted lockfile. Root and all five packages run meaningful typecheck/lint/format:check/test scripts; six behavior tests pass. All four target builds succeed, consuming shared TypeScript source through workspace imports without path aliases. Fiber's unoptimized bundle-size warning remains visible.

Deliberate type, unused-variable lint, format and incorrect-shared-value failures produce their responsible diagnostics (b-negative-results.json); every mutation is restored. Strict checks use no any, suppressions or skipLibCheck.

This phase does not establish installed Temple Bar setup, hooks, protection or delivery smoke compatibility. A separate-checkout frozen install result follows on the tracker after the fixture commit. Passes locally; CI not yet seen. The original minimal fixture and production repositories remain unchanged.

A post-build check found that package-local Prettier does not discover the parent .gitignore and was checking ignored generated dist output. Package format commands now explicitly use the existing root .gitignore; no ignore entries or source coverage were removed. This is a fixture tooling-integration condition, not a published Temple Bar defect. Root checks already respected that ignore file.
