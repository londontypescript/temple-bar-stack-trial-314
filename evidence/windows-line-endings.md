# Windows checkout line-ending control

The original [setup PR 3](https://github.com/londontypescript/temple-bar-stack-trial-314/pull/3)
remains unmerged evidence at `216ed8c59b27829d1e81d8d3054dd22d466a5ef4`.
Its generated gate/title and Linux/macOS full gate/build jobs pass. The
[Windows job](https://github.com/londontypescript/temple-bar-stack-trial-314/actions/runs/38128791308/job/114438614858)
fails only formatting: 68 files have checkout line endings inconsistent with
Prettier. Typecheck, lint, all six tests, core setup, exact workflow copies,
Markdown/links/Knip and the initial branch ruleset pass. Build is skipped after
the failed gate; Windows build compatibility is not yet established.

No EOL attributes existed. AGENTS.md is 159 lines and its Windows byte count
is 7,855 versus 7,696 locally: exactly one added carriage return per line.
The [Git documentation](https://git-scm.com/docs/gitattributes/) explains
that absent EOL attributes, checkout conversion follows Git configuration.
[Prettier's documentation](https://github.com/prettier/prettier/blob/main/docs/options.md)
recommends an LF Git policy for its default LF formatting requirement.

## Reproduction and cause correction

`git -c core.autocrlf=true checkout-index --all --prefix=<scratch-checkout>/`
from the installed trial worktree creates an independent checkout. With no
repository EOL policy, AGENTS.md contains CRLF and the unchanged exact
Prettier command `prettier --check AGENTS.md scripts/smoke.ts` exits 1.

Repeat the same command into a new scratch checkout with this repository file:

```gitattributes
* text=auto eol=lf
*.png binary
```

AGENTS.md now has LF and the identical formatter command exits 0. PNG bytes
are unchanged in both controls. No global Git setting was edited, no source
file reformatted, no formatter option changed and no check skipped.
See [controlled outcomes](d-eol-probe.json) and
[original CI snapshot](d-initial-ci.json).

This is a fixture checkout-policy omission, separate from framework
compatibility and the known Temple Bar workspace defects. The corrected
bootstrap preserves all previously reviewed generated agent rules, workflows,
script policy, tooling pins and lockfile bytes. A fresh replacement branch
preserves the first published branch, while adding only the Git policy and
this evidence. The replacement's full cross-platform CI must confirm the
correction before any green Windows gate/build claim.
