import { AuthResponse } from '../types/auth.type'
import { EmailVerify, LogoutType } from '../types/user.type'
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
  }
}

export default userApi
