import styled from 'styled-components';
import IconButton from 'share-ui/components/IconButton/IconButton';

import Delete from 'share-ui/components/Icon/Icons/components/Delete';
import Edit from 'share-ui/components/Icon/Icons/components/Edit';

type TableActionButtonsProp = {
  onDeleteClick?: () => void;
  onEditClick?: () => void;
  customActions?: React.ReactNode;
};

const TableActionButtons = ({ onDeleteClick, onEditClick, customActions }: TableActionButtonsProp) => {
  return (
    <StyledTableButtons>
      {onDeleteClick && (
        <IconButton
          onClick={onDeleteClick}
          icon={() => <StyledDeleteIcon />}
          size={IconButton.sizes?.SMALL}
          kind={IconButton.kinds?.TERTIARY}
          ariaLabel="Delete"
        />
      )}

      {onEditClick && (
        <IconButton
          onClick={onEditClick}
          icon={() => <StyledEditIcon />}
          size={IconButton.sizes?.SMALL}
          kind={IconButton.kinds?.TERTIARY}
          ariaLabel="Edit"
        />
      )}

      {customActions && customActions}
    </StyledTableButtons>
  );
};

export default TableActionButtons;

const StyledTableButtons = styled.div`
  display: flex;
  align-items: center;

  height: 100%;
`;
const StyledDeleteIcon = styled(Delete)`
  path {
    fill: ${({ theme }) => theme.body.iconColor};
  }
`;
const StyledEditIcon = styled(Edit)`
  path {
    fill: ${({ theme }) => theme.body.iconColor};
  }
`;
