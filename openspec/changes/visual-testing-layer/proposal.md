# Proposal: Automated Visual Testing Layer

## Intent

Implement automated visual regression testing using Playwright to catch UI layout regressions, broken CSS, and responsive viewport bugs across Astro static builds before code is merged or deployed.

## Scope

### In Scope
- Add `@playwright/test` dependency and script targets (`test:visual`, `test:visual:update`, `test:visual:ui`).
- Create `playwright.config.ts` with static web server orchestration (`astro build && astro preview`).
- Define multi-browser and multi-viewport device targets (Desktop Chrome, Desktop Safari, Mobile Chrome Pixel 7, Mobile Safari iPhone 14).
- Write E2E visual test specs (`tests/visual/pages.spec.ts`) for key page archetypes.
- Create GitHub Actions workflow (`.github/workflows/visual-testing.yml`) for automated CI checks.

### Out of Scope
- Dynamic state / user interaction flow testing.
- Third-party SaaS visual regression tools (Percy, Chromatic).

## Capabilities

### New Capabilities
- `visual-testing`: Automated visual regression testing with Playwright for Chrome and Safari on Desktop and Mobile viewports

### Modified Capabilities
- None

## Approach

Run Playwright native visual comparisons (`toHaveScreenshot()`) against a locally served Astro production build (`astro preview` at `http://localhost:4321`). Verify visual rendering consistency across Chromium and WebKit on 4 standard viewports, with automated CI enforcement via GitHub Actions.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `package.json` | Modified | Add `@playwright/test` devDependency and test scripts |
| `playwright.config.ts` | New | Configure WebServer, browser projects, viewports, and screenshot options |
| `tests/visual/pages.spec.ts` | New | Visual snapshot test cases for key page archetypes |
| `.github/workflows/visual-testing.yml` | New | GitHub Actions workflow for PR and branch push verification |
| `.gitignore` | Modified | Ignore `test-results/` and `playwright-report/` directories |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Cross-OS Font Rendering | Med | Set `threshold: 0.2` & `maxDiffPixelRatio: 0.02`; rely on Linux CI baselines |
| Animation / Cursor Flakiness | Med | Disable animations (`animations: 'disabled'`) and hide caret (`caret: 'hide'`) |
| WebKit Missing Dependencies in CI | Low | Include `npx playwright install --with-deps` step in GitHub Actions |

## Rollback Plan

Remove `playwright.config.ts`, `tests/visual/`, `.github/workflows/visual-testing.yml`, uninstall `@playwright/test`, and revert `package.json` and `.gitignore`.

## Dependencies

- `@playwright/test` devDependency
- Playwright Chromium and WebKit browser binaries

## Success Criteria

- [ ] Local `npm run test:visual` succeeds against Astro static preview.
- [ ] GitHub Actions workflow passes cleanly on pull requests across all 4 browser viewports.
- [ ] Baseline snapshots stored for Homepage, Core Service, Location SILO, and Contact pages.
