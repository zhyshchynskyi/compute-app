import { useEffect, useState } from 'react';

import { StyledPanelWrapper } from 'styles/panelStyles.css';
import { MenuDots, Pause, Play } from 'share-ui/components/Icon/Icons';
import IconButton from 'share-ui/components/IconButton/IconButton';
import styled from 'styled-components';

import { StyledButtonsWrapper } from 'styles/globalStyle.css';
import { ButtonPrimary, ButtonTertiary } from 'components/Button/Button';
import TypographyPrimary from 'components/Typography/Primary';
import TypographySecondary from 'components/Typography/Secondary';
import CardWrapper from 'components/wrappers/CardWrapper';
import { StyledEditIcon } from 'pages/Pods/PodsMainCard';
import Logs from './Logs';
import MenuButton from 'share-ui/components/MenuButton/MenuButton';
import Utilization from './components/Utilizations';

import { useParams } from 'react-router-dom';
import EditPodNameModal from './components/EditPodNameModal';
import { useModal } from 'hooks';

const General = ({ podData, deletePod }: { podData: any; deletePod: (id: string) => void }) => {
  const [play, setPlay] = useState(false);
  const { openModal } = useModal();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    let timer: any;
    if (play) {
      timer = setTimeout(() => {
        setPlay(false);
      }, 10000); // Set play to false after 10 seconds
    }
    return () => clearTimeout(timer); // Clear the timer when the component unmounts or play changes
  }, [play]);

  return (
    <>
      <StyledPanelWrapper>
        <CardWrapper>
          <StyledInnerWrapper>
            <StyledHeader>
              <StyledColumn>
                <StyledNameWrapper>
                  <TypographyPrimary value={podData?.pod_name} semiBold size="large" />
                  <IconButton
                    onClick={() =>
                      openModal({
                        name: 'edit-pod-name-modal',
                        data: { name: podData?.pod_name, id: podData?.id },
                      })
                    }
                    icon={() => <StyledEditIcon />}
                    size={IconButton.sizes?.SMALL}
                    kind={IconButton.kinds?.TERTIARY}
                    ariaLabel="Edit name"
                  />
                </StyledNameWrapper>
                <TypographySecondary value="ID: hgf6h5df1sdgffd" size="medium" />
              </StyledColumn>

              <StyledColumn>
                <TypographyPrimary value="1 x RTX A5000" size="medium" />

                <TypographySecondary value="9 vCPU 50 GB RAM" size="medium" />
              </StyledColumn>

              <StyledColumn>
                <TypographyPrimary value="datura/pytorch:2.0.1" size="medium" />

                <TypographySecondary value="On-Demand - Secure Cloud" size="medium" />
              </StyledColumn>
            </StyledHeader>

            <StyledBody>
              <StyledColumn>
                <TypographySecondary value="150 GB DISK 100 GB Pod Volume" size="medium" />
                <TypographySecondary value="Volume Path: /workspace" size="medium" />
              </StyledColumn>

              <StyledColumn></StyledColumn>
            </StyledBody>

            <Utilization />

            <StyledLogsWrapper>
              <Logs loadingLogs playLogs={play} />
            </StyledLogsWrapper>

            <StyledFooter>
              <StyledButtonsWrapper>
                <ButtonPrimary size="small" onClick={() => setPlay(!play)}>
                  {play ? <Pause /> : <Play />}
                </ButtonPrimary>

                <MenuButton component={() => <StyledMenuDots />} closeDialogOnContentClick ariaLabel={`More actions`}>
                  <StyledMenuButtonsWrapper>
                    <ButtonTertiary onClick={() => {}} size={IconButton.sizes?.SMALL} ariaLabel={''}>
                      Lock Pod
                    </ButtonTertiary>
                    <ButtonTertiary onClick={() => {}} size={IconButton.sizes?.SMALL} ariaLabel={''}>
                      Edit Pod
                    </ButtonTertiary>
                    <ButtonTertiary onClick={() => {}} size={IconButton.sizes?.SMALL} ariaLabel={''}>
                      Start Pod
                    </ButtonTertiary>
                    <ButtonTertiary onClick={() => deletePod(id || '')} size={IconButton.sizes?.SMALL} ariaLabel={''}>
                      Delete Pod
                    </ButtonTertiary>
                  </StyledMenuButtonsWrapper>
                </MenuButton>
              </StyledButtonsWrapper>
              <StyledPriceTag>
                <TypographyPrimary value="Start for $0.44/hr" semiBold size="medium" />
              </StyledPriceTag>
            </StyledFooter>
          </StyledInnerWrapper>
        </CardWrapper>
      </StyledPanelWrapper>

      <EditPodNameModal />
    </>
  );
};

export default General;

export const StyledMenuButtonsWrapper = styled.div`
  background: ${({ theme }) => theme.body.backgroundColorSecondary};
  border: ${({ theme }) => theme.body.secondaryBorder};
  backdrop-filter: blur(100px);
  padding: 10px;
  border-radius: 10px;

  min-width: fit-content;

  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const StyledInnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const StyledHeader = styled.header`
  display: flex;
  align-items: center;

  justify-content: space-between;
`;
const StyledColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const StyledBody = styled.div`
  display: flex;
`;
const StyledFooter = styled.footer`
  display: flex;
  justify-content: space-between;
`;
const StyledMenuDots = styled(MenuDots)`
  path {
    stroke: ${({ theme }) => theme.body.iconColor};
  }
`;

export const StyledPriceTag = styled.div`
  border-radius: 10px;
  border: 1px solid #b6b6b6;
  padding: 4px 8px;
`;
const StyledNameWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;
const StyledLogsWrapper = styled.div`
  height: 300px;
`;
