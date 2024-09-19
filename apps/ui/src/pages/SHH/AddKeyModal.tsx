import styled from 'styled-components'
import withRenderModal from 'hocs/withRenderModal'

import MainModal from 'modals/MainModal'

import { useModal } from 'hooks'

import { FormikProvider } from 'formik'
import FormikTextField from 'components/TextFieldFormik'
import useCreateSsh from './CreateSsh/useCreateSsh'

const AddKeyModal = () => {
  const { formik, create_shh_loader } = useCreateSsh()
  const { closeModal } = useModal()

  const handleCloseModal = () => {
    closeModal('add-shh-key-modal')
  }

  return (
    <FormikProvider value={formik}>
      <MainModal
        onClose={handleCloseModal}
        title={'Add SHH key'}
        submitLoading={create_shh_loader}
        onSubmit={formik.handleSubmit}
      >
        <StyledBody>
          <FormikTextField name='name' placeholder={'SSH Name'} label={'SSH Name'} />
          <FormikTextField name='key' placeholder={'SSH Key'} label={'SSH Key'} />
        </StyledBody>
      </MainModal>
    </FormikProvider>
  )
}

export default withRenderModal('add-shh-key-modal')(AddKeyModal)

export const StyledBody = styled.div`
  padding: 20px;
  padding-top: 0;

  width: 90vw;
  max-width: 700px;
  min-width: 400px;

  height: auto;
`
