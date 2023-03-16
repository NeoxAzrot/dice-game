<template>
  <div class="bg-gradients">
    <div class="bg-gradients__container">
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<style lang="scss">
.bg-gradients {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 0;
  top: 0;
  left: 0;

  &__container {
    position: relative;
    width: 100%;
    height: 100%;

    div {
      --x-pos: -10vw;
      --y-pos: -10vh;
      --shapes--width: 80rem;
      --shapes--height: 80rem;

      position: absolute;
      margin: auto;
      transform: translateX(var(--x-pos)) translateY(var(--y-pos));
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background: var(--gradient--shapes);
      width: var(--shapes--width);
      height: var(--shapes--height);

      &:nth-child(2) {
        --x-pos: 30vw;
        --y-pos: 30vh;
        --shapes--width: 120rem;
        --shapes--height: 120rem;

        opacity: 0.8;
      }
    }
  }
}
</style>