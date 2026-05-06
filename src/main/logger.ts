import log from 'electron-log'

// Configure electron-log
log.transports.file.level = 'info'
log.transports.console.level = 'debug'
log.transports.file.maxSize = 10 * 1024 * 1024 // 10MB

// Override console methods to capture logs
Object.assign(console, log.functions)

export default log
