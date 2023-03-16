<template>
  <div class="room__header" v-if="room.players">
    <div class="room__header__top">
      <p>N°{{ roomID }}</p>
      <div class="room__header__top__players">
        <p :class="currentUserID === p.id && 'current'" v-for="p, index in room.players"><span>P{{ index + 1 }}</span> {{ p.username }}</p>
      </div>
      <div>
        <button class="btn--secondary">Start a new game</button>
        <button @click="handleLeave" class="btn--secondary">Leave room</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const roomID = useRoute().params.room as string

const { room } = useRoom()

const currentUserID = useCookie('dice-game-user-id')

const handleLeave = async () => {
  await useRoom().leave()
  navigateTo('/')
}
</script>

<style lang="scss">
.room {
  &__header {
    width: 100;
    max-width: 30rem;
    padding: 1rem;
    color: white;
    height: 100vh;

    &__top {
      border-radius: 0.2rem;
      background-color: var(--color--second);
      width: 100%;
      height: 100%;
      padding: 2rem;
      display: flex;
      flex-direction: column;
      gap: 4rem;

      &__players {
        display: flex;
        gap: 2rem;

        span {
          font-size: 0.9rem;
          font-weight: 600;
        }
      }

      button {
        margin: auto 0 0 0;
      }
    }
  }
}
</style>