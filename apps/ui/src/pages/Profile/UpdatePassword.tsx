import { FormikProvider } from 'formik'
import styled from 'styled-components'
import { ButtonPrimary } from 'components/Button/Button'
import CardWrapper from 'components/wrappers/CardWrapper'
import FormikTextField from 'components/TextFieldFormik'
import { useUpdatePassword } from './useProfile'

const UpdatePassword = () => {
    const { formik } = useUpdatePassword()

    return (
        <StyledFormWrapper>
            <CardWrapper>
                <FormikProvider value={formik}>
                    <StyledFieldsWrapper>
                        <FormikTextField
                            name='new_password'
                            placeholder='New password'
                            label='New password'
                            type='password'
                        />
                        <FormikTextField
                            name='confirm_password'
                            placeholder={'Confirm new password'}
                            label={'Confirm new password'}
                            type='password'
                        />
                        <StyledButtonWrapper>
                            <ButtonPrimary onClick={formik.handleSubmit}>Save</ButtonPrimary>
                        </StyledButtonWrapper>
                    </StyledFieldsWrapper>
                </FormikProvider>
            </CardWrapper>
        </StyledFormWrapper>
    )
}

export default UpdatePassword

const StyledFormWrapper = styled.div`
  width: 100%;
`

const StyledFieldsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
const StyledButtonWrapper = styled.div`
  margin-top: auto;
  margin-left: auto;
`
