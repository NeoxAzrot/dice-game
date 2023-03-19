<template>
  <div class="layout ranking">
    <div class="layout__container">
      <ul class="ranking__list">
        <li>
          <p>Username</p>
          <p>Games</p>
          <p>Wins</p>
          <p>Winrate</p>
        </li>
        <li v-for="user in users">
          <p>{{ user.username }}</p>
          <p>{{ user.allGames }}</p>
          <p>{{ user.wins }}</p>
          <p>{{ user.winRate + '%' }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Diceex game - Ranking',
});

const { data: users } = useAsyncData('users', async () => {
  return fetch(`${useRuntimeConfig().public.API_ENDPOINT}/ranks`)
    .then((res) => res.json())
    .then((res) => res.data.ranks);
});
</script>

<style lang="scss" scoped>
.layout {
  display: flex;

  &__container {
    max-width: var(--container--max-width--small);
    margin: auto;

    h1 {
      text-align: start;
      width: 100%;
      font-size: 6rem;
    }
  }
}

.ranking {
  ::-webkit-scrollbar {
    width: 0.5rem;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: transparent;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: var(--color--second);
    border-radius: 5rem;
  }

  &__list {
    margin: auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: 100%;
    max-height: 50rem;
    overflow-y: scroll;
    position: sticky;

    li {
      display: grid;
      grid-template-columns: 30rem 10rem 10rem 10rem;

      &:first-of-type {
        margin-bottom: 2rem;
        position: sticky;
        top: 0;

        p {
          font-weight: bold;
        }
      }
    }
  }
}
</style>
