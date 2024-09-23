import styled from 'styled-components'
import withRenderModal from 'hocs/withRenderModal'
import MainModal from 'modals/MainModal'
import { FormikProvider } from 'formik'
import FormikTextField from 'components/TextFieldFormik'
import useCreateSecret from './useCreateSecret'
import Box from '@mui/material/Box'
import TextareaFormik from 'components/TextareaFormik'

const CreateSecretModal = () => {
  const { formik, create_secret_loading, handleCloseModal } = useCreateSecret()

  return (
    <FormikProvider value={formik}>
      <MainModal
        onClose={handleCloseModal}
        title={'Create Secret'}
        submitLoading={create_secret_loading}
        onSubmit={formik.handleSubmit}
      >
        <StyledBody>
          <Box display={'flex'} flexDirection={'column'} alignItems={'center'} gap={3}>
            <FormikTextField name='secret_name' placeholder={'Type Secret Name...'} label={'Secret Name'} />
            <FormikTextField name='secret_value' placeholder={'Type Secret Value...'} label={'Secret Value'} />

            <Box width={'100%'}>
              <TextareaFormik
                label={'Secret Description'}
                value={formik.values.secret_description}
                fieldName={'secret_description'}
                placeholder={'Type Secret Description...'}
              />
            </Box>
          </Box>
        </StyledBody>
      </MainModal>
    </FormikProvider>
  )
}

export default withRenderModal('create-secret')(CreateSecretModal)

const StyledBody = styled.div`
  padding: 20px;

  width: 90vw;
  max-width: 700px;
  min-width: 400px;

  height: auto;
`
