<script setup>
  import { ref, onMounted } from "vue";
  import { CameraOutlined } from "@ant-design/icons-vue";

  const videoRef = ref(null);
  const canvasRef = ref(null);
  const capturedImage = ref(null);
  const imageCaptured = ref(false);

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.value.srcObject = stream;
      })
      .catch((err) => console.error("Error al acceder a la cámara:", err));
  };

  const drawRectangle = () => {
    const context = canvasRef.value.getContext("2d");
    context.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);
    context.strokeStyle = "red";
    context.lineWidth = 4;
    context.strokeRect(100, 50, 300, 300);
  };

  const captureImage = () => {
    const context = canvasRef.value.getContext("2d");
    context.drawImage(videoRef.value, 0, 0, 600, 400);
    capturedImage.value = canvasRef.value.toDataURL("image/png");
    imageCaptured.value = true;
    console.log("Imagen capturada:", capturedImage.value);
  };

  const sendImage = () => {
    console.log("Enviando imagen a la base de datos...");
  };

  const retakeImage = () => {
    imageCaptured.value = false;
    drawRectangle();
  };

  onMounted(() => {
    startVideo();
    drawRectangle();
  });
</script>

<template>
  <div class="relative flex-col items-center">
    <video ref="videoRef" width="500" height="500" autoplay></video>
    <canvas ref="canvasRef" width="500" height="500" class="overlay"></canvas>
    <div class="flex items-center justify-center">
      <a-button
        class="h-20 w-20 text-3xl mt-2"
        @click="captureImage"
        v-if="!imageCaptured"
      >
        <CameraOutlined />
      </a-button>
    </div>
    <div
      class="flex items-center justify-center space-x-3 mt-10"
      v-if="imageCaptured"
    >
      <a-button class="h-20 w-32" @click="sendImage">Enviar Foto</a-button>
      <a-button class="h-20 w-32" @click="retakeImage"
        >Tomar Otra Foto</a-button
      >
    </div>
  </div>
</template>
<style scoped>
  .video-container {
    position: relative;
    display: flex;
    justify-content: center;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
  }
</style>
