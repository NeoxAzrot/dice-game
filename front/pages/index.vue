<template>
  <div class="layout home">
    <div class="layout__container">
      <RoomManager />
    </div>
  </div>
</template>

<script setup lang="ts">
// const listener = useFirebase().listen('rooms', 'test', 'game')
// listener.unsubscribe()
</script>

<style lang="scss">
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: var(--color--body);
}
</style>
