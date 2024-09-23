import styled from 'styled-components'
import { FormikProvider } from 'formik'
import { AddCreditToggleButtonGroup } from 'pages/Billing/panels/components/AddCreditToggleButtonGroup'
import TypographyPrimary from 'components/Typography/Primary'
import TypographySecondary from 'components/Typography/Secondary'
import CardWrapper from 'components/wrappers/CardWrapper'
import Button from 'share-ui/components/Button/Button'
import { ButtonSecondary } from 'components/Button/Button'
import TextField from 'share-ui/components/TextField/TextField'
import { TextFieldTextType } from 'share-ui/components/TextField/TextFieldConstants'
import { StyledHorizontalDivider } from 'routes/ChatRouteLayout'
import { StyledPanelWrapper } from 'styles/panelStyles.css'
import { StyledFlex } from 'styles/globalStyle.css'
import usePayment from './usePayment'
import Box from '@mui/material/Box'
import FormikTextField from 'components/TextFieldFormik'
import Delete from 'share-ui/components/Icon/Icons/components/Delete'

const General = () => {
  const { payWithCardHandler, addCardHandler, balance, removePaymentCard, setAmount, amount, is_card_added, formik } =
    usePayment()

  return (
    <StyledPanelWrapper>
      <CardWrapper>
        <StyledContentContainer>
          <StyledHeader>
            <TypographyPrimary size='x-large' value={`Balance: ${balance ? `$${balance}` : '$0.000'}`} />
          </StyledHeader>

          <StyledBody>
            <TypographySecondary size='small' value='Spend Limit: $40 / hr' />
            <TypographySecondary size='small' value='Current GPU Cloud Spend: $0.000 / hr' />
          </StyledBody>

          <StyledHorizontalDivider />

          <StyledBody>
            <TypographyPrimary size='medium' semiBold value='Add Credit' />

            <StyledRow>
              <AddCreditToggleButtonGroup setAmount={setAmount} />
              <TextField
                value={amount}
                type={TextFieldTextType.NUMBER}
                placeholder='$0.000'
                onChange={value => setAmount(value)}
              />
            </StyledRow>
            <StyledRow>
              <Button
                // disabled={!isCardWasAdded}
                onClick={() => payWithCardHandler()}
              >
                Pay with Card
              </Button>
            </StyledRow>
          </StyledBody>
        </StyledContentContainer>
      </CardWrapper>

      <CardWrapper>
        <StyledContentContainer>
          <StyledHeader>
            <TypographyPrimary value='Automatic Payments' semiBold />
          </StyledHeader>

          <StyledBody>
            <TypographySecondary
              size='small'
              value='Configure automatic billing by adding a card to your account. When your balance nears your Auto-Pay threshold, we will attempt to reload Datura credits by billing your saved card max once per hour for the Auto-Pay amount that is configured below.'
            />

            <StyledRow>
              <StyledImg src='https://cdn-icons-png.freepik.com/512/4341/4341764.png' />

              {!is_card_added && (
                <Button size='small' disabled={is_card_added} onClick={() => addCardHandler()}>
                  Add Card
                </Button>
              )}
              {is_card_added && (
                <ButtonSecondary onClick={removePaymentCard}>
                  <StyledFlex>
                    <StyledDeleteIcon />
                    Remove
                  </StyledFlex>
                </ButtonSecondary>
              )}
            </StyledRow>
            <FormikProvider value={formik}>
              <Box
                display={'grid'}
                gridTemplateColumns={'1fr 1fr 120px'}
                gap={3}
                width={'70%'}
                mt={3}
                alignItems={'center'}
              >
                <FormikTextField
                  name='auto_pay_threshold'
                  placeholder={'Auto-Pay Threshold'}
                  label={'Auto-Pay Threshold'}
                  disabled={!is_card_added}
                />
                <FormikTextField
                  name='auto_pay_amount'
                  placeholder={'Auto-Pay Amount'}
                  label={'Auto-Pay Amount'}
                  disabled={!is_card_added}
                />
                <Box mt={3}>
                  <Button size='small' disabled={!is_card_added} onClick={() => formik.handleSubmit()}>
                    Edit
                  </Button>
                </Box>
              </Box>
            </FormikProvider>
          </StyledBody>
        </StyledContentContainer>
      </CardWrapper>
    </StyledPanelWrapper>
  )
}
export default General

const StyledDeleteIcon = styled(Delete)`
  path {
    fill: ${({ theme }) => theme.body.iconColor};
  }
`

const StyledContentContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: 16px;
`
const StyledHeader = styled.div``

const StyledBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  max-width: 800px;
`
const StyledRow = styled.div`
  display: flex;
  align-items: center;

  gap: 10px;

  width: 400px;

  & + & {
    margin-top: 10px;
  }
`
export const StyledText = styled.div`
  width: 30px;

  height: 100%;

  display: flex;
  justify-content: center;
  align-items: flex-end;

  font-size: 16px;

  margin-top: 2px;
`
const StyledImg = styled.img`
  object-fit: cover;

  margin-top: 10px;

  width: 150px;
  height: 100px;
`
