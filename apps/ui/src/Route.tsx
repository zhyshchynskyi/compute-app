import { Route as Router, Routes } from 'react-router-dom'
import Home from './pages/Home'
import {
  ForgotPassword,
  Login,
  // Register,
  ResetPassword,
  TwoFAuthentication,
  GithubLogin,
  GoogleLogin,
} from 'pages/Auth'
import MainComponent from 'pages/MainComponent'
import ChangePassword from 'pages/ChangePassword'
import { AuthContext } from 'contexts'
import { useContext, useEffect, useState } from 'react'
import { PublicRoute } from 'routes'
import UpdatePassword from 'pages/UpdatePassword'
import { ThemeProvider } from 'styled-components'
import { darkTheme, lightTheme } from 'styles/theme'
import { WelcomeLoader } from 'components/Loader/WelcomeLoader'
import { CheatCode } from 'pages/Auth/Register/CheatCode'
import DeleteConfirmationModal from 'modals/DeleteConfirmationModal'
// import MainRouteLayout from 'routes/MainRouteLayout';
import CommandMenu from 'components/CommandMenu/CommandMenu'
import RootLayout from 'routes/RootLayout'
import HomeRouteLayout from 'routes/HomeRouteLayout'
import SuccessPaymentModal from 'modals/SuccessPaymentModal'
import LoginModal from 'modals/LoginModal'
import SettingsModal from 'modals/SettingsModal'
import RunLogsModal from 'modals/RunLogsModal/RunLogsModal'
import { Pods, PodsContent, MainPod, ChangeTemplateModal } from 'pages/Pods'
import PodDetails from 'pages/Pods/components/PodDetails'
import { TemplateLayout, Template, CreateTemplate, EditTemplate } from 'pages/template'
import Billing from 'pages/Billing'
import { Secrets, CreateSecret, SecretDetails } from 'pages/Secrets'
import { useAppModeContext } from 'context/AppModeContext'
import Profile from 'pages/Profile'
import MainRouteLayout from 'routes/MainRouteLayout'
import Account from 'pages/Account'
import Settings from 'pages/Settings'
import ChangeSshkeyModal from 'pages/Pods/components/sshkey/ChangeSshkeyModal'

const Route = () => {
  const { account_switch_loading } = useAppModeContext()
  const { user, loading } = useContext(AuthContext)
  const [cmdkOpen, setCmdkOpen] = useState(false)
  const [theme, setTheme] = useState<string>(() => {
    const storedTheme = localStorage.getItem('theme')
    return storedTheme || 'dark'
  })

  useEffect(() => {
    const currentThemeName = localStorage.getItem('theme')

    if (currentThemeName && currentThemeName !== theme) {
      setTheme(currentThemeName)
    } else {
      localStorage.setItem('theme', theme)
    }
  }, [theme])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    localStorage.setItem('theme', newTheme)
    setTheme(newTheme)
  }

  if (loading || account_switch_loading) return <WelcomeLoader />

  return (
    <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <Routes>
        <Router element={<RootLayout theme={{ theme, toggleTheme }} />}>
          <Router element={<HomeRouteLayout />}>
            <Router path='/' element={<Home />} key={document.location.href} />
          </Router>

          <Router path='pods' element={<Pods />} key={document.location.href}>
            <Router index element={<MainPod />} key={document.location.href} />
            <Router path={'create-pod'} element={<PodsContent />} key={document.location.href} />
            <Router path={'details/:id'} element={<PodDetails />} key={document.location.href} />
          </Router>

          <Router path='templates' element={<TemplateLayout />} key={document.location.href}>
            <Router index element={<Template />} key={document.location.href} />
            <Router path={'create-template'} element={<CreateTemplate />} key={document.location.href} />
            <Router path={'edit/:id'} element={<EditTemplate />} key={document.location.href} />
          </Router>

          <Router path={'billing'} element={<Billing />} key={document.location.href}></Router>

          <Router element={<MainRouteLayout />}>
            <Router path='change-password' element={<ChangePassword />} key={document.location.href} />
            <Router path='account' element={<Account />} key={document.location.href} />
            <Router path='settings' element={<Settings />} key={document.location.href} />
          </Router>

          <Router path='secrets' key={document.location.href}>
            <Router index element={<Secrets />} key={document.location.href} />
            <Router path={'create-secret'} element={<CreateSecret />} key={document.location.href} />
            <Router path={':id'} element={<SecretDetails />} key={document.location.href} />
          </Router>

          <Router path='profile' element={<Profile />} />
          <Router path='*' element={<MainComponent value={'page not found'} />} />
        </Router>
        <Router element={<PublicRoute />}>
          <Router path='/github-login' element={<GithubLogin />} />
          <Router path='/google-login' element={<GoogleLogin />} />
          <Router path='/forgot-password' element={<ForgotPassword />} />
          <Router path='/login' element={<Login />} />
          <Router path='/reset-password/:id' element={<ResetPassword />} />
          <Router path='/authentication/:id' element={<TwoFAuthentication />} />
          <Router path='/login/update-password' element={<UpdatePassword />} />
          <Router path='/cheat-code' element={<CheatCode />} />
        </Router>
      </Routes>
      <LoginModal />
      <ChangeTemplateModal />
      <ChangeSshkeyModal />
      <SuccessPaymentModal />
      <DeleteConfirmationModal />
      <SettingsModal />
      <RunLogsModal />
      <CommandMenu open={cmdkOpen} setCmdkOpen={setCmdkOpen} theme={theme} toggleTheme={toggleTheme} />
    </ThemeProvider>
  )
}

export default Route
