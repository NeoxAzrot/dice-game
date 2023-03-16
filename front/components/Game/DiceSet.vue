<template>
  <div class="set_container">
    <GameDice v-for="(dice, index) in dices" @click="emits('stockDice', index)" :number="dice" />
  </div>
</template>

<script setup lang="ts">
const { dices } = defineProps(['dices']);

const emits = defineEmits(['stockDice']);
</script>

<style lang="scss">
.set_container {
  display: flex;
  padding: 30px 50px;
}
</style>