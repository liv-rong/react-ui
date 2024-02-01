import type { Dayjs } from 'dayjs'

/**
 * 计算两个数字的和
 * @param {Dayjs} date - 一个dayjs的格式
 * @returns {number} - 两个数字的和
 */
export function getAllDays(date: Dayjs) {
  const daysInMonth = date.daysInMonth()
  const startDate = date.startOf('month')
  const day = startDate.day()

  const daysInfo = new Array(6 * 7)

  for (let i = 0; i < day; i++) {
    daysInfo[i] = {
      date: startDate.subtract(day - i, 'day').format('YYYY-MM-DD')
    }
  }

  debugger
}
