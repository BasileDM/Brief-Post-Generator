<script setup lang="ts">

defineProps<{ title_input: string }>()

</script>

<template>
    <label for="">{{ title_input }}</label>
    <input type="text" name="{{ title_input }}" id="{{ title_input }}">
</template>

<style scoped>
.read-the-docs {
    color: #888;
}
</style>
