export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/i18n'],
  css: ['~/assets/css/main.css'],
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
      title: 'NINJA CROSSFIT — выходи за свои пределы',
      meta: [
        { name: 'theme-color', content: '#090a09' },
        {
          name: 'description',
          content: 'NINJA CROSSFIT — функциональные тренировки, сила, выносливость и работа над собой. Выбери цель и запишись на тренировку.'
        },
        { property: 'og:title', content: 'NINJA CROSSFIT — выходи за свои пределы' },
        { property: 'og:description', content: 'Сила начинается с решения. Функциональные тренировки с NINJA CROSSFIT.' },
        { property: 'og:type', content: 'website' }
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
