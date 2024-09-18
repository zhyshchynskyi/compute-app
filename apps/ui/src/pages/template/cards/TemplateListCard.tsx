import styled from 'styled-components';
import Box from '@mui/material/Box';

import strCutter from 'utils/strCutter';

import IconButton from 'share-ui/components/IconButton/IconButton';

import TypographyPrimary from 'components/Typography/Primary';
import TypographySecondary from 'components/Typography/Secondary';
import { StyledCardLayoutBox, StyledRootBox } from 'pages/Pods/cards/PodListCard';
import { StyledImg } from 'pages/Pods/components/template/ChangeTemplateModal';
import Delete from 'share-ui/components/Icon/Icons/components/Delete';

type TemplateListCardProps = {
  onClick: () => void;
  onDeleteClick: (event: React.MouseEvent<Element, MouseEvent>) => void;
  isSelected: boolean;
  name: string;
  templateType: string;
  computeType: string;
  containerImage: string;
};

const TemplateListCard = ({
  onClick,
  onDeleteClick,
  isSelected,
  name,
  templateType,
  computeType,
  containerImage,
}: TemplateListCardProps) => {
  return (
    <StyledRootBox display={'flex'} onClick={onClick} mt={1} isSelected={isSelected}>
      <StyledCardLayoutBox display={'flex'} justifyContent={'space-between'}>
        <Box display={'flex'} gap={1} sx={{ width: '100%' }}>
          <StyledImg src="https://www.svgrepo.com/show/333528/docker.svg" alt="" width={60} />
          <Box display={'flex'} flexDirection={'column'} sx={{ width: '100%' }}>
            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} gap={1} mb={1}>
              <StyledNameWrapper>
                <TypographyPrimary value={strCutter(name, 25, true)} size="small" bold />
              </StyledNameWrapper>
              <Box display={'flex'} gap={1}>
                <StyledTag>
                  <TypographyPrimary value={templateType} size="xs-small" semiBOld />
                </StyledTag>
                <StyledTag>
                  <TypographyPrimary value={computeType} size="xs-small" semiBOld />
                </StyledTag>
              </Box>
            </Box>
            <TypographySecondary value={strCutter(containerImage, 35, true)} size="xs-small" />

            <Box display={'flex'} gap={0.5} justifyContent={'flex-end'}>
              <IconButton
                onClick={onDeleteClick}
                icon={() => <StyledDeleteIcon />}
                size={IconButton.sizes?.SMALL}
                kind={IconButton.kinds?.TERTIARY}
                ariaLabel="Delete"
              />
            </Box>
          </Box>
        </Box>
      </StyledCardLayoutBox>
    </StyledRootBox>
  );
};

export default TemplateListCard;

const StyledDeleteIcon = styled(Delete)`
  path {
    fill: ${({ theme }) => theme.body.iconColor};
  }
`;

const StyledTag = styled.div`
  border: 1px solid #979797;
  border-radius: 20px;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 2px 8px;

  text-transform: capitalize;
`;
const StyledNameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 500;
  opacity: 0.8;
`;
