<script setup lang="ts">
import { ref } from 'vue'
import ResultCanvas from './components/ResultCanvas.vue'
import Form from './components/Form.vue';

const template = ref('template1')
</script>

<template>
  <div>
    <h1>Titre</h1>
    <div class="main_content">
      <div class="block_left">
        <!-- appel formulaire -->
        <Form />
      </div>
      <div class="block_right">
        <!-- appel résultat -->
        <ResultCanvas :templateType="template" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.main_content {
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 10px;
}

.block_right,
.block_left {
  width: 50%;
  display: flex;
  flex-direction: column;
  margin: 25px;
}

.block_right {
  justify-content: flex-end;
}

.block_left {
  justify-content: flex-start;
}
</style>
