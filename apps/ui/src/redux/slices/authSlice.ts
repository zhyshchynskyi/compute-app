import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userApi } from 'redux/apis/userApi';
import { removeToken } from 'redux/token';
import { IUser } from 'types/user.types';

const authSlice = createSlice({
  name: 'authSlice',
  initialState: {
    authStatus: false,
    user: null as IUser | null,
  },
  reducers: {
    setUser(state, action: PayloadAction<IUser>) {
      return {
        ...state,
        authStatus: true,
        user: action.payload,
      };
    },

    clearUser() {
      removeToken();

      return {
        authStatus: false,
        user: null,
      };
    },

    getUser: (state) => state,
  },
  extraReducers: (builder) => {
    builder.addMatcher(userApi.endpoints.getMe.matchFulfilled, (state, action) => {
      state.authStatus = !!action.payload;
      state.user = action.payload;
    });
  },
});

export const { setUser, clearUser, getUser } = authSlice.actions;

export default authSlice.reducer;
