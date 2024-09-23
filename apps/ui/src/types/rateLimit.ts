export enum RateLimitAccountLevelEnum {
  Starter = 'Starter',
  Pro = 'Pro',
  Enterprise = 'Enterprise',
}

export interface RateLimitInput {
  per_hour: number | undefined
  per_day: number | undefined
  per_month: number | undefined
  account_level: RateLimitAccountLevelEnum
  subnet_id: string | undefined
  subnet_api_service_id: string | undefined | null
  monthly_usage_limit: number | undefined
}

export interface RateLimit {
  id: string
  per_hour: number
  per_day: number
  per_month: number
  account_level: RateLimitAccountLevelEnum
  created_by: string
  modified_by: string
  created_on: Date
  modified_on: Date
  account_id: string
  subnet_id: string
  subnet_api_service_id: string
  monthly_usage_limit: number
}

export interface RateLimitActionReturn {
  message: string
  success: boolean
  rate_limit: RateLimit
}

export interface UseCreateRateLimitService {
  createRateLimit: (input: RateLimitInput) => Promise<{ createRateLimit: RateLimitActionReturn }>
  loading: boolean
}

export interface UseRateLimitsReturn {
  data: RateLimit[]
  error: any
  loading: boolean
  refetch: () => void
}

export interface UseUpdateRateLimitService {
  updateRateLimit: (rate_limit_id: string, input: RateLimitInput) => Promise<{ updateRateLimit: RateLimitActionReturn }>
  loading: boolean
}

export interface UseDeleteRateLimitService {
  deleteRateLimit: (rate_limit_id: string) => Promise<{ deleteRateLimit: RateLimitActionReturn }>
  loading: boolean
}

export interface UseRateLimitByIdReturn {
  data: RateLimit
  error: any
  loading: boolean
  refetch: () => void
}
