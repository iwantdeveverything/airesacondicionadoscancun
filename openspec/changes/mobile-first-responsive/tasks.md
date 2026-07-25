# Implementation Tasks: Mobile-First Responsive Redesign

- [x] **Task 1: Global Fluid CSS & Base Layout Refactoring (`Layout.astro`)** <!-- id: 1 -->
  - Implement base mobile styles (320px–480px) for body, header, hero, main-layout, content-card, sidebar, and footer without `@media`.
  - Add fluid typography math using `clamp()` for `h1`, `h2`, and `h3`.
  - Add progressive enhancement media queries (`@media (min-width: 640px)`, `@media (min-width: 768px)`, `@media (min-width: 1024px)`).

- [x] **Task 2: Component Mobile UX & Touch Optimization** <!-- id: 2 -->
  - Refactor `LeadForm.astro`: Set min-height 48px on inputs/buttons, set 16px font-size to prevent iOS zoom, add `inputmode` and `autocomplete` attributes.
  - Refactor `FAQSection.astro`: Ensure accordion triggers have touch-friendly tap targets and active focus outlines.
  - Refactor `SiloLinks.astro`: Apply mobile-first grid layout (`1fr` -> `min-width: 640px: grid-2col`).
  - Refactor `CookieBanner.astro`: Optimize bottom fixed placement and button stacking for screens < 480px.

- [x] **Task 3: Verification & Visual Testing Audit** <!-- id: 3 -->
  - Run `npm run check` to verify Astro TypeScript integrity (0 errors, 0 warnings).
  - Run `npm run test` to verify SILO linking unit tests (6/6 tests passing).
  - Run `npm run build` to confirm production bundle builds cleanly (50 pages compiled in 4.27s).
