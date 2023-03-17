<template>
  <div>
    <RoomWaiter v-if="!game || game.state.gameStatus === 'waiting'" />
    <GameViewer v-else />
  </div>
</template>

<script setup lang="ts">
const { game } = useGame();
const { room } = useRoom();

definePageMeta({
  layout: 'room',
})
</script>