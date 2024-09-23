import { useNavigate } from 'react-router-dom'
import { renderColumns } from './columnConfig'

const useSecret = () => {
  const secrets: any[] = []

  const navigate = useNavigate()

  const handleCreateSecret = () => {
    navigate('/secrets/create-secret')
  }

  const handleOpenSecret = (secret_id: string) => {
    navigate(`/secrets/${secret_id}`)
  }

  const columns = renderColumns({ handleOpenSecret })

  return {
    columns,
    handleCreateSecret,
    secrets: secrets || [],
    fetch_secret_loading: false,
  }
}

export default useSecret
