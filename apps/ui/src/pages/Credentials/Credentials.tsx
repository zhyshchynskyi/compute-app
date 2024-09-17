import Table from 'components/Table'

import CreateCredentialModal from './CreateCredentialModal/CreateCredentialModal'
import UpdateCredentialModal from './UpdateCredentialModal/UpdateCredentialModal'

import useCredentials from './useCredentials'
import { StyledPanelWrapper } from 'styles/panelStyles.css'

const Credentials = () => {
  const { columns, credentials, fetch_credentials_loading } = useCredentials()

  return (
    <>
      <StyledPanelWrapper>
        <Table columns={columns} data={credentials} isLoading={fetch_credentials_loading} />
      </StyledPanelWrapper>

      <CreateCredentialModal />
      <UpdateCredentialModal />
    </>
  )
}

export default Credentials
