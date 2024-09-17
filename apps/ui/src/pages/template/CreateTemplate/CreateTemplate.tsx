import { FormikProvider } from 'formik'
import { StyledFormHeader, StyledFormRoot } from 'styles/formStyles.css'

import { StyledSectionWrapper } from 'pages/Home/homeStyle.css'

import { ButtonPrimary } from 'components/Button/Button'
import Button from 'share-ui/components/Button/Button'

import useCreateTemplate from './useCreateTemplate'
import TemplateForm from '../components/TemplateForm'

import TypographyPrimary from 'components/Typography/Primary'

const CreateTemplate = () => {
  const { formik, create_template_loading, credentials } = useCreateTemplate()

  return (
    <FormikProvider value={formik}>
      <StyledSectionWrapper>
        <StyledFormRoot>
          <StyledFormHeader>
            <TypographyPrimary value='Create Template' size='x-large' bold />
            <ButtonPrimary
              onClick={formik.handleSubmit}
              size={Button.sizes?.MEDIUM}
              disabled={create_template_loading}
              loading={create_template_loading}
            >
              Save Template
            </ButtonPrimary>
          </StyledFormHeader>
          <TemplateForm formik={formik} label='' credentials={credentials} />
        </StyledFormRoot>
      </StyledSectionWrapper>
    </FormikProvider>
  )
}

export default CreateTemplate
