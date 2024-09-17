import * as yup from 'yup'
import { useFormik } from 'formik'
import { Credential, CredentialInput } from 'types/credential'
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

export interface ModalProps {
    credential: Pick<Credential, 'credential_name' | 'id'>
}

const useUpdateCredential = ({ credential }: ModalProps) => {
    const { closeModal } = useModal()
    const { setToast } = useContext(ToastContext)
    // const { updateCredential, loading: update_credential_loading } = useUpdateCredentialService()

    const formik = useFormik({
        initialValues: { 
            credential_name: credential.credential_name,
            user_name: '',
            password: '',
        },
        onSubmit: values => handleSubmit(values),
        validationSchema,
    })

    async function handleSubmit(values: CredentialInput) {
        // const result = await updateCredential(credential.id, values);

        // setToast({
        //     message: result?.message ?? 'Something went wrong',
        //     type: result?.success ? 'positive' : 'warning',
        //     open: true,
        // })

        // if(result) {
        //     closeModal('update-credential-modal')
        // }

    }

    return {
        formik,
        update_credential_loading: false,
        closeModal
    }
}

export default useUpdateCredential