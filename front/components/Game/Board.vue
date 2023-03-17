<template>
  <div class="board_container">
    <GameDiceSet @stockDice="stockDice" :dices="useGame().game.value.dices" />
    <div class="board_container--control">
      <button :disabled="disabledLaunch" class="btn" @click="launchdices">Lancer les dés</button>
      <button :disabled="true" class="btn" @click="">Garder le score</button>
    </div>
    <div>
      <GameDiceBank :dices="diceNumber.bank" />
    </div>
    <div class="board_container--infos" v-if="message">
      <p class="board_container--infos-error">
        <WarningIcon />{{ message }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Combinaison, ListDice } from '~~/interfaces/game.interfaces';
import WarningIcon from '~/assets/icons/warning.svg';

const message: Ref<string | undefined> = ref();

const currentCombinations: Ref<Combinaison[] | undefined> = ref(undefined);

const disabledLaunch = computed(() => {
  return diceNumber.value.board.length < 1;
})

const diceNumber: Ref<ListDice> = ref({
  board: [{ value: 0, isLocked: true }, { value: 1, isLocked: true }, { value: 1, isLocked: true }, { value: 1, isLocked: true }, { value: 1, isLocked: true }, { value: 1, isLocked: true }], bank: []
});

const launchdices = async () => {
  const res = await useGame().play('roll', diceNumber.value.bank.map(e => e.value)).catch(err => message.value = err.response._data.message);

  currentCombinations.value = res.data.combinations;
  diceNumber.value.board = res.data.dices;
}

const stockDice = (number: number) => {
  diceNumber.value.bank.push(...diceNumber.value.board.slice(number, number + 1));
  diceNumber.value.board.splice(number, 1);

  const score = getScore(diceNumber.value.bank.map(e => e.value), currentCombinations.value!);

  console.log(score);

  useFirebase().update('games', useGame().game.value.id, { players: [...useGame().game.value.players.map((e: { id: string | null; displayScore: number; }) => { return { ...e, displayScore: e.id === useStore().userID.value ? e.displayScore + score : e.displayScore } })] })
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

  &--infos {
    &-error {
      color: #ff0000;
      font-size: 1.4rem;
      letter-spacing: normal;
      display: flex;
      align-items: center;
      gap: 1rem;

      svg {
        width: 1.6rem;
        height: 1.6rem;
      }
    }
  }

  .board_container--control {
    display: flex;
    gap: 2rem;

    >.btn {
      white-space: nowrap;
    }
  }
}
</style>