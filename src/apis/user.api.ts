import { AuthResponse } from '../types/auth.type'
import { EmailVerify, LogoutType, RefreshTokenType, ProfileUser, SearchUser, User } from '../types/user.type'
import { SuccessResponse } from '../types/utils.type'
import http from '../utils/http'
import { LoginType, RegisterType } from '../utils/rules'

interface UserWithFollow extends User {
  isFollow?: boolean
}

const userApi = {
  register(body: RegisterType) {
    return http.post<AuthResponse>('/users/register', body)
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
    return http.get<SuccessResponse<UserWithFollow>>(`/users/profile/${username}`)
  },
  search(body: SearchUser) {
    return http.post('/users/search', body)
  }
}

export default userApi
