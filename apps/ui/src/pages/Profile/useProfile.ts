import { useAppModeContext } from 'context/AppModeContext'
import { AuthContext, ToastContext } from 'contexts'
import { useModal } from 'hooks'
import { useContext } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'

export const useProfile = () => {
    const navigate = useNavigate()
    const { account, user } = useContext(AuthContext)
    const { setToast } = useContext(ToastContext)
    const { openModal, closeModal } = useModal()
    // const { deleteAccount, loading: delete_loader } = useDeleteAccountService()
    // const { updateUser } = useUpdateUserService()

    const { accounts, switchAccountMode } = useAppModeContext()

    const handleDelete = async () => {
        if (accounts?.length === 1) {
            return setToast({
                message: 'You cant Delete your only account!',
                type: 'warning',
                open: true,
            })
        } else {
            if (accounts?.[0]?.id === account?.id) {
                switchAccountMode(accounts?.[1], true)
            } else {
                switchAccountMode(accounts?.[0], true)
            }
        }

        navigate('/create-new-app')
        // await deleteAccount()
    }

    const handleDeleteAccount = () => {
        openModal({
            name: 'delete-confirmation-modal',
            data: {
                deleteItem: async () => {
                    try {
                        await handleDelete()
                        setToast({
                            message: 'Account was Deleted!',
                            type: 'positive',
                            open: true,
                        })
                    } catch (e) {
                        setToast({
                            message: 'Delete Failed!',
                            type: 'negative',
                            open: true,
                        })
                    }
                    closeModal('delete-confirmation-modal')
                },
                label: `Delete account ${account?.name}?`,
            },
        })
    }

    const formik = useFormik({
        initialValues: {
            name: user.name,
            company_name: account?.name,
            email: user.email,
            avatar: user.avatar,
            account_type: account?.accountType,
        },
        // validationSchema: templateValidationSchema,
        enableReinitialize: true,
        onSubmit: values => handleSubmit(values),
    })

    async function handleSubmit(values: { name: string; avatar: string }) {
        const user = {
            name: values.name,
            avatar: values.avatar,
        }
        // const result = await updateUser(user)

        // if (result) {
        //     setToast({
        //         message: result.message,
        //         type: result.success ? 'positive' : 'warning',
        //         open: true,
        //     })
        // }
    }

    return {
        delete_loader: false,
        handleDeleteAccount,
        account: account,
        user: user,
        formik,
    }
}

const passwordValidationSchema = yup.object().shape({
    new_password: yup
        .string()
        .required('Please enter New Password')
        .min(8, 'Password must be at least 8 characters long')
        .matches(
            /^(?=.*[0-9])(?=.*[-_]).{8,}$/,
            'Password must include at least one number and either a hyphen (-) or an underscore (_)',
        ),
    confirm_password: yup
        .string()
        .required('Please enter Confirm Password')
        .oneOf([yup.ref('new_password'), null], 'Passwords must match'),
})

export const useUpdatePassword = () => {
    // const { updatePassword } = useUpdateUserPassword()
    const { setToast } = useContext(ToastContext)

    const formik = useFormik({
        initialValues: {
            new_password: '',
            confirm_password: '',
        },
        validationSchema: passwordValidationSchema,
        enableReinitialize: true,
        onSubmit: values => handleSubmit(values),
    })

    async function handleSubmit(values: { new_password: string; confirm_password: string }) {
        // const result = await updatePassword({ password: values.confirm_password })

        // if (result) {
        //     setToast({
        //         message: result.message,
        //         type: result.success ? 'positive' : 'warning',
        //         open: true,
        //     })

        //     formik.resetForm()
        // }
    }

    return { formik }
}
