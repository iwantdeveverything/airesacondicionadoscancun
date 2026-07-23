# Capability Specification: Visual Testing

## Requirement: Playwright Test Harness & WebServer Execution

The visual testing suite MUST automatically trigger an Astro production build and start a local preview web server before running visual snapshot tests.

### Scenario: Local WebServer execution for visual tests
- **Given** an Astro project configured with static site generation
- **When** the visual test runner is invoked
- **Then** Playwright MUST execute `astro build` and start `astro preview` at `http://localhost:4321`
- **And** the test runner MUST wait until `http://localhost:4321` responds with HTTP 200 before proceeding with test cases.

## Requirement: Desktop and Mobile Viewport Matrix

The visual testing execution matrix MUST evaluate layouts across Desktop and Mobile viewports using Chromium and WebKit rendering engines.

### Scenario: Multi-viewport multi-browser execution matrix
- **Given** Playwright project configurations for browsers and viewports
- **When** visual snapshot tests are executed
- **Then** Playwright MUST run snapshots on Desktop Chrome (`1280x720`) using Chromium engine
- **And** Playwright MUST run snapshots on Desktop Safari (`1280x720`) using WebKit engine
- **And** Playwright MUST run snapshots on Mobile Chrome (`Pixel 7` viewport `412x915`) using Chromium engine
- **And** Playwright MUST run snapshots on Mobile Safari (`iPhone 14` viewport `390x844`) using WebKit engine.

## Requirement: Visual Snapshot Comparison & Thresholds

Visual snapshot assertions MUST use Playwright's `toHaveScreenshot()` matcher with strict flakiness controls and configurable pixel match thresholds.

### Scenario: Snapshot comparison with anti-flakiness controls
- **Given** rendered page targets (`/`, `/servicios/mantenimiento-de-aires-acondicionados`, `/ubicaciones/cancun`, `/contacto`)
- **When** capturing and asserting full-page visual snapshots
- **Then** assertions MUST invoke `expect(page).toHaveScreenshot()`
- **And** CSS animations MUST be disabled (`animations: 'disabled'`) and carets hidden (`caret: 'hide'`)
- **And** visual diff ratio threshold MUST NOT exceed `maxDiffPixelRatio: 0.02` (2%).

## Requirement: GitHub Actions CI Enforcement & Artifact Upload

Automated CI workflows MUST enforce visual snapshot validation on GitHub Actions and upload visual diff artifacts whenever test failures occur.

### Scenario: CI execution and failure artifact capture
- **Given** a pull request or code push to `main` branch
- **When** GitHub Actions executes `.github/workflows/visual-testing.yml`
- **Then** the workflow MUST install Playwright browser dependencies using `npx playwright install --with-deps`
- **And** MUST run `npm run test:visual` against the Astro static output
- **And** IF any snapshot comparison fails, the job MUST fail and automatically upload the `test-results/` directory as a downloadable workflow artifact.
