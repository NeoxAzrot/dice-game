<template>
  <div class="history" v-if="data.games && data.games.length > 0">
    <transition>
      <div class="history__modal">
        <div class="history__modal--header">
          <h3>Last 5 games</h3>
        </div>
        <ul>
          <li
            v-for="(game, index) in data.games.slice(
              Math.max(data.games.length - 5, 0)
            )"
            :key="game.id"
          >
            <p class="index">Game {{ getGameNumber(index) }}</p>
            <p class="winner">{{ game.winner.username }}</p>
            <p class="result">{{ userID === game.winner.id ? '🏆' : '💀' }}</p>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
const { userID } = useStore();

const { data } = await useRoom().getGames();

const getGameNumber = (index: number) => {
  if (data.games.length < 5) return index + 1;

  return data.games.length - 5 + index + 1;
};
</script>

<style lang="scss">
.history {
  &__modal {
    --color--tr: rgba(28, 28, 29, 0.3);
    --color--bl: #353661;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border: 2px solid var(--color--bl);
    padding: 2rem;

    &--header {
      display: flex;
      align-items: center;
      margin-bottom: 2rem;
      text-align: start;
    }

    ul {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      li {
        display: grid;
        flex-direction: column;
        gap: 0.4rem;
        justify-content: space-between;
        position: relative;
        grid-template-areas:
          'index result'
          'winner result';

        .index {
          grid-area: index;
        }

        .winner {
          grid-area: winner;
          font-size: 1.2rem;
          opacity: 0.6;
        }

        .result {
          grid-area: result;
        }
      }
    }
  }
}
</style>
