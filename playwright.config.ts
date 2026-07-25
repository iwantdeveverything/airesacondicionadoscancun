import { defineConfig, devices } from '@playwright/test';

// WebKit requires libicu74 (Debian versioned name) — only available on Ubuntu CI.
// Set CI=true locally to enable WebKit projects when running on a supported OS.
const isCI = !!process.env.CI;

export default defineConfig({
  testDir: './tests',
  outputDir: '.test-results',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? 'github' : 'html',

  // Snapshot path with Linux suffix to keep CI baselines deterministic
  snapshotPathTemplate:
    '{testDir}/{testFilePath}-snapshots/{arg}-{projectName}-linux{ext}',

  use: {
    baseURL: 'http://localhost:4321',
    trace: 'on-first-retry',
  },

  // Give screenshot stability check enough time for pages with lazy fonts/images
  expect: {
    timeout: 30_000,
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.02,
      threshold: 0.2,
      animations: 'disabled',
      caret: 'hide',
    },
  },

  projects: [
    // Chromium — runs everywhere
    {
      name: 'Desktop Chrome',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 },
      },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 7'] },
    },

    // WebKit — CI only (requires Ubuntu system libs libicu74/libxml2/libflite1)
    ...(isCI
      ? [
          {
            name: 'Desktop Safari',
            use: {
              ...devices['Desktop Safari'],
              viewport: { width: 1280, height: 720 },
            },
          },
          {
            name: 'Mobile Safari',
            use: { ...devices['iPhone 14'] },
          },
        ]
      : []),
  ],

  webServer: {
    command: 'npm run build && npm run preview',
    url: 'http://localhost:4321',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
