import { ButtonPrimary } from 'components/Button/Button'
import CardWrapper from 'components/wrappers/CardWrapper'
import { FormikProvider } from 'formik'
import FormikTextField from 'components/TextFieldFormik'
import styled from 'styled-components'
import { useProfile } from './useProfile'

const ProfileSettings = () => {
  const { formik } = useProfile()

  return (
    <CardWrapper>
      <FormikProvider value={formik}>
        <StyledFieldsWrapper>
          <FormikTextField name='name' placeholder={'Full name'} label={'Full name'} />
          <FormikTextField name='email' placeholder='Email' label='Email' disabled />
          <FormikTextField name='company_name' placeholder='Company name' label='Company name' />
          <FormikTextField name='account_type' placeholder='Account type' label='Account type' disabled />
          <StyledButtonWrapper>
            <ButtonPrimary onClick={formik.handleSubmit}>Save</ButtonPrimary>
          </StyledButtonWrapper>
        </StyledFieldsWrapper>
      </FormikProvider>
    </CardWrapper>
  )
}

export default ProfileSettings

const StyledFieldsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
const StyledButtonWrapper = styled.div`
  margin-top: auto;
  margin-left: auto;
`
