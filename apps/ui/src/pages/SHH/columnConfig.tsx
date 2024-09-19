import styled from 'styled-components';
import IconButton from 'share-ui/components/IconButton/IconButton';
import moment from 'moment';
import Delete from 'share-ui/components/Icon/Icons/components/Delete';
import Edit from 'share-ui/components/Icon/Icons/components/Edit';
import { ISshKey } from 'types/sshKey.types';

// eslint-disable-next-line react/prop-types
const DateRenderer: React.FC<{ value: Date }> = ({ value }) => {
  const formattedDate = moment(value).fromNow();
  return <span>{formattedDate}</span>;
};

interface RendererColumnProps {
  handleOpenUpdateSSHModal: (ssh: ISshKey) => void;
  handleDeleteSSH: (event: React.MouseEvent<Element, MouseEvent>, ssh: ISshKey) => void;
}

export const renderColumns = ({ handleOpenUpdateSSHModal, handleDeleteSSH }: RendererColumnProps) => [
  {
    Header: 'Name',
    accessor: 'name',
    minWidth: 200,
    width: 500,
  },
  {
    Header: 'Key',
    accessor: 'public_key',
    minWidth: 200,
    width: 500,
  },
  {
    Header: 'Createds',
    accessor: 'created_at',
    minWidth: 100,
    width: 150,
    Cell: DateRenderer,
  },

  {
    Header: 'Actions',
    accessor: 'actions',
    minWidth: 100,
    width: 130,
    Cell: ({ row: { original } }: { row: { original: ISshKey } }) => (
      <StyledActionWrapper>
        <IconButton
          onClick={() => handleOpenUpdateSSHModal(original)}
          icon={() => <StyledEditIcon />}
          size={IconButton.sizes?.SMALL}
          kind={IconButton.kinds?.TERTIARY}
          ariaLabel="Edit"
        />
        <IconButton
          onClick={(e) => handleDeleteSSH(e, original)}
          icon={() => <StyledDeleteIcon />}
          size={IconButton.sizes?.SMALL}
          kind={IconButton.kinds?.TERTIARY}
          ariaLabel="Delete"
        />
      </StyledActionWrapper>
    ),
  },
];

const StyledActionWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -6px;

  .components-IconButton-IconButton-module__iconButtonContainer--ttuRB {
    &:hover {
      background: ${({ theme }) => theme.body.humanMessageBgColor};
      border-radius: 50%;
    }
  }
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
