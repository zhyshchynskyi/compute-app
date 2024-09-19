import {
  StyledHeaderGroup,
  StyledSectionDescription,
  StyledSectionTitle,
  StyledSectionWrapper,
} from 'pages/Home/homeStyle.css';
import Box from '@mui/material/Box';
import BackButton from 'components/BackButton';

import CopyButton from 'components/CopyButton';
import useSecretDetails from './useSecretDetails';
import IconButton from 'share-ui/components/IconButton/IconButton';
// eslint-disable-next-line import/no-extraneous-dependencies
import SettingsIcon from '@mui/icons-material/Settings';
import MenuButton from 'share-ui/components/MenuButton/MenuButton';
import { ButtonTertiary } from 'components/Button/Button';
import EditSecretModal from '../EditModal/EditSecretModal';
import TextField from 'share-ui/components/TextField/TextField';
import Textarea from 'share-ui/components/Textarea/Textarea';

import { StyledAppContainer } from 'components/Layout/LayoutStyle';
import { StyledChatWrapper, StyledContainer, StyledHorizontalDivider, StyledMainWrapper } from 'routes/ChatRouteLayout';
import { StyledFormWrapper } from '../CreateSecret/CreateSecret';
import CardWrapper from 'components/wrappers/CardWrapper';
import Loader from 'share-ui/components/Loader/Loader';
import TypographyPrimary from 'components/Typography/Primary';
import TypographySecondary from 'components/Typography/Secondary';
import styled from 'styled-components';

interface SecretModalProps {
  handleChangeInput: (field: string, e: string) => void;
  field: string;
  value: string;
}

export const editSecretValue = ({ handleChangeInput, field, value }: SecretModalProps) => {
  return (
    <Box display={'flex'} flexDirection={'column'} gap={1}>
      <div>
        <TypographyPrimary value="Edit Secret Value" size="medium" bold />
      </div>

      <div>
        <TypographySecondary
          value="WARNING: Changing this secret value can have unintended side effects. It may disrupt
        services or applications that depend on this secret. If a new value is required, consider
        creating a new secret and updating your services accordingly to prevent any downtime or
        configuration issues."
          size="xs-small"
        />
      </div>

      <Box mt={2}>
        <TextField value={value} onChange={(e) => handleChangeInput(field, e)} />
      </Box>
    </Box>
  );
};

export const editDescription = ({ handleChangeInput, field, value }: SecretModalProps) => {
  return (
    <Box display={'flex'} flexDirection={'column'} gap={1}>
      <div>
        <TypographyPrimary value="Edit Secret Description" size="medium" bold />
      </div>

      <div>
        <TypographySecondary
          value="Tip: Try to create a description that accurately reflects the purpose and usage of the
          secret to maintain clarity for all users."
          size="xs-small"
        />
      </div>

      <Box mt={2}>
        <Textarea value={value} onChange={(e) => handleChangeInput(field, e)} />
      </Box>
    </Box>
  );
};

const SecretDetails = () => {
  const { secret, fetch_secret_loading, handleCopyText, formatDate, actions } = useSecretDetails();

  return (
    <StyledSectionWrapper>
      <StyledAppContainer>
        <StyledContainer>
          <StyledMainWrapper>
            <StyledChatWrapper>
              <StyledHeaderGroup className="header_group">
                <div>
                  <StyledSectionTitle>Secret Details</StyledSectionTitle>
                  <StyledSectionDescription>
                    View and manage the details of your secret configurations.
                  </StyledSectionDescription>
                </div>

                <Box display={'flex'} alignItems={'center'}>
                  <BackButton />
                </Box>
              </StyledHeaderGroup>

              <StyledHorizontalDivider />

              <StyledFormWrapper>
                <CardWrapper>
                  {fetch_secret_loading && <Loader />}
                  <Box display={'flex'} flexDirection={'column'}>
                    <Box alignSelf={'flex-end'} position={'absolute'}>
                      <MenuButton
                        component={() => (
                          <StyledIconWrapper>
                            <SettingsIcon fontSize="large" />
                          </StyledIconWrapper>
                        )}
                        closeDialogOnContentClick
                        ariaLabel={`Settings`}
                      >
                        <StyledMenuButtonsWrapper>
                          {actions.map((item: { label: string; function: () => void }, index: number) => {
                            return (
                              <ButtonTertiary key={index} onClick={item.function} size={IconButton.sizes?.SMALL}>
                                {item.label}
                              </ButtonTertiary>
                            );
                          })}
                        </StyledMenuButtonsWrapper>
                      </MenuButton>
                    </Box>
                    <Box display={'flex'}>
                      <Box display={'flex'} flexDirection={'column'} width={'30%'}>
                        <Box>
                          <TypographySecondary value="Secret Name" size="small" />

                          <StyledValueWrapper>
                            <CopyButton onCopyClick={() => handleCopyText(secret?.secret_name)} />
                            <TypographyPrimary value={secret?.secret_name} size="medium" />
                          </StyledValueWrapper>
                        </Box>

                        <Box mt={2}>
                          <TypographySecondary value="Secret ID" size="small" />

                          <StyledValueWrapper>
                            <CopyButton onCopyClick={() => handleCopyText(secret?.id)} />
                            <TypographyPrimary value={secret?.id} size="medium" />
                          </StyledValueWrapper>
                        </Box>

                        <Box mt={2}>
                          <TypographySecondary value="Last Retrieved" size="small" />

                          <StyledValueWrapper>
                            <TypographyPrimary value={formatDate(secret?.last_retrieved_on)} size="medium" />
                          </StyledValueWrapper>
                        </Box>
                      </Box>

                      <Box>
                        <Box>
                          <TypographySecondary value="Description" size="small" />

                          <StyledValueWrapper>
                            <TypographyPrimary value={secret?.secret_description} size="medium" />
                          </StyledValueWrapper>
                        </Box>

                        <Box mt={2}>
                          <TypographySecondary value="Created" size="small" />

                          <StyledValueWrapper>
                            <TypographyPrimary value={formatDate(secret?.created_on)} size="medium" />
                          </StyledValueWrapper>
                        </Box>
                        <Box mt={2}>
                          <TypographySecondary value="Last Updated" size="small" />

                          <StyledValueWrapper>
                            <TypographyPrimary value={formatDate(secret?.updated_on)} size="medium" />
                          </StyledValueWrapper>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </CardWrapper>
              </StyledFormWrapper>
            </StyledChatWrapper>
          </StyledMainWrapper>
        </StyledContainer>
      </StyledAppContainer>

      <EditSecretModal />
    </StyledSectionWrapper>
  );
};

export default SecretDetails;

const StyledValueWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const StyledIconWrapper = styled.div`
  color: ${({ theme }) => `${theme.body.iconColor}`};
`;

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
