# CLAUDE.md: stagecraft.ing

## Project Overview

The marketing and docs site for the Stagecraft product family: a fully
static React Router v7 site (framework mode, prerendered, harvesting the OAP-era stagecraft web app and its spec-registry viewer) deployed to GitHub Pages under stagecraft.ing. The
scaffold is governed by `specs/001-site-scaffold/spec.md`, the launch
copy by `specs/002-launch-content/spec.md`. No backend, no analytics,
no runtime external requests: the site must never become operational
work.

## Repository Structure

```
specs/       Feature specs, the authoritative design record
standards/   spec-spine constitution, contract, templates
.derived/    Compiler output (committed shards; never hand-edit)
.claude/     rules (orchestrator, governed reads, adversarial refusal)
```

Planned by spec 001: `app/`, `public/`, `scripts/`, `react-router.config.ts`, `vite.config.ts`,
`.github/workflows/deploy.yml`.

## Governance

Governed by spec-spine (`spec-spine.toml`, owned by spec 000): specs
are the source of truth; read `.derived/**` only through `spec-spine`
subcommands; after editing any `specs/*/spec.md`, run
`spec-spine compile && spec-spine index` and commit the shards with
the edit. Gates: `spec-spine lint --fail-on-warn` and
`spec-spine index check` must be green before every commit.

## Build Commands

```bash
spec-spine compile && spec-spine index && spec-spine lint
# after spec 001 lands:
npm ci && npm run dev     # local dev
npm run build             # static build into dist/
```

## Key Conventions

- Every published claim must be checkable against a public repo; the
  status section tracks the real milestone ladder, never aspiration.
- Static only: no SSR, no forms, no third-party scripts.
- Voice: engineer-to-engineer, no startup theater (spec 002 §1).
