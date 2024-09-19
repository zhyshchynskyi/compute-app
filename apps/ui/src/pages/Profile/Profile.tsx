import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'
import styled from 'styled-components'
import TabList from 'share-ui/components/Tabs/TabList/TabList'
import Tab from 'share-ui/components/Tabs/Tab/Tab'
import TabsContext from 'share-ui/components/Tabs/TabsContext/TabsContext'
import TabPanels from 'share-ui/components/Tabs/TabPanels/TabPanels'
import TabPanel from 'share-ui/components/Tabs/TabPanel/TabPanel'

import { useState } from 'react'
import ProfileSettings from './ProfileSettings'
import UpdatePassword from './UpdatePassword'

import Typography from 'share-ui/components/typography/Typography'
import { useProfile } from './useProfile'
import Loader from 'share-ui/components/Loader/Loader'
// eslint-disable-next-line import/no-named-as-default
import WelcomeLoader from 'components/Loader/WelcomeLoader'

const Profile = () => {
    const { delete_loader, handleDeleteAccount, formik } = useProfile()

    const [activeTab, setActiveTab] = useState(0)

    const handleTabClick = (tabId: number) => {
        setActiveTab(tabId)
    }

    if (delete_loader) return <WelcomeLoader />

    return (
        <StyledRoot>
            <ComponentsWrapper noPadding>
                <StyledWrapper>
                    <StyledBody>
                        <StyledLeftColumn>
                            <StyledMainInfo>
                                <StyledImg
                                    src={
                                        formik.values.avatar ||
                                        'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg'
                                    }
                                />
                                <TabList activeTabId={activeTab} noBorder isColumn>
                                    <Tab onClick={() => handleTabClick(0)}>Profile settings</Tab>
                                    <Tab onClick={() => handleTabClick(1)}>Update Password</Tab>
                                    <Tab onClick={handleDeleteAccount}>
                                        {delete_loader ? (
                                            <Loader size={30} />
                                        ) : (
                                            <Typography
                                                value='Delete account'
                                                customColor='#ef5533'
                                            />
                                        )}
                                    </Tab>
                                </TabList>
                            </StyledMainInfo>
                        </StyledLeftColumn>

                        <TabsContext activeTabId={activeTab}>
                            <TabPanels noAnimation>
                                <TabPanel>
                                    <ProfileSettings />
                                </TabPanel>
                                <TabPanel>
                                    <UpdatePassword />
                                </TabPanel>
                            </TabPanels>
                        </TabsContext>
                    </StyledBody>
                </StyledWrapper>
            </ComponentsWrapper>
        </StyledRoot>
    )
}

export default Profile

const StyledRoot = styled.div`
    width: 100%;
    height: 100%;

    max-width: 1110px;

    margin: 0 auto;

    padding: 20px 0;
`
const StyledWrapper = styled.div`
    width: 100%;
    height: 100%;

    overflow: auto;

    padding: 10px 20px;

    display: flex;
    flex-direction: column;
    gap: 30px;
`
const StyledBody = styled.div`
    display: flex;
    gap: 20px;
`

const StyledLeftColumn = styled.div`
    display: flex;
    /* justify-content: center; */

    width: 300px;
`
const StyledMainInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 100%;
`

const StyledImg = styled.img`
    width: 150px;
    height: 150px;

    /* border: 2px solid #000; */
    border-radius: 100px;

    object-fit: contain;
`
