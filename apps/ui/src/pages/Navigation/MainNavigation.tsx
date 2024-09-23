import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import About from 'share-ui/components/Icon/Icons/components/About'
// import Add from 'share-ui/components/Icon/Icons/components/Add'
import ValueOutline from 'share-ui/components/Icon/Icons/components/ValueOutline'
import Collection from 'share-ui/components/Icon/Icons/components/Collection'
import Team from 'share-ui/components/Icon/Icons/components/Team'
import Launch from 'share-ui/components/Icon/Icons/components/Launch'
import Mobile from 'share-ui/components/Icon/Icons/components/Mobile'
import { useLocation, useNavigate } from 'react-router-dom'
import includes from 'lodash/includes'
import { t } from 'i18next'
import AvatarDropDown, { ThemeProps } from 'components/AvatarDropDown'
import { useDomainConfig } from 'utils/useDomainConfig'
import Tooltip from 'share-ui/components/Tooltip/Tooltip'
import Chats from 'share-ui/components/Icon/Icons/components/Chats'
import Integrations from 'share-ui/components/Icon/Icons/components/integrations'
import FineTuning from 'share-ui/components/Icon/Icons/components/FineTuning'
// eslint-disable-next-line import/no-named-as-default
import Cloud from 'share-ui/components/Icon/Icons/components/Cloud'
import { AddOutline, BoardTemplate, DollarOutline, Locked, Person, Search, Teams } from 'share-ui/components/Icon/Icons'
import ModeSwitcher from 'components/ModeSwitcher'
import { useAppModeContext } from 'context/AppModeContext'
import Key from 'share-ui/components/Icon/Icons/components/Key'
import { accountTypeEnum } from 'types/account'
import Subnet from 'share-ui/components/Icon/Icons/components/Subnet'
import { AuthContext } from 'contexts'

interface NavigationPermissions {
  pod: boolean
  template: boolean
  secret: boolean
  billing: boolean
}

const getNavigationList = ({ permission, pathname }: { permission: NavigationPermissions; pathname: string }) => [
  {
    name: 'pods',
    icon: <StyledCloudIcon size={30} picked={pathname.includes('/pods')} />,
    route: '/pods/create-pod',
    is_visible: permission.pod,
    rootRoute: '/pods',
  },
  {
    name: 'templates',
    icon: <StyledTemplateIcon size={30} picked={pathname.includes('/templates')} />,
    route: '/templates/create-template',
    is_visible: permission.template,
    rootRoute: '/templates',
  },
  {
    name: 'secrets',
    icon: <StyledSecretsIcon size={30} picked={pathname.includes('/secrets')} />,
    route: '/secrets',
    is_visible: permission.secret,
    rootRoute: '/secrets',
  },
  {
    name: 'billing',
    icon: <StyledBillingIcon picked={pathname.includes('/billing')} />,
    route: '/billing',
    is_visible: permission.billing,
    rootRoute: '/billing',
  },
]

const MainNavigation = ({ restricted, theme }: { restricted?: boolean; theme: ThemeProps }) => {
  const domainEnv = import.meta.env
  const isDatura = domainEnv.REACT_APP_ENV === 'datura'

  const { getDomainConfig } = useDomainConfig()
  const domainLogo = getDomainConfig('logo')

  const isHome = true

  const navigate = useNavigate()

  const { pathname } = useLocation()

  const [active, setActive] = useState<string[]>([])

  const onHandleClick = (navigation_name: string) => {
    navigate(navigation_name)
  }

  useEffect(() => {
    const pathArr = pathname ? pathname.split('/') : []

    setActive(pathArr)
  }, [pathname])

  const permission = {
    pod: true,
    template: true,
    secret: true,
    billing: true,
  }

  const navigation_list = getNavigationList({ permission, pathname })

  return (
    <StyledRoot>
      <StyledUl>
        <Tooltip content={t('home')} position={Tooltip?.positions?.LEFT}>
          <StyledLi
            isActive={active[1] === ''}
            onClick={() => {
              if (!restricted) {
                onHandleClick('/')
              }
            }}
          >
            <StyledLogo src={domainLogo} />
          </StyledLi>
        </Tooltip>
        {navigation_list
          .filter(navigation => navigation.is_visible)
          .map((navigation, index: number) => (
            <Tooltip content={t(navigation.name)} position={Tooltip?.positions?.LEFT} key={index}>
              <StyledLi isActive={pathname.includes(navigation.rootRoute)} onClick={() => navigate(navigation.route)}>
                {navigation.icon}
                {pathname.includes(navigation.route) && <StyledCorner />}
              </StyledLi>
            </Tooltip>
          ))}
      </StyledUl>
      <StyledBottomSection>
        <StyledInnerWrapper>
          <AvatarDropDown theme={theme} />
        </StyledInnerWrapper>
      </StyledBottomSection>
    </StyledRoot>
  )
}

export default MainNavigation

const StyledRoot = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding-bottom: 24px;
`

const StyledUl = styled.ul`
  height: 100%;

  list-style: none;

  overflow-y: auto;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  padding: 24px 16px;
`
const StyledLi = styled.li<{ isActive?: boolean }>`
  color: transparent;
  position: relative;
  display: flex;
  width: 48px;
  height: 48px;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  ${({ isActive }) =>
    isActive &&
    `
    opacity: 1;
    
    border-radius: 100px;
    background: #000;

    span{
      color: #FFF;
    }
    

    path {
    stroke: #FFF;
  
    }
`}
`
export const StyledAboutIcon = styled(About)`
  path {
    fill: ${({ theme }) => theme.body.iconColor};
  }
`

export const StyledCollectionIcon = styled(Collection)`
  path {
    fill: ${({ theme }) => theme.body.iconColor};
  }
`

export const StyledTeamIcon = styled(Team)`
  path {
    fill: ${({ theme }) => theme.body.iconColor};
  }
`

export const StyledValueOutLineIcon = styled(ValueOutline)`
  path {
    stroke: ${({ theme }) => theme.body.iconColor};
  }
`

export const StyledAddIcon = styled(AddOutline)`
  path {
    fill: ${({ theme }) => theme.body.iconColor};
  }
`

export const StyledLaunchIcon = styled(Launch)`
  path {
    fill: ${({ theme }) => theme.body.iconColor};
  }
`

export const StyledValueIcon = styled.div`
  color: transparent;
  background: transparent;
  path {
    stroke: ${({ theme }) => theme.body.iconColor};
  }
`

export const StyledMobileIcon = styled(Mobile)`
  path {
    fill: ${({ theme }) => theme.body.iconColor};
  }
`

export const StyledCloudOutlineIcon = styled(Cloud)`
  path {
    fill: ${({ theme }) => theme.body.iconColor};
  }
`

export const StyledValueOutlineIcon = styled(ValueOutline)`
  path {
    stroke: ${({ theme }) => theme.body.iconColor};
  }
`

const StyledBottomSection = styled.div`
  margin-top: auto;

  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`
const StyledInnerWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`
const StyledLogo = styled.img`
  width: 40px;
  height: 40px;
`

const StyledCorner = styled.div`
  width: 0;
  height: 0;
  border-right: 10px solid ${({ theme }) => theme.body.componentsWrapperBg};
  border-top: 16px solid transparent;
  border-bottom: 16px solid transparent;
  position: absolute;
  top: 8px;
  right: -16px;
`
const StyledAPIIcon = styled(Key)<{ picked: boolean }>`
  path {
    fill: ${({ theme, picked }) => (picked ? '#FFF' : theme.body.iconColor)};
    stroke: transparent;
  }
`

const StyledBillingIcon = styled(DollarOutline)<{ picked: boolean }>`
  path {
    fill: ${({ theme, picked }) => (picked ? '#FFF' : theme.body.iconColor)};
    stroke: transparent;
  }
`
const StyledSecretsIcon = styled(Locked)<{ picked: boolean }>`
  path {
    fill: ${({ theme, picked }) => (picked ? '#FFF' : theme.body.iconColor)};
    stroke: transparent;
  }
`

const StyledTemplateIcon = styled(BoardTemplate)<{ picked: boolean }>`
  path {
    fill: ${({ theme, picked }) => (picked ? '#FFF' : theme.body.iconColor)};
    stroke: transparent;
  }
`

export const StyledCloudIcon = styled(Cloud)<{ picked?: boolean }>`
  path {
    fill: ${({ theme, picked }) => (picked ? '#FFF' : theme.body.iconColor)};
    stroke: transparent;
  }
`
export const StyledSettingsIcon = styled(FineTuning)`
  path {
    fill: ${({ theme }) => theme.body.iconColor};
    stroke: ${({ theme }) => theme.body.iconColor};
  }
`
const StyledSubnetIcon = styled(Subnet)<{ picked?: boolean }>`
  path {
    fill: ${({ theme, picked }) => (picked ? '#FFF' : theme.body.iconColor)};
  }
`
const StyledAdminIcon = styled(Person)<{ picked?: boolean }>`
  path {
    fill: ${({ theme, picked }) => (picked ? '#FFF' : theme.body.iconColor)};
    stroke: transparent;
  }
`
const StyledExploreIcon = styled(Search)<{ picked?: boolean }>`
  path {
    fill: ${({ theme, picked }) => (picked ? '#FFF' : theme.body.iconColor)};
    stroke: ${({ theme, picked }) => (picked ? '#FFF' : theme.body.iconColor)};
  }
`
const StyledTeamsIcon = styled(Teams)<{ picked?: boolean }>`
  path {
    fill: ${({ theme, picked }) => (picked ? '#FFF' : theme.body.iconColor)};
    stroke: ${({ theme, picked }) => (picked ? '#FFF' : theme.body.iconColor)};
  }
`
