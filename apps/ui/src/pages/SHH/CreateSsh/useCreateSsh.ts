import { useFormik } from 'formik'
import * as yup from 'yup'
import { useModal } from 'hooks'
import { useContext } from 'react'
import { ToastContext } from 'contexts'
import { ISshKeyRegisterRequest, useRegisterSshKeyMutation } from 'redux/apis/sshKeyApi'

const validationSchema = yup.object().shape({
  name: yup.string().required('Please enter SSH Name'),
  public_key: yup.string().required('Please enter SSH Key'),
})

const useCreateSsh = () => {
  const { closeModal } = useModal()
  const { setToast } = useContext(ToastContext)

  const [registerSshKey, { isLoading }] = useRegisterSshKeyMutation()

  const formik = useFormik({
    initialValues: {
      name: '',
      public_key: '',
    },
    onSubmit: values => handleSubmit(values),
    validationSchema,
  })

  async function handleSubmit(values: ISshKeyRegisterRequest) {
    try {
      console.log(values)
      await registerSshKey(values).unwrap()

      setToast({
        message: 'SSH key registered',
        type: 'positive',
        open: true,
      })

      closeModal('add-shh-key-modal')
    } catch (error) {
      setToast({
        message: 'Register failed',
        type: 'warning',
        open: true,
      })
    }
  }

  return {
    formik,
    create_shh_loader: isLoading,
  }
}

export default useCreateSsh
