<template>
  <div v-if="room" class="room__waiter">
    <p :class="isEnoughPlayers && 'checked'">
      <div>
        <CheckIcon class="checked"/>
        <CloseIcon class="closed"/>
        Enough players...
      </div>
      <span>{{ room.players.length }}/2</span>
    </p>
  </div>
</template>

<script setup lang="ts">
import CheckIcon from '@/assets/icons/check.svg';
import CloseIcon from '@/assets/icons/close.svg';

const { room } = useRoom()

const isEnoughPlayers = computed(() => room.value ? room.value.players.length >= 2 : false)
</script>

<style lang="scss">
.room__waiter {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 100%;
  max-width: 40rem;
  gap: 1rem;

  p {
    font-size: 1.5rem;
    font-weight: 600;
    opacity: 0.5;
    transition: opacity 0.2s ease-in-out;
    display: flex;
    align-items: center;
    gap: 8rem;

    > div {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .checked {
      display: none;
    }

    &.checked {
      opacity: 1;

      .checked {
        display: block;
      }

      .closed {
        display: none;
      }
    }
  }
}
</style>