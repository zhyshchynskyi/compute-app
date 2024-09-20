import { createApi } from '@reduxjs/toolkit/query/react';
import { getBaseQuery } from '../fetch-auth-query';
import { IPod } from 'types/pod.types';

interface ICreatePodRequest {
    pod_name: string;
    price: number;
    status: string;
    provider: string;
    category: string;
    type: string;
    resource: number;
    gpu_count: number;
    template: number | null;
    isinstance_pricing: {
        plan: string;
    };
    template_config: {
        template: any;
        overrides: any;
    };
}

interface ICreatePodResponse {
    pod: IPod;
    message: string;
    success: boolean;
}

export const podsApi = createApi({
    reducerPath: 'podsApi',
    baseQuery: getBaseQuery({ baseUrl: '/pods' }),
    tagTypes: ['Pods'],
    endpoints: (builder) => ({
        createPod: builder.mutation<ICreatePodResponse, ICreatePodRequest>({
            query: (data) => ({
                url: '',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Pods'],
        }),
        getPods: builder.query<IPod[], void>({
            query: () => ({
                url: '',
                method: 'GET',
            }),
            providesTags: ['Pods'],
        }),
        getPodById: builder.query<IPod, number>({
            query: (id) => ({
                url: `/${id}`,
                method: 'GET',
            }),
            providesTags: ['Pods'],
        }),
        updatePod: builder.mutation<IPod, { id: number; data: Partial<ICreatePodRequest> }>({
            query: ({ id, data }) => ({
                url: `/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Pods'],
        }),
        deletePod: builder.mutation<{ success: boolean; id: number }, number>({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Pods'],
        }),
    }),
});

export const { useCreatePodMutation, useGetPodsQuery, useGetPodByIdQuery, useUpdatePodMutation, useDeletePodMutation } = podsApi;
