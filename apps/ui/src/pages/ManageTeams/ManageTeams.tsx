import Table from 'components/Table'
import {
    StyledHeaderGroup,
    StyledSectionDescription,
    StyledSectionTitle,
} from 'pages/Home/homeStyle.css'

import {
    StyledChatWrapper,
    StyledContainer,
    StyledHorizontalDivider,
    StyledMainWrapper,
} from 'routes/ChatRouteLayout'
import { StyledAppContainer } from 'components/Layout/LayoutStyle'
import { StyledTableWrapper } from 'pages/Billing/panels/Transactions'
import { columns } from './columnConfig'
import { useGetSharedUserAccess } from 'services/inviteUser/useInviteUserService'

interface UserAccessItem {
    assigned_account_name: string
    assigned_account_type: string
    created_by_email: string
    created_on: string
    id: string
}

const ManageTeams = () => {
    const { data, loading: fetch_data_loading } = useGetSharedUserAccess()

    const tableData = data?.map((item: UserAccessItem) => {
        return {
            team: item.assigned_account_name,
            account_type: item.assigned_account_type,
            created_by: item.created_by_email,
            created_on: item.created_on,
            actions: item.id,
        }
    })

    return (
        <StyledAppContainer>
            <StyledContainer>
                <StyledMainWrapper>
                    <StyledChatWrapper>
                        <StyledHeaderGroup className='header_group'>
                            <div>
                                <StyledSectionTitle>Manage Teams</StyledSectionTitle>
                                <StyledSectionDescription>
                                    View and manage the teams you are part of.
                                </StyledSectionDescription>
                            </div>
                        </StyledHeaderGroup>

                        <StyledHorizontalDivider />

                        <StyledTableWrapper>
                            <Table
                                columns={columns()}
                                data={tableData}
                                isLoading={fetch_data_loading}
                            />
                        </StyledTableWrapper>
                    </StyledChatWrapper>
                </StyledMainWrapper>
            </StyledContainer>
        </StyledAppContainer>
    )
}

export default ManageTeams
