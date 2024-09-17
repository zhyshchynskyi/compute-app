import { useGetSubnets } from 'services/subnetApiService/useSubnetApiService'
import { useNavigate, useParams } from 'react-router-dom'
import React from 'react'
import { useAppModeContext } from 'context/AppModeContext'
import { accountTypeEnum } from 'types/account'

const useSubnet = () => {
    const { selected_account } = useAppModeContext()
    const navigate = useNavigate()

    const { id } = useParams()
    const { data: subnets, loading: fetch_subnets_loading } = useGetSubnets()

    React.useEffect(() => {
        if (selected_account?.account_type === accountTypeEnum.Subnet_api && !id) {
            navigate(`/subnets/explore`)
        } else if (subnets.length > 0 && !id) {
            navigate(`/subnets/${subnets[14].id}`)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [subnets])

    const handleNavigateSubnet = (subnet_id: string) => {
        navigate(`/subnets/${subnet_id}`)
    }

    const handleOpenCreateSubnetApi = () => {
        navigate(`/subnets/${id}/create`)
    }

    return {
        subnets,
        fetch_subnets_loading: fetch_subnets_loading && subnets?.length === 0,
        handleNavigateSubnet,
        active_subnet_id: id,
        handleOpenCreateSubnetApi,
        account: selected_account,
    }
}

export default useSubnet
