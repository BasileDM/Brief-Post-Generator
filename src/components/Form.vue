<script setup lang="ts">
import InputText from './InputText.vue';
import SelectTemplate from './SelectTemplate.vue';
import ButtonSubmit from './ButtonSubmit.vue';
import { defineEmits } from 'vue';

const emit = defineEmits(['formSubmit', 'templateSubmit']);
</script>

<template>
    <SelectTemplate @template="emit('templateSubmit')" />
    <InputText title_input="Occasion" />
    <InputText title_input="Tonalité" />

    <ButtonSubmit @submit="emit('formSubmit')" />
</template>

<style scoped>
button {
    align-self: self-end;
}
</style>