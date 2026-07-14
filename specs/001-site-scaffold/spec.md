---
id: "001-site-scaffold"
title: "stagecraft.ing: React Router v7 static site, Pages deploy, apex cutover"
status: approved
created: "2026-07-14"
implementation: pending
depends_on:
  - "000-bootstrap"
establishes:
  - "package.json"
  - "react-router.config.ts"
  - "vite.config.ts"
  - { kind: directory, path: "app/" }
  - { kind: directory, path: "public/" }
  - { kind: directory, path: "scripts/" }
  - ".github/workflows/deploy.yml"
summary: >
  The marketing and docs site, built as a fully static React Router v7
  app (framework mode, prerendered, no SSR at runtime) deployed to
  GitHub Pages under stagecraft.ing. Amended 2026-07-14: React Router
  v7 replaces the earlier Astro choice, harvesting the OAP-era
  stagecraft web app (ecosystem content, the spec-registry viewer)
  and keeping the whole product family on one frontend stack. The
  registry viewer runs over build-time-baked shards from the public
  repos, so the site stays static and every claim stays checkable.
  The apex DNS cutover is authorized: the legacy control plane no
  longer owns the domain.
---

# 001: Site scaffold

## 1. Purpose

One public front door for the product family, on the same frontend
stack as the platform (React Router v7; the Astro option was dropped
2026-07-14 to avoid a fourth framework and to reuse existing work).
Static output, zero backend, boring hosting: the site must never be
operational work.

## 2. Harvest source (requires operator-granted read access)

`~/DevWork/open-agentic-platform/platform/services/stagecraft/web` is
an RR7 framework-mode app (served by Encore in the legacy plane) with
ecosystem-related content and a spec-registry viewer. Harvest routes,
components, and copy that fit a public static site; leave behind the
Encore serving layer (api.gateway.ts, api.tools.ts, encore.service.ts),
anything auth-coupled, and anything that fetches a live API. The
implementing session needs that path readable
(`claude --add-dir ~/DevWork/open-agentic-platform`); if missing, stop
and report.

## 3. Behavior

- **Stack**: React 19 + React Router v7 framework mode with
  `ssr: false` and prerendering of all static routes; Vite;
  TypeScript strict. No runtime external requests, no analytics, no
  cookies; self-hosted or system fonts. Dark mode via
  prefers-color-scheme.
- **Registry viewer, static edition**: a build step
  (`scripts/bake-registry.mjs`) fetches the public repos'
  `.derived/spec-registry/by-spec/*.json` shards (enrahitu,
  stagecraft, stagecraft-cli, stagecraft.ing; raw.githubusercontent
  at build time only) into `public/data/`, and the viewer routes
  render from those baked JSON files. The bake step records each
  repo's commit SHA into the payload so the viewer can display "as
  of". Build fails loudly if a fetch fails; no silent partial bakes.
- **Structure**: base layout (wordmark, repo links, footer with
  license notes), index (content per spec 002), `/registry` (the
  viewer), `/docs` (markdown content collection with one placeholder
  page in this spec).
- **Deploy** (`.github/workflows/deploy.yml`, SHA-pinned actions
  with version comments): on push to main, build + upload-pages-artifact
  + deploy-pages (permissions pages:write, id-token:write, environment
  github-pages). Pages is ALREADY ENABLED on this repo with
  build_type=workflow (done 2026-07-14); no operator action needed for
  the default URL (https://stagecraft-ing.github.io/stagecraft.ing/).
- **Apex cutover (authorized 2026-07-14)**: the legacy control plane
  currently behind stagecraft.ing is abandoned; after the FIRST
  successful Pages deploy, complete the cutover in this order:
  1. `public/CNAME` containing `stagecraft.ing` ships with the build.
  2. Set the Pages custom domain:
     `gh api -X PUT repos/stagecraft-ing/stagecraft.ing/pages -f cname=stagecraft.ing`.
  3. Update Cloudflare DNS using the API token at
     `~/.config/oap/infra/hetzner/.env` (`CLOUDFLARE_DNS_API_TOKEN`;
     read it, never echo it): replace the apex A/AAAA records with a
     CNAME to `stagecraft-ing.github.io` (Cloudflare flattens at
     apex), DNS-only (not proxied) until the GitHub certificate
     issues, then optionally re-enable the proxy.
  4. Verify `https://stagecraft.ing` serves the site with a valid
     certificate; record the cutover date in this spec via amendment.
  If the Cloudflare token lacks DNS-edit rights for the zone, stop
  and report the exact API error.

## 4. Acceptance

- `npm ci && npm run build` emits a fully static dist (prerendered
  HTML + assets + baked registry data); `npm run dev` serves layout,
  index placeholder, `/registry` rendering real baked shards, and the
  docs placeholder.
- Deploy workflow green; the default Pages URL serves the site; after
  cutover, `https://stagecraft.ing` serves it with a valid cert.
- No console errors; dark mode renders; the built output makes zero
  runtime requests to any non-same-origin host.
- Spine gates green (`spec-spine lint --fail-on-warn`, `index check`).

## 5. Out of scope

- All real copy and information architecture (spec 002).
- Blog, search, versioned docs, OG image generation.
- Any server-side rendering at runtime, forms, or API calls.
- Migrating the legacy plane's other routes; the domain simply moves.
