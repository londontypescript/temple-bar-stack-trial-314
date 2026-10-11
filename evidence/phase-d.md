# Phase D local verification and bootstrap review

Phase D is in progress: local delivery passes. Initial CI passes on Linux and
macOS; Windows fails formatting due to CRLF checkout conversion. The corrected
bootstrap awaits fresh CI. Completed default-branch protection is not yet
observed. No trial PR has merged. The minimal
[fixture](https://github.com/londontypescript/temple-bar-workspace-trial-309/tree/2cc4d036a06853f2a8026e1beefa782e58d54747)
is preserved; no production Temple Bar or grand-union implementation changed.

## Installed setup

Published launcher and Temple Bar 0.0.10, Node 24.21.0, pnpm 10.34.5.
The two-pattern normal launcher exits 1 with `ERR_PNPM_ADDING_TO_ROOT`, before
modifying the fixture. Independently declared root add `pnpm add -Dw --save-exact
@londontypescript/temple-bar@0.0.10`, frozen install and
`pnpm exec temple-bar init --create-ruleset` exit 0. Generated workflows and
agent rules are retained exactly; the project's own matrix is a separate file.
Setup installs shared hooks and the initial PR/squash/signed/linear-history
ruleset. Judge, gate/title and CodeQL requirements await their genuine
workflows and default-branch analysis; a generated file alone is not protection.

The full installed `pnpm gate` exits 0: all four real checks, core setup,
workflow copies, length, Markdown, links, unused graph and initial branch
ruleset pass. Its three bootstrap-dependent rows explicitly skip. This is
local bootstrap success, not a fully protected baseline or green CI claim.

## Actual delivery

Run `pnpm build`, install pinned Chromium with
`pnpm exec playwright install chromium`, then `pnpm smoke` on macOS.
The harness starts only loopback listeners, asserts readiness and rendering,
sets startup/exit deadlines, closes browser/Electron windows and stops owned
processes. POSIX process groups cover spawned CLI children. Windows GUI/tree
cleanup is not claimed; the cross-OS CI matrix checks the full gate and builds.

| Path                        | Observed locally                                                                                                                                                         |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Web dev and built preview   | Shared heading visible; no captured page/module/console errors                                                                                                           |
| Fiber dev and built preview | Shared heading, live WebGL context, frames advance, actual mesh geometry width 1.5; screenshot retained                                                                  |
| Ink source and built        | Shared text, exit 0, both CI=true and CI unset; pipe and actual PTY runs                                                                                                 |
| Electron actual 44.4.4      | Reused built web renders at app://fixture/; main title proves shared bundle import; OS renderer metric sandboxed=true; renderer has no Node globals; screenshot retained |
| Shared source               | Workspace resolution across all four hosts, strict compilation and behavior tests                                                                                        |

Electron has explicit context isolation, disabled Node integration and enabled
sandbox in its source. Playwright launches with `chromiumSandbox: true` and no
`--no-sandbox`. The OS metric verifies sandboxing; context isolation is the
reviewed configuration, not an independently instrumented runtime assertion.
Vite's relative asset base and the privileged app origin let desktop reuse
exactly the web build. The preserved window title makes main-process evidence
observable even when the web HTML sets its own title.

See [command matrix](d-command-matrix.json), [smoke results](d-smoke-results.json),
[PTY outcomes](d-pty-results.json), [scene screenshot](scene-built.png) and [desktop screenshot](desktop.png).
Local source PTY execution initially hit tsx IPC `EPERM` under the harness
sandbox; the identical commands passed through normal approved access. Real
GUI launches, download/network access and signed commits use approved access.
Electron 44 downloads its binary lazily at first use; registry/package
installation alone did not establish binary availability. No global settings,
keys, credentials or installed package contents were modified as a repair.

## Meaningful failure controls

All seven controls exit 1 with the responsible smoke assertion/startup diagnostic,
then restore the original source or build file: missing web text; wrong actual
mesh width; missing Ink output; wrong Electron main value; missing Electron
renderer module; unresolved Vite startup import; Ink exit timeout. The complete restored smoke
suite exits 0, and all four terminal variants pass again after the timeout
control. See [probe outcomes](d-smoke-probes.json). Build artifacts
mutated only for diagnostic controls were restored byte for byte.

## Known defects versus stack findings

The two-pattern setup refusal, effective runtime selection drift and wrapping
parser refusal reproduce the completed minimal trial's known conditions. The
installed parser accepts this larger catalog-rich lockfile at reference width
200, but rejects ordinary Prettier width 80 even comparing it with itself:
[parser result](d-lockfile-parser.json). This is an installed-module diagnostic,
not real PR-judge corroboration of the wrapping case. No additional negative
PR is needed to reconfirm the retained minimal trial finding.

Additional stack observations are compatible peer installation and delivery,
precise custom-Vitest Knip configuration, Electron's noncanonical esbuild entry
discovery gap from phase C, lifecycle/binary availability, and the relative
asset/secure-origin desktop integration. Missing/weakened child scripts,
unchecked package coverage and blanket workspace YAML guarding retain their
separate known-defect status; this phase does not rerun that negative-PR matrix.

## Remaining bootstrap work

The signed local setup/smoke baseline passes installed ready. A fresh
post-checkout hook installs frozen dependencies and its full gate/build pass;
all four owned loopback ports are released. See
[fresh/readiness evidence](d-fresh-readiness.json). These are local results. Initial cross-platform CI is retained in
[Windows checkout evidence](windows-line-endings.md); the corrected bootstrap
adds a repository-local LF policy, preserving the formatter and all generated
checking files.

Obtain the required approval before publishing generated
AGENTS.md and guarded checking changes. Preserve the existing phase B/C PRs
and their published history. Land the phase PRs in order; maintainer-owned
checking/bootstrap merges need concrete approval. Observe actual default-branch
CodeQL and Linux/macOS/Windows gate/build CI, rerun normal init to require the
checks, and verify a focused positive control through real protected judge/CI.
Do not disable a rule or bypass readiness to resolve the bootstrap.

Only after those observations or an explicit bounded blocker may phase D be
recorded complete on the milestone tracker and phase E synthesis advance.
