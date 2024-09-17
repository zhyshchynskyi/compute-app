import { useNavigate } from 'react-router-dom'
import { useGetSecrets } from 'services/secret/useSecretService'
import { renderColumns } from './columnConfig'

const useSecret = () => {
    const { data: secrets, loading: fetch_secret_loading } = useGetSecrets()

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
        fetch_secret_loading: fetch_secret_loading
    }
}

export default useSecret