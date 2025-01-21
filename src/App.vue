<script setup lang="ts">
</script>

<template>
  <div>
    <h1>Titre</h1>
    <div class="main_content">
      <div class="block_right">
        <!-- appel formulaire -->
         <label for="">template</label><br>
         <input type="text" name="" id=""><br>
         <label for="">tonalite</label><br>
         <input type="text" name="" id=""><br>
         <label for="">occasion</label><br>
         <input type="text" name="" id=""><br>
      </div>
      <div class="block_left">
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
  .block_right, .block_left {
    width: 50%;
  }
  .block_right {
    justify-content: flex-end;
  }
  .block_left {
    justify-content: flex-start;
  }
</style>
