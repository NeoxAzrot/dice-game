<template>
  <div class="layout home">
    <div class="layout__container">
      <h1>Enter the game</h1>
      <RoomManager />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #f5f5f5;

}

.layout {
  &__container {
    max-width: 40rem;
    gap: 5rem;

    h1 {
      text-align: start;
      width: 100%;
      font-size: 6rem;
    }
  }
}
</style>
