import { createApi } from '@reduxjs/toolkit/query/react'
import { getBaseQuery } from '../fetch-auth-query'
import { ISshKey } from 'types/sshKey.types'

export interface ISshKeyRegisterRequest {
  name: string
  public_key: string
}

export const sshKeyApi = createApi({
  reducerPath: 'sshKeyApi',
  baseQuery: getBaseQuery({ baseUrl: '/ssh-keys' }),
  tagTypes: ['SshKeys'],
  endpoints: builder => ({
    registerSshKey: builder.mutation<ISshKey, ISshKeyRegisterRequest>({
      query: data => ({
        url: '',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['SshKeys'],
    }),
    getSshKeys: builder.query<ISshKey[], void>({
      query: () => ({
        url: '/me',
        method: 'GET',
      }),
      providesTags: ['SshKeys'],
    }),
    getSshKey: builder.query<ISshKey, { id: string }>({
      query: ({ id }) => ({
        url: `/${id}`,
        method: 'GET',
      }),
      providesTags: ['SshKeys'],
    }),
    updateSshKey: builder.mutation<ISshKey, Pick<ISshKey, 'id' | 'name' | 'public_key'>>({
      query: ({ id, ...rest }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['SshKeys'],
    }),
    deleteSshKey: builder.mutation<ISshKey, { id: string }>({
      query: ({ id }) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['SshKeys'],
    }),
  }),
})

export const {
  useRegisterSshKeyMutation,
  useGetSshKeyQuery,
  useGetSshKeysQuery,
  useUpdateSshKeyMutation,
  useDeleteSshKeyMutation,
} = sshKeyApi
