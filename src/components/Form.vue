<script setup lang="ts">
import InputText from './InputText.vue';
import SelectTemplate from './SelectTemplate.vue';
import ButtonSubmit from './ButtonSubmit.vue';
import { defineEmits } from 'vue';

const emit = defineEmits(['formSubmit', 'templateChange']);
</script>

<template>
    <SelectTemplate @template="emit('templateChange')" />
    <InputText title_input="Occasion" />
    <InputText title_input="Tone" />

    <ButtonSubmit @click="emit('formSubmit')" />
</template>

<style scoped>
button {
    align-self: self-end;
}
</style>