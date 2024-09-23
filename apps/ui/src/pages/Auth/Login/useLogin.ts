import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { useLoginMutation } from 'redux/apis/userApi'

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Please enter Email address'),
  password: Yup.string().required('Please enter your password'),
  // .matches(
  //   /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
  //   "Password must contain at least 8 characters, one uppercase, one number and one special case character.",
  // ),
})

const initialValues = {
  email: '',
  password: '',
}

const useLogin = () => {
  const [alertMessage, setAlertMessage] = React.useState({
    type: '',
    message: '',
  })
  const [showResendAlert, setShowResendAlert] = React.useState(false)
  const [login, { isLoading }] = useLoginMutation()
  const navigate = useNavigate()

  const formik: any = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: async values => {
      try {
        const response = await login({
          email: values.email,
          password: values.password,
        }).unwrap()

        if (response) {
          setAlertMessage({ type: 'success', message: 'You logged in' })

          return setTimeout(() => {
            navigate('/')
          }, 100)
        }

        setAlertMessage({ type: 'danger', message: 'Login error' })
      } catch (error) {
        console.log(error)
        setAlertMessage({ type: 'danger', message: 'Login error' })
      }
    },
  })

  const resendVerifyEmailHandle = async () => {
    // const { success, message } = await resendVerifyEmail(formik.values.email)
    // setAlertMessage({ type: success ? 'success' : 'danger', message })
    // if (success) {
    //   setShowResendAlert(false)
    // }
  }

  const handleCloseAlert = () => {
    setAlertMessage({
      type: '',
      message: '',
    })
  }

  return {
    formik,
    alertMessage,
    showResendAlert,
    resendVerifyEmailHandle,
    handleCloseAlert,
    authLoginCompleteLoading: isLoading,
    activateAccountLoading: false,
    resendVerifyEmailLoading: false,
  }
}

export default useLogin
