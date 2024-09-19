import { renderColumns } from './columnConfig';
import { useModal } from 'hooks';
import { useContext } from 'react';
import { ToastContext } from 'contexts';
import { useDeleteSshKeyMutation, useGetSshKeysQuery } from 'redux/apis/sshKey';
import { ISshKey } from 'types/sshKey.types';

const useSsh = () => {
  const { openModal, closeModal } = useModal();
  const { setToast } = useContext(ToastContext);

  const { data: sshKeys = [], isLoading } = useGetSshKeysQuery();
  const [deleteSshKey] = useDeleteSshKeyMutation();

  const handleOpenUpdateSSHModal = (ssh: ISshKey) => {
    openModal({
      name: 'update-shh-key-modal',
      data: { ssh },
    });
  };

  const handleDeleteSSH = (event: React.MouseEvent<Element, MouseEvent>, ssh: ISshKey) => {
    event.stopPropagation();
    openModal({
      name: 'delete-confirmation-modal',
      data: {
        deleteItem: async () => {
          try {
            await deleteSshKey({ id: ssh.id }).unwrap();
            setToast({
              message: 'SSH was deleted!',
              type: 'positive',
              open: true,
            });
            closeModal('delete-confirmation-modal');
          } catch (e) {
            setToast({
              message: 'Failed to delete SSH!',
              type: 'negative',
              open: true,
            });
          }

          closeModal('delete-confirmation-modal');
        },
        label: 'Delete SSH?',
      },
    });
  };

  const columns = renderColumns({ handleOpenUpdateSSHModal, handleDeleteSSH });
  return {
    sshKeys,
    columns,
    ssh_list_loading: isLoading,
  };
};

export default useSsh;
