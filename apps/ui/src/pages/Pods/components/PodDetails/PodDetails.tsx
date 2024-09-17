import { useState } from 'react'

import TabList from 'share-ui/components/Tabs/TabList/TabList'
import Tab from 'share-ui/components/Tabs/Tab/Tab'
import TabsContext from 'share-ui/components/Tabs/TabsContext/TabsContext'
import TabPanels from 'share-ui/components/Tabs/TabPanels/TabPanels'
import TabPanel from 'share-ui/components/Tabs/TabPanel/TabPanel'
import General from './panels/General'
import Settings from './panels/Settings'
import Logs from './panels/Logs'

import { usePodDetails } from './usePodDetails'

import { ButtonPrimary } from 'components/Button/Button'

import { StyledSectionWrapper } from 'pages/Home/homeStyle.css'
import { StyledFormHeader, StyledFormRoot } from 'styles/formStyles.css'
import styled from 'styled-components'
import FormContentLoader from 'components/ContentLoaders/FormContentLoader'
import { useSettings } from './panels/useSettings'

const PodDetails = () => {
  const [activeTab, setActiveTab] = useState(0)
  const handleTabClick = (tabId: number) => {
    setActiveTab(tabId)
  }

  const { podById, pod_is_loading, handleDeletePod } = usePodDetails()

  const { formik, update_pod_loading } = useSettings()

  return (
    <StyledSectionWrapper>
      <StyledFormRoot>
        <StyledFormHeader>
          <TabList activeTabId={activeTab} noBorder>
            <Tab onClick={() => handleTabClick(0)}>General</Tab>
            <Tab onClick={() => handleTabClick(1)}>Settings</Tab>
            <Tab onClick={() => handleTabClick(2)}>Logs</Tab>
          </TabList>

          {activeTab === 1 && (
            <ButtonPrimary
              onClick={formik.handleSubmit}
              disabled={update_pod_loading}
              loading={update_pod_loading}
            >
              Save
            </ButtonPrimary>
          )}
        </StyledFormHeader>

        <StyledWrapper>
          {!podById && pod_is_loading ? (
            <FormContentLoader />
          ) : (
            <TabsContext activeTabId={activeTab}>
              <TabPanels noAnimation>
                <TabPanel>
                  <General podData={podById} deletePod={handleDeletePod} />
                </TabPanel>
                <TabPanel>
                  <Settings formik={formik} />
                </TabPanel>
                <TabPanel>
                  <Logs />
                </TabPanel>
              </TabPanels>
            </TabsContext>
          )}
        </StyledWrapper>
      </StyledFormRoot>
    </StyledSectionWrapper>
  )
}

export default PodDetails

export const StyledWrapper = styled.div`
  padding-left: 20px;

  width: 100%;
  height: calc(100% - 60px);
`
