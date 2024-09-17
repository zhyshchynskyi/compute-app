import styled from 'styled-components'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { CardActionArea } from '@mui/material'
import Box from '@mui/material/Box'
import { Resource } from 'types/resource'
import TypographyPrimary from 'components/Typography/Primary'
import TypographySecondary from 'components/Typography/Secondary'
import Typography from 'share-ui/components/typography/Typography'
import { TypographySizes } from 'share-ui/components/typography/TypographyConstants'

interface PodResourcesCardProps {
  item: Resource
  selected: Resource | null
  selectCard: (resource: Resource) => void
}

export default function PodResourcesCard({ item, selected, selectCard }: PodResourcesCardProps) {
  const isSelected = selected && selected.id === item.id ? true : false

  return (
    <StyledCard onClick={() => selectCard(item)} isSelected={isSelected}>
      <StyledCardActionArea>
        <CardContent
          sx={{
            border: 'none',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <TypographyPrimary value={item.display_name} size='medium' />
              <TypographyPrimary value={`$${item.secure_price}/hr`} size='xs-small' semiBold />
            </Box>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
              mt={2}
            >
              <TypographySecondary value={`${item.ram} GB VRAM`} size='xs-small' />
              <TypographySecondary value={`${item.max_gpu} max`} size='xs-small' />
            </Box>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <TypographySecondary
                value={`${item.lowest_price.minMemory} GB RAM * ${item.lowest_price.minVcpu} vCPU`}
                size='xs-small'
              />
              <Typography value={`High`} size={TypographySizes.xss} style={{ color: '#17C568' }} />
            </Box>
          </Box>
        </CardContent>
      </StyledCardActionArea>
    </StyledCard>
  )
}

export const StyledCard = styled(Card)<{ isSelected: boolean; isDisabled?: boolean }>`
  width: 100%;
  border: ${({ theme }) => `2px solid ${theme.core.border.borderQuaternary}`} !important;

  box-shadow: none !important;
  background-color: ${({ theme }) => `${theme.body.cardBgColor}`} !important;
  border-radius: 10px !important;

  &:hover {
    box-shadow: ${({ theme }) => `${theme.body.boxShadow}`} !important;
  }

  ${({ isSelected, theme }) =>
    isSelected &&
    `
    box-shadow: ${theme.body.boxShadow} !important;
    border: 2px solid ${theme.core.border.borderSelectedA} !important;

  `}
  ${({ isDisabled }) =>
    isDisabled &&
    `
    pointer-events: none;
    opacity: 0.6;
    border-color: transparent !important;

  `}
`
const StyledCardActionArea = styled(CardActionArea)`
  box-shadow: none !important;
  border-radius: 10px !important;
`
