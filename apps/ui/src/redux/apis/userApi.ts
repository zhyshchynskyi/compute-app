import { createApi } from '@reduxjs/toolkit/query/react';
import { getBaseQuery } from '../fetch-auth-query';
import { IUser } from 'types/user.types';

interface ISingupRequest {
  name: string;
  email: string;
  password: string;
}

interface ILoginRequest {
  email: string;
  password: string;
}

interface ILoginResponse {
  user: IUser;
  token: string;
}

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: getBaseQuery({ baseUrl: '/users' }),
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    singup: builder.mutation<IUser, ISingupRequest>({
      query: (data) => ({
        url: '',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Users'],
    }),
    login: builder.mutation<ILoginResponse, ILoginRequest>({
      query: (data) => ({
        url: '/login',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Users'],
    }),
    getMe: builder.query<IUser, void>({
      query: () => ({
        url: '/me',
        method: 'GET',
      }),
      providesTags: ['Users'],
    }),
  }),
});

export const { useLazyGetMeQuery, useSingupMutation, useLoginMutation } = userApi;
