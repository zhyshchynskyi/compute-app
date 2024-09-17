import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook } from 'react-redux';

import AuthSlice from './slices/authSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { userApi } from './apis/userApi';

const rootReducer = combineReducers({
  auth: AuthSlice,
  [userApi.reducerPath]: userApi.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(userApi.middleware),
});

// exporting the store
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = store.getState;
