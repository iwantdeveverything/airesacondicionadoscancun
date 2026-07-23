import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  output: 'static',
  site: 'https://airesacondicionadoscancun.vercel.app',
  integrations: [sitemap()],
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
});
