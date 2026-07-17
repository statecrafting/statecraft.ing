// The flagship whitepaper content (spec 004 section 3.4), re-authored from the
// OAP-era paper to describe the real Statecraft family. Every claim is
// checkable against a public repo or marked forward-looking; there are no
// fabricated corpus counts, certificate hashes, or signatures. Authored
// TypeScript, consistent with spec 002's "typed content, no MDX" decision.

export interface Subsection {
  id: string;
  title: string;
  content: string[];
}

export interface Section {
  id: string;
  number: string;
  title: string;
  subsections: Subsection[];
}

export interface Reference {
  id: number;
  label: string;
  title: string;
  url: string;
  accessed: string;
}

export const paperMeta = {
  slug: "statecraft-ecosystem",
  title: "The Statecraft Ecosystem",
  subtitle: "How a governed agentic delivery control plane is built in the open",
  author: "Bartek Kus",
  date: "July 16, 2026",
  abstract:
    "Statecraft is a governed control plane for agentic software delivery. It is built around one loop: intent becomes a governed spec, a contract stamps a complete application from an open template, a fleet operates the result, and a tamper-evident record makes the whole run checkable by someone who trusts none of it. This paper walks the mechanisms that make that loop honest, from the spec spine that governs every repo in the family (including this website) to the identity, decision, and attestation primitives that keep humans and agents on the same rails. Where a piece is designed but not yet shipped, it is marked as such: the status ladder on the home page rolls up from the specs, not from this paper.",
};

export const sections: Section[] = [
  {
    id: "spec-spine",
    number: "01",
    title: "The spec spine: the unit of governance",
    subsections: [
      {
        id: "graph-of-authority",
        title: "A graph of authority",
        content: [
          "The foundation of Statecraft is the spec spine. Unlike documentation that drifts from the code it describes, the spine is the authoritative design record. Every feature, refactor, or infrastructure change is anchored to a markdown document that explicitly declares its territory. [ref:2]",
          "That territory is not a vague description; it is an explicit set of code paths combined with typed relationships to the other documents that have touched those paths before. Together, these documents form a directed graph, and the graph is the source of truth about who is allowed to change what.",
          "A document declares its relationships with typed edges: **establishes** (first brought this code into being), **extends** (adds surface without disturbing a predecessor), **refines** (tightens behavior on a specific aspect), **supersedes** (replaces a predecessor), **amends** (patches one in place), **co_authority** (shares a path section by section), and **constrains** (asserts an invariant everyone else must respect). Authority over any path is derived by walking the graph, not declared directly. [ref:1]",
        ],
      },
      {
        id: "safe-parallel-work",
        title: "Safe parallel work",
        content: [
          "This design makes parallel work by many agents tractable. Disjoint territory is provably disjoint: two agents editing documents whose paths do not overlap cannot collide, and the graph tells them their boundaries before either edits a line.",
          "When two documents must touch the same path, they declare co-authority section by section against named anchors. A potential collision becomes a structured merge rather than a free-for-all. History stays queryable too: an amendment patches its predecessor in place rather than overwriting it.",
        ],
      },
      {
        id: "mechanical-enforcement",
        title: "Mechanical enforcement",
        content: [
          "Three guardrails sit on top of the graph. A **deterministic compiler** reads the markdown corpus and emits a frozen JSON registry; the same inputs produce byte-identical output on every platform. A **coupling gate** runs at pull-request time and cross-references every changed path against the graph, refusing the merge if code moved without its owning spec (or without an explicit, cited waiver). A **refusal rule** at prompt time stops an agent from resolving a coupling failure by quietly editing the contract to match the code it just wrote. [ref:2]",
          "This is not a whitepaper aspiration. spec-spine is a published tool, and this website is one of its governed corpora: the page you are reading was compiled, indexed, linted, and coupled by the same binary before it shipped. [ref:1]",
        ],
      },
    ],
  },
  {
    id: "governed-loop",
    number: "02",
    title: "The governed delivery loop",
    subsections: [
      {
        id: "specify-stamp",
        title: "Specify, then stamp",
        content: [
          "Statecraft turns intent into software through a governed loop. First **specify**: spec-spine compiles what a human wants into a typed, hash-verifiable spec. This runs today across the family. [ref:2]",
          "Then **stamp**: a versioned template contract stamps a complete application from the enrahitu chassis, which is Encore.ts, rauthy, hiqlite, and Turso in a single container with zero managed dependencies. The stamped app is born with a certificate that binds an explicit agentic posture, and it lives in the customer's own GitHub org, under the customer's license, from the first commit. [ref:3]",
          "The substrate ships today; the contract that stamps a complete app is still being finalized. The home page status ladder shows exactly where each rung stands, rolled up from the specs rather than asserted here.",
        ],
      },
      {
        id: "operate-verify",
        title: "Operate, then verify",
        content: [
          "**Operate** treats an app as one container and one volume. Update and backup are governed verbs that carry an audit trail, rather than a runbook you hope someone followed.",
          "**Verify** closes the loop. Every governed action is recorded in a tamper-evident ledger, and an independent verifier can re-check the record without trusting the plane that produced it. The next two sections cover the record and the identity fabric that bounds who may write to it.",
        ],
      },
    ],
  },
  {
    id: "governance-record",
    number: "03",
    title: "The tamper-evident record",
    subsections: [
      {
        id: "append-only-ledger",
        title: "An append-only, hash-linked ledger",
        content: [
          "Compliance in an agentic system needs verifiable proof, not promises. Statecraft records what the plane did in attest-ledger: an append-only, hash-linked, Ed25519-signed record where each entry commits to the one before it, so a silent edit anywhere in the history breaks the chain. [ref:4]",
          "Hashes only agree across parties if everyone serializes the same bytes. canonical-keysort-json does exactly that: a lexicographic key sort at the serialization boundary, so a record hashed on one machine hashes identically on another. [ref:9] The certificate and record shapes shown in the reader are illustrative schemas, not a real signed artifact; the real ones are produced by tenant-emit from a finished run.",
        ],
      },
      {
        id: "independent-verification",
        title: "Independent verification",
        content: [
          "The load-bearing property is that the verifier does not trust the producer. tenant-tail re-checks the run-side artifacts the factory asserted about its build, offline, identity-free, and read-only all the way down to the package boundary. [ref:5]",
          "If any artifact has been tampered with, the verifier rejects the record with a specific diagnostic pointing at the exact mismatch. The emit side (tenant-emit) and the verify side (tenant-tail) are deliberately separate binaries with no shared trust, so the paperwork can be re-checked by someone who ran none of it.",
        ],
      },
    ],
  },
  {
    id: "identity",
    number: "04",
    title: "Identity-bounded collaboration",
    subsections: [
      {
        id: "federated-identity",
        title: "Federated identity",
        content: [
          "Collaboration between people and agents needs one trust fabric. Statecraft uses Rauthy as the sole OpenID Connect session signer, with GitHub as an upstream identity provider. A developer's GitHub login federates through Rauthy, giving one centralized source of identity truth. This runs today: the OIDC signer is live at auth.statecraft.ing. [ref:6]",
          "Rauthy issues scoped tokens that define precisely what a person or agent may do. There is no anonymous session: every actor is identified before it can act, and an agent driving the plane passes through the exact controls a person does. [ref:7]",
        ],
      },
      {
        id: "decide-and-score",
        title: "Decide, then score",
        content: [
          "Each action is decided by action-gate: a pure, deterministic evaluate(context, checks) that returns Allow, Deny, or Degrade. Given the same context and checks it returns the same decision every time, with no hidden state to audit around. [ref:8]",
          "Privilege is not granted once and forgotten. trust-window scores a rolling window of weighted samples into a graduated privilege level, so trust is earned and decays. Identity, decision, and trust compose: who you are (Rauthy), what you may attempt (action-gate), and how far you are trusted right now (trust-window), with every outcome recorded in the ledger.",
        ],
      },
    ],
  },
];

export const references: Reference[] = [
  { id: 1, label: "STATECRAFT", title: "Statecraft: the governed delivery control plane", url: "https://github.com/statecrafting/statecraft", accessed: "July 2026" },
  { id: 2, label: "SPEC-SPINE", title: "spec-spine: the spec-governance toolchain", url: "https://github.com/statecrafting/spec-spine", accessed: "July 2026" },
  { id: 3, label: "ENRAHITU", title: "enrahitu: the EnRaHiTu template chassis", url: "https://github.com/statecrafting/enrahitu", accessed: "July 2026" },
  { id: 4, label: "ATTEST-LEDGER", title: "attest-ledger: append-only, hash-linked, Ed25519-signed record", url: "https://github.com/statecrafting/attest-ledger", accessed: "July 2026" },
  { id: 5, label: "TENANT-TAIL", title: "tenant-tail: the independent certificate verifier", url: "https://github.com/statecrafting/tenant-tail", accessed: "July 2026" },
  { id: 6, label: "RAUTHY", title: "Rauthy: an OpenID Connect provider", url: "https://github.com/sebadob/rauthy", accessed: "July 2026" },
  { id: 7, label: "MCP", title: "Model Context Protocol specification", url: "https://modelcontextprotocol.io/specification", accessed: "July 2026" },
  { id: 8, label: "ACTION-GATE", title: "action-gate: a deterministic decision gate", url: "https://github.com/statecrafting/action-gate", accessed: "July 2026" },
  { id: 9, label: "CANONICAL-JSON", title: "canonical-keysort-json: canonical JSON at the hash boundary", url: "https://github.com/statecrafting/canonical-keysort-json", accessed: "July 2026" },
];

// Positioning table: how the governed-agentic model differs from established
// delivery paradigms. Each cell in the Statecraft column names a mechanism that
// exists in the family (or is a stated design commitment), not a benchmark.
export const comparisonTable = {
  title: "Governed agentic delivery vs established approaches",
  description:
    "A positioning comparison, not a benchmark. The Statecraft column names mechanisms that exist in the family or are explicit design commitments.",
  dimensions: [
    "Change authority",
    "Audit trail",
    "Agent's role",
    "Verification",
    "Parallel-work safety",
  ] as const,
  approaches: [
    {
      name: "Traditional CI/CD",
      values: [
        "Branch protection and code owners",
        "Git log and pipeline history",
        "None, or an ad-hoc assistant",
        "Manual checklist or periodic audit",
        "Merge conflicts resolved by hand",
      ],
    },
    {
      name: "GitOps",
      values: [
        "Declarative desired-state in a repo",
        "Git history and reconciler logs",
        "None; humans author manifests",
        "Policy-as-code (OPA, Kyverno)",
        "Separate repos per team or env",
      ],
    },
    {
      name: "AI-assisted",
      values: [
        "Unchanged from CI/CD",
        "Standard git log",
        "Code suggestion and completion",
        "No additional mechanism",
        "No structural guarantee",
      ],
    },
    {
      name: "Statecraft",
      values: [
        "Spec-spine graph plus coupling gate and refusal rule",
        "Append-only, hash-linked, signed ledger",
        "A first-class actor on the same rails as people",
        "Independent verifier that trusts no producer",
        "Provably disjoint territory",
      ],
      highlight: true,
    },
  ],
};
