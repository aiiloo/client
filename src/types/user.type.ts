export interface User {
  id: number
  name: string
  email: string
  avatar?: string
  createdAt: string
  updatedAt: string
}

export interface EmailVerify {
  email_verify_token: string
}
