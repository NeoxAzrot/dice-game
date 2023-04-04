<template>
  <div class="bank_container">
    <GameDice
      v-for="(dice, index) in game.bank"
      :key="`${dice.value}-${index}`"
      @click="removeDice(dice, index)"
      :dice="dice"
    />
  </div>
</template>

<script setup lang="ts">
import { Dice } from '~~/interfaces/game';

const { game } = useGame();
const { userID } = useStore();

const emits = defineEmits(['removeDice']);

const removeDice = (dice: Dice, index: number) => {
  if (dice.isLocked || game.value.state.turn !== userID.value) return;

  emits('removeDice', index);
};
</script>

<style lang="scss">
.bank_container {
  display: flex;
  padding: 30px 50px;
  justify-content: center;
}
</style>
