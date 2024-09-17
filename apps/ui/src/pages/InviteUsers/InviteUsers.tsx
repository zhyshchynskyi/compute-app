import { ButtonPrimary } from 'components/Button/Button'
import Button from 'share-ui/components/Button/Button'

import Table from 'components/Table'
import {
    StyledHeaderGroup,
    StyledSectionDescription,
    StyledSectionTitle,
} from 'pages/Home/homeStyle.css'
import useInviteUsers from './useInviteUsers'

import {
    StyledChatWrapper,
    StyledContainer,
    StyledHorizontalDivider,
    StyledMainWrapper,
} from 'routes/ChatRouteLayout'
import { StyledAppContainer } from 'components/Layout/LayoutStyle'
import { StyledTableWrapper } from 'pages/Billing/panels/Transactions'
import InviteUserModal from './InviteUserModal'
import { useModal } from 'hooks'

const InviteUsers = () => {
    const { openModal } = useModal()
    const { data, fetch_data_loading, columns } = useInviteUsers()

    return (
        <StyledAppContainer>
            <StyledContainer>
                <StyledMainWrapper>
                    <StyledChatWrapper>
                        <StyledHeaderGroup className='header_group'>
                            <div>
                                <StyledSectionTitle>Teams</StyledSectionTitle>
                                <StyledSectionDescription>
                                    Invite new members to join your team and collaborate.
                                </StyledSectionDescription>
                            </div>

                            <ButtonPrimary
                                onClick={() => openModal({ name: 'invite-user-modal' })}
                                size={Button.sizes?.MEDIUM}
                            >
                                Invite User
                            </ButtonPrimary>
                        </StyledHeaderGroup>

                        <StyledHorizontalDivider />

                        <StyledTableWrapper>
                            <Table columns={columns} data={data} isLoading={fetch_data_loading} />
                        </StyledTableWrapper>
                    </StyledChatWrapper>
                </StyledMainWrapper>
            </StyledContainer>

            <InviteUserModal />
        </StyledAppContainer>
    )
}

export default InviteUsers
