import { contextBridge, ipcRenderer } from 'electron'
import { IpcChannel } from '../shared/constants/ipcChannels'

// Expose protected methods to renderer
const electronAPI = {
  // App
  getVersion: () => ipcRenderer.invoke(IpcChannel.App.GetVersion),
  getPlatform: () => ipcRenderer.invoke(IpcChannel.App.GetPlatform),

  // Window
  window: {
    minimize: () => ipcRenderer.invoke(IpcChannel.Window.Minimize),
    maximize: () => ipcRenderer.invoke(IpcChannel.Window.Maximize),
    close: () => ipcRenderer.invoke(IpcChannel.Window.Close),
    isMaximized: () => ipcRenderer.invoke(IpcChannel.Window.IsMaximized),
  },

  // Update
  update: {
    check: () => ipcRenderer.invoke(IpcChannel.Update.Check),
    download: () => ipcRenderer.invoke(IpcChannel.Update.Download),
    install: () => ipcRenderer.invoke(IpcChannel.Update.Install),
    cancel: () => ipcRenderer.invoke(IpcChannel.Update.Cancel),
    onProgress: (callback: (progress: number) => void) => {
      ipcRenderer.on(IpcChannel.Update.OnProgress, (_, progress) => callback(progress))
    },
    onAvailable: (callback: (info: unknown) => void) => {
      ipcRenderer.on(IpcChannel.Update.OnAvailable, (_, info) => callback(info))
    },
    onNotAvailable: (callback: () => void) => {
      ipcRenderer.on(IpcChannel.Update.OnNotAvailable, () => callback())
    },
    onDownloaded: (callback: () => void) => {
      ipcRenderer.on(IpcChannel.Update.OnDownloaded, () => callback())
    },
    onError: (callback: (error: string) => void) => {
      ipcRenderer.on(IpcChannel.Update.OnError, (_, error) => callback(error))
    },
    removeAllListeners: () => {
      ipcRenderer.removeAllListeners(IpcChannel.Update.OnProgress)
      ipcRenderer.removeAllListeners(IpcChannel.Update.OnAvailable)
      ipcRenderer.removeAllListeners(IpcChannel.Update.OnNotAvailable)
      ipcRenderer.removeAllListeners(IpcChannel.Update.OnDownloaded)
      ipcRenderer.removeAllListeners(IpcChannel.Update.OnError)
    },
  },
}

contextBridge.exposeInMainWorld('electron', electronAPI)

// Type declaration
export type ElectronAPI = typeof electronAPI
