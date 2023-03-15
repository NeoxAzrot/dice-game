<template>
  <div>
    <p>{{ number }}</p>
  </div>
</template>

<script setup lang="ts">
const { number } = defineProps(['number']);
</script>