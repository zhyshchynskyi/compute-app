import Box from '@mui/material/Box'

import { borderBoxStyles } from '../../styles'
import styled from 'styled-components'

import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { Resource } from 'types/resource'
import useDetails from './useDetails'
import Price from './Price'
import EditPodTemplateModal from '../template/EditPodTemplateModal'
import { StyledSecondaryTitle } from 'pages/Pods/PodsContent'
import TypographyPrimary from 'components/Typography/Primary'
import { StyledHorizontalDivider } from 'routes/ChatRouteLayout'
import FormikTextField from 'components/TextFieldFormik/TextFieldFormik'
import { FormikProvider } from 'formik'
import { ButtonPrimary, ButtonSecondary } from 'components/Button/Button'
import { StyledSlider } from '../Filter/FilterPods'
import PodPlanCard from 'pages/Pods/cards/PodPlanCard'
import { StyledImg } from '../template/ChangeTemplateModal'

interface DetailsProps {
  resource: Resource
}

const sliderMarks = (max_gpu: number) =>
  Array.from({ length: max_gpu }, (_, index) => ({
    value: index,
    label: index,
  }))

const Details = ({ resource }: DetailsProps) => {
  const {
    formik,
    plan_cards,
    selectedPlan,
    handleSelectPlan,
    handleOpenChangeTemplateModal,
    selectedTemplate,
    create_pod_loading,
    handleOpenEditTemplateModal,
    overrides,
    selectedSshKey,
    handleOpenChangeSshKeyModal,
  } = useDetails(resource)

  return (
    <FormikProvider value={formik}>
      <StyledButton onClick={formik.handleSubmit} loading={create_pod_loading} disabled={create_pod_loading}>
        Deploy On-Demand
      </StyledButton>

      <Box
        sx={{
          width: '100%',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'start',
          gap: '16px',
          marginTop: '20px',
        }}
      >
        <StyledSecondaryTitle>
          <TypographyPrimary value='Configure Deployment' semiBold size='large' />
          <StyledHorizontalDivider />
        </StyledSecondaryTitle>

        <Box sx={borderBoxStyles}>
          <FormikTextField label='Pod Name' placeholder='Name' name='pod_name' />

          <Box
            mt={2}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            <StyledTemplateFieldWrapper>
              <TypographyPrimary value='Pod Template' size='medium' />

              {selectedTemplate ? (
                <StyledPodTemplate>
                  <Box display={'flex'}>
                    <StyledImg src='https://www.svgrepo.com/show/333528/docker.svg' alt='' />
                    <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} ml={1}>
                      <TypographyPrimary value={selectedTemplate?.name ?? ''} bold size='medium' />
                      <TypographyPrimary value={selectedTemplate?.container_image ?? ''} size='small' />
                    </Box>
                  </Box>
                  <Box>
                    <ButtonSecondary onClick={handleOpenChangeTemplateModal}>Change Template</ButtonSecondary>
                  </Box>
                </StyledPodTemplate>
              ) : (
                <Box mt={1}>
                  <ButtonPrimary onClick={handleOpenChangeTemplateModal} size='small'>
                    Choose Template
                  </ButtonPrimary>
                </Box>
              )}

              {selectedTemplate && (
                <Box display={'flex'} alignItems={'center'} mt={0.5}>
                  <Box>
                    <ButtonPrimary onClick={handleOpenEditTemplateModal} size='small'>
                      Edit template
                    </ButtonPrimary>
                  </Box>

                  {overrides ? (
                    <Box ml={2}>
                      <TypographyPrimary value={'Overrides'} size='medium' />
                    </Box>
                  ) : null}
                </Box>
              )}
            </StyledTemplateFieldWrapper>

            <StyledSliderWrapper>
              <TypographyPrimary value='SSH Key' size='medium' />

              {selectedSshKey ? (
                <StyledPodTemplate>
                  <Box display={'flex'}>
                    <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} ml={1}>
                      <TypographyPrimary value={selectedSshKey?.name ?? ''} bold size='medium' />
                    </Box>
                  </Box>
                  <Box>
                    <ButtonSecondary onClick={handleOpenChangeSshKeyModal}>Change SSH Key</ButtonSecondary>
                  </Box>
                </StyledPodTemplate>
              ) : (
                <Box mt={1}>
                  <ButtonPrimary onClick={handleOpenChangeSshKeyModal} size='small'>
                    Choose SSH Key
                  </ButtonPrimary>
                </Box>
              )}
            </StyledSliderWrapper>

            <StyledSliderWrapper>
              <TypographyPrimary value='GPU Count' size='medium' />

              <StyledSlider
                aria-label='Custom marks'
                defaultValue={1}
                onChange={(e, value) => formik.setFieldValue('max_gpu', value)}
                value={formik.values.max_gpu}
                getAriaValueText={value => `${value}`}
                valueLabelDisplay='auto'
                step={1}
                max={resource.max_gpu}
                min={1}
                marks={sliderMarks(resource.max_gpu + 1)}
                sx={{ marginLeft: 1 }}
              />
            </StyledSliderWrapper>

            <Box mt={1} display={'flex'} flexDirection={'column'} gap={2}>
              <div>
                <TypographyPrimary value='Instance Pricing' size='medium' />
                <Box mt={0.5} display={'flex'}>
                  {plan_cards.map((plan, index) => (
                    <Box key={index} ml={index > 0 ? 2 : 0}>
                      <PodPlanCard plan={plan} selectedPlan={selectedPlan} handleSelectPlan={handleSelectPlan} />
                    </Box>
                  ))}
                </Box>
              </div>
              <FormGroup>
                <FormControlLabel
                  control={<StyledCheckbox />}
                  label={<TypographyPrimary value='Encrypt Volume' size='medium' />}
                  componentsProps={{
                    typography: { style: { marginTop: '5px' } },
                  }}
                />
                <FormControlLabel
                  disabled
                  control={<StyledCheckbox />}
                  label={<TypographyPrimary value='SSH Terminal Access' size='medium' />}
                  componentsProps={{
                    typography: { style: { marginTop: '5px' } },
                  }}
                />
                <FormControlLabel
                  control={<StyledCheckbox />}
                  label={<TypographyPrimary value='Start Jupyter Notebook' size='medium' />}
                  componentsProps={{
                    typography: { style: { marginTop: '5px' } },
                  }}
                />
              </FormGroup>
            </Box>
          </Box>
        </Box>
      </Box>
      <Price selectedPlan={selectedPlan} formik={formik} resource={resource} />
      <EditPodTemplateModal />
    </FormikProvider>
  )
}

export default Details

const StyledPodTemplate = styled.div`
  width: 100%;
  margin-top: 4px;
  padding: 10px 20px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  border-radius: 10px;
  border: ${({ theme }) => `2px solid ${theme.core.border.borderQuaternary}`} !important;

  box-shadow: none !important;
  background-color: ${({ theme }) => `${theme.body.cardBgColor}`} !important;
  border-radius: 10px !important;
`
const StyledTemplateFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`
const StyledButton = styled(ButtonPrimary)`
  font-weight: 500;

  position: absolute;

  top: 0px;
  right: 20px;

  z-index: 20;
`
const StyledSliderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 8px;
  width: 100%;
  padding-right: 20px;
  gap: 10px;
`
const StyledCheckbox = styled(Checkbox)`
  &.MuiCheckbox-root {
    color: ${({ theme }) => theme.body.textColorPrimary} !important;
  }
  &.Mui-checked {
    color: ${({ theme }) => theme.body.linkTextColor} !important;
  }
`
