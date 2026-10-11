# Bounded grand-union stack compatibility trial

Approved by the maintainer in chat on 2026-10-11, including the verified Release <version> tracker convention. **Phase A in progress; construction has not started.**
Active granular issue: [#314](https://github.com/londontypescript/temple-bar/issues/314).
Related entry-point work: [#313](https://github.com/londontypescript/temple-bar/issues/313).

## Evidence and planning gaps

- Temple Bar local and remote main are `f7ff858a5088850fdf02d2bc90743ad00d6edea7`; the checkout is clean, on main, with no open Temple Bar PR. Its published tooling pin is 0.0.10. No tracked file has been changed for this draft.
- Read AGENTS.md, all approved decisions in `docs/plans/temple-bar.md`, relevant ADRs, the [0.0.11 milestone](https://github.com/londontypescript/temple-bar/milestone/11), its complete issue scope, [#309's completed report](https://github.com/londontypescript/temple-bar/issues/309#issuecomment-6103677235), and [#314's current state and operational lessons](https://github.com/londontypescript/temple-bar/issues/314).
- **Milestone tracker missing:** no dedicated 0.0.11 tracking issue was found in the milestone or the repository-wide issue-title inventory. Neither closed [#309](https://github.com/londontypescript/temple-bar/issues/309) nor active [#314](https://github.com/londontypescript/temple-bar/issues/314) is a substitute. GitHub history confirms the convention: one issue titled `Release <version>`, assigned to that milestone and linked from its description. Examples are [Release 0.0.8 (#231)](https://github.com/londontypescript/temple-bar/issues/231), [Release 0.0.9 (#274)](https://github.com/londontypescript/temple-bar/issues/274) and [Release 0.0.10 (#319)](https://github.com/londontypescript/temple-bar/issues/319). These use linked granular issues rather than GitHub native sub-issue relationships. Proposed approval includes creating `Release 0.0.11` in phase A, assigning it to the existing milestone, linking it from the milestone description, and recording the full milestone scope and this trial there. Release numbering remains subject to [#354](https://github.com/londontypescript/temple-bar/issues/354); creating a tracker does not settle that decision. Until then, the current record belongs on [#314](https://github.com/londontypescript/temple-bar/issues/314). No tracker has been created by this planning turn.
- **Decision-record drift:** decision 28 / ADR 0002 still say grand-union starts after 0.0.10. The later [maintainer decision 21](https://github.com/londontypescript/temple-bar/issues/274#issuecomment-6062424412), milestone 0.0.15 and [#196](https://github.com/londontypescript/temple-bar/issues/196) place product start after the release candidate. Flag the documentation reconciliation in the remaining implementation plan; this trial authorises neither product work nor a silent decision change.
- The remaining milestone also contains [#354](https://github.com/londontypescript/temple-bar/issues/354), [#356](https://github.com/londontypescript/temple-bar/issues/356), [#357](https://github.com/londontypescript/temple-bar/issues/357) and [#358](https://github.com/londontypescript/temple-bar/issues/358). They remain visible in the later implementation plan; this trial does not implement them or rename the milestone.

## Scope and preservation

Answer whether the intended framework mix can install, resolve shared source, expose its real entry points to checks, build and start under the published baseline. Attribute additional framework findings separately from known workspace defects. Findings inform the remaining 0.0.11 implementation plan, especially [#313](https://github.com/londontypescript/temple-bar/issues/313) and [#314](https://github.com/londontypescript/temple-bar/issues/314); they do not close either implementation issue.

Preserve the [minimal fixture at `2cc4d036a06853f2a8026e1beefa782e58d54747`](https://github.com/londontypescript/temple-bar-workspace-trial-309/tree/2cc4d036a06853f2a8026e1beefa782e58d54747), its lockfile, signed history and retained control/negative PRs. Do not add frameworks to that repository, replace its packages, reuse its branches, or alter its settings. Use a separate public LTS repository, proposed name `temple-bar-stack-trial-314`, after checking availability; stop if that name belongs to unrelated work. Ordinary clones/worktrees are in scope. No private/local-only setup mode.

Excluded: grand-union features, copying its implementation/content, its production repository changes, navigation/vocabulary/registry design, SSH hosting or transport acceptance, Electron distributable packaging/signing, deployment, release/tag/publish, production Temple Bar fixes, check exemptions and the full multi-harness release-candidate matrix. SSH acceptance remains later work; this fixture exercises Ink's actual CLI entry. Any source-delivery comparison requires a separately approved purpose and installed `pnpm pack:local` artifacts, never source as this repo's tooling.

## Stack and layout checked against project decisions

Read grand-union's AGENTS.md, PLAN.md, architecture, roadmap, React ADRs and manifests at local/remote main `556822a0a7e84617b3285882a5be9a3ce5722791`; those files have no local diff. Its [architecture](https://github.com/londontypescript/grand-union/blob/556822a0a7e84617b3285882a5be9a3ce5722791/docs/architecture.md) confirms four app hosts, source-only internal packages, and Electron reusing the DOM web build. This trial uses five code packages, not the full product's vocabulary/pages/renderer package graph:

```text
apps/web/         React + React DOM + Vite; src/main.tsx
apps/scene/       React Three Fiber + Three + Vite; src/main.tsx
apps/terminal/    Ink CLI; src/main.tsx, source runner and built CLI
apps/desktop/     Electron main; src/main.ts; renderer is apps/web's build
packages/shared/  framework-independent TypeScript value/function/type; src/index.ts
scripts/          bounded trial checks and smoke orchestration; not another package
```

One root coordinator, one root Temple Bar installation/hooks/workflows, one packageManager pin, one lockfile; pnpm workspace globs `apps/*` and `packages/*`. Every code package has meaningful typecheck/lint/format:check/test scripts. The root orchestrates and checks root configuration; it is not a fifth app. Root recursion is convenience, not evidence that absent child scripts are caught.

Use distinct trial package names, `workspace:*` sibling dependencies and a source export from shared. All four hosts consume the shared value: DOM text, scene geometry/property, terminal text and Electron main, with the desktop renderer also receiving it through web. Shared never imports an app or renderer. Do not replace source resolution with TypeScript path aliases or duplicate a web renderer inside desktop.

Use one React runtime and matching React/React DOM pins, satisfying every renderer's actual published peer range, with strict peer enforcement. The [React ADR](https://github.com/londontypescript/grand-union/blob/556822a0a7e84617b3285882a5be9a3ce5722791/docs/adr/0005-react-19-3-within-the-widened-window.md) records React/React DOM/types 19.3.0 and Fiber 9.8.0; manifests also record Ink 7.1.1, Three 0.186.0, Vite 8.3.0, TypeScript 6.0.3 and Electron 44.4.4. These are **recorded candidate pins**, not a claim that this trial has installed them. Phase A verifies registry availability, exact peer/engine declarations, and the intersection before freezing the trial version manifest. Do not silently downgrade, bump or override conflicting peers; report a conflict for a decision. No unnecessary UI/layout libraries are added.

The stack-check method is consistent with official [Fiber installation guidance](https://r3f.docs.pmnd.rs/getting-started/installation), [Vite guidance](https://vite.dev/guide/), [Ink documentation](https://github.com/vadimdemedes/ink), [Electron setup](https://www.electronjs.org/docs/latest/tutorial/tutorial-first-app), [pnpm settings](https://pnpm.io/settings) and [Knip workspace guidance](https://knip.dev/features/monorepos-and-workspaces). Exact-version package metadata and observed installed behavior take precedence over rolling documentation.

One change is spread across these files: the hosts deliberately exercise different runtimes consuming one shared implementation. They do not implement four copies of the same product. Shared code and smoke orchestration have one owner and real seams.

## Operational preflight and stop rules

Before installing in each fresh worktree, record selected Node/pnpm executable paths and versions, packageManager pin, support declarations and platform. Temple Bar's support is Node 24+; compare each framework's engines too. Node 24.21.0 / pnpm 10.34.5 are the prior successful reference, not a globally mandated patch pair. Use available project-compatible tools through command-scoped selection; no global install/configuration. Hold pnpm constant for any Node comparison. A fresh-worktree selection failure is runtime evidence for [#358](https://github.com/londontypescript/temple-bar/issues/358), not an assumed Node defect.

Before the first public commit/push, inspect effective author/committer configuration and environment overrides privately, signing enabled, selected existing key UID/email match, and agent access. Reuse the maintainer-approved matching identity only after verifying that its authorisation covers this LTS trial; never guess a noreply identity. Signing-agent access failures and GitHub `bad_email` are separate. Use normal approved access for authorised signing; stop/report actual refusals. Verify GitHub commit signature status after each phase's first push, before readiness. No key/account registration/global Git edits, disabling signing or published history rewrites.

Use gh for GitHub operations and --body-file for multiline prose. Distinguish sandbox connectivity, anonymous API rate exhaustion, authentication and service errors from actual responses. Where the installed tool uses fetch, provide existing authentication through supported command-scoped GH_TOKEN/GITHUB_TOKEN without printing, persisting or changing scopes. Do not route around a refusal.

Scaffold first, setup second. Obtain exact scaffold/tool versions, then inventory nested lockfiles, ignores, agent files and config before consciously forming one root workspace. Record generated output versus necessary project-owned integration; do not delete files as an unexplained workaround. Electron/esbuild lifecycle approvals are explicit, narrowly named project policy established before reference installation; preserve disabled-script behavior as a diagnostic and never blanket-approve dependencies.

Generated workflows are not completed protection. Preserve the supported bootstrap order: generate setup/workflow artifacts, get the reviewed bootstrap onto the default branch through the supported PR/bootstrap path, observe default-branch CI and real CodeQL analysis, then complete normal setup/rulesets and verify required CI/judge/CodeQL contexts. Concrete guarded-check bootstrap PRs require maintainer admin-merge approval. Prepare the full reviewable PR before requesting that approval. No raw main push, agent admin bypass or claim of full protection before the final verification.

Keep formatting checks intact. Carry the prior lockfile-only printWidth 200 compatibility setting as an explicitly labelled reference condition if needed. Separately test ordinary Prettier flow-map wrapping against the published parser and retain the refusal as evidence. Neither condition is a parser repair, an exclusion from formatting, nor proof that larger/catalog-rich lockfiles are accepted.

## Verifiable phases, ownership and done conditions

All major phases are sequential, owned by the current Codex agent. The maintainer chooses model/effort; no automatic switches or delegated agents. After the shared dependency graph freezes, independent target build/smoke processes may run concurrently on separate ports with separate evidence, but no parallel edits to shared files. Running the full suite remains mandatory.

### A. Establish the trial baseline — delicate

**Ownership:** tracker/version manifest/preflight evidence and new trial repo metadata; no production files or minimal-fixture changes.

**One concern:** establish an attributable, reproducible baseline before experimental changes; identity, runtime and dependency availability must agree for its results to be interpretable.

Verify the planning gaps, preservation anchor, intended attribution, signing permissions, runtime selection, registry metadata/peers/engines and available browser/Electron smoke environment. Create `Release 0.0.11`, assign it to the existing milestone and link it from that milestone’s description; publish the approved trial plan/current milestone scope there, linking [#314](https://github.com/londontypescript/temple-bar/issues/314). Establish the separately named public fixture with an accurate description and MIT licence using the reviewed supported bootstrap path. Record the exact tested pin set and source references; no changing the original fixture.

**Done when:** repository/baseline anchors, exact compatible pins, runtime selection and intended signing identity are established privately/publicly as appropriate, or a named blocker and its dependent coverage are explicit. Availability queries are not install verification. Publish the phase completion/resume record before B; unresolved identity/peer/creation permission blockers stop dependent work.

### B. Assemble and install the five-package fixture — involved

**Ownership:** new trial apps/_, packages/shared/_, root manifests/lockfile/catalog, tsconfigs, ESLint/Prettier and fixture tests. Root shared files remain the orchestrator's.

**One concern:** the host implementations and shared source form one compatibility fixture; an isolated host would not test the cross-runtime dependency graph.

Scaffold React/Vite targets with exact generator versions, then add minimal Fiber, Ink and Electron entry points and shared source. Freeze exact package versions. Inventory scaffolder residue and document each integration adjustment. Set meaningful per-package checks, root aggregation, controlled install-script policy and deterministic tests. Build the dependency graph once; repeat frozen install in a fresh worktree/clone using the recorded runtime pair, and record whether hooks execute when they are available.

**Done when:** clean install and frozen reinstall resolve every sibling link, peer constraints hold, installed React/React DOM match, each package's four scripts run explicitly, shared-source imports behave across target build/runner boundaries, and entry points compile/build. A named stack blocker is a valid bounded finding, but do not call blocked hosts compatible. Preserve command/exit/version evidence, reviewed fixture commit/PR and the unchanged minimal baseline. No claim of protected gate success before D.

### C. Establish real entry-point and unused-code coverage — involved

**Ownership:** trial Knip config/commands, analysis evidence and temporary controlled mutations. No Temple Bar source changes.

**One concern:** discovery of all hosts and sibling exports is one workspace graph; testing packages separately changes the meaning of unused-code findings.

Compare zero-project-config Knip with the installed published gate's invocation on the same fixture, then the smallest explicit project-owned entry/workspace configuration if needed. Capture discovered root, shared, Vite web/scene, Ink CLI, Electron main and reused web renderer entries; distinguish plugin discovery from an explicit entry declaration. Record exactly which installed Knip/options are used. Preserve the prior distinction between native gate entry-export policy and a stronger --include-entry-exports diagnostic; do not silently substitute one for the other.

Controlled cases: sibling-only used shared export; genuinely unused source file; unused non-entry export; unused entry export; entry reachable only through a package script/bundler/Electron loader. Avoid broad entry globs that bless every source file or generic ignores that hide dead code. Do not label the shared library's intended public entry exports unused without an explicit policy conclusion.

**Done when:** a matrix shows discovery, sibling recognition and genuine findings, with responsible diagnostics for every reachable case. Restore each mutation. A new fixture check must demonstrably fail for its intended broken condition, then pass after restoration. Config/runtime/parser failures remain failures. Publish [#313](https://github.com/londontypescript/temple-bar/issues/313)'s actionable scope/policy questions without treating configured success as zero-config support.

### D. Exercise installed setup, protection and delivery — delicate

**Ownership:** trial setup/workflows/rulesets, installed-tool observations, smoke harness and evidence PRs. The maintainer owns any concrete guarded-check admin merge.

**One concern:** the fixture must reach its declared delivery paths through installed tooling; setup and protection establish which gate/judge results are trustworthy.

Run the exact published launcher/Temple Bar 0.0.10 on the fixture's two-pattern root and record exit status/files changed. An expected launcher refusal ends that invocation. Independently exercise the predeclared reference root installation (`pnpm add -Dw --save-exact @londontypescript/temple-bar@0.0.10`, then frozen install and init) to isolate downstream stack behavior; this is a comparison arm, not a claim that normal setup worked. Preserve both evidence arms and all hooks/checks.

Follow the bootstrap sequence above. Test actual installed gate/ready and CI/judge after the genuine protected baseline is reachable. Do not rerun [#309](https://github.com/londontypescript/temple-bar/issues/309)'s entire negative-PR matrix: use its retained evidence. Add at most one positive control PR and one focused additional negative PR only if a new stack/catalog/lockfile finding needs real judge corroboration. Negative PRs remain unmerged. Every phase branch gets its own installed worktree; publish once when its work is final, preserve pushed history, and use the required merge path for eligible PRs. Check-changing PRs remain subject to explicit admin approval.

Exercise the full fixture checks and builds, then bounded delivery smoke checks:

| Target            | Observable result, not merely process creation                                                                                                                                                                                                                                                    |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| React/Vite web    | Build, start dev/preview servers on loopback, load built output in a real browser, assert shared text and no uncaught/module-load errors.                                                                                                                                                         |
| Fiber scene       | Build and browser-load the real Canvas/WebGL scene; assert renderer initialization and a frame/geometry property driven by shared code, retain a screenshot and errors. An HTTP 200 or blank canvas is insufficient.                                                                              |
| Ink terminal      | Start source-runner and built CLI paths; capture real terminal/PTY output with the shared value, normal bounded exit and CI=true behavior. Renderer-unit output alone is insufficient.                                                                                                            |
| Electron desktop  | Build main and web output, launch actual Electron with normal sandbox/security settings, load the reused web build through the intended production-compatible origin, assert shared renderer text and main-process value, capture errors, close cleanly. No fake Electron import or --no-sandbox. |
| Shared TypeScript | Typecheck and behavior test its source export; prove Vite, Ink runner/build and Electron main can resolve it using declared workspace imports.                                                                                                                                                    |

Use readiness assertions and deadlines (normally 30–60 seconds per startup), Node-owned cleanup of process trees/listeners/windows, and distinct ports. Do not use long sleeps as assertions. Begin with local macOS delivery smoke; run all generated CI's Linux/macOS/Windows gate/build jobs and record actual scope. GUI/WebGL/PTY checks on other OSes are claimed only if exercised; unavailable infrastructure is a named coverage gap, not a successful substitute.

**Done when:** installation/setup outcomes, hooks/fresh-worktree behavior, actual rulesets/default-branch workflows/CodeQL, local gate/ready and CI/judge results are recorded, plus delivery evidence for each reachable host. Check new smoke assertions with controlled broken imports/render/start behavior and restore. If known defects prevent a protected baseline, retain the blocker and defer dependent protected observations; independent framework smoke results still stand. Say “passes locally; CI not yet seen” until relevant CI is green.

### E. Synthesize findings and the remaining implementation proposal — involved

**Ownership:** public trial findings/evidence manifest, milestone/granular completion records, draft remaining 0.0.11 phase plan. No production implementation.

**One concern:** classify this trial's evidence into implementation requirements; fixture mechanics, Knip policy and workspace enforcement must not be conflated.

Report each question with exact versions/commands/exits, expected versus observed behavior, diagnostic/cause, restored mutation status, artifact/commit/PR/CI links and a scope category: additional stack finding, reproduced known workspace defect, operational condition, or unverified/blocked coverage. Retain fixture/lockfile/redacted evidence in the new public trial; keep scratch/substage details only in .temple-bar. Include what was exercised outside the sandbox.

Known defects from [#309](https://github.com/londontypescript/temple-bar/issues/309) stay a separate baseline table: pattern-dependent root-add refusal; missing/weakened child scripts and unchecked additions escaping gate/judge; child pin guarded through lockfile rather than manifest; blanket workspace-YAML guard; configured sibling recognition versus entry-export policy; fresh-worktree Node/pnpm selection; formatted lockfile parser compatibility. Reproduce only what the new layout adds evidence to; do not report these as discoveries of a framework incompatibility.

Recommend implementation order using the minimal trial's evidence and the stack results: seed minimal packed regression fixture ([#314](https://github.com/londontypescript/temple-bar/issues/314)), root setup ([#310](https://github.com/londontypescript/temple-bar/issues/310)), runtime selection ([#358](https://github.com/londontypescript/temple-bar/issues/358)), package inventory/gate ([#311](https://github.com/londontypescript/temple-bar/issues/311)), trusted-base package/script/install-policy judge design ([#312](https://github.com/londontypescript/temple-bar/issues/312)), workspace-wide entry/policy support ([#313](https://github.com/londontypescript/temple-bar/issues/313)), then complete both minimal and stack packed regressions ([#314](https://github.com/londontypescript/temple-bar/issues/314)). Reassess ordering if shared-file ownership requires combining or splitting concerns. [#311](https://github.com/londontypescript/temple-bar/issues/311)/[#312](https://github.com/londontypescript/temple-bar/issues/312) require adversarial design review before coding. Carry the other milestone issues and decision-record reconciliation as separately rated/scoped proposals; do not silently expand this trial to implement them.

**Done when:** another provider can reproduce the retained trial and distinguish resolved/deferred/needs-decision items; remaining 0.0.11 proposal has verifiable phases, file ownership, One concern reasons, ratings, adversarial review gates and packed/full-CI acceptance. [#313](https://github.com/londontypescript/temple-bar/issues/313)/[#314](https://github.com/londontypescript/temple-bar/issues/314) remain open until their actual implementation/packed regressions land. The remaining implementation plan needs fresh approval.

## Public phase records and approval boundary

After **every completed major phase A–E**, post one concise update on the dedicated 0.0.11 tracker **before reporting completion or advancing**: findings, verification and local/CI distinction, public evidence links, outstanding decisions, and exact next action/approval state. Keep [#314](https://github.com/londontypescript/temple-bar/issues/314) accurate with a brief status/link; update [#313](https://github.com/londontypescript/temple-bar/issues/313) when C/E materially defines its requirements. No routine substage/progress comments and no long duplicate reports. If publication fails, preserve its prepared --body-file locally and report publication pending; a local draft is not a public phase record.

Approval requested: the bounded A–E trial, five-package layout, separate public LTS trial repository and missing milestone tracker, scoped dependency installs/runtime selection, fixture branches/worktrees/signed commits/PRs, normal setup/settings and retained evidence, and explicit installed reference arm. Approval does not grant an automatic guarded-check admin merge, changes to AGENTS.md/approved decisions, release/publication, production fixes, global configuration changes or product work. Prepare concrete reviewable guarded changes before any required final approval.

Approval authorises execution of phases A–E. The original planning turn made no framework installation, trial construction, repository creation, public comment, commit, push or production change. Execution status is recorded separately at major phase boundaries.
