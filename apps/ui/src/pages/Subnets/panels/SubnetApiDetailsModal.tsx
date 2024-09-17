import styled from 'styled-components'
import withRenderModal from 'hocs/withRenderModal'

import MainModal from 'modals/MainModal'

import { useModal } from 'hooks'
import { SubnetApiService } from 'types/subnetApiService'
import TypographyPrimary from 'components/Typography/Primary'

import { StyledPriceTag } from 'pages/Pods/components/PodDetails/panels/General'
import TypographySecondary from 'components/Typography/Secondary'

import CardWrapper from 'components/wrappers/CardWrapper'

import TextReader from 'components/MarkdownTextReader/TextReader'

type SubnetApiDetailsModalProps = {
    data: {
        apiData: SubnetApiService
    }
}

const SubnetApiDetailsModal = ({ data }: SubnetApiDetailsModalProps) => {
    const { apiData } = data
    const { icon, name, description, full_description, price_per_request, doc_link } = apiData

    const { closeModal } = useModal()

    const handleCloseModal = () => {
        closeModal('subnet-api-details-modal')
    }

    return (
        <MainModal onClose={handleCloseModal} title='' customButtons={<></>}>
            <StyledRoot>
                <StyledHeader>
                    <StyledImg src={icon} alt='' />

                    <StyledTitle>
                        <TypographyPrimary value={name} size='large' bold />
                        <TypographySecondary value={description} size='small' />
                    </StyledTitle>
                </StyledHeader>

                {full_description?.length > 0 && (
                    <StyledBody>
                        <CardWrapper>
                            <TextReader text={full_description} />
                        </CardWrapper>
                    </StyledBody>
                )}
                <StyledFooter>
                    <StyledLink href={doc_link} target='_blank'>
                        View Documentation
                    </StyledLink>

                    <StyledPriceWrapper>
                        <StyledPriceTag>
                            <TypographySecondary value='Per request: ' size='medium' semiBold />
                            <TypographyPrimary value={`$${price_per_request}`} bold />
                        </StyledPriceTag>
                    </StyledPriceWrapper>
                </StyledFooter>
            </StyledRoot>
        </MainModal>
    )
}

export default withRenderModal('subnet-api-details-modal')(SubnetApiDetailsModal)

const StyledRoot = styled.div`
    padding: 20px;
    padding-top: 0;

    width: 90vw;
    max-width: 900px;
    min-width: 400px;

    height: auto;

    display: flex;
    flex-direction: column;
    gap: 10px;
`
const StyledHeader = styled.header`
    display: flex;
    /* align-items: center; */

    gap: 10px;

    position: sticky;
    top: 0;
`
const StyledImg = styled.img`
    width: 40px;
    height: 40px;

    object-fit: contain;

    border-radius: 8px;
`
const StyledBody = styled.div`
    display: flex;
    flex-direction: column;

    gap: 16px;

    padding: 20px 0;
`
const StyledFooter = styled.footer`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;

    position: sticky;
    bottom: 0;
`
const StyledTitle = styled.div`
    display: flex;
    flex-direction: column;
`
const StyledPriceWrapper = styled.div``

const StyledLink = styled.a`
    color: ${({ theme }) => theme.body.linkTextColor};
`
