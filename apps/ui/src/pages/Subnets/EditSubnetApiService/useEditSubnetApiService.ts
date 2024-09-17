import { useFormik } from 'formik'
import * as yup from 'yup'
import { useParams, useNavigate } from 'react-router-dom'
import {
    useUpdateSubnetApiService,
    useGetSubnetApiServiceById,
} from 'services/subnetApiService/useSubnetApiService'
import { SubnetApiServiceInput, SubnetApiVisibilityEnum } from 'types/subnetApiService'
import { useContext } from 'react'
import { ToastContext } from 'contexts'
import { default_icon } from '../components/useForm'

export const validationSchema = yup.object().shape({
    name: yup.string().required('Please enter enter Name'),
    description: yup.string().required('Please enter Description'),
    full_description: yup.string().nullable(),
    icon: yup.string().required('Please enter Icon'),
    price_per_request: yup.number().required('Please enter Price per request'),
    doc_link: yup.string().required('Please enter Doc link'),
})

const useEditSubnetApiService = () => {
    const { id, subnet_api_service_id } = useParams()

    const navigate = useNavigate()
    const { setToast } = useContext(ToastContext)

    const { updateSubnetApiService, loading: update_subnet_api_loading } =
        useUpdateSubnetApiService()
    const { data: subnet_api_service, loading: service_is_loading } =
        useGetSubnetApiServiceById(subnet_api_service_id)

    const initialValues = {
        name: subnet_api_service?.name || '',
        description: subnet_api_service?.description || '',
        full_description: subnet_api_service?.full_description || '',
        icon: subnet_api_service?.icon || default_icon,
        price_per_request: subnet_api_service?.price_per_request || 0,
        doc_link: subnet_api_service?.doc_link || '',
        visibility:
            (subnet_api_service?.visibility as SubnetApiVisibilityEnum.PRIVATE) ||
            SubnetApiVisibilityEnum.PRIVATE,
        subnet_id: subnet_api_service?.subnet_id || '',
        category: subnet_api_service?.category || '',
    }

    const formik = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,
        validationSchema,
        onSubmit: values => handleSubmit(values),
    })

    async function handleSubmit(values: SubnetApiServiceInput) {
        const result = await updateSubnetApiService(subnet_api_service.id, values)

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
        update_subnet_api_loading,
        service_is_loading: service_is_loading && !subnet_api_service?.id,
    }
}

export default useEditSubnetApiService
