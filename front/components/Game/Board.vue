<template>
  <div class="board_container">
    <GameDiceSet @stockDice="stockDice" :dices="diceNumber.board" />
    <div class="board_container--control">
      <div class="btn" @click="lauchdices">Lancer les des</div>
      <div class="btn" @click="lauchdices">Garder le score</div>
    </div>
    <div>
      <h2>Des gardees</h2>
      <GameDiceBank :dices="diceNumber.bank" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface ListDice {
  board: Number[],
  bank: Number[]
}

const diceNumber: Ref<ListDice> = ref({ board: [0, 0, 0, 0, 0, 0], bank: [] });

const lauchdices = () => {
  const listDice = [];

  for (let i = 0; i < diceNumber.value.board.length; i++) {
    listDice.push(Math.floor(Math.random() * 6));
  }

  diceNumber.value.board = listDice;
}

const stockDice = (number: number) => {
  diceNumber.value.bank.push(...diceNumber.value.board.slice(number, number + 1));
  diceNumber.value.board.splice(number, 1);
}
</script>

<style lang="scss">
.board_container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 5px 20px;
  border-radius: var(--radius--main);
  box-shadow: var(--box-shadow);
  .board_container--control {
    display: flex;
    gap: 20px;
    >.btn {
      white-space: nowrap;
    }
  }
}
</style>