import Box from '@mui/material/Box';
import styled from 'styled-components';
import { useModal } from 'hooks';
import withRenderModal from 'hocs/withRenderModal';
import MainModal from 'modals/MainModal';
import HeadingPrimary from '../components/Heading/Primary';
import Heading from '../share-ui/components/Heading/Heading';
import TypographySecondary from '../components/Typography/Secondary';
import { StyledSuccessPaymentInfoContainer } from '../styles/successPaymentStyles.css';
import { useTranslation } from 'react-i18next';

const SuccessPaymentModal = () => {
  const { closeModal } = useModal();
  const { t } = useTranslation();

  return (
    <MainModal onClose={() => closeModal('success-payment-modal')} title={''}>
      <StyledModalBody>
        <Box mt={2}>
          <StyledSuccessPaymentInfoContainer>
            <HeadingPrimary
              value={'Payment Done!'}
              type={Heading.types?.h1}
              style={{ fontSize: 32, lineHeight: 'normal', fontWeight: 600 }}
            />

            <TypographySecondary value={t('Thank you for completing your secure online payment.')} size="medium" />
          </StyledSuccessPaymentInfoContainer>
        </Box>
      </StyledModalBody>
    </MainModal>
  );
};
export default withRenderModal('success-payment-modal')(SuccessPaymentModal);

const StyledModalBody = styled.div`
  padding: 20px;
  padding-top: 0;

  width: 90vw;
  max-width: 700px;
  min-width: 400px;

  height: auto;
`;
