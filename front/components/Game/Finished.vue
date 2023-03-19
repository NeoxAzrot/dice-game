<template>
  <div class="finished">
    <h1>{{ titleFinished }}</h1>
    <div class="finished__players">
      <PlayerEnd v-for="player in game.players" :player="player" :isWinner="player.id === game.winner" />
    </div>
    <button @click="handleCreateGame" class="btn--primary createRoom">
      Start a new game
    </button>
  </div>
</template>

<script setup lang="ts">
const { game, create } = useGame();
const { userID } = useStore();

const titleFinished = computed(() => {
  if(game.value.winner === userID.value) return 'Victory';
  return 'Defeat';
})

const handleCreateGame = async () => {
  create();
};

</script>

<style lang="scss">
.finished {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  position: relative;

  &__players {
    margin: 5rem 0;
    display: flex;
    gap: 5rem;
    align-items: center;
  }

  h1 {
    text-transform: uppercase;
    font-weight: 800;
    font-size: 5rem;
    letter-spacing: -0.2rem;
  }
}
</style>