<template>
  <div class="bank_container">
    <GameDice @click="" v-for="dice in dices" :dice="dice" />
  </div>
</template>

<script setup lang="ts">
const { dices } = defineProps(['dices']);

defineEmits(['stockDice']);
</script>

<style lang="scss">
.bank_container {
  display: flex;
  padding: 30px 50px;
  // min-width: clamp(300px, 60vw, 700px);
  justify-content: center;
}
</style>