import {
  ForwardRefRenderFunction,
  forwardRef,
  useImperativeHandle,
  useState
} from 'react'
import { monthNames } from './constants'
import './index.css'

interface CalenderProps {
  value?: Date
  onChange?: (date: Date) => void
}

interface CalenderRef {
  getDate: () => Date
  setDate: (date: Date) => void
}

const Calendar: ForwardRefRenderFunction<CalenderRef, CalenderProps> = (
  props,
  ref
) => {
  const { value = new Date(), onChange } = props
  const [date, setDate] = useState(value)

  useImperativeHandle(ref, () => {
    return {
      getDate() {
        return date
      },
      setDate(date: Date) {
        setDate(date)
      }
    }
  })

  const handlePrevMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1))
  }

  const daysOfMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const firstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  const renderDays = () => {
    const days = []

    const daysCount = daysOfMonth(date.getFullYear(), date.getMonth())
    const firstDay = firstDayOfMonth(date.getFullYear(), date.getMonth())

    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div
          key={`empty-${i}`}
          className="empty"
        ></div>
      )
    }

    for (let i = 1; i <= daysCount; i++) {
      const clickHandler = onChange?.bind(
        null,
        new Date(date.getFullYear(), date.getMonth(), i)
      )

      days.push(
        <div
          key={i}
          className={`day ${i === date.getDate() ? 'selected' : ''}`}
          onClick={clickHandler}
        >
          {i}
        </div>
      )
    }

    return days
  }

  return (
    <div className="calendar">
      <div className="header">
        <button onClick={handlePrevMonth}>&lt;</button>
        <div>
          {date.getFullYear()} 年 {monthNames[date.getMonth()]}
        </div>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className="days">
        <div className="day">日</div>
        <div className="day">一</div>
        <div className="day">二</div>
        <div className="day">三</div>
        <div className="day">四</div>
        <div className="day">五</div>
        <div className="day">六</div>
        {renderDays()}
      </div>
    </div>
  )
}

export default forwardRef(Calendar)
