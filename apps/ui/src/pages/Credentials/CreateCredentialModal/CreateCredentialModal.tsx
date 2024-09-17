import { FormikProvider } from 'formik'
import withRenderModal from 'hocs/withRenderModal'
import styled from 'styled-components'

import Box from '@mui/material/Box'

import FormikTextField from 'components/TextFieldFormik'
import useCreateCredential from './useCreateCredential'
import MainModal from 'modals/MainModal'

const CreateCredentialModal = () => {
  const { closeModal, formik, create_credential_loading } = useCreateCredential()
  return (
    <FormikProvider value={formik}>
      <MainModal
        onClose={() => closeModal('create-credential-modal')}
        title={'Create New Registry Credential'}
        submitLoading={create_credential_loading}
        onSubmit={formik.handleSubmit}
      >
        <StyledModalBody>
          <Box display={'flex'} flexDirection={'column'}>
            <Box mt={2}>
              <FormikTextField
                name='credential_name'
                placeholder={'Type Credential Name...'}
                label={'Credential Name'}
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
          </Box>
        </StyledModalBody>
      </MainModal>
    </FormikProvider>
  )
}

export default withRenderModal('create-credential-modal')(CreateCredentialModal)

export const StyledModalBody = styled.div`
  padding: 20px;
  padding-top: 0;

  width: 90vw;
  max-width: 700px;
  min-width: 400px;

  height: auto;
`
