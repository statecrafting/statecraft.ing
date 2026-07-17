---
name: setup
description: One-time contributor setup. Install the spec-spine CLI, verify the Node toolchain, and verify the governed loop (compile, index check, lint, couple) so /init can report lifecycle and structural counts.
allowed-tools: Bash, Read
---

# Setup

Get a fresh clone operational. After this completes, `/init` can report
lifecycle and structural counts through the `spec-spine` binary, never by
ad-hoc parsing of `.derived/**/*.json` (see
`.claude/rules/governed-artifact-reads.md`).

## Process

### 1. Install spec-spine

Install the CLI by whichever method fits your environment (CI pins v0.10.0
in `.github/workflows/spec-spine.yml`; match it):

```bash
cargo install spec-spine-cli            # from crates.io (needs a Rust toolchain)
# or, no Rust toolchain: the prebuilt installer CI uses
curl -fsSL https://raw.githubusercontent.com/statecrafting/spec-spine/main/install.sh | \
  SPEC_SPINE_VERSION=v0.10.0 SPEC_SPINE_BIN_DIR="$HOME/.local/bin" sh
```

Verify with `spec-spine --version`. Halt on a non-zero exit and surface the
failing step verbatim.

### 2. Verify the Node toolchain

```bash
node --version && npm --version
```

The site gates (`npm ci && npm run build`) need Node once spec 001 lands.
While the repo is pre-code (no `package.json` yet), report presence honestly;
do not fail setup over it, but flag its absence.

### 3. Compile a fresh registry

```bash
spec-spine compile
```

`.derived/` shards are committed in this repo: `compile` is deterministic and
a no-op on a clean tree. Run it before any read so the registry reflects the
working tree, and commit the regenerated shards whenever `specs/*/spec.md`
changes.

### 4. Verify the governed loop

Smoke-test the gates `/init` and CI depend on. Passing here means the loop works
on this clone:

```bash
spec-spine index check       # codebase index staleness gate
spec-spine lint --fail-on-warn   # corpus conformance
spec-spine couple --base origin/main --head HEAD   # PR-time coupling gate
```

If `index check` exits non-zero the committed index is stale against current
inputs. Run `spec-spine index`, re-commit the regenerated shards, then
re-check. Do not parse `.derived/**/*.json` directly to "verify" success.

### 5. Emit summary

Report exactly:

```
## setup: statecraft.ing

**Install:** {ok / failed at <step>}
**Node:** {node <version> + npm <version> / absent (needed once spec 001 lands)}
**Governed loop:**
  - compile: {fresh registry / failed}
  - index check: {fresh / stale}
  - lint: {clean / N diagnostics}
  - couple: {clean / drift surfaced}
**Lifecycle:** {N specs across <statuses>}  (from registry status-report)

Next: run `/init` to load full session context.
```

Do not invent counts. Only report values that came back from a `spec-spine`
subcommand.

## Rules

- The loop runs through the installed `spec-spine` binary on your `PATH`.
- Halt on first failure. Do not silently continue past a missing prerequisite
  or a failing gate.
- Never parse `.derived/**/*.json` directly in any verification step. Use the
  `spec-spine` subcommands.
- Idempotent: safe to re-run.
