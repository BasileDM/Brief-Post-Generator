<script setup lang="ts">
import InputText from './InputText.vue';
import SelectTemplate from './SelectTemplate.vue';
import ButtonSubmit from './ButtonSubmit.vue';
import { defineEmits } from 'vue';

const emit = defineEmits(['formSubmit', 'templateChange', 'reloadImage']);
</script>

<template>
    <h3>Personalization</h3>
    <SelectTemplate @template="emit('templateChange')" />
    <ButtonSubmit @click="emit('reloadImage')" text="Reload image" />
    <hr width="100%">
    <h3>AI Text Generation</h3>
    <InputText type_input="text" title_input="Occasion" />
    <InputText type_input="text" title_input="Tone" />
    <InputText type_input="number" title_input="Quantity" />

    <ButtonSubmit @click="emit('formSubmit')" text="Submit" id="submit"/>
</template>

<style scoped>
button {
    align-self: self-end;
}
h3 {
    margin-top: 0px;
    margin-bottom: 0px;
}
</style>