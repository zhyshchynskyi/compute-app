import { FormikProvider } from 'formik'
import { ButtonPrimary } from 'components/Button/Button'
import Button from 'share-ui/components/Button/Button'
import { StyledFormHeader, StyledFormInputWrapper, StyledFormRoot } from 'styles/formStyles.css'
import { StyledSectionWrapper } from 'pages/Home/homeStyle.css'

import SubnetApiServiceForm from '../components/SubnetApiServiceForm'
import useEditSubnetApiService from './useEditSubnetApiService'
import TypographyPrimary from 'components/Typography/Primary'
import BackButton from 'components/BackButton'
import { StyledWrapper } from '../CreateSubnetModal/CreateSubnetApiModal'
import FormContentLoader from 'components/ContentLoaders/FormContentLoader'

const EditSubnetApiModal = () => {
  const { formik, update_subnet_api_loading, service_is_loading } = useEditSubnetApiService()
  return (
    <FormikProvider value={formik}>
      <StyledSectionWrapper>
        <StyledFormRoot>
          <StyledFormHeader>
            <TypographyPrimary value='Edit Subnet Api Service' size='x-large' bold />

            <StyledWrapper>
              <BackButton />
              <ButtonPrimary
                onClick={formik.handleSubmit}
                size={Button.sizes?.MEDIUM}
                disabled={update_subnet_api_loading}
                loading={update_subnet_api_loading}
              >
                Update
              </ButtonPrimary>
            </StyledWrapper>
          </StyledFormHeader>

          {service_is_loading ? (
            <StyledFormInputWrapper>
              <FormContentLoader />
            </StyledFormInputWrapper>
          ) : (
            <>
              <SubnetApiServiceForm formik={formik} />
            </>
          )}
        </StyledFormRoot>
      </StyledSectionWrapper>
    </FormikProvider>
  )
}

export default EditSubnetApiModal
