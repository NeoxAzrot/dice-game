<template>
  <div>
    <PlayerScore v-for="player in players" :player="player" />
  </div>
</template>

<script setup lang="ts">
const { players } = defineProps(['players']);
</script>