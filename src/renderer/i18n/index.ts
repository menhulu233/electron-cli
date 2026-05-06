import { createI18n } from 'vue-i18n'
import zhCN from './zh-CN'
import enUS from './en-US'

// Detect system locale
const systemLocale = navigator.language.toLowerCase()
const defaultLocale = systemLocale.startsWith('zh') ? 'zh-CN' : 'en-US'

export const i18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale: 'en-US',
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS,
  },
})
