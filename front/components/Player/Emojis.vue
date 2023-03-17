<template>
  <div class="emoji">
    <div class="emoji_container">{{ getLastOneUsed }}</div>
  </div>
</template>

<script setup lang="ts">
const listEmojis = ['😡', '🥸', '🫥', '💩', '🤮'];

const getLastOneUsed = computed(() => {
  return listEmojis[0];
})
</script>

<style lang="scss">
.emoji {
  font-size: 3rem;
}
</style>