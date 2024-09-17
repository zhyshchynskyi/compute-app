import React from 'react';

import styled from 'styled-components';
// import Agents from 'pages/Agents'
import { AuthContext } from 'contexts';
import { useTeamOfAgents } from 'pages/TeamOfAgents/useTeamOfAgents';
import ComputeHome from './ComputeHome';

const Home = () => {
  const { user } = React.useContext(AuthContext);

  const domainEnv = import.meta.env;
  const isDatura = domainEnv.REACT_APP_ENV === 'datura';

  const { teamOfAgents } = useTeamOfAgents();
  // const { agentsData } = useAgents()

  // const { getHomeModules } = useGetAccountModule()

  // const teamModules = getHomeModules('team')
  // const agentModules = getHomeModules('agent')

  // const { selected_account } = useAppModeContext()

  // const computeMode = selected_account?.account_type === accountTypeEnum.Compute
  // const subnetMode = selected_account?.account_type === accountTypeEnum.Subnet_api
  // const validatorMode = selected_account?.account_type === accountTypeEnum.Validation
  const computeMode = true;
  const subnetMode = false;
  const validatorMode = false;

  return (
    <>
      {user ? (
        <StyledWrapper>
          <ComputeHome />
        </StyledWrapper>
      ) : undefined}
      {/* {user ? (
                <StyledWrapper>
                    {isDatura ? (
                        <>
                            {computeMode && <ComputeHome />}
                            {subnetMode && <SubnetHome />}
                            {validatorMode && <ValidatorHome />}
                        </>
                    ) : (
                        <>
                            {teamModules?.list &&
                                (teamOfAgents?.length > 0 ? (
                                    <TeamOfAgents isHome />
                                ) : (
                                    <DiscoverTeamAgents />
                                ))}

                            {agentModules?.list && agentsData?.length > 0 ? (
                                <Agents isHome />
                            ) : (
                                <DiscoverSystemAgents />
                            )}
                        </>
                    )}
                </StyledWrapper>
            ) : (
                <>
                    <DiscoverTeamAgents />
                    <DiscoverSystemAgents />
                </>
            )} */}
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
