<template>
  <div class="dice_container">
    <span v-if="number === 0" class="dice">
      <span class="dot grid-five"></span>
    </span>
    <span v-if="number === 1" class="dice">
      <span class="dot grid-one"></span>
      <span class="dot grid-nine"></span>
    </span>
    <span v-if="number === 2" class="dice">
      <span class="dot grid-one"></span>
      <span class="dot grid-five"></span>
      <span class="dot grid-nine"></span>
    </span>
    <span v-if="number === 3" class="dice">
      <span class="dot grid-one"></span>
      <span class="dot grid-seven"></span>
      <span class="dot grid-three"></span>
      <span class="dot grid-nine"></span>
    </span>
    <span v-if="number === 4" class="dice">
      <span class="dot grid-one"></span>
      <span class="dot grid-seven"></span>
      <span class="dot grid-five"></span>
      <span class="dot grid-three"></span>
      <span class="dot grid-nine"></span>
    </span>
    <span v-if="number === 5" class="dice">
      <span class="dot grid-one"></span>
      <span class="dot grid-four"></span>
      <span class="dot grid-three"></span>
      <span class="dot grid-seven"></span>
      <span class="dot grid-six"></span>
      <span class="dot grid-nine"></span>
    </span>
  </div>
</template>

<script setup lang="ts">
const { number } = defineProps(['number']);
</script>

<style lang="scss">
.dice_container {
  padding: 10px;

  p {
    font-size: large;
  }
}

.dice {
  padding: 10px;
  height: 60px;
  width: 60px;
  background: var(--color--second);
  color: white;
  display: grid;
  grid-template: repeat(3, 1fr) /repeat(3, 1fr);
  justify-items: center;
  align-items: center;
  border-radius: 12px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2);

}

.dot {
  display: block;
  width: 10px;
  height: 10px;
  background: white;
  border-radius: 50%;
}

.grid-one {
  grid-row: 1;
  grid-column: 1;
}

.grid-two {
  grid-row: 1;
  grid-column: 2;
}

.grid-three {
  grid-row: 1;
  grid-column: 3;
}

.grid-four {
  grid-row: 2;
  grid-column: 1;
}

.grid-five {
  grid-row: 2;
  grid-column: 2;
}

.grid-six {
  grid-row: 2;
  grid-column: 3;
}

.grid-seven {
  grid-row: 3;
  grid-column: 1;
}

.grid-eight {
  grid-row: 3;
  grid-column: 2;
}

.grid-nine {
  grid-row: 3;
  grid-column: 3;
}
</style>