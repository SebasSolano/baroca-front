<script setup>
  import { NumberOutlined, ArrowRightOutlined } from "@ant-design/icons-vue";
  import { reactive, ref } from "vue";
  import { fetchHuespedData } from "../api/api";

  const formState = reactive({
    dni: "",
  });
  const value1 = ref("Cédula de ciudadanía");
  const dataInfo = ref([]);
  const loading = ref(false);
  const status = ref(false);
  const checked = ref(false);
  const options1 = ref([
    {
      value: "cedula_ciudadania",
      label: "Cédula de ciudadanía",
    },
    {
      value: "licencia_conducir",
      label: "Licencia de conducir",
    },
    {
      value: "pasaporte",
      label: "Pasaporte",
    },
    {
      value: "tarjeta_residencia",
      label: "Tarjeta de residencia",
    },
    {
      value: "tarjeta_nacional_identidad",
      label: "Tarjeta nacional de identidad",
    },
    {
      value: "carne_identidad",
      label: "Carné de identidad",
    },
    {
      value: "permiso_conducir_internacional",
      label: "Permiso de conducir internacional",
    },
    {
      value: "documento_nacional_identidad",
      label: "Documento nacional de identidad",
    },
  ]);

  const focus = () => {
    console.log("focus");
  };
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const handleFinish = async (values) => {
    loading.value = !loading.value;
    try {
      dataInfo.value = await fetchHuespedData(values);
      console.log(dataInfo.value);
      status.value = !status.value;
    } catch (error) {
      console.log(error);
    } finally {
      loading.value = !loading.value;
    }
  };
  const handleFinishFailed = (errors) => {
    console.log(errors);
  };
</script>
<template>
  <div class="flex flex-col items-center justify-center space-y-10 p-5">
    <div class="w-46">
      <a-form
        layout="inline"
        :model="formState"
        @finish="handleFinish"
        @finishFailed="handleFinishFailed"
      >
        <a-form-item>
          <a-select
            ref="select"
            size="large"
            v-model:value="value1"
            :disabled="loading || status"
            style="width: 300px"
            :options="options1"
            @focus="focus"
            @change="handleChange"
          ></a-select>
        </a-form-item>
        <a-form-item>
          <a-input
            size="large"
            v-model:value="formState.dni"
            :disabled="loading || status"
            :placeholder="
              'Ingresa tu ' +
              value1.replace(/_/g, ' ').replace(/\b\w/, (c) => c.toUpperCase())
            "
          >
            <template #prefix
              ><NumberOutlined style="color: rgba(0, 0, 0, 0.25)"
            /></template>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button
            v-if="!status"
            class="flex items-center justify-center"
            size="large"
            type="primary"
            html-type="submit"
            :disabled="formState.dni === '' || loading"
            :loading="loading"
          >
            <ArrowRightOutlined class="text-xl" />
          </a-button>
        </a-form-item>
      </a-form>
    </div>

    <div
      v-show="status"
      class="w-full flex flex-col items-center justify-center slide-down"
    >
      <p class="text-gray-500">Informacion adicional:</p>
      <a-form class="w-full" layout="horizontal" style="max-width: 600px">
        <a-form-item>
          <div class="flex flex-col w-full space-y-3">
            <label>Correo:</label>
            <a-input size="large" />
          </div>
        </a-form-item>
        <a-form-item>
          <div class="flex flex-row justify-center space-x-5">
            <div class="flex flex-col w-full space-y-3">
              <label>Nombre:</label>
              <a-input size="large" />
            </div>
            <div class="flex flex-col w-full space-y-3">
              <label>Apellido:</label>
              <a-input size="large" />
            </div>
          </div>
        </a-form-item>
        <a-form-item label="Origen (Nacionalidad):">
          <a-select>
            <a-select-option value="demo">Colombia</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="DatePicker">
          <a-date-picker />
        </a-form-item>
        <a-form-item label="InputNumber">
          <a-select>
            <a-select-option value="demo">Colombia</a-select-option>
          </a-select>
          <a-input-number />
        </a-form-item>
        <a-form-item label="Primera vez?">
          <a-switch v-model:checked="checked" />
        </a-form-item>
        <a-form-item class="w-full text-center">
          <a-button type="primary" size="large">Enviar informacion</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<style scoped>
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slide-down {
    from {
      transform: translateY(-20px);
    }
    to {
      transform: translateY(0);
    }
  }

  .fade-in {
    animation: fade-in 2s forwards;
  }

  .slide-down {
    animation: slide-down 1s forwards;
  }
</style>
