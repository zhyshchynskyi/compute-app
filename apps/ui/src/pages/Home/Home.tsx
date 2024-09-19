import React from 'react';

import styled from 'styled-components';
import { AuthContext } from 'contexts';
import ComputeHome from './ComputeHome';

const Home = () => {
  const { user } = React.useContext(AuthContext);

  return (
    <>
      {user ? (
        <StyledWrapper>
          <ComputeHome />
        </StyledWrapper>
      ) : undefined}
    </>
  );
};

export default Home;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 100px;

  padding-bottom: 30px;
`;
export const StyledMainHeaderWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
