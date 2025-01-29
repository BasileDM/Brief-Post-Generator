<script setup lang="ts">
import { ref } from 'vue'
import ResultCanvas from './components/ResultCanvas.vue'
import Form from './components/Form.vue';
import createPrompt from './utils/createPrompt';
import download from './utils/download';
import type { Example } from './interfaces/ResultVariables';
import { OpenAiProvider } from './utils/llmProviders/OpenAiProvider';
import SelectDownloadType from './components/SelectDownloadType.vue';

const template = ref('template_1');
const title = ref('Title');
const slogan = ref('Slogan');
const results = ref<Example[]>([]);
const currentIndex = ref(0);
const downloadType = ref('downloadType');
const canvasRef = ref();

const handleDownload = (e: Event) => {
  e.preventDefault();
  download(downloadType.value);
};

const handleFrom = async () => {
  const arrayInput = document.querySelectorAll('input') as NodeListOf<HTMLInputElement>;
  const inputValues = Array.from(arrayInput).reduce((arr, input) => {
    if (input.name) {
      arr[input.name] = input.type === 'number' ? Number(input.value) : input.value;
    }
    return arr;
  }, {} as Record<string, string | number>);

  const prompt = createPrompt(inputValues);
  const llmProvider = new OpenAiProvider();
  const openAiResponse = await llmProvider.generateResponse(prompt);
  const responseObject = JSON.parse(openAiResponse) as { examples: Example[] };

  results.value = responseObject.examples;
  if (results.value.length > 0) {
    currentIndex.value = 0;
    updateDisplayResult();
  }
}

const updateDisplayResult = () => {
  if (results.value[currentIndex.value]) {
    title.value = results.value[currentIndex.value].Title;
    slogan.value = results.value[currentIndex.value].Slogan;
  }
}

const handleNext = () => {
  if (currentIndex.value < results.value.length - 1) {
    currentIndex.value++;
    updateDisplayResult();
  }
}

const handlePrevious = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
    updateDisplayResult();
  }
}

const handleTemplateChange = () => {
  const templateSelectElement = document.getElementById('template_choice') as HTMLSelectElement;
  template.value = templateSelectElement.value;
}

const handleDownloadTypeChange = () => {
  const downloadTypeSelectElement = document.getElementById('download_format') as HTMLSelectElement;
  downloadType.value = downloadTypeSelectElement.value;
}

const handleReloadImage = async () => {
  if (!canvasRef.value) return;
  await canvasRef.value.loadImage();
  canvasRef.value.drawCanvas();
}
</script>

<template>
  <div>
    <h1>Post generator</h1>
    <div class="main_content">
      <div class="block_left">
        <!-- appel formulaire -->
        <Form @formSubmit="handleFrom" @templateChange="handleTemplateChange" @reloadImage="handleReloadImage"/>
      </div>
      <div class="block_right">
        <!-- appel résultat -->
        <button class="pagination" id="previous" @click="handlePrevious" :disabled="currentIndex === 0">Back</button>
        <div class="vertical">
          <ResultCanvas :templateType="template" :title="title" :slogan="slogan" ref="canvasRef"/>
          <SelectDownloadType @downloadType="handleDownloadTypeChange" />
          <button id="download" @click="handleDownload">Download</button>
        </div>
        <button class="pagination" id="next" @click="handleNext"
          :disabled="(currentIndex === results.length - 1) || (results.length === 0)">Next</button>
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

.block_right {
  width: 52%;
  display: flex;
  flex-direction: row;
  margin: 25px;
}

.block_left {
  width: 48%;
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

.vertical {
  display: flex;
  flex-direction: column;
}

.pagination {
  width: 80px;
  height: 40px;
  margin: auto 10px;
}

.pagination:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
