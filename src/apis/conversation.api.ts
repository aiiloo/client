import http from '../utils/http'

const conversationApi = {
  getConversation(body: { receiver_id: string; limit: number; page: number }) {
    return http.get(`/conversations/receiver/${body.receiver_id}?limit=${body.limit}&page=${body.page}`)
  }
}

export default conversationApi
