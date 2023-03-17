<template>
  <div class="rule">
    <!-- <button @click="open = !open">{{ open ? 'Close' : 'Open' }} Modal</button> -->
    <transition>
      <div v-if="open" class="rule_modal">
        <div class="rule_modal--header">
          <h3>Possible combinations</h3>
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
.rule {
  &_modal {
    --color--tr: rgba(28, 28, 29, 0.3);
    --color--bl: #353661;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    // background-image: linear-gradient(-45deg, var(--color--tr), var(--color--bl)), linear-gradient(-135deg, var(--color--tr), var(--color--bl));
    // background-size: 100% 2px, 2px 100%;
    // background-position: 0 100%, 0% 100%;
    // border-bottom: 2px solid var(--color--tr);
    // background-repeat: no-repeat;
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
}</style>