import React from 'react'
import styled, { useTheme } from 'styled-components'
import { AuthContext } from 'contexts'
import ComputeHome from './ComputeHome'
import Heading from 'share-ui/components/Heading/Heading'
import Typography from 'share-ui/components/typography/Typography'
import { ButtonPrimary } from 'components/Button/Button'
import Button from 'share-ui/components/Button/Button'
import { TypographyTypes, TypographySizes } from 'share-ui/components/typography/TypographyConstants'
import { useTranslation } from 'react-i18next'

const Home: React.FC = () => {
  const { user } = React.useContext(AuthContext)
  return (
    <>
      {user ? (
        <StyledWrapper>
          <ComputeHome />
        </StyledWrapper>
      ) : (
        <LandingPage />
      )}
    </>
  )
}

const LandingPage: React.FC = () => {
  const { t } = useTranslation()
  const theme = useTheme()
  return (
    <StyledLandingWrapper>
      <StyledMainHeaderWrapper>
        <Heading type={Heading.types?.h1} value={t('hero-heading')} customColor={theme.heading.contentPrimary} />
      </StyledMainHeaderWrapper>
      <Typography
        value={t('hero-subheading')}
        type={TypographyTypes.LABEL}
        size={TypographySizes.md}
        customColor={theme.heading.contentPrimary}
      />
      <ButtonPrimary size={Button.sizes?.MEDIUM}>{t('get-started')}</ButtonPrimary>
    </StyledLandingWrapper>
  )
}

export default Home

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 100px;
`

const StyledLandingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  gap: 30px;
  text-align: center;
  padding: 0 20px;
`

export const StyledMainHeaderWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`
