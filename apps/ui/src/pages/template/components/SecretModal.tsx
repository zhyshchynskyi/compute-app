import withRenderModal from 'hocs/withRenderModal'
import styled, { useTheme } from 'styled-components'

import { useModal } from 'hooks'

import Table from 'components/Table'
import { Secret } from 'types/secret'
import Typography from '@mui/material/Typography'
import MainModal from 'modals/MainModal'

const baseConfig = ({
  handleSelectSecret,
  index,
}: {
  handleSelectSecret: (secret: Secret, index: number) => void
  index: number
}) => [
  {
    Header: 'Secret Name',
    accessor: 'secret_name',
    minWidth: 300,
    width: 350,
    Cell: ({ row: { original: data } }: { row: { original: Secret } }) => {
      const theme = useTheme()

      return (
        <Typography
          onClick={() => handleSelectSecret(data, index)}
          sx={{ cursor: 'pointer', textDecoration: 'underline', color: theme?.body.linkTextColor }}
        >
          {data.secret_name}
        </Typography>
      )
    },
  },
  {
    Header: 'Description',
    accessor: 'secret_description',
    minWidth: 300,
    width: 350,
  },
]

const TemplateSecretModal = ({ data: { secrets, handleSelectSecret, index } }: any) => {
  const { closeModal } = useModal()
  return (
    <MainModal
      onClose={() => closeModal('template-secret-modal')}
      title={'Pick secret'}
      customButtons={<></>}
    >
      <StyledModalBody>
        <Table
          columns={baseConfig({ handleSelectSecret, index })}
          data={secrets}
          isLoading={false}
        />
      </StyledModalBody>
    </MainModal>
  )
}

export default withRenderModal('template-secret-modal')(TemplateSecretModal)

const StyledModalBody = styled.div`
  padding: 0 20px;
  padding-top: 20px;
`
