import Table from 'components/Table';
import AddKeyModal from './AddKeyModal';
import UpdateSSHModal from './UpdateSSH/UpdateSSHModal';
import { StyledPanelWrapper } from 'styles/panelStyles.css';
import useSsh from './useSsh';

const SHH = () => {
  const { columns, sshKeys, ssh_list_loading } = useSsh();
  return (
    <>
      <StyledPanelWrapper>
        <Table columns={columns} data={sshKeys as any[]} isLoading={ssh_list_loading} />
      </StyledPanelWrapper>
      <AddKeyModal />
      <UpdateSSHModal />
    </>
  );
};

export default SHH;
