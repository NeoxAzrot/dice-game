<template>
  <div class="layout room">
    <div v-if="room && users">
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

const { room, users } = useRoom()

const listener: Ref<any> = ref(null)

onMounted(async () => {
  useRoom().verify(roomID)
  .then(async (): Promise<any> => listener.value = await useFirebase().listen('rooms', roomID, 'room'))
  .catch((): any => navigateTo('/'))
})
</script>