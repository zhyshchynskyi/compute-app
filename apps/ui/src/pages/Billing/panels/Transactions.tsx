import { useMemo } from 'react'
import styled from 'styled-components'
import Table from 'components/Table'

import { extractDomain, StyledLink } from 'pages/Subnets/panels/columnConfig'

interface Transaction {
  created: number
  object: string
  status: string
  amount: number
  receipt_url: string
}

const Transactions = () => {
  // const { data: latestTransactions } = useGetLatestTransactionsService()
  const latestTransactions: any[] = []

  const data = useMemo(() => {
    if (!latestTransactions) return []

    return latestTransactions.map((t: Transaction) => ({
      date: new Date(t.created * 1000).toLocaleTimeString('en-US', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit' }),
      type: t.object,
      status: t.status,
      amount: t.amount / 100,
      receiptUrl: t.receipt_url
    }))
  }, [latestTransactions])

  return (
    <StyledTableWrapper>
      <Table columns={base} data={data} />
    </StyledTableWrapper>
  )
}
export default Transactions

export const StyledTableWrapper = styled.div`
  padding-top: 20px;

  padding-right: 16px;

  display: flex;
  flex-direction: column;

  gap: 16px;

  overflow: auto;

  height: 100%;
  width: 100%;
`

const base = [
  {
    Header: 'Date',
    accessor: 'date',
    minWidth: 50,
    width: 100,
  },
  {
    Header: 'Status',
    accessor: 'status',
    minWidth: 50,
    width: 100,

    Cell: ({ value }: { value: string }) => (
      <StatusParagraph value={value}>
        {value}
      </StatusParagraph>
    )
  },
  {
    Header: 'Amount',
    accessor: 'amount',
    minWidth: 50,
    width: 100,
  },
  {
    Header: 'Type',
    accessor: 'type',
    minWidth: 50,
    width: 100,
  },
  {
    Header: 'Receipt Url',
    accessor: 'receiptUrl',
    minWidth: 50,
    width: 100,

    Cell: ({ value }: { value: string }) => {
      return (
        <StyledLink href={value} target='_blank' rel='noreferrer'>
          {extractDomain(value)}
        </StyledLink>
      )
    },
  },
]

const StatusParagraph = styled.p<{ value: string}>`
  color: ${({ value, theme }) => (value === 'succeeded' ? theme.foundation.positive : 'inherit')};
`
