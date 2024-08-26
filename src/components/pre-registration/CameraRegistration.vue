<script setup>
  import { ref, onMounted, defineEmits } from "vue";
  import { CameraOutlined } from "@ant-design/icons-vue";
  import imageCompression from "browser-image-compression";

  const emit = defineEmits();

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
  };
  const sendImage = async () => {
    // Comprimir la imagen
    const compressedFile = await imageCompression.getFilefromDataUrl(
      capturedImage.value,
      {
        maxSizeMB: 0.7,
        maxWidthOrHeight: 300,
        useWebWorker: true,
        initialQuality: 0.3,
      }
    );

    /*
    console.log("Tamaño de la imagen comprimida:", compressedFile.size);
    emit("imageCaptured", compressedFile);
    imageCaptured.value = false;
    */
    // Cambiar la forma en que se manejan los datos de la imagen
    const reader = new FileReader();
    reader.onloadend = () => {
      const bytes = new Uint8Array(reader.result);
      console.log("Tamaño de la imagen comprimida:", compressedFile.size);
      const blob = new Blob([bytes]);
      console.log("Blob details:", blob);
      console.log("Blob size:", blob.size);
      console.log("Blob type:", blob.type);

      emit("imageCaptured", blob);
      imageCaptured.value = false;
    };
    reader.readAsArrayBuffer(compressedFile); // Leer el archivo como un ArrayBuffer
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
        v-if="!imageCaptured && !capturedImage"
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
