import styled from 'styled-components'
// import SDKs from 'pages/Subnets/SDKs'
// import TextField from 'share-ui/components/TextField/TextField'
import { StyledTextFieldWrapper } from 'pages/Subnets/SubnetsStyles'
import TypographyPrimary from 'components/Typography/Primary'

import CardWrapper from 'components/wrappers/CardWrapper'
import TypographySecondary from 'components/Typography/Secondary'
import { StyledHeader } from './SelectType'
import { StyledHorizontalDivider } from 'routes/ChatRouteLayout'

import FormikTextField from 'components/TextFieldFormik/TextFieldFormik'
import { accountTypeEnum } from 'types/account'

interface ConfigurationsTypeProps {
  values: {
    name: string
    configs: {
      company_website: string
      account_type: accountTypeEnum
    }
  }
}

const Configurations = ({ values }: ConfigurationsTypeProps) => {
  return (
    <StyledConfiguration>
      <StyledInnerWrapper>
        <StyledHeader>
          <TypographyPrimary value='New Application Setup' bold size='x-large' />
          <TypographySecondary
            value='Enter the necessary details to configure your new application. Provide your application name and company website to get started.'
            size='medium'
          />
        </StyledHeader>

        <StyledHorizontalDivider />

        <CardWrapper>
          <StyledFieldsWrapper>
            <StyledTextFieldWrapper>
              <TypographyPrimary value='Application name' size='medium' />

              <FormikTextField placeholder='New app name' value={values.name} name='name' />
            </StyledTextFieldWrapper>

            <StyledTextFieldWrapper>
              <TypographyPrimary value='Company website' size='medium' />

              <FormikTextField
                placeholder='https://example.com'
                value={values.configs.company_website}
                name='configs.company_website'
              />
            </StyledTextFieldWrapper>
          </StyledFieldsWrapper>
        </CardWrapper>

        {/* <SDKs /> */}
      </StyledInnerWrapper>
    </StyledConfiguration>
  )
}

export default Configurations

const StyledConfiguration = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 100%;
  width: 100%;

  padding-top: 50px;

  overflow: auto;
`
const StyledFieldsWrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;

  gap: 20px;

  margin-bottom: 20px;
  /* padding: 0 100px; */
`
const StyledInnerWrapper = styled.div`
  display: flex;
  flex-direction: column;

  gap: 30px;

  width: 100%;
  height: 100%;
  max-width: 900px;
`
