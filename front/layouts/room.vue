<template>
  <div class="layout room" v-if="room">
    <div class="room__header">
      <p>N°{{ room }}</p>
      <div>
        <p>P1: {{ room.player1 || 'aucun' }}</p>
        <p>P2: {{ room.player2 || 'aucun' }}</p>
      </div>
    </div>
    <div class="layout__container">
      <NuxtPage/>
    </div>
  </div>
  <div v-else>
    <p>Loading room</p>
  </div>
</template>

<script setup lang="ts">
const roomID = useRoute().params.room as string

const { room } = useRoom()

const listener: Ref<any> = ref(null)

if(roomID.length > 2) {
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
  }
}
</style>