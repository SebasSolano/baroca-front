<script setup>
  import { ref } from "vue";
  import dayjs from "dayjs";

  const dateValue = ref("");
  const selectedDate = ref(null);

  const updateDate = () => {
    selectedDate.value = dayjs(dateValue.value, "YYYY-MM-DD"); // Usar dayjs para formatear la fecha
  };

  const formattedDate = dayjs("2024-01-01", "YYYY-MM-DD"); // Ejemplo de uso de dayjs
  console.log(formattedDate);
</script>

<template>
  <div>
    <h1>Pagina de reservas</h1>
    <a-input
      v-model:value="dateValue"
      placeholder="Ingrese la fecha (YYYY-MM-DD)"
    />
    <a-button type="primary" @click="updateDate">Asignar Fecha</a-button>
    <a-date-picker v-model:value="selectedDate" />
    <span>{{ selectedDate }}</span>
  </div>
</template>
