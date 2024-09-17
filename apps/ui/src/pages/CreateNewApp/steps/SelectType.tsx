import styled from 'styled-components'

import TypographyPrimary from 'components/Typography/Primary'
import { CardActionArea } from '@mui/material'
import { ButtonPrimary } from 'components/Button/Button'
import TypographySecondary from 'components/Typography/Secondary'

import { MODE_OPTIONS, ModeOptionsType } from '../useCreateNewApp'
import { StyledCard } from 'pages/Pods/cards/PodResourcesCard'
import { account_mode_icon } from 'context/AppModeContext'

interface SelectTypeProps {
  nextStep: () => void
  values: {
    name: string
    configs: any
  }
  setFieldValue: (field: string, value: any) => void
}

const SelectType = ({ nextStep, setFieldValue, values }: SelectTypeProps) => {
  return (
    <StyledInnerWrapper>
      <StyledHeader>
        <TypographyPrimary value={`Let's get started`} size='x-large' bold />
        <TypographySecondary
          value={'Choose the type of application you want to create:'}
          size='medium'
        />
      </StyledHeader>

      <StyledCardsWrapper>
        {MODE_OPTIONS.map((data: ModeOptionsType) => {
          return (
            <StyledCard
              key={data.type}
              onClick={() => setFieldValue('configs', data)}
              isSelected={values.configs.type === data.type}
              isDisabled={data.disabled}
            >
              <CardActionArea>
                <StyledCardInnerWrapper>
                  <StyledImg src={account_mode_icon[data.type]} />

                  <StyledTextWrapper>
                    <TypographyPrimary value={data.name} semiBold />
                    <TypographySecondary value={data.description} size='small' />
                  </StyledTextWrapper>
                </StyledCardInnerWrapper>
              </CardActionArea>
            </StyledCard>
          )
        })}
      </StyledCardsWrapper>

      <ButtonPrimary onClick={nextStep}>Continue</ButtonPrimary>
    </StyledInnerWrapper>
  )
}

export default SelectType

export const StyledInnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;

  padding-top: 100px;

  width: 100%;
  max-width: 600px;
  height: 100%;
`

const StyledCardInnerWrapper = styled.div`
  width: 100%;
  height: 80px;

  display: flex;

  align-items: center;
  gap: 10px;

  padding: 0 20px;
`

const StyledCardsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`
export const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
const StyledImg = styled.img`
  width: 34px;
  height: 34px;

  object-fit: contain;

  ${({ theme }) => `filter: ${theme.body.imageBrightness};`}
`
const StyledTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* gap: 5px; */
`
