import { useAppModeContext } from 'context/AppModeContext'
import { ToastContext } from 'contexts'
import { useModal } from 'hooks'
import React, { useContext } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import {
  useGetSubnetApiServices,
  useDeleteSubnetApiService,
} from 'services/subnetApiService/useSubnetApiService'
import {
  useCreateAccountSubnetApiService,
  useGetAccountSubnetApiServices,
  useDeleteAccountSubnetApiService,
} from 'services/subnetApiService/useAccountSubnetApiService'
import { renderColumns } from './columnConfig'

const useSubnetApiService = () => {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const { selected_account } = useAppModeContext()
  const { openModal, closeModal } = useModal()
  const { setToast } = useContext(ToastContext)
  const [serviceEnabled, setServiceEnabled] = React.useState<any>({})

  const {
    data: subnet_api_services,
    loading: fetch_subnet_api_services_loading,
    refetch,
  } = useGetSubnetApiServices(id)
  const { deleteSubnetApiService } = useDeleteSubnetApiService()
  const { data: account_subnet_api_services, refetch: refetchAccountSubnetApiServices } =
    useGetAccountSubnetApiServices()
  const { createAccountSubnetApiService, loading: create_account_subnet_api_service_loading } =
    useCreateAccountSubnetApiService()
  const { deleteAccountSubnetApiService, loading: delete_account_subnet_api_service_loading } =
    useDeleteAccountSubnetApiService()

  React.useEffect(() => {
    if (location?.state?.refresh?.subnet_api_services) {
      refetch()
      navigate(location.pathname, { state: {} })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  React.useEffect(() => {
    if (id) {
      refetch()
      refetchAccountSubnetApiServices()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  React.useEffect(() => {
    if (subnet_api_services.length > 0 && account_subnet_api_services.length > 0) {
      const obj: any = {}
      subnet_api_services.map((api: any) => {
        const account_api = account_subnet_api_services.find(
          (account_api: any) => account_api.subnet_api_service_id === api.id,
        )
        if (account_api) {
          obj[api.id] = true
        }
      })
      setServiceEnabled(obj)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subnet_api_services, account_subnet_api_services])

  const handleEditSubnetApiService = (subnet_api_service_id: string) => {
    navigate(`/subnets/${id}/${subnet_api_service_id}`)
  }

  const handleDeleteSubnetApiService = (subnet_api_service_id: string) => {
    openModal({
      name: 'delete-confirmation-modal',
      data: {
        deleteItem: async () => {
          try {
            await deleteSubnetApiService(subnet_api_service_id)
            setToast({
              message: 'Subnet API Service was deleted!',
              type: 'positive',
              open: true,
            })
            refetch()
            closeModal('delete-confirmation-modal')
          } catch (e) {
            setToast({
              message: 'Failed to delete Subnet API Service!',
              type: 'negative',
              open: true,
            })
            closeModal('delete-confirmation-modal')
          }
        },
        label: 'Delete Subnet API Service?',
      },
    })
  }

  const handleToggle = (subnet_api_service_id: string) => {
    if (create_account_subnet_api_service_loading || delete_account_subnet_api_service_loading)
      return
    if (!serviceEnabled[subnet_api_service_id]) {
      createAccountSubnetApiService({ subnet_api_service_id })
      setServiceEnabled({ ...serviceEnabled, [subnet_api_service_id]: true })
    } else {
      const account_subnet_api_service_id = account_subnet_api_services.find(
        (item: any) => item.subnet_api_service_id === subnet_api_service_id,
      )?.id
      deleteAccountSubnetApiService(account_subnet_api_service_id)
      setServiceEnabled({ ...serviceEnabled, [subnet_api_service_id]: false })
    }
  }

  const columns = renderColumns({ handleDeleteSubnetApiService, handleEditSubnetApiService })

  return {
    subnet_api_services,
    fetch_subnet_api_services_loading:
      fetch_subnet_api_services_loading && subnet_api_services?.length === 0,
    account: selected_account,
    handleDeleteSubnetApiService,
    handleEditSubnetApiService,
    columns,
    handleToggle,
    account_subnet_api_services,
    serviceEnabled,
  }
}

export default useSubnetApiService
