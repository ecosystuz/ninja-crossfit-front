<script setup lang="ts">
defineProps<{
  name: 'arrow-up-right' | 'arrow-down-light' | 'arrow-down-bold' | 'asterisk'
}>()
</script>

<template>
  <span class="ui-icon" :class="`ui-icon--${name}`" aria-hidden="true" />
</template>
