# Technical Design: Automated Visual Testing Layer

## Technical Approach

Implement automated visual regression testing using Playwright against an Astro production preview build. Playwright spawns `npm run build && npm run preview` via its `webServer` option, serving static HTML/CSS at `http://localhost:4321`. Full-page visual snapshots (`toHaveScreenshot()`) validate UI rendering consistency across Desktop and Mobile viewports using Chromium and WebKit engines.

## Architecture Decisions

| Decision | Choice | Rationale | Alternatives |
|----------|--------|-----------|--------------|
| **Runner** | `@playwright/test` | Native screenshot matching (`toHaveScreenshot`), multi-browser WebKit/Chromium support, zero SaaS cost. | Percy, Chromatic (cost/vendor lock-in) |
| **Server Target** | `astro preview` | Evaluates actual production build output; avoids dev server CSS/hydration flakiness. | `astro dev` (flaky on CI) |
| **Viewports** | 4 standard profiles | Covers Desktop Chrome (1280x720), Desktop Safari (1280x720), Mobile Chrome (Pixel 7), Mobile Safari (iPhone 14). | Single viewport (misses responsive bugs) |
| **Flakiness Control** | `animations: 'disabled'`, `caret: 'hide'`, `maxDiffPixelRatio: 0.02` | Prevents false positives from CSS transitions, cursor blinks, and minor OS font anti-aliasing variations. | High diff threshold (misses real bugs) |

## Data Flow

```
[ Developer / CI Trigger ]
          │
          ▼
[ Playwright WebServer ] ──(npm run build && npm run preview)──► [ Local Preview :4321 ]
          │                                                              │
          ▼                                                              ▼
[ Playwright Test Spec ] ──(HTTP GET Request & DOM Wait)───────► [ Page Rendered ]
          │                                                              │
          ▼                                                              │
[ Capture Snapshot ] ◄──────────────────────────────────────────────────┘
          │
          ▼
[ Compare vs Snapshot Baseline ] ──► (Pass: Clean Exit | Fail: Save Diff & Artifacts)
```

1. Playwright starts `astro build && astro preview` webServer listening on `http://localhost:4321`.
2. Playwright navigates to routes: `/`, `/servicios/mantenimiento-de-aires-acondicionados`, `/ubicaciones/cancun`, `/contacto`.
3. Playwright waits for network idle and DOM stability, disables animations, and takes full-page screenshots.
4. Compare screenshots against baseline `.png` files stored under `tests/snapshots/`.
5. On failure in CI, upload `test-results/` directory as GitHub Actions workflow artifact.

## File Changes

| File Path | Action | Description |
|-----------|--------|-------------|
| `playwright.config.ts` | Create | Playwright configuration with webServer settings, device targets, and snapshot thresholds |
| `package.json` | Modify | Add `@playwright/test` to `devDependencies` and add scripts `test:visual`, `test:visual:update`, `test:visual:ui` |
| `tests/visual.spec.ts` | Create | E2E visual regression spec covering key page archetypes |
| `.github/workflows/visual-testing.yml` | Create | GitHub Actions workflow automating visual tests on PR and `main` branch pushes |
| `.gitignore` | Modify | Ignore `test-results/` and `playwright-report/` output directories |

## Interfaces

### `package.json` NPM Scripts
```json
{
  "scripts": {
    "test:visual": "playwright test",
    "test:visual:update": "playwright test --update-snapshots",
    "test:visual:ui": "playwright test --ui"
  }
}
```

### `playwright.config.ts` Structure
- `webServer`: `command: 'npm run build && npm run preview'`, `url: 'http://localhost:4321'`, `reuseExistingServer: !process.env.CI`.
- `expect.toHaveScreenshot`: `{ maxDiffPixelRatio: 0.02, threshold: 0.2, animations: 'disabled', caret: 'hide' }`.
- `projects`:
  - `Desktop Chrome` (Chromium, 1280x720)
  - `Desktop Safari` (WebKit, 1280x720)
  - `Mobile Chrome` (Pixel 7, 412x915)
  - `Mobile Safari` (iPhone 14, 390x844)

### `tests/visual.spec.ts` Contract
```typescript
import { test, expect } from '@playwright/test';

const routes = [
  { name: 'home', path: '/' },
  { name: 'service-maintenance', path: '/servicios/mantenimiento-de-aires-acondicionados' },
  { name: 'location-cancun', path: '/ubicaciones/cancun' },
  { name: 'contact', path: '/contacto' },
];

routes.forEach(({ name, path }) => {
  test(`visual snapshot for ${name} (${path})`, async ({ page }) => {
    await page.goto(path);
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot(`${name}.png`, { fullPage: true });
  });
});
```

## Testing Strategy

- **Baseline Generation**: Initial baseline snapshots captured on Linux CI environment via `npm run test:visual:update`.
- **Local Developer Workflow**: Run `npm run test:visual` prior to submitting PRs.
- **CI Automation**: GitHub Actions runs `npm run test:visual` on Linux runner (`ubuntu-latest`) using `npx playwright install --with-deps`.
- **Failure Analysis**: Visual diff artifacts uploaded to GitHub Actions artifacts on test failure.

## Threat Matrix

| Risk | Impact | Likelihood | Prevention / Mitigation |
|------|--------|------------|-------------------------|
| Font Anti-Aliasing Mismatch | Med | Med | Enforce baseline snapshot generation on Linux CI; set `maxDiffPixelRatio: 0.02`. |
| Flaky CSS Animations | Low | Med | Disable animations (`animations: 'disabled'`) and hide carets globally in config. |
| WebKit CI Dependency Failures | High | Low | Include `npx playwright install --with-deps` step in GitHub Actions. |
| Port Collision on 4321 | Med | Low | Configure `webServer.reuseExistingServer: !process.env.CI` and timeout threshold. |

## Migration / Rollout

1. Install `@playwright/test` and create `playwright.config.ts`.
2. Add npm scripts to `package.json`.
3. Create `tests/visual.spec.ts` with route matrix.
4. Run `npx playwright test --update-snapshots` on CI or Docker container to establish baseline PNG images.
5. Add `.github/workflows/visual-testing.yml` and enable CI enforcement on PRs to `main`.

## Open Questions

1. Should baseline images be committed to Git or stored in CI cache?
   - *Resolution*: Commit baseline PNGs to Git for deterministic comparison across PRs.
