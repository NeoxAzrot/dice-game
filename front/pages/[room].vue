<template>
  <div>
    <RoomWaiter v-if="!game || game.state.gameStatus === 'waiting'" />
    <GameViewer v-else-if="game.state.gameStatus === 'playing'" />
    <GameFinished v-else />
  </div>
</template>

<script setup lang="ts">
const { game } = useGame();

useHead({
  title: 'Diceex game - Room',
});

definePageMeta({
  layout: 'room',
});
</script>
