<template>
  <div class="copy-link">
    <p @click="handleClick" class="copy-link__text">{{ roomID }}</p>
    <div class="copy-link__popup" :class="copied && 'visible'">
      <p>{{ popupText }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const { APP_URL } = useRuntimeConfig().public;
const roomID = useRoute().params.room;

const copied = ref(false);
const popupText = ref('click to copy');

const handleClick = () => {
  copied.value = true;
  popupText.value = 'copied';
  navigator.clipboard.writeText(`${APP_URL}?room=${roomID}`);
  setTimeout(() => {
    copied.value = false;
  }, 1000);
  setTimeout(() => {
    popupText.value = 'click to copy';
  }, 1200);
};
</script>

<style lang="scss">
.copy-link {
  position: relative;

  &__text {
    cursor: pointer;
  }

  &:hover {
    div {
      opacity: 1;
      pointer-events: all;
    }
  }

  &__popup {
    width: fit-content;
    height: fit-content;
    position: absolute;
    bottom: 102%;
    left: 0;
    right: 0;
    margin: auto;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease-in-out;
    padding: 0.5rem 2rem;
    border-radius: 0.3rem;
    color: white;
    font-size: 1.2rem;
    font-weight: 700;

    &.visible {
      opacity: 1;
      pointer-events: all;
    }
  }
}
</style>
