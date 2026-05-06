import { app, BrowserWindow } from 'electron'
import log from './logger'
import { windowService } from './window'

export class AppService {
  private initWindow(): void {
    log.info('[App] Creating main window')
    windowService.createMainWindow()
  }

  bootstrap(): void {
    log.info('[App] Bootstrap started')

    // Single instance lock
    if (!app.requestSingleInstanceLock()) {
      log.warn('[App] Another instance is running, quitting')
      app.quit()
      return
    }

    app.on('second-instance', () => {
      const mainWindow = windowService.getMainWindow()
      if (mainWindow) {
        if (mainWindow.isMinimized()) mainWindow.restore()
        mainWindow.focus()
      }
    })

    app.whenReady().then(() => {
      log.info('[App] App ready')
      this.initWindow()
    })

    app.on('window-all-closed', () => {
      log.info('[App] All windows closed')
      if (process.platform !== 'darwin') {
        app.quit()
      }
    })

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        this.initWindow()
      }
    })
  }
}

export const appService = new AppService()
