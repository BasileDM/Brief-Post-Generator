<script setup lang="ts">
import { defineEmits } from 'vue';
const emit = defineEmits(['downloadType']);
</script>

<template>

    <label for="" class="title">Download format</label><br>
    <select name="download_format" id="download_format" class="field" @change="emit('downloadType')">
        <option value="">choose a format</option>
        <option value="image/jpeg">JPEG</option>
        <option value="image/png">PNG</option>
        <option value="image/webp">Webp</option>
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