<template>
  <div class="set_container">
    <!-- TODO: Revoir les isLocked des dés avec la box shadow (:key list) -->
    <GameDice
      v-for="(dice, index) in dices"
      :key="`${dice.value}-${index}`"
      @click="stockDice(dice, index)"
      :dice="dice"
    />
  </div>
</template>

<script setup lang="ts">
import { Dice } from '~~/interfaces/game';

const { dices } = defineProps(['dices']);
const { game } = useGame();
const { userID } = useStore();

const emits = defineEmits(['stockDice']);

const stockDice = (dice: Dice, index: number) => {
  if (dice.isLocked || game.value.state.turn !== userID.value) return;

  emits('stockDice', index);
};
</script>

<style lang="scss">
.set_container {
  display: flex;
  padding: 30px 50px;
  justify-content: center;
}
</style>
