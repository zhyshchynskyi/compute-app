export enum SubnetApiVisibilityEnum {
    PUBLIC = 'public',
    PRIVATE = 'private',
}

export interface SubnetApiServiceInput {
    name: string
    icon: string
    description: string
    full_description: string
    price_per_request: number | string
    doc_link: string
    visibility: SubnetApiVisibilityEnum
    subnet_id: string | undefined
}

export interface SubnetApiService {
    id: string
    name: string
    icon: string
    description: string
    full_description: string
    price_per_request: number
    doc_link: string
    visibility: 'public' | 'private'
    account_id: string
    created_by: string
    subnet_id: string
    created_on: Date
    modified_on: Date | null
    category: string
    subnet_name: string
}

export interface Subnet {
    id: string
    name: string
    description: string
    logo: string
    order: number
}

export interface SubnetInput {
    name: string
    description: string
    logo: string
}

interface SubnetApiServiceActionReturn {
    message: string
    success: boolean
    subnet_api_service: SubnetApiService
}

export interface UseCreateSubnetApiServiceReturn {
    createSubnetApiService: (
        input: SubnetApiServiceInput,
    ) => Promise<{ createSubnetApiService: SubnetApiServiceActionReturn }>
    loading: boolean
}

export interface UseUpdateSubnetApiServiceReturn {
    updateSubnetApiService: (
        input: SubnetApiServiceInput,
    ) => Promise<{ updateSubnetApiService: SubnetApiServiceActionReturn }>
    loading: boolean
}

export interface UseGetSubnetApiServicesReturn {
    data: SubnetApiService[]
    error: any
    loading: boolean
    refetch: () => void
}

export interface UseGetSubnetApiServiceByIdReturn {
    data: SubnetApiService
    error: any
    loading: boolean
    refetch: () => void
}

export interface UseDeleteSubnetApiServiceReturn {
    deleteSubnetApiService: (
        subnet_api_service_id: string,
    ) => Promise<{ deleteSubnetApiService: SubnetApiServiceActionReturn }>
    loading: boolean
}

export interface UseGetSubnets {
    data: Subnet[]
    error: any
    loading: boolean
    refetch: () => void
}
