import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User, Resume } from '@/types'
import { mockResume } from '@/data/mock'

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)
  const isLoggedIn = ref(false)
  const resume = ref<Resume>(mockResume)
  const favorites = ref<number[]>([])

  const login = (username: string, password: string): boolean => {
    if (username && password) {
      user.value = {
        id: 1,
        username,
        email: `${username}@example.com`,
        avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%20professional&image_size=square',
        phone: '13800138000'
      }
      isLoggedIn.value = true
      localStorage.setItem('user', JSON.stringify(user.value))
      return true
    }
    return false
  }

  const register = (username: string, email: string, password: string): boolean => {
    if (username && email && password) {
      user.value = {
        id: 1,
        username,
        email,
        avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%20professional&image_size=square',
        phone: ''
      }
      isLoggedIn.value = true
      localStorage.setItem('user', JSON.stringify(user.value))
      return true
    }
    return false
  }

  const logout = () => {
    user.value = null
    isLoggedIn.value = false
    localStorage.removeItem('user')
  }

  const toggleFavorite = (jobId: number) => {
    const index = favorites.value.indexOf(jobId)
    if (index > -1) {
      favorites.value.splice(index, 1)
    } else {
      favorites.value.push(jobId)
    }
  }

  const isFavorite = (jobId: number) => {
    return favorites.value.includes(jobId)
  }

  const updateResume = (newResume: Resume) => {
    resume.value = newResume
  }

  const checkAuth = () => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      user.value = JSON.parse(savedUser)
      isLoggedIn.value = true
    }
  }

  return {
    user,
    isLoggedIn,
    resume,
    favorites,
    login,
    register,
    logout,
    toggleFavorite,
    isFavorite,
    updateResume,
    checkAuth
  }
})
