# Temple Bar stack compatibility trial

Disposable five-package fixture for [Temple Bar issue 314](https://github.com/londontypescript/temple-bar/issues/314), tracked in [Release 0.0.11](https://github.com/londontypescript/temple-bar/issues/366). No grand-union product features or production Temple Bar fixes.

Requires Node 24+ and exact pnpm 10.34.5; verify effective binaries before installation. The preserved minimal trial is a separate repository and remains unchanged.

## Commands

`pnpm install --frozen-lockfile`, `pnpm check`, `pnpm build`. Each of the five code packages declares and runs typecheck, lint, format:check and test. Root recursion does not establish protection against missing child scripts.

Shared TypeScript source exports are consumed through workspace imports. Web/scene use Vite, terminal runs through tsx or its built CLI, and Electron loads the same built web output via a secure standard app scheme. Only electron and esbuild dependency lifecycle scripts are approved.

The generated create-vite 9.2.1 output was inventoried before integration. Both hosts initially included oxlint configuration, demo assets and local ignores/README. They had no nested lockfile. Demo content/assets were replaced with this bounded fixture; TypeScript config and lint were deliberately centralized under strict TypeScript/ESLint checks. Nested generated ignores/docs/config were consolidated into the root. The root lockfile-only Prettier printWidth 200 reference preserves formatting checks while testing the known published parser limitation separately.

See docs/plan.md for approved phases and evidence/ for public metadata. Protected setup and delivery compatibility are not yet verified.
