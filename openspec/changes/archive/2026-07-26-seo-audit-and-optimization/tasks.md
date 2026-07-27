# Implementation Tasks: SEO Audit & Optimization

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~350–450 |
| 400-line budget risk | Low |
| Chained PRs recommended | No |
| Suggested split | Single PR |
| Delivery strategy | single-pr |
| Chain strategy | stacked-to-main |

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: stacked-to-main
400-line budget risk: Low

### Suggested Work Units

| Unit | Goal | Likely PR | Focused test command | Runtime harness | Rollback boundary |
|------|------|-----------|----------------------|-----------------|-------------------|
| 1 | Assets, Schema Utility, Layout Integration & Content Optimization | PR 1 (single) | `pnpm check && pnpm test` | `pnpm build` | Revert modified files in `src/layouts/Layout.astro` and `src/content/pages/` |

---

## Phase 1: Assets & Foundation

- [x] 1.1 Provision static visual preview image asset `public/og-image.jpg` with standard 1200×630 dimensions
- [x] 1.2 Create `public/images/` directory for WebP visual E-E-A-T asset placeholders

## Phase 2: Schema Utility & Unit Testing

- [x] 2.1 Create `src/utils/schemaBuilder.ts` pure function helper generating `HVACBusiness`, `BreadcrumbList`, and `Service` JSON-LD schemas with dynamic location and provider bindings
- [x] 2.2 Enforce strict policy compliance in `src/utils/schemaBuilder.ts` ensuring `@type: "FAQPage"` is explicitly prohibited and omitted from all JSON-LD payloads
- [x] 2.3 Create `src/utils/schemaBuilder.test.ts` unit tests validating `Service` schema structure, `@type: "HVACBusiness"` provider entity reference binding, `areaServed` geographic location binding, and strict absence of `FAQPage`
- [x] 2.4 Run `pnpm test` to verify initial schema utility test suite passes cleanly

## Phase 3: Layout Integration

- [x] 3.1 Update `src/layouts/Layout.astro` `<head>` section to render absolute HTTPS URLs for `og:image` and `twitter:image` with fallback to `https://airesacondicionadoscancun.vercel.app/og-image.jpg`
- [x] 3.2 Add Open Graph and Twitter image dimension and alt tags (`og:image:width="1200"`, `og:image:height="630"`, `og:image:alt`, `twitter:image:alt`, `twitter:card="summary_large_image"`) in `src/layouts/Layout.astro`
- [x] 3.3 Integrate `schemaBuilder.ts` in `src/layouts/Layout.astro` to dynamically inject structured data scripts into DOM

## Phase 4: Content Scannability & Sentence Optimization

- [x] 4.1 Audit sentence lengths across all Markdown content pages in `src/content/pages/*.md`, refactoring compound sentences to target 15–20 words and enforcing a strict 35-word limit
- [x] 4.2 Reformat dense procedural explanations in `src/content/pages/*.md` into bulleted (`-`) or numbered (`1.`) Markdown lists
- [x] 4.3 Verify verbatim retention of local SEO keywords, technical terms (`R410A`, `R32`), brand warranties, and heading hierarchy across `src/content/pages/*.md`

## Phase 5: Verification & Quality Check

- [x] 5.1 Run `pnpm check` to ensure zero Astro TypeScript or template compilation errors
- [x] 5.2 Run `pnpm test` to verify all unit tests (SILO linking & `schemaBuilder.test.ts`) pass 100%
- [x] 5.3 Run `pnpm build` to confirm clean static site production build for all 50 pages and `sitemap-index.xml`
