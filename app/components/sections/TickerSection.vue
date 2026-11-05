<template>
  <div class="ticker" :aria-label="$t('ticker.aria')">
    <div class="ticker-track" aria-hidden="true">
      <span>{{ $t('ticker.strength') }} <b>✳</b> {{ $t('ticker.endurance') }} <b>✳</b> {{ $t('ticker.discipline') }} <b>✳</b> {{ $t('ticker.progress') }} <b>✳</b></span>
      <span>{{ $t('ticker.strength') }} <b>✳</b> {{ $t('ticker.endurance') }} <b>✳</b> {{ $t('ticker.discipline') }} <b>✳</b> {{ $t('ticker.progress') }} <b>✳</b></span>
    </div>
  </div>
</template>
