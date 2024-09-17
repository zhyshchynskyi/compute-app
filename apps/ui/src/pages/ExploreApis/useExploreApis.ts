import { useModal } from 'hooks'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SubnetApiService } from 'types/subnetApiService'

const useFilteredData = (subnet_apis: SubnetApiService[] | undefined, searchTerm: string) => {
    return useMemo(() => {
        if (!subnet_apis || subnet_apis.length === 0) return []
        const lowercasedSearchTerm = searchTerm.toLowerCase()
        return subnet_apis.filter(api => api.name.toLowerCase().includes(lowercasedSearchTerm))
    }, [subnet_apis, searchTerm])
}

const useExploreApis = () => {
    const navigate = useNavigate()
    const { openModal } = useModal()
    const [searchTerm, setSearchTerm] = useState<string>('')

    // const { data: subnet_apis, loading: subnet_apis_loading } = useApiServices()
    const subnet_apis: any[] = []
    const subnet_apis_loading = false

    const handleSearchChange = (value: string) => {
        setSearchTerm(value)
    }

    const data = useFilteredData(subnet_apis, searchTerm)

    return {
        searchTerm,
        handleSearchChange,
        subnet_apis_loading,
        filtered_data: data,
        subnet_apis,
        openModal,
        navigate,
    }
}

export default useExploreApis
