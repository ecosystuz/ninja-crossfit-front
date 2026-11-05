<script setup lang="ts">
const yandexMapUrl = 'https://yandex.uz/maps/org/mamont/181828538106/?ll=64.455411%2C39.759678&z=17.09'
const googleMapUrl = 'https://www.google.com/maps/place/Mamont+Fit/@39.7584626,64.4541271,17z/data=!3m1!4b1!4m6!3m5!1s0x3f50050043a2bf4d:0xabf3358096c8e8e!8m2!3d39.7584585!4d64.4567074!16s%2Fg%2F11njsh7gjf?entry=ttu&g_ep=EgoyMDI2MTEwMi4wIKXMDSoASAFQAw%3D%3D'
const mapEmbedUrl = 'https://yandex.uz/map-widget/v1/?ll=64.455411%2C39.759678&z=17.09&l=map&pt=64.4567074%2C39.7584585%2Cpm2rdm'
</script>

<template>
  <section id="location" class="location-section section" aria-labelledby="locationTitle">
    <div class="container">
      <div class="section-top reveal">
        <span class="section-label"><i /> {{ $t('location.label') }}</span>
        <span class="section-top-caption">{{ $t('location.caption') }}</span>
      </div>

      <div class="location-heading-row">
        <h2 id="locationTitle" class="display-title reveal">
          {{ $t('location.title1') }}<br><em>{{ $t('location.title2') }}</em>
        </h2>
        <p class="reveal delay-1">{{ $t('location.intro') }}</p>
      </div>

      <div class="location-grid reveal">
        <div class="location-map">
          <iframe
            :src="mapEmbedUrl"
            :title="$t('location.mapTitle')"
            loading="lazy"
            allowfullscreen
            referrerpolicy="no-referrer-when-downgrade"
          />
          <div class="location-coordinate-pill" aria-hidden="true">
            <span /> 39.758458 · 64.456707
          </div>
        </div>

        <div class="location-card">
          <div class="location-card-top">
            <div class="location-pin" aria-hidden="true"><span /></div>
            <span class="location-index">05 / 06</span>
          </div>

          <div>
            <span class="location-kicker">{{ $t('location.addressLabel') }}</span>
            <h3>{{ $t('location.venue') }}</h3>
            <p class="location-city">{{ $t('location.city') }}</p>
            <p class="location-description">{{ $t('location.description') }}</p>
          </div>

          <div class="location-details">
            <span>{{ $t('location.coordinatesLabel') }}</span>
            <strong>39.758458, 64.456707</strong>
          </div>

          <div class="location-actions">
            <a class="location-map-link location-map-link-primary" :href="yandexMapUrl" target="_blank" rel="noopener noreferrer">
              <span>Y</span>
              {{ $t('location.yandex') }}
              <b aria-hidden="true">↗</b>
            </a>
            <a class="location-map-link" :href="googleMapUrl" target="_blank" rel="noopener noreferrer">
              <span>G</span>
              {{ $t('location.google') }}
              <b aria-hidden="true">↗</b>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
