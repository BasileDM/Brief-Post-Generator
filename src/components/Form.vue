<script setup lang="ts">
import InputText from './InputText.vue';
import SelectTemplate from './SelectTemplate.vue';
import ButtonSubmit from './ButtonSubmit.vue';

const emit = defineEmits(['formSubmit', 'templateChange', 'reloadImage']);
const temperature = defineModel();
</script>

<template>
    <SelectTemplate @template="emit('templateChange')" />
    <ButtonSubmit @click="emit('reloadImage')" text="Reload image" />
    <hr width="100%">
    <h3>AI Text Generation</h3>
    <InputText type_input="text" title_input="Occasion" />
    <InputText type_input="text" title_input="Tone" />
    <InputText type_input="number" title_input="Quantity" />
    <div class="slider">
        <label for="temperature">Temperature: {{ temperature }}</label>
        <input type="range" id="temperature" min="0" max="1" step="0.1" v-model="temperature" />
    </div>

    <ButtonSubmit @click="emit('formSubmit')" text="Submit" id="submit" />
</template>

<style scoped>
button {
    align-self: self-end;
}

h3 {
    margin-top: 0px;
    margin-bottom: 0px;
}

.slider {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    label {
        flex: 1;
    }

    input {
        flex: 2;
    }
}
</style>