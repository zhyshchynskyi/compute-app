import { ButtonPrimary } from 'components/Button/Button'
import { StyledHeader, StyledInnerWrapper } from './steps/SelectType'
import TypographyPrimary from 'components/Typography/Primary'
import TypographySecondary from 'components/Typography/Secondary'

const GetStarted = ({ handleSwitchToAccount }: { handleSwitchToAccount: () => void }) => {
  return (
    <StyledInnerWrapper>
      <StyledHeader>
        <TypographyPrimary value={`All Done! `} size='x-large' bold />
        <TypographySecondary
          value={
            'Your new application is ready. You can start using it now or further customize it in the dashboard.'
          }
          size='medium'
        />
      </StyledHeader>

      <ButtonPrimary onClick={handleSwitchToAccount}>Open new app</ButtonPrimary>
    </StyledInnerWrapper>
  )
}

export default GetStarted
