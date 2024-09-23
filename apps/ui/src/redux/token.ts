const tokenKey = '@comput-subnet-app-token'

export const setToken = (token: string) => {
  localStorage.setItem(tokenKey, token)
}

export const removeToken = () => {
  localStorage.removeItem(tokenKey)
}

export const getToken = () => {
  return localStorage.getItem(tokenKey)
}
