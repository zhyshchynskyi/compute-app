import { useFormik } from 'formik'
import * as yup from 'yup'
import { useCreateSecretService } from 'services/Ssh/useSshService'
import { SSHInput } from 'types/ssh'
import { useModal } from 'hooks'
import { useContext } from 'react'
import { ToastContext } from 'contexts'

const validationSchema = yup.object().shape({
  name: yup.string().required('Please enter SSH Name'),
  key: yup.string().required('Please enter SSH Key'),
})

const useCreateSsh = () => {
  const { closeModal } = useModal()
  const { setToast } = useContext(ToastContext)
  const { createSsh, loading: create_shh_loader } = useCreateSecretService()

  const formik = useFormik({
    initialValues: {
      name: '',
      key: '',
    },
    onSubmit: values => handleSubmit(values),
    validationSchema,
  })

  async function handleSubmit(values: SSHInput) {
    const result = await createSsh(values)

    if (result) {
      setToast({
        message: result.message,
        type: result.success ? 'positive' : 'warning',
        open: true,
      })

      if (result.success) {
        closeModal('add-shh-key-modal')
      }
    }
  }

  return {
    formik,
    create_shh_loader,
  }
}

export default useCreateSsh
