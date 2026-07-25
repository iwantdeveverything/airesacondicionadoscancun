# Spec: Mobile-First Responsive Layout & Components

## Requirements

### Requirement 1: Mobile-First Base Styles
- **SHALL** define all structural, typography, and container styles targeting mobile viewports (320px–480px) in the main block without `@media` rules.
- **SHALL** use `@media (min-width: 640px)`, `@media (min-width: 768px)`, and `@media (min-width: 1024px)` exclusively for progressive enhancement.
- **SHALL NOT** use `max-width` media queries for core layout structure.

### Requirement 2: Fluid Typography & Touch Targets
- **SHALL** calculate `h1`, `h2`, `h3` sizes dynamically using CSS `clamp()` (e.g. `clamp(1.5rem, 4vw + 1rem, 2.75rem)` for `h1`).
- **SHALL** enforce minimum 44px height and 44px width for all interactive elements (`a`, `button`, `input`, `select`).

### Requirement 3: Component Mobile UX
- **Header & Navigation**: Logo text scale smoothly; `btn-phone` CTA converts cleanly to compact icon+text on mobile viewports.
- **LeadForm.astro**: Multi-column inputs collapse into vertical stacks on mobile; inputs use proper `inputmode` and high contrast states.
- **FAQSection.astro**: Accordion trigger covers full card width with touch feedback.
- **Floating CTA & Banners**: Floating WhatsApp button and `CookieBanner` must stack cleanly without covering primary CTAs or text content.

### Requirement 4: Zero Horizontal Scroll & Visual Integrity
- **SHALL** pass 100% of Playwright visual layout checks without horizontal overflow at 390px viewport width.
