<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import HomeView from './views/HomeView.vue';
import UpdateDialog from './components/UpdateDialog.vue';
import TitleBar from './components/TitleBar.vue';
import { useAppStore } from './stores/appStore';

const appStore = useAppStore();

onMounted(async () => {
  await appStore.init();
});

onUnmounted(() => {
  window.electron.update.removeAllListeners();
});
</script>

<template>
  <div class="h-full flex flex-col">
    <TitleBar />
    <HomeView />
    <UpdateDialog />
  </div>
</template>
