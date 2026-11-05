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

useHead(() => ({
  htmlAttrs: { lang: locale.value },
  title: t('meta.title'),
  meta: [
    { name: 'description', content: t('meta.description') },
    { property: 'og:title', content: t('meta.title') },
    { property: 'og:description', content: t('meta.ogDescription') }
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
