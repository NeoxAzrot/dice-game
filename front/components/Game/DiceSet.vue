<template>
  <div class="set_container">
    <GameDice v-for="(dice, index) in dices" @click="stockDice(dice, index)" :dice="dice" />
  </div>
</template>

<script setup lang="ts">
import { Dice } from '~~/interfaces/game.interfaces';

const { dices } = defineProps(['dices']);

const emits = defineEmits(['stockDice']);

const stockDice = (dice: Dice, index: number) => {
  if (dice.isLocked) return;

  emits('stockDice', index);
}
</script>

<style lang="scss">
.set_container {
  display: flex;
  padding: 30px 50px;
  min-width: clamp(300px, 60vw, 700px);
  justify-content: center;
}
</style>