<template>
  <div class="room__header" v-if="users">
    <p>N°{{ roomID }}</p>
    <div class="room__header__players">
      <p v-for="p, index in room.players"><span>P{{ index + 1 }}</span> {{ users[index] }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const roomID = useRoute().params.room as string

const { room, users } = useRoom()
</script>

<style lang="scss">
.room {
  &__header {
    background-color: var(--color--second);
    color: white;
    width: 100%;
    padding: 1rem 3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 4rem;

    &__players {
      display: flex;
      gap: 2rem;

      span {
        font-size: 0.9rem;
        font-weight: 600;
      }
    }
  }
}
</style>