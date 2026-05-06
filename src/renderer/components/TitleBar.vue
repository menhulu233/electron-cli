<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const isMaximized = ref(false);

async function handleMinimize() {
  await window.electron.window.minimize();
}

async function handleMaximize() {
  await window.electron.window.maximize();
}

async function handleClose() {
  await window.electron.window.close();
}

function updateMaximizedState() {
  isMaximized.value = true;
}

function updateUnmaximizedState() {
  isMaximized.value = false;
}

onMounted(async () => {
  isMaximized.value = await window.electron.window.isMaximized();
  window.electron.window.onMaximized(updateMaximizedState);
  window.electron.window.onUnmaximized(updateUnmaximizedState);
});

onUnmounted(() => {
  window.electron.window.removeAllWindowListeners();
});
</script>

<template>
  <div
    class="h-10 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between select-none"
  >
    <div class="flex items-center px-4 app-drag-region flex-1 h-full">
      <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{
        $t('app.title')
      }}</span>
    </div>
    <div class="flex items-center h-full no-drag-region">
      <button
        class="h-full px-4 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        :title="$t('window.minimize')"
        @click="handleMinimize"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
        </svg>
      </button>
      <button
        class="h-full px-4 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        :title="isMaximized ? $t('window.restore') : $t('window.maximize')"
        @click="handleMaximize"
      >
        <svg
          v-if="isMaximized"
          class="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
        <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
          />
        </svg>
      </button>
      <button
        class="h-full px-4 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-red-500 hover:text-white transition-colors"
        :title="$t('window.close')"
        @click="handleClose"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.app-drag-region {
  -webkit-app-region: drag;
}
.no-drag-region {
  -webkit-app-region: no-drag;
}
</style>
