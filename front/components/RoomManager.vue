<template>
  <div class="room-manager">
    <div class="room-manager__selector">
      <p :class="selection === 'join' && 'selected'" @click="selection = 'join'">Join</p>
      <p :class="selection === 'create' && 'selected'" @click="selection = 'create'">Create</p>
    </div>

    <form v-if="selection === 'join'" @submit="handleJoin">
      <div class="room-manager__field input">
        <label for="username">Username</label>
        <input type="text" id="username" name="username" v-model="username">
      </div>
      <div class="room-manager__field input">
        <label for="room">Room</label>
        <input type="text" id="room" name="room" v-model="requestedRoom">
      </div>
      <input type="submit" value="Join">
    </form>

    <form v-else @submit="handleCreate">
      <div class="room-manager__field input">
        <label for="username">Username</label>
        <input type="text" id="username" name="username" v-model="username">
      </div>
      <input type="submit" value="Create">
    </form>
  </div>
</template>

<script setup lang="ts">
const { username } = useStore();
const selection: Ref<'join' | 'create'> = ref('join')

const requestedRoom = ref('')

const handleJoin = (e: Event) => {
  e.preventDefault()
  // useRoom().join(requestedRoom.value)
  // navigateTo(`/${requestedRoom.value}`)
}

const handleCreate = (e: Event) => {
  e.preventDefault()
  useRoom().create() // TODO -> Ajouter l'ID de la room retournée au store
}
</script>

<style lang="scss">
.room-manager {
  width: 100%;
  max-width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  &__selector {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;

    p {
      pointer-events: all;
      cursor: pointer;
      opacity: 0.5;
      transition: opacity 0.3s ease-in-out;
      padding-bottom: 0.5rem;

      &.selected {
        pointer-events: none;
        border-bottom: 2px solid var(--color--second);
        opacity: 1;
      }
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;

    input[type="submit"] {
      margin-top: 1rem;
    }
  }
}
</style>