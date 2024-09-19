import { FormikProvider } from 'formik'
import { StyledFormHeader, StyledFormInputWrapper, StyledFormRoot } from 'styles/formStyles.css'

import { StyledSectionWrapper } from 'pages/Home/homeStyle.css'

import { ButtonPrimary } from 'components/Button/Button'
import Button from 'share-ui/components/Button/Button'

import TemplateForm from '../components/TemplateForm'
import useEditTemplate from './useEditTemplate'

import TypographyPrimary from 'components/Typography/Primary'
import FormContentLoader from 'components/ContentLoaders/FormContentLoader'

const EditTemplate = () => {
  const { formik, update_template_loading, credentials, templateIsLoading } = useEditTemplate()

  return (
    <FormikProvider value={formik}>
      <StyledSectionWrapper>
        <StyledFormRoot>
          <StyledFormHeader>
            <TypographyPrimary value='Edit Template' size='x-large' bold />
            <ButtonPrimary
              onClick={formik.handleSubmit}
              size={Button.sizes?.MEDIUM}
              disabled={update_template_loading}
              loading={update_template_loading}
            >
              Save Template
            </ButtonPrimary>
          </StyledFormHeader>
          {templateIsLoading ? (
            <StyledFormInputWrapper>
              <FormContentLoader />
            </StyledFormInputWrapper>
          ) : (
            <TemplateForm formik={formik} label='' credentials={credentials} />
          )}
        </StyledFormRoot>
      </StyledSectionWrapper>
    </FormikProvider>
  )
}

export default EditTemplate
