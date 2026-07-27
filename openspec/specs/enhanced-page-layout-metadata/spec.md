# Capability Specification: Enhanced Page Layout Metadata

## Requirement: Absolute URL Metadata Resolution in Layout.astro

The central layout template `src/layouts/Layout.astro` MUST resolve all canonical and social graph image URLs as absolute HTTPS URLs matching the configured domain.

### Scenario: Absolute HTTPS URL resolution for canonical and social image properties
- **Given** `src/layouts/Layout.astro` rendering any route (e.g., `/` or `/ubicaciones/cancun`)
- **When** generating canonical links, Open Graph images, and Twitter images in `<head>`
- **Then** all URL meta attributes MUST be absolute URLs beginning with `https://`
- **And** relative path references SHALL be automatically prepended with the configured site origin derived from `Astro.site` (`https://airesacondicionadoscancun.vercel.app`).

## Requirement: Fallback and Custom Social Image Resolution

`Layout.astro` MUST support custom image overrides via page props while providing a consistent default fallback image.

### Scenario: Custom social image prop override and fallback behavior
- **Given** `Layout.astro` rendering a page component
- **When** evaluated for social image tag construction
- **Then** IF the page component passes an explicit `image` prop, `Layout.astro` MUST use that custom image absolute URL for `og:image` and `twitter:image`
- **And** IF no custom `image` prop is supplied, `Layout.astro` MUST fall back to `https://airesacondicionadoscancun.vercel.app/og-image.jpg`.

## Requirement: Core Open Graph and Twitter Metadata Completeness

Every page layout render MUST output standardized Open Graph and Twitter Card core properties.

### Scenario: Core Open Graph and Twitter metadata completeness
- **Given** `src/layouts/Layout.astro`
- **When** the page `<head>` is rendered
- **Then** the HTML output MUST contain `<meta property="og:type" content="website">`
- **And** the output MUST contain `<meta property="og:site_name" content="Aires Acondicionados Cancún">`
- **And** the output MUST contain `<meta property="og:locale" content="es_MX">`
- **And** the output MUST contain `<meta name="twitter:card" content="summary_large_image">`.
