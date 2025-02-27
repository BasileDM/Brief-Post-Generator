<script setup lang="ts">
import { ref } from 'vue'
import ResultCanvas from './components/ResultCanvas.vue'
import Form from './components/Form.vue';
import createPrompt from './utils/createPrompt';
import download from './utils/download';
import type { Example } from './interfaces/ResultVariables';
import { OpenAiProvider } from './utils/llmProviders/OpenAiProvider';
import SelectDownloadType from './components/SelectDownloadType.vue';
import Spinner from './components/Spinner.vue';

const template = ref('template_1');
const title = ref('Title');
const titleColor = ref('#FFFFFF');
const titleFont = ref('serif');
const slogan = ref('Slogan');
const sloganColor = ref('#FFFFFF');
const sloganFont = ref('serif');
const results = ref<Example[]>([]);
const currentIndex = ref(0);
const downloadType = ref('downloadType');
const canvasRef = ref();
const loading = ref(false);
const resultAPI = ref(false);
const fonts = ['Arial', 'Times New Roman', 'Courier New', 'Georgia', 'Verdana'];
const temperature = ref(0.6);
const titleSize = ref(40);
const sloganSize = ref(20);

const handleDownload = (e: Event) => {
  e.preventDefault();
  download(downloadType.value);
};

const handleFrom = async () => {
  loading.value = true;
  resultAPI.value = false;
  try {
    const arrayInput = document.querySelectorAll('input') as NodeListOf<HTMLInputElement>;
    const inputValues = Array.from(arrayInput).reduce((arr, input) => {
      if (input.name) {
        arr[input.name] = input.type === 'number' ? Number(input.value) : input.value;
      }
      return arr;
    }, {} as Record<string, string | number>);

    const prompt = createPrompt(inputValues);
    const llmProvider = new OpenAiProvider({ temperature: temperature.value });
    const openAiResponse = await llmProvider.generateResponse(prompt);
    const responseObject = JSON.parse(openAiResponse) as { examples: Example[] };

    results.value = responseObject.examples;
    if (results.value.length > 0) {
      currentIndex.value = 0;
      updateDisplayResult();
    }
  }
  catch {
    console.error('Error while generating results:', Error);
  }
  finally {
    resultAPI.value = true;
    loading.value = false;
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
    <div class="header">
      <img src="/car.png" alt="Car logo for this tool" class="logo">
      <h1>Post generator </h1>
    </div>
    <div class="main_content">
      <div class="block_left">
        <!-- appel formulaire -->
        <h3>Personalization</h3>
        <div v-if="resultAPI" class="vertical gap10">
          <label for="titleInput">Live title edit</label>
          <input type="text" id="titleInput" v-model="title">
          <label for="titleColorInput">Live title's color edit</label>
          <input type="color" id="titleColorInput" v-model="titleColor">
          <label for="titleFontSelect">Choose font</label>
          <select id="titleFontSelect" v-model="titleFont">
            <option v-for="font in fonts" :key="font" :value="font">{{ font }}</option>
          </select>
          <label for="titleSizeInput">Title size</label>
          <input type="number" id="titleSizeInput" v-model="titleSize" min="10" max="100" step="1">

          <label for="sloganInput">Live slogan edit</label>
          <textarea v-model="slogan" id="sloganInput"></textarea>
          <label for="sloganColorInput">Live slogan's color edit</label>
          <input type="color" id="sloganColorInput" v-model="sloganColor">
          <label for="sloganFontSelect">Choose font</label>
          <select id="sloganFontSelect" v-model="sloganFont">
            <option v-for="font in fonts" :key="font" :value="font">{{ font }}</option>
          </select>
          <label for="sloganSizeInput">Slogan size</label>
          <input type="number" id="sloganSizeInput" v-model="sloganSize" min="10" max="50" step="1">
        </div>
        <Form @formSubmit="handleFrom" @templateChange="handleTemplateChange" @reloadImage="handleReloadImage"
          v-model="temperature" />
      </div>
      <div class="block_right">
        <!-- appel résultat -->
        <button class="pagination" id="previous" @click="handlePrevious" :disabled="currentIndex === 0">Back</button>
        <div v-if="loading">
          <Spinner />
        </div>
        <div class="vertical" v-else>
          <ResultCanvas :templateType="template" :title="title" :titleColor="titleColor" :titleFont="titleFont"
            :titleSize="titleSize" :slogan="slogan" :sloganColor="sloganColor" :sloganFont="sloganFont"
            :sloganSize="sloganSize" ref="canvasRef" />
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
.logo {
  width: 100px;
}

.header {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: center;
}

.main_content {
  display: flex;
  flex-direction: row;
  padding: 10px;
  width: 80vw;
}

.block_right {
  display: flex;
  flex-direction: row;
  margin: 25px;
  flex: 1;
  justify-content: flex-end;
}

.block_left {
  margin: 0px;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: flex-start;
}

.vertical {
  display: flex;
  flex-direction: column;
}

.gap10 {
  gap: 10px;
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

label {
  align-self: self-start;
}
</style>
