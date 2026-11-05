<template>
  <section id="coach" class="section coach-section" aria-labelledby="coachTitle">
    <div class="container">
      <div class="section-top reveal"><span class="section-label"><i /> {{ $t('coach.label') }}</span><span class="section-top-caption">{{ $t('coach.caption') }}</span></div>
      <div class="coach-grid">
        <div class="coach-visual reveal">
          <div class="coach-graphic">
            <div class="coach-photo-stack" role="img" :aria-label="$t('coach.galleryAria')">
              <div class="coach-photo coach-photo-one" />
              <div class="coach-photo coach-photo-two" />
              <div class="coach-photo-shade" />
            </div>
            <div class="coach-graphic-grid" />
            <span class="coach-corner coach-corner-top">NC / 001</span>
            <span class="coach-corner coach-corner-bottom">TEAM NINJA</span>
            <div class="coach-slider-status" aria-hidden="true">
              <span>01</span>
              <div class="coach-slide-track"><i /><i /></div>
              <span>02</span>
            </div>
          </div>
          <div class="coach-badge"><span class="coach-badge-star">✳</span><span>{{ $t('coach.badge') }}</span></div>
        </div>
        <div class="coach-copy reveal delay-1">
          <span class="coach-kicker"><span /> {{ $t('coach.kicker') }}</span>
          <h2 id="coachTitle" class="display-title">{{ $t('coach.title1') }}<br><em>{{ $t('coach.title2') }}</em></h2>
          <p class="coach-lead">{{ $t('coach.lead') }}</p>
          <div class="coach-divider" />
          <div class="coach-social"><span>{{ $t('coach.profile') }}</span><a href="https://www.instagram.com/khayotov_x/" target="_blank" rel="noopener noreferrer" :aria-label="$t('coach.profileAria')">@KHAYOTOV_X <span>↗</span></a></div>
          <a class="button button-accent" href="#apply">{{ $t('coach.cta') }} <span>↗</span></a>
        </div>
      </div>
    </div>
  </section>
</template>
