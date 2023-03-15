<template>
  <div>
    <h4>{{ player.username }}<span>: {{ player.score }}</span></h4>
  </div>
</template>

<script setup lang="ts">
const { player } = defineProps(['player']);
</script>