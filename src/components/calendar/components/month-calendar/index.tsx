import { weekList } from '../../constants'
import '@/components/calendar/index.scss'
import type { CalenderProps } from '../../types'

interface MonthCalendarProps extends CalenderProps {}
function MonthCalendar(props: MonthCalendarProps) {
  return (
    <div className="calendar-month ">
      <div className="calendar-month-week-list">
        {weekList.map((week) => (
          <div
            className="calendar-month-week-list-item"
            key={week}
          >
            {week}
          </div>
        ))}
      </div>
    </div>
  )
}

export default MonthCalendar
