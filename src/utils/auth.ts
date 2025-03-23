import { User } from '../types/user.type'

export const setTokenToLS = (accessToken: string, refreshToken: string) => {
  localStorage.setItem('accessToken', accessToken)
  localStorage.setItem('refreshToken', refreshToken)
}

export const setProfileToLs = (profile: User) => {
  localStorage.setItem('profile', JSON.stringify(profile))
}

export const getAccessTokenFromLS = () => {
  return localStorage.getItem('accessToken')
}

export const getRefreshTokenFromLS = () => {
  return localStorage.getItem('refreshToken')
}

export const getProfileFromLS = () => {
  return JSON.parse(localStorage.getItem('profile') || '{}')
}

export const clearLS = () => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('profile')
}

export const getGoogleAuthUrl = () => {
  const { VITE_GOOGLE_CLIENT_ID, VITE_GOOLE_REDIRECT_URI } = import.meta.env
  const url = 'https://accounts.google.com/o/oauth2/v2/auth'
  const query = {
    client_id: VITE_GOOGLE_CLIENT_ID,
    redirect_uri: VITE_GOOLE_REDIRECT_URI,
    response_type: 'code',
    scope: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'].join(
      ' '
    ),
    prompt: 'consent'
    // access_type: "offline",
  }

  const queryString = new URLSearchParams(query).toString()
  return `${url}?${queryString}`
}
