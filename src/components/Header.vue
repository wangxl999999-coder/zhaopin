<template>
  <header class="bg-white shadow-sm sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center space-x-8">
          <router-link to="/" class="flex items-center space-x-2">
            <span class="text-2xl font-bold text-primary">智聘</span>
          </router-link>
          <nav class="hidden md:flex space-x-6">
            <router-link to="/" class="nav-link text-gray-600 hover:text-primary font-medium">首页</router-link>
            <router-link to="/jobs" class="nav-link text-gray-600 hover:text-primary font-medium">职位</router-link>
            <router-link to="/companies" class="nav-link text-gray-600 hover:text-primary font-medium">公司</router-link>
            <router-link to="/map" class="nav-link text-gray-600 hover:text-primary font-medium">地图找工作</router-link>
          </nav>
        </div>
        <div class="flex items-center space-x-4">
          <template v-if="userStore.isLoggedIn">
            <router-link to="/messages" class="relative text-gray-600 hover:text-primary">
              <el-icon class="text-xl"><ChatDotRound /></el-icon>
              <span v-if="unreadCount > 0" class="absolute -top-1 -right-1 bg-danger text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">{{ unreadCount }}</span>
            </router-link>
            <router-link to="/resume" class="text-gray-600 hover:text-primary">
              <el-icon class="text-xl"><Document /></el-icon>
            </router-link>
            <el-dropdown @command="handleCommand">
              <div class="flex items-center space-x-2 cursor-pointer">
                <img :src="userStore.user?.avatar" class="w-8 h-8 rounded-full object-cover" />
                <span class="text-gray-700 font-medium">{{ userStore.user?.username }}</span>
                <el-icon class="text-sm"><ArrowDown /></el-icon>
              </div>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="profile">个人中心</el-dropdown-item>
                  <el-dropdown-item command="resume">我的简历</el-dropdown-item>
                  <el-dropdown-item command="messages">消息</el-dropdown-item>
                  <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
          <template v-else>
            <router-link to="/login">
              <el-button type="primary">登录</el-button>
            </router-link>
            <router-link to="/register">
              <el-button>注册</el-button>
            </router-link>
          </template>
        </div>
      </div>
    </div>
    <div class="md:hidden border-t">
      <div class="flex justify-around py-3">
        <router-link to="/" class="flex flex-col items-center text-gray-600 text-sm">
          <el-icon class="text-xl"><House /></el-icon>
          首页
        </router-link>
        <router-link to="/jobs" class="flex flex-col items-center text-gray-600 text-sm">
          <el-icon class="text-xl"><Briefcase /></el-icon>
          职位
        </router-link>
        <router-link to="/companies" class="flex flex-col items-center text-gray-600 text-sm">
          <el-icon class="text-xl"><OfficeBuilding /></el-icon>
          公司
        </router-link>
        <router-link to="/map" class="flex flex-col items-center text-gray-600 text-sm">
          <el-icon class="text-xl"><MapLocation /></el-icon>
          地图
        </router-link>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useMessageStore } from '@/stores/message'
import { computed, onMounted } from 'vue'
import { ChatDotRound, Document, ArrowDown, House, Briefcase, OfficeBuilding, MapLocation } from '@element-plus/icons-vue'

const router = useRouter()
const userStore = useUserStore()
const messageStore = useMessageStore()

const unreadCount = computed(() => messageStore.getUnreadCount())

const handleCommand = (command: string) => {
  switch (command) {
    case 'profile':
    case 'resume':
      router.push('/resume')
      break
    case 'messages':
      router.push('/messages')
      break
    case 'logout':
      userStore.logout()
      router.push('/')
      break
  }
}

onMounted(() => {
  userStore.checkAuth()
})
</script>
