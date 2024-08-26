<script setup>
  import { ref, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import SuccessQR from "../components/success/SuccessQR.vue";

  const route = useRoute();
  const uuid = ref("");

  onMounted(() => {
    uuid.value = route.params.id;
  });
</script>
<template>
  <div>
    <div class="flex flex-col items-center w-full h-full bg-gray-200 rounded border border-black">
    <div class="mt-5 p-2 bg-yellow-300 rounded flex items-center justify-center">
        <span class="text-3xl">Estado de tu Pre-Registro</span>
    </div>
    <SuccessQR v-if="!uuid" />
  </div>

  </div>
</template>
