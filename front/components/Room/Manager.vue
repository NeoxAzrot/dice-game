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
const { username, roomID } = useStore();
const selection: Ref<'join' | 'create'> = ref('join')

const requestedRoom = ref('')

const cookie = useCookie('dice-game-user-id')

const handleJoin = (e: Event) => {
  e.preventDefault()
  useRoom().join(requestedRoom.value)
  .then(({ data }) => {
    cookie.value = data.user.id
    window.location.href = `${useRuntimeConfig().APP_URL}/${data.room.id}`
  }).catch((err) => {
    console.error(err)
  })
}

const handleCreate = (e: Event) => {
  e.preventDefault()
  useRoom().create()
  .then(({ data }) => {
    cookie.value = data.user.id
    roomID.value = data.room.id
    window.location.href = `${useRuntimeConfig().APP_URL}/${data.room.id}`
  }).catch((err) => {
    console.error(err)
  })
}
</script>

<style lang="scss">
.room-manager {
  width: 100%;
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
      color: var(--color--second);

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