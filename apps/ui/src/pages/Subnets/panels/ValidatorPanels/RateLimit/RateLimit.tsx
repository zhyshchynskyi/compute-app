import Table from 'components/Table'
import { StyledTableWrapper } from 'pages/Billing/panels/Transactions'
import CreateRateLimit from './CreateRateLimit/CreateRateLimit'
import UpdateRateLimit from './UpdateRateLimit/UpdateRateLimit'

import useRateLimit from './useRateLimit'

const RateLimit = () => {
  const { columnConfig, rate_limits, rate_limits_loading } = useRateLimit()

  return (
    <StyledTableWrapper>
      <Table columns={columnConfig} data={rate_limits} isLoading={rate_limits_loading} />
      <CreateRateLimit />
      <UpdateRateLimit />
    </StyledTableWrapper>
  )
}

export default RateLimit


