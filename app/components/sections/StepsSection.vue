<template>
  <section class="steps-section section" aria-labelledby="stepsTitle">
    <div class="container">
      <div class="section-top reveal"><span class="section-label"><i /> {{ $t('steps.label') }}</span><span class="section-top-caption">{{ $t('steps.caption') }}</span></div>
      <h2 id="stepsTitle" class="display-title reveal">{{ $t('steps.title1') }}<br><em>{{ $t('steps.title2') }}</em></h2>
      <div class="steps-grid">
        <div class="step reveal"><div class="step-number">01<span>↗</span></div><h3>{{ $t('steps.items.apply.title') }}</h3><p>{{ $t('steps.items.apply.text') }}</p></div>
        <div class="step reveal delay-1"><div class="step-number">02<span>↗</span></div><h3>{{ $t('steps.items.days.title') }}</h3><p>{{ $t('steps.items.days.text') }}</p></div>
        <div class="step reveal delay-2"><div class="step-number">03<span>↗</span></div><h3>{{ $t('steps.items.start.title') }}</h3><p>{{ $t('steps.items.start.text') }}</p></div>
      </div>
    </div>
  </section>
</template>
