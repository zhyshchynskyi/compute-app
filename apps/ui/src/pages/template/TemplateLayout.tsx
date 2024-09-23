import { StyledAppContainer } from 'components/Layout/LayoutStyle'
import ListHeader from 'routes/components/ListHeader'

import { StyledChatWrapper, StyledContainer, StyledLeftColumn, StyledMainWrapper } from 'routes/ChatRouteLayout'
import { useNavigate, useOutlet } from 'react-router-dom'
import Box from '@mui/material/Box'

import TemplateList from './TemplateList'
import useTemplate from './useTemplate'

import CardContentLoader from 'components/ContentLoaders/CardContentLoader'
import TemplateCardLoader from 'components/ContentLoaders/TemplateCardLoader'

const TemplateLayout = () => {
  const navigate = useNavigate()
  const outlet = useOutlet()

  const { templates, template_loading } = useTemplate()

  return (
    <StyledAppContainer>
      <StyledContainer>
        <StyledMainWrapper>
          {templates?.length === 0 && template_loading ? (
            <StyledLeftColumn customWidth={400}>
              <ListHeader title={'Templates'} onAddClick={() => navigate('/templates/create-template')} />

              <Box display={'flex'} flexDirection={'column'} sx={{ paddingRight: 1.5 }}>
                <TemplateCardLoader />
                <TemplateCardLoader />
                <TemplateCardLoader />
              </Box>
            </StyledLeftColumn>
          ) : (
            <>
              {templates.length > 0 && (
                <StyledLeftColumn customWidth={400}>
                  <Box display={'flex'} flexDirection={'column'} sx={{ paddingRight: 1.5 }}>
                    <ListHeader title={'Templates'} onAddClick={() => navigate('/templates/create-template')} />

                    <TemplateList />
                  </Box>
                </StyledLeftColumn>
              )}
            </>
          )}

          <StyledChatWrapper>{outlet}</StyledChatWrapper>
        </StyledMainWrapper>
      </StyledContainer>
    </StyledAppContainer>
  )
}

export default TemplateLayout
