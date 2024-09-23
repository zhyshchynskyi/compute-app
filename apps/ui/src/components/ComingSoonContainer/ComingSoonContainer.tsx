import TypographyPrimary from 'components/Typography/Primary'
import { t } from 'i18next'
import styled from 'styled-components'

const ComingSoonContainer = ({
  children,
  isDisabled,
  label,
}: {
  children: React.ReactNode
  isDisabled?: boolean
  label?: string
}) => {
  if (isDisabled) {
    return <>{children}</>
  }

  return (
    <StyledWrapper>
      <StyledBlur>{children}</StyledBlur>
      <StyledLabel>
        <TypographyPrimary value={label ? label : t('coming-soon')} size='large' semiBold />
      </StyledLabel>
    </StyledWrapper>
  )
}

export default ComingSoonContainer

const StyledWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  pointer-events: none; /* Disable mouse events for children */
`

const StyledBlur = styled.div`
  filter: blur(5px);
  width: 100%;
  height: 100%;
  pointer-events: none; /* Ensure children are not interactive */
`

const StyledLabel = styled.div`
  position: absolute;
  pointer-events: auto; /* Allow interaction with the label if needed */
`
