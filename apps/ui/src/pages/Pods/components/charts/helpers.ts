export const getLastNDays = (n: number) => {
  const dates = []
  const today = new Date()
  for (let i = 0; i < n; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() - i)
    dates.push(date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }))
  }
  return dates
}
