import { User } from './user.type'
import { SuccessResponse } from './utils.type'

export type AuthResponse = SuccessResponse<{
  data: {
    accessToken: string
    refreshToken: string
  }
  user: User
}>

export type AuthGoogleResponse = {
  data: {
    accessToken: string
    refreshToken: string
  }
  user: User
}

export type RefreshTokenReponse = {
  data: {
    access_token: string
    refresh_token: string
  }
}
