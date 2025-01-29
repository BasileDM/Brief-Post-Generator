<script setup lang="ts">
defineProps<{ text: string }>()
</script>

<template>
    <button>{{ text }}</button>
</template>

<style scoped>
button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content;
    height: 35px;
    border: none;
    border-radius: 15px;
    font-size: 1em;
    font-weight: bold;
    font-family: 'Merriweather', sans-serif;
    cursor: pointer;
    text-align: center;
    line-height: 50px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    background-color: #38718C;
    color: #f2efbd;
    text-wrap: nowrap;
}
</style>