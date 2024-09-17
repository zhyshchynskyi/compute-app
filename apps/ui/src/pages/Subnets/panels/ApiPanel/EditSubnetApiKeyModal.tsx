import withRenderModal from 'hocs/withRenderModal'

import MainModal from 'modals/MainModal'

import { useModal } from 'hooks'

import { FormikProvider } from 'formik'

import ApiKeysForm from 'pages/ApiKeys/CreateApiKey/ApiKeysForm'

import { useParams } from 'react-router-dom'

import { StyledBody } from './CreateSubnetApiKeyModal'
import useEditApiKey from 'pages/ApiKeys/EditApiKey/useEditApiKey'

type EditApiModalProps = {
  data: {
    id: string
  }
}

const EditSubnetApiKeyModal = ({ data }: EditApiModalProps) => {
  const { formik, isLoading } = useEditApiKey({
    id: data.id,
    callback: () => handleCloseModal(),
    isSubnet: true,
  })
  const { closeModal } = useModal()

  const handleCloseModal = () => {
    closeModal('edit-subnet-api-key-modal')
  }

  const { id: subnetId } = useParams()

  return (
    <FormikProvider value={formik}>
      <MainModal
        onClose={handleCloseModal}
        title={'Edit API key'}
        submitLoading={isLoading}
        onSubmit={formik.handleSubmit}
      >
        <StyledBody>
          <ApiKeysForm formik={formik} subnetId={subnetId} />
        </StyledBody>
      </MainModal>
    </FormikProvider>
  )
}

export default withRenderModal('edit-subnet-api-key-modal')(EditSubnetApiKeyModal)
