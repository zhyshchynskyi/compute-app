import React from 'react'
import { AuthContext } from 'contexts'
import { useOutlet } from 'react-router-dom'

import ChatSwitcher from 'components/ChatSwitcher'

import styled from 'styled-components'
import { ThemeProps } from 'components/AvatarDropDown'

const UpdateAppWrapper = ({ theme }: { theme: ThemeProps }) => {
  const { user } = React.useContext(AuthContext)

  const outlet = useOutlet()

  return (
    <StyledRoot>
      {user && <ChatSwitcher restricted theme={theme} />}
      <StyledOutletWrapper>{outlet}</StyledOutletWrapper>
    </StyledRoot>
  )
}

export default UpdateAppWrapper

const StyledRoot = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;

  background: ${({ theme }) => theme.body.backgroundColorPrimary};
`
const StyledOutletWrapper = styled.div`
  width: 100%;
  max-width: calc(100vw - 80px);
  height: 100%;
`
