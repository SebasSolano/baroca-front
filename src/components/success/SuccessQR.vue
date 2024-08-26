<script setup>
  import QRCode from "qrcode";
  import { ref, onMounted } from "vue";
  const qrCodeDataUrl = ref("");
  const link = ref(localStorage.getItem("link"));

  onMounted(async () => {
    if (link.value) qrCodeDataUrl.value = await QRCode.toDataURL(link.value);
  });
</script>
<template>
  <div class="text-xl mt-5 flex flex-col justify-center">
    <span class="mb-5">Para ver tu estado debes escanear el siguiente QR:</span>
    <img v-if="qrCodeDataUrl" class="mb-5" :src="qrCodeDataUrl" alt="QR Code" />
  </div>
</template>
