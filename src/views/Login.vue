<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <el-card class="w-full max-w-md">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-primary mb-2">智聘</h1>
        <p class="text-gray-500">登录您的账户</p>
      </div>
      
      <el-form :model="loginForm" label-width="0">
        <el-form-item>
          <el-input
            v-model="loginForm.username"
            placeholder="用户名"
            size="large"
            :prefix-icon="User"
          />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="密码"
            size="large"
            :prefix-icon="Lock"
            @keyup.enter="handleLogin"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="large" class="w-full" @click="handleLogin" :loading="loading">
            登录
          </el-button>
        </el-form-item>
      </el-form>

      <div class="text-center mt-6">
        <span class="text-gray-500">还没有账号？</span>
        <router-link to="/register" class="text-primary hover:underline ml-1">立即注册</router-link>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'

const router = useRouter()
const userStore = useUserStore()

const loading = ref(false)
const loginForm = reactive({
  username: '',
  password: ''
})

const handleLogin = () => {
  if (!loginForm.username) {
    ElMessage.warning('请输入用户名')
    return
  }
  if (!loginForm.password) {
    ElMessage.warning('请输入密码')
    return
  }

  loading.value = true
  
  setTimeout(() => {
    userStore.login(loginForm.username, loginForm.password)
    loading.value = false
    ElMessage.success('登录成功')
    router.push('/')
  }, 1000)
}
</script>
