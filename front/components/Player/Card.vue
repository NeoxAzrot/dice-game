<template>
  <div class="card">
    <div class="card_container">
      <div class="card_container--infos">
        <div :style="{ width: '30px', height: '30px', background: colorName.color, borderRadius: '100%' }"></div>
        <h2>{{ player.username }}</h2>
      </div>
      <h2>score: {{ player.score }}</h2>
    </div>
    <PlayerEmojis />
  </div>
</template>

<script setup lang="ts">
import uniqolor from 'uniqolor';

const { player } = defineProps(['player']);

const colorName: Ref<{ color: string, isLight: boolean }> = ref(uniqolor(player.username));
</script>

<style lang="scss">
.card {
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 10px;
  border-radius: var(--radius--main);
  box-shadow: var(--box-shadow);

  &_container {
    display: flex;
    flex-direction: column;
    gap: 10px;

    &--infos {
      display: flex;
      align-items: center;

      h2 {
        font-size: 2rem;
        margin-left: 10px;
      }
    }
  }
}
</style>