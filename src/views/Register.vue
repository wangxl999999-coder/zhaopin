<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <el-card class="w-full max-w-md">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-primary mb-2">智聘</h1>
        <p class="text-gray-500">创建新账户</p>
      </div>
      
      <el-form :model="registerForm" label-width="0">
        <el-form-item>
          <el-input
            v-model="registerForm.username"
            placeholder="用户名"
            size="large"
            :prefix-icon="User"
          />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="registerForm.email"
            placeholder="邮箱"
            size="large"
            :prefix-icon="Message"
          />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="registerForm.password"
            type="password"
            placeholder="密码"
            size="large"
            :prefix-icon="Lock"
          />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="registerForm.confirmPassword"
            type="password"
            placeholder="确认密码"
            size="large"
            :prefix-icon="Lock"
            @keyup.enter="handleRegister"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="large" class="w-full" @click="handleRegister" :loading="loading">
            注册
          </el-button>
        </el-form-item>
      </el-form>

      <div class="text-center mt-6">
        <span class="text-gray-500">已有账号？</span>
        <router-link to="/login" class="text-primary hover:underline ml-1">立即登录</router-link>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'
import { User, Lock, Message } from '@element-plus/icons-vue'

const router = useRouter()
const userStore = useUserStore()

const loading = ref(false)
const registerForm = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const handleRegister = () => {
  if (!registerForm.username) {
    ElMessage.warning('请输入用户名')
    return
  }
  if (!registerForm.email) {
    ElMessage.warning('请输入邮箱')
    return
  }
  if (!registerForm.password) {
    ElMessage.warning('请输入密码')
    return
  }
  if (registerForm.password !== registerForm.confirmPassword) {
    ElMessage.warning('两次输入的密码不一致')
    return
  }

  loading.value = true
  
  setTimeout(() => {
    userStore.register(registerForm.username, registerForm.email, registerForm.password)
    loading.value = false
    ElMessage.success('注册成功')
    router.push('/')
  }, 1000)
}
</script>
