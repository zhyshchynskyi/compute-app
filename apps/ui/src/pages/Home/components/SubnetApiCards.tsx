import HeadingPrimary from 'components/Heading/Primary'
import Heading from 'share-ui/components/Heading/Heading'
import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'
import { StyledCardsWrapper } from 'pages/Agents/Agents'

import { SubnetApiService } from 'types/subnetApiService'
import { useModal } from 'hooks'
import { ButtonTertiary } from 'components/Button/Button'

import ApiCard from 'pages/Subnets/ApiCard'

import { useNavigate } from 'react-router-dom'
import { useAppModeContext } from 'context/AppModeContext'

import ApiButtonCard from 'components/ButtonCards/ApiButtonCard'

import ApiCardLoader from 'components/ContentLoaders/ApiCardLoader'
import { StyledHeaderGroup, StyledSectionWrapper } from '../homeStyle.css'
import { StyledMainHeaderWrapper } from '../Home'
import styled from 'styled-components'

const SubnetApiCards = () => {
  const navigate = useNavigate()

  const { selected_account } = useAppModeContext()

  // const { data: subnets } = useGetSubnets()
  // const { data: subnetApis, loading: api_services_loading } = useApiServices()
  const subnets: any[] = []
  const subnetApis: any[] = []
  const api_services_loading = false

  const displayedApis = subnetApis?.filter((api: SubnetApiService) => api.subnet_id === subnets?.[14]?.id).slice(0, 5)

  const { openModal } = useModal()

  return (
    <StyledSectionWrapper>
      <StyledHeaderGroup className='header_group'>
        <StyledMainHeaderWrapper>
          <HeadingPrimary type={Heading.types?.h1} size='xss' value={`Subnet APIs`} />
        </StyledMainHeaderWrapper>
      </StyledHeaderGroup>

      <ComponentsWrapper noPadding>
        <StyledInnerWrapper>
          {api_services_loading && subnetApis?.length === 0 ? (
            <StyledCardsWrapper>
              <ApiCardLoader />
              <ApiCardLoader />
              <ApiCardLoader />
            </StyledCardsWrapper>
          ) : (
            <StyledCardsWrapper>
              {displayedApis?.map((api: SubnetApiService) => {
                const handleViewClick = () => {
                  openModal({
                    name: 'subnet-api-details-modal',
                    data: { apiData: api },
                  })
                }

                const handleViewOnSubnet = () => {
                  navigate(`/subnets/${api.subnet_id}`)
                }

                return (
                  <ApiCard
                    key={api.name}
                    avatar={api.icon}
                    onViewClick={handleViewClick}
                    item={api}
                    account={selected_account}
                    customButtons={
                      <ButtonTertiary onClick={handleViewOnSubnet} size='small'>
                        View on subnet
                      </ButtonTertiary>
                    }
                  />
                )
              })}

              <ApiButtonCard label={'See more'} onClick={() => navigate('/subnets')} />
            </StyledCardsWrapper>
          )}
        </StyledInnerWrapper>
      </ComponentsWrapper>
    </StyledSectionWrapper>
  )
}

export default SubnetApiCards

const StyledInnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
