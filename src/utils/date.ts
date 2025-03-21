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
