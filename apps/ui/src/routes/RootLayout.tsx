import React from 'react'
import { AuthContext } from 'contexts'
import { Navigate, useOutlet } from 'react-router-dom'

import ChatSwitcher from 'components/ChatSwitcher'

import styled from 'styled-components'
import { ThemeProps } from 'components/AvatarDropDown'

const RootLayout = ({ theme }: { theme: ThemeProps }) => {
  const { user, loading } = React.useContext(AuthContext)

  const outlet = useOutlet()

  if (!user && !loading) return <Navigate to='/login' />

  return (
    <StyledRoot>
      {user && <ChatSwitcher theme={theme} />}
      <StyledOutletWrapper>{outlet}</StyledOutletWrapper>
    </StyledRoot>
  )
}

export default RootLayout

export const StyledRoot = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;

  background: ${({ theme }) => theme.body.backgroundColorPrimary};
`
export const StyledOutletWrapper = styled.div`
  width: 100%;
  max-width: calc(100vw - 80px);
  height: 100%;
`
