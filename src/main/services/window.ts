import { BrowserWindow, shell, app, Menu } from 'electron';
import path from 'path';
import { updaterService } from '../updater';

const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL;

export class WindowService {
  private mainWindow: BrowserWindow | null = null;

  createMainWindow(): BrowserWindow {
    // In development, use Vite dev server URL
    // In production, use the app path
    const isDev = !!VITE_DEV_SERVER_URL;

    this.mainWindow = new BrowserWindow({
      width: 1200,
      height: 800,
      minWidth: 800,
      minHeight: 600,
      title: 'Electron Vue3 App',
      autoHideMenuBar: true,
      webPreferences: {
        preload: path.join(app.getAppPath(), 'dist-electron/preload/index.js'),
        contextIsolation: true,
        nodeIntegration: false,
        sandbox: true,
      },
    });

    // Remove application menu completely
    Menu.setApplicationMenu(null);

    // Initialize updater service (only in production)
    if (!isDev) {
      updaterService.initialize(this.mainWindow);
    }

    // Open external links in browser
    this.mainWindow.webContents.setWindowOpenHandler(({ url }) => {
      if (url.startsWith('https:')) {
        shell.openExternal(url);
      }
      return { action: 'deny' };
    });

    // Load content
    if (isDev) {
      this.mainWindow.loadURL(VITE_DEV_SERVER_URL);
    } else {
      this.mainWindow.loadFile(path.join(app.getAppPath(), 'dist/index.html'));
    }

    this.mainWindow.on('closed', () => {
      this.mainWindow = null;
    });

    return this.mainWindow;
  }

  getMainWindow(): BrowserWindow | null {
    return this.mainWindow;
  }

  minimize(): void {
    this.mainWindow?.minimize();
  }

  maximize(): void {
    if (this.mainWindow?.isMaximized()) {
      this.mainWindow.unmaximize();
    } else {
      this.mainWindow?.maximize();
    }
  }

  close(): void {
    this.mainWindow?.close();
  }

  isMaximized(): boolean {
    return this.mainWindow?.isMaximized() ?? false;
  }
}

export const windowService = new WindowService();
