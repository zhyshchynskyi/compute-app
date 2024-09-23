import { StyledAppContainer } from 'components/Layout/LayoutStyle'
import ListHeader from 'routes/components/ListHeader'

import { StyledChatWrapper, StyledContainer, StyledLeftColumn, StyledMainWrapper } from 'routes/ChatRouteLayout'
import { useNavigate, useOutlet, useParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import { usePod } from './usePods'

import PodListCard from './cards/PodListCard'
import PodCardLoader from 'components/ContentLoaders/PodCardLoader'

const Pods = () => {
  const { pods, pods_loading } = usePod()
  const navigate = useNavigate()
  const outlet = useOutlet()

  const params = useParams()

  console.log('Pods', pods, pods_loading)

  return (
    <StyledAppContainer>
      <StyledContainer>
        <StyledMainWrapper>
          <>
            {pods?.length === 0 && pods_loading ? (
              <StyledLeftColumn customWidth={400}>
                <Box display={'flex'} flexDirection={'column'} sx={{ paddingRight: 1.5 }}>
                  <ListHeader title={'Pods'} onAddClick={() => navigate('/pods/create-pod')} />
                  <PodCardLoader />
                  <PodCardLoader />
                  <PodCardLoader />
                </Box>
              </StyledLeftColumn>
            ) : (
              <>
                {pods?.length > 0 && (
                  <StyledLeftColumn customWidth={400}>
                    <Box display={'flex'} flexDirection={'column'} sx={{ paddingRight: 1.5 }}>
                      <ListHeader title={'Pods'} onAddClick={() => navigate('/pods/create-pod')} />

                      {pods.map((item: any, index: number) => (
                        <PodListCard
                          key={index}
                          onClick={() => navigate(`/pods/details/${item.id}`)}
                          isSelected={params?.id === item.id}
                          name={item.pod_name}
                          templateImage={item.template_container_image}
                          resource={{
                            name: item.resource_display_name,
                            ram: item.resource_ram,
                          }}
                          status={item.status}
                        />
                      ))}
                    </Box>
                  </StyledLeftColumn>
                )}
              </>
            )}

            <StyledChatWrapper>{outlet}</StyledChatWrapper>
          </>
        </StyledMainWrapper>
      </StyledContainer>
    </StyledAppContainer>
  )
}

export default Pods
