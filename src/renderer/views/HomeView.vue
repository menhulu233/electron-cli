<script setup lang="ts">
import { useAppStore } from '../stores/appStore'

const appStore = useAppStore()
</script>

<template>
  <div class="flex-1 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
    <div class="text-center">
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
        {{ $t('home.welcome') }}
      </h1>
      <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
        {{ $t('home.description') }}
      </p>
      <div class="flex items-center justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
        <span>{{ $t('app.version') }}: {{ appStore.version }}</span>
        <span>|</span>
        <span>Platform: {{ appStore.platform }}</span>
      </div>
    </div>
  </div>
</template>
