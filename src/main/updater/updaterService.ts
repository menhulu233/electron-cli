import { autoUpdater, UpdateInfo as ElectronUpdateInfo } from 'electron-updater';
import { BrowserWindow } from 'electron';
import log from '../logger';
import { IpcChannel } from '../ipc/channels';

export class UpdaterService {
  private mainWindow: BrowserWindow | null = null;

  initialize(mainWindow: BrowserWindow): void {
    this.mainWindow = mainWindow;

    // Configure auto-updater
    autoUpdater.autoDownload = false;
    autoUpdater.autoInstallOnAppQuit = true;

    // Set up event handlers
    autoUpdater.on('checking-for-update', () => {
      log.info('[Updater] Checking for update');
    });

    autoUpdater.on('update-available', (info: ElectronUpdateInfo) => {
      log.info('[Updater] Update available:', info.version);
      this.sendToRenderer(IpcChannel.Update.OnAvailable, {
        version: info.version,
        releaseDate: info.releaseDate,
        releaseNotes: info.releaseNotes,
      });
    });

    autoUpdater.on('update-not-available', () => {
      log.info('[Updater] Update not available');
      this.sendToRenderer(IpcChannel.Update.OnNotAvailable, null);
    });

    autoUpdater.on('download-progress', progress => {
      log.debug('[Updater] Download progress:', progress.percent);
      this.sendToRenderer(IpcChannel.Update.OnProgress, progress.percent / 100);
    });

    autoUpdater.on('update-downloaded', () => {
      log.info('[Updater] Update downloaded');
      this.sendToRenderer(IpcChannel.Update.OnDownloaded, null);
    });

    autoUpdater.on('error', (error: Error) => {
      log.error('[Updater] Error:', error.message);
      this.sendToRenderer(IpcChannel.Update.OnError, error.message);
    });

    log.info('[Updater] Updater service initialized');
  }

  private sendToRenderer(channel: string, data: unknown): void {
    if (this.mainWindow && !this.mainWindow.isDestroyed()) {
      this.mainWindow.webContents.send(channel, data);
    }
  }

  async checkForUpdate(): Promise<void> {
    try {
      await autoUpdater.checkForUpdates();
    } catch (error) {
      log.error('[Updater] Check failed:', error);
      throw error;
    }
  }

  async downloadUpdate(): Promise<void> {
    try {
      await autoUpdater.downloadUpdate();
    } catch (error) {
      log.error('[Updater] Download failed:', error);
      throw error;
    }
  }

  async installUpdate(): Promise<void> {
    log.info('[Updater] Installing update and restarting');
    autoUpdater.quitAndInstall();
  }
}

export const updaterService = new UpdaterService();
