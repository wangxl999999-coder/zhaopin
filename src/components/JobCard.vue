<template>
  <el-card class="job-card cursor-pointer h-full" shadow="hover" @click="goToDetail">
    <div class="flex flex-col h-full">
      <div class="flex justify-between items-start mb-3">
        <h3 class="text-lg font-semibold text-gray-800 truncate flex-1 mr-2">{{ job.title }}</h3>
        <el-button 
          :icon="userStore.isFavorite(job.id) ? StarFilled : Star" 
          circle 
          size="small"
          :type="userStore.isFavorite(job.id) ? 'warning' : ''"
          @click.stop="toggleFavorite"
          class="text-yellow-500 hover:text-yellow-600"
        />
      </div>
      <div class="salary-tag text-sm mb-3 w-fit">{{ job.salary }}</div>
      <div class="flex items-center text-gray-500 text-sm mb-3">
        <el-icon class="mr-1"><OfficeBuilding /></el-icon>
        <span class="truncate">{{ job.company }}</span>
      </div>
      <div class="flex flex-wrap gap-2 mb-3">
        <el-tag size="small" type="info">{{ job.location }}</el-tag>
        <el-tag size="small" type="info">{{ job.experience }}</el-tag>
        <el-tag size="small" type="info">{{ job.education }}</el-tag>
      </div>
      <div class="flex flex-wrap gap-2 mb-3">
        <el-tag v-for="tag in job.tags.slice(0, 3)" :key="tag" size="small" effect="plain">{{ tag }}</el-tag>
      </div>
      <div class="mt-auto flex items-center justify-between text-gray-400 text-xs">
        <span>{{ job.publishTime }} 发布</span>
        <div class="flex gap-2">
          <el-tag v-if="job.isHot" size="small" type="danger" effect="dark">热招</el-tag>
          <el-tag v-if="job.isNew" size="small" type="success" effect="dark">最新</el-tag>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import type { Job } from '@/types'
import { OfficeBuilding, Star, StarFilled } from '@element-plus/icons-vue'

const props = defineProps<{
  job: Job
}>()

const router = useRouter()
const userStore = useUserStore()

const goToDetail = () => {
  router.push(`/job/${props.job.id}`)
}

const toggleFavorite = () => {
  userStore.toggleFavorite(props.job.id)
}
</script>
