import styled from 'styled-components'

import SearchOutline from 'share-ui/components/Icon/Icons/components/SearchOutline'

import MainNavigation from 'pages/Navigation/MainNavigation'
import { ThemeProps } from 'components/AvatarDropDown'

type ChatSwitcherProps = {
  restricted?: boolean
  theme: ThemeProps
}

const ChatSwitcher = ({ restricted, theme }: ChatSwitcherProps) => {
  return (
    <StyledRoot>
      <MainNavigation restricted={restricted} theme={theme} />
    </StyledRoot>
  )
}

export default ChatSwitcher

const StyledRoot = styled.div`
  height: 100vh;

  width: 80px;
  min-width: 80px;
  max-width: 80px;

  transition: left 0.1s ease-in-out;
`

export const StyledSearchOutlineIcon = styled(SearchOutline)`
  path {
    fill: ${({ theme }) => theme.body.iconColor};
  }
`
