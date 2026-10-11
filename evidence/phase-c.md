# Phase C: workspace reachability and Knip policy

Knip 6.39.0 on the installed fixture; published Temple Bar 0.0.10 invoked through exact-version pnpm dlx. All probe mutations are restored. No production fixes or broad entry/ignore globs.

## Results

Canonical web/scene Vite entries, Ink CLI, Electron main and shared package source export are found automatically. Electron renderer coverage comes through the reused web entry, not a duplicate desktop renderer. Sibling consumers preserve shared usage when the shared package's direct unit-test import is temporarily removed.

Zero-project-config full Knip reports the Playwright dependency reserved for the later smoke harness. With the gate's narrower files,exports,types options, the nonstandard vitest.root.config.ts is reported unused. Declaring it merely as a generic entry makes stronger entry-export analysis complain about its real default configuration export. The retained precise Vitest plugin config names both actual Vitest config files; native and stronger diagnostic commands then pass without ignores. Root scripts expose both commands separately; the published gate's policy is unchanged.

Genuine unused source files and non-entry exports fail native analysis with their own findings. Unused entry exports pass native gate policy and fail --include-entry-exports. The exact published gate passes its unused-code row on the configured positive fixture and rejects a genuine unused-file mutation; all four project scripts pass in both cases. Its overall exit remains 1 for expected absent setup/hooks/workflows/rulesets, not a framework incompatibility or successful protected baseline.

## Additional entry discovery finding

Canonical src/main entries do not demonstrate arbitrary loader/script discovery. A temporarily renamed Ink src/launch.tsx is discovered through the real tsx/build script; removing those references makes it an unused file. A temporarily renamed Electron src/host.ts is missed even with its esbuild build script. A precise explicit desktop entry fixes that control. Original canonical entries and scripts are restored. This adds an Electron/esbuild entry-discovery requirement for Temple Bar issue 313; it does not justify blessing all source files as entries.

See c-probe-results.json, c-script-entry-results.json and c-command-matrix.json for exit/report evidence. Native versus stronger entry-export policy remains a design decision. Actual delivery/setup/protection follows in phase D; CI has not yet been seen. The completed minimal fixture remains separate and unchanged.
