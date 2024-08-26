<script setup>
  import { ref, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import SuccessQR from "../components/success/SuccessQR.vue";
  import { fetchHuespedUuid } from "../api/api.js";

  const route = useRoute();
  const uuid = ref("");
  const data = ref([]);

  onMounted(async () => {
    uuid.value = route.params.uuid;
    if (uuid.value) {
      try {
        data.value = await fetchHuespedUuid(uuid.value);
      } catch (error) {}
    }
  });
</script>
<template>
  <div>
    <div
      class="flex flex-col items-center w-full h-full bg-gray-200 rounded border-dashed border-2 border-black"
    >
      <div
        class="mt-5 p-2 bg-yellow-300 rounded flex items-center justify-center"
      >
        <span class="text-3xl">Estado de tu Pre-Registro</span>
      </div>
      <SuccessQR v-if="!uuid" />
      <div class="flex flex-col items-center justify-center" v-else>
        <span class="text-3xl p-5">{{ data.name + " " + data.last_name }}</span>
        <span class="text-3xl p-5">Identificado: {{ data.identification_number }}</span>
        <div
          :class="[
            'flex items-center justify-center p-3 rounded-md text-3xl mb-5 text-white',
            data.status ? 'bg-green-500' : 'bg-red-500',
          ]"
        >
          <span class="mr-2">Estado: </span
          ><span>{{ data.status ? "Activo" : "Inactivo" }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
