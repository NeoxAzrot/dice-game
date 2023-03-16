<template>
  <div class="scores_container">
    <PlayerScore v-for="player in players" :player="player" />
  </div>
</template>

<script setup lang="ts">
const { players } = defineProps(['players']);
</script>

<style lang="scss">
.scores_container {
  display: flex;
  flex-direction: column;
  padding: 5px 20px;
  border-radius: var(--radius--main);
  box-shadow: var(--box-shadow);
  >*:not(:last-child) {
    position: relative;
    &::after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: -0px;
      height: 1px;
      background: rgba(#ffffff, 0.5);
    }
  }
}
</style>