import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

// Static site. Everything lives under the shared site layout (header + footer).
// `ssr: false` (react-router.config.ts) prerenders each of these to HTML; the
// dynamic registry detail route is enumerated for prerender from the baked
// payload.
export default [
  layout("layouts/site.tsx", [
    index("routes/_index.tsx"),
    route("registry", "routes/registry.tsx"),
    route("registry/:repo/:specId", "routes/registry.$repo.$specId.tsx"),
    route("docs", "routes/docs.tsx"),
    route("docs/:slug", "routes/docs.$slug.tsx"),
  ]),
] satisfies RouteConfig;
