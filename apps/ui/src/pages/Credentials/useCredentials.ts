import { ToastContext } from 'contexts';
import { useModal } from 'hooks';
import { useContext } from 'react';

import { renderColumns } from './columnConfig';
import { Credential } from 'types/credential';

const useCredentials = () => {
  const { setToast } = useContext(ToastContext);
  const { closeModal, openModal } = useModal();

  // const { data: credentials, loading: fetch_credentials_loading } = useGetCredentials()
  // const { deleteCredential } = useDeleteCredentialService()

  const handleOpenCreateCredentialModal = () => {
    openModal({
      name: 'create-credential-modal',
    });
  };

  const handleOpenUpdateCredentialModal = (credential: Credential) => {
    openModal({
      name: 'update-credential-modal',
      data: {
        credential,
      },
    });
  };

  const handleDeleteCredential = async (id: string) => {
    openModal({
      name: 'delete-confirmation-modal',
      data: {
        deleteItem: async () => {
          try {
            // await deleteCredential(id)
            closeModal('delete-confirmation-modal');

            setToast({
              message: 'Credential was deleted!',
              type: 'positive',
              open: true,
            });
          } catch (e) {
            setToast({
              message: 'Failed to delete Credential!',
              type: 'negative',
              open: true,
            });
            closeModal('delete-confirmation-modal');
          }
        },
        label: 'Delete Credential?',
      },
    });
  };

  const columns = renderColumns({
    handleDeleteCredential,
    handleOpenUpdateCredentialModal,
  });

  return {
    handleOpenCreateCredentialModal,
    columns,
    credentials: [],
    fetch_credentials_loading: false,
  };
};

export default useCredentials;
