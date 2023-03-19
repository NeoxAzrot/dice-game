<template>
  <div class="rule">
    <transition>
      <div v-if="open" class="rule_modal">
        <div class="rule_modal--header">
          <h3>Possible combinations</h3>
        </div>
        <ul>
          <li v-for="(rule, index) in rules" :key="index">
            {{ index }}<span class="">{{ rule }}</span>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
const open: Ref<Boolean> = ref(true);

const rules = {
  'Single of 1': 100,
  'Single of 5': 50,
  'Double of 1': 200,
  'Double of 5': 100,
  'Triple of 1': 1000,
  'Triple of 2': 200,
  'Triple of 3': 300,
  'Triple of 4': 400,
  'Triple of 5': 500,
  'Triple of 6': 600,
  'Quadruple of a kind': 1000,
  'Quintuple of a kind': 2000,
  'Sextuple of a kind': 3000,
};
</script>

<style lang="scss">
.rule {
  &_modal {
    --color--tr: rgba(28, 28, 29, 0.3);
    --color--bl: #353661;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border: 2px solid var(--color--bl);
    padding: 2rem;

    &--header {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 2rem;
    }

    ul {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      li {
        display: flex;
        justify-content: space-between;
        position: relative;
        opacity: 0.6;
      }
    }
  }
}
</style>
