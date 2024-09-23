export const column = () => {
  return [
    {
      Header: 'Subnet',
      accessor: 'subnet_name',
      minWidth: 100,
      width: 150,
    },
    {
      Header: 'Monthly Usage',
      accessor: 'total_usage',
      minWidth: 60,
      width: 70,
    },
    {
      Header: 'Expense $',
      accessor: 'total_price',
      minWidth: 40,
      width: 70,
    },
  ]
}
