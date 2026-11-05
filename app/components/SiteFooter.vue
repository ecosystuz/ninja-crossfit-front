<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer id="contact" class="site-footer">
    <div class="container">
      <div class="footer-main">
        <div>
          <a class="brand footer-brand" href="#home">
            <BrandLogo />
          </a>
          <p>{{ $t('footer.tagline') }}</p>
        </div>
        <div class="footer-social">
          <span>{{ $t('footer.instagram') }}</span>
          <a href="https://www.instagram.com/ninjacrossfit1/" target="_blank" rel="noopener noreferrer">@NINJACROSSFIT1 <UiIcon name="arrow-up-right" /></a>
          <a href="https://www.instagram.com/khayotov_x/" target="_blank" rel="noopener noreferrer">@KHAYOTOV_X <UiIcon name="arrow-up-right" /></a>
        </div>
        <a class="footer-back" href="#home" :aria-label="$t('footer.back')"><UiIcon name="arrow-down-bold" class="icon-rotate-180" /></a>
      </div>
      <div class="footer-bottom">
        <span>© {{ currentYear }} NINJA CROSSFIT. {{ $t('footer.rights') }}</span>
        <span>{{ $t('footer.values') }}</span>
        <a
          class="footer-credit"
          href="https://heavy-works-200855.framer.app/"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="$t('footer.creditAria')"
        >
          {{ $t('footer.madeBy') }} <strong>ECOSYST IT GROUP</strong>
          <UiIcon name="arrow-up-right" />
        </a>
      </div>
    </div>
  </footer>
</template>
