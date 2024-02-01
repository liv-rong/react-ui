import type { Dayjs } from 'dayjs'

/**
 * 计算两个数字的和
 * @param {Dayjs} date - 一个dayjs的格式
 * @returns {Array<{ date: Dayjs; currentMonth: boolean }>} - 一个月的日期函数
 */
export function getAllDays(date: Dayjs) {
  // 获取月份中的天数
  //const daysInMonth = date.daysInMonth()
  // 获取月份的第一天
  const startDate = date.startOf('month')
  // 获取第一天是星期几
  const day = startDate.day()

  const daysInfo = new Array<{ date: Dayjs; currentMonth: boolean }>(6 * 7)

  for (let i = 0; i < day; i++) {
    daysInfo[i] = {
      date: startDate.subtract(day - i, 'day'),
      currentMonth: false
    }
  }

  for (let i = day; i < daysInfo.length; i++) {
    const calcDate = startDate.add(i - day, 'day')

    daysInfo[i] = {
      date: calcDate,
      currentMonth: calcDate.month() === date.month()
    }
  }

  return daysInfo
}
