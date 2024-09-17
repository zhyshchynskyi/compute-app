import { SubnetApiService } from 'types/subnetApiService'
import ApiCard from '../ApiCard'
import { StyledCardsWrapper } from '../SubnetsStyles'
import useSubnetApiService from './useSubnetApiService'
import GPTLogo from 'assets/models/openai.jpg'
import { ButtonTertiary } from 'components/Button/Button'
import styled from 'styled-components'
import { useModal } from 'hooks'
import ApiCardLoader from 'components/ContentLoaders/ApiCardLoader'

const GeneralPanel = () => {
    const {
        subnet_api_services,
        // handleDeleteSubnetApiService,
        fetch_subnet_api_services_loading,
        handleEditSubnetApiService,
        account,
        // handleToggle,
        serviceEnabled,
    } = useSubnetApiService()

    const { openModal } = useModal()

    return (
        <StyledCardsWrapper>
            {fetch_subnet_api_services_loading ? (
                <>
                    <ApiCardLoader />
                    <ApiCardLoader />
                    <ApiCardLoader />
                </>
            ) : (
                subnet_api_services.map((api: SubnetApiService, index: number) => {
                    return (
                        <ApiCard
                            key={index}
                            item={api}
                            avatar={api.icon.length < 20 ? GPTLogo : api.icon}
                            account={account}
                            handleEdit={handleEditSubnetApiService}
                            // handleToggle={handleToggle}
                            isChecked={!!serviceEnabled[api.id]}
                            customButtons={
                                <ButtonTertiary
                                    onClick={() => window.open(api.doc_link, '_blank')}
                                    size={'small'}
                                >
                                    <StyledText>View Docs</StyledText>
                                </ButtonTertiary>
                            }
                            onViewClick={() =>
                                openModal({
                                    name: 'subnet-api-details-modal',
                                    data: { apiData: api },
                                })
                            }
                        />
                    )
                })
            )}
        </StyledCardsWrapper>
    )
}

export default GeneralPanel

const StyledText = styled.div`
    font-weight: 500;
    text-decoration: underline;
`
