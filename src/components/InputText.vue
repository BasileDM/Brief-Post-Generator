<script setup lang="ts">
defineProps<{ title_input: string, type_input: string }>()
const verify = (event: Event) => {
    const inputElement = event.target as HTMLInputElement;
    let value = inputElement.value.trim();
    value = value.replace(/[^0-9]/g, '');
    if(Number(value) > Number(inputElement.max)) {
        value = inputElement.max;
    }
    inputElement.value = value;
};
</script>

<template>
    <label for="" class="title">{{ title_input }}</label>
    <input v-if="type_input == 'number'" min="0" step="1" max="10" :type="type_input"  :name="title_input" class="field" @input="verify">
    <input v-else :type="type_input"  :name="title_input" class="field">
</template>

<style scoped>
.title {
    text-align: left;
}

.field {
    margin: 5px 0px 15px 0px;
}
</style>
