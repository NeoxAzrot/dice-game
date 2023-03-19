<template>
  <div class="score_container">
    <h4>{{ player.username }}</h4>
    <h4>{{ player.displayScore }}</h4>
  </div>
</template>

<script setup lang="ts">
const { player } = defineProps(['player']);
</script>

<style lang="scss">
.score_container {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  padding: 8px 0;
}
</style>
