import { CalendarLocaleZh, CalendarLocaleEn } from '../constants'
import { CalendarType } from '../types'

const allLocales: Record<string, CalendarType> = {
  'zh-CN': CalendarLocaleZh,
  'en-US': CalendarLocaleEn
}

export default allLocales
