export const IpcChannel = {
  App: {
    GetVersion: 'app:getVersion',
    GetPlatform: 'app:getPlatform',
  },
  Window: {
    Minimize: 'window:minimize',
    Maximize: 'window:maximize',
    Close: 'window:close',
    IsMaximized: 'window:isMaximized',
    OnMaximized: 'window:onMaximized',
    OnUnmaximized: 'window:onUnmaximized',
  },
  Store: {
    Get: 'store:get',
    Set: 'store:set',
    Delete: 'store:delete',
    GetAll: 'store:getAll',
  },
  Update: {
    Check: 'update:check',
    Download: 'update:download',
    Install: 'update:install',
    Cancel: 'update:cancel',
    OnProgress: 'update:progress',
    OnAvailable: 'update:available',
    OnNotAvailable: 'update:not-available',
    OnDownloaded: 'update:downloaded',
    OnError: 'update:error',
  },
} as const;

export type IpcChannelType = typeof IpcChannel;
