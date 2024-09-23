import { createContext, useContext, useEffect } from 'react'

import type { ReactNode } from 'react'
import { setAccountId } from 'helpers/authHelper'
// eslint-disable-next-line import/no-extraneous-dependencies
import Cookies from 'universal-cookie'
import { AuthContext } from 'contexts'
import { Account } from 'types/account'
import { useNavigate } from 'react-router-dom'

type AppModeContextType = {
  accounts: Account[]
  shared_accounts: any
  account_id: string | null
  switchAccountMode: (account: Account, noNavigation?: boolean) => void
  selected_account?: Account
  account_switch_loading: boolean
}

export const account_mode_icon: Record<string, string> = {
  compute: 'https://cdn-icons-png.freepik.com/512/929/929574.png',
  'subnet-api': 'https://cdn-icons-png.flaticon.com/512/319/319559.png',
  validator:
    'https://uxwing.com/wp-content/themes/uxwing/download/crime-security-military-law/shield-checkmark-line-icon.png',
}
const cookies: any = new Cookies()

export const AppModeContext = createContext<AppModeContextType | null>(null)

type AppModeContextProviderProps = {
  children: ReactNode
}

export function AppModeContextProvider({ children }: AppModeContextProviderProps): JSX.Element {
  const navigate = useNavigate()

  const { user: current_user_account } = useContext(AuthContext)

  const account_id_from_cookies = cookies.get('account_id') ?? null

  useEffect(() => {
    if (!account_id_from_cookies && current_user_account) {
      setAccountId(current_user_account.id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account_id_from_cookies])

  const switchAccountMode = async (account: Account, noNavigation?: boolean) => {
    // await switchAccount(account.id)
    // setAccountId(account.id)
    // window.location.href = '/'
    // // refreshQueries()
    // if (!noNavigation) {
    //     navigate('/')
    // }
  }

  // const shared_list = shared_accounts.map(i => ({
  //     id: i.account_id,
  //     account_type: i.assigned_account_type,
  // }))

  const value = {
    accounts: [],
    shared_accounts: [],
    account_id: account_id_from_cookies,
    switchAccountMode,
    // // selected_account: current_user_account,
    // selected_account: [...accounts, ...shared_list].find(
    //     (account: Account) => account.id === account_id_from_cookies,
    // ),
    selected_account: undefined,
    account_switch_loading: false,
  }

  return <AppModeContext.Provider value={value}>{children}</AppModeContext.Provider>
}

export function useAppModeContext(): AppModeContextType {
  const context = useContext(AppModeContext)

  if (!context) throw new Error('useAppModeContext must be used within an AppModeContextProvider')

  return context
}
