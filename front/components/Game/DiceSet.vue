<template>
  <div>
    <GameDice v-for="(dice, index) in dices" @click="emits('stockDice', index)" :number="dice" />
  </div>
</template>

<script setup lang="ts">
const { dices } = defineProps(['dices']);

const emits = defineEmits(['stockDice']);
</script>