import { StyledAppContainer } from 'components/Layout/LayoutStyle'
import {
    StyledChatWrapper,
    StyledContainer,
    StyledHorizontalDivider,
    StyledMainWrapper,
} from 'routes/ChatRouteLayout'
import styled from 'styled-components'
import SelectType from './steps/SelectType'

import { ButtonPrimary } from 'components/Button/Button'
import Configurations from './steps/Configurations'
import TypographyPrimary from 'components/Typography/Primary'
import useCreateNewApp from './useCreateNewApp'
import GetStarted from './GetStarted'
import { FormikProvider } from 'formik'

const CreateNewApp = ({ isEdit = false }: { isEdit?: boolean }) => {
    const { formik, step, handleSetStep, create_account_loading, handleSwitchToAccount } =
        useCreateNewApp({ isEdit })

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <SelectType
                        nextStep={() => handleSetStep(step + 1)}
                        values={formik.values}
                        setFieldValue={formik.setFieldValue}
                    />
                )
            case 2:
                return (
                    <>
                        <Configurations values={formik.values} />
                        <StyledButtonsWrapper>
                            <ButtonPrimary onClick={() => handleSetStep(step - 1)}>
                                Back
                            </ButtonPrimary>
                            <ButtonPrimary
                                onClick={formik.handleSubmit}
                                loading={create_account_loading}
                                disabled={create_account_loading}
                            >
                                Create App
                            </ButtonPrimary>
                        </StyledButtonsWrapper>
                    </>
                )
            case 3:
                return (
                    <>
                        <GetStarted handleSwitchToAccount={handleSwitchToAccount} />
                    </>
                )
            default:
                return <div>Unknown Step</div>
        }
    }

    return (
        <FormikProvider value={formik}>
            <StyledAppContainer>
                <StyledContainer>
                    <StyledMainWrapper>
                        <StyledChatWrapper>
                            <StyledRoot>
                                <StyledHeader>
                                    <StyledButton
                                        picked={step === 1}
                                        onClick={() => handleSetStep(1)}
                                        disabled={step === 3}
                                    >
                                        <TypographyPrimary
                                            value='Select App type'
                                            bold={step === 1}
                                        />
                                    </StyledButton>

                                    <StyledDividerLine />

                                    <StyledButton
                                        picked={step === 2}
                                        onClick={() => handleSetStep(2)}
                                        disabled={step === 3}
                                    >
                                        <TypographyPrimary
                                            value='Configuration'
                                            bold={step === 2}
                                        />
                                    </StyledButton>
                                    {!isEdit && (
                                        <>
                                            <StyledDividerLine />

                                            <StyledButton
                                                picked={step === 3}
                                                onClick={() => handleSetStep(3)}
                                            >
                                                <TypographyPrimary
                                                    value='Get Started'
                                                    bold={step === 3}
                                                />
                                            </StyledButton>
                                        </>
                                    )}
                                </StyledHeader>

                                <StyledHorizontalDivider />

                                <StyledBody>{renderStep()}</StyledBody>

                                {/* <StyledButtonsWrapper>
                {step > 1 && <button onClick={prevStep}>Back</button>}
                {step < 3 && <button onClick={nextStep}>Next</button>}
                {step === 3 && <button onClick={() => alert('Process completed!')}>Finish</button>}
              </StyledButtonsWrapper> */}
                            </StyledRoot>
                        </StyledChatWrapper>
                    </StyledMainWrapper>
                </StyledContainer>
            </StyledAppContainer>
        </FormikProvider>
    )
}

export default CreateNewApp

const StyledRoot = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
`
const StyledHeader = styled.div`
    width: 100%;
    height: 100px;

    display: flex;
    align-items: center;
    justify-content: center;
    /* gap: 20px; */
`

const StyledBody = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    overflow: auto;
`
const StyledButtonsWrapper = styled.div`
    width: 100%;

    display: flex;
    justify-content: center;
    gap: 10px;

    margin-top: auto;

    margin-top: 50px;
    padding: 10px 0;
`
const StyledButton = styled.button<{ picked: boolean }>`
    opacity: 0.6;

    width: 200px;

    padding: 20px;

    opacity: ${props => (props.picked ? 1 : 0.6)};
`
const StyledDividerLine = styled.div`
    width: 50px;
    height: 1px;
    background-color: #dbdbdb;
`
