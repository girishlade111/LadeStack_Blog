import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://blog.ladestack.in',
  output: 'static',
  trailingSlash: 'always',
  devToolbar: {
    enabled: false,
  },
  build: {
    format: 'directory',
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  vite: {
    server: {
      host: '0.0.0.0',
      port: 3000,
      allowedHosts: true,
    },
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ja', 'ko', 'zh', 'ru', 'tr', 'fr', 'pt', 'es'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
