# Design Document: Mobile-First Responsive Architecture

## Architectural Decisions

### 1. Refactoring CSS in `Layout.astro` & Components
- **Global Design Tokens**:
  - Maintain HSL/HEX color system (`--color-primary`, `--color-accent`, etc.).
  - Add fluid spacing & sizing scale (`--space-xs`, `--space-sm`, `--space-md`, `--space-lg`, `--space-xl`).
- **Base Layout (`.main-layout`)**:
  - Default: Single column `display: flex; flex-direction: column; gap: 1.5rem; width: 100%; padding: 1rem;`
  - Breakpoint `@media (min-width: 1024px)`: Switch to 2-column grid layout `display: grid; grid-template-columns: 1fr 340px; gap: 2rem; padding: 2rem 1.5rem;`

### 2. Header & Hero Optimization
- **Header**:
  - Base (Mobile): Flex container with compact logo and touch-ready `btn-phone` CTA.
  - `@media (min-width: 640px)`: Display `logo-sub` text and expand phone button padding.
- **Hero**:
  - Base (Mobile): Padding `2.5rem 1rem`, dynamic `h1` with `clamp(1.45rem, 5vw + 0.5rem, 2.75rem)`, stacked badges.
  - `@media (min-width: 768px)`: Padding `4rem 2rem`, horizontal badge row layout.

### 3. Component Enhancements
- `LeadForm.astro`: Input height `48px`, `font-size: 16px` to prevent iOS automatic zoom on focus.
- `FAQSection.astro`: Accordion trigger area padded with `padding: 1rem 1.25rem`, dynamic icon rotation on toggle.
- `SiloLinks.astro`: Base `grid-template-columns: 1fr;` -> `@media (min-width: 640px)` `2fr 1fr` -> `@media (min-width: 1024px)` `3fr 1fr`.
- `CookieBanner.astro`: Viewport bottom dock with `z-index: 1000`, stacked CTA buttons on small screens (`< 480px`).

## Verification & Testing Plan
1. **Typecheck & Build**: Run `npm run check` and `npm run build`.
2. **Visual Verification**: Run Playwright test suite `npm run test:visual` across mobile and desktop viewports.
