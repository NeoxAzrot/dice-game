<template>
  <div class="dice_container">
    <p>{{ number }}</p>
  </div>
</template>

<script setup lang="ts">
const { number } = defineProps(['number']);
</script>

<style lang="scss">
.dice_container {
  padding: 10px;
  p {
    font-size: large;
  }
}
</style>