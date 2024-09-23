import { useNavigate, useParams } from 'react-router-dom'

import { useModal } from 'hooks'
import { ToastContext } from 'contexts'
import { useContext } from 'react'
import { useUnRentExecutorMutation } from 'redux/apis/executorApi'
import { useGetPodByIdQuery, useLazyGetPodsQuery } from 'redux/apis/podsApi'

export const usePodDetails = () => {
  const navigate = useNavigate()
  const params = useParams()
  const { id } = params
  const { openModal, closeModal } = useModal()

  const [unRentExecutor, { isLoading: isUnRenting }] = useUnRentExecutorMutation()
  const [getPods, { isLoading: isGettingPods }] = useLazyGetPodsQuery()

  const { setToast } = useContext(ToastContext)

  const { data: podById, isLoading: isGetPodLoading } = useGetPodByIdQuery(id || '')

  const handleDeletePod = (id: string) => {
    openModal({
      name: 'delete-confirmation-modal',
      data: {
        deleteItem: async () => {
          try {
            await unRentExecutor(id).unwrap()
            await getPods().unwrap()

            if (params.id === id) {
              navigate('/pods/create-pod')
            }

            closeModal('delete-confirmation-modal')
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
            })
            closeModal('delete-confirmation-modal')
          }
        },
        label: 'Delete Pod?',
      },
    })
  }

  return {
    handleDeletePod,
    podById,
    pod_is_loading: isGetPodLoading,
    delete_pod_loading: isUnRenting || isGetPodLoading,
  }
}
