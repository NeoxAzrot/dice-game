<template>
  <div class="bank_container">
    <GameDice
      v-for="(dice, index) in dices"
      :key="`${dice.value}-${index}`"
      @click="removeDice(dice, index)"
      :dice="dice"
    />
  </div>
</template>

<script setup lang="ts">
import { Dice } from '~~/interfaces/game';
const { dices } = defineProps(['dices']);

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
  // min-width: clamp(300px, 60vw, 700px);
  justify-content: center;
}
</style>
