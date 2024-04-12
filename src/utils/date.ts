export const getStartAndEndDateByMonth = (month: number) => {
  const startDate = new Date()
  startDate.setMonth(month - 1)
  startDate.setDate(1)
  startDate.setHours(0, 0, 0, 0)

  const endDate = new Date(startDate)
  endDate.setMonth(startDate.getMonth() + 1)
  endDate.setDate(0)
  endDate.setHours(0, 0, 0, 0)

  return { startDate, endDate }
}
