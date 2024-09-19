import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { removeAccountId } from 'helpers/authHelper'

const useGithubLogin = () => {
  // const [githubLogin] = useGithubLoginService()
  // const [githubLoginComplete] = useGithubLoginCompleteService()

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const code = queryParams.get('code')

  const fetchGithubLoginComplete = async (code: string) => {
    // const res = await githubLoginComplete(code)
    // if (res && res.success) {
    //   removeAccountId()
    //   setTimeout(() => {
    //     window.location.href = '/'
    //   }, 500)
    // } else {
    //   // window.location.href = '/login'
    // }
  }
  useEffect(() => {

    if (code && location.pathname.includes('/github-login')) {
      fetchGithubLoginComplete(code)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code])

  return {
    githubLogin: () => {},
    githubLoginComplete: () => {},
  }
}

export default useGithubLogin
