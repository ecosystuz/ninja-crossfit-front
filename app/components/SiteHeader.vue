<script setup lang="ts">
const isMenuOpen = ref(false)
const { locale, setLocale } = useI18n()
const localeCodes = ['ru', 'en', 'uz'] as const

const switchLanguage = async (code: typeof localeCodes[number]) => {
  if (locale.value !== code) await setLocale(code)
}

const closeMenu = () => {
  isMenuOpen.value = false
  document.body.classList.remove('menu-open')
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  document.body.classList.toggle('menu-open', isMenuOpen.value)
}

const onKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') closeMenu()
}

const onResize = () => {
  if (window.innerWidth > 900) closeMenu()
}

onMounted(() => {
  document.addEventListener('keydown', onKeydown)
  window.addEventListener('resize', onResize, { passive: true })
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeydown)
  window.removeEventListener('resize', onResize)
  document.body.classList.remove('menu-open')
})
</script>

<template>
  <header id="siteHeader" class="site-header">
    <div class="container nav-shell">
      <a class="brand" href="#home" :aria-label="$t('nav.home')">
        <BrandLogo />
      </a>
      <nav class="desktop-nav" :aria-label="$t('nav.mainNavigation')">
        <a href="#about">{{ $t('nav.philosophy') }}</a>
        <a href="#programs">{{ $t('nav.training') }}</a>
        <a href="#coach">{{ $t('nav.coach') }}</a>
        <a href="#location">{{ $t('nav.location') }}</a>
        <a href="#contact">{{ $t('nav.contacts') }}</a>
      </nav>
      <div class="nav-actions">
        <div class="language-switcher" role="group" :aria-label="$t('language.label')">
          <button
            v-for="code in localeCodes"
            :key="code"
            class="language-option"
            :class="{ active: locale === code }"
            type="button"
            :aria-pressed="locale === code"
            @click="switchLanguage(code)"
          >
            {{ code.toUpperCase() }}
          </button>
        </div>
        <a class="button button-accent button-sm desktop-cta" href="#apply">{{ $t('nav.start') }} <UiIcon name="arrow-up-right" /></a>
        <button
          id="menuToggle"
          class="menu-toggle"
          :class="{ active: isMenuOpen }"
          type="button"
          :aria-expanded="isMenuOpen"
          aria-controls="mobileMenu"
          :aria-label="isMenuOpen ? $t('nav.closeMenu') : $t('nav.openMenu')"
          @click="toggleMenu"
        >
          <span />
          <span />
        </button>
      </div>
    </div>
    <nav id="mobileMenu" class="mobile-menu" :aria-label="$t('nav.mobileNavigation')" :hidden="!isMenuOpen">
      <a href="#about" @click="closeMenu">{{ $t('nav.philosophy') }} <UiIcon name="arrow-up-right" /></a>
      <a href="#programs" @click="closeMenu">{{ $t('nav.training') }} <UiIcon name="arrow-up-right" /></a>
      <a href="#coach" @click="closeMenu">{{ $t('nav.coach') }} <UiIcon name="arrow-up-right" /></a>
      <a href="#location" @click="closeMenu">{{ $t('nav.location') }} <UiIcon name="arrow-up-right" /></a>
      <a href="#contact" @click="closeMenu">{{ $t('nav.contacts') }} <UiIcon name="arrow-up-right" /></a>
      <a class="mobile-menu-cta" href="#apply" @click="closeMenu">{{ $t('nav.apply') }} <UiIcon name="arrow-up-right" /></a>
    </nav>
  </header>
</template>
