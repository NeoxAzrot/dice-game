<template>
  <div class="playerend" :class="isWinner && 'isWinner'">
    <div class="playerend__container">
      <h2 class="playerend__username">
        {{ player.username }}
      </h2>
      <h2 class="playerend__score">{{ currentScore }}</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import uniqolor from 'uniqolor';

const { player, isWinner } = defineProps(['player', 'isWinner']);

const currentScore = ref(0)

onMounted(() => {
  const interval = setInterval(() => {
    if (currentScore.value < player.score) {
      currentScore.value += 10;
    } else {
      clearInterval(interval);
    }
  }, 2000 / player.score);
})

const colorName: Ref<{ color: string, isLight: boolean }> = ref(uniqolor(player.username));
</script>

<style lang="scss">
.playerend {
  justify-content: space-between;
  gap: 5rem;
  padding: 1rem;
  border-radius: var(--radius--main);
  position: relative;

  &.isWinner {
    animation: goIn .5s ease-in forwards;

    @keyframes goIn {
      0% {
        transform: scale(1);
      }
      100% {
        transform: scale(1.5);
      }
    }
  }

  &:not(.isWinner) {
    opacity: 0.5;
  }

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
    color: white;
  }

  &__score {
    font-size: 2rem;
    opacity: 0.7;
    font-weight: 100;
  }

  &.isplayerend {
    opacity: 1;
    border: 2px solid white;
  }
}
</style>