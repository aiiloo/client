import { AuthResponse } from '../types/auth.type'
import { EmailVerify, LogoutType, RefreshTokenType, ProfileUser } from '../types/user.type'
import http from '../utils/http'
import { LoginType, RegisterType } from '../utils/rules'

const userApi = {
  register(body: RegisterType) {
    return http.post('/users/register', body)
  },
  login(body: LoginType) {
    return http.post<AuthResponse>('/users/login', body)
  },

  verify(body: EmailVerify) {
    return http.post('/users/verify-email', body)
  },

  logout(body: LogoutType) {
    return http.post('/users/logout', body)
  },
  refresh(body: RefreshTokenType) {
    return http.post('/users/refresh-token', body)
  },
  myProfile() {
    return http.get('/users/myProfile')
  },
  updateProfile(body: ProfileUser | FormData) {
    return http.post('/users/profile/update', body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  yourProfile(username: string) {
    return http.get(`/users/profile/${username}`)
  }
}

export default userApi
