import { useAppModeContext } from 'context/AppModeContext'
import { AuthContext, ToastContext } from 'contexts'
import { useFormik } from 'formik'
import React, { useContext } from 'react'

import { accountTypeEnum } from 'types/account'
import * as yup from 'yup'

export type ModeOptionsType = {
    type: accountTypeEnum
    name: string
    description: string
    disabled: boolean
}

export const MODE_OPTIONS: ModeOptionsType[] = [
    {
        type: accountTypeEnum.Subnet_api,
        name: 'Subnet API',
        description: 'I want to use subnets APIs',
        disabled: false,
    },
    {
        type: accountTypeEnum.Validation,
        name: 'Validator',
        description: 'I want to register as Bittensor Validator and add my services',
        disabled: false,
    },
    {
        type: accountTypeEnum.Compute,
        name: 'Compute',
        description: 'I want to use Compute service',
        disabled: false,
    },
]

const appValidationSchema = yup.object().shape({
    name: yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Please enter app name'),
})

const useCreateNewApp = ({ isEdit }: { isEdit?: boolean }) => {
    const { user } = useContext(AuthContext)

    const [step, setStep] = React.useState(1)
    const [created, setCreated] = React.useState(false)

    const [createdData, setCreatedData] = React.useState<any>(null)

    const { switchAccountMode } = useAppModeContext()

    // const { createAccount, loading: create_account_loading } = useCreateAccountService()
    // const { updateAccountType, loading: update_account_loading } = useUpdateAccountTypeService()

    const { setToast } = useContext(ToastContext)

    const createInitialValues = {
        name: '',
        configs: MODE_OPTIONS[0],
    }

    const editInitialValues = {
        name: user?.name || '',
        configs: MODE_OPTIONS[0],
    }

    const formik = useFormik({
        initialValues: isEdit ? editInitialValues : createInitialValues,

        onSubmit: values => handleSubmit(values),
        validationSchema: appValidationSchema,
    })

    async function handleSubmit(values: any) {
        if (isEdit) {
            const data = {
                name: values.name,
                account_type: values.configs.type,
            }

            // const result = await updateAccountType({ account_type: data.account_type })
            // await client.refetchQueries({ include: ['account'] })
            // await client.refetchQueries({ include: ['getAccounts'] })

            // if (result) {
            //     setToast({
            //         message: result.message,
            //         type: result.success ? 'positive' : 'warning',
            //         open: true,
            //     })
            //     switchAccountMode(result.account)
            // }
        } else {
            const data = {
                name: values.name,
                account_type: values.configs.type,
            }

            // const result = await createAccount(data)
            // client.refetchQueries({ include: ['getAccounts'] })

            // if (result) {
            //     setCreatedData(result.account)
            //     setToast({
            //         message: result.message,
            //         type: result.success ? 'positive' : 'warning',
            //         open: true,
            //     })
            // }

            setCreated(true)
            // navigate(`/`, { state: { need_refetch: true } })
            setStep(step + 1)
        }
    }

    const handleSetStep = (active_step: number) => {
        if (active_step === 1) {
            setStep(active_step)
        }
        if (active_step === 2 && formik.values.configs?.type) {
            setStep(active_step)
            return
        }

        if (active_step === 3 && formik.values.name) {
            if (active_step === 3 && !created) {
                formik.submitForm()
                return
            }
            setStep(active_step)
            return
        }
    }

    const handleSwitchToAccount = () => {
        if (createdData) {
            switchAccountMode(createdData)
        }
    }

    return {
        formik,
        step,
        handleSetStep,
        create_account_loading: false,
        handleSwitchToAccount,
    }
}

export default useCreateNewApp
