import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { ToastContext } from 'contexts'
import { useFormik } from 'formik'
import { useSubnetById, useUpdateSubnet } from 'services/subnetApiService/useSubnetApiService'
import { SubnetInput } from 'types/subnetApiService'

export const useSettingsPanel = () => {
  const { id } = useParams()
  const { setToast } = useContext(ToastContext)

  const { data: subnet } = useSubnetById(id)
  const { updateSubnet, loading: subnet_update_loading } = useUpdateSubnet()

  const formik = useFormik({
    initialValues: {
      name: subnet?.name || '',
      description: subnet?.description || '',
      logo: subnet?.logo || '',
    },
    // validationSchema: templateValidationSchema,
    enableReinitialize: true,
    onSubmit: values => handleSubmit(values),
  })

  async function handleSubmit(values: SubnetInput) {
    const data = {
      ...values,
    }
    const result = await updateSubnet(subnet.id, data)

    if (result) {
      setToast({
        message: result.message,
        type: result.success ? 'positive' : 'warning',
        open: true,
      })
    }
  }

  return {
    formik,
    subnet_update_loading,
  }
}
