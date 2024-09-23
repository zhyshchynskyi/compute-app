import TypographyPrimary from 'components/Typography/Primary'

import { DropdownChevronRight } from 'share-ui/components/Icon/Icons'
import styled from 'styled-components'

const ApiButtonCard = ({ label, onClick }: { label: string; onClick: () => void }) => {
  return (
    <StyledRoot onClick={onClick}>
      <StyledFlexWrapper>
        <TypographyPrimary value={label} size='medium' />
        <DropdownChevronRight />
      </StyledFlexWrapper>
    </StyledRoot>
  )
}

export default ApiButtonCard

const StyledRoot = styled.div`
  position: relative;
  width: 335px;
  min-width: 335px;
  height: 185px;
  min-height: 185px;

  border-radius: 22px;

  background: ${({ theme }) => theme.body.cardBgColor};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0.7;
  :hover {
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
    opacity: 1;
    cursor: pointer;
  }
`
const StyledFlexWrapper = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.body.textColorPrimary};
`
