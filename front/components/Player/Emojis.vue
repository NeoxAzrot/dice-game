<template>
  <div class="emoji">
    <div
      class="emoji__container"
      :class="{ active: userID === player.id }"
      @click="showSelector = !showSelector"
    >
      {{ player.reaction || '😌' }}
    </div>
    <div
      class="emoji__selector"
      v-if="userID === player.id"
      v-show="showSelector"
    >
      <button
        v-for="emoji in listEmojis"
        :key="emoji"
        class="emoji__selector__button"
        :class="{ active: player.reaction === emoji }"
        @click="handleReaction(emoji)"
      >
        {{ emoji }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const listEmojis = ['😌', '😡', '🥸', '🫥', '💩', '🤮'];

const { player } = defineProps(['player']);
const { userID } = useStore();
const { game } = useGame();

const showSelector = ref(false);

const handleReaction = (emote: string) => {
  useFirebase().update('games', game.value.id, {
    players: [
      ...game.value.players.map(
        (e: { id: string | null; displayScore: number; reaction: string }) => {
          return {
            ...e,
            reaction: e.id === userID.value ? emote : e.reaction,
          };
        }
      ),
    ],
  });

  showSelector.value = false;
};
</script>

<style lang="scss">
.emoji {
  font-size: 3rem;
  position: relative;

  &__container {
    cursor: default;

    &.active {
      cursor: pointer;
    }
  }

  &__selector {
    display: flex;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 200%;
    align-items: center;
    gap: 1rem;

    &__button {
      width: auto;
      height: auto;
      min-width: unset;
      padding: 0.1rem;
      background: transparent;
      font-size: 1.7rem;
    }
  }
}
</style>
