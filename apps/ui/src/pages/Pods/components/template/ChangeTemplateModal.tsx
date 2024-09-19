import styled from 'styled-components'
import withRenderModal from 'hocs/withRenderModal'

import { useModal } from 'hooks'

import Box from '@mui/material/Box'
import useChangeTemplate from './useChangeTemplate'

import CardContent from '@mui/material/CardContent'
import { CardActionArea } from '@mui/material'
import { ChangeTemplateModalProps, Template, TemplateCardProps } from 'types/template'
import Loader from 'share-ui/components/Loader/Loader'
import TextField from 'share-ui/components/TextField/TextField'
import MainModal from 'modals/MainModal'
import { StyledCard } from 'pages/Pods/cards/PodResourcesCard'
import TypographyPrimary from 'components/Typography/Primary'
import TypographySecondary from 'components/Typography/Secondary'

const TemplateCard = ({ template, handleSelectTemplate }: TemplateCardProps) => {
  return (
    <StyledCard isSelected={false}>
      <CardActionArea
        sx={{
          boxShadow: 'none',
          borderRadius: '10px',
        }}
      >
        <CardContent
          sx={{
            border: 'none',
          }}
        >
          <Box display={'flex'} onClick={() => handleSelectTemplate(template)} gap={1}>
            <StyledImg src='https://www.svgrepo.com/show/333528/docker.svg' alt='' />
            <Box display={'flex'} flexDirection={'column'} justifyContent={'center'}>
              <TypographyPrimary value={template.name} size='medium' semiBold />
              <TypographySecondary value={template.container_image} size='small' />
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </StyledCard>
  )
}

const ChangeTemplateModal = ({ data: { handleSelectTemplate } }: ChangeTemplateModalProps) => {
  const { closeModal } = useModal()
  const { templates, searchText, setSearchText, templates_loading } = useChangeTemplate()

  return (
    <MainModal
      onClose={() => closeModal('change-pod-template-modal')}
      customButtons={<></>}
      title='Templates'
    >
      <StyledModalBody>
        <Box display={'flex'} flexDirection={'column'} position={'relative'}>
          <TextField
            onChange={(value: string) => setSearchText(value)}
            value={searchText}
            placeholder='Search'
          />

          {templates.length === 0 && templates_loading && (
            <Box position={'absolute'} sx={{ marginTop: '15%', marginLeft: '47%' }}>
              <Loader size={40} />
            </Box>
          )}

          {templates && templates.length > 0 ? (
            <Box mt={5} display={'flex'} flexDirection={'column'}>
              <Box display={'flex'} flexDirection={'column'}>
                <Box display={'grid'} gridTemplateColumns={'1fr 1fr'} gap={2} mt={2}>
                  {templates.map((template: Template, index: number) => (
                    <TemplateCard
                      key={index}
                      template={template}
                      handleSelectTemplate={handleSelectTemplate}
                    />
                  ))}
                </Box>
              </Box>
            </Box>
          ) : (
            <Box
              display={'flex'}
              justifyContent={'center'}
              flexDirection={'column'}
              alignItems={'center'}
              mt={6}
              gap={1}
            >
              <TypographyPrimary value='No results found' size='x-large' bold />
              <TypographySecondary
                value='Try searching for something else, or create your own template.'
                size='xs-small'
              />
            </Box>
          )}
        </Box>
      </StyledModalBody>
    </MainModal>
  )
}

export default withRenderModal('change-pod-template-modal')(ChangeTemplateModal)

const StyledModalBody = styled.div`
  width: 100vw;
  max-width: 800px;
  height: fit-content;
  min-height: 200px;

  padding: 20px;
`

export const StyledImg = styled.img`
  width: 70px;
  height: 70px;

  object-fit: contain;

  ${({ theme }) => `filter: ${theme.body.imageBrightness};`}
`
