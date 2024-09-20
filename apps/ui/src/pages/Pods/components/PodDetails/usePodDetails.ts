import { useNavigate, useParams } from 'react-router-dom';

import { useModal } from 'hooks';
import { ToastContext } from 'contexts';
import { useContext } from 'react';
import { useUnRentExecutorMutation } from 'redux/apis/executorApi';

export const usePodDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const { openModal, closeModal } = useModal();

  const [unRentExecutor, { isLoading }] = useUnRentExecutorMutation();

  const { setToast } = useContext(ToastContext);

  // const { data: podById, loading: pod_is_loading } = usePodById(id || '')

  // const { deletePodById, loading: delete_pod_loading } = useDeletePodByIdService()

  // const { refetch: refetchPods } = useGetPods()

  const podById: any = {};

  const handleDeletePod = (id: string) => {
    openModal({
      name: 'delete-confirmation-modal',
      data: {
        deleteItem: async () => {
          try {
            await unRentExecutor(id).unwrap();

            if (params.id === id) {
              navigate('/pods/create-pod')
            }
            
            closeModal('delete-confirmation-modal');
            setToast({
              message: 'Pod was deleted!',
              type: 'positive',
              open: true,
            })
          } catch (e) {
            setToast({
              message: 'Failed to delete Pod!',
              type: 'negative',
              open: true,
            });
            closeModal('delete-confirmation-modal');
          }
        },
        label: 'Delete Pod?',
      },
    });
  };

  return {
    handleDeletePod,
    podById,
    pod_is_loading: false,
    delete_pod_loading: false,
  };
};
