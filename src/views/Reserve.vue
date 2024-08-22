<template>
    <div class="video-container">
      <video ref="videoRef" width="720" height="560" autoplay></video>
      <canvas ref="canvasRef" width="720" height="560" class="overlay"></canvas>
      <button @click="captureImage" v-if="!imageCaptured">Tomar Foto</button>
      <div v-if="imageCaptured">
        <button @click="sendImage">Enviar Foto</button>
        <button @click="retakeImage">Tomar Otra Foto</button>
      </div>
    </div>
  </template>

  <script setup>
  import { ref, onMounted } from 'vue';

  const videoRef = ref(null);
  const canvasRef = ref(null);
  const capturedImage = ref(null);
  const imageCaptured = ref(false); // Controla si la imagen ha sido capturada

  // Inicia la cámara del usuario
  const startVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        videoRef.value.srcObject = stream;
      })
      .catch(err => console.error("Error al acceder a la cámara:", err));
  };

  // Dibuja un recuadro en el video
  const drawRectangle = () => {
    const context = canvasRef.value.getContext('2d');
    context.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);
    context.strokeStyle = 'red';
    context.lineWidth = 4;
    context.strokeRect(220, 160, 280, 240); // Ajusta el tamaño y posición del recuadro según sea necesario
  };

  // Captura la imagen y guárdala en la variable
  const captureImage = () => {
    const context = canvasRef.value.getContext('2d');
    context.drawImage(videoRef.value, 0, 0, 720, 560);
    capturedImage.value = canvasRef.value.toDataURL('image/png');
    imageCaptured.value = true;
    console.log("Imagen capturada:", capturedImage.value);
  };

  // Envía la imagen capturada a la base de datos
  const sendImage = () => {
    console.log("Enviando imagen a la base de datos...");
    // Aquí puedes hacer la petición HTTP para enviar la imagen al backend
    // Ejemplo: axios.post('/api/upload', { image: capturedImage.value });
  };

  // Reinicia el proceso para tomar otra foto
  const retakeImage = () => {
    imageCaptured.value = false;
    drawRectangle(); // Redibuja el recuadro
  };

  onMounted(() => {
    startVideo();
    drawRectangle();
  });
  </script>

  <style>
  .video-container {
    position: relative;
    display: inline-block;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
  }

  button {
    display: block;
    margin-top: 10px;
  }
  </style>
