# NINJA CROSSFIT / Nuxt 4

Адаптивный лендинг клуба Ninja CrossFit, перенесённый на Nuxt 4 и Vue 3. Визуальная часть, адаптивные состояния, анимации и сценарий формы сохранены из исходного HTML-макета.

## Запуск

```bash
npm install
npm run dev
```

Production-проверка:

```bash
npm run typecheck
npm run build
```

## Архитектура секций

Страница собирается через динамический `<component :is="...">` в `app/pages/index.vue`.

- `app/config/landing.ts` — порядок и типы секций;
- `app/pages/index.vue` — реестр компонентов и динамический рендер;
- `app/components/sections/` — независимые секции лендинга;
- `app/components/SiteHeader.vue` и `SiteFooter.vue` — общий каркас;
- `app/composables/` — общие эффекты и состояние выбранной цели.
- `i18n/locales/` — переводы интерфейса на русский, английский и узбекский.

Чтобы добавить новую секцию:

1. Создайте компонент в `app/components/sections`.
2. Добавьте его тип и запись в `app/config/landing.ts`.
3. Зарегистрируйте компонент в `sectionRegistry` внутри `app/pages/index.vue`.

Так секции можно переставлять, отключать и в дальнейшем загружать из CMS без переписывания шаблона страницы.

## Форма заявки

Форма отправляет заявки в закрытую Telegram-группу через серверный маршрут Nuxt `server/api/telegram.post.ts`. Telegram-токен никогда не передаётся в браузер.

Создайте локальный `.env` по примеру `.env.example`:

```env
TELEGRAM_BOT_TOKEN=token_from_botfather
TELEGRAM_CHAT_ID=-1000000000000
```

После изменения `.env` перезапустите Nuxt. API повторно проверяет данные, ограничивает частоту запросов и отправляет в Telegram только допустимые поля формы. Если Telegram временно недоступен, интерфейс предложит скопировать заявку и связаться через Instagram.

## Внешние ресурсы

- фотографии загружаются с Unsplash;
- шрифты Barlow Condensed и Manrope — с Google Fonts;
- Instagram клуба: <https://www.instagram.com/ninjacrossfit1/>;
- Instagram тренера: <https://www.instagram.com/khayotov_x/>.

## Структура проекта

```text
app/
  app.vue
  assets/css/main.css
  components/
    SiteHeader.vue
    SiteFooter.vue
    sections/*.vue
  composables/
  config/landing.ts
  layouts/default.vue
  pages/index.vue
```

В рабочем Nuxt-проекте обычный `index.html` не используется: HTML генерируется страницей, layout и Vue-компонентами.

## Языки

Локализация работает через официальный модуль `@nuxtjs/i18n`:

- русский — `/`;
- английский — `/en`;
- узбекский — `/uz`.

Переключатель языка находится в шапке, а выбранная локаль сохраняется в cookie `ninja_locale`.
