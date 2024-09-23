import withRenderModal from 'hocs/withRenderModal'
import styled from 'styled-components'
import Modal from 'share-ui/components/Modal/Modal'
import { useModal } from 'hooks'
import IconButton from 'share-ui/components/IconButton/IconButton'
import Close from 'share-ui/components/Icon/Icons/components/Close'
import Box from '@mui/material/Box'
import { ButtonPrimary, ButtonSecondary } from 'components/Button/Button'
import Button from 'share-ui/components/Button/Button'
import MainModal from 'modals/MainModal'

interface EditSecretModalProps {
  data: {
    handleUpdateSecret: (field: string) => void
    field: string
    renderComponent: React.ReactNode
  }
}

const EditSecretModal = ({ data: { handleUpdateSecret, field, renderComponent } }: EditSecretModalProps) => {
  const { closeModal } = useModal()
  return (
    <MainModal
      onClose={() => closeModal('edit-secret-modal')}
      title={''}
      submitLoading={false}
      onSubmit={() => handleUpdateSecret(field)}
    >
      <StyledModalBody> {renderComponent}</StyledModalBody>
    </MainModal>
  )
}

export default withRenderModal('edit-secret-modal')(EditSecretModal)

const StyledModalBody = styled.div`
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  padding: 32px;
  display: flex;
  flex-direction: column;
  min-height: 330px;
  justify-content: space-between;
`
export const StyledButtonWrapper = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;
`
