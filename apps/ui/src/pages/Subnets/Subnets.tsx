import MiniToolCard from 'components/ChatCards/MiniToolCard'
import { StyledAppContainer } from 'components/Layout/LayoutStyle'
import {
    StyledChatWrapper,
    StyledContainer,
    StyledLeftColumn,
    StyledMainWrapper,
} from 'routes/ChatRouteLayout'
import ListHeader from 'routes/components/ListHeader'

import useSubnet from './useSubnet'
import { Subnet } from 'types/subnetApiService'
import { accountTypeEnum } from 'types/account'
import { useNavigate, useOutlet } from 'react-router-dom'
import { TEMP_CATEGORIES } from 'pages/ExploreApis/ExploreApis'
import { useApiServices } from 'services/subnetApiService/useSubnetApiService'
import ColumnListContentLoader from 'components/ContentLoaders/ColumnListContentLoader'

const Subnets = () => {
    const navigate = useNavigate()
    const outlet = useOutlet()
    const {
        subnets,
        handleNavigateSubnet,
        active_subnet_id,
        handleOpenCreateSubnetApi,
        account,
        fetch_subnets_loading,
    } = useSubnet()

    const { data: subnetApis } = useApiServices()

    const subnetIds = subnetApis?.map((api: { subnet_id: string }) => {
        return api.subnet_id
    })

    return (
        <StyledAppContainer>
            <StyledContainer>
                <StyledMainWrapper>
                    <StyledLeftColumn>
                        {fetch_subnets_loading ? (
                            <>
                                {Array.from({ length: 20 }).map((_, index) => (
                                    <ColumnListContentLoader key={index} />
                                ))}
                            </>
                        ) : (
                            <>
                                {account?.account_type === accountTypeEnum.Validation ? (
                                    <ListHeader
                                        title={'Subnet APIs'}
                                        onAddClick={handleOpenCreateSubnetApi}
                                    />
                                ) : (
                                    <>
                                        <ListHeader title={'Explore APIs'} />
                                        {TEMP_CATEGORIES.map(
                                            (item: { value: string }, index: number) => {
                                                return (
                                                    <MiniToolCard
                                                        key={index}
                                                        onClick={() => navigate('/subnets/explore')}
                                                        name={item.value}
                                                        picked={
                                                            window.location.pathname ===
                                                            '/subnets/explore'
                                                        }
                                                    />
                                                )
                                            },
                                        )}

                                        <ListHeader title={'Subnet APIs'} />
                                    </>
                                )}

                                {subnets.map((subnet: Subnet) => {
                                    if (
                                        !subnetIds?.includes(subnet.id) &&
                                        account?.account_type === accountTypeEnum.Subnet_api
                                    ) {
                                        return null
                                    } else {
                                        return (
                                            <MiniToolCard
                                                key={subnet.id}
                                                onClick={() => handleNavigateSubnet(subnet.id)}
                                                name={`${subnet.name}`}
                                                logo={subnet.logo}
                                                picked={active_subnet_id === subnet.id}
                                            />
                                        )
                                    }
                                })}
                            </>
                        )}
                    </StyledLeftColumn>
                    <StyledChatWrapper>{outlet}</StyledChatWrapper>
                </StyledMainWrapper>
            </StyledContainer>
        </StyledAppContainer>
    )
}

export default Subnets
