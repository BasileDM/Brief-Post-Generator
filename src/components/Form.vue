<script setup lang="ts">
import InputText from './InputText.vue';
import SelectTemplate from './SelectTemplate.vue';
import ButtonSubmit from './ButtonSubmit.vue';
import { defineEmits } from 'vue';

const emit = defineEmits(['formSubmit', 'templateChange']);
</script>

<template>
    <SelectTemplate @template="emit('templateChange')" />
    <InputText type_input="text" title_input="occasion" />
    <InputText type_input="text" title_input="tone" />
    <InputText type_input="number" title_input="quantity" />

    <ButtonSubmit @click="emit('formSubmit')" />
</template>

<style scoped>
button {
    align-self: self-end;
}
</style>