<template>
  <div class="copy-link">
    <p @click="handleClick" class="copy-link__text">{{ APP_URL }}/{{ roomID }}</p>
    <div class="copy-link__popup" :class="copied && 'visible'">
      <p>Copied</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const { APP_URL } = useRuntimeConfig().public
const roomID = useRoute().params.room;

const copied = ref(false)

const handleClick = () => {
  copied.value = true
  navigator.clipboard.writeText(`${APP_URL}/${roomID}`)
  setTimeout(() => {
    copied.value = false
  }, 1000)
}
</script>

<style lang="scss">
.copy-link {
  position: relative;

  &__text {
    cursor: pointer;
  }

  &__popup {
    width: fit-content;
    height: fit-content;
    position: absolute;
    left: 102%;
    top: 0;
    bottom: 0;
    margin: auto;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease-in-out;
    padding: 0.5rem 2rem;
    background-color: #23DC3D;
    border-radius: 0.3rem;
    color: white;

    &.visible {
      opacity: 1;
      pointer-events: all;
    }
  }
}
</style>