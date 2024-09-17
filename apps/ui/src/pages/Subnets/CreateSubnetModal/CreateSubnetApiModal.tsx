import { FormikProvider } from 'formik'
import { ButtonPrimary } from 'components/Button/Button'
import Button from 'share-ui/components/Button/Button'
import { StyledFormHeader, StyledFormRoot } from 'styles/formStyles.css'
import { StyledSectionWrapper } from 'pages/Home/homeStyle.css'
import SubnetApiServiceForm from '../components/SubnetApiServiceForm'
import useCreateSubnetApi from './useCreateSubnetApi'
import TypographyPrimary from 'components/Typography/Primary'
import BackButton from 'components/BackButton'
import styled from 'styled-components'

const CreateSubnetApiModal = () => {
  const { formik, create_subnet_api_loading } = useCreateSubnetApi()
  return (
    <FormikProvider value={formik}>
      <StyledSectionWrapper>
        <StyledFormRoot>
          <StyledFormHeader>
            <TypographyPrimary value='Create Subnet Api Service' size='x-large' bold />

            <StyledWrapper>
              <BackButton />
              <ButtonPrimary
                onClick={formik.handleSubmit}
                size={Button.sizes?.MEDIUM}
                disabled={create_subnet_api_loading}
                loading={create_subnet_api_loading}
              >
                Create
              </ButtonPrimary>
            </StyledWrapper>
          </StyledFormHeader>

          <SubnetApiServiceForm formik={formik} />
        </StyledFormRoot>
      </StyledSectionWrapper>
    </FormikProvider>
  )
}

export default CreateSubnetApiModal

export const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
`
