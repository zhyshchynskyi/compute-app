import { useContext } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useParams, useNavigate } from 'react-router-dom'
import { useCreateSubnetApiService } from 'services/subnetApiService/useSubnetApiService'
import { SubnetApiServiceInput, SubnetApiVisibilityEnum } from 'types/subnetApiService'
import { ToastContext } from 'contexts'
import { default_icon } from '../components/useForm'

export const validationSchema = yup.object().shape({
  name: yup.string().required('Please enter enter Name'),
  description: yup.string().required('Please enter Description'),
  full_description: yup.string().nullable(),
  icon: yup.string().required('Please enter Icon'),
  price_per_request: yup.number().required('Please enter value (must be a number)'),
  doc_link: yup.string().required('Please enter Doc link'),
})

const useCreateSubnetApi = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { setToast } = useContext(ToastContext)

  const { createSubnetApiService, loading: create_subnet_api_loading } = useCreateSubnetApiService()

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      full_description: '',
      icon: default_icon,
      price_per_request: 0,
      doc_link: '',
      visibility: SubnetApiVisibilityEnum.PRIVATE,
      subnet_id: id,
      category: '',
    },
    validationSchema,
    onSubmit: values => handleSubmit(values),
  })

  async function handleSubmit(values: SubnetApiServiceInput) {
    const result = await createSubnetApiService(values)

    if (result) {
      setToast({
        message: result.message,
        type: result.success ? 'positive' : 'warning',
        open: true,
      })

      if (result.success) {
        navigate(`/subnets/${id}`)
      }
    }
  }

  return {
    formik,
    create_subnet_api_loading,
  }
}

export default useCreateSubnetApi
