<script setup lang="ts">
useLandingEffects()
</script>

<template>
  <div>
    <div id="scrollProgress" class="scroll-progress" aria-hidden="true" />
    <div id="cursorGlow" class="cursor-glow" aria-hidden="true" />
    <a class="skip-link" href="#main">{{ $t('nav.skip') }}</a>
    <SiteHeader />
    <slot />
    <SiteFooter />
    <BackgroundAudio />
  </div>
</template>
