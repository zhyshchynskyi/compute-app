import { useParams } from 'react-router-dom'
import { usePodById, useUpdatePodService } from 'apis/pod/usePodService'
import { useFormik } from 'formik'

import { ToastContext } from 'contexts'
import { useContext } from 'react'

import * as yup from 'yup'

const podTemplateValidationSchema = yup.object().shape({
  template_config: yup.object().shape({
    template_data: yup.object().shape({
      container_image: yup.string().required('Please enter container image'),
      volume_disk: yup.number().nullable(),
      container_disk: yup.number().nullable(),
    }),
  }),
})

export const useSettings = () => {
  const { setToast } = useContext(ToastContext)

  const { id } = useParams()

  const { data: podById, refetch } = usePodById(id || '')
  const { updatePod, loading: update_pod_loading } = useUpdatePodService()

  const initialValues = {
    pod_name: podById?.pod_name || '',
    status: podById?.status || '',
    provider: podById?.provider || '',
    category: podById?.category || '',
    type: podById?.type || '',
    resource: podById?.resource || '',
    isinstance_pricing: podById?.isinstance_pricing || [],
    template: podById?.template_config?.template_data?.id || '',
    template_config: podById?.template_config || {},
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: podTemplateValidationSchema,
    enableReinitialize: true,
    onSubmit: values => handleSubmit(values),
  })

  async function handleSubmit(values: any) {
    try {
      const result = await updatePod(id, values)

      if (result) {
        await refetch()
        setToast({
          message: result.message,
          type: result.success ? 'positive' : 'warning',
          open: true,
        })
      }
    } catch (e: any) {
      setToast({
        message: e.message,
        type: 'negative',
        open: true,
      })
    }
  }

  return {
    podById,
    formik,
    update_pod_loading,
  }
}
