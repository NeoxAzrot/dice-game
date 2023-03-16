<template>
  <div class="layout room">
    <div class="room__container" v-if="room && room.players">
      <RoomHeader />
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

const userID = useCookie('dice-game-user-id')

onBeforeMount(async () => {
  useRoom().verify(roomID)
  .then(async (): Promise<any> => {
    listener.value = await useFirebase().listen('rooms', roomID, 'room')
  })
  .catch((): any => navigateTo('/'))
  
})

onMounted(() => {  
  window.addEventListener('beforeunload', () => {
    useRoom().abandon()
  })
})
</script>

<style lang="scss">
.room {
  &__container {
    display: flex;
    height: 100%;
  }
}
</style>