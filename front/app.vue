<template>
  <div>
    <h1>Init</h1>
  </div>
</template>

<script setup lang="ts">
import useStore from '@/store/main'
const { roomID } = useStore()
console.log(roomID)
</script>
