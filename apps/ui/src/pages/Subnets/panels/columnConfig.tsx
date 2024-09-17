import moment from 'moment'
import styled from 'styled-components'
import IconButton from 'share-ui/components/IconButton/IconButton'
import {
    StyledDeleteIcon,
    StyledEditIcon,
} from 'pages/TeamOfAgents/TeamOfAgentsCard/TeamOfAgentsCard'
import { SubnetApiService } from 'types/subnetApiService'

export const extractDomain = (url: string) => {
    try {
        const parsedUrl = new URL(url)
        return parsedUrl.hostname
    } catch (e) {
        return 'Invalid URL'
    }
}

// eslint-disable-next-line react/prop-types
const DateRenderer: React.FC<{ value: Date }> = ({ value }) => {
    const formattedDate = moment(value).fromNow()
    return <span>{formattedDate}</span>
}

interface RenderColumnsProps {
    handleEditSubnetApiService: (subnet_api_service_id: string) => void
    handleDeleteSubnetApiService: (subnet_api_service_id: string) => void
}

export const renderColumns = ({
    handleEditSubnetApiService,
    handleDeleteSubnetApiService,
}: RenderColumnsProps) => [
    {
        Header: 'Icon',
        accessor: 'icon',
        minWidth: 45,
        width: 45,
        Cell: ({ value }: { value: string }) => {
            return (
                <StyledIconWrapper>
                    <StyledIcon src={value} />
                </StyledIconWrapper>
            )
        },
    },
    {
        Header: 'Name',
        accessor: 'name',
        minWidth: 150,
        width: 250,
    },
    {
        Header: 'Description',
        accessor: 'description',
        minWidth: 150,
        width: 250,
    },
    {
        Header: 'Price Per Request $',
        accessor: 'price_per_request',
        minWidth: 100,
        width: 150,
    },
    {
        Header: 'Dock Link',
        accessor: 'doc_link',
        minWidth: 100,
        width: 150,
        Cell: ({ value }: { value: string }) => {
            return (
                <StyledLink href={value} target='_blank' rel='noreferrer'>
                    {extractDomain(value)}
                </StyledLink>
            )
        },
    },
    {
        Header: 'Visibility',
        accessor: 'visibility',
        minWidth: 50,
        width: 80,
    },
    {
        Header: 'Created On',
        accessor: 'created_on',
        minWidth: 100,
        width: 120,
        Cell: DateRenderer,
    },
    {
        Header: 'Actions',
        accessor: 'actions',
        minWidth: 100,
        width: 130,

        Cell: ({
            row: { original: data },
        }: {
            row: { original: Pick<SubnetApiService, 'id'> }
        }) => (
            <StyledActionWrapper>
                <IconButton
                    onClick={() => handleEditSubnetApiService(data.id)}
                    icon={() => <StyledEditIcon />}
                    size={IconButton.sizes?.SMALL}
                    kind={IconButton.kinds?.TERTIARY}
                    ariaLabel='Edit'
                />
                <IconButton
                    onClick={() => handleDeleteSubnetApiService(data.id)}
                    icon={() => <StyledDeleteIcon />}
                    size={IconButton.sizes?.SMALL}
                    kind={IconButton.kinds?.TERTIARY}
                    ariaLabel='Delete'
                />
            </StyledActionWrapper>
        ),
    },
]

const StyledActionWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -6px;
`
export const StyledLink = styled.a`
    color: ${({ theme }) => theme.body.linkTextColor};
`
export const StyledIcon = styled.img`
    width: 24px;
    height: 24px;
    border-radius: 8px;

    object-fit: cover;
`

export const StyledIconWrapper = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
`
