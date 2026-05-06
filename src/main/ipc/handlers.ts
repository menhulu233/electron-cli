import { ipcMain, app, BrowserWindow } from 'electron'
import { IpcChannel } from './channels'
import { windowService } from '../services/window'
import { sqliteStore } from '../sqliteStore'
import log from '../logger'

export function registerIpcHandlers(): void {
  log.info('[IPC] Registering handlers')

  // App handlers
  ipcMain.handle(IpcChannel.App.GetVersion, () => {
    return app.getVersion()
  })

  ipcMain.handle(IpcChannel.App.GetPlatform, () => {
    return process.platform
  })

  // Window handlers
  ipcMain.handle(IpcChannel.Window.Minimize, () => {
    windowService.minimize()
  })

  ipcMain.handle(IpcChannel.Window.Maximize, () => {
    windowService.maximize()
  })

  ipcMain.handle(IpcChannel.Window.Close, () => {
    windowService.close()
  })

  ipcMain.handle(IpcChannel.Window.IsMaximized, () => {
    return windowService.isMaximized()
  })

  // Store handlers
  ipcMain.handle(IpcChannel.Store.Get, (_, key: string) => {
    return sqliteStore.get(key)
  })

  ipcMain.handle(IpcChannel.Store.Set, (_, key: string, value: string) => {
    sqliteStore.set(key, value)
  })

  ipcMain.handle(IpcChannel.Store.Delete, (_, key: string) => {
    sqliteStore.delete(key)
  })

  ipcMain.handle(IpcChannel.Store.GetAll, () => {
    return sqliteStore.getAll()
  })

  log.info('[IPC] Handlers registered')
}
