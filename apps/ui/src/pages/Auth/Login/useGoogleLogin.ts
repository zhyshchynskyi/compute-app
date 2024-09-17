import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { removeAccountId } from 'helpers/authHelper'

const useGoogleLogin = () => {
  // const  { googleLogin } = useGoogleLoginService()
  // const { googleLoginComplete, loading } = useGoogleLoginCompleteService()

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const code = queryParams.get('code')

  useEffect(() => {
      if (code && location.pathname.includes('/google-login')) {
        fetchGoogleLoginComplete(code)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code])

  async function fetchGoogleLoginComplete (code: string) {
    // if(loading) return
    // const res = await googleLoginComplete(code)
    // if (res && res.success) {
    //   removeAccountId()
    //   setTimeout(() => {
    //     window.location.href = '/'
    //   }, 500)
    // } else {
    //   // window.location.href = '/login'
    // }
  }

  return {
    googleLogin: () => {},
    googleLoginComplete: () => {},
  }
}

export default useGoogleLogin
