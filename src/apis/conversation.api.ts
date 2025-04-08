import http from '../utils/http'

const conversationApi = {
  getConversation(body: { receiver_id: string; limit: number; page: number }) {
    return http.get(`/conversations/receiver/${body.receiver_id}?limit=${body.limit}&page=${body.page}`)
  },
  getConversationMedias(body: { receiver_user_id: string; type: string; limit: number; page: number }) {
    return http.get(
      `/conversations/conversation-medias/${body.receiver_user_id}?limit=${body.limit}&page=${body.page}&type=${body.type}`
    )
  },
  recallMessage(body: { conversation_id: string }) {
    return http.patch(`/conversations/status/${body.conversation_id}`)
  }
}

export default conversationApi
