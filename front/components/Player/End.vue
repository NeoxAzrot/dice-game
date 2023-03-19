<template>
  <div class="playerend" :class="isWinner && 'isWinner'">
    <div class="playerend__container">
      <div class="playerend__color" :style="{ background: colorName.color }"></div>
      <h2 class="playerend__username">
        {{ player.username }}
      </h2>
      <h2 class="playerend__score">{{ player.score }}</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import uniqolor from 'uniqolor';

const { player, isWinner } = defineProps(['player', 'isWinner']);

const colorName: Ref<{ color: string, isLight: boolean }> = ref(uniqolor(player.username));
</script>

<style lang="scss">
.playerend {
  justify-content: space-between;
  gap: 5rem;
  padding: 1rem;
  border-radius: var(--radius--main);
  position: relative;
  opacity: 0.7;

  &__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
  }

  &__color {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
  }

  &__username {
    font-size: 2.2rem;
    font-weight: 400;
  }

  &__score {
    font-size: 2rem;
    opacity: 0.7;
  }

  &.isplayerend {
    opacity: 1;
    border: 2px solid white;
  }
}
</style>