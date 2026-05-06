import Database from 'better-sqlite3'
import { app } from 'electron'
import path from 'path'
import log from './logger'

export class SqliteStore {
  private db: Database.Database | null = null

  private getDbPath(): string {
    const userDataPath = app.getPath('userData')
    return path.join(userDataPath, 'app.db')
  }

  initialize(): void {
    try {
      const dbPath = this.getDbPath()
      log.info(`[Store] Initializing database at ${dbPath}`)
      this.db = new Database(dbPath)
      this.db.pragma('journal_mode = WAL')
      this.createTables()
      log.info('[Store] Database initialized successfully')
    } catch (error) {
      log.error('[Store] Failed to initialize database:', error)
      throw error
    }
  }

  private createTables(): void {
    if (!this.db) return

    // Key-Value store
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS kv (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL,
        updated_at INTEGER DEFAULT (strftime('%s', 'now'))
      )
    `)

    // App settings
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS settings (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL,
        updated_at INTEGER DEFAULT (strftime('%s', 'now'))
      )
    `)
  }

  get(key: string): string | null {
    if (!this.db) throw new Error('Database not initialized')
    const row = this.db.prepare('SELECT value FROM kv WHERE key = ?').get(key) as { value: string } | undefined
    return row?.value ?? null
  }

  set(key: string, value: string): void {
    if (!this.db) throw new Error('Database not initialized')
    this.db.prepare('INSERT OR REPLACE INTO kv (key, value, updated_at) VALUES (?, ?, strftime(\'%s\', \'now\'))').run(key, value)
  }

  delete(key: string): void {
    if (!this.db) throw new Error('Database not initialized')
    this.db.prepare('DELETE FROM kv WHERE key = ?').run(key)
  }

  getAll(): Record<string, string> {
    if (!this.db) throw new Error('Database not initialized')
    const rows = this.db.prepare('SELECT key, value FROM kv').all() as Array<{ key: string; value: string }>
    return rows.reduce((acc, row) => {
      acc[row.key] = row.value
      return acc
    }, {} as Record<string, string>)
  }

  close(): void {
    if (this.db) {
      this.db.close()
      this.db = null
      log.info('[Store] Database closed')
    }
  }
}

export const sqliteStore = new SqliteStore()
