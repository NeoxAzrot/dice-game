<template>
  <div>
    <GameDiceSet @stockDice="stockDice" :dices="diceNumber.board" />
    <div @click="lauchdices">Lancer les des</div>
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