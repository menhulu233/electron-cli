import { defineStore } from 'pinia'
import { ref } from 'vue'

export type UpdateStatus = 'idle' | 'checking' | 'available' | 'downloading' | 'downloaded' | 'error'

export const useAppStore = defineStore('app', () => {
  const version = ref('')
  const platform = ref('')
  const updateStatus = ref<UpdateStatus>('idle')
  const updateProgress = ref(0)
  const updateInfo = ref<{ version: string; releaseNotes?: string } | null>(null)
  const updateError = ref<string | null>(null)

  async function init() {
    version.value = await window.electron.getVersion()
    platform.value = await window.electron.getPlatform()
    checkForUpdate()
  }

  async function checkForUpdate() {
    updateStatus.value = 'checking'
    await window.electron.update.check()
  }

  function setUpdateAvailable(info: { version: string; releaseNotes?: string }) {
    updateInfo.value = info
    updateStatus.value = 'available'
  }

  function setUpdateNotAvailable() {
    updateStatus.value = 'idle'
  }

  function setUpdateProgress(progress: number) {
    updateProgress.value = progress
    if (updateStatus.value !== 'downloading') {
      updateStatus.value = 'downloading'
    }
  }

  function setUpdateDownloaded() {
    updateStatus.value = 'downloaded'
  }

  function setUpdateError(error: string) {
    updateError.value = error
    updateStatus.value = 'error'
  }

  async function downloadUpdate() {
    await window.electron.update.download()
  }

  async function installUpdate() {
    await window.electron.update.install()
  }

  async function cancelUpdate() {
    await window.electron.update.cancel()
    updateStatus.value = 'idle'
    updateProgress.value = 0
  }

  return {
    version,
    platform,
    updateStatus,
    updateProgress,
    updateInfo,
    updateError,
    init,
    checkForUpdate,
    setUpdateAvailable,
    setUpdateNotAvailable,
    setUpdateProgress,
    setUpdateDownloaded,
    setUpdateError,
    downloadUpdate,
    installUpdate,
    cancelUpdate,
  }
})
