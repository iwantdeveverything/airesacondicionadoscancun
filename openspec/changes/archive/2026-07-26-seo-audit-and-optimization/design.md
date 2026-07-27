# Technical Design: SEO Audit & Optimization

> **Change Name**: `seo-audit-and-optimization`  
> **Target Repository**: `/home/hstrejoluna/Projects/airesacondicionadoscancun`  
> **Status**: Approved / Design Phase  
> **Date**: July 26, 2026  

---

## 1. Technical Approach

The overall objective of `seo-audit-and-optimization` is to elevate visual E-E-A-T, improve social preview cards, enhance Google Knowledge Graph entity signals through granular `Service` JSON-LD structured data, and optimize mobile readability across all 50 Hub & Spoke pages.

### 1.1 Dynamic Open Graph & Twitter Card Metadata (`src/layouts/Layout.astro`)

`Layout.astro` will be updated to receive optional `image` and `imageAlt` props while providing default fallbacks. All social card image URLs will be resolved as absolute HTTPS URLs using `Astro.site` (defaulting to `https://airesacondicionadoscancun.vercel.app`).

**URL Resolution Logic**:
```typescript
const siteOrigin = Astro.site?.origin || 'https://airesacondicionadoscancun.vercel.app';
const imageProp = Astro.props.image;
const ogImageUrl = imageProp
  ? (imageProp.startsWith('http://') || imageProp.startsWith('https://')
      ? imageProp
      : new URL(imageProp, siteOrigin).toString())
  : `${siteOrigin}/og-image.jpg`;

const ogImageAlt = Astro.props.imageAlt || Astro.props.h1 || Astro.props.title;
```

**Meta Tags rendered in `<head>`**:
- `<meta property="og:type" content="website" />`
- `<meta property="og:url" content={canonicalURL.toString()} />`
- `<meta property="og:title" content={title} />`
- `<meta property="og:description" content={description} />`
- `<meta property="og:locale" content="es_MX" />`
- `<meta property="og:site_name" content="Aires Acondicionados Cancún" />`
- `<meta property="og:image" content={ogImageUrl} />`
- `<meta property="og:image:width" content="1200" />`
- `<meta property="og:image:height" content="630" />`
- `<meta property="og:image:alt" content={ogImageAlt} />`
- `<meta name="twitter:card" content="summary_large_image" />`
- `<meta name="twitter:title" content={title} />`
- `<meta name="twitter:description" content={description} />`
- `<meta name="twitter:image" content={ogImageUrl} />`
- `<meta name="twitter:image:alt" content={ogImageAlt} />`

---

### 1.2 Granular Service JSON-LD Schema Builder (`src/utils/schemaBuilder.ts`)

To keep `Layout.astro` clean and maintainable, schema generation logic will be encapsulated in a dedicated utility module `src/utils/schemaBuilder.ts`.

**Schema Generation Flow**:
1. `buildLocalBusinessSchema()`: Generates the core `HVACBusiness` JSON-LD object.
2. `buildBreadcrumbSchema(currentPage, h1, canonicalUrl)`: Generates the `BreadcrumbList` JSON-LD object.
3. `buildServiceSchema(currentPage, canonicalUrl)`:
   - Evaluates `currentPage.data.type`. If `hub` or `spoke`, returns a valid `@type: "Service"` JSON-LD entity.
   - Binds `provider` to the `@type: "HVACBusiness"` root entity (`https://airesacondicionadoscancun.vercel.app/#organization`).
   - For `spoke` pages: sets `areaServed` as `{ "@type": "Place", "name": currentPage.data.locationName || "Cancún" }`.
   - For `hub` pages: sets `areaServed` as an array of target local service areas (`["Cancún", "Zona Hotelera Cancún", "Puerto Cancún", "Isla Mujeres", "Riviera Maya"]`).
   - Resolves human-readable service names (e.g., Mantenimiento Preventivo y Correctivo, Reparación de Urgencia, Instalación de Minisplit, Carga de Gas Refrigerante R410A/R32).
4. **Strict Policy Compliance**: Explicitly ensures NO `@type: "FAQPage"` entity is produced in any JSON-LD payload across the application.

---

### 1.3 Static Social Preview & E-E-A-T Assets Setup (`public/`)

- `public/og-image.jpg`: 1200×630 static JPEG image asset for Open Graph and Twitter Card shares.
- `public/images/`: Directory created to house responsive WebP asset placeholders supporting visual E-E-A-T.

---

### 1.4 Scannability & Readability Refactoring (`src/content/pages/*.md`)

- Audit and refactor compound sentences across all 50 Markdown content pages.
- **Target sentence length**: 15–20 words.
- **Hard upper limit**: No sentence exceeding 35 words.
- **Formatting enhancements**: Convert dense procedural text into Markdown bulleted (`-`) or numbered (`1.`) lists.
- **Keyword preservation**: Retain all local SEO terms ("mantenimiento de aires acondicionados", "Cancún", "Zona Hotelera", "Puerto Cancún"), technical specifications ("R410A", "R32", "microfaradios"), and warranty terms verbatim.

---

## 2. Architecture Decisions & Tradeoffs

| Decision | Rationale | Tradeoff |
| :--- | :--- | :--- |
| **Separate Schema Builder Utility (`src/utils/schemaBuilder.ts`)** | Decouples JSON-LD schema construction from Astro rendering components; enables isolated unit testing via standard Node.js test runner (`node --test`). | Adds one TypeScript helper file to `src/utils/`. |
| **Static `public/og-image.jpg` over Dynamic SSR Satori Cards** | Static SSG deployment on Vercel Edge benefits from zero runtime compute overhead and instant CDN asset delivery for social crawlers. | Updating social card graphics requires updating the static asset in `public/` rather than rendering text dynamically. |
| **Strict Prohibition of `FAQPage` Structured Data** | Adheres directly to Google's August 2023 Rich Results guidelines restricting commercial sites from using `FAQPage` schema to prevent rich snippet penalties. | Interactive FAQs remain rendered via semantic `<details>`/`<summary>` HTML without rich snippet star badges. |

---

## 3. File Changes Breakdown

| File Path | Action | Description |
| :--- | :--- | :--- |
| `public/og-image.jpg` | **New File** | Default 1200×630 JPEG visual preview image asset. |
| `public/images/` | **New Directory** | Asset directory for WebP visual E-E-A-T placeholders. |
| `src/utils/schemaBuilder.ts` | **New File** | Pure functions building `HVACBusiness`, `BreadcrumbList`, and `Service` JSON-LD schemas. |
| `src/utils/schemaBuilder.test.ts` | **New File** | Unit tests for schema generation and verifying strict exclusion of `FAQPage`. |
| `src/layouts/Layout.astro` | **Modified** | Consumes `schemaBuilder.ts` for JSON-LD script blocks and adds dynamic `og:image` and `twitter:image` tags in `<head>`. |
| `src/content/pages/*.md` | **Modified** | Sentence length refactoring and visual list formatting across all 50 content files. |

---

## 4. Testing & Verification Strategy

The implementation will be verified against three core build and quality checks:

1. **Type Checking & Astro Validation (`pnpm check`)**:
   - Executes `astro check` via `@astrojs/check` to ensure zero TypeScript or template compilation errors.

2. **Automated Unit Tests (`pnpm test`)**:
   - Executes `node --experimental-strip-types --test src/utils/*.test.ts`.
   - Validates SILO internal linking logic (`siloLinking.test.ts`).
   - Validates `schemaBuilder.test.ts` covering:
     - `Service` JSON-LD presence on `hub` and `spoke` pages.
     - Provider reference binding to `HVACBusiness`.
     - `areaServed` geographic location binding.
     - Strict absence of `@type: "FAQPage"`.

3. **Production SSG Build Verification (`pnpm build`)**:
   - Executes `astro check && astro build`.
   - Validates that all 50 static HTML pages and `sitemap-index.xml` compile cleanly.

---

## 5. Threat Matrix

| Threat Category | Severity | Analysis & Mitigation |
| :--- | :--- | :--- |
| **Routing / Shell Boundaries** | **N/A** | The application is a static site (SSG) with no server-side request routing logic, dynamic user inputs, database connections, or shell execution paths. |
| **Invalid JSON-LD Syntax** | Low | Unit tests in `schemaBuilder.test.ts` validate JSON structure prior to SSG compilation. |
| **Broken Image Social Card URLs** | Low | Absolute HTTPS URL construction using `Astro.site` origin guarantees valid asset endpoints for social crawlers. |
| **SEO Keyword Regression** | Low | Refactoring guidelines mandate preserving technical terms, local geography phrases, and SILO structure verbatim. |
