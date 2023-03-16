<template>
  <div class="room__header" v-if="room">
    <div class="room__header__container">
      <div>
        <label>Room</label>
        <RoomCopyLink />
      </div>
      <div>
        <label>Players</label>
        <div class="room__header__players">
          <p :class="currentUserID === p.id && 'current'" v-for="p in room.players">{{ p.username }}</p>
        </div>
      </div>
      <div class="room__header__actions">
        <button @click="handleCreateGame" class="btn--secondary" :class="disableCreateButton && 'disabled'">Start a new game</button>
        <button @click="handleLeave" class="btn--secondary">Leave room</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { room } = useRoom()

const currentUserID = useCookie('dice-game-user-id')

const disableCreateButton = ref(false)

const handleLeave = async () => {
  await useRoom().leave()
  navigateTo('/')
}

const handleCreateGame = async() => {  
  useGame().create().then((r) => {
    console.log(r.data.id)
  })
}

</script>

<style lang="scss">
.room {
  &__header {
    width: 100%;
    color: white;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: var(--color--second);
    display: flex;

    &__container {
      margin: auto;
      width: 100%;
      height: 100%;
      padding: 2rem;
      display: inline-flex;
      gap: 4rem;
      max-width: 120rem;

      > div {
        label {
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }
      }

    }
    
    &__players {
      display: flex;
      gap: 2rem;
    }

    &__actions {
      margin: 0 0 0 auto;
      display: flex;
      gap: 1rem;
    }
  }
}
</style>