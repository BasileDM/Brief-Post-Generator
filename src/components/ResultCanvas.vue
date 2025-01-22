<script setup lang="ts">
import { onMounted } from 'vue'

defineProps({
  templateType: String
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

const drawCanvas = async (title: string) => {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

  const image = await loadImage()
  if (!image) return

  ctx.drawImage(image, 0, 0)
  ctx.font = '50px serif'
  ctx.fillText(title, 10, 50)
}

defineExpose({
  drawCanvas
})

onMounted(() => {
  drawCanvas("Title")
})
</script>

<template>
  <canvas id="canvas" width="402" height="730" style="border:1px solid #000000;"></canvas>
</template>

<style scoped></style>
