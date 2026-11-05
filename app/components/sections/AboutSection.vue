<template>
  <section id="about" class="section about-section" aria-labelledby="aboutTitle">
    <div class="container">
      <div class="section-top reveal"><span class="section-label"><i /> {{ $t('about.label') }}</span><span class="section-top-caption">{{ $t('about.caption') }}</span></div>
      <div class="about-grid">
        <div class="about-heading reveal">
          <h2 id="aboutTitle" class="display-title">{{ $t('about.title1') }}<br>{{ $t('about.title2') }}<br><em>{{ $t('about.title3') }}</em></h2>
          <div class="about-signature"><UiIcon name="asterisk" class="angle-cross" /> {{ $t('about.signature') }}</div>
        </div>
        <div class="about-info reveal delay-1">
          <div class="about-symbol" aria-hidden="true">N<UiIcon name="arrow-up-right" /></div>
          <p class="about-lead">{{ $t('about.lead') }}</p>
          <p class="muted-copy">{{ $t('about.description') }}</p>
          <a class="underline-link" href="#programs">{{ $t('about.link') }} <UiIcon name="arrow-up-right" /></a>
        </div>
      </div>
      <div class="feature-grid">
        <div class="feature reveal"><span class="feature-index">01 /</span><UiIcon name="arrow-up-right" class="feature-icon" /><h3>{{ $t('about.features.self.title') }}</h3><p>{{ $t('about.features.self.text') }}</p></div>
        <div class="feature reveal delay-1"><span class="feature-index">02 /</span><UiIcon name="asterisk" class="feature-icon" /><h3>{{ $t('about.features.body.title') }}</h3><p>{{ $t('about.features.body.text') }}</p></div>
        <div class="feature reveal delay-2"><span class="feature-index">03 /</span><UiIcon name="asterisk" class="feature-icon" /><h3>{{ $t('about.features.rhythm.title') }}</h3><p>{{ $t('about.features.rhythm.text') }}</p></div>
      </div>
    </div>
  </section>
</template>
