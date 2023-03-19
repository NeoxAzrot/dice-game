<template>
  <p v-if="game.state.gameStatus === 'playing'" class="timer">
    {{ timer }}
  </p>
  <p v-else-if="game.state.gameStatus === 'finished'" class="timer">
    The game lasted {{ timerEnd }}
  </p>
</template>

<script setup lang="ts">
const { game } = useGame();

const timer = ref();

const timerEnd = computed(() => {
  const time = game.value.finishedAt - game.value.startedAt;
  const actualTimer = getTimer(time);

  return actualTimer.minutes + ':' + actualTimer.seconds;
});

const updateTimer = () => {
  const actualTime = new Date().getTime();
  const time = actualTime - game.value.startedAt;
  const actualTimer = getTimer(time);

  timer.value = actualTimer.minutes + ':' + actualTimer.seconds;

  window.requestAnimationFrame(updateTimer);
};

onMounted(() => {
  updateTimer();
});
</script>
