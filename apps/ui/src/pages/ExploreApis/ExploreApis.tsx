import { StyledSectionWrapper } from 'pages/Home/homeStyle.css'
import { StyledFormHeader, StyledFormRoot } from 'styles/formStyles.css'
import { StyledWrapper } from 'pages/Pods/components/PodDetails/PodDetails'
import TextField from 'share-ui/components/TextField/TextField'
import styled from 'styled-components'
import ApiCard from 'pages/Subnets/ApiCard'
import { StyledCardsWrapper } from 'pages/Subnets/SubnetsStyles'
import ApiCardLoader from 'components/ContentLoaders/ApiCardLoader'
import { ButtonTertiary } from 'components/Button/Button'
import { SubnetApiService } from 'types/subnetApiService'
import useExploreApis from './useExploreApis'

const ExploreApis = () => {
    const {
        searchTerm,
        subnet_apis_loading,
        filtered_data,
        subnet_apis,
        handleSearchChange,
        openModal,
        navigate,
    } = useExploreApis()

    return (
        <>
            <StyledSectionWrapper>
                <StyledFormRoot>
                    <StyledFormHeader>
                        <StyledTextFieldWrapper>
                            <TextField
                                placeholder='Search APIs'
                                type={TextField.types?.SEARCH}
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                        </StyledTextFieldWrapper>
                    </StyledFormHeader>

                    <StyledWrapper>
                        <StyledCardsWrapper>
                            {subnet_apis_loading && subnet_apis?.length === 0 ? (
                                <>
                                    <ApiCardLoader />
                                    <ApiCardLoader />
                                    <ApiCardLoader />
                                    <ApiCardLoader />
                                </>
                            ) : (
                                <>
                                    {filtered_data?.map((item: SubnetApiService) => {
                                        return (
                                            <ApiCard
                                                key={item.id}
                                                item={item}
                                                onViewClick={() =>
                                                    openModal({
                                                        name: 'subnet-api-details-modal',
                                                        data: { apiData: item },
                                                    })
                                                }
                                                customButtons={
                                                    <>
                                                        <ButtonTertiary
                                                            onClick={() =>
                                                                navigate(
                                                                    `/subnets/${item.subnet_id}`,
                                                                )
                                                            }
                                                            size='small'
                                                        >
                                                            View on subnet
                                                        </ButtonTertiary>
                                                    </>
                                                }
                                            />
                                        )
                                    })}
                                </>
                            )}
                        </StyledCardsWrapper>
                    </StyledWrapper>
                </StyledFormRoot>
            </StyledSectionWrapper>
        </>
    )
}

export default ExploreApis

export const TEMP_CATEGORIES = [{ value: 'All' }]

const StyledTextFieldWrapper = styled.div`
    width: 100%;
    max-width: 500px;

    display: flex;
`
