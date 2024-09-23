import { AuthContext } from 'contexts'
import { useFormik } from 'formik'
import { useModal } from 'hooks'
import React, { useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const usePayment = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useContext(AuthContext)
  const [amount, setAmount] = React.useState('25')
  const { openModal } = useModal()

  // const { payWithCard } = usePayWithCardService()
  // const { createCustomer } = useCreateCustomerService()
  // const { createCard } = useAddCardService()
  // const { removePaymentCard } = useRemovePaymentCardService()
  // const { data: balance } = useGetBalanceService()
  // const { finishSetup } = useFinishSetupService()
  // const { data: auto_pay_settings } = useAutoPaySettingsService()
  // const { updateAutoPaySettings } = useUpdateAutoPaySettingsService()
  const balance = 0

  const is_card_added = false
  const sessionId = new URLSearchParams(location.search).get('session_id')
  const cardSessionId = new URLSearchParams(location.search).get('card_session_id')

  const getCustomerId = async () => {
    return 'customer_id'
  }

  const payWithCardHandler = async () => {
    const customer_id = await getCustomerId()
    // const result = await payWithCard(customer_id, Number(amount), 'usd')
    // window.open(result.checkout_url, '_blank')
  }

  const addCardHandler = async () => {
    const customer_id = await getCustomerId()
    // const result = await createCard(customer_id)
    // window.open(result.url, '_blank')
  }

  const removeCardHandler = async () => {
    const customer_id: string = await getCustomerId()
    const payment_method_id = ''
    if (payment_method_id) {
      // await removePaymentCard(customer_id, payment_method_id)
      // client.refetchQueries({
      //     include: ['account'],
      // })
    }
  }

  const finishSetupHandler = async () => {
    if (!is_card_added) {
      const customer_id = await getCustomerId()
      // await finishSetup(customer_id)
      // client.refetchQueries({
      //     include: ['account'],
      // })
    }
  }

  React.useEffect(() => {
    if (cardSessionId) {
      finishSetupHandler()
      navigate(`/billing`)
      openModal({ name: 'success-payment-modal' })
    }

    if (sessionId) {
      navigate(`/billing`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId, cardSessionId])

  const formik = useFormik({
    initialValues: {
      // auto_pay_threshold: auto_pay_settings?.auto_pay_threshold,
      // auto_pay_amount: auto_pay_settings?.auto_pay_amount,
      auto_pay_threshold: 0,
      auto_pay_amount: 0,
    },
    enableReinitialize: true,
    // validationSchema: templateValidationSchema,
    onSubmit: values => handleSubmit(values),
  })

  async function handleSubmit(values: { auto_pay_threshold: number; auto_pay_amount: number }) {
    // updateAutoPaySettings({
    //     auto_pay_threshold: Number(values.auto_pay_threshold),
    //     auto_pay_amount: Number(values.auto_pay_amount),
    // })
  }

  return {
    payWithCardHandler,
    addCardHandler,
    balance,
    removePaymentCard: removeCardHandler,
    is_card_added,
    amount,
    setAmount,
    formik,
  }
}

export default usePayment
