<template>
  <div class="card">
    <div class="card__container" :class="player.id === game.state.turn && 'isTurn'">
      <div class="card__container--infos">
        <h2 class="card__username">{{ player.username }}<strong v-if="player.id === userID"> (you)</strong></h2>
        <div class="card__color" :style="{ background: colorName.color }"></div>
      </div>
      <h2 class="card__score">{{ player.score }}</h2>
    </div>
    <PlayerEmojis :player="player" />
  </div>
</template>

<script setup lang="ts">
import uniqolor from 'uniqolor';

const { player } = defineProps(['player']);
const { userID } = useStore()
const { game } = useGame()

const colorName: Ref<{ color: string, isLight: boolean }> = ref(uniqolor(player.username));
</script>

<style lang="scss">
.card {
  display: flex;
  justify-content: space-between;
  gap: 5rem;
  padding: 1rem 1rem 1rem 0;
  border-radius: var(--radius--main);
  position: relative;

  &__container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    &.isTurn {
      border-left: 5px solid var(--color--second);
      padding-left: 1rem;
    }

    &--infos {
      display: flex;
      gap: 1rem;
      align-items: center;
    }
  }

  &__color {
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
  }

  h2 {
  
  }

  &__username {
    font-size: 1.6rem;
    font-weight: 400;
  }

  &__score {
    font-size: 1.4rem;
    opacity: 0.7;
  }

  &__turn {
    position: absolute;
    left: 102%;
    top: 0;
    bottom: 0;
    margin: auto;
    height: fit-content;
  }
}
</style>