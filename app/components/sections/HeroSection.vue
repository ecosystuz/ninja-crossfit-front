<template>
  <section id="home" class="hero" aria-labelledby="heroTitle">
    <div class="hero-media" role="img" :aria-label="$t('hero.imageAlt')">
      <video
        class="hero-video"
        autoplay
        muted
        loop
        playsinline
        preload="auto"
        aria-hidden="true"
      >
        <source src="/videos/hero-training.mp4" type="video/mp4">
      </video>
    </div>
    <div class="hero-grid" aria-hidden="true" />
    <div class="hero-orbit hero-orbit-one" aria-hidden="true" />
    <span class="hero-backdrop-mark" aria-hidden="true">N</span>
    <div class="container hero-content">
      <div class="hero-eyebrow hero-enter"><span class="live-dot" /> {{ $t('hero.eyebrow') }} <span class="eyebrow-line" /> NINJA / 001</div>
      <h1 id="heroTitle" class="hero-title hero-enter">{{ $t('hero.title1') }}<br><span class="outlined">{{ $t('hero.title2') }}</span><br><span class="accent-text">{{ $t('hero.title3') }}<span class="hero-period">.</span></span></h1>
      <p class="hero-description hero-enter">{{ $t('hero.description') }}</p>
      <div class="hero-buttons hero-enter">
        <a class="button button-accent button-large" href="#apply">{{ $t('hero.apply') }} <span class="arrow-badge" aria-hidden="true">↗</span></a>
        <a class="text-link" href="#about">{{ $t('hero.learnMore') }} <span aria-hidden="true">↗</span></a>
      </div>
    </div>
    <div class="hero-bottom container">
      <span class="hero-bottom-note"><span class="square-icon">✦</span> {{ $t('hero.note') }}</span>
      <a class="scroll-down" href="#about"><span>{{ $t('hero.scroll') }}</span><span class="down-circle" aria-hidden="true">↓</span></a>
    </div>
    <span class="hero-side-label" aria-hidden="true">{{ $t('hero.side') }}</span>
  </section>
</template>
