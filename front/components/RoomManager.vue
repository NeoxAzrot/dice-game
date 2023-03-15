<template>
  <div class="room-manager">
    <div class="room-manager__buttons">
      <button v-if="selection === 'join'" @click="selection = 'create'">Create</button>
      <button v-if="selection === 'create'" @click="selection = 'join'">Join</button>
    </div>

    <form v-if="selection === 'join'" @submit="handleJoin">
      <div class="room-manager__field">
        <label for="username">Username</label>
        <input type="text" id="username" name="username" v-model="username">
      </div>
      <div class="room-manager__field">
        <label for="room">Room</label>
        <input type="text" id="room" name="room" v-model="roomID">
      </div>
      <input type="submit" value="Join">
    </form>

    <form v-else @submit="handleCreate">
      <div class="room-manager__field">
        <label for="username">Username</label>
        <input type="text" id="username" name="username" v-model="username">
      </div>
      <input type="submit" value="Create">
    </form>
  </div>
</template>

<script setup lang="ts">
const { username, roomID } = useStore();
const selection: Ref<'join' | 'create'> = ref('join')

const handleJoin = (e: Event) => {
  e.preventDefault()
  useRoom().join()
}

const handleCreate = (e: Event) => {
  e.preventDefault()
  useRoom().create() // TODO -> Ajouter l'ID de la room retournée au store
}
</script>

<style lang="scss">
.room-manager {
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__field {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }
}
</style>