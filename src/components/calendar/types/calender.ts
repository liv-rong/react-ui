import { Dayjs } from 'dayjs'
import { CSSProperties, ReactNode } from 'react'

export interface CalenderProps {
  value: Dayjs
  style?: CSSProperties
  className?: string | string[]
  // 定制日期显示，会完全覆盖日期单元格
  dateRender?: (currentDate: Dayjs) => ReactNode
  // 定制日期单元格，内容会被添加到单元格内，只在全屏日历模式下生效。
  dateInnerContent?: (currentDate: Dayjs) => ReactNode
  // 国际化相关
  locale?: string
  onChange?: (date: Dayjs) => void
}

export interface CalendarType {
  formatYear: string
  formatMonth: string
  today: string
  month: {
    January: string
    February: string
    March: string
    April: string
    May: string
    June: string
    July: string
    August: string
    September: string
    October: string
    November: string
    December: string
  } & Record<string, any>
  week: {
    monday: string
    tuesday: string
    wednesday: string
    thursday: string
    friday: string
    saturday: string
    sunday: string
  } & Record<string, any>
}

export interface HeaderProps {
  curMonth: Dayjs
  prevMonthHandler: () => void
  nextMonthHandler: () => void
  todayHandler: () => void
}
