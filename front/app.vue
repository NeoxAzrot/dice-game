<template>
  <div class="layout">
    <RoomManager />
  </div>
</template>

<script setup lang="ts">
// const game = useGame()
// useFirebase().listen('rooms', 'test', 'game')
</script>

<style lang="scss">
.layout {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #f5f5f5;
}
</style>
