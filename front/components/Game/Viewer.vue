<template>
  <div class="game">
    <div class="game_container">
      <div class="game_container--players">
        <PlayerCard v-for="player in game.players" :player="player" />
      </div>
      <div class="game_container--board">
        <GameBoard />
      </div>
      <div class="game_container--infos">
        <GameRules />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { game } = useGame();
</script>

<style lang="scss">
.game {
  width: var(--container--max-width);
  height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  z-index: 1;

  &_container {
    display: flex;
    justify-content: space-between;
    gap: 50px;
    padding: 2rem 0;
    flex-grow: 1;

    &--board {
      display: flex;
      align-items: center;
      margin-right: 30px;
    }

    &--infos {
      max-width: 250px;
    }

    > * > * {
      margin: 20px 0;
    }
  }
}</style>