import { User } from '../types/user.type'
import { SuccessResponse } from '../types/utils.type'
import http from '../utils/http'

interface FollowerItem {
  user: User
}
const followerApi = {
  getFollowers(body: { user_id: string; limit: number; page: number }) {
    return http.get(`/followers/get-followers/${body.user_id}?limit=${body.limit}&page=${body.page}`)
  },
  getMutualFollowers(body: { limit: number; page: number }) {
    return http.get<SuccessResponse<FollowerItem[]>>(
      `/followers/mutual-followers/?limit=${body.limit}&page=${body.page}`
    )
  }
}

export default followerApi
