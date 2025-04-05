export interface Post {
  _id: string
  user_id: string
  type: number
  audience: number
  content: string
  parent_id: string | null
  medias: [
    {
      url: string
      type: number
    }
  ]
  user_views: number
  created_at: string
  updated_at: string
  user: {
    _id: string
    name: string
    avatar: string
    username: string
  }
}
