import { useContext } from 'react'
import LocaleContext from '../../LocaleContext'
import { HeaderProps } from '../../types'
import allLocales from '../../locale'

function HeaderCalendar({
  prevMonthHandler,
  curMonth,
  nextMonthHandler,
  todayHandler
}: HeaderProps) {
  const localeContext = useContext(LocaleContext)
  const CalendarContext = allLocales[localeContext.locale]
  return (
    <div className="calendar-header">
      <div className="calendar-header-left">
        <div
          className="calendar-header-icon"
          onClick={prevMonthHandler}
        >
          &lt;
        </div>
        <div className="calendar-header-value">
          {curMonth.format(CalendarContext.formatMonth)}
        </div>
        <div
          className="calendar-header-icon"
          onClick={nextMonthHandler}
        >
          &gt;
        </div>
        <button
          className="calendar-header-btn"
          onClick={todayHandler}
        >
          {CalendarContext.today}
        </button>
      </div>
    </div>
  )
}

export default HeaderCalendar
