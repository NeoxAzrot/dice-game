<template>
  <GameBoard />
  <RulesInfos />
  <GameScore :players="playerExample" />
  <PlayerCard :player="playerExample[1]" />
</template>

<script setup lang="ts">
const playerExample = [
  { username: 'Sami', score: 1000 },
  { username: 'Leaupe', score: 500 }
]
</script>

<style lang="scss"></style>