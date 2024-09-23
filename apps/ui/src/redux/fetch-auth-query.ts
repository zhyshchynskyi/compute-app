import {
  fetchBaseQuery,
  FetchBaseQueryArgs,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
  type FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query'
import { getToken } from './token'

type FetchQuery = BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>

export const getBaseQuery = (args?: FetchBaseQueryArgs) =>
  fetchBaseQuery({
    ...(args || {}),
    baseUrl: args?.baseUrl
      ? `${import.meta.env.REACT_APP_BACKEND_URL}${args.baseUrl}`
      : `${import.meta.env.REACT_APP_BACKEND_URL}`,
    prepareHeaders: headers => {
      const token = getToken()

      if (token) {
        headers.set('Authorization', `Bearer ${token.replace('"', '').replace('"', '')}`)
      }
      return headers
    },
  })

export const fetchAuthQuery =
  (baseArgs?: FetchBaseQueryArgs): FetchQuery =>
  async (args, api, extraOptions) => {
    const result = await getBaseQuery(baseArgs)(args, api, extraOptions)

    if (result.error?.status === 401) {
      window.location.href = '/login'
    }

    // if (result.meta?.response?.headers.get('token')) {
    //   setToken(String(result.meta?.response?.headers.get('token')));
    // }

    return result
  }
