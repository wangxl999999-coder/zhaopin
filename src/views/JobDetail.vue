<template>
  <div class="max-w-5xl mx-auto px-4 py-8">
    <div v-if="job" class="space-y-6">
      <el-card>
        <div class="flex flex-col md:flex-row md:items-start md:justify-between">
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-3">
              <h1 class="text-2xl font-bold text-gray-800">{{ job.title }}</h1>
              <el-button
                :icon="userStore.isFavorite(job.id) ? StarFilled : Star"
                circle
                :type="userStore.isFavorite(job.id) ? 'warning' : ''"
                @click="toggleFavorite"
                class="text-yellow-500"
              />
            </div>
            <div class="salary-tag text-lg mb-4 w-fit">{{ job.salary }}</div>
            <div class="flex flex-wrap gap-3 mb-4">
              <el-tag type="info" size="large">📍 {{ job.location }}</el-tag>
              <el-tag type="info" size="large">💼 {{ job.experience }}</el-tag>
              <el-tag type="info" size="large">🎓 {{ job.education }}</el-tag>
              <el-tag type="info" size="large">🏭 {{ job.industry }}</el-tag>
            </div>
            <div class="flex flex-wrap gap-2">
              <el-tag v-for="tag in job.tags" :key="tag" effect="plain">{{ tag }}</el-tag>
            </div>
          </div>
          <div class="flex gap-3 mt-4 md:mt-0">
            <el-button type="primary" size="large" @click="handleChat">
              <el-icon class="mr-2"><ChatDotRound /></el-icon>
              立即沟通
            </el-button>
            <el-button size="large">
              <el-icon class="mr-2"><DocumentCopy /></el-icon>
              投递简历
            </el-button>
          </div>
        </div>
      </el-card>

      <el-card>
        <template #header>
          <h3 class="font-semibold text-lg">📝 职位描述</h3>
        </template>
        <div class="text-gray-700 leading-relaxed whitespace-pre-line">
          {{ job.description }}
        </div>
      </el-card>

      <el-card>
        <template #header>
          <h3 class="font-semibold text-lg">🎁 福利待遇</h3>
        </template>
        <div class="flex flex-wrap gap-3">
          <el-tag v-for="benefit in job.benefits" :key="benefit" type="success" size="large">
            {{ benefit }}
          </el-tag>
        </div>
      </el-card>

      <el-card>
        <template #header>
          <h3 class="font-semibold text-lg">🏢 公司信息</h3>
        </template>
        <div class="flex items-center cursor-pointer" @click="goToCompany">
          <img :src="company?.logo" :alt="company?.name" class="w-16 h-16 rounded-lg object-cover mr-4" />
          <div class="flex-1">
            <h4 class="text-lg font-semibold text-gray-800">{{ company?.name }}</h4>
            <p class="text-gray-500">{{ company?.industry }} · {{ company?.scale }} · {{ company?.location }}</p>
          </div>
          <el-icon class="text-gray-400"><ArrowRight /></el-icon>
        </div>
      </el-card>

      <div class="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex gap-3">
        <el-button class="flex-1" size="large">
          <el-icon class="mr-2"><DocumentCopy /></el-icon>
          投递简历
        </el-button>
        <el-button type="primary" class="flex-1" size="large" @click="handleChat">
          <el-icon class="mr-2"><ChatDotRound /></el-icon>
          立即沟通
        </el-button>
      </div>
    </div>

    <el-empty v-else description="职位不存在" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useJobStore } from '@/stores/job'
import { useCompanyStore } from '@/stores/company'
import { useUserStore } from '@/stores/user'
import { useMessageStore } from '@/stores/message'
import { ElMessage } from 'element-plus'
import { Star, StarFilled, ChatDotRound, DocumentCopy, ArrowRight } from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()
const jobStore = useJobStore()
const companyStore = useCompanyStore()
const userStore = useUserStore()
const messageStore = useMessageStore()

const job = computed(() => jobStore.getJobById(Number(route.params.id)))
const company = computed(() => job.value ? companyStore.getCompanyById(job.value.companyId) : null)

const toggleFavorite = () => {
  if (!userStore.isLoggedIn) {
    ElMessage.warning('请先登录')
    router.push('/login')
    return
  }
  if (job.value) {
    userStore.toggleFavorite(job.value.id)
    ElMessage.success(userStore.isFavorite(job.value.id) ? '已收藏' : '已取消收藏')
  }
}

const handleChat = () => {
  if (!userStore.isLoggedIn) {
    ElMessage.warning('请先登录')
    router.push('/login')
    return
  }
  router.push('/messages')
}

const goToCompany = () => {
  if (company.value) {
    router.push(`/company/${company.value.id}`)
  }
}
</script>
