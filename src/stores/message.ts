import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ChatSession, Message } from '@/types'
import { mockChatSessions } from '@/data/mock'

export const useMessageStore = defineStore('message', () => {
  const sessions = ref<ChatSession[]>(mockChatSessions)
  const currentSession = ref<ChatSession | null>(null)
  const messages = ref<Message[]>([
    {
      id: 1,
      senderId: 1,
      senderName: '字节跳动HR',
      senderAvatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=HR%20avatar%20professional&image_size=square',
      receiverId: 0,
      content: '您好，我看到了您的简历，非常符合我们的岗位要求',
      time: '10:00',
      isRead: true
    },
    {
      id: 2,
      senderId: 0,
      senderName: '我',
      senderAvatar: '',
      receiverId: 1,
      content: '您好，感谢您的认可，我对这个岗位很感兴趣',
      time: '10:15',
      isRead: true
    },
    {
      id: 3,
      senderId: 1,
      senderName: '字节跳动HR',
      senderAvatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=HR%20avatar%20professional&image_size=square',
      receiverId: 0,
      content: '请问您方便什么时候面试？',
      time: '10:30',
      isRead: false
    }
  ])

  const selectSession = (session: ChatSession) => {
    currentSession.value = session
    session.unreadCount = 0
  }

  const sendMessage = (content: string) => {
    if (!currentSession.value || !content) return
    
    const newMessage: Message = {
      id: messages.value.length + 1,
      senderId: 0,
      senderName: '我',
      senderAvatar: '',
      receiverId: currentSession.value.userId,
      content,
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
      isRead: true
    }
    messages.value.push(newMessage)
    currentSession.value.lastMessage = content
    currentSession.value.lastTime = '刚刚'
  }

  const getUnreadCount = () => {
    return sessions.value.reduce((sum, session) => sum + session.unreadCount, 0)
  }

  return {
    sessions,
    currentSession,
    messages,
    selectSession,
    sendMessage,
    getUnreadCount
  }
})
