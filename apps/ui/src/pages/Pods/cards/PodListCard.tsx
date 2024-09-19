import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TypographyPrimary from 'components/Typography/Primary'
// import { StyledNameWrapper } from 'modals/AIChatModal/components/ChatMembers/components/MemberText'
import { capitalizeFirstLetter } from 'share-ui/utils/capitalizeFirstLetter'
import styled from 'styled-components'

type PodListCardProps = {
  onClick: () => void
  isSelected: boolean
  name: string
  templateImage: string
  resource: { name: string; ram: string }
  status: string
}

const PodListCard = ({
  onClick,
  isSelected,
  name,
  templateImage,
  resource,
  status,
}: PodListCardProps) => {
  return (
    <StyledRootBox onClick={onClick} isSelected={isSelected} mt={1} display={'flex'}>
      <StyledCardLayoutBox display={'flex'} justifyContent={'space-between'}>
        <Box display={'flex'} flexDirection={'column'}>
          {/* <StyledNameWrapper> */}
            <TypographyPrimary value={name} bold size='small' />
          {/* </StyledNameWrapper> */}
          <TypographyPrimary value={`Template: ${templateImage}`} size='xs-small' />
          <TypographyPrimary value={`${resource.name} - RAM ${resource.ram} GB`} size='xs-small' />
        </Box>

        <Box display={'flex'} flexDirection={'column'} justifyContent={'center'}>
          <StyledStatusTypography running={status === 'running'} fontSize={'13px'} fontWeight={500}>
            {capitalizeFirstLetter(status)}
          </StyledStatusTypography>
        </Box>
      </StyledCardLayoutBox>
    </StyledRootBox>
  )
}

export default PodListCard

export const StyledRootBox = styled(Box)<{ isSelected: boolean }>`
  width: 100%;

  background: ${({ theme }) => `${theme.body.cardBgColor}`};
  border-radius: 10px;
  cursor: pointer;

  border: ${({ theme }) => `1px solid ${theme.core.border.borderQuaternary}`};
  &:hover {
    box-shadow: ${({ theme }) => `${theme.body.boxShadow}`};
  }
  ${({ isSelected, theme }) =>
    isSelected &&
    `
    box-shadow: ${theme.body.boxShadow};
    border: 1px solid ${theme.core.border.borderTertiary};
  `}
`
export const StyledCardLayoutBox = styled(Box)`
  padding: 10px 16px;
  width: 100%;
`
export const StyledStatusTypography = styled(Typography)<{ running: boolean }>`
  color: ${({ running, theme }) =>
    running ? theme.foundation.accentGreen : theme.foundation.negative};
  background: ${({ running }) => (running ? '#95ff752b' : '#fceaecb2')};
  padding: 4px 15px;
  border-radius: 8px;
`
