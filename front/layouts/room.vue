<template>
  <div class="layout room">
    <GlobalGradients/>
    <div class="room__container" v-if="room && room.players">
      <RoomHeader />
      <RoomFooter />
      <NuxtPage/>
    </div>
    <div class="room__loader" v-else>
      <p class="room__loader__title">Loading room...</p>
      <p class="room__loader__text">Our server is giving everything he can ❤️</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Unsubscribe } from '@firebase/util';
const roomID = useRoute().params.room as string

const { room } = useRoom()
const { game } = useGame()

const roomListener: Ref<{ unsubscribe: Unsubscribe } | null> = ref(null)
const gameListener: Ref<{ unsubscribe: Unsubscribe } | null> = ref(null)

onBeforeMount(async () => {
  useRoom().verify(roomID)
  .then(async (): Promise<void> => {
    roomListener.value = await useFirebase().listen('rooms', roomID, 'room')
  })
  .catch((): any => navigateTo('/'))
})

onMounted(() => {  
  window.addEventListener('beforeunload', () => {
    useRoom().leave()
  })
}) 

watch(
  () => room.value?.games,
  async () => {
    if(room.value?.games.length) {
      gameListener.value = await useFirebase().listen('games', room.value.games[0], 'game')
    }
  }
)
</script>

<style lang="scss">
.room {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  &__container {
    display: flex;
    height: 100%;
    max-width: 800px;
  }

  &__loader {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;

    &__title {
      font-size: 2rem;
      font-weight: 600;
      margin-bottom: 1rem;
    }

    &__text {
      font-size: 1.2rem;
      font-weight: 400;
    }
  }
}
</style>