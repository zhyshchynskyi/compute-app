import { DateRenderer, StyledActionWrapper } from 'pages/ApiKeys/columnConfig'

import IconButton from 'share-ui/components/IconButton/IconButton'
import { StyledDeleteIcon, StyledEditIcon } from 'pages/Pods/PodsMainCard'
import { useModal } from 'hooks'

import { StyledIcon, StyledIconWrapper } from '../columnConfig'
import styled from 'styled-components'
import Tooltip from 'share-ui/components/Tooltip/Tooltip'
import useApiPanel from './useApiPanel'
import { useGetSubnetApiServices } from 'services/subnetApiService/useSubnetApiService'
import { useParams } from 'react-router-dom'

const columns = () => {
    return [
        {
            Header: 'Name',
            accessor: 'name',
            minWidth: 100,
            width: 150,
        },
        {
            Header: 'Token',
            accessor: 'token',
            minWidth: 300,
            width: 350,
        },
        {
            Header: 'Description',
            accessor: 'description',
            minWidth: 250,
            width: 300,
        },
        {
            Header: 'API services',
            accessor: 'services',
            minWidth: 200,
            width: 250,
            Cell: () => {
                const { id } = useParams()
                const { data: subnet_apis } = useGetSubnetApiServices(id)

                return (
                    <StyledApisWrapper>
                        {subnet_apis?.map((value: any) => {
                            return (
                                <div key={value.id}>
                                    <Tooltip content={value.name}>
                                        <StyledIconWrapper>
                                            <StyledIcon src={value.icon} />
                                        </StyledIconWrapper>
                                    </Tooltip>
                                </div>
                            )
                        })}
                    </StyledApisWrapper>
                )
            },
        },
        {
            Header: 'Created On',
            accessor: 'created_on',
            minWidth: 100,
            width: 140,
            Cell: DateRenderer,
        },
        {
            Header: 'Actions',
            accessor: 'actions',
            minWidth: 100,
            width: 130,

            Cell: (props: { row: { original: any } }) => {
                const { original: data } = props.row
                const { handleDeleteApiKey } = useApiPanel()
                const { openModal } = useModal()

                const handleEditClick = (apiKeyId: string) => {
                    openModal({ name: 'edit-subnet-api-key-modal', data: { id: apiKeyId } })
                }

                return (
                    <StyledActionWrapper>
                        <IconButton
                            onClick={() => handleDeleteApiKey(data.id)}
                            icon={() => <StyledDeleteIcon />}
                            size={IconButton.sizes?.SMALL}
                            kind={IconButton.kinds?.TERTIARY}
                            ariaLabel='Delete'
                        />

                        <IconButton
                            onClick={() => handleEditClick(data.id)}
                            icon={() => <StyledEditIcon />}
                            size={IconButton.sizes?.SMALL}
                            kind={IconButton.kinds?.TERTIARY}
                            ariaLabel='Edit'
                        />
                    </StyledActionWrapper>
                )
            },
        },
    ]
}

export default columns

const StyledApisWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1px;

    width: 100%;
    height: 100%;
`
