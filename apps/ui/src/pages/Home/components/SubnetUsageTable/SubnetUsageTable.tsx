import Table from 'components/Table'
import { column } from './columnConfig'

export interface SubnetUsageTableProps {
  data: {
    subnet_name: string
    subnet_id: string
    total_usage: number
    total_price: number
  }[]
}

const SubnetUsageTable = ({ data }: SubnetUsageTableProps) => {
  // const { data: allSubnets } = useGetSubnets()
  const allSubnets: any[] = []

  const formattedSubnets = allSubnets
    ?.map(subnet => {
      return {
        subnet_name: subnet.name,
        total_usage: 0,
        total_price: 0,
      }
    })
    ?.slice(0, 4)

  const displayedData = data?.length === 0 ? formattedSubnets : data

  return <Table columns={column()} data={displayedData} />
}

export default SubnetUsageTable
