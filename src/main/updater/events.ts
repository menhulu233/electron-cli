export interface UpdateInfo {
  version: string
  releaseDate: string
  releaseNotes?: string
}

export interface UpdateProgress {
  percent: number
  transferred: number
  total: number
}

export type UpdateStatus = 'idle' | 'checking' | 'available' | 'downloading' | 'downloaded' | 'error'

export interface UpdateEvents {
  'update:available': UpdateInfo
  'update:not-available': void
  'update:progress': UpdateProgress
  'update:downloaded': void
  'update:error': string
}
