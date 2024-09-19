import { createApi } from '@reduxjs/toolkit/query/react';
import { getBaseQuery } from '../fetch-auth-query';
import { IExecutor } from 'types/executor.types';

export interface IBaseResponse {
  success: boolean;
  message: string;
}

interface IRentRequest {
  id: string;
  docker_image: string;
  user_public_key: string;
}

export const executorApi = createApi({
  reducerPath: 'executorApi',
  baseQuery: getBaseQuery({ baseUrl: '/executors' }),
  tagTypes: ['Executors'],
  endpoints: (builder) => ({
    getAvailableExecutors: builder.query<IExecutor[], void>({
      query: () => ({
        url: '',
        method: 'GET',
      }),
      providesTags: ['Executors'],
    }),
    rentExecutor: builder.mutation<IBaseResponse, IRentRequest>({
      query: ({ id, ...rest }) => ({
        url: `${id}/rent`,
        method: 'POST',
        body: rest,
      }),
      invalidatesTags: ['Executors'],
    }),
  }),
});

export const { useGetAvailableExecutorsQuery, useRentExecutorMutation } = executorApi;
