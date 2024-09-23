import { ReactNode, useState } from 'react'

import { ToastContext } from 'contexts'

import Toast from 'share-ui/components/Toast/Toast'
import { ToastType } from 'share-ui/components/Toast/ToastConstants'

export interface ToastProps {
  message?: string
  type?: 'positive' | 'negative' | 'warning'
  open?: boolean
  url?: string
  linkLabel?: string
  autoHideDuration?: number
}

type ToastProviderProps = {
  children: ReactNode
}

const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toast, setToast] = useState<ToastProps>({ open: false })

  const contextValue = {
    toast,
    setToast,
  }

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <Toast
        label={toast.message}
        type={toast.type as ToastType}
        position={Toast.positions?.BOTTOM_RIGHT}
        autoHideDuration={toast.autoHideDuration || 5000}
        open={toast.open}
        // action={
        //   toast.url && (
        //     <ButtonPrimary onClick={() => window.open(toast.url, '_blank')}>
        //       See Transaction
        //     </ButtonPrimary>
        //   )
        // }
        link={toast.url}
        linkLabel={toast.linkLabel}
        onClose={() => setToast({ open: false, type: toast.type })}
      />
    </ToastContext.Provider>
  )
}

export default ToastProvider
