<script setup>
  import { useRoute } from "vue-router";
  import { ref, onMounted } from "vue";

  const route = useRoute();
  const isMainPage = ref(false);

  onMounted(() => {
    isMainPage.value = route.path === "/" ? true : false;
  });
</script>
<template>
  <a-layout>
    <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
      <div class="logo" />
    </a-layout-header>
    <a-layout-content :style="{ padding: '0 50px', marginTop: '64px' }">
      <div :style="{ background: '#fff', padding: '24px', minHeight: '500px' }">
        <router-view v-if="!isMainPage" />
      </div>
    </a-layout-content>
    <a-layout-footer :style="{ textAlign: 'center' }">
      Baroca ©2024
    </a-layout-footer>
  </a-layout>
</template>
<style scoped>
  #components-layout-demo-fixed .logo {
    width: 120px;
    height: 31px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px 24px 16px 0;
    float: left;
  }
  .site-layout .site-layout-background {
    background: #fff;
  }
</style>
