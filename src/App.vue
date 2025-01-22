<script setup lang="ts">
import { ref } from 'vue'
import ResultCanvas from './components/ResultCanvas.vue'
import Form from './components/Form.vue';
import { getOpenAiResponse } from './utils/data';
import createPrompt from './utils/createPrompt';

const resultCanvasRef = ref();

const handleFrom = async () => {
  const arrayInput = document.querySelectorAll('input') as NodeListOf<HTMLInputElement>;
  const inputValues = Array.from(arrayInput).reduce((acc, input) => {
    if (input.name) {
      acc[input.name] = input.value;
    }
    return acc;
  }, {} as Record<string, string>);

  const prompt = createPrompt(inputValues);
  const test = await getOpenAiResponse(prompt);

  console.log(test);
  resultCanvasRef.value?.drawCanvas();
}

const handleTemplateChange = () => {
  const templateSelectElement = document.getElementById('template_choice') as HTMLSelectElement;
  const templateValue = templateSelectElement.value;
  console.log(templateValue);
}

const template = ref('template1')

</script>

<template>
  <div>
    <h1>Titre</h1>
    <div class="main_content">
      <div class="block_left">
        <!-- appel formulaire -->
        <Form @formSubmit="handleFrom" @templateChange="handleTemplateChange" />
      </div>
      <div class="block_right">
        <!-- appel résultat -->
        <ResultCanvas ref="resultCanvasRef" :templateType="template" />
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
