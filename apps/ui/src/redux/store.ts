import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook } from 'react-redux'

import AuthSlice from './slices/authSlice'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import { userApi } from './apis/userApi'
import { sshKeyApi } from './apis/sshKeyApi'
import { executorApi } from './apis/executorApi'
import { podsApi } from './apis/podsApi'

const rootReducer = combineReducers({
  auth: AuthSlice,
  [userApi.reducerPath]: userApi.reducer,
  [sshKeyApi.reducerPath]: sshKeyApi.reducer,
  [executorApi.reducerPath]: executorApi.reducer,
  [podsApi.reducerPath]: podsApi.reducer,
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(userApi.middleware, sshKeyApi.middleware, executorApi.middleware, podsApi.middleware),
})

// exporting the store
export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = store.getState
