# Tasks: Visual Testing Layer

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~150–200 |
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
| 1 | Full visual testing layer | PR 1 (single) | `npx playwright test` | `npm run build && npm run preview` on localhost:4321 | Delete all 5 files/modifications — no existing behavior broken |

---

## Phase 1: Dependencies & Configuration

- [x] 1.1 Add `@playwright/test` to `devDependencies` in `package.json`
- [x] 1.2 Add npm scripts to `package.json`: `test:visual`, `test:visual:update`, `test:visual:ui`
- [x] 1.3 Create `playwright.config.ts` with 4 device projects (Desktop Chrome 1280x720, Desktop Safari 1280x720, Mobile Chrome Pixel 7, Mobile Safari iPhone 14), `webServer` pointing to `npm run build && npm run preview`, and snapshot thresholds (`maxDiffPixelRatio: 0.02`, `animations: 'disabled'`, `caret: 'hide'`)
- [x] 1.4 Add `test-results/` and `playwright-report/` to `.gitignore`
- [x] 1.5 Install Playwright browsers: `npx playwright install chromium webkit`

## Phase 2: Visual Test Suite

- [x] 2.1 Create `tests/visual.spec.ts` with route targets: `/` (home), `/contacto` (contact) — dynamic slug routes deferred to TODO comment
- [x] 2.2 Each test navigates, waits for `networkidle`, and calls `expect(page).toHaveScreenshot('<name>.png', { fullPage: true })`
- [x] 2.3 Generate baseline snapshots locally via `pnpm run test:visual:update` — baselines committed under `tests/visual.spec.ts-snapshots/` (Chromium only locally; WebKit runs in CI on Ubuntu)

## Phase 3: CI/CD Workflow

- [x] 3.1 Create `.github/workflows/visual-testing.yml` triggered on `push` to `main` and `pull_request` targeting `main`
- [x] 3.2 Workflow steps: checkout → setup Node.js (v22) → install deps (`npm ci`) → `npx playwright install --with-deps chromium webkit` → `npm run build` → `npm run test:visual`
- [x] 3.3 Add `upload-artifact` step using `actions/upload-artifact@v4` to persist `test-results/` on failure (using `if: failure()`)

## Phase 4: Verification

- [ ] 4.1 Run `npx playwright test` locally against all 4 projects and confirm all snapshots pass
- [ ] 4.2 Intentionally modify a CSS value, re-run, and confirm the diff is caught with non-zero exit code
- [ ] 4.3 Verify CI workflow triggers correctly on a test PR and uploads artifact on simulated failure
