import styled from 'styled-components';
import withRenderModal from 'hocs/withRenderModal';

import { useModal } from 'hooks';

import Box from '@mui/material/Box';

import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import Loader from 'share-ui/components/Loader/Loader';
import MainModal from 'modals/MainModal';
import { StyledCard } from 'pages/Pods/cards/PodResourcesCard';
import TypographyPrimary from 'components/Typography/Primary';
import TypographySecondary from 'components/Typography/Secondary';
import { useGetSshKeysQuery } from 'redux/apis/sshKeyApi';
import { ISshKey } from 'types/sshKey.types';

export interface ChangeSshKeyModalProps {
  data: {
    onChangeSshKey: (key: ISshKey) => void;
  };
}

const ChangeSshKeyModal = ({ data: { onChangeSshKey } }: ChangeSshKeyModalProps) => {
  const { closeModal } = useModal();

  const { data: sshKeys = [], isLoading } = useGetSshKeysQuery();

  return (
    <MainModal onClose={() => closeModal('change-ssh-key-modal')} customButtons={<></>} title="SSH Key">
      <StyledModalBody>
        <Box display={'flex'} flexDirection={'column'} position={'relative'}>
          {sshKeys.length === 0 && isLoading && (
            <Box position={'absolute'} sx={{ marginTop: '15%', marginLeft: '47%' }}>
              <Loader size={40} />
            </Box>
          )}

          {sshKeys.length > 0 ? (
            <Box mt={5} display={'flex'} flexDirection={'column'}>
              <Box display={'flex'} flexDirection={'column'}>
                <Box display={'grid'} gridTemplateColumns={'1fr 1fr'} gap={2} mt={2}>
                  {sshKeys.map((sshKey) => (
                    <StyledCard isSelected={false}>
                      <CardActionArea
                        key={sshKey.id}
                        sx={{
                          boxShadow: 'none',
                          borderRadius: '10px',
                        }}
                      >
                        <CardContent
                          sx={{
                            border: 'none',
                          }}
                        >
                          <Box display={'flex'} onClick={() => onChangeSshKey(sshKey)} gap={1}>
                            <Box display={'flex'} flexDirection={'column'} justifyContent={'center'}>
                              <TypographyPrimary value={sshKey.name} size="medium" semiBold />
                            </Box>
                          </Box>
                        </CardContent>
                      </CardActionArea>
                    </StyledCard>
                  ))}
                </Box>
              </Box>
            </Box>
          ) : (
            <Box
              display={'flex'}
              justifyContent={'center'}
              flexDirection={'column'}
              alignItems={'center'}
              mt={6}
              gap={1}
            >
              <TypographyPrimary value="No results found" size="x-large" bold />
              <TypographySecondary value="Please add sshkeys first." size="xs-small" />
            </Box>
          )}
        </Box>
      </StyledModalBody>
    </MainModal>
  );
};

export default withRenderModal('change-ssh-key-modal')(ChangeSshKeyModal);

const StyledModalBody = styled.div`
  width: 100vw;
  max-width: 800px;
  height: fit-content;
  min-height: 200px;

  padding: 20px;
`;

export const StyledImg = styled.img`
  width: 70px;
  height: 70px;

  object-fit: contain;

  ${({ theme }) => `filter: ${theme.body.imageBrightness};`}
`;
