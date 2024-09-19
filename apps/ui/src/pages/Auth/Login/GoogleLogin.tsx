import useGoogleLogin from 'pages/Auth/Login/useGoogleLogin'
import { WelcomeLoader } from 'components/Loader/WelcomeLoader'

import './login.css'

const Login = () => {
  useGoogleLogin()

  return <WelcomeLoader />
}

export default Login
