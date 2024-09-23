import Card from '@mui/material/Card'
import { PlanCard } from '../components/details/useDetails'
import CardActionArea from '@mui/material/CardActionArea'
import Box from '@mui/material/Box'
import styled from 'styled-components'
import TypographyPrimary from 'components/Typography/Primary'
import TypographySecondary from 'components/Typography/Secondary'

interface PlanCardItemProps {
  plan: PlanCard
  selectedPlan: PlanCard
  handleSelectPlan: (plan: PlanCard) => void
}

const PodPlanCard = ({ plan, selectedPlan, handleSelectPlan }: PlanCardItemProps) => {
  const is_selected = plan.id === selectedPlan.id
  return (
    <StyledCard isSelected={is_selected} onClick={() => handleSelectPlan(plan)}>
      <CardActionArea sx={{ height: '100%' }}>
        <Box p={2} display={'flex'} flexDirection={'column'}>
          <StyledTitleWrapper>
            <TypographyPrimary value={plan.title} size='small' semiBold />
            <TypographySecondary value={plan.sub_title} size='xs-small' />
          </StyledTitleWrapper>

          <Box display={'flex'} alignItems={'flex-end'} mt={1} gap={'5px'}>
            <TypographyPrimary value={`$${plan.price.toFixed(2)}/hr`} size='medium' bold />

            {plan.total_price && <TypographySecondary value={`$${plan.total_price.toFixed(2)}`} size='xs-small' />}
          </Box>

          <StyledDescriptionWrapper>
            <TypographySecondary value={plan.description} size='xs-small' />
          </StyledDescriptionWrapper>
        </Box>
      </CardActionArea>
    </StyledCard>
  )
}

export default PodPlanCard

const StyledCard = styled(Card)<{ isSelected: boolean }>`
  width: 230px;
  height: 160px;
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
`
const StyledTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
const StyledDescriptionWrapper = styled.div`
  margin-top: 10px;
  display: flex;
`
