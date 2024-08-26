<script setup>
  import { useRoute } from "vue-router";
  import { computed, ref, onMounted } from "vue";
  import { isEmpty, capitalize } from "lodash";
  import QRCode from "qrcode";
  import { ArrowLeftOutlined } from "@ant-design/icons-vue";

  const modal2Visible = ref(false);
  const qrCodeDataUrl = ref("");
  const route = useRoute();
  const isMainPage = computed(() => route.path === "/");

  const titlePage = computed(() => {
    const path = route.path.replace(/\/:id$/, "");
    return isEmpty(path) || path === "/" ? "Home" : capitalize(path.slice(1));
  });

  onMounted(async () => {
    try {
      qrCodeDataUrl.value = await QRCode.toDataURL(
        "https://docs.google.com/forms/d/e/1FAIpQLSfSsAylMRAGP37hbfUJSM2UtsMTygZqqqzcT9up4pH8a4IXMg/viewform?pli=1"
      );
    } catch (error) {
      console.error(error);
    }
  });
</script>
<template>
  <a-layout style="min-height: 100vh">
    <a-layout-header class="custom-a-layout-header" :style="{ width: '100%' }">
      <div
        class="h-20 flex items-center justify-center sm:justify-start space-x-3"
      >
        <router-link v-if="route.path !== '/'" to="/" class="text-white text-3xl p-2 transition-all m-2 hover:text-white hover:scale-125">
          <ArrowLeftOutlined />
        </router-link>
        <router-link to="/">
          <img class="w-14 rounded" src="../assets/images/baroca.png" />
        </router-link>
        <h1 class="text-white text-xl">{{ titlePage }}</h1>
      </div>
    </a-layout-header>
    <a-layout-content :style="{ padding: '0 50px', marginTop: '64px' }">
      <div
        class="rounded-xl"
        :style="{ background: '#fff', padding: '24px', minHeight: '500px' }"
      >
        <router-view v-show="!isMainPage" v-slot="{ Component }">
          <transition name="grow-in" mode="out-in">
            <Component :is="Component" />
          </transition>
        </router-view>
        <p v-if="isMainPage" class="w-full text-2xl text-zinc-500">
          Elige la opcion necesaria:
        </p>
        <div v-if="isMainPage">
          <div
            class="flex justify-center items-center flex-col space-y-5 sm:flex-row sm:space-x-10 sm:space-y-0 mt-20"
          >
            <router-link
              to="/pre-registration"
              class="mechanical-btn flex items-center hover:text-black justify-center bg-white text-black border-2 border-black font-light py-4 px-8 rounded text-3xl w-9/12 lg:w-3/12 h-[200px]"
            >
              Pre-Registro
            </router-link>
            <router-link
              to="/reserve"
              class="mechanical-btn flex items-center justify-center hover:text-black bg-white text-black border-2 border-black font-light py-4 px-8 rounded text-3xl w-9/12 lg:w-3/12 h-[200px]"
            >
              Reserva
            </router-link>
          </div>
          <div
            class="flex justify-center items-center flex-col space-y-5 sm:flex-row sm:space-x-10 sm:space-y-0 mt-5"
          >
            <button
              class="mechanical-btn flex items-center hover:text-black justify-center bg-white text-black border-2 border-black font-light py-4 px-8 rounded text-3xl w-9/12 lg:w-3/12 h-[200px]"
              @click="modal2Visible = true"
            >
              Check-out
            </button>
            <a-modal
              v-model:open="modal2Visible"
              title="Escanea el codigo QR para poder entrar al Check-out"
              centered
              @ok="modal2Visible = false"
            >
              <div class="flex items-center justify-center">
                <img :src="qrCodeDataUrl" alt="QR Code" />
              </div>
            </a-modal>

            <router-link
              to="/shop"
              class="mechanical-btn flex items-center justify-center hover:text-black bg-white text-black border-2 border-black font-light py-4 px-8 rounded text-3xl w-9/12 lg:w-3/12 h-[200px]"
            >
              Shop
            </router-link>
          </div>
        </div>
      </div>
    </a-layout-content>
    <a-layout-footer
      :style="{
        background: '#E9E9E9',
        textAlign: 'center',
        width: '100%',
      }"
    >
      Baroca ©2024
    </a-layout-footer>
  </a-layout>
</template>
<style scoped>
  .custom-a-layout-header {
    background-color: #410099;
    height: 100%;
  }
  #components-layout-demo-fixed {
    width: 120px;
    height: 31px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px 24px 16px 0;
    float: left;
  }
  .site-layout .site-layout-background {
    background: #fff;
  }
  .mechanical-btn {
    transition: all 0.1s ease-in-out;
    box-shadow: 5px 5px #4a5568;
  }
  .mechanical-btn:active {
    transform: translateY(4px);
    box-shadow: 0 0px #4a5568;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease-out;
  }

  .slide-enter-from,
  .slide-leave-to {
    opacity: 0;
    transform: translateX(-100%);
  }

  .slide-enter-active,
  .slide-leave-active {
    transition: 0.3s ease-out;
  }

  .slide-down-enter-from,
  .slide-down-leave-to {
    opacity: 0;
    transform: translateY(300px);
  }

  .slide-down-enter-active,
  .slide-down-leave-active {
    transition: 0.3s ease-out;
  }

  .grow-in-enter-from,
  .grow-in-leave-to {
    opacity: 0;
    transform: scale(0.3);
  }

  .grow-in-enter-active,
  .grow-in-leave-active {
    transition: 0.3s ease-out;
  }

  .grow-out-enter-from,
  .grow-out-leave-to {
    opacity: 0;
    transform: scale(1.5);
  }

  .grow-out-enter-active,
  .grow-out-leave-active {
    transition: 0.3s ease-out;
  }
</style>
