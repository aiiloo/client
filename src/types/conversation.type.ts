export interface MessageType {
  _id: string
  content: string
  sender_id: string
  status?: string
  medias: MediaConversationType[]
  receiver_id: string
  created_at?: string
  updated_at?: string
}

export interface MediaConversationType {
  url: string
  type: FileType
  name?: string
}

export enum FileType {
  IMAGE = 'image',
  VIDEO = 'video',
  AUDIO = 'audio',
  DOCUMENT = 'document'
}
