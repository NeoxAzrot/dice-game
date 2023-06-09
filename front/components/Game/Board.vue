<template>
  <div class="board_container">
    <h2>{{ game.roundScore }}</h2>
    <GameDiceSet
      @stockDice="(e) => updateDices(e, 'stock')"
      :dices="game.dices"
    />
    <div class="board_container--control">
      <button
        :disabled="disabledLaunch || launch"
        class="btn--secondary"
        :class="{ disabled: disabledLaunch, waiting: launch }"
        @click="launchDices"
      >
        Lancer les dés
      </button>
      <button
        :disabled="disabledKeep || keep"
        class="btn--secondary"
        :class="{ disabled: disabledKeep, waiting: keep }"
        @click="keepDices"
      >
        Garder le score
      </button>
    </div>
    <div>
      <GameDiceBank @removeDice="(e) => updateDices(e, 'remove')" />
    </div>
    <div class="board_container--infos" v-if="message">
      <p class="board_container--infos-error"><WarningIcon />{{ message }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import WarningIcon from '~/assets/icons/warning.svg';

const message: Ref<string | undefined> = ref();

const { userID } = useStore();
const { game, play } = useGame();

const launch = ref<boolean>(false);
const keep = ref<boolean>(false);

let oldRoundScore = 0;

watch(
  () => message.value,
  () => {
    if (message.value) {
      setTimeout(() => {
        message.value = undefined;
      }, 3000);
    }
  }
);

const disabledLaunch = computed(() => {
  if (game.value.state.turn !== userID.value) return true;
  if (
    game.value.dices.length !== 0 &&
    game.value.bank.filter((e: any) => !e.isLocked).length === 0
  )
    return true;

  const newBank = game.value.bank.filter((e: any) => !e.isLocked);

  if (getPairNumbers(newBank.map((e: any) => e.value)) === 3) return false;

  if (
    newBank.find((e: any) => e.value === 1) &&
    newBank.find((e: any) => e.value === 2) &&
    newBank.find((e: any) => e.value === 3) &&
    newBank.find((e: any) => e.value === 4) &&
    newBank.find((e: any) => e.value === 5) &&
    newBank.find((e: any) => e.value === 6)
  )
    return false;

  for (let i = 1; i <= 6; i++) {
    const newDices = newBank
      .filter((dice: any) => dice.value === i)
      .map((e: any) => e.value);
    const score = getCombinationScore(newDices, game.value.combinations);

    if (newDices.length > 0 && score === 0) return true;
  }

  return false;
});

const disabledKeep = computed(() => {
  return (
    game.value.state.turn !== userID.value ||
    (game.value.dices.length === 0 && game.value.roundScore === 0)
  );
});

const launchDices = async () => {
  launch.value = true;
  oldRoundScore = game.value.roundScore;

  const newDices = game.value.dices;

  if (newDices.length > 0) {
    play(
      'roll',
      game.value.bank.map((e: any) => e.value)
    )
      .then((res) => (message.value = res.message))
      .catch((err) => (message.value = err.response._data.message));
  } else {
    await useFirebase().update('games', game.value.id, {
      bank: [],
    });

    play(
      'roll',
      game.value.bank.map((e: any) => e.value)
    )
      .then((res) => (message.value = res.message))
      .catch((err) => (message.value = err.response._data.message));
  }

  launch.value = false;
};

const keepDices = async () => {
  keep.value = true;

  oldRoundScore = game.value.roundScore;

  const newBank = game.value.bank.filter((e: any) => !e.isLocked);

  if (newBank.length === 0) {
    const newBoard = game.value.dices.filter((e: any) => e.isLocked);
    const playableDices = game.value.dices.filter((e: any) => !e.isLocked);

    const score = getBankScore(
      playableDices.filter((e: any) => !e.isLocked).map((e: any) => e.value),
      game.value.combinations
    );

    await useFirebase().update('games', game.value.id, {
      roundScore: oldRoundScore + score,
      dices: newBoard,
      bank: [...game.value.bank, ...playableDices],
    });

    play('hold')
      .then((res) => (message.value = res.message))
      .catch((err) => (message.value = err.response._data.message));
  } else {
    play('hold')
      .then((res) => (message.value = res.message))
      .catch((err) => (message.value = err.response._data.message));
  }

  keep.value = false;
};

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

  const score = getBankScore(
    newBank.filter((e: any) => !e.isLocked).map((e: any) => e.value),
    game.value.combinations
  );

  useFirebase().update('games', game.value.id, {
    roundScore: oldRoundScore + score,
    dices: newBoard,
    bank: newBank,
  });
};
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

    > .btn {
      white-space: nowrap;
    }
  }
}
</style>
