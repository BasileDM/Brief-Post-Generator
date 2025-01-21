<script setup lang="ts">
import InputText from './InputText.vue';
import SelectTemplate from './SelectTemplate.vue';
import ButtonSubmit from './ButtonSubmit.vue';
</script>

<template>

    <SelectTemplate />

    <InputText title_input="Occasion" />
    <InputText title_input="Tonalité" />

    <ButtonSubmit />

</template>

<style scoped>
    button {
        align-self: self-end;
    }
</style>