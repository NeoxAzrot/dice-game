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
        <li v-for="user in users" :key="user.id">
          <p>{{ user.username }}</p>
          <p>{{ user.allGames }}</p>
          <p>{{ user.wins }}</p>
          <p>{{ user.winRate + '%' }}</p>
        </li>
      </ul>
    </div>
    <footer class="ranking__footer">
      <NuxtLink class="ranking__playbutton" to="/" clas>Play a game</NuxtLink>
    </footer>
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
  flex-direction: column;
  align-items: center;

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

  &__footer {
    width: 100%;
    max-width: var(--container--max-width--small);
    margin: 0 0 0 0;
    position: fixed;
    bottom: 0;
    padding: 2rem 0;
    display: flex;
    justify-content: center;

    a {
      margin: 2rem auto;
      font-size: 1.4rem;
      text-decoration: none;
      color: var(--color--third);
      opacity: 0.6;
    }
  }
}
</style>
