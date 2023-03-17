<template>
  <div class="board_container">
    <GameDiceSet @stockDice="stockDice" :dices="diceNumber.board" />
    <div class="board_container--control">
      <button :disabled="disabledLaunch" class="btn" @click="lauchdices">Lancer les dés</button>
      <button :disabled="true" class="btn" @click="lauchdices">Garder le score</button>
    </div>
    <div>
      <GameDiceBank :dices="diceNumber.bank" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Dice {
  value: number,
  allowed: boolean
}

interface ListDice {
  board: Dice[],
  bank: Dice[]
}

const disabledLaunch = computed(() => {
  return diceNumber.value.board.length < 1;
})

const diceNumber: Ref<ListDice> = ref({ board: [{ value: 0, allowed: false }, { value: 0, allowed: false }, { value: 0, allowed: false }, { value: 0, allowed: false }, { value: 0, allowed: false }, { value: 0, allowed: false }], bank: [] });

const lauchdices = () => {
  const listDice = [];

  for (let i = 0; i < diceNumber.value.board.length; i++) {
    listDice.push({ value: Math.floor(Math.random() * 6), allowed: (Math.random() - 0.5) < 0 });
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
  padding: 0.5rem 2rem;
  min-height: 300px;

  .board_container--control {
    display: flex;
    gap: 2rem;

    >.btn {
      white-space: nowrap;
    }
  }
}
</style>