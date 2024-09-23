import { useContext } from 'react'
import { ToastContext } from 'contexts'
import { useFormik } from 'formik'
import { useParams } from 'react-router-dom'
import { TemplateInput } from 'types/template'

import { Credential } from 'types/credential'
import { templateValidationSchema } from '../CreateTemplate/useCreateTemplate'

const data = {
  name: 'GPU template',
  description: '',
  template_visibility: 'public',
  template_type: 'pod',
  compute_type: 'nvidia gpu',
  container_start_command: '',
  container_image: '',
  container_disk: 5,
  volume_disk: 0,
  volume_mount_path: '',
  expose_http_ports: '',
  expose_tcp_ports: '',
  credential: null,
  environment_variables: {
    env: [],
  },
}

const useEditTemplate = () => {
  const { setToast } = useContext(ToastContext)

  const { id } = useParams()

  // const { data, loading: template_loading, refetch: refetchTemplate } = useTemplateById(id)
  // const { updateTemplate, loading: update_template_loading } = useUpdateTemplateService()
  // const { data: credentials } = useGetCredentials()

  const credentials: any = []

  const initialValues: TemplateInput = {
    name: data?.name || '',
    description: data?.description || '',
    template_visibility: data?.template_visibility || 'private',
    template_type: data?.template_type || 'pod',
    compute_type: data?.compute_type || 'nvidia gpu',
    container_start_command: data?.container_start_command || '',
    container_image: data?.container_image || '',
    container_disk: data?.container_disk || 5,
    volume_disk: data?.volume_disk || 0,
    volume_mount_path: data?.volume_mount_path || '',
    expose_http_ports: data?.expose_http_ports || '',
    expose_tcp_ports: data?.expose_tcp_ports || '',
    credential: data?.credential || null,
    environment_variables: {
      env: data?.environment_variables?.env || [],
    },
  }

  const formik = useFormik({
    initialValues: {
      ...initialValues,
    },
    validationSchema: templateValidationSchema,
    enableReinitialize: true,
    onSubmit: values => handleSubmit(values),
  })

  async function handleSubmit(values: TemplateInput) {
    const data = {
      ...values,
      credential: values.credential?.length === 0 ? null : values.credential,
      environment_variables: {
        env: values?.environment_variables?.env?.filter(i => i.key && i.value) || [],
      },
    }
    // const result = await updateTemplate(id, data)
    // await refetchTemplate()

    // if (result) {
    //   setToast({
    //     message: result.message,
    //     type: result.success ? 'positive' : 'warning',
    //     open: true,
    //   })
    // }
  }

  const credentialsList = credentials.map((item: Credential) => ({
    label: item.credential_name,
    value: item.id,
  }))

  return {
    formik,
    update_template_loading: false,
    credentials: credentialsList,
    templateIsLoading: false,
  }
}

export default useEditTemplate
