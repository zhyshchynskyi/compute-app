import { useFormik } from 'formik'
import { useModal } from 'hooks'
import { useParams } from 'react-router-dom'
import { useContext } from 'react'
import { ToastContext } from 'contexts'
import { RateLimitAccountLevelEnum, RateLimitInput } from 'types/rateLimit'
import {
  useGetSubnets,
  useGetSubnetApiServices,
} from 'services/subnetApiService/useSubnetApiService'
import { useCreateRateLimitService } from 'services/rateLimit/useRateLimitService'

import * as yup from 'yup'

export const rateLimitValidationSchema = yup.object().shape({
  per_hour: yup
    .number()
    .typeError('Per hour limit must be a number')
    .required('Per hour limit is required'),
  per_day: yup
    .number()
    .typeError('Per day limit must be a number')
    .required('Per day limit is required'),
  per_month: yup
    .number()
    .typeError('Per month limit must be a number')
    .required('Per month limit is required'),
  // subnet_api_service_id: yup.string().required('Subnet API Service is required'),
})

const useCreateRateLimit = () => {
  const { closeModal } = useModal()
  const { id } = useParams()
  const { setToast } = useContext(ToastContext)

  const { data: subnets } = useGetSubnets()
  const { data: subnet_api_services } = useGetSubnetApiServices(id)
  const { createRateLimit, loading: create_rate_limit_loading } = useCreateRateLimitService(id)

  const subnet = subnets?.find(subnet => subnet.id === id)

  const formik = useFormik({
    initialValues: {
      per_hour: 0,
      per_day: 0,
      per_month: 0,
      monthly_usage_limit: 0,
      account_level: RateLimitAccountLevelEnum.Starter,
      subnet_id: subnet?.id,
      subnet_api_service_id: null,
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
    const result = await createRateLimit(data)

    if (result) {
      setToast({
        message: result.message,
        type: result.success ? 'positive' : 'warning',
        open: true,
      })
    }

    handleCloseModal()
  }

  const handleCloseModal = () => {
    closeModal('create-rate-limit-modal')
  }

  return {
    formik,
    handleCloseModal,
    create_rate_limit_loading,
    subnets: [{ label: subnet?.name, value: subnet?.id }],
    subnet_api_services: subnet_api_services.map(api => ({ label: api.name, value: api.id })),
  }
}

export default useCreateRateLimit
