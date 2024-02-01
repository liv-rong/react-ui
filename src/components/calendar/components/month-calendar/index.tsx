import { weekList } from '../../constants'
import '@/components/calendar/index.scss'
import type { CalenderProps } from '../../types'
import { getAllDays } from '../../utils'
import { Dayjs } from 'dayjs'
import { useContext } from 'react'
import allLocales from '../../locale'
import LocaleContext from '../../LocaleContext'
import cs from 'classnames'

interface renderProps {
  allDays: {
    date: Dayjs
    currentMonth: boolean
  }[]
  dateRender: MonthCalendarProps['dateRender']
  dateInnerContent: MonthCalendarProps['dateInnerContent']
  value: Dayjs
  selectHandler: MonthCalendarProps['selectHandler']
}

function renderDays({
  allDays,
  dateRender,
  dateInnerContent,
  value,
  selectHandler
}: renderProps) {
  const rows = []
  for (let i = 0; i < 6; i++) {
    const row = []
    for (let j = 0; j < 7; j++) {
      const item = allDays[i * 7 + j]
      row[j] = (
        <div
          className={
            'calendar-month-body-cell ' +
            (item.currentMonth ? 'calendar-month-body-cell-current' : '')
          }
          onClick={() => selectHandler?.(item.date)}
        >
          {dateRender ? (
            dateRender(item.date)
          ) : (
            <div className="calendar-month-body-cell-date">
              <div
                className={cs(
                  'calendar-month-body-cell-date-value',
                  value.format('YYYY-MM-DD') === item.date.format('YYYY-MM-DD')
                    ? 'calendar-month-body-cell-date-selected'
                    : ''
                )}
              >
                {item.date.date()}
              </div>
              <div className="calendar-month-body-cell-date-content">
                {dateInnerContent?.(item.date)}
              </div>
            </div>
          )}
        </div>
      )
    }
    rows.push(row)
  }
  return rows.map((row, index) => (
    <div
      className="calendar-month-body-row"
      key={index}
    >
      {row}
    </div>
  ))
}

interface MonthCalendarProps extends CalenderProps {
  selectHandler?: (date: Dayjs) => void
  curMonth: Dayjs
}

function MonthCalendar(props: MonthCalendarProps) {
  const localeContext = useContext(LocaleContext)

  const CalendarLocale = allLocales[localeContext.locale]

  const { dateRender, dateInnerContent, value, selectHandler } = props ?? {}
  const allDays = getAllDays(props.curMonth)
  return (
    <div className="calendar-month ">
      <div className="calendar-month-week-list">
        {weekList.map((week) => (
          <div
            className="calendar-month-week-list-item"
            key={week}
          >
            {CalendarLocale.week[week]}
          </div>
        ))}
      </div>
      <div>
        {renderDays({
          allDays,
          dateRender,
          dateInnerContent,
          value,
          selectHandler
        })}
      </div>
    </div>
  )
}

export default MonthCalendar
