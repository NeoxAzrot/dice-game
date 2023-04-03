<template>
  <div class="history" v-if="data.games && data.games > 0">
    <transition>
      <div class="history__modal">
        <div class="history__modal--header">
          <h3>Dernières parties</h3>
        </div>
        <ul>
          <li
            v-for="(game, index) in data.games.slice(
              data.games.length - 5,
              data.games.length
            )"
            :key="index"
          >
            <p class="index">Game {{ index + 1 }}</p>
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

console.log(userID);

const { data } = await useRoom().getGames();

console.log(data);
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
