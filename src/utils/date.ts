import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

export const isLeapYear = (year: number) => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0

export const getDaysInMonth = (month: number, year: number) => {
  const daysPerMonth = [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  return daysPerMonth[month - 1]
}

export const handleYearChange = (
  year: number,
  selectedDay: number,
  selectedMonth: number,
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>,
  setSelectedDay: React.Dispatch<React.SetStateAction<number>>
) => {
  setSelectedYear(year)
  if (selectedMonth === 2 && selectedDay > getDaysInMonth(selectedMonth, year)) {
    setSelectedDay(28)
  }
}

dayjs.extend(utc)
dayjs.extend(timezone)

export const formatDate = (date: string) => {
  const convertDate = dayjs.utc(date).tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY HH:mm:ss')
  return convertDate
}
