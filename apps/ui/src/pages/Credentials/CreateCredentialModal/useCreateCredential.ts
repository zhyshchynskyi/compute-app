import * as yup from 'yup'
import { useFormik } from 'formik'
import { CredentialInput } from 'types/credential'
import { useContext } from 'react'
import { ToastContext } from 'contexts'
import { useModal } from 'hooks'

const validationSchema = yup.object().shape({
    credential_name: yup
        .string()
        .required('Please enter Credential Name'),
    user_name: yup
        .string()
        .required('Please enter User Name'),
    password: yup
        .string()
        .required('Please enter Password'),
})

const useCreateCredential = () => {
    const { closeModal } = useModal()
    const { setToast } = useContext(ToastContext)
    // const { createCredential, loading: create_credential_loading } = useCreateCredentialService()

    const formik = useFormik({
        initialValues: { 
            credential_name: '',
            user_name: '',
            password: '',
        },
        onSubmit: values => handleSubmit(values),
        validationSchema,
    })

    async function handleSubmit(values: CredentialInput) {
        // const result = await createCredential(values)

        // setToast({
        //     message: result?.message ?? 'Something went wrong',
        //     type: result?.success ? 'positive' : 'warning',
        //     open: true,
        // })

        // if(result?.success) {
        //     closeModal('create-credential-modal')
        // }
        closeModal('create-credential-modal')
    }

    return {
        formik,
        create_credential_loading: false,
        closeModal
    }
}

export default useCreateCredential