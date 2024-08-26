<script setup>
  import { NumberOutlined, ArrowRightOutlined } from "@ant-design/icons-vue";
  import { reactive, ref } from "vue";
  import { fetchHuespedData } from "../api/api";
  import _ from "lodash";
  import FromRegistration from "../components/pre-registration/FormRegistration.vue";

  const formState = reactive({ dni: "" });
  const value1 = ref("Cédula de ciudadanía");
  const dataInfo = ref([]);
  const loading = ref(false);
  const status = ref(false);
  const dataExists = ref(false);
  const options1 = ref([
    { value: "cedula_ciudadania", label: "Cédula de ciudadanía" },
    { value: "licencia_conducir", label: "Licencia de conducir" },
    { value: "pasaporte", label: "Pasaporte" },
    { value: "tarjeta_residencia", label: "Tarjeta de residencia" },
    {
      value: "tarjeta_nacional_identidad",
      label: "Tarjeta nacional de identidad",
    },
    { value: "carne_identidad", label: "Carné de identidad" },
    {
      value: "permiso_conducir_internacional",
      label: "Permiso de conducir internacional",
    },
    {
      value: "documento_nacional_identidad",
      label: "Documento nacional de identidad",
    },
  ]);

  const handleFinish = async () => {
    loading.value = true;
    try {
      dataInfo.value = await fetchHuespedData(formState.dni);
      if (dataInfo.value.body.data !== null) {
        dataExists.value = true;
      }else{
        dataInfo.value = null;
      }
      if (value1.value === "Cédula de ciudadanía")
        value1.value = "cedula_ciudadania";
    } catch (error) {
      console.log(error);
      dataExists.value = false;
    } finally {
      status.value = true;
      loading.value = false;
    }
  };

  const handleFinishFailed = (errors) => console.log(errors);
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
          />
        </a-form-item>
        <a-form-item>
          <a-input
            size="large"
            v-model:value="formState.dni"
            :disabled="loading || status"
            :placeholder="`Ingresa tu ${_.startCase(
              value1.replace(/_/g, ' ')
            )}`"
          >
            <template #prefix>
              <NumberOutlined style="color: rgba(0, 0, 0, 0.25)" />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button
            v-if="!status"
            class="flex items-center justify-center"
            size="large"
            type="primary"
            html-type="submit"
            :disabled="!formState.dni || loading"
            :loading="loading"
          >
            <ArrowRightOutlined class="text-xl" />
          </a-button>
        </a-form-item>
      </a-form>
    </div>
    <FromRegistration
      :data="dataInfo ? dataInfo.body.data : null"
      :dni="formState.dni"
      :document_type="value1"
      :dataExists="dataExists"
      v-if="status"
    />
  </div>
</template>
