<template>
  <h1>BJ</h1>
  <PlayerWinner v-for="player in game.players" :player="player" :isWinner="player.id === game.winner" />
  <button @click="handleCreateGame" class="btn--primary createRoom">
    Start a new game
  </button>
</template>

<script setup lang="ts">
const { game, create } = useGame();

const handleCreateGame = async () => {
  create();
};

</script>