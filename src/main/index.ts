import log from './logger'
import { appService } from './services/app'
import { registerIpcHandlers } from './ipc/handlers'

log.info('[Main] Application starting')

// Register IPC handlers
registerIpcHandlers()

// Bootstrap application
appService.bootstrap()
