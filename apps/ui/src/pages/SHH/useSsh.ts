import { renderColumns } from './columnConfig';
import { SSH } from 'types/ssh';
import { useModal } from 'hooks';
import { useContext } from 'react';
import { ToastContext } from 'contexts';

const ssh_list: any[] = [];

const useSsh = () => {
  const { openModal, closeModal } = useModal();
  const { setToast } = useContext(ToastContext);

  const handleOpenUpdateSSHModal = (ssh: SSH) => {
    openModal({
      name: 'update-shh-key-modal',
      data: { ssh },
    });
  };

  const handleDeleteSSH = (event: React.MouseEvent<Element, MouseEvent>, ssh: Pick<SSH, 'id'>) => {
    event.stopPropagation();
    openModal({
      name: 'delete-confirmation-modal',
      data: {
        deleteItem: async () => {
          // try {
          //   await deleteSsh(ssh.id);
          //   setToast({
          //     message: 'SSH was deleted!',
          //     type: 'positive',
          //     open: true,
          //   });
          //   closeModal('delete-confirmation-modal');
          // } catch (e) {
          //   setToast({
          //     message: 'Failed to delete SSH!',
          //     type: 'negative',
          //     open: true,
          //   });
          //   closeModal('delete-confirmation-modal');
          // }
        },
        label: 'Delete SSH?',
      },
    });
  };

  const columns = renderColumns({ handleOpenUpdateSSHModal, handleDeleteSSH });
  return {
    ssh_list,
    columns,
    ssh_list_loading: false,
  };
};

export default useSsh;
