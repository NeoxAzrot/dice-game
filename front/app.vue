<template>
  <div class="layout">
    <RoomManager />
  </div>
</template>

<script setup lang="ts">
// const listener = useFirebase().listen('rooms', 'test', 'game')
// listener.unsubscribe()
</script>

<style lang="scss">
.layout {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: var(--color--body);
}
</style>
