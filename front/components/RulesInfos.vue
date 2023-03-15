<template>
  <div>
    <button @click="open = !open">{{ open ? 'Close' : 'Open' }} Modal</button>
    <transition>
      <div v-if="open" class="modal">
        <div>
          <h3>Meld Values</h3>
        </div>
        <ul>
          <li v-for="(rule, index) in rules">{{ index }}<span>{{ rule }}</span></li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
const open: Ref<Boolean> = ref(false);

const rules = {
  '1': 100,
  '5': 50,
  'Triple 1': 1000,
  'Triple 2': 200,
  'Triple 3': 300,
  'Triple 4': 400,
  'Triple 5': 500,
  'Triple 6': 600
}
</script>

<style lang="scss"></style>