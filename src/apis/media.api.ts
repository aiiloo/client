import http from '../utils/http'

const mediaApi = {
  upLoadImage(body: FormData) {
    return http.post('/upload-image', body)
  },
  upLoadConversationImage(body: FormData) {
    return http.post('/medias/upload-conversation-image', body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  uploadConversationVideo(body: FormData) {
    return http.post('/medias/upload-conversation-video', body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  uploadConversationFiles(body: FormData) {
    return http.post('/medias/upload-conversation-file', body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  uploadConversationAudio(body: FormData) {
    return http.post('/medias/upload-conversation-audio', body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  removeFile(body: { filePath: string }) {
    return http.delete('/medias/remove-file', {
      data: body
    })
  }
}

export default mediaApi
