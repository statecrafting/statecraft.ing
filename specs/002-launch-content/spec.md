---
id: "002-launch-content"
title: "Launch content: positioning, product family, honest status"
status: approved
created: "2026-07-14"
implementation: pending
depends_on:
  - "001-site-scaffold"
establishes:
  - { kind: directory, path: "src/content/" }
summary: >
  The words on the site at launch. One index page that states what
  Stagecraft is in the builder's own register (creator-led,
  OSS-credible, no startup theater), a product-family section mapping
  the four repos and their licenses, and an honest status section tied
  to the public milestone ladder. The positioning facts are inlined
  here so the implementing session needs no external archive.
---

# 002: Launch content

## 1. Voice constraints

Written for engineers who evaluate tools by reading source. No
unverifiable claims, no customer logos that do not exist, no "join
thousands". Present tense for what works today, future tense clearly
marked for the ladder. First person singular is acceptable where it
reads naturally (a single creator builds this in the open).

## 2. Content inventory (index page)

- **Hero**: Stagecraft is a governed delivery control plane: intent
  becomes a governed spec, a factory stamps a complete application
  from an open template, a fleet operates the result, and the
  customer's code lives in the customer's GitHub org the whole time.
  One sentence under it: the substrate is EnRaHiTu: Encore.ts +
  rauthy + hiqlite + Turso in a single container with zero managed
  dependencies.
- **The loop** (four short blocks): Specify (spec-spine: markdown
  truth, compiled registries, drift gates in CI), Stamp (template
  contract, born-with certificate binding an explicit agentic
  posture), Operate (one container + one volume per app; update and
  backup as governed verbs), Verify (tamper-evident attestation
  ledger; independent verifier exists).
- **Product family table**: stagecraft (control plane, AGPL-3.0),
  enrahitu (template chassis, Apache-2.0), stagecraft-cli (CLI + MCP
  server, Apache-2.0), spec-spine (governance toolchain, its own
  repo). Each row: one-line role + repo link + license, and the note
  that stamped apps belong to their owners.
- **For agents**: a short section stating the MCP face: coding agents
  operate under the same governance as humans (same verbs, same
  guards, explicit posture, no side doors).
- **Live registry**: a pointer section to the `/registry` viewer
  (spec 001): the product family's spec corpora rendered from
  build-time-baked shards, each page stating the source commit it was
  baked from. This is the "evaluate us by reading source" claim made
  navigable.
- **Status** (kept truthful at every deploy): the milestone ladder
  M1-M5 with current position, linking each milestone to the public
  spec that governs it. At authoring time: M1 done (template contract
  v0, born-green stamp proven), M2-M5 in progress/planned; the
  implementing session must check the repos' registries for the
  then-current truth rather than copying this sentence.
- **Footer**: GitHub org, license notes, no tracking statement.

## 3. Docs seed

Move the placeholder docs page into three real stubs sourced from the
repos' own READMEs (do not fork prose; link and summarize): "What is
EnRaHiTu", "The template contract", "Self-hosting the control plane
(AGPL)".

## 4. Acceptance

- Every claim on the page is checkable against a public repo at build
  time; the status section names real spec ids.
- Builds clean; internal links resolve; docs stubs render.
- A skim test: a stranger can answer "what is this, what can I run
  today, what license am I touching" from the index alone.

## 5. Out of scope

- Pricing, waitlists, email capture.
- Long-form architecture essays (belong in the repos' specs/docs).
