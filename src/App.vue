<script setup lang="ts">
import { ref } from 'vue'
import ResultCanvas from './components/ResultCanvas.vue'
import Form from './components/Form.vue';
import { getOpenAiResponse } from './utils/data';
import createPrompt from './utils/createPrompt';

const template = ref('template_1');
const title = ref('Title');
const slogan = ref('Slogan');

const handleFrom = async () => {
  const arrayInput = document.querySelectorAll('input') as NodeListOf<HTMLInputElement>;
  const inputValues = Array.from(arrayInput).reduce((acc, input) => {
    if (input.name) {
      acc[input.name] = input.value;
    }
    return acc;
  }, {} as Record<string, string>);

  const prompt = createPrompt(inputValues);
  const openAiResponse = await getOpenAiResponse(prompt);
  const responseObject = JSON.parse(openAiResponse);

  title.value = responseObject.Titre;
  slogan.value = responseObject.Slogan;
}

const handleTemplateChange = () => {
  const templateSelectElement = document.getElementById('template_choice') as HTMLSelectElement;
  template.value = templateSelectElement.value;
}
</script>

<template>
  <div>
    <h1>Générateur de post</h1>
    <div class="main_content">
      <div class="block_left">
        <!-- appel formulaire -->
        <Form @formSubmit="handleFrom" @templateChange="handleTemplateChange" />
      </div>
      <div class="block_right">
        <!-- appel résultat -->
        <ResultCanvas :templateType="template" :title="title" :slogan="slogan" />
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
