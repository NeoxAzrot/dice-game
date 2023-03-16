<template>
  <div class="game_wrapper">
    <div class="game_container">
      <div class="game_container--board">
        <PlayerCard :player="playerExample[0]" />
        <GameBoard />
        <PlayerCard :player="playerExample[1]" />
      </div>
      <div class="game_container--infos">
        <GameScores :players="playerExample" />
        <GameRules />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const playerExample = [
  { username: 'Sami', score: 1000 },
  { username: 'Leaupe', score: 500 }
]
</script>

<style lang="scss">
.game_wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: var(--color--body);

  .game_container {
    display: flex;
    justify-content: center;
    padding: 0 5vw;
    .game_container--board {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-right: 30px;
    }
    .game_container--infos {
      max-width: 250px;
    }
    >*>* {
      margin: 20px 0;
    }
  }
}
</style>