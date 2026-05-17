<template>
  <div class="max-w-5xl mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold text-gray-800 mb-6">💬 消息</h1>
    
    <div class="flex gap-6 h-[600px]">
      <el-card class="w-80 shrink-0 p-0">
        <div class="h-full flex flex-col">
          <div class="p-4 border-b">
            <h3 class="font-semibold">会话列表</h3>
          </div>
          <div class="flex-1 overflow-y-auto">
            <div
              v-for="session in messageStore.sessions"
              :key="session.id"
              class="flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-50 transition-colors"
              :class="{ 'bg-blue-50': messageStore.currentSession?.id === session.id }"
              @click="selectSession(session)"
            >
              <img :src="session.userAvatar" :alt="session.userName" class="w-12 h-12 rounded-full object-cover" />
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between">
                  <h4 class="font-medium text-gray-800 truncate">{{ session.userName }}</h4>
                  <span class="text-xs text-gray-400">{{ session.lastTime }}</span>
                </div>
                <p class="text-sm text-gray-500 truncate">{{ session.lastMessage }}</p>
              </div>
              <el-badge v-if="session.unreadCount > 0" :value="session.unreadCount" class="ml-2" />
            </div>
          </div>
        </div>
      </el-card>

      <el-card class="flex-1 p-0">
        <div class="h-full flex flex-col">
          <div v-if="messageStore.currentSession" class="p-4 border-b">
            <div class="flex items-center gap-3">
              <img :src="messageStore.currentSession.userAvatar" :alt="messageStore.currentSession.userName" class="w-10 h-10 rounded-full object-cover" />
              <div>
                <h4 class="font-medium text-gray-800">{{ messageStore.currentSession.userName }}</h4>
                <p class="text-xs text-gray-500">在线</p>
              </div>
            </div>
          </div>
          
          <div class="flex-1 overflow-y-auto p-4 bg-gray-50" ref="messagesContainer">
            <div v-if="!messageStore.currentSession" class="h-full flex items-center justify-center">
              <el-empty description="选择一个会话开始聊天" />
            </div>
            <div v-else class="space-y-4">
              <div
                v-for="msg in messageStore.messages"
                :key="msg.id"
                class="flex"
                :class="msg.senderId !== 0 ? 'justify-start' : 'justify-end'"
              >
                <div
                  class="chat-bubble"
                  :class="msg.senderId !== 0 ? 'receiver' : 'sender'"
                >
                  {{ msg.content }}
                </div>
              </div>
            </div>
          </div>

          <div v-if="messageStore.currentSession" class="p-4 border-t bg-white">
            <div class="flex gap-3">
              <el-input
                v-model="newMessage"
                placeholder="输入消息..."
                @keyup.enter="sendMessage"
              />
              <el-button type="primary" @click="sendMessage">
                <el-icon><Promotion /></el-icon>
              </el-button>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import { useMessageStore } from '@/stores/message'
import type { ChatSession } from '@/types'

const messageStore = useMessageStore()
const newMessage = ref('')
const messagesContainer = ref<HTMLElement | null>(null)

const selectSession = (session: ChatSession) => {
  messageStore.selectSession(session)
  scrollToBottom()
}

const sendMessage = () => {
  if (!newMessage.value.trim()) return
  messageStore.sendMessage(newMessage.value.trim())
  newMessage.value = ''
  scrollToBottom()
}

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

watch(() => messageStore.messages, () => {
  scrollToBottom()
}, { deep: true })
</script>
