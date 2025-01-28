<script setup lang="ts">
defineProps<{ title_input: string, type_input: string }>()
</script>

<template>
    <label for="" class="title">{{ title_input }}</label>
    <input :type="type_input" :name="title_input" class="field">
</template>

<style scoped>
.title {
    text-align: left;
}

.field {
    margin: 5px 0px 15px 0px;
}
</style>
