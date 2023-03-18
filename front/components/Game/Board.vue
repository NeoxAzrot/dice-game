<template>
  <div class="board_container">
    <h2>{{ game.roundScore }}</h2>
    <GameDiceSet @stockDice="(e) => updateDices(e, 'stock')" :dices="game.dices" />
    <div class="board_container--control">
      <button :disabled="disabledLaunch" class="btn" @click="launchDices">
        Lancer les dés
      </button>
      <button :disabled="disabledKeep" class="btn" @click="keepDices">Garder le score</button>
    </div>
    <div>
      <GameDiceBank @removeDice="(e) => updateDices(e, 'remove')" :dices="game.bank" />
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

const { userID } = useStore()
const { game, play } = useGame();

let oldRoundScore = 0;

const disabledLaunch = computed(() => {
  return game.value.state.turn !== userID.value;
});

const disabledKeep = computed(() => {
  return game.value.state.turn !== userID.value || game.value.dices.length === 0;
})

const launchDices = async () => {
  oldRoundScore = game.value.roundScore;

  play(
    'roll',
    game.value.bank.map((e: any) => e.value)
  )
    .catch((err) => (message.value = err.response));
};

const keepDices = async () => {
  oldRoundScore = 0;

  play(
    'hold',
    game.value.bank.map((e: any) => e.value)
  )
    .catch((err) => (message.value = err.response));
}

const updateDices = (number: number, type: 'stock' | 'remove') => {
  let newBoard, newBank;

  switch (type) {
    case 'stock':
      newBoard = game.value.dices.filter((e: any, i: number) => i !== number);
      newBank = game.value.bank.concat(game.value.dices[number]);
      break;
    case 'remove':
      newBank = game.value.bank.filter((e: any, i: number) => i !== number);
      newBoard = game.value.dices.concat(game.value.bank[number]);
      break;
  }

  const score = getScore(
    newBank.filter((e: any) => !e.isLocked).map((e: any) => e.value),
    game.value.combinations
  );

  useFirebase().update('games', game.value.id, {
    roundScore: oldRoundScore + score,
    dices: newBoard,
    bank: newBank,
  });
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
