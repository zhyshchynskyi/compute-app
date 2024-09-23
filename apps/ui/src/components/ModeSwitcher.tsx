import styled from 'styled-components'
import TypographyPrimary from './Typography/Primary'

import { Content, Item, Root, Trigger } from '@radix-ui/react-dropdown-menu'
import { account_mode_icon, useAppModeContext } from 'context/AppModeContext'
import { Check, Switcher, Team } from 'share-ui/components/Icon/Icons'
import { StyledAddIcon } from 'pages/Navigation/MainNavigation'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Account } from 'types/account'
import Verified from 'share-ui/components/Icon/Icons/components/Verified'
import strCutter from 'utils/strCutter'

const ModeSwitcher = () => {
  const navigate = useNavigate()
  const { accounts, shared_accounts, account_id, switchAccountMode, selected_account } = useAppModeContext()

  const [isDropdownOpen, setDropdownOpen] = useState(false)
  const [showDropdownValue, setShowDropdownValue] = useState(false)

  useEffect(() => {
    if (isDropdownOpen) {
      const timer = setTimeout(() => {
        setShowDropdownValue(true)
      }, 100)
      return () => clearTimeout(timer)
    } else {
      setShowDropdownValue(false)
    }
  }, [isDropdownOpen])

  const picked_shared_account = shared_accounts?.filter((shared: any) => shared.account_id === selected_account?.id)

  return (
    <StyledRoot isOpen={isDropdownOpen}>
      <StyledDropDownMenuRoot onOpenChange={setDropdownOpen}>
        <StyledSwitcher>
          <StyledDropDownMenuTrigger>
            <StyledSwitcherIcon size={32} />

            {showDropdownValue && (
              <StyledDropdownValue>
                <>
                  <TypographyPrimary
                    value={strCutter(
                      picked_shared_account?.length > 0
                        ? `${picked_shared_account[0].assigned_account_name}'s Team`
                        : selected_account?.name,
                      24,
                      true,
                    )}
                    size={'xs-small'}
                    bold
                  />
                  {selected_account?.active && <StyledVerified />}
                </>
              </StyledDropdownValue>
            )}
          </StyledDropDownMenuTrigger>
        </StyledSwitcher>
        {showDropdownValue && (
          <StyledDropdownContent>
            {accounts?.map((account: Account) => {
              return (
                <StyledDropDownMenuItem key={account.id} onClick={() => switchAccountMode(account)}>
                  <StyledImg src={account_mode_icon[account.account_type]} />

                  <StyledDropdownValue>
                    <TypographyPrimary value={strCutter(account.name, 24, true)} size={'xs-small'} semiBold />
                    {account?.active && <StyledVerified />}
                  </StyledDropdownValue>

                  {account_id === account.id && <StyledCheck />}
                </StyledDropDownMenuItem>
              )
            })}

            {shared_accounts?.map((account: any) => {
              return (
                <>
                  <StyledDropDownMenuItem
                    key={account?.id}
                    onClick={() =>
                      switchAccountMode({
                        id: account.account_id,
                        accountType: account?.assigned_account_type,
                        account_type: account?.assigned_account_type,
                        name: account.assigned_account_name,
                        configs: account.assigned_account_configs,
                        active: false,
                      })
                    }
                  >
                    <StyledImg src={account_mode_icon[account?.assigned_account_type]} />

                    <TypographyPrimary
                      value={`${strCutter(account.assigned_account_name, 24, true)}'s Team`}
                      size={'small'}
                      semiBold
                    />

                    {account_id === account.account_id && <StyledCheck />}
                  </StyledDropDownMenuItem>
                </>
              )
            })}

            <StyledStickyWrapper>
              <StyledDropDownMenuItem onClick={() => navigate('create-new-app')}>
                <StyledAddIcon size={20} />
                <TypographyPrimary value='Create new application' size={'small'} semiBold />
              </StyledDropDownMenuItem>
            </StyledStickyWrapper>
          </StyledDropdownContent>
        )}
      </StyledDropDownMenuRoot>
    </StyledRoot>
  )
}

export default ModeSwitcher

const StyledRoot = styled.div<{ isOpen: boolean }>`
  background: ${({ theme }) => theme.body.backgroundColorPrimary};
  border: 2px solid transparent;

  width: 50px;
  height: 50px;

  z-index: 10203000;

  transition: width 0.1s ease, height 0.1s ease, border-radius 0s ease, margin-left 0.1s ease;
  border-radius: 100px;

  ${({ isOpen, theme }) =>
    isOpen &&
    `
  width: 250px;
  height: 50px;
  border-radius: 10px;
  margin-left: 200px; 
  border-color: ${theme.body.textColorPrimary}
  `}
`

const StyledDropdownValue = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const StyledCheck = styled(Check)`
  path {
    fill: ${({ theme }) => theme.body.iconColor};
  }

  margin-left: auto;
`
const StyledDropDownMenuRoot = styled(Root)``

const StyledDropdownContent = styled(Content)`
  margin-bottom: 15px;
  min-width: 250px;
  width: 100%;

  box-shadow: 0 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2);
  z-index: 10203000;
  border-radius: 8px;
  background: ${({ theme }) => theme.body.avatarDropDownColor};

  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.15);

  animation: fadeInFromBottom 0.2s ease-out;

  overflow-y: auto;
  height: 100%;
  max-height: 60vh;

  border: 2px solid ${({ theme }) => theme.body.dialogBorder};

  @keyframes fadeInFromBottom {
    from {
      opacity: 0;
      transform: translateY(10px); // Start lower
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`

const StyledDropDownMenuItem = styled(Item)<{ sticky?: boolean; borderBottom?: boolean }>`
  all: unset;

  line-height: 1;
  /* border-radius: 3px; */
  display: flex;
  align-items: center;
  padding: 12px 10px;

  cursor: pointer;
  user-select: none;
  display: flex;
  gap: 10px;
  color: var(--content-content-primary, #fff);

  :hover {
    background: ${({ theme }) => theme.body.humanMessageBgColor};
  }

  position: ${({ sticky }) => (sticky ? 'sticky' : 'relative')};
  bottom: ${({ sticky }) => (sticky ? '0' : '')};
  z-index: ${({ sticky }) => (sticky ? '1000000' : '0')};
  border-top: ${({ sticky, theme }) => (sticky ? `1px solid ${theme.body.secondaryBorderBackground}` : '')};
  border-bottom: ${({ borderBottom, theme }) => (borderBottom ? theme.body.secondaryBorder : '')};

  background: ${({ theme }) => theme.body.avatarDropDownColor};
`

const StyledDropDownMenuTrigger = styled(Trigger)`
  all: unset;
  cursor: pointer;

  display: flex;
  align-items: center;
  gap: 10px;

  width: 100%;
  height: 100%;

  padding-left: 7px;
`
const StyledSwitcher = styled.div`
  width: 100%;
  height: 100%;
`
const StyledImg = styled.img`
  width: 22px;
  height: 22px;

  object-fit: contain;

  ${({ theme }) => `filter: ${theme.body.imageBrightness};`}
`
const StyledSwitcherIcon = styled(Switcher)`
  path {
    fill: ${({ theme }) => theme.body.iconColor};
    stroke: transparent;
  }
`
export const StyledVerified = styled(Verified)`
  path {
    fill: #1da1f2;
    stroke: #1da1f2;
  }
`
export const StyledTeamIcon = styled(Team)`
  path {
    fill: ${({ theme }) => theme.body.iconColor};
  }
`

const StyledStickyWrapper = styled.div`
  position: sticky;
  bottom: 0;
  z-index: 1000000;
  border-top: ${({ theme }) => theme.body.secondaryBorder};
  background: ${({ theme }) => theme.body.avatarDropDownColor};
`
