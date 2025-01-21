<script setup lang="ts">
import Form from './components/Form.vue';
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
        <img src="https://picsum.photos/200/300" alt="">
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
