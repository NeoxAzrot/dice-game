<template>
  <div class="board_container">
    <GameDiceSet @stockDice="stockDice" :dices="game.dices" />
    <div class="board_container--control">
      <button :disabled="disabledLaunch" class="btn" @click="launchdices">Lancer les dés</button>
      <button :disabled="true" class="btn" @click="">Garder le score</button>
    </div>
    <div>
      <GameDiceBank :dices="game.bank" />
    </div>
    <div class="board_container--infos" v-if="message">
      <p class="board_container--infos-error">
        <WarningIcon />{{ message }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import WarningIcon from '~/assets/icons/warning.svg';

const message: Ref<string | undefined> = ref();

const { game } = useGame();
  
const disabledLaunch = computed(() => {
  return game.value.dices.length < 1;
})

const launchdices = async () => {
  useGame().play('roll', game.value.bank.map((e: any) => e.value))
  .catch(err => message.value = err.response)
}

const stockDice = (number: number) => {
  const newBoard = game.value.dices.filter((e: any, i: number) => i !== number);
  const newBank = game.value.bank.concat(game.value.dices[number]);

  const score = getScore(game.value.bank.map((e: any) => e.value), game.value.combinations!);
  console.log(score);
  
  useFirebase().update('games', useGame().game.value.id, {
    players: [...useGame().game.value.players.map((e: { id: string | null; displayScore: number; }) => {
      return { ...e,
        displayScore: e.id === useStore().userID.value ? e.displayScore + score : e.displayScore
      }
    })],
    dices: newBoard,
    bank: newBank
  })
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