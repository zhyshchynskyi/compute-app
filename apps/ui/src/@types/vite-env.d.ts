interface ImportMetaEnv {
  readonly PORT: number
  readonly MODE: string

  readonly REACT_APP_ENV: string
  readonly REACT_APP_BACKEND_URL: string
  readonly REACT_APP_DATA_TEST_MODE: boolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
