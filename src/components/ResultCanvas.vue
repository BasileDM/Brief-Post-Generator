<script setup lang="ts">
import { onMounted, watch } from 'vue'

const { templateType, title, slogan } = defineProps({
  templateType: String,
  title: String,
  slogan: String
})

const loadImage = (): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.src = "https://picsum.photos/402/730"
    image.crossOrigin="anonymous"

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

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // Draw the image
  ctx.drawImage(image, 0, 0)

  // Draw the title
  ctx.font = '40px serif'
  ctx.fillText(title as string, 10, 50)

  // Draw the slogan
  ctx.font = '20px serif'
  ctx.fillText(slogan as string, 10, 100)

  // Draw the template name
  ctx.font = '20px serif'
  ctx.fillText(templateType as string, 10, 200)
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
