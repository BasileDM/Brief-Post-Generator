export default function download(downloadType: string | null) {
    if (!downloadType) {
        alert('Please select a download format.');
        return;
    }
    let canvas = document.getElementById('canvas') as HTMLCanvasElement;
    let canvasUrl = canvas.toDataURL(downloadType, 0.5);
    const createEl = document.createElement('a');
    createEl.href = canvasUrl;
    createEl.download = "download-this-canvas";
    createEl.click();
    createEl.remove();
}