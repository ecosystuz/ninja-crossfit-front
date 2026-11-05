<template>
  <div class="ticker" :aria-label="$t('ticker.aria')">
    <div class="ticker-track" aria-hidden="true">
      <span>{{ $t('ticker.strength') }} <b><UiIcon name="asterisk" /></b> {{ $t('ticker.endurance') }} <b><UiIcon name="asterisk" /></b> {{ $t('ticker.discipline') }} <b><UiIcon name="asterisk" /></b> {{ $t('ticker.progress') }} <b><UiIcon name="asterisk" /></b></span>
      <span>{{ $t('ticker.strength') }} <b><UiIcon name="asterisk" /></b> {{ $t('ticker.endurance') }} <b><UiIcon name="asterisk" /></b> {{ $t('ticker.discipline') }} <b><UiIcon name="asterisk" /></b> {{ $t('ticker.progress') }} <b><UiIcon name="asterisk" /></b></span>
    </div>
  </div>
</template>
