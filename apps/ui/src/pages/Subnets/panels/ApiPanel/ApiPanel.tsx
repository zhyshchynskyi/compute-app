import { StyledInnerFormWrapper, StyledTextFieldWrapper } from '../../SubnetsStyles'
import TypographySecondary from 'components/Typography/Secondary'
import SDKs from '../../SDKs'

import { ButtonPrimary } from 'components/Button/Button'

import Table from 'components/Table'

import {
    StyledHeaderGroup,
    StyledSectionDescription,
    StyledSectionTitle,
} from 'pages/Home/homeStyle.css'
import CardWrapper from 'components/wrappers/CardWrapper'
import { StyledPanelWrapper } from 'styles/panelStyles.css'
import styled from 'styled-components'
import AttachApiModal from './AttachApiModal'
import columnConfig from './columnConfig'
import { useModal } from 'hooks'
import { useApiKeyMetadataSubnetUsageService } from 'apis'
import CreateSubnetApiKeyModal from './CreateSubnetApiKeyModal'
import EditSubnetApiKeyModal from './EditSubnetApiKeyModal'
import useApiPanel from './useApiPanel'

const ApiPanel = () => {
    const { apiKeys, api_keys_loading } = useApiPanel()
    const { openModal } = useModal()
    const { data: subnetUsage } = useApiKeyMetadataSubnetUsageService()

    return (
        <StyledPanelWrapper>
            <StyledSection>
                <StyledHeaderGroup>
                    <div>
                        <StyledSectionTitle>Application keys</StyledSectionTitle>

                        <StyledSectionDescription>
                            Your App ID and API key are used to identify your application when
                            making requests with the Apideck Unify endpoints, as described in our
                            documentation.
                        </StyledSectionDescription>
                    </div>
                    <div>
                        <ButtonPrimary
                            onClick={() => openModal({ name: 'create-subnet-api-key-modal' })}
                        >
                            Add key
                        </ButtonPrimary>
                    </div>
                </StyledHeaderGroup>

                <StyledInnerFormWrapper>
                    <Table
                        columns={columnConfig()}
                        data={apiKeys || []}
                        isLoading={api_keys_loading}
                    />
                </StyledInnerFormWrapper>
            </StyledSection>

            <StyledSection>
                <StyledHeaderGroup>
                    <div>
                        <StyledSectionTitle>Subnet Usage</StyledSectionTitle>

                        <StyledSectionDescription>
                            The total usage of this subnet.
                        </StyledSectionDescription>
                    </div>
                </StyledHeaderGroup>

                <CardWrapper>
                    <StyledInnerFormWrapper style={{ maxWidth: '700px' }}>
                        <StyledTextFieldWrapper>
                            <TypographySecondary
                                value={`Queries per month: ${subnetUsage}`}
                                size={'small'}
                            />
                        </StyledTextFieldWrapper>
                    </StyledInnerFormWrapper>
                </CardWrapper>
            </StyledSection>

            {/* <StyledSection>
        <StyledHeaderGroup>
          <div>
            <StyledSectionTitle>Account Usage</StyledSectionTitle>

            <StyledSectionDescription>
              Our free developer plan includes a total of 2,500 API calls & Webhook events for
              Unify, Vault, and Proxy.
            </StyledSectionDescription>
          </div>
        </StyledHeaderGroup>

        <CardWrapper>
          <StyledInnerFormWrapper style={{ maxWidth: '700px' }}>
            <StyledTextFieldWrapper>
              <TypographyPrimary value={`Free`} size={'medium'} />
              <TypographySecondary value={`Usage: 0 / 2,500`} size={'xs-small'} />

              <ProgressBar value={0} />
            </StyledTextFieldWrapper>
          </StyledInnerFormWrapper>
        </CardWrapper>
      </StyledSection> */}

            <StyledSection>
                <StyledHeaderGroup>
                    <StyledSectionTitle>SDK</StyledSectionTitle>
                </StyledHeaderGroup>
                <SDKs />
            </StyledSection>

            <AttachApiModal />
            <CreateSubnetApiKeyModal />
            <EditSubnetApiKeyModal />
        </StyledPanelWrapper>
    )
}

export default ApiPanel

const StyledSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`
