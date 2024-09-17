import TypographyPrimary from 'components/Typography/Primary'
import TypographySecondary from 'components/Typography/Secondary'
import CardWrapper from 'components/wrappers/CardWrapper'
// import AiMessageMarkdown from 'modals/AIChatModal/components/ChatMessageList/components/AiMessageMarkdown'

import styled from 'styled-components'
import HeaderItem, { StyledInfoValue } from './HeaderItem'
import CopyButton from 'components/CopyButton'

export type LogDetailsProps = {
    data: {
        request_headers: any
        request_body: any
        response_headers: any
        response_body: any
        response_duration: number
        error_message: string
        error_code?: number
        request_id: string
        request_url: string
    }
}

const LogDetails = ({
    data: {
        // request_body,
        response_body,
        request_headers,
        // response_headers,
        request_id,
        response_duration,
        error_message,
        error_code,
        // request_url,
    },
}: LogDetailsProps) => {
    return (
        <StyledRoot>
            <StyledRequestContainer>
                <CardWrapper>
                    <StyledRequestCard>
                        <StyledRequestCardHeader>
                            <StyledInfoValue>
                                <TypographyPrimary size='large' value='Request' bold />
                                {/* <TypographySecondary size='medium' value='Get consumer' /> */}
                            </StyledInfoValue>
                        </StyledRequestCardHeader>

                        <StyledRequestCardBody>
                            {request_headers && <HeaderItem data={request_headers} />}
                        </StyledRequestCardBody>
                    </StyledRequestCard>
                </CardWrapper>

                <CardWrapper>
                    <StyledRequestCard>
                        <StyledRequestCardHeader>
                            <StyledInfoValue>
                                <TypographyPrimary size='large' value='Response' bold />
                                <TypographySecondary size='medium' value='Get consumer' />
                            </StyledInfoValue>
                        </StyledRequestCardHeader>

                        <StyledRequestCardBody>
                            {/* {response_headers && (
                                <>
                                    <StyledRequestCardBody>
                                        <HeaderItem data={response_headers} />
                                    </StyledRequestCardBody>

                                    <StyledDivider />
                                </>
                            )} */}

                            <TypographyPrimary size='medium' value='Body' bold />

                            {/* <AiMessageMarkdown>
                                {response_body?.response || 'N/A'}
                            </AiMessageMarkdown> */}
                        </StyledRequestCardBody>
                    </StyledRequestCard>
                </CardWrapper>
            </StyledRequestContainer>
            <StyledInfoContainer>
                <StyledInfoValue>
                    <TypographySecondary size='small' value='Duration' semiBold />
                    <TypographyPrimary size='small' value={response_duration || 'N/A'} />
                </StyledInfoValue>

                <StyledInfoValue>
                    <StyledRow>
                        <TypographySecondary size='small' value='Request ID' semiBold />
                        <CopyButton value={request_id || 'N/A'} />
                    </StyledRow>
                    <TypographyPrimary size='small' value={request_id || 'N/A'} />
                </StyledInfoValue>
                <StyledInfoValue>
                    <StyledRow>
                        <TypographySecondary size='small' value='Error message' semiBold />
                        <CopyButton value={error_message || 'N/A'} />
                    </StyledRow>
                    <TypographyPrimary size='small' value={error_message || 'N/A'} />
                </StyledInfoValue>
                <StyledInfoValue>
                    <TypographySecondary size='small' value='Error code' semiBold />
                    <TypographyPrimary size='small' value={error_code || 'N/A'} />
                </StyledInfoValue>
            </StyledInfoContainer>
        </StyledRoot>
    )
}

export default LogDetails

const StyledRoot = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
`

const StyledInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 45%;

    padding: 20px 30px;

    gap: 30px;
`
const StyledRequestContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 55%;

    padding: 20px 30px;

    gap: 30px;
`

const StyledRequestCard = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`
const StyledRequestCardHeader = styled.div`
    border-bottom: 1px solid #e2e2e2;
    padding-bottom: 20px;
`
const StyledRequestCardBody = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`
const StyledDivider = styled.div`
    width: 100%;
    height: 1px;
    background-color: #e2e2e2;
`
const StyledRow = styled.div`
    display: flex;
    align-items: center;
    gap: 2px;
`
