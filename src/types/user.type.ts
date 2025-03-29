export interface User {
  _id: string
  name: string
  email: string
  avatar?: string
  created_at: string
  updated_at: string
  bio?: string
  cover_photo?: string
  date_of_birth?: string
  location?: string
  username?: string
  verify?: boolean
  website?: string
}

export interface EmailVerify {
  email_verify_token: string
}

export interface LogoutType {
  refresh_token: string
}

export interface RefreshTokenType {
  refresh_token: string
}

export interface ProfileUser {
  name?: string | null
  date_of_birth?: string | null
  bio?: string | null
  location?: string | null
  website?: string | null
  avatar?: File | string | null
  cover_photo?: File | string | null
}
