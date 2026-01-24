export interface LoginFormValues {
  email: string
  password: string
}

export interface AuthState {
  accessToken: string | null
  refreshToken: string | null
  isAuthenticated: boolean
  error: string | null
}
