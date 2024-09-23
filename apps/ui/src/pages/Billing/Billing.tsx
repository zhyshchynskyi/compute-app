import { useState } from 'react'

import { StyledAppContainer } from 'components/Layout/LayoutStyle'
import { StyledChatWrapper, StyledContainer, StyledHorizontalDivider, StyledMainWrapper } from 'routes/ChatRouteLayout'

import TabList from 'share-ui/components/Tabs/TabList/TabList'
import Tab from 'share-ui/components/Tabs/Tab/Tab'
import TabsContext from 'share-ui/components/Tabs/TabsContext/TabsContext'
import TabPanels from 'share-ui/components/Tabs/TabPanels/TabPanels'
import TabPanel from 'share-ui/components/Tabs/TabPanel/TabPanel'
import General from './panels/General'
import Explorer from './panels/Explorer'
import Transactions from './panels/Transactions'

const Billing = () => {
  const [activeTab, setActiveTab] = useState(0)
  const handleTabClick = (tabId: number) => {
    setActiveTab(tabId)
  }

  return (
    <StyledAppContainer>
      <StyledContainer>
        <StyledMainWrapper>
          <StyledChatWrapper>
            <TabList activeTabId={activeTab} noBorder>
              <Tab onClick={() => handleTabClick(0)}>General</Tab>
              <Tab onClick={() => handleTabClick(1)}>Transactions</Tab>
              <Tab onClick={() => handleTabClick(2)}>Explorer</Tab>
            </TabList>

            <StyledHorizontalDivider />

            <TabsContext activeTabId={activeTab}>
              <TabPanels noAnimation>
                <TabPanel>
                  <General />
                </TabPanel>

                <TabPanel>
                  <Transactions />
                </TabPanel>

                <TabPanel>
                  <Explorer />
                </TabPanel>
              </TabPanels>
            </TabsContext>
          </StyledChatWrapper>
        </StyledMainWrapper>
      </StyledContainer>
    </StyledAppContainer>
  )
}

export default Billing
