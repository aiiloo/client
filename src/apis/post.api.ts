import http from '../utils/http'

const postApi = {
  createPost(body: FormData) {
    return http.post('/posts/new-post', body, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  }
}

export default postApi
