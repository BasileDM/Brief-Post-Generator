<script setup lang="ts">
import { ref } from 'vue'
import ResultCanvas from './components/ResultCanvas.vue'

const template = ref('template1')
</script>

<template>
  <div>
    <h1>Titre</h1>
    <div class="main_content">
      <div class="block_left">
        <!-- appel formulaire -->
        <label for="">template</label><br>
        <input type="text" name="" id=""><br>
        <label for="">tonalite</label><br>
        <input type="text" name="" id=""><br>
        <label for="">occasion</label><br>
        <input type="text" name="" id=""><br>
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
}

.block_right {
  justify-content: flex-end;
}

.block_left {
  justify-content: flex-start;
}
</style>
