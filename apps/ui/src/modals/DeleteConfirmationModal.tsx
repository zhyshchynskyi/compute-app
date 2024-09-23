import { useState } from 'react'
import styled from 'styled-components'

//eslint-disable-next-line
import PropTypes from 'prop-types'
import withRenderModal from 'hocs/withRenderModal'
import Button from 'share-ui/components/Button/Button'

import { useTranslation } from 'react-i18next'
import { useModal } from 'hooks'
import TypographyPrimary from 'components/Typography/Primary'
import MainModal from './MainModal'

type DeleteConfirmationModalProps = {
  data: {
    deleteItem: () => void
    label: string
    title: string
  }
}

const DeleteConfirmationModal = ({ data }: DeleteConfirmationModalProps) => {
  const { deleteItem, label } = data
  const [isLoading, setIsLoading] = useState(false)

  const { closeModal } = useModal()

  const handleConfirm = async () => {
    setIsLoading(true)
    await deleteItem()
    setIsLoading(false)
  }

  const handleClose = () => {
    closeModal('delete-confirmation-modal')
  }

  const { t } = useTranslation()

  return (
    <>
      <MainModal
        onClose={handleClose}
        title={''}
        customButtons={
          <>
            <Button onClick={handleClose} kind={Button.kinds?.TERTIARY} size={Button.sizes?.SMALL}>
              {t('cancel')}
            </Button>
            <Button
              onClick={handleConfirm}
              kind={Button.kinds?.PRIMARY}
              size={Button.sizes?.SMALL}
              disabled={isLoading}
              loading={isLoading}
            >
              {t('confirm')}
            </Button>
          </>
        }
      >
        <StyledBody>
          <TypographyPrimary value={isLoading ? `${t('processing')}` : label} size={'large'} semiBold />
        </StyledBody>
      </MainModal>
    </>
  )
}

DeleteConfirmationModal.propTypes = {
  openModal: PropTypes.func,
  data: PropTypes.object,
  closeModal: PropTypes.func,
}

export default withRenderModal('delete-confirmation-modal')(DeleteConfirmationModal)

const StyledBody = styled.div`
  min-width: 300px;
  width: fit-content;
  max-width: 400px;

  display: flex;
  justify-content: center;

  padding: 20px;

  padding-top: 5px;

  text-align: center;
`

export const StyledActionsContainer = styled.div`
  display: flex;
  position: relative;
  justify-content: flex-end;
  gap: 16px;

  width: 100%;
`
