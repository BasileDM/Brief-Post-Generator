export default function download() {
    let canvas = document.getElementById('canvas') as HTMLCanvasElement;
    let canvasUrl = canvas.toDataURL("image/jpeg", 0.5);
    const createEl = document.createElement('a');
    createEl.href = canvasUrl;
    createEl.download = "download-this-canvas";
    createEl.click();
    createEl.remove();
}