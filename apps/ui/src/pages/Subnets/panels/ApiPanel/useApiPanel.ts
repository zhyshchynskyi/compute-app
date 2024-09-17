import { useContext } from 'react'
import { useModal } from 'hooks'

import { ToastContext } from 'contexts'
import { useParams } from 'react-router-dom'

const useApiPanel = () => {
    const { id } = useParams()
    const { openModal, closeModal } = useModal()
    const { setToast } = useContext(ToastContext)

    // const {
    //     data: apiKeys,
    //     refetch: apiKeyRefetch,
    //     loading: api_keys_loading,
    // } = useApiKeysBySubnetService({ id: id || '' })
    // const { deleteApiKeyById } = useDeleteApiKeyByIdService()

    const handleDeleteApiKey = async (id: string) => {
        openModal({
            name: 'delete-confirmation-modal',
            data: {
                deleteItem: async () => {
                    try {
                        // await deleteApiKeyById(id)
                        // apiKeyRefetch()
                        closeModal('delete-confirmation-modal')
                        setToast({
                            message: 'API Key was deleted!',
                            type: 'positive',
                            open: true,
                        })
                    } catch (e) {
                        setToast({
                            message: 'Failed to delete API Key!',
                            type: 'negative',
                            open: true,
                        })
                        closeModal('delete-confirmation-modal')
                    }
                },
                label: 'Delete API Key?',
            },
        })
    }

    return {
        apiKeys: [],
        handleDeleteApiKey,
        api_keys_loading: false,
    }
}

export default useApiPanel
