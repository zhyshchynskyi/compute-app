import { createApi } from '@reduxjs/toolkit/query/react';
import { getBaseQuery } from '../fetch-auth-query';
import { IExecutor } from 'types/executor.types';

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
  }),
});

export const { useGetAvailableExecutorsQuery } = executorApi;
