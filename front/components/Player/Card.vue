<template>
  <div style="display: flex;">
    <div :style="{ width: '40px', height: '40px', background: colorName.color, borderRadius: '100%' }"></div>
    <h4>{{ player.username }}</h4>
  </div>
</template>

<script setup lang="ts">
import uniqolor from 'uniqolor';

const { player } = defineProps(['player']);

const colorName: Ref<{ color: string, isLight: boolean }> = ref(uniqolor(player.username));
</script> 