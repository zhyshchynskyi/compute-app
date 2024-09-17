import { useState } from 'react'
import { ButtonPrimary } from 'components/Button/Button'
import Button from 'share-ui/components/Button/Button'

import { StyledSectionWrapper } from 'pages/Home/homeStyle.css'

import { useParams, useNavigate } from 'react-router-dom'

import { StyledFormHeader, StyledFormRoot } from 'styles/formStyles.css'

import TabList from 'share-ui/components/Tabs/TabList/TabList'
import Tab from 'share-ui/components/Tabs/Tab/Tab'
import TabsContext from 'share-ui/components/Tabs/TabsContext/TabsContext'
import TabPanels from 'share-ui/components/Tabs/TabPanels/TabPanels'
import TabPanel from 'share-ui/components/Tabs/TabPanel/TabPanel'
import { StyledWrapper } from 'pages/Pods/components/PodDetails/PodDetails'
import ApisPanel from './ValidatorPanels/ApisPanel'
import SettingsPanel from './ValidatorPanels/SettingsPanel'
import RateLimit from './ValidatorPanels/RateLimit'
import { useModal } from 'hooks'
import { useSettingsPanel } from './ValidatorPanels/SettingsPanel/useSettingsPanel'

const ValidatorSubnet = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { openModal } = useModal()
  const { formik, subnet_update_loading } = useSettingsPanel()
  const [activeTab, setActiveTab] = useState(0)

  const handleTabClick = (tabId: number) => {
    setActiveTab(tabId)
  }

  const handleCreateNewApi = () => {
    navigate(`/subnets/${id}/create`)
  }

  const handleOpenCreateRateLimitModal = () => {
    openModal({ name: 'create-rate-limit-modal' })
  }

  const buttonProperties = [
    { label: 'Add API Service', onClick: handleCreateNewApi, loading: false },
    { label: 'Save', onClick: formik.handleSubmit, loading: subnet_update_loading },
    { label: 'Add Limit Rate', onClick: handleOpenCreateRateLimitModal, loading: false },
    { noButton: true },
  ]

  return (
    <StyledSectionWrapper>
      <StyledFormRoot>
        <StyledFormHeader>
          <TabList activeTabId={activeTab} noBorder>
            <Tab onClick={() => handleTabClick(0)}>APIs</Tab>
            <Tab onClick={() => handleTabClick(1)}>Settings</Tab>
            <Tab onClick={() => handleTabClick(2)}>Rate limits</Tab>
          </TabList>

          {!buttonProperties[activeTab]?.noButton && (
            <div>
              <ButtonPrimary
                onClick={buttonProperties[activeTab].onClick}
                size={Button.sizes?.MEDIUM}
                disabled={buttonProperties[activeTab].loading}
                loading={buttonProperties[activeTab].loading}
              >
                {buttonProperties[activeTab].label}
              </ButtonPrimary>
            </div>
          )}
        </StyledFormHeader>

        <StyledWrapper>
          <TabsContext activeTabId={activeTab}>
            <TabPanels noAnimation>
              <TabPanel>
                <ApisPanel />
              </TabPanel>

              <TabPanel>
                <SettingsPanel formik={formik} />
              </TabPanel>

              <TabPanel>
                <RateLimit />
              </TabPanel>
            </TabPanels>
          </TabsContext>
        </StyledWrapper>
      </StyledFormRoot>
    </StyledSectionWrapper>
  )
}

export default ValidatorSubnet
