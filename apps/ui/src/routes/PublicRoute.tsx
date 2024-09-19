import { Navigate, useOutlet } from 'react-router-dom'

import { StyledRoot } from './RootLayout'
import styled from 'styled-components'
import { StyledLoginWrapper } from './HomeRouteLayout'
import { AuthContext } from 'contexts'
import React from 'react'

const PublicRoute = () => {
  const { user } = React.useContext(AuthContext)
  const outlet = useOutlet()

  if (user) return <Navigate to='/' />

  return (
    <StyledRoot>
      <StyledOutletWrapper>
        <StyledLoginWrapper>{outlet}</StyledLoginWrapper>
      </StyledOutletWrapper>
    </StyledRoot>
  )
}

export default PublicRoute

const StyledOutletWrapper = styled.div`
  display: flex;
  justify-content: center;

  width: 100%;
  height: 100%;
`
