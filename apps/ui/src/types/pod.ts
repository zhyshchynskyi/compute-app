import { TemplateInput } from './template'

export interface PodInput {
  pod_name: string
  price: number
  status: string
  provider: string
  category: string
  type: string
  resource: string
  gpu_count: number
  isinstance_pricing: {
    plan: string
  }
  template: string
  template_config: TemplateInput
}

export interface Pod extends PodInput {
  id: string
  account_id: string
  created_by: string
  created_on: Date
}

export interface CreatePodResponse {
  success: boolean
  message: string
}

interface PodServiceActionReturn {
  message: string
  success: boolean
  pod: Pod
}

export interface UseUpdatePodNameServiceReturn {
  updatePodName: (pod_id: string, input: { pod_name: string }) => Promise<{ updatePodName: PodServiceActionReturn }>
  loading: boolean
}
