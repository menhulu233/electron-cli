<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import HomeView from './views/HomeView.vue'
import UpdateDialog from './components/UpdateDialog.vue'
import { useAppStore } from './stores/appStore'

const appStore = useAppStore()

onMounted(async () => {
  await appStore.init()
})

onUnmounted(() => {
  window.electron.update.removeAllListeners()
})
</script>

<template>
  <div class="h-full flex flex-col">
    <HomeView />
    <UpdateDialog />
  </div>
</template>
