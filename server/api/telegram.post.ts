type TrainingGoal = 'weight-loss' | 'muscle-gain'
type TrainingDay = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun'

interface LeadRequest {
  name?: unknown
  phone?: unknown
  age?: unknown
  goal?: unknown
  days?: unknown
  locale?: unknown
  consent?: unknown
}

interface TelegramResponse {
  ok?: boolean
  description?: string
}

const allowedGoals = new Set<TrainingGoal>(['weight-loss', 'muscle-gain'])
const allowedDays = new Set<TrainingDay>(['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'])
const allowedLocales = new Set(['ru', 'en', 'uz'])
const goalLabels: Record<TrainingGoal, string> = {
  'weight-loss': 'Похудеть',
  'muscle-gain': 'Набрать массу'
}
const dayLabels: Record<TrainingDay, string> = {
  mon: 'ПН',
  tue: 'ВТ',
  wed: 'СР',
  thu: 'ЧТ',
  fri: 'ПТ',
  sat: 'СБ',
  sun: 'ВС'
}

const rateLimit = new Map<string, { count: number, resetAt: number }>()
const rateLimitWindow = 15 * 60 * 1000
const rateLimitMax = 8

const escapeHtml = (value: string) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;')

const normalizePhone = (value: string) => value
  .trim()
  .replace(/[^\d+]/g, '')
  .replace(/(?!^)\+/g, '')

export default defineEventHandler(async (event) => {
  setResponseHeader(event, 'Cache-Control', 'no-store')

  const contentType = getHeader(event, 'content-type') || ''
  if (!contentType.includes('application/json')) {
    throw createError({ statusCode: 415, statusMessage: 'Content-Type must be application/json' })
  }

  const contentLength = Number(getHeader(event, 'content-length') || 0)
  if (contentLength > 12_000) {
    throw createError({ statusCode: 413, statusMessage: 'Request is too large' })
  }

  const clientKey = getRequestIP(event, { xForwardedFor: true }) || 'unknown'
  const now = Date.now()
  const bucket = rateLimit.get(clientKey)
  if (!bucket || bucket.resetAt <= now) {
    rateLimit.set(clientKey, { count: 1, resetAt: now + rateLimitWindow })
  } else {
    bucket.count += 1
    if (bucket.count > rateLimitMax) {
      setResponseHeader(event, 'Retry-After', Math.ceil((bucket.resetAt - now) / 1000))
      throw createError({ statusCode: 429, statusMessage: 'Too many requests' })
    }
  }

  const body = await readBody<LeadRequest>(event)
  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const phone = typeof body.phone === 'string' ? normalizePhone(body.phone) : ''
  const age = Number(body.age)
  const goal = typeof body.goal === 'string' && allowedGoals.has(body.goal as TrainingGoal)
    ? body.goal as TrainingGoal
    : undefined
  const days = Array.isArray(body.days)
    ? [...new Set(body.days.filter((day): day is TrainingDay => typeof day === 'string' && allowedDays.has(day as TrainingDay)))]
    : []
  const locale = typeof body.locale === 'string' && allowedLocales.has(body.locale) ? body.locale : 'ru'
  const phoneDigits = phone.replace(/\D/g, '')

  if (
    name.length < 2
    || name.length > 80
    || phoneDigits.length < 9
    || phoneDigits.length > 15
    || !Number.isInteger(age)
    || age < 14
    || age > 85
    || !goal
    || days.length === 0
    || body.consent !== true
  ) {
    throw createError({ statusCode: 422, statusMessage: 'Invalid application data' })
  }

  const config = useRuntimeConfig(event)
  const botToken = String(config.telegramBotToken || '')
  const chatId = String(config.telegramChatId || '')
  if (!botToken || !chatId) {
    console.error('Telegram delivery is not configured')
    throw createError({ statusCode: 503, statusMessage: 'Application delivery is not configured' })
  }

  const submittedAt = new Intl.DateTimeFormat('ru-RU', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Samarkand'
  }).format(new Date())

  const text = [
    '<b>🥷 Новая заявка — NINJA CROSSFIT</b>',
    '',
    `<b>Имя:</b> ${escapeHtml(name)}`,
    `<b>Телефон:</b> ${escapeHtml(phone)}`,
    `<b>Возраст:</b> ${age}`,
    `<b>Цель:</b> ${goalLabels[goal]}`,
    `<b>Дни:</b> ${days.map(day => dayLabels[day]).join(', ')}`,
    `<b>Язык сайта:</b> ${locale.toUpperCase()}`,
    `<b>Отправлено:</b> ${submittedAt}`
  ].join('\n')

  let telegramResponse: Response
  try {
    telegramResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
        disable_web_page_preview: true
      }),
      signal: AbortSignal.timeout(10_000)
    })
  } catch {
    throw createError({ statusCode: 502, statusMessage: 'Telegram is unavailable' })
  }

  const telegramData = await telegramResponse.json() as TelegramResponse
  if (!telegramResponse.ok || !telegramData.ok) {
    console.error('Telegram API rejected the application', {
      status: telegramResponse.status,
      description: telegramData.description
    })
    throw createError({ statusCode: 502, statusMessage: 'Telegram delivery failed' })
  }

  return { ok: true }
})
