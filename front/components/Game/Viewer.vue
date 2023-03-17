<template>
  <div class="game">
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
.game {
  width: 100%;
  height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  z-index: 1;

  &_header {
    padding: 30px 0;
    display: flex;
    justify-content: center;
  }

  &_container {
    display: flex;
    justify-content: center;
    gap: 50px;
    padding: 0 5vw;
    flex-grow: 1;

    &--player {

    }

    &--board {
      display: flex;
      align-items: center;
      margin-right: 30px;
    }

    &--infos {
      max-width: 250px;
    }

    >*>* {
      margin: 20px 0;
    }
  }
}</style>