# Proposal: SEO Audit & Optimization

> **Change Name**: `seo-audit-and-optimization`  
> **Target Repository**: `/home/hstrejoluna/Projects/airesacondicionadoscancun`  
> **Status**: Proposed  
> **Date**: July 25, 2026  

---

## 1. Intent

The goal of this change is to execute targeted SEO enhancements identified during the full codebase audit for **Aires Acondicionados Cancún**. While the application currently achieves an overall SEO score of 90.9/100, addressing key gaps in social preview metadata, structured data granularization, visual assets, and content readability will raise visual E-E-A-T, improve social share rendering, strengthen Google Knowledge Graph signals, and optimize readability for mobile users across all 50 Hub & Spoke pages.

---

## 2. Scope

### In Scope
- **Social Preview Meta Tags**: Add missing `<meta property="og:image">` and `<meta name="twitter:image">` tags (with explicit width/height/alt meta properties) in `src/layouts/Layout.astro`.
- **WebP Image Asset Placeholder Setup**: Include `og-image.jpg` and setup WebP image asset placeholders in `public/` for social previews and visual E-E-A-T support.
- **Service JSON-LD Optimization**: Extend structured data in `src/layouts/Layout.astro` to dynamically include granular `Service` schema JSON-LD for service and location pages.
- **Readability & Copywriting Formatting**: Polish text formatting and paragraph length across content pages in `src/content/pages/` to eliminate overly complex long sentences (35+ words) and improve Flesch-Kincaid mobile readability.

### Out of Scope
- **Infrastructure Changes**: Modifications to Vercel edge deployment configuration (`vercel.json`), Astro build target/adapter (`astro.config.mjs`), or server-side routing logic.
- **Core SILO Algorithm Changes**: Structural changes to internal link calculation in `src/utils/siloLinking.ts`.
- **Commercial FAQ Schema**: Adding `FAQPage` JSON-LD schema (strictly avoided due to Google's August 2023 guideline restrictions on commercial sites).

---

## 3. Capabilities

### New Capabilities
- **Social Media Preview Richness**: Sharing any page on platforms like WhatsApp, Facebook, X (Twitter), or LinkedIn renders a high-quality visual preview card with `og:image` and `twitter:image`.
- **Granular Service Entity Schema**: Search engines receive specific `Service` JSON-LD metadata for HVAC maintenance, repair, installation, and gas recharge offerings bound to target locations.

### Modified Capabilities
- **Enhanced Page Layout Metadata**: `src/layouts/Layout.astro` dynamically outputs Open Graph / Twitter image tags and augmented structured data based on page properties.
- **Improved Content Scannability**: Markdown pages render concise, highly scannable paragraphs tailored for mobile users and AI search engines (GEO/AEO).

---

## 4. Approach

1. **Meta & Social Preview Integration (`src/layouts/Layout.astro` & `public/`)**:
   - Provide default `og-image.jpg` asset in `public/`.
   - Update `Layout.astro` `<head>` to conditionally render canonical absolute URLs for `og:image` and `twitter:image`, plus optional `og:image:width`, `og:image:height`, and `og:image:alt`.

2. **Structured Data Augmentation (`src/layouts/Layout.astro`)**:
   - Construct modular `Service` JSON-LD schema referencing provider (`HVACBusiness`), service type, and location context when `pageType` matches service hub or spoke pages.

3. **Asset Placeholder Setup (`public/`)**:
   - Place responsive WebP/JPG placeholder assets for visual E-E-A-T and social preview standard compliance.

4. **Readability Refinement (`src/content/pages/`)**:
   - Audit paragraph lengths across content collections, breaking down long compound sentences into concise 15–20 word structures without altering localized technical terms or keywords.

---

## 5. Affected Areas

| Component / Path | Nature of Impact | Description |
| :--- | :--- | :--- |
| `src/layouts/Layout.astro` | **Modified** | Direct updates to `<head>` meta tags (`og:image`, `twitter:image`) and `Service` JSON-LD structured data script block. |
| `public/og-image.jpg` | **New File** | Default social preview image asset (1200×630). |
| `public/images/` | **New Directory / Files** | Placeholders for WebP visual assets. |
| `src/content/pages/*.md` | **Modified** | Content formatting improvements for sentence length and scannability. |

---

## 6. Risks & Mitigations

| Risk | Impact | Mitigation |
| :--- | :--- | :--- |
| **Invalid JSON-LD Syntax** | Rich snippet parsing failure | Validate structured data against Schema.org and Google Rich Results test specifications prior to deployment. |
| **Broken Image URLs in Social Previews** | Missing preview image on share | Construct `og:image` content using `Astro.site` to ensure absolute HTTPS URLs (`https://airesacondicionadoscancun.vercel.app/og-image.jpg`). |
| **Accidental Content / Keyword Regression** | Loss of target local SEO keywords | Retain all local terms, technical specs (R410A/R32), and SILO structure while editing sentence length. |

---

## 7. Rollback Plan

In the event of unexpected issues or build failures:
1. Revert changes in `src/layouts/Layout.astro` using `git checkout src/layouts/Layout.astro`.
2. Remove added image assets in `public/og-image.jpg` and `public/images/`.
3. Revert modified Markdown files under `src/content/pages/` via `git checkout src/content/pages/`.
4. Run `npm run build` and `npm run test` to confirm codebase returns to green baseline state.

---

## 8. Success Criteria

- [ ] All 50 pages render `<meta property="og:image">` and `<meta name="twitter:image">` pointing to valid absolute URLs.
- [ ] `public/og-image.jpg` exists with standard 1200×630 dimensions.
- [ ] `Service` JSON-LD schema is present and valid on Hub and Spoke pages without syntax errors.
- [ ] No sentence in optimized content sections exceeds 35 words; mobile scannability is enhanced.
- [ ] Zero TypeScript or lint errors (`npm run build` succeeds cleanly).
- [ ] Unit tests (`npm run test`) continue to report 100% passing tests for zero orphan pages.
