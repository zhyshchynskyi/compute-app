export interface SSHInput {
  name: string
  key: string
}

export interface SSH {
  id: string
  name: string
  key: string
  created_on: Date
  created_by: string
  account_id: string
}

interface SshActionReturn {
  message: string
  success: boolean
  ssh: SSH
}

export interface UseCreateSshServiceReturn {
  createSsh: (input: SSHInput) => Promise<{ createSsh: SshActionReturn }>
  loading: boolean
}

export interface UseUpdateSshServiceReturn {
  updateSsh: (ssh_id: string, input: SSHInput) => Promise<{ updateSsh: SshActionReturn }>
  loading: boolean
}

export interface UseSshListServicesReturn {
  data: SSH[]
  error: any
  loading: boolean
  refetch: () => void
}

export interface UseSshByIdServiceByIdReturn {
  data: SSH
  error: any
  loading: boolean
  refetch: () => void
}

export interface UseDeleteSshServiceReturn {
  deleteSsh: (ssh_id: string) => Promise<{ deleteSsh: SshActionReturn }>
  loading: boolean
}
