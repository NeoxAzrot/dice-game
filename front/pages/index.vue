<template>
  <div class="layout home">
    <div class="layout__container">
      <div class="home__left">
        <RoomList @selected="(id) => (selectedRoom = id)" />
      </div>
      <div class="home__right">
        <h1>Enter the game</h1>
        <RoomManager :selected="selectedRoom" />
      </div>
    </div>
    <footer class="home__footer">
      <NuxtLink class="home__rankinglink" to="/ranking" clas>Ranking</NuxtLink>
    </footer>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Diceex game',
});

const selectedRoom = ref();
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: var(--color--body);

  &__right {
    display: flex;
    flex-direction: column;
    gap: 5rem;
    width: 100%;
    padding: 4rem;
  }

  &__left {
    padding: 4rem;
    --color--tr: rgba(28, 28, 29, 0.3);
    --color--bl: #353661;
    background-image: linear-gradient(45deg, var(--color--tr), var(--color--bl)),
      linear-gradient(-45deg, var(--color--tr), var(--color--bl));
    background-size: 100% 2px, 2px 100%;
    background-position: 0 0%, 100% 100%;
    border-bottom: 2px solid var(--color--tr);
    background-repeat: no-repeat;
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

.layout {
  &__container {
    max-width: var(--container--max-width--small);
    display: grid;
    gap: 5rem;
    grid-template-columns: 1fr 1fr;

    h1 {
      text-align: start;
      width: 100%;
      font-size: 6rem;
    }
  }
}
</style>
