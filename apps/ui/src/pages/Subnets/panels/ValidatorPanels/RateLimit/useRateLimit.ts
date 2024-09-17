import { useContext } from 'react'
import { ToastContext } from 'contexts'
import { useModal } from 'hooks'
import { useRateLimits, useDeleteRateLimitService } from 'services/rateLimit/useRateLimitService'
import { columnConfig } from './columnConfig'
import { RateLimit } from 'types/rateLimit'
import { useParams } from 'react-router-dom'

const useRateLimit = () => {
  const { setToast } = useContext(ToastContext)
  const { openModal, closeModal } = useModal()
  const { id } = useParams()
  const { data: rate_limits, loading: rate_limits_loading } = useRateLimits(id)
  const { deleteRateLimit } = useDeleteRateLimitService()

  const handleDelete = (id: string) => {
    openModal({
		name: 'delete-confirmation-modal',
		data: {
			deleteItem: async () => {
				try {
					await deleteRateLimit(id)
	
					closeModal('delete-confirmation-modal')
					setToast({
						message: 'Rate Limit was deleted!',
						type: 'positive',
						open: true,
					})
				} catch (e) {
					setToast({
						message: 'Failed to delete Rate Limit!',
						type: 'negative',
						open: true,
					})
					closeModal('delete-confirmation-modal')
				}
			},
			label: 'Delete Rate Limit?',
		},
    })
  }

  const handleUpdate = (data: RateLimit) => {
	openModal({
		name: 'update-rate-limit-modal',
		data: { rate_limit: data }
	})
  }

  const config = columnConfig({ handleDelete, handleUpdate })

  return {
    rate_limits,
    rate_limits_loading,
    columnConfig: config,
  }
}

export default useRateLimit
