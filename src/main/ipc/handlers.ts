import { ipcMain, app } from 'electron';
import { IpcChannel } from './channels';
import { windowService } from '../services/window';
import { sqliteStore } from '../sqliteStore';
import { updaterService } from '../updater';
import log from '../logger';

export function registerIpcHandlers(): void {
  log.info('[IPC] Registering handlers');

  // App handlers
  ipcMain.handle(IpcChannel.App.GetVersion, () => {
    return app.getVersion();
  });

  ipcMain.handle(IpcChannel.App.GetPlatform, () => {
    return process.platform;
  });

  // Window handlers
  ipcMain.handle(IpcChannel.Window.Minimize, () => {
    windowService.minimize();
  });

  ipcMain.handle(IpcChannel.Window.Maximize, () => {
    windowService.maximize();
  });

  ipcMain.handle(IpcChannel.Window.Close, () => {
    windowService.close();
  });

  ipcMain.handle(IpcChannel.Window.IsMaximized, () => {
    return windowService.isMaximized();
  });

  // Store handlers
  ipcMain.handle(IpcChannel.Store.Get, (_, key: string) => {
    return sqliteStore.get(key);
  });

  ipcMain.handle(IpcChannel.Store.Set, (_, key: string, value: string) => {
    sqliteStore.set(key, value);
  });

  ipcMain.handle(IpcChannel.Store.Delete, (_, key: string) => {
    sqliteStore.delete(key);
  });

  ipcMain.handle(IpcChannel.Store.GetAll, () => {
    return sqliteStore.getAll();
  });

  // Update handlers
  ipcMain.handle(IpcChannel.Update.Check, async () => {
    await updaterService.checkForUpdate();
  });

  ipcMain.handle(IpcChannel.Update.Download, async () => {
    await updaterService.downloadUpdate();
  });

  ipcMain.handle(IpcChannel.Update.Install, async () => {
    await updaterService.installUpdate();
  });

  ipcMain.handle(IpcChannel.Update.Cancel, async () => {
    // electron-updater doesn't support cancellation directly
    // but we can handle it by ignoring the next events
    log.info('[Updater] Update cancelled by user');
  });

  log.info('[IPC] Handlers registered');
}
