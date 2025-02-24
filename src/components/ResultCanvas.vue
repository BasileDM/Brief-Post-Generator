<script setup lang="ts">
import { onMounted, watch, ref } from 'vue'
import type { TemplateVariables } from '../interfaces/TemplateVariables';

const { templateType, title, titleColor, titleFont, titleSize, slogan, sloganColor, sloganFont, sloganSize } = defineProps({
  templateType: String,
  title: String,
  titleColor: String,
  titleFont: String,
  slogan: String,
  sloganColor: String,
  sloganFont: String,
  titleSize: Number, 
  sloganSize: Number 
})

const imageRef = ref<HTMLImageElement | null>(null)

const loadImage = (): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = "https://picsum.photos/402/730?random=" + Math.random();
    image.crossOrigin = "anonymous";

    image.onload = () => {
      imageRef.value = image;
      resolve(image);
    };

    image.onerror = () => {
      reject(new Error('Failed to load image'));
    };
  });
}

const drawCanvas = async () => {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  if (!canvas) return;

  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  const image = imageRef.value;
  if (!image) return;

  const { titlePosition, sloganPosition } = getTemplateVariables(templateType as string);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the image
  ctx.drawImage(image, 0, 0);

  // Draw the title
  ctx.font = `${titleSize || 40}px ${titleFont || 'serif'}`;
  
  const titleLines = getLines(ctx, title as string, 380);
  if(!titleSize) {
    throw new Error();
  }
  const titleLineHeight = titleSize * 1.2;

  ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
  ctx.fillRect(0, titlePosition.y - titleSize * 0.8, 402, titleLineHeight * titleLines.length);

  ctx.fillStyle = titleColor || 'white';
  for (let i = 0; i < titleLines.length; i++) {
    ctx.fillText(titleLines[i], titlePosition.x, titlePosition.y + i * titleLineHeight);
  }

  // Draw the slogan
  ctx.font = `${sloganSize || 20}px ${sloganFont || 'serif'}`;
  const sloganLines = getLines(ctx, slogan as string, 380);
  if(!sloganSize) {
    throw new Error();
  }
  const sloganLineHeight = sloganSize * 1.2;

  const sloganStartPosition = templateType == 'template_2' ? sloganPosition.y : sloganPosition.y + titleLines.length * titleLineHeight;
  
  for (let i = 0; i < sloganLines.length; i++) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(0, sloganStartPosition - sloganSize * 0.8 + i * sloganLineHeight, 402, sloganLineHeight);
    ctx.fillStyle = sloganColor || 'white';
    ctx.fillText(sloganLines[i], sloganPosition.x, sloganStartPosition + i * sloganLineHeight);
  }
}

const getTemplateVariables = (templateType: string): TemplateVariables => {
  switch (templateType) {
    case 'template_1':
      return {
        titlePosition: { x: 10, y: 50 },
        sloganPosition: { x: 10, y: 100 }
      }
    case 'template_2':
      return {
        titlePosition: { x: 10, y: 50 },
        sloganPosition: { x: 10, y: 600 }
      }
    default:
      return {
        titlePosition: { x: 10, y: 50 },
        sloganPosition: { x: 10, y: 100 }
      }
  }
}

function getLines(ctx: CanvasRenderingContext2D, slogan: string, maxWidth = 400) {
  var words = slogan.split(" ");
  var lines = [];
  var currentLine = words[0];

  for (var i = 1; i < words.length; i++) {
    var word = words[i];
    var width = ctx.measureText(currentLine + " " + word).width;
    if (width < maxWidth) {
      currentLine += " " + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  lines.push(currentLine);
  return lines;
}

defineExpose({ loadImage, drawCanvas });

watch([() => title, () => titleColor, () => titleFont, () => titleSize, () => slogan, () => sloganColor, () => sloganFont, () => sloganSize, () => templateType, () => imageRef], drawCanvas);

onMounted(async () => {
  imageRef.value = await loadImage();
  drawCanvas()
})
</script>

<template>
  <canvas ref="canvasRef" id="canvas" width="402" height="730" style="border:1px solid #000000;"></canvas>
</template>

<style scoped></style>
