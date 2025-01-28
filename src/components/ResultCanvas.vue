<script setup lang="ts">
import { onMounted, watch, ref } from 'vue'
import type { TemplateVariables } from '../interfaces/TemplateVariables';

const { templateType, title, slogan } = defineProps({
  templateType: String,
  title: String,
  slogan: String
})

const imageRef = ref<HTMLImageElement | null>(null)

const loadImage = (): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = "https://picsum.photos/402/730";
    image.crossOrigin = "anonymous";

    image.onload = () => {
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
  const titleLines = getLines(ctx, title as string, 180);

  ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
  ctx.fillRect(
    0,
    titlePosition.y - 33,
    402,
    40 * titleLines.length
  );
  for (let i = 0; i < titleLines.length; i++) {
    ctx.fillStyle = 'white';
    ctx.font = '40px serif';
    ctx.fillText(titleLines[i], titlePosition.x, titlePosition.y + i * 40);
  }

  // Draw the slogan
  ctx.font = '20px serif';
  const sloganLines = getLines(ctx, slogan as string, 380);

  const sloganStartPosition = templateType == 'template_2' ? sloganPosition.y : sloganPosition.y + titleLines.length * 40;
  for (let i = 0; i < sloganLines.length; i++) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)'
    ctx.fillRect(
      0,
      sloganStartPosition - 21 + i * 30,
      402,
      30
    )
    ctx.fillStyle = 'white';
    ctx.fillText(sloganLines[i], sloganPosition.x, sloganStartPosition + i * 30);
  };
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

watch([() => title, () => slogan, () => templateType], drawCanvas);

onMounted(async () => {
  imageRef.value = await loadImage();
  drawCanvas()
})
</script>

<template>
  <canvas ref="canvasRef" id="canvas" width="402" height="730" style="border:1px solid #000000;"></canvas>
</template>

<style scoped></style>
