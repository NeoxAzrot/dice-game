<template>
  <div class="card_container">
    <div :style="{ width: '30px', height: '30px', background: colorName.color, borderRadius: '100%' }"></div>
    <div class="card_container--infos">
      <h4>{{ player.username }}</h4>
      <h4 class="color-second">{{ player.score }}</h4>
    </div>
  </div>
</template>

<script setup lang="ts">
import uniqolor from 'uniqolor';

const { player } = defineProps(['player']);

const colorName: Ref<{ color: string, isLight: boolean }> = ref(uniqolor(player.username));
</script>

<style lang="scss">
.card_container {
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: var(--radius--main);
  box-shadow: var(--box-shadow);
  .card_container--infos {
    margin-left: 5px;
  }
}
</style>