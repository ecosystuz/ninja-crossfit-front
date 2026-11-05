<script setup lang="ts">
const audioElement = ref<HTMLAudioElement | null>(null)
const isPlaying = ref(false)
const isReady = ref(false)

const removeUnlockListeners = () => {
  document.removeEventListener('pointerdown', unlockAudio)
  document.removeEventListener('keydown', unlockAudio)
  document.removeEventListener('touchstart', unlockAudio)
}

const playAudio = async () => {
  const audio = audioElement.value
  if (!audio) return

  try {
    await audio.play()
    isPlaying.value = true
    removeUnlockListeners()
  }
  catch {
    isPlaying.value = false
  }
}

function unlockAudio(event: Event) {
  const target = event.target
  if (target instanceof Element && target.closest('.audio-control')) return
  void playAudio()
}

const toggleAudio = async () => {
  const audio = audioElement.value
  if (!audio) return

  if (audio.paused) await playAudio()
  else {
    audio.pause()
    isPlaying.value = false
  }
}

onMounted(() => {
  const audio = audioElement.value
  if (!audio) return

  audio.volume = 0.4
  void playAudio()

  document.addEventListener('pointerdown', unlockAudio, { passive: true })
  document.addEventListener('keydown', unlockAudio)
  document.addEventListener('touchstart', unlockAudio, { passive: true })
})

onBeforeUnmount(removeUnlockListeners)
</script>

<template>
  <div class="background-audio">
    <audio
      ref="audioElement"
      src="/audio/now-we-are-free.m4a"
      autoplay
      loop
      preload="auto"
      playsinline
      @canplay="isReady = true"
      @play="isPlaying = true"
      @pause="isPlaying = false"
    />
    <button
      class="audio-control"
      :class="{ 'is-playing': isPlaying }"
      type="button"
      :disabled="!isReady"
      :aria-label="$t(isPlaying ? 'audio.pause' : 'audio.play')"
      :title="$t(isPlaying ? 'audio.pause' : 'audio.play')"
      @click="toggleAudio"
    >
      <span class="audio-bars" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
    </button>
  </div>
</template>
