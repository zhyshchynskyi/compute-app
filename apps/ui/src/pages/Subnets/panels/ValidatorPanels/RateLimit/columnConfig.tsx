import styled from 'styled-components'
import {
  StyledDeleteIcon,
  StyledEditIcon,
} from 'pages/TeamOfAgents/TeamOfAgentsCard/TeamOfAgentsCard'
import IconButton from 'share-ui/components/IconButton/IconButton'
import moment from 'moment'

// eslint-disable-next-line react/prop-types
const DateRenderer: React.FC<{ value: Date }> = ({ value }) => {
  const formattedDate = moment(value).format('DD/MM/YYYY HH:mm')
  return <span>{formattedDate}</span>
}

export const columnConfig = ({ handleUpdate, handleDelete }: any) => [
  {
    Header: 'Per hour',
    accessor: 'per_hour',
    minWidth: 150,
    width: 130,
  },
  {
    Header: 'Per day',
    accessor: 'per_day',
    minWidth: 150,
    width: 130,
  },
  {
    Header: 'Per month',
    accessor: 'per_month',
    minWidth: 150,
    width: 130,
  },
  {
    Header: 'Level',
    accessor: 'account_level',
    minWidth: 150,
    width: 160,
  },
  {
    Header: 'Created on',
    accessor: 'created_on',
    minWidth: 150,
    width: 150,
    Cell: DateRenderer,
  },
  {
    Header: 'Actions',
    accessor: 'actions',
    minWidth: 100,
    width: 130,

    Cell: ({ row: { original: data } }: { row: { original: Credential } }) => (
      <StyledActionWrapper>
        <IconButton
          onClick={() => handleUpdate(data)}
          icon={() => <StyledEditIcon />}
          size={IconButton.sizes?.SMALL}
          kind={IconButton.kinds?.TERTIARY}
          ariaLabel='Edit'
        />
        <IconButton
          onClick={() => handleDelete(data.id)}
          icon={() => <StyledDeleteIcon />}
          size={IconButton.sizes?.SMALL}
          kind={IconButton.kinds?.TERTIARY}
          ariaLabel='Delete'
        />
      </StyledActionWrapper>
    ),
  },
]

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
`
