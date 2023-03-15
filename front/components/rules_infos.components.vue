<template>
    <div>
        <button @click="open = true">Open Modal</button>
        <Teleport to="body">
            <div v-if="open" class="modal">
                <p>Hello from the modal!</p>
                <button @click="open = false">Close</button>
            </div>
        </Teleport>
    </div>
</template>

<script setup lang="ts">
const open: Ref<Boolean> = ref(false);

const rules = {
    '1': 100,
    '5': 100,
    'Triple 1': 1000,
    'Triple 2': 200,
    'Triple 3': 300,
    'Triple 4': 400,
    'Triple 5': 500,
    'Triple 6': 600
}
</script>

<style lang="scss"></style>