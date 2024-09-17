import { StyledTableWrapper } from 'pages/Billing/panels/Transactions'
import useSubnetApiService from '../../useSubnetApiService'
import Table from 'components/Table'

const ApisPanel = () => {
  const { fetch_subnet_api_services_loading, columns, subnet_api_services } = useSubnetApiService()

  return (
    <StyledTableWrapper>
      <Table
        columns={columns}
        data={subnet_api_services}
        isLoading={fetch_subnet_api_services_loading}
      />
    </StyledTableWrapper>
  )
}

export default ApisPanel
