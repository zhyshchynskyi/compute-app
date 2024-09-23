import { BrowserRouter } from 'react-router-dom'
import Route from 'Route'

import * as Sentry from '@sentry/react'

import './i18n'
import { SnackbarProvider } from 'notistack'

import useDetectMobile from 'hooks/useDetectMobile'

import ToastProvider from 'providers/ToastProvider'
import ModalsProvider from 'providers/ModalsProvider'
import AuthProvider from 'providers/AuthProvider'

import './App.css'

// import '@l3-lib/ui-core/dist/main.css'
import { LayoutProvider } from 'providers/LayoutProvider'
import { AppModeContextProvider } from 'context/AppModeContext'
import { Provider } from 'react-redux'
import store from 'redux/store'

function App() {
  useDetectMobile()

  return (
    <Sentry.ErrorBoundary>
      <Provider store={store}>
        <ModalsProvider>
          <BrowserRouter>
            <SnackbarProvider>
              <ToastProvider>
                <AuthProvider>
                  <AppModeContextProvider>
                    <LayoutProvider>
                      <Route />
                    </LayoutProvider>
                  </AppModeContextProvider>
                </AuthProvider>
              </ToastProvider>
            </SnackbarProvider>
          </BrowserRouter>
        </ModalsProvider>
      </Provider>
    </Sentry.ErrorBoundary>
  )
}

export default App
