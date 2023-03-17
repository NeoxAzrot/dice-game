<template>
  <div class="rooms-list">
    <h2>Available rooms</h2>
    <ul class="rooms-list__container">
      <li @click="emits('selected', room.id)" v-for="room in rooms">
        <p>{{ room.id }}</p>
        <p>{{ room.players.length }}/2</p>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const rooms = ref()
const REFRESH_INTERVAL = 5000

const emits = defineEmits(['selected'])

const fetchRooms = async () => {
  const { data } = await useRoom().listAll()
  rooms.value = data.rooms
}

fetchRooms()

onMounted(() => {
  setInterval(() => {
    fetchRooms()
  }, REFRESH_INTERVAL)
})
</script>

<style lang="scss">
.rooms-list {
  display: flex;
  flex-direction: column;
  gap: 5rem;
  width: 100%;
  height: 100%;

  ul {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    li {
      padding: 1rem 1rem 1rem 0;
      opacity: 0.6;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      transition: opacity 0.1s ease-in-out;

      &:hover {
        opacity: 0.2;
      }
    }
  }
}
</style>