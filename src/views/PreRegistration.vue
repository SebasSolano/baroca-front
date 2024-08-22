<script setup>
  import { NumberOutlined, ArrowRightOutlined } from "@ant-design/icons-vue";
  import { reactive, ref } from "vue";
  import { fetchHuespedData } from "../api/api";

  const formState = reactive({
    dni: "",
  });
  const value1 = ref("Cédula de ciudadanía");
  const dataInfo = ref([])
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
    try {
        dataInfo.value = await fetchHuespedData(values)
        console.log(dataInfo.value);
    } catch (error) {
        console.log(errors);
    }
  };
  const handleFinishFailed = (errors) => {
    console.log(errors);
  };
</script>
<template>
  <div class="flex items-center justify-center">
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
          size="large"
          type="primary"
          html-type="submit"
          :disabled="formState.dni === ''"
        >
          <ArrowRightOutlined class="text-xl" />
        </a-button>
      </a-form-item>
    </a-form>
    <h1>Encontro</h1>
  </div>
</template>
