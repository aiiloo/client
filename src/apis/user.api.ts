import { AuthResponse } from '../types/auth.type'
import { EmailVerify } from '../types/user.type'
import http from '../utils/http'
import { RegisterType } from '../utils/rules'

const userApi = {
  register(body: RegisterType) {
    return http.post('/users/register', body)
  },
  login(body: { email: string; password: string }) {
    return http.post<AuthResponse>('/users/login', body)
  },

  verify(body: EmailVerify) {
    return http.post('/users/verify-email', body)
  }
}

export default userApi
