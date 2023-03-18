<template>
  <div class="room__header">
    <div class="room__header__container">
      <a href="/" class="room__header__logo">
        <nuxt-img preload format="webp" style="filter: invert()" src="/diceex.png" />
      </a>
      <p @click="handleLeave" class="room__header__leave">Leave room</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const handleLeave = async () => {
  await useRoom().leave()
  navigateTo('/')
}
</script>

<style lang="scss">
.room__header {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  padding: 2rem;
  display: flex;

  &__container {
    margin: auto;
    width: 100%;
    max-width: var(--container--max-width);
    display: flex;
    align-items: center;
  }

  &__logo {
    img {
      height: 30px;
    }
  }

  &__leave {
    color: var(--color--third);
    margin: 0 0 0 auto;
    font-size: 1.2rem;
    font-weight: 600;
    cursor: pointer;
  }
}
</style>