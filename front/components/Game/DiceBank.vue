<template>
  <div>
    <GameDice @click="" v-for="dice in dices" :number="dice" />
  </div>
</template>

<script setup lang="ts">
const { dices } = defineProps(['dices']);

defineEmits(['stockDice']);
</script>