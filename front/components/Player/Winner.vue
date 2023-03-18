<template>
  <div class="card">
    <div class="card__container">
      <div class="card__container--infos">
        <h2 class="card__username">
          {{ player.username }}
        </h2>
        <div class="card__color" :style="{ background: colorName.color }"></div>
      </div>
      <h2 class="card__score">{{ player.score }}</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import uniqolor from 'uniqolor';

const { userID } = useStore();
const { game } = useGame();

const { player, isWinner } = defineProps(['player', 'isWinner']);

const colorName: Ref<{ color: string, isLight: boolean }> = ref(uniqolor(player.username));
</script>