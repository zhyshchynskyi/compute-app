import styled from 'styled-components'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'

import PodResourcesCard from './cards/PodResourcesCard'
import Details from './components/details/Details'
import FilterPods from './components/Filter/FilterPods'
import { useResource, usePodContent } from './usePods'

import { Resource } from 'types/resource'

import { StyledSectionWrapper } from 'pages/Home/homeStyle.css'
import { StyledFormHeader, StyledFormInputWrapper, StyledFormRoot } from 'styles/formStyles.css'
import TypographyPrimary from 'components/Typography/Primary'

import { useRef } from 'react'

const Line = ({ label }: { label: string }) => {
  return (
    <StyledLineContainer>
      <Stack sx={{}}>
        <StyledChip label={label} size='small' />
      </Stack>
      <StyledLine />
    </StyledLineContainer>
  )
}

export const temp_data = {
  NVIDIA: [
    {
      name: 'RTX 4090',
      price: '$0.74/hr',
      ram: '48 GB RAM',
      vram: '125 GB RAM',
      cram: '28 vCPU',
      id: 1,
    },
    {
      name: 'H100 SXM',
      price: '$1/hr',
      ram: '23 GB RAM',
      vram: '90 GB RAM',
      cram: '24 vCPU',
      id: 2,
    },
    {
      name: 'H100 PCIe',
      price: '$0.32/hr',
      ram: '44 GB RAM',
      vram: '140 GB RAM',
      cram: '32 vCPU',
      id: 3,
    },
    {
      name: 'L40',
      price: '$0.74/hr',
      ram: '55 GB RAM',
      vram: '130 GB RAM',
      cram: '22 vCPU',
      id: 4,
    },
    {
      name: 'RTX 6000 Ada',
      price: '$2.01/hr',
      ram: '32 GB RAM',
      vram: '150 GB RAM',
      cram: '32 vCPU',
      id: 5,
    },
    {
      name: 'RTX 4000 Ada',
      price: '$1.4/hr',
      ram: '16 GB RAM',
      vram: '100 GB RAM',
      cram: '64 vCPU',
      id: 6,
    },
    {
      name: 'RTX 3090',
      price: '$0.20/hr',
      ram: '12 GB RAM',
      vram: '250 GB RAM',
      cram: '56 vCPU',
      id: 7,
    },
    {
      name: 'RTX A4500',
      price: '$0.32/hr',
      ram: '8 GB RAM',
      vram: '300 GB RAM',
      cram: '12 vCPU',
      id: 8,
    },
  ],
  AMD: [
    {
      name: 'RTX',
      price: '$0.74/hr',
      ram: '48 GB RAM',
      vram: '125 GB RAM',
      cram: '32 vCPU',
      id: 9,
    },
    {
      name: 'RTX A4000',
      price: '$0.74/hr',
      ram: '48 GB RAM',
      vram: '125 GB RAM',
      cram: '32 vCPU',
      id: 10,
    },
    {
      name: 'A100 SXM',
      price: '$0.74/hr',
      ram: '48 GB RAM',
      vram: '125 GB RAM',
      cram: '32 vCPU',
      id: 11,
    },
    {
      name: 'RTX 6000 Ada',
      price: '$0.74/hr',
      ram: '48 GB RAM',
      vram: '125 GB RAM',
      cram: '32 vCPU',
      id: 12,
    },
    {
      name: 'A100 PCIe',
      price: '$0.74/hr',
      ram: '48 GB RAM',
      vram: '125 GB RAM',
      cram: '32 vCPU',
      id: 13,
    },
    {
      name: 'H100 PCIe',
      price: '$0.74/hr',
      ram: '48 GB RAM',
      vram: '125 GB RAM',
      cram: '32 vCPU',
      id: 14,
    },
    {
      name: 'RTX',
      price: '$0.74/hr',
      ram: '48 GB RAM',
      vram: '125 GB RAM',
      cram: '32 vCPU',
      id: 15,
    },
  ],
}

const PodsContent = () => {
  const { resources, formik: resourcesFormik } = useResource()
  const { resource, handleSelectResource: pickResource } = usePodContent()

  const data_keys = Object.keys(resources)

  const scrollRef = useRef<HTMLDivElement>(null)

  const scrollToDetails = () => {
    setTimeout(() => {
      scrollRef.current?.scrollIntoView({
        behavior: 'smooth',
      })
    }, 1)
  }

  const handleSelectResource = (resource: Resource) => {
    pickResource(resource)
    scrollToDetails()
  }

  return (
    <StyledSectionWrapper>
      <StyledFormRoot>
        <StyledFormHeader>
          <TypographyPrimary value='Add Pod' bold size='x-large' />
        </StyledFormHeader>

        <StyledFormInputWrapper>
          <Box
            sx={{
              width: '100%',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'start',
              gap: '16px',
              paddingTop: '20px',
            }}
          >
            <Box>
              <Box>
                <FilterPods values={resourcesFormik.values} handleChangeFilter={resourcesFormik.setFieldValue} />
              </Box>

              {data_keys.map((key: string, index: number) => (
                <Box mt={2} key={index}>
                  <Line label={key} />
                  <Grid container rowSpacing={1} columnSpacing={{ xs: 2 }} mt={2} rowGap={1}>
                    {resources[key].map((item: Resource, i: number) => (
                      <Grid item xs={12} sm={6} md={4} lg={3} key={i} minWidth={'300px'}>
                        <PodResourcesCard item={item} selected={resource} selectCard={handleSelectResource} />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              ))}
            </Box>
          </Box>

          {resource && (
            <>
              <div ref={scrollRef} />
              <Details resource={resource} />
            </>
          )}
        </StyledFormInputWrapper>
      </StyledFormRoot>
    </StyledSectionWrapper>
  )
}

export default PodsContent

const StyledLineContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const StyledLine = styled.div`
  width: 94%;
  height: 1px;
  background: ${({ theme }) => theme.body.secondaryBorderBackground};
`
const StyledChip = styled(Chip)`
  border-radius: 10px !important;
  color: ${({ theme }) => theme.body.textColorPrimary} !important;
  font-weight: 500 !important;
`

export const StyledSecondaryTitle = styled.div`
  display: flex;
  align-items: flex-start;
  white-space: nowrap;

  gap: 10px;

  width: 100%;
`
