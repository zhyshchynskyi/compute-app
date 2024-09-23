import { StyledChatWrapper, StyledContainer, StyledHorizontalDivider, StyledMainWrapper } from 'routes/ChatRouteLayout'
import { StyledAppContainer } from 'components/Layout/LayoutStyle'

import { ButtonPrimary } from 'components/Button/Button'
import Button from 'share-ui/components/Button/Button'
import Table from 'components/Table'
import useSecret from './useSecret'

import TabList from 'share-ui/components/Tabs/TabList/TabList'
import Tab from 'share-ui/components/Tabs/Tab/Tab'
import TabsContext from 'share-ui/components/Tabs/TabsContext/TabsContext'
import TabPanels from 'share-ui/components/Tabs/TabPanels/TabPanels'
import TabPanel from 'share-ui/components/Tabs/TabPanel/TabPanel'
import { useState } from 'react'
import { StyledPanelWrapper } from 'styles/panelStyles.css'
import styled from 'styled-components'
import SHH from 'pages/SHH'
import { useModal } from 'hooks'
import CreateSecretModal from './CreateSecret/CreateSecretModal'

const Secrets = () => {
  const [activeTab, setActiveTab] = useState(0)
  const handleTabClick = (tabId: number) => {
    setActiveTab(tabId)
  }

  const { openModal } = useModal()

  const { columns, fetch_secret_loading, secrets } = useSecret()

  const handleOpenSHHModal = () => {
    openModal({ name: 'add-shh-key-modal' })
  }

  const handleOpenCreateSecretModal = () => {
    openModal({ name: 'create-secret' })
  }

  const buttonProperties = [
    { label: 'Create Secret', onClick: handleOpenCreateSecretModal },
    { label: 'Add SHH', onClick: handleOpenSHHModal },
  ]

  return (
    <>
      <StyledAppContainer>
        <StyledContainer>
          <StyledMainWrapper>
            <StyledChatWrapper>
              <StyledTabListWrapper>
                <TabList activeTabId={activeTab} noBorder>
                  <Tab onClick={() => handleTabClick(0)}>Secrets</Tab>
                  <Tab onClick={() => handleTabClick(1)}>SSH Keys</Tab>
                </TabList>
                <div>
                  <ButtonPrimary onClick={buttonProperties[activeTab].onClick} size={Button.sizes?.MEDIUM}>
                    {buttonProperties[activeTab].label}
                  </ButtonPrimary>
                </div>
              </StyledTabListWrapper>
              <StyledHorizontalDivider />

              <TabsContext activeTabId={activeTab}>
                <TabPanels noAnimation>
                  <TabPanel>
                    <StyledPanelWrapper>
                      <Table columns={columns} data={secrets} isLoading={fetch_secret_loading} />
                    </StyledPanelWrapper>
                  </TabPanel>

                  <TabPanel>
                    <SHH />
                  </TabPanel>
                </TabPanels>
              </TabsContext>
            </StyledChatWrapper>
          </StyledMainWrapper>
        </StyledContainer>
      </StyledAppContainer>
      <CreateSecretModal />
    </>
  )
}

export default Secrets

export const StyledTabListWrapper = styled.header`
  display: flex;
  /* align-items: center; */
  justify-content: space-between;
  padding-right: 20px;
`
