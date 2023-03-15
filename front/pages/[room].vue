<template>
  <div>
    <h1>Room : {{ room }}</h1>
    <RoomViewer />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'room',
})

const room = useRoute().params.room
</script>