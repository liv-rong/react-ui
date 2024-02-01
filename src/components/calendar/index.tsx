import classNames from 'classnames'

import { MonthCalendar, HeaderCalendar } from './components'
import type { CalenderProps } from './types'
import LocaleContext from './LocaleContext'
import dayjs, { Dayjs } from 'dayjs'
import { useState } from 'react'

const Calendar = (props: CalenderProps) => {
  const { value, style, className, locale, onChange } = props

  const myClassNames = classNames(className)
  const [curValue, setCurValue] = useState<Dayjs>(value)
  const [curMonth, setCurMonth] = useState<Dayjs>(value)

  function changeDate(date: Dayjs) {
    setCurValue(date)
    setCurMonth(date)
    onChange?.(date)
  }

  function selectHandler(date: Dayjs) {
    changeDate(date)
  }

  function prevMonthHandler() {
    setCurMonth(curMonth.subtract(1, 'month'))
  }

  function nextMonthHandler() {
    setCurMonth(curMonth.add(1, 'month'))
  }

  function todayHandler() {
    const date = dayjs(Date.now())
    changeDate(date)
  }

  return (
    <LocaleContext.Provider
      value={{
        locale: locale!
      }}
    >
      <div
        className={myClassNames}
        style={style}
      >
        <HeaderCalendar
          prevMonthHandler={prevMonthHandler}
          nextMonthHandler={nextMonthHandler}
          curMonth={curMonth}
          todayHandler={todayHandler}
        ></HeaderCalendar>
        <MonthCalendar
          {...props}
          value={curValue}
          selectHandler={selectHandler}
          curMonth={curMonth}
        />
      </div>
    </LocaleContext.Provider>
  )
}

export default Calendar
