<template>
  <div class="layout room">
    <div v-if="room">
      <div class="room__header">
        <p>N°{{ roomID }}</p>
        <div class="room__header__players">
          <p v-for="player, index in room.players">P{{ index + 1 }}: {{ player.id }}</p>
        </div>
      </div>
      <div class="layout__container">
        <NuxtPage/>
      </div>
    </div>
    <div v-else>
      <p>Loading room</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const roomID = useRoute().params.room as string

const { room } = useRoom()

const listener: Ref<any> = ref(null)

if(roomID.length > 2) {
  console.log(await useRoom().verify(roomID))
  listener.value = useFirebase().listen('rooms', roomID, 'room')
} else {
  navigateTo('/')
}
</script>

<style lang="scss">
.room {
  &__header {
    width: 100%;
    padding: 1rem 3rem;
    background-color: var(--color-primary);
    display: flex;
    align-items: center;
    gap: 4rem;

    &__players {
      display: flex;
      gap: 2rem;
    }
  }
}
</style>