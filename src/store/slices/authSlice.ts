import type { AuthState } from '@/types/auth'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const AUTH_STORAGE_KEY = 'auth'

function loadAuthState(): AuthState {
  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      return {
        accessToken: parsed.accessToken ?? null,
        refreshToken: parsed.refreshToken ?? null,
        isAuthenticated: !!parsed.accessToken,
        error: null,
      }
    }
  } catch {
    localStorage.removeItem(AUTH_STORAGE_KEY)
  }
  return {
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
    error: null,
  }
}

function saveAuthState(accessToken: string, refreshToken: string) {
  localStorage.setItem(
    AUTH_STORAGE_KEY,
    JSON.stringify({ accessToken, refreshToken })
  )
}

function clearAuthState() {
  localStorage.removeItem(AUTH_STORAGE_KEY)
}

const initialState: AuthState = loadAuthState()

interface LoginSuccessPayload {
  accessToken: string
  refreshToken: string
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<LoginSuccessPayload>) => {
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
      state.isAuthenticated = true
      state.error = null
      saveAuthState(action.payload.accessToken, action.payload.refreshToken)
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
    logout: (state) => {
      state.accessToken = null
      state.refreshToken = null
      state.isAuthenticated = false
      state.error = null
      clearAuthState()
    },
  },
})

export const { loginSuccess, loginFailure, logout } = authSlice.actions
export default authSlice.reducer
