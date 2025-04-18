import http from '../utils/http'

const postApi = {
  createPost(body: FormData) {
    return http.post('/posts/new-post', body, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  getAllPost() {
    return http.get('/posts/all-post')
  },
  getYourPost(username: string) {
    return http.get(`/posts/your-post/${username}`)
  }
}

export default postApi
