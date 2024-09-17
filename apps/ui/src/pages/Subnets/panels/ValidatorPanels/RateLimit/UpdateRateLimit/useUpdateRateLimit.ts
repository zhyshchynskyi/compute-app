import { ToastContext } from 'contexts'
import { useModal } from 'hooks'
import { useContext } from 'react'
import {
  useGetSubnetApiServices,
  useGetSubnets,
} from 'services/subnetApiService/useSubnetApiService'
import { RateLimit, RateLimitInput } from 'types/rateLimit'
import { useUpdateRateLimitService } from 'services/rateLimit/useRateLimitService'
import { useFormik } from 'formik'
import { useParams } from 'react-router-dom'
import { rateLimitValidationSchema } from '../CreateRateLimit/useCreateRateLimit'

const useUpdateRateLimit = (rate_limit: RateLimit) => {
  const { closeModal } = useModal()
  const { id } = useParams()
  const { setToast } = useContext(ToastContext)
  const { data: subnets } = useGetSubnets()
  const { data: subnet_api_services } = useGetSubnetApiServices(id)
  const { updateRateLimit, loading: update_rate_limit_loading } = useUpdateRateLimitService()

  const subnet = subnets?.find(subnet => subnet.id === id)

  const formik = useFormik({
    initialValues: {
      per_hour: rate_limit.per_hour,
      per_day: rate_limit.per_day,
      per_month: rate_limit.per_month,
      monthly_usage_limit: rate_limit.monthly_usage_limit,
      account_level: rate_limit.account_level,
      subnet_id: subnet?.id,
      subnet_api_service_id: rate_limit.subnet_api_service_id,
    },
    enableReinitialize: true,
    onSubmit: values => handleSubmit(values),
    validationSchema: rateLimitValidationSchema,
  })

  async function handleSubmit(values: RateLimitInput) {
    const { subnet_api_service_id } = values
    const data = {
      ...values,
      subnet_api_service_id: subnet_api_service_id?.length === 0 ? null : subnet_api_service_id,
    }
    const result = await updateRateLimit(rate_limit.id, data)

    if (result) {
      setToast({
        message: result.message,
        type: result.success ? 'positive' : 'warning',
        open: true,
      })
    }

    closeModal('update-rate-limit-modal')
  }

  const handleCloseModal = () => {
    closeModal('update-rate-limit-modal')
  }

  return {
    formik,
    handleCloseModal,
    update_rate_limit_loading,
    subnets: [{ label: subnet?.name, value: subnet?.id }],
    subnet_api_services: subnet_api_services.map(api => ({ label: api.name, value: api.id })),
  }
}

export default useUpdateRateLimit
