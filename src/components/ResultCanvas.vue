<script setup lang="ts">
import { onMounted, watch } from 'vue'
import type { TemplateVariables } from '../interfaces/TemplateVariables';

const { templateType, title, slogan } = defineProps({
  templateType: String,
  title: String,
  slogan: String
})

const loadImage = (): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.src = "https://picsum.photos/402/730"

    image.onload = () => {
      resolve(image)
    }

    image.onerror = () => {
      reject(new Error('Failed to load image'))
    }
  })
}

const drawCanvas = async () => {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement
  if (!canvas) return

  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
  const image = await loadImage()
  if (!image) return

  const { titlePosition, sloganPosition } = getTemplateVariables(templateType as string)

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // Draw the image
  ctx.drawImage(image, 0, 0)

  // Draw the title
  ctx.font = '40px serif'
  ctx.fillText(title as string, titlePosition.x, titlePosition.y)

  // Draw the slogan
  ctx.font = '20px serif'
  const sloganLines = getSloganLines(ctx, slogan as string, 400)

  for (let i = 0; i < sloganLines.length; i++) {
    ctx.fillText(sloganLines[i], sloganPosition.x, sloganPosition.y + i * 30)
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

function getSloganLines(ctx: CanvasRenderingContext2D, slogan: string, maxWidth = 400) {
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

onMounted(() => {
  drawCanvas()
})
</script>

<template>
  <canvas ref="canvasRef" id="canvas" width="402" height="730" style="border:1px solid #000000;"></canvas>
</template>

<style scoped></style>
