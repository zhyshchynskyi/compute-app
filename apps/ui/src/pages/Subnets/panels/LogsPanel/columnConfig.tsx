import styled from 'styled-components'
import TypographySecondary from 'components/Typography/Secondary'
import IconButton from 'share-ui/components/IconButton/IconButton'
import { ChevronDown } from 'share-ui/components/Icon/Icons'
import Typography from 'share-ui/components/typography/Typography'
import { TypographySizes } from 'share-ui/components/typography/TypographyConstants'
import { useGetColorByStatus } from 'utils/useGetColorByStatus'

export const columns = () => {
    return [
        {
            Header: 'Subnet',
            accessor: 'subnet',
            minWidth: 200,
            width: 250,
            Cell: ({ value }: { value: string }) => {
                return (
                    <StyledNameWrapper>
                        <TypographySecondary size='small' value={value} />
                        <IconButton
                            // onClick={() => handleDeleteApiKey(data.id)}
                            icon={() => {
                                return <StyledChevronDown size={12} />
                            }}
                            size={IconButton.sizes?.SMALL}
                            kind={IconButton.kinds?.TERTIARY}
                            ariaLabel='Expand'
                        />
                    </StyledNameWrapper>
                )
            },
        },
        {
            Header: 'Method',
            accessor: 'request_method',
            minWidth: 50,
            width: 70,
        },
        {
            Header: 'Url',
            accessor: 'request_url',
            minWidth: 200,
            width: 300,
        },
        {
            Header: 'Time stamp',
            accessor: 'created_on',
            minWidth: 150,
            width: 200,
        },
        {
            Header: 'Status',
            accessor: 'response_status',
            minWidth: 50,
            width: 70,

            Cell: ({ value }: { value: string }) => {
                const { getColorByStatus } = useGetColorByStatus()

                return (
                    <StyledCellWrapper>
                        <Typography
                            size={TypographySizes?.sm}
                            value={value}
                            customColor={getColorByStatus(value)}
                        />
                    </StyledCellWrapper>
                )
            },
        },
        {
            Header: 'Api Key Name',
            accessor: 'api_key_name',
            minWidth: 120,
            width: 150,
        },
    ]
}

const StyledNameWrapper = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    margin-top: -6px;
`
const StyledCellWrapper = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
`
const StyledChevronDown = styled(ChevronDown)`
    rotate: 270deg;

    path {
        fill: ${({ theme }) => theme.body.iconColor};
    }
`
