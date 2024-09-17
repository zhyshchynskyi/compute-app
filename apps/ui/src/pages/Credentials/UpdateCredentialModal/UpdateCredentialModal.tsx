import { FormikProvider } from 'formik'
import withRenderModal from 'hocs/withRenderModal'

import Box from '@mui/material/Box'

import FormikTextField from 'components/TextFieldFormik'
import useUpdateCredential, { ModalProps } from './useUpdateCredential'
import MainModal from 'modals/MainModal'
import { StyledModalBody } from '../CreateCredentialModal/CreateCredentialModal'

interface UpdateCredentialModalProps {
  data: ModalProps
}

const UpdateCredentialModal = ({ data: { credential } }: UpdateCredentialModalProps) => {
  const { closeModal, formik, update_credential_loading } = useUpdateCredential({
    credential,
  })

  return (
    <FormikProvider value={formik}>
      <MainModal
        onClose={() => closeModal('update-credential-modal')}
        title={'Edit Registry Credential'}
        submitLoading={update_credential_loading}
        onSubmit={formik.handleSubmit}
      >
        <StyledModalBody>
          <Box mt={2}>
            <FormikTextField
              name='credential_name'
              placeholder={'Type Credential Name...'}
              label={'Credential Name'}
              disabled
            />
            <FormikTextField
              name='user_name'
              placeholder={'Type User Name...'}
              label={'User Name'}
            />
            <FormikTextField
              name='password'
              placeholder={'Type Password...'}
              label={'Password'}
              type='password'
            />
          </Box>
        </StyledModalBody>
      </MainModal>
    </FormikProvider>
  )
}

export default withRenderModal('update-credential-modal')(UpdateCredentialModal)
