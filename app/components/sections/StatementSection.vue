<template>
  <section class="statement-section" :aria-label="$t('statement.aria')">
    <div class="statement-photo" />
    <div class="statement-gradient" />
    <div class="container statement-content reveal">
      <span class="section-label"><i /> {{ $t('statement.label') }}</span>
      <p>{{ $t('statement.line1') }}<br>{{ $t('statement.line2') }}<br><strong>{{ $t('statement.line3') }}</strong></p>
      <a class="button button-outline" href="#apply">{{ $t('statement.cta') }} <UiIcon name="arrow-up-right" /></a>
    </div>
    <span class="statement-vertical">{{ $t('statement.vertical') }}</span>
  </section>
</template>
