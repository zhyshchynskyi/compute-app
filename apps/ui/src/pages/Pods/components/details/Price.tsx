import Box from '@mui/material/Box'
import { borderBoxStyles } from '../../styles'

import { Resource } from 'types/resource'
import { PlanCard } from './useDetails'
import TypographyPrimary from 'components/Typography/Primary'
import styled from 'styled-components'
import TypographySecondary from 'components/Typography/Secondary'

interface PriceProps {
  selectedPlan: PlanCard
  formik: any
  resource: Resource
}

const Price = ({ selectedPlan, formik, resource }: PriceProps) => {
  const { max_gpu: maxGpu } = formik.values
  return (
    <Box
      sx={{
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: '20px',
        }}
      >
        <Box sx={{ ...borderBoxStyles, width: '49%' }} display={'flex'} flexDirection={'column'}>
          <TypographyPrimary value='Pricing Summary' bold size='medium' />

          {!selectedPlan.per_mont ? (
            <StyledInfoWrapper>
              <TypographySecondary
                value={`GPU Cost: $${(selectedPlan.default_price * maxGpu).toFixed(2)} / hr`}
                size='small'
              />
              <TypographySecondary value={`Running Disk Cost: $0.008 / hr`} size='small' />
              <TypographySecondary value={`Exited Disk Cost: $0.006 / hr`} size='small' />
            </StyledInfoWrapper>
          ) : (
            <>
              <Box>
                <Box>
                  <Box
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                    mt={2}
                  >
                    <TypographyPrimary value={`Upfront Costs`} size='small' semiBold />
                    <TypographyPrimary
                      value={`$${(selectedPlan.default_total_price
                        ? selectedPlan.default_total_price * maxGpu
                        : 0
                      ).toFixed(2)}`}
                      size='small'
                      bold
                    />
                  </Box>

                  <TypographySecondary
                    value={`${resource.display_name} x ${maxGpu}`}
                    size='small'
                  />
                  <TypographySecondary value={selectedPlan.title} size='small' />
                </Box>

                <Box>
                  <TypographyPrimary value={`Usage-Based Costs`} size='small' semiBold />

                  <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                    <TypographySecondary value={resource.display_name} size='small' />
                    <TypographyPrimary value={'$0.008 /hr'} size='small' semiBold />
                  </Box>
                  <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                    <TypographySecondary value={selectedPlan.title} size='small' />
                    <TypographyPrimary value={'$0.014 /hr'} size='small' semiBold />
                  </Box>
                </Box>
              </Box>
            </>
          )}
        </Box>
        <StyledInfoWrapper>
          <TypographyPrimary value={`Pod Summary`} size='medium' bold />

          <TypographySecondary
            value={`${maxGpu}x ${resource.display_name} (${resource.ram * maxGpu} GB VRAM)`}
            size='small'
          />
          <TypographySecondary value={'Running Disk Cost: $0.006 / hr'} size='small' />
          <TypographySecondary value={'Exited Disk Cost: $0.006 / hr'} size='small' />
        </StyledInfoWrapper>
      </Box>
    </Box>
  )
}

export default Price

const StyledInfoWrapper = styled.div`
  margin-top: 20px;

  display: flex;
  flex-direction: column;
  gap: 5px;
`
