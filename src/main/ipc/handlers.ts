import { ipcMain, app, BrowserWindow } from 'electron'
import { IpcChannel } from './channels'
import { windowService } from '../services/window'
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

  log.info('[IPC] Handlers registered')
}
