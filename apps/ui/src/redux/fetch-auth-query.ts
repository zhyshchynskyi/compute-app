import { fetchBaseQuery, FetchBaseQueryArgs } from '@reduxjs/toolkit/query';
import { getToken } from './token';

export const getBaseQuery = (args: FetchBaseQueryArgs) => {
  return fetchBaseQuery({
    ...args,
    baseUrl: args.baseUrl ? `${import.meta.env.REACT_APP_BACKEND_URL}${args.baseUrl}` : `${import.meta.env.REACT_APP_BACKEND_URL}`,
    prepareHeaders: (headers) => {
      const token = getToken();

      if (token) {
        headers.set('Authorization', `Bearer ${token.replace('"', '').replace('"', '')}`);
      }
      return headers;
    },
  });
};
