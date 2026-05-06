<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useAppStore } from '../stores/appStore';

const appStore = useAppStore();

const isVisible = computed(() => {
  return ['available', 'downloading', 'downloaded', 'error'].includes(appStore.updateStatus);
});

const progressPercent = computed(() => Math.round(appStore.updateProgress * 100));

onMounted(() => {
  window.electron.update.onAvailable(info => {
    appStore.setUpdateAvailable(info as { version: string; releaseNotes?: string });
  });
  window.electron.update.onNotAvailable(() => {
    appStore.setUpdateNotAvailable();
  });
  window.electron.update.onProgress(progress => {
    appStore.setUpdateProgress(progress);
  });
  window.electron.update.onDownloaded(() => {
    appStore.setUpdateDownloaded();
  });
  window.electron.update.onError(error => {
    appStore.setUpdateError(error);
  });
});

async function handleInstall() {
  await appStore.installUpdate();
}

async function handleLater() {
  await appStore.cancelUpdate();
}
</script>

<template>
  <div
    v-if="isVisible"
    class="fixed bottom-4 right-4 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
  >
    <div class="p-4">
      <div v-if="appStore.updateStatus === 'checking'" class="text-center py-2">
        <span class="text-gray-600 dark:text-gray-400">检查更新中...</span>
      </div>

      <div v-else-if="appStore.updateStatus === 'available'" class="space-y-3">
        <h3 class="font-semibold text-gray-900 dark:text-white">发现新版本</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          版本 {{ appStore.updateInfo?.version }} 可用
        </p>
        <button
          class="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium"
          @click="appStore.downloadUpdate()"
        >
          下载更新
        </button>
      </div>

      <div v-else-if="appStore.updateStatus === 'downloading'" class="space-y-3">
        <h3 class="font-semibold text-gray-900 dark:text-white">正在下载更新</h3>
        <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            class="bg-blue-600 h-2 rounded-full transition-all"
            :style="{ width: `${progressPercent}%` }"
          ></div>
        </div>
        <span class="text-sm text-gray-600 dark:text-gray-400">{{ progressPercent }}%</span>
      </div>

      <div v-else-if="appStore.updateStatus === 'downloaded'" class="space-y-3">
        <h3 class="font-semibold text-gray-900 dark:text-white">更新已就绪</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">点击立即安装更新</p>
        <div class="flex gap-2">
          <button
            class="flex-1 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium"
            @click="handleInstall"
          >
            立即安装
          </button>
          <button
            class="flex-1 py-2 px-4 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md text-sm font-medium"
            @click="handleLater"
          >
            稍后
          </button>
        </div>
      </div>

      <div v-else-if="appStore.updateStatus === 'error'" class="space-y-3">
        <h3 class="font-semibold text-red-600 dark:text-red-400">更新错误</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">{{ appStore.updateError }}</p>
        <button
          class="w-full py-2 px-4 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md text-sm font-medium"
          @click="appStore.checkForUpdate()"
        >
          重试
        </button>
      </div>
    </div>
  </div>
</template>
