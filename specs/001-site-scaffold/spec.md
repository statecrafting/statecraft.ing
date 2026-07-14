---
id: "001-site-scaffold"
title: "stagecraft.ing: Astro static site, Pages deploy, custom domain"
status: approved
created: "2026-07-14"
implementation: pending
depends_on:
  - "000-bootstrap"
establishes:
  - "package.json"
  - "astro.config.mjs"
  - { kind: directory, path: "src/" }
  - { kind: directory, path: "public/" }
  - ".github/workflows/deploy.yml"
summary: >
  The marketing and docs site for the Stagecraft product family, built
  as a fully static Astro site deployed to GitHub Pages under the
  custom domain stagecraft.ing. This spec owns the scaffold: framework,
  layout system, deploy pipeline, and domain wiring. Content lives in
  spec 002 so the two can be implemented by separate sessions.
---

# 001: Site scaffold

## 1. Purpose

The product family (stagecraft, enrahitu, stagecraft-cli) needs one
public front door that explains the loop (intent -> governed spec ->
stamped app -> operated fleet) and routes visitors to the right repo.
Static output, zero backend, boring hosting: the site must never be
operational work.

## 2. Behavior

- **Stack**: Astro (latest stable major at implementation time),
  TypeScript, content collections for any listable content, no UI
  framework islands in v1 (plain .astro components), CSS with custom
  properties + prefers-color-scheme dark support. No analytics, no
  cookies, no external requests at runtime (self-host any fonts or use
  system stack).
- **Structure**: a base layout (header with the wordmark + repo links,
  footer with license notes), an index page (content from spec 002),
  and a /docs route that renders markdown content collections (empty
  shell with one placeholder page in this spec).
- **Deploy** (`.github/workflows/deploy.yml`, SHA-pinned actions with
  version comments): on push to main, build with the official Astro
  Pages pattern (actions/configure-pages, upload-pages-artifact,
  deploy-pages; permissions pages:write + id-token:write; environment
  github-pages). `public/CNAME` contains `stagecraft.ing`.
- **Operator prerequisites** (stop and report if missing): Pages
  enabled on the repo (Source: GitHub Actions) and the DNS records for
  stagecraft.ing pointing at GitHub Pages (apex A/AAAA records or an
  ALIAS, per GitHub's published IP set). The workflow and CNAME land
  regardless; the live-domain check is the part that waits on DNS.
- Package name `stagecraft-ing-site`, private, `"spec-spine":
  {"spec": "001-site-scaffold"}` manifest key.

## 3. Acceptance

- `npm ci && npm run build` emits dist/ locally; `npm run dev` serves
  the shell with the layout, index placeholder, and docs placeholder.
- The deploy workflow goes green on main and the Pages URL serves the
  site; the custom domain serves it once DNS is in place (report DNS
  state honestly).
- Lighthouse (or equivalent) sanity: static, no console errors, dark
  mode renders.
- Spine gates green (`spec-spine lint --fail-on-warn`, `index check`).

## 4. Out of scope

- All real copy and information architecture (spec 002).
- Blog, search, versioned docs, OG image generation.
- Any server-side rendering or forms.
