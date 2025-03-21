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

export const getProfileFromLS = () => {
  return JSON.parse(localStorage.getItem('profile') || '{}')
}

export const clearLS = () => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('profile')
}
