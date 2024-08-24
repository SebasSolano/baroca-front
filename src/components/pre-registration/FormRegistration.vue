<script setup>
  import { ref, reactive, onMounted } from "vue";
  import { fetchCountryData } from "../../api/api.js";
  import { message } from "ant-design-vue";
  import CameraRegistration from "./CameraRegistration.vue";
  import { ArrowRightOutlined, ArrowLeftOutlined } from "@ant-design/icons-vue";

  const checked = ref(false);
  const countries = ref([]);
  const selectedCountry = ref(undefined);
  const phoneCode = ref(null);
  const countryOptions = ref([]);
  const current = ref(0);
  const transport = ref("Avion");
  const form = reactive({
    name: "",
    last_name: "",
    date_of_birth: "",
    identification_number: 0,
    origin: "",
    state: "",
    city: "",
    address: "",
    phone: 0,
    email: "",
    transport_origin: "",
    document_type: "",
    reason_trip: "",
    is_first_time: false,
    photo_Base64: null,
    status: false,
    created_at: "",
    updated_at: "",
  });
  const next = () => {
    console.log(current.value);
    switch (current.value) {
      case 0:
        console.log("Entro case 0");
        if (
          form.name !== "" &&
          form.last_name !== "" &&
          form.email !== "" &&
          form.date_of_birth !== ""
        ) {
          console.log("Entro al if");
          current.value++;
        } else {
          message.error("Debes rellenar los campos necesarios");
        }
        break;
      case 1:
        if (
          selectedCountry.value !== undefined &&
          form.state !== "" &&
          form.city !== "" &&
          form.phone > 0
        ) {
          current.value++;
        } else {
          message.error("Debes rellenar los campos necesarios");
        }
        break;
      case 2:
        if (form.reason_trip !== "") {
          current.value++;
        } else {
          message.error("Debes rellenar los campos necesarios");
        }
        break;
      default:
        message.error("Error");
        break;
    }
  };
  const prev = () => {
    if(current.value == 3) form.photo_Base64 = null
    current.value--;
  };
  const sendInfo = () => {
    if (form.photo_Base64 !== null) {
      console.log(form.photo_Base64);
      message.success("Datos enviados correctamente!");
    } else {
      message.error("Por favor, tomate la foto!");
    }
  };
  const steps = [
    {
      title: "Información básica",
    },
    {
      title: "Información de contacto",
    },
    {
      title: "Detalles del viaje",
    },
    {
      title: "Foto de validacion",
    },
  ];
  const transportOptions = ref([
    {
      value: "automovil",
      label: "Automovil",
    },
    {
      value: "autobus",
      label: "Autobus",
    },
    {
      value: "tren",
      label: "Tren",
    },
    {
      value: "motocicleta",
      label: "Motocicleta",
    },
    {
      value: "bicicleta",
      label: "Bicicleta",
    },
    {
      value: "avion",
      label: "Avion",
    },
    {
      value: "barco",
      label: "Barco",
    },
  ]);
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const filterOption = (input, option) => {
    return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };

  const getCountryDetails = () => {
    const country = countries.value.find(
      (country) => country.name.common === selectedCountry.value
    );
    if (country) {
      const root = country.idd?.root || "";
      const suffix = country.idd?.suffixes ? country.idd.suffixes[0] : "";
      phoneCode.value = root + suffix;
    } else {
      phoneCode.value = null;
    }
  };

  const loadCountries = async () => {
    try {
      countries.value = await fetchCountryData();
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  onMounted(() => {
    loadCountries().then(() => {
      countryOptions.value = countries.value
        .map((country) => ({
          value: country.name.common,
          label: country.name.common,
        }))
        .sort((a, b) => a.label.localeCompare(b.label));
    });
  });
</script>

<template>
  <div class="w-full slide-down">
    <a-steps :current="current" :items="items"></a-steps>
    <div class="steps-content">
      <div class="w-full flex flex-col items-center justify-center">
        <p class="text-gray-500">Rellena los formularios:</p>
        <a-form class="w-full" layout="horizontal" style="max-width: 600px">
          <div v-if="current === 0">
            <a-form-item>
              <div class="flex flex-row justify-center space-x-5">
                <div class="flex flex-col w-full space-y-3">
                  <label>Nombre:</label>
                  <a-input
                    v-model:value="form.name"
                    class="h-12"
                    size="large"
                    required
                  />
                </div>
                <div class="flex flex-col w-full space-y-3">
                  <label>Apellido:</label>
                  <a-input
                    v-model:value="form.last_name"
                    class="h-12"
                    size="large"
                    required
                  />
                </div>
              </div>
            </a-form-item>
            <a-form-item>
              <div class="flex flex-col w-full space-y-3">
                <label>Correo:</label>
                <a-input
                  v-model:value="form.email"
                  type="email"
                  class="h-12"
                  size="large"
                  required
                />
              </div>
            </a-form-item>
            <a-form-item>
              <div class="flex flex-col space-y-3 w-full">
                <label>Fecha de nacimiento:</label>
                <a-date-picker
                  v-model:value="form.date_of_birth"
                  class="h-12"
                  size="large"
                  required
                />
              </div>
            </a-form-item>
          </div>
          <div v-else-if="current === 1">
            <a-form-item>
              <div class="flex flex-row items-center justify-center space-x-5">
                <div class="flex flex-col space-y-3 w-full">
                  <label>Origen (Nacionalidad):</label>
                  <a-select
                    v-model:value="selectedCountry"
                    show-search
                    placeholder="Seleciona tu Pais"
                    style="width: 200px"
                    :options="countryOptions"
                    :filter-option="filterOption"
                    @change="getCountryDetails"
                    size="large"
                    required
                  ></a-select>
                </div>
                <div class="flex flex-col space-y-3 w-full">
                  <label>Departamento/Estado:</label>
                  <a-input
                    v-model:value="form.state"
                    class="h-12"
                    size="large"
                    required
                  />
                </div>
                <div class="flex flex-col space-y-3 w-full">
                  <label>Cuidad:</label>
                  <a-input
                    v-model:value="form.city"
                    class="h-12"
                    size="large"
                    required
                  />
                </div>
              </div>
            </a-form-item>
            <a-form-item>
              <div class="flex flex-row items-center justify-center space-x-5">
                <div class="flex flex-col w-full space-y-3">
                  <label>Direccion:</label>
                  <a-input
                    v-model:value="form.address"
                    type="text"
                    class="h-12"
                    size="large"
                    required
                  />
                </div>
              </div>
            </a-form-item>
            <a-form-item>
              <div class="flex flex-row items-center justify-center space-x-5">
                <div v-if="phoneCode" class="flex flex-col w-full space-y-3">
                  <label>Telefono:</label>
                  <div class="flex items-center space-x-3">
                    <span class="bg-gray-200 p-1 rounded-sm">{{
                      phoneCode
                    }}</span>
                    <a-input
                      v-model:value="form.phone"
                      type="number"
                      size="large"
                      required
                    />
                  </div>
                </div>
              </div>
            </a-form-item>
          </div>
          <div v-else-if="current === 2">
            <a-form-item>
              <div class="flex flex-col space-y-3 w-full">
                <label>Medio de transporte de origen:</label>
                <a-select
                  ref="select"
                  v-model:value="transport"
                  size="large"
                  :options="transportOptions"
                  required
                ></a-select>
              </div>
            </a-form-item>

            <a-form-item>
              <div class="flex flex-col space-y-3 w-full">
                <label>Motivo de viaje:</label>
                <a-textarea
                  v-model:value="form.reason_trip"
                  size="large"
                  required
                />
              </div>
            </a-form-item>

            <a-form-item label="Primera vez?">
              <a-switch v-model:checked="checked" required />
            </a-form-item>
          </div>
          <div v-else>
            <CameraRegistration @imageCaptured="form.photo_Base64 = $event" />
          </div>

          <a-form-item>
            <div class="w-full flex items-center justify-center space-x-5" :class="form.photo_Base64 ? 'mt-10' : 'mt-5'">
              <a-button
                v-if="current < steps.length - 1"
                class="h-20 w-full text-2xl flex items-center justify-center"
                type="primary"
                @click="next"
                ><ArrowRightOutlined
              /></a-button>
              <a-button
                v-if="current == steps.length - 1"
                class="h-20 w-full text-2xl flex items-center justify-center"
                type="primary"
                @click="sendInfo"
              >
                Enviar informacion
              </a-button>
              <a-button
                v-if="current > 0"
                class="h-20 w-full text-2xl flex items-center justify-center"
                @click="prev"
                ><ArrowLeftOutlined
              /></a-button>
            </div>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .steps-content {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fafafa;
    min-height: 200px;
    padding-top: 80px;
  }

  .steps-action {
    margin-top: 24px;
  }

  [data-theme="dark"] .steps-content {
    background-color: #2f2f2f;
    border: 1px dashed #404040;
  }
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
