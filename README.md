# statecraft.ing

The website and docs for [Statecraft](https://github.com/statecrafting/statecraft),
the governed agentic delivery control plane, and its product family:

- [statecraft](https://github.com/statecrafting/statecraft): the control
  plane (AGPL-3.0)
- [enrahitu](https://github.com/statecrafting/enrahitu): the EnRaHiTu
  template chassis: Encore.ts + rauthy + hiqlite + Turso (Apache-2.0)
- [statecraft-cli](https://github.com/statecrafting/statecraft-cli): the
  CLI + MCP server (Apache-2.0)
- [spec-spine](https://github.com/statecrafting/spec-spine): the
  spec-governance toolchain everything above is governed by
- [tenant-emit](https://github.com/statecrafting/tenant-emit): the tenant
  certificate emitter, signing a produced app's governance certificate (Apache-2.0)
- [tenant-tail](https://github.com/statecrafting/tenant-tail): the tenant
  certificate verifier, re-checking the factory's paperwork with no trust in
  the producer (Apache-2.0)
- [action-gate](https://github.com/statecrafting/action-gate): a pure,
  deterministic decision gate, evaluate(context, checks) returning Allow, Deny,
  or Degrade (Apache-2.0)
- [attest-ledger](https://github.com/statecrafting/attest-ledger): a
  tamper-evident record ledger, append-only, hash-linked, Ed25519-signed, with
  an independent verifier (Apache-2.0)
- [canonical-keysort-json](https://github.com/statecrafting/canonical-keysort-json):
  deterministic canonical JSON, a lexicographic key sort at the serialization
  boundary so record hashes agree (Apache-2.0)
- [trust-window](https://github.com/statecrafting/trust-window): a
  rolling-window trust scorer, weighted samples mapping to a graduated privilege
  level (Apache-2.0)

Site content and stack land here later; this placeholder marks the repo's
role (the dotted-name convention: this repo is the website).
