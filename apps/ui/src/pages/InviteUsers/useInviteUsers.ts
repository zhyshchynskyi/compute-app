import * as yup from 'yup'

import { useFormik } from 'formik'
import React, { useContext } from 'react'
import { ToastContext } from 'contexts'

import { renderColumns } from './columnConfig'
import { useModal } from 'hooks'
import { useGetAccounts } from 'apis/account/useAccountService'

const validationSchema = yup.object().shape({
    email: yup
        .string()
        .email('Invalid email')
        .required('Please use a valid email format. Example - user@l3agi.com'),
})

const useInviteUsers = () => {
    const { closeModal } = useModal()
    const { setToast } = useContext(ToastContext)

    const [deleting_id, setDeletingId] = React.useState<string>('')

    // const { data, loading: fetch_data_loading, refetch } = useGetUserAccess()
    // const { createUserAccess, loading: create_access_loading } = useCreateUserAccessService()
    // const { data: accounts } = useGetAccounts()
    // const { deleteUserAccess: deleteUserAccessService, loading: deleting_loading } =
    //     useDeleteUserAccessService()

    const data: any[] = []
    const accounts: any[] = []
    const fetch_data_loading = false
    const create_access_loading = false
    const deleting_loading = false
    
    const tableData = data?.map((item: any) => {
        const account = accounts?.find((acc: any) => acc.id === item.account_id)
        return {
            ...item,
            app: account ? account.name : 'N/A',
            app_type: account ? account.account_type : 'N/A',
        }
    })

    const formik = useFormik({
        initialValues: { email: '' },
        onSubmit: values => handleSubmit(values),
        validationSchema,
    })

    async function handleSubmit(values: { email: string }) {
        // const result = await createUserAccess(values.email)
        // refetch()
        // if (result) {
        //     setToast({
        //         message: result.message,
        //         type: result.success ? 'positive' : 'warning',
        //         open: true,
        //     })

        //     handleCloseModal()
        // }
    }

    const deleteUserAccess = async (id: string) => {
        setDeletingId(id)
        // const result = await deleteUserAccessService(id)
        // if (result) {
        //     if (result.success) {
        //         refetch()
        //     }
        //     setToast({
        //         message: result.message,
        //         type: result.success ? 'positive' : 'warning',
        //         open: true,
        //     })
        // }
    }

    const columns = renderColumns({
        deleteUserAccess,
        deleting_loading: { loading: deleting_loading, id: deleting_id },
    })

    const handleCloseModal = () => {
        closeModal('invite-user-modal')
    }

    return {
        data: tableData,
        fetch_data_loading,
        create_access_loading,
        formik,
        deleteUserAccess,
        columns,
        handleCloseModal,
    }
}

export default useInviteUsers
