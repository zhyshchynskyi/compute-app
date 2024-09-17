// import ListHeader from 'routes/components/ListHeader'
import TabList from 'share-ui/components/Tabs/TabList/TabList'
import Tab from 'share-ui/components/Tabs/Tab/Tab'
import TabsContext from 'share-ui/components/Tabs/TabsContext/TabsContext'
import TabPanels from 'share-ui/components/Tabs/TabPanels/TabPanels'
import TabPanel from 'share-ui/components/Tabs/TabPanel/TabPanel'
import { useEffect, useState } from 'react'
// import { SUBNETS } from '../constants'

import GeneralPanel from './GeneralPanel'
import LogsPanel from './LogsPanel/LogsPanel'
import { useAppModeContext } from 'context/AppModeContext'
import { accountTypeEnum } from 'types/account'
import ValidatorSubnet from './ValidatorSubnet'
import ApiPanel from './ApiPanel'
import { StyledSectionWrapper } from 'pages/Home/homeStyle.css'
import { StyledFormHeader, StyledFormRoot } from 'styles/formStyles.css'
import { StyledWrapper } from 'pages/Pods/components/PodDetails/PodDetails'
import { ButtonTertiary } from 'components/Button/Button'
import styled from 'styled-components'

import { t } from 'i18next'
import { CloseSmall, Filter } from 'share-ui/components/Icon/Icons'
import { useLocation, useNavigate } from 'react-router-dom'

enum tabQueryEnum {
    GENERAL = 'general',
    API = 'api',
    LOGS = 'logs',
}

const SubnetApiService = () => {
    const { selected_account } = useAppModeContext()

    const [showFilters, setShowFilters] = useState(false)
    const [activeTab, setActiveTab] = useState(0)

    const location = useLocation()
    const navigate = useNavigate()
    const queryParams = new URLSearchParams(location.search)
    const query = queryParams.get('tab')

    const handleTabClick = ({ tabId, tabQuery }: { tabId: number; tabQuery: string }) => {
        navigate(`${location?.pathname}?tab=${tabQuery}`)
        setActiveTab(tabId)
    }

    useEffect(() => {
        if (query === tabQueryEnum.GENERAL) {
            setActiveTab(0)
        }
        if (query === tabQueryEnum.API) {
            setActiveTab(1)
        }
        if (query === tabQueryEnum.LOGS) {
            setActiveTab(2)
        }
    }, [query])

    const tabList = [
        { query: tabQueryEnum.GENERAL, label: 'General', id: 0 },
        { query: tabQueryEnum.API, label: 'Api keys', id: 1 },
        { query: tabQueryEnum.LOGS, label: 'Logs', id: 2 },
    ]

    if (!selected_account || !selected_account?.account_type) {
        return null
    }

    return (
        <>
            {selected_account?.account_type !== accountTypeEnum.Validation ? (
                <StyledSectionWrapper>
                    <StyledFormRoot>
                        <StyledFormHeader>
                            <TabList activeTabId={activeTab} noBorder>
                                {tabList.map(tab => {
                                    return (
                                        <Tab
                                            key={tab.id}
                                            onClick={() =>
                                                handleTabClick({
                                                    tabId: tab.id,
                                                    tabQuery: tab.query,
                                                })
                                            }
                                        >
                                            {tab.label}
                                        </Tab>
                                    )
                                })}
                            </TabList>

                            {activeTab === 2 && (
                                <div>
                                    <ButtonTertiary onClick={() => setShowFilters(!showFilters)}>
                                        {!showFilters ? (
                                            <StyledFilterIcon size={34} />
                                        ) : (
                                            <StyledClose size={34} />
                                        )}
                                        {t('filters')}
                                    </ButtonTertiary>
                                </div>
                            )}
                        </StyledFormHeader>

                        <StyledWrapper>
                            <TabsContext activeTabId={activeTab}>
                                <TabPanels noAnimation>
                                    <TabPanel>
                                        <GeneralPanel />
                                    </TabPanel>

                                    <TabPanel>
                                        <ApiPanel />
                                    </TabPanel>

                                    <TabPanel>
                                        <LogsPanel showFilters={showFilters} />
                                    </TabPanel>
                                </TabPanels>
                            </TabsContext>
                        </StyledWrapper>
                    </StyledFormRoot>
                </StyledSectionWrapper>
            ) : (
                <ValidatorSubnet />
            )}
        </>
    )
}

export default SubnetApiService

const StyledFilterIcon = styled(Filter)`
    path {
        fill: ${({ theme }) => theme.body.iconColor};
    }
`
export const StyledClose = styled(CloseSmall)`
    path {
        fill: ${({ theme }) => theme.body.iconColor};
    }
`
