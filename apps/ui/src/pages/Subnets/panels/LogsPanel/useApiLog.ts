import { useState } from 'react'
import { useParams } from 'react-router-dom'
import useApiPanel from '../ApiPanel/useApiPanel'
export const enum MethodEnum {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
}

interface FilterProps {
    start_date?: string | null
    end_date?: string | null
    limit: number
    method?: MethodEnum | null
    status_code?: string | null
    page: number
    active?: boolean
}

export const formatDate = (dateString: Date) => {
    const date = new Date(dateString)
    const options: Intl.DateTimeFormatOptions = {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
    }
    return new Intl.DateTimeFormat('en-US', options).format(date)
}

export const generateSubnetApiLogsUrl = (filter: FilterProps) => {
    const queryParams = new URLSearchParams()

    if (filter.start_date) queryParams.append('start_date', filter.start_date)
    if (filter.end_date) queryParams.append('end_date', filter.end_date)
    if (filter.limit) queryParams.append('limit', filter.limit.toString())
    if (filter.method) queryParams.append('method', filter.method)
    if (filter.status_code) queryParams.append('status_code', filter.status_code)
    if (filter.page) queryParams.append('page', filter.page.toString())
    if (filter.active !== undefined) queryParams.append('active', filter.active.toString())

    return `${queryParams.toString()}`
}

const getTotalPages = (limit: number, total_count: number) =>
    total_count > limit ? Math.ceil(total_count / limit) : null

const default_filter = {
    start_date: null,
    end_date: null,
    method: null,
    status_code: null,
    page: 1,
    limit: 20,
}

const useApiLog = () => {
    const { id } = useParams()
    const [filter, setFilter] = useState<FilterProps>(default_filter)
    const url = generateSubnetApiLogsUrl(filter)
    // const { data: log_data, loading: fetch_logs_loading } = useSubnetApiLog(id, url)
    const { apiKeys } = useApiPanel()

    // const { items, total_count } = log_data
    const items: any[] = []
    const total_count = 0

    const logs = items?.map(log => {
        const token = log.request_headers?.authorization?.startsWith('Bearer ') 
            ? log.request_headers?.authorization.split(' ')[1] 
            : null
        const apiKeyName = apiKeys?.find(apiKey => 
            token && apiKey.token && token.startsWith(apiKey.token.slice(0, 10))
        )?.name || null

        return {
            ...log,
            created_on: formatDate(log.created_on),
            name: log.service_name,
            icon: log.service_icon ||
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKcAAACUCAMAAADBJsndAAAAY1BMVEX///8AAAD5+fnX19c/Pz9ERETf398GBgZiYmKqqqra2tqkpKR2dnb09PRzc3Pv7+9paWlNTU3MzMyXl5fFxcW8vLyLi4vm5uY6OjovLy9UVFQqKiq0tLSCgoJZWVkhISEVFRUKBiJ8AAAD2ElEQVR4nO2c2ZKqMBBAJdGAArKDC6D//5XXkWUQooQkHZlbfV6nAqckS3cnmc0GQRAEQRAEQRAE+d/wiwOF41D4OiRJ6nr1bgvHrvbclKhqZs7ZguccZmqajgHJhlDB8nAypmlZJyatGRnUtKzoIKcZmPvoDU4g5ZkY1rSsREaz6Jt7jEDCjv2bZH7QsG0bSfdvYVg3EI4SjdumF3jNh+ilfdvypmnT8KY4AQuS3ZrXxYtb5k1DB0CKA6llR1LbuXMAKR6VbAdtJk97D+DEw208l6+e3/Fc3s3Qkwt66gU99YKeeoH19AMtufcG1LPI3OroJaVkWvMKmCdxa7t5dpQUSopPoDz9qLX8YUfVJDdgnsXVemF5fDsCxjO4WCPkUlpoz2nKrFJ2AfNk00LJLV2hZzbRVE5QIDxJzvGULLpAenILT4pzE4jnZLQ/2KpNTSCe9d/4PX2P41mrLZ4g473keFaiD+ZvGYB4xtO9hbtAoEoKGu+TPHEzysazA4gnqSae0WwgGpT5b+xy8vav/Rlm3aSTDYa55ShwHfu1xbYazhBA8dJ4RZpbjdLdyPKHa/7bV6Hiz+w+eKE9Vw48TiWf3PtcACyep+Gts6xnarkFb75t6b49XH7kZ0l9up4vVTkzczLe8tVxjqE9HxSUUja3hcoJAod4BN5ThGBm79HzV+FZfFBckSed3RVfhWe8ndNchWcssC++Ak96++Bn1JP4QeC/m5hiAUsTnuSQVvXuFHkl5eVwLyvrFz1p3ve++7Gc/Lm8crWMeyYvY8SuRounqCa05yQCuryUQXmZyUfPuIn7hLMXMU+fk8GfB2HvXliz82yOJZyXl6c/eRYh743XTpS44pq9J8md2pMoTX/w5Gv2osQVmTfHno+IRSqzfu/JLYc8OT1FF2kOPOV46+l/iCfPZb/j/21Ptlvm8SXPw6ckYj2eVLcmjCfTf4ARwpMBnFkF8IxF1+zveqYgp1YHnlKHlCeeGczh2t6zzCtXYi9i7JlBfPSBZ/ITMEmckht5Ckbn0p6seb6r6FlyyoJaPfWcW/PfFQZ1eyrG8+iJnuiJnuiJnuj5H3ryTjCs0HPDOwmkh3YLV5PndMNdE1uq1XMTj7f59RBq3y8OGAR94iYdz/+Vez3dPSnlm79CyN+TMnvvrJS+d2b2Hl9b+7Ul2nZLkIF7kbSr/crciwz6yeO46numX7i3u7wa8vxB/8g9aOP3yqUHAps/NqGPrcoB0hCs/jXClhnqA9LQzP+RUDx+/1jRYrdyoh0ckVO5sZbVmRT',
            subnet: log.subnet_name,
            api_key_name: apiKeyName,  // Use the apiKey name instead of the token
            request_url: log.request_url,
            response_status: log.response_status,
            additional_data: {
                request_headers: log.request_headers,
                request_body: log.request_body,
                response_headers: log.response_headers,
                response_body: log.response_body,
                response_duration: log.response_duration,
                error_message: log.error_message,
                error_code: log.error_code,
                request_id: log.request_id,
                request_url: log.request_url,
            },
        }
    })

    const handleClearFilter = () => {
        setFilter(default_filter)
    }

    /**
     * Updates the filter state with the new field and value.
     *
     * @param {string} field - The field to update in the filter state.
     * @param {string} value - The value to set for the specified field.
     */
    const handleFilterChange = (field: string, value: string) => {
        setFilter({ ...filter, [field]: value })
    }

    const total_pages = getTotalPages(filter.limit, total_count)

    const setPage = (pageNumber: number) => {
        setFilter({ ...filter, page: pageNumber })
    }

    return {
        logs,
        handleFilterChange,
        filter,
        handleClearFilter,
        fetch_logs_loading: false,
        total_pages,
        setPage,
    }
}

export default useApiLog
