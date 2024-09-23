import Modal from 'share-ui/components/Modal/Modal'
import IconButton from 'share-ui/components/IconButton/IconButton'
import Close from 'share-ui/components/Icon/Icons/components/Close'

import styled from 'styled-components'
import TypographyPrimary from 'components/Typography/Primary'
import { ButtonPrimary, ButtonTertiary } from 'components/Button/Button'
import { ReactNode } from 'react'
import TypographySecondary from 'components/Typography/Secondary'

const MainModal = ({
  children,
  onClose,
  customButtons,
  onSubmit,
  title,
  submitLoading,
  description,
  submitLabel,
}: {
  children: ReactNode
  onClose: () => void
  onSubmit?: () => void
  customButtons?: any
  title: string
  submitLoading?: boolean
  description?: string
  submitLabel?: string
}) => {
  return (
    <Modal show onClose={onClose} hideCloseButton backgroundColor='light'>
      <StyledModalHeader>
        <StyledHeaderText>
          <TypographyPrimary value={title} bold size='x-large' />
          {description && <TypographySecondary value={description} semiBold size='small' />}
        </StyledHeaderText>
        <IconButton
          size={IconButton.sizes?.SMALL}
          icon={() => <StyledClose />}
          kind={IconButton.kinds?.TERTIARY}
          onClick={onClose}
        />
      </StyledModalHeader>
      <StyledModalBody>{children}</StyledModalBody>
      <StyledModalFooter>
        {customButtons ? (
          customButtons
        ) : (
          <>
            <ButtonTertiary onClick={onClose}>Close</ButtonTertiary>
            {onSubmit && (
              <ButtonPrimary onClick={onSubmit} loading={submitLoading} disabled={submitLoading}>
                {submitLabel ? submitLabel : 'Save'}
              </ButtonPrimary>
            )}
          </>
        )}
      </StyledModalFooter>
    </Modal>
  )
}
export default MainModal

const StyledModalHeader = styled.header`
  display: flex;

  justify-content: space-between;
  align-items: center;

  padding: 10px 20px;
  padding-right: 10px;

  height: 100%;
  position: sticky;
  top: 0;

  z-index: 10;
  background-color: ${({ theme }) => `${theme.core.background.backgroundTertiary}`};
`
const StyledModalBody = styled.div`
  width: 100%;
  height: 100%;

  overflow: auto;
`

const StyledModalFooter = styled.footer`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;

  height: 100%;

  padding: 10px 20px;
  padding-right: 15px;

  position: sticky;
  bottom: 0;

  z-index: 10;
  background-color: ${({ theme }) => `${theme.core.background.backgroundTertiary}`};
`
const StyledClose = styled(Close)`
  path {
    stroke: ${({ theme }) => theme.body.iconColor};
  }
`
const StyledHeaderText = styled.div`
  padding-top: 5px;

  display: flex;
  flex-direction: column;
  gap: 5px;
`
