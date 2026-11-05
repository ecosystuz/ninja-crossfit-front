export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/i18n'],
  css: ['~/assets/css/main.css'],
  nitro: {
    preset: 'cloudflare_module',
    cloudflare: {
      deployConfig: true,
      wrangler: {
        name: process.env.CLOUDFLARE_WORKER_NAME || 'ninja-crossfit-front',
        compatibility_date: '2025-07-15',
        compatibility_flags: ['nodejs_compat'],
        assets: {
          run_worker_first: false
        }
      }
    }
  },
  routeRules: {
    '/ru': { redirect: { to: '/', statusCode: 301 } },
    '/ru/': { redirect: { to: '/', statusCode: 301 } },
    '/images/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
    '/icons/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
    '/videos/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
    '/audio/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
    '/sitemap.xml': { headers: { 'cache-control': 'public, max-age=0, must-revalidate' } },
    '/robots.txt': { headers: { 'cache-control': 'public, max-age=0, must-revalidate' } }
  },
  i18n: {
    defaultLocale: 'ru',
    strategy: 'prefix_except_default',
    locales: [
      { code: 'ru', name: 'RU', language: 'ru-RU', file: 'ru.json' },
      { code: 'en', name: 'EN', language: 'en-US', file: 'en.json' },
      { code: 'uz', name: 'UZ', language: 'uz-UZ', file: 'uz.json' }
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'ninja_locale',
      redirectOn: 'root'
    }
  },
  app: {
    head: {
      htmlAttrs: { lang: 'ru' },
      meta: [
        { name: 'theme-color', content: '#090a09' }
      ],
      link: [
        { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'preconnect', href: 'https://images.unsplash.com' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700;800;900&family=Manrope:wght@400;500;600;700;800&display=swap'
        }
      ]
    }
  },
  runtimeConfig: {
    telegramBotToken: process.env.NUXT_TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_BOT_TOKEN || '',
    telegramChatId: process.env.NUXT_TELEGRAM_CHAT_ID || process.env.TELEGRAM_CHAT_ID || '',
    public: {
      formEndpoint: '/api/telegram'
    }
  }
})
