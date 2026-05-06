export {};

declare global {
  interface Window {
    electron: {
      getVersion: () => Promise<string>;
      getPlatform: () => Promise<string>;
      window: {
        minimize: () => Promise<void>;
        maximize: () => Promise<void>;
        close: () => Promise<void>;
        isMaximized: () => Promise<boolean>;
        onMaximized: (callback: () => void) => void;
        onUnmaximized: (callback: () => void) => void;
        removeAllWindowListeners: () => void;
      };
      update: {
        check: () => Promise<void>;
        download: () => Promise<void>;
        install: () => Promise<void>;
        cancel: () => Promise<void>;
        onProgress: (callback: (progress: number) => void) => void;
        onAvailable: (callback: (info: unknown) => void) => void;
        onNotAvailable: (callback: () => void) => void;
        onDownloaded: (callback: () => void) => void;
        onError: (callback: (error: string) => void) => void;
        removeAllListeners: () => void;
      };
    };
  }
}
