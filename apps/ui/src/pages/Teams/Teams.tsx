import { ButtonPrimary } from 'components/Button/Button'
import Button from 'share-ui/components/Button/Button'

import {
    StyledChatWrapper,
    StyledContainer,
    StyledHorizontalDivider,
    StyledMainWrapper,
} from 'routes/ChatRouteLayout'
import { StyledAppContainer } from 'components/Layout/LayoutStyle'

import TabList from 'share-ui/components/Tabs/TabList/TabList'
import Tab from 'share-ui/components/Tabs/Tab/Tab'
import TabsContext from 'share-ui/components/Tabs/TabsContext/TabsContext'
import TabPanels from 'share-ui/components/Tabs/TabPanels/TabPanels'
import TabPanel from 'share-ui/components/Tabs/TabPanel/TabPanel'
import { StyledTabListWrapper } from 'pages/Secrets/Secrets'
import { useState } from 'react'
import { useModal } from 'hooks'
import { InviteUsers } from 'pages/InviteUsers'
import ManageTeams from 'pages/ManageTeams'

const Teams = () => {
    const [activeTab, setActiveTab] = useState(0)
    const handleTabClick = (tabId: number) => {
        setActiveTab(tabId)
    }

    const { openModal } = useModal()

    return (
        <StyledAppContainer>
            <StyledContainer>
                <StyledMainWrapper>
                    <StyledChatWrapper>
                        <StyledTabListWrapper>
                            <TabList activeTabId={activeTab} noBorder>
                                <Tab onClick={() => handleTabClick(0)}>Team Members</Tab>
                                <Tab onClick={() => handleTabClick(1)}>Manage Teams</Tab>
                            </TabList>

                            <div>
                                {activeTab === 0 && (
                                    <ButtonPrimary
                                        onClick={() => openModal({ name: 'invite-user-modal' })}
                                        size={Button.sizes?.MEDIUM}
                                    >
                                        Invite User
                                    </ButtonPrimary>
                                )}
                            </div>
                        </StyledTabListWrapper>

                        <StyledHorizontalDivider />

                        <TabsContext activeTabId={activeTab}>
                            <TabPanels noAnimation>
                                <TabPanel>
                                    <InviteUsers />
                                </TabPanel>

                                <TabPanel>
                                    <ManageTeams />
                                </TabPanel>
                            </TabPanels>
                        </TabsContext>
                    </StyledChatWrapper>
                </StyledMainWrapper>
            </StyledContainer>
        </StyledAppContainer>
    )
}

export default Teams
