<template>
  <div>
    <h1>Init</h1>
    {{ username }}
    {{ roomID }}
    <RoomManager />
  </div>
</template>

<script setup lang="ts">
const { roomID, username } = useStore()
</script>
