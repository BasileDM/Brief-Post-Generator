<script setup lang="ts">
import { defineEmits } from 'vue';
const emit = defineEmits(['template']);
</script>

<template>

    <label for="" class="title">Template</label>
    <select name="template_choice" id="template_choice" class="field" @change="emit('template')">
        <option value="">choose a template</option>
        <option value="template_1">Template 1</option>
        <option value="template_2">Template 2</option>
    </select>

</template>

<style scoped>
.title {
    text-align: left;
}

.field {
    margin: 5px 0px 15px 0px;
}
</style>