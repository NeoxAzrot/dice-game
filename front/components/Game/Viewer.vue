<template>
  <div class="game_wrapper">
    <div class="game_header" style="filter: invert();">
      <img src="../../assets/diceex.png" alt="">
    </div>
    <div class="game_container">
      <div class="game_container--players">
        <PlayerCard :player="playerExample[1]" />
        <PlayerCard :player="playerExample[0]" />
      </div>
      <div class="game_container--board">
        <GameBoard />
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
  { username: 'Paul', score: 500 }
]
</script>

<style lang="scss">
.game_wrapper {
  width: 100%;
  height: 100vh;
  background-color: var(--color--body);

  .game_header {
    padding: 30px 0;
    display: flex;
    justify-content: center;
  }

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
}</style>