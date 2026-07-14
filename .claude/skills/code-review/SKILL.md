---
name: code-review
description: "Review the current diff for correctness bugs, content-rule violations, and spec drift, then emit an evidence-oriented findings list"
allowed-tools: Read, Grep, Glob, Bash(git status:*), Bash(git diff:*), Bash(git log:*), Bash(git show:*), Bash(git rev-parse:*), Bash(spec-spine:*), Bash(npm ci:*), Bash(npm run build:*)
argument-hint: "[scope] - e.g. \"branch\", \"working tree\", \"src/\""
---

# /code-review: correctness + content rules + spec drift

Reviews the current diff against three questions: does the change have
correctness or edge-case bugs, does it respect the site's content rules,
and does it still match its owning spec's contract. Output is an
evidence-oriented findings list, each line citing `file:line`. Read-only:
no files are modified unless the user asks for a fix afterward.

## Step 0: scope the diff

```sh
git status --short && git diff --stat && git log --oneline -10
git diff origin/main...HEAD --stat   # committed delta
git diff HEAD --stat                 # uncommitted delta
```

Note which classes changed: site code (`src/`, `public/`,
`react-router.config.ts`, `vite.config.ts`, `package.json`), specs (`specs/**/spec.md`),
schemas/standards (`standards/**`), docs (`*.md`), workflows
(`.github/**`), kit (`.claude/**`).

## Step 1: corpus stays green

The change must not leave the spine red. Run the gate chain and capture
the exact outputs as evidence:

```sh
spec-spine compile
spec-spine lint --fail-on-warn       # corpus well-formedness (exit 1 on a warn)
spec-spine index check               # staleness (exit 2 if stale)
spec-spine couple --base origin/main --head HEAD   # drift gate (exit 1 on drift)
```

Once spec 001 lands (a `package.json` exists), the site build is part of
the gate:

```sh
npm ci && npm run build
```

- A `couple` failure is the headline finding: cite the file the gate
  named and the owning spec whose declared edges fail to cover it.
- A `lint` or `index check` failure is a corpus finding: cite the
  diagnostic verbatim.
- A build failure is a correctness finding: cite the first error.

## Step 2: spec-contract match

For each changed source file, confirm the change is consistent with the
contract of its owning spec rather than only with the gate's mechanical
pass. Useful reads (governed, via the CLI, not ad-hoc JSON parsing):

```sh
spec-spine registry show <spec-id>           # the owning spec's declared surface
spec-spine registry relationships <spec-id>  # its typed edges
```

Flag drift where code does something the spec's narrative or owned
authority units do not describe, even if `couple` happens to pass
(e.g. the edge is over-broad). Cite the spec section and the `file:line`.

## Step 3: correctness + content pass

Read the changed source and look for each of the following, with a
`file:line` and a one-sentence evidence claim:

- Logic and edge-case bugs (broken conditionals, malformed frontmatter,
  content collection entries that fail the schema).
- Content rules (spec 001 §2, spec 002 §1): unverifiable claims (anything
  not checkable against a public repo), em dashes (U+2014) in any authored
  file, internal links or anchors that do not resolve, and static-only
  violations (SSR config, forms, third-party scripts, analytics, runtime
  external requests).
- Error-path correctness: does a build-time script fail loudly on bad
  input rather than emitting a wrong page?
- Hygiene: stray debug prints, commented-out code, dead branches,
  unpinned workflow actions.

## Step 4: findings report

```
## Review: <scope>
Base: origin/main | Head: <branch> | Files: <n> | +<a>/-<d>
Gate: compile <ok|FAIL> | lint <ok|FAIL> | index check <ok|stale> | couple <ok|drift> | build <ok|FAIL|n/a pre-001>

### Findings (severity-ordered)
- [CORRECTNESS|CONTENT|SPEC-DRIFT|GATE|HYGIENE] <claim> at `file:line`
  Evidence: <one sentence, cited>
  Fix: <specific recommendation>

### Clean
- <dimensions checked with nothing found>
```

If nothing is found, say so plainly and report the gate result as the
evidence. To proceed with fixes, the user names the findings to apply.
