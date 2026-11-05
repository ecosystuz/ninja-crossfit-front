<script setup lang="ts">
import type { Component } from 'vue'
import HeroSection from '~/components/sections/HeroSection.vue'
import TickerSection from '~/components/sections/TickerSection.vue'
import AboutSection from '~/components/sections/AboutSection.vue'
import ProgramsSection from '~/components/sections/ProgramsSection.vue'
import StatementSection from '~/components/sections/StatementSection.vue'
import CoachSection from '~/components/sections/CoachSection.vue'
import StepsSection from '~/components/sections/StepsSection.vue'
import LocationSection from '~/components/sections/LocationSection.vue'
import ApplySection from '~/components/sections/ApplySection.vue'
import { landingSections, type LandingSectionType } from '~/config/landing'

const { locale, t } = useI18n()
const siteUrl = 'https://ninja-crossfit.uz'
const phone = '+998934706777'
const localePaths = {
  ru: '/',
  uz: '/uz',
  en: '/en'
} as const
const ogLocales = {
  ru: 'ru_RU',
  uz: 'uz_UZ',
  en: 'en_US'
} as const

type SiteLocale = keyof typeof localePaths

const currentLocale = computed<SiteLocale>(() => (
  locale.value === 'uz' || locale.value === 'en' ? locale.value : 'ru'
))
const absoluteUrl = (path: string) => `${siteUrl}${path}`
const canonicalUrl = computed(() => absoluteUrl(localePaths[currentLocale.value]))
const ogImageUrl = `${siteUrl}/images/coach-training-02.jpg`

const structuredData = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'SportsActivityLocation',
  '@id': `${siteUrl}/#organization`,
  name: 'Ninja CrossFit',
  url: canonicalUrl.value,
  logo: `${siteUrl}/favicon.svg`,
  image: ogImageUrl,
  telephone: phone,
  description: t('meta.description'),
  inLanguage: currentLocale.value,
  address: {
    '@type': 'PostalAddress',
    name: 'Mamont Fit',
    addressLocality: currentLocale.value === 'uz' ? 'Buxoro' : 'Bukhara',
    addressCountry: 'UZ'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 39.758458,
    longitude: 64.456707
  },
  areaServed: {
    '@type': 'City',
    name: currentLocale.value === 'uz' ? 'Buxoro' : 'Bukhara'
  },
  hasMap: 'https://www.google.com/maps/place/Mamont+Fit/@39.7584626,64.4541271,17z',
  sameAs: [
    'https://www.instagram.com/ninjacrossfit1/',
    'https://www.instagram.com/khayotov_x/'
  ]
}))

useHead(() => ({
  htmlAttrs: { lang: locale.value },
  title: t('meta.title'),
  meta: [
    { name: 'description', content: t('meta.description') },
    { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
    { property: 'og:title', content: t('meta.title') },
    { property: 'og:description', content: t('meta.ogDescription') },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: canonicalUrl.value },
    { property: 'og:site_name', content: 'Ninja CrossFit' },
    { property: 'og:locale', content: ogLocales[currentLocale.value] },
    { key: 'og-locale-ru', property: 'og:locale:alternate', content: ogLocales.ru },
    { key: 'og-locale-uz', property: 'og:locale:alternate', content: ogLocales.uz },
    { key: 'og-locale-en', property: 'og:locale:alternate', content: ogLocales.en },
    { property: 'og:image', content: ogImageUrl },
    { property: 'og:image:width', content: '844' },
    { property: 'og:image:height', content: '922' },
    { property: 'og:image:type', content: 'image/jpeg' },
    { property: 'og:image:alt', content: t('meta.imageAlt') },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: t('meta.title') },
    { name: 'twitter:description', content: t('meta.ogDescription') },
    { name: 'twitter:image', content: ogImageUrl },
    { name: 'twitter:image:alt', content: t('meta.imageAlt') }
  ],
  link: [
    { rel: 'canonical', href: canonicalUrl.value },
    { rel: 'alternate', hreflang: 'ru', href: absoluteUrl(localePaths.ru) },
    { rel: 'alternate', hreflang: 'uz', href: absoluteUrl(localePaths.uz) },
    { rel: 'alternate', hreflang: 'en', href: absoluteUrl(localePaths.en) },
    { rel: 'alternate', hreflang: 'x-default', href: absoluteUrl(localePaths.ru) }
  ],
  script: [
    {
      key: 'ninja-crossfit-structured-data',
      type: 'application/ld+json',
      innerHTML: JSON.stringify(structuredData.value)
    }
  ]
}))

const sectionRegistry: Record<LandingSectionType, Component> = {
  hero: HeroSection,
  ticker: TickerSection,
  about: AboutSection,
  programs: ProgramsSection,
  statement: StatementSection,
  coach: CoachSection,
  steps: StepsSection,
  location: LocationSection,
  apply: ApplySection
}
</script>

<template>
  <main id="main">
    <component
      :is="sectionRegistry[section.type]"
      v-for="section in landingSections"
      :key="section.id"
    />
  </main>
</template>
