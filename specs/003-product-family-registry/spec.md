---
id: "003-product-family-registry"
title: "Product-family registry: a single owner for the shared repo list"
status: approved
created: "2026-07-15"
origin:
  retroactive: true   # app/lib/product-family.ts shipped under 001/002 (PR #2) before this spec adopted it
implementation: complete
depends_on:
  - "001-site-scaffold"
  - "002-launch-content"
establishes:
  - "app/lib/product-family.ts"
summary: >
  The canonical registry of the Stagecraft product family: each repo's
  name, role, SPDX license, and URL, encoded once in
  app/lib/product-family.ts and consumed by the index family section, the
  footer, and the /registry viewer's repoMeta lookup. This spec gives that
  module a single explicit owner so a roster change (a repo added, removed,
  or re-described) is an ordinary authoring edit here plus the module, with
  no coupling waiver and no edit to the scaffold (001) or launch-content
  (002) specs. It owns the roster data, not the rendering.
---

# 003: Product-family registry

## 1. Purpose

`app/lib/product-family.ts` is the one place the product family is
enumerated: the `RepoMeta` shape, the `REPO_META` table, the ordered
`PRODUCT_FAMILY` array, and the `repoMeta` lookup. It is consumed by the
index page's family section and footer (spec 002) and by the `/registry`
viewer's metadata lookup (spec 001). The roster changes on its own cadence
(it went from four repos to ten on 2026-07-15), independent of the site
scaffold and the launch copy.

Until this spec, the module had no explicit owner: it fell under spec
001's `app/` directory by default, while its content was authored in
spec 002 section 2. So every roster edit tripped the coupling gate and was
cleared with a `Spec-Drift-Waiver:` (PR #2 added six repos; PR #3 fixed
the derived count), because neither owning spec is the natural home for a
repo-list change. This spec removes that recurring friction.

## 2. Territory

- **Owns** `app/lib/product-family.ts`: the `RepoMeta` interface, the
  `REPO_META` table, the `PRODUCT_FAMILY` display array, and `repoMeta`.
  The roster in section 3 is the authoritative source the module encodes.
- **A roster change is an edit to this spec plus the module.** Adding,
  removing, or re-describing a family repo means editing section 3 here
  and `product-family.ts` in the same change; that satisfies `spec-spine
  couple` directly (this spec is now a declared owner), with no waiver and
  no edit to spec 001 or spec 002.
- **Does not own the rendering.** The index family section and footer
  stay with spec 002; the `/registry` viewer stays with spec 001. They
  consume this module. Spec 002 section 2's inline list describes the page
  copy; section 3 here is authoritative for the roster data, and the
  coupling gate steers a roster edit to this spec (an owner) rather than
  to spec 002 (not an owner of the module).
- **Does not change the bake set.** The family list and the baked
  `/registry` corpora are separate (spec 002 section 2): naming a repo
  here does not render it as a spec corpus. Unchanged.

## 3. The roster

Ten public repositories under the `stagecraft-ing` org, each checkable
against its own repo; the license is the SPDX id in that repo's LICENSE.
Each URL is `https://github.com/stagecraft-ing/<repo>`.

| repo | role | license |
| --- | --- | --- |
| stagecraft | the governed delivery control plane | AGPL-3.0 |
| enrahitu | the EnRaHiTu template chassis (Encore.ts + rauthy + hiqlite + Turso) | Apache-2.0 |
| stagecraft-cli | the CLI and MCP server | Apache-2.0 |
| spec-spine | the spec-governance toolchain everything above is governed by | Apache-2.0 |
| tenant-emit | the tenant certificate emitter | Apache-2.0 |
| tenant-tail | the tenant certificate verifier | Apache-2.0 |
| action-gate | the deterministic decision gate (Allow / Deny / Degrade) | Apache-2.0 |
| attest-ledger | the tamper-evident, hash-linked record ledger | Apache-2.0 |
| canonical-keysort-json | canonical JSON at the hash boundary | Apache-2.0 |
| trust-window | the rolling-window trust scorer | Apache-2.0 |

`REPO_META` also carries a `stagecraft.ing` entry (this site, unlicensed)
as a lookup convenience; it is not part of the public roster above.

## 4. Acceptance

- `app/lib/product-family.ts` encodes exactly these ten repos, in this
  order, with these licenses; each role is a faithful one-line summary of
  the repo's own description (the module may phrase it more fully).
- A subsequent roster edit (this section 3 plus the module) passes
  `spec-spine couple --base origin/main` with no `Spec-Drift-Waiver:`,
  because this spec is a declared owner of the module.
- Spine gates green: `compile`, `index`, `lint --fail-on-warn`,
  `index check`. The site build stays static and clean.

## 5. Out of scope

- The rendering of the family and the footer (spec 002) and the registry
  viewer (spec 001).
- The `/registry` bake set (spec 001 section 3): this spec adds nothing to
  the baked corpora.
- Any repository not yet public.

## 6. Status (2026-07-15): complete

Retroactive adoption. `app/lib/product-family.ts` already exists (it
shipped with the launch content and grew to ten repos in PR #2), so this
spec declares ownership rather than creating the file, hence
`origin.retroactive: true`. No code change ships with this spec; the
module already matches section 3. The next roster edit couples cleanly
against this spec instead of requiring a waiver.
