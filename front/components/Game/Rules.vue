<template>
  <div class="rule_container">
    <!-- <button @click="open = !open">{{ open ? 'Close' : 'Open' }} Modal</button> -->
    <transition>
      <div v-if="open" class="rule_modal">
        <div class="rule_modal--header">
          <h3>Combinaisons possibles</h3>
        </div>
        <ul>
          <li v-for="(rule, index) in rules">{{ index }}<span class="">{{ rule }}</span></li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
const open: Ref<Boolean> = ref(true);

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

<style lang="scss">
.rule_container {
  .rule_modal {
    display: flex;
    flex-direction: column;
    padding: 5px 20px;
    border-radius: var(--radius--main);
    box-shadow: var(--box-shadow);
    border: 2px solid var(--color--second);

    .rule_modal--header {
      padding: 10px 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
    }

    ul {
      li {
        display: flex;
        justify-content: space-between;
        position: relative;
        padding: 5px;
        &:not(:last-child) {
          &::after {
            content: '';
            position: absolute;
            left: 0;
            right: 0;
            bottom: -0px;
            height: 1px;
            background: rgba(#ffffff, 0.5);
          }
        }
      }
    }
  }
}</style>