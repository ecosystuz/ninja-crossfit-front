<script setup lang="ts">
import type { TrainingGoal } from '~/composables/useTrainingGoal'
import { vMaska } from 'maska/vue'

interface LeadPayload {
  name: string
  phone: string
  age: number
  goal: Exclude<TrainingGoal, ''>
  days: string[]
  locale: string
  consent: true
  source: string
  createdAt: string
}

type ErrorKey = 'name' | 'phone' | 'age' | 'goal' | 'days' | 'consent'

const { locale, t } = useI18n()
const selectedGoal = useTrainingGoal()
const resultRef = ref<HTMLElement>()
const submitted = ref(false)
const wasSent = ref(false)
const isSending = ref(false)
const preparedMessage = ref('')
const resultDescriptionKey = ref('')
const formHintKey = ref('form.note')
const lastLead = ref<LeadPayload>()
const trainingDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const
const phoneMask = '+998 ## ### ## ##'

const form = reactive({
  name: '',
  phone: '',
  age: '' as string | number,
  goal: selectedGoal.value,
  days: [] as string[],
  consent: false
})

const errors = reactive<Record<ErrorKey, string>>({
  name: '',
  phone: '',
  age: '',
  goal: '',
  days: '',
  consent: ''
})

watch(selectedGoal, (goal) => {
  if (goal) form.goal = goal
})

watch(locale, () => {
  if (lastLead.value) preparedMessage.value = formatLead(lastLead.value)
})

const cleanPhone = (value: string) => value.replace(/[^\d+]/g, '').replace(/(?!^)\+/g, '')
const preventAgeWheel = (event: WheelEvent) => {
  const input = event.currentTarget as HTMLInputElement
  if (document.activeElement === input) input.blur()
}

const isValidPhone = (value: string) => {
  const digits = value.replace(/\D/g, '')
  return digits.length >= 9 && digits.length <= 15
}

const clearErrors = () => {
  ;(Object.keys(errors) as ErrorKey[]).forEach(key => { errors[key] = '' })
}

const focusField = (id: string) => {
  nextTick(() => document.querySelector<HTMLElement>(id)?.focus())
}

const validate = () => {
  clearErrors()
  const name = form.name.trim()
  const phone = form.phone.trim()
  const age = Number(form.age)
  let firstInvalid = ''
  const invalidate = (key: ErrorKey, message: string, selector: string) => {
    errors[key] = message
    if (!firstInvalid) firstInvalid = selector
  }

  if (name.length < 2 || name.length > 80) invalidate('name', 'form.errors.name', '#fullName')
  if (!isValidPhone(phone)) invalidate('phone', 'form.errors.phone', '#phone')
  if (!Number.isInteger(age) || age < 14 || age > 85) invalidate('age', 'form.errors.age', '#age')
  if (!form.goal) invalidate('goal', 'form.errors.goal', 'input[name="goal"]')
  if (!form.days.length) invalidate('days', 'form.errors.days', 'input[name="days"]')
  if (!form.consent) invalidate('consent', 'form.errors.consent', '#consent')
  if (firstInvalid) focusField(firstInvalid)
  return !firstInvalid
}

const createLead = (): LeadPayload => ({
  name: form.name.trim(),
  phone: cleanPhone(form.phone.trim()),
  age: Number(form.age),
  goal: form.goal as Exclude<TrainingGoal, ''>,
  days: [...form.days],
  locale: locale.value,
  consent: true,
  source: 'ninja-crossfit-website',
  createdAt: new Date().toISOString()
})

const formatLead = (lead: LeadPayload) => `${t('form.message.title')}\n\n${t('form.message.name')}: ${lead.name}\n${t('form.message.phone')}: ${lead.phone}\n${t('form.message.age')}: ${lead.age}\n${t('form.message.goal')}: ${t(`goals.${lead.goal}`)}\n${t('form.message.days')}: ${lead.days.map(day => t(`days.${day}`)).join(', ')}`

const showResult = async (lead: LeadPayload, sent: boolean) => {
  preparedMessage.value = formatLead(lead)
  lastLead.value = lead
  wasSent.value = sent
  resultDescriptionKey.value = sent ? 'form.sentDescription' : 'form.preparedDescription'
  submitted.value = true
  await nextTick()
  resultRef.value?.scrollIntoView({
    behavior: window.matchMedia('(prefers-reduced-motion:reduce)').matches ? 'auto' : 'smooth',
    block: 'nearest'
  })
}

const submitForm = async () => {
  if (!validate()) return
  const lead = createLead()

  isSending.value = true
  try {
    const response = await fetch('/api/telegram', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead)
    })
    if (!response.ok) throw new Error(`Request failed with status ${response.status}`)
    await showResult(lead, true)
  } catch (error) {
    console.error('Ninja CrossFit: error sending lead', error)
    await showResult(lead, false)
    resultDescriptionKey.value = 'form.sendFailed'
  } finally {
    isSending.value = false
  }
}

const copyApplication = async () => {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(preparedMessage.value)
    } else {
      const textarea = document.createElement('textarea')
      textarea.value = preparedMessage.value
      textarea.style.cssText = 'position:fixed;left:-9999px;top:0'
      document.body.appendChild(textarea)
      textarea.select()
      const copied = document.execCommand('copy')
      textarea.remove()
      if (!copied) throw new Error('Copy unavailable')
    }
    resultDescriptionKey.value = 'form.copied'
  } catch {
    resultDescriptionKey.value = 'form.copyFailed'
  }
}

const resetForm = async () => {
  form.name = ''
  form.phone = ''
  form.age = ''
  form.goal = ''
  form.days = []
  form.consent = false
  selectedGoal.value = ''
  submitted.value = false
  wasSent.value = false
  lastLead.value = undefined
  formHintKey.value = 'form.note'
  clearErrors()
  await nextTick()
  document.querySelector<HTMLInputElement>('#fullName')?.focus()
}
</script>

<template>
  <section id="apply" class="apply-section" aria-labelledby="applyTitle">
    <div class="container apply-container">
      <div class="apply-intro reveal">
        <span class="section-label"><i /> {{ $t('apply.label') }}</span>
        <h2 id="applyTitle" class="display-title">{{ $t('apply.title1') }}<br><em>{{ $t('apply.title2') }}</em></h2>
        <p>{{ $t('apply.intro') }}</p>
        <div class="apply-side-art" aria-hidden="true"><span>✳</span><span>{{ $t('apply.art') }}</span></div>
      </div>
      <div class="form-shell reveal delay-1">
        <div class="form-topline"><span>{{ $t('form.title') }}</span><span>NC — 001 / 2026</span></div>
        <form v-if="!submitted" id="leadForm" novalidate @submit.prevent="submitForm">
          <div class="form-grid">
            <div class="field">
              <label for="fullName">{{ $t('form.name') }} <span>*</span></label>
              <input id="fullName" v-model="form.name" name="name" type="text" autocomplete="name" minlength="2" maxlength="80" :placeholder="$t('form.namePlaceholder')" required :aria-invalid="Boolean(errors.name)" />
              <span id="nameError" class="field-error">{{ errors.name ? $t(errors.name) : '' }}</span>
            </div>
            <div class="field">
              <label for="phone">{{ $t('form.phone') }} <span>*</span></label>
              <input id="phone" v-model="form.phone" v-maska="{ mask: phoneMask, eager: true }" name="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="+998 90 123 45 67" maxlength="17" required :aria-invalid="Boolean(errors.phone)" />
              <span id="phoneError" class="field-error">{{ errors.phone ? $t(errors.phone) : '' }}</span>
            </div>
            <div class="field field-full">
              <label for="age">{{ $t('form.age') }} <span>*</span></label>
              <input id="age" v-model="form.age" name="age" type="number" inputmode="numeric" min="14" max="85" step="1" :placeholder="$t('form.agePlaceholder')" required :aria-invalid="Boolean(errors.age)" @wheel="preventAgeWheel" />
              <span id="ageError" class="field-error">{{ errors.age ? $t(errors.age) : '' }}</span>
            </div>
          </div>
          <fieldset class="choice-group">
            <legend>{{ $t('form.goal') }} <span>*</span></legend>
            <div class="goal-grid">
              <label class="goal-card">
                <input v-model="form.goal" type="radio" name="goal" value="weight-loss" required>
                <span class="goal-icon" aria-hidden="true">↘</span><span class="goal-title">{{ $t('form.weightTitle') }}</span><span class="goal-subtitle">{{ $t('form.weightSubtitle') }}</span><span class="goal-check" aria-hidden="true">✓</span>
              </label>
              <label class="goal-card">
                <input v-model="form.goal" type="radio" name="goal" value="muscle-gain" required>
                <span class="goal-icon" aria-hidden="true">↗</span><span class="goal-title">{{ $t('form.massTitle') }}</span><span class="goal-subtitle">{{ $t('form.massSubtitle') }}</span><span class="goal-check" aria-hidden="true">✓</span>
              </label>
            </div>
            <span id="goalError" class="field-error">{{ errors.goal ? $t(errors.goal) : '' }}</span>
          </fieldset>
          <fieldset class="choice-group days-group">
            <legend>{{ $t('form.days') }} <span>*</span></legend>
            <p class="group-hint">{{ $t('form.daysHint') }}</p>
            <div id="daysGrid" class="days-grid">
              <label v-for="day in trainingDays" :key="day" class="day-chip">
                <input v-model="form.days" type="checkbox" name="days" :value="day"><span>{{ $t(`days.${day}`) }}</span>
              </label>
            </div>
            <span id="daysError" class="field-error">{{ errors.days ? $t(errors.days) : '' }}</span>
          </fieldset>
          <label class="consent"><input id="consent" v-model="form.consent" type="checkbox" name="consent" required><span>{{ $t('form.consent') }}</span></label>
          <span id="consentError" class="field-error">{{ errors.consent ? $t(errors.consent) : '' }}</span>
          <button id="submitBtn" class="button button-accent form-submit" type="submit" :disabled="isSending">{{ $t(isSending ? 'form.sending' : 'form.submit') }} <span v-if="!isSending">↗</span></button>
          <p id="formHint" class="form-note">{{ $t(formHintKey) }}</p>
        </form>
        <div v-else ref="resultRef" class="form-result" role="status" aria-live="polite">
          <div class="result-icon" aria-hidden="true">✓</div>
          <h3>{{ $t(wasSent ? 'form.sent' : 'form.prepared') }}</h3>
          <p>{{ $t(resultDescriptionKey) }}</p>
          <div class="result-preview">{{ preparedMessage }}</div>
          <div class="result-actions">
            <button v-if="!wasSent" type="button" class="button button-accent" @click="copyApplication">{{ $t('form.copy') }} <span>↗</span></button>
            <a class="button button-outline button-result" href="https://ig.me/m/ninjacrossfit1" target="_blank" rel="noopener noreferrer">{{ $t('form.instagram') }} <span>↗</span></a>
          </div>
          <button class="reset-link" type="button" @click="resetForm">{{ $t('form.reset') }} ↗</button>
        </div>
      </div>
    </div>
  </section>
</template>
