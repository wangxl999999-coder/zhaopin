<template>
  <el-card class="job-card cursor-pointer h-full" shadow="hover" @click="goToDetail">
    <div class="flex flex-col h-full">
      <div class="flex items-center mb-4">
        <img :src="company.logo" :alt="company.name" class="w-16 h-16 rounded-lg object-cover mr-4" />
        <div class="flex-1 min-w-0">
          <h3 class="text-lg font-semibold text-gray-800 truncate">{{ company.name }}</h3>
          <p class="text-gray-500 text-sm truncate">{{ company.industry }}</p>
        </div>
      </div>
      <div class="flex flex-wrap gap-2 mb-3">
        <el-tag size="small" type="info">{{ company.type }}</el-tag>
        <el-tag size="small" type="info">{{ company.scale }}</el-tag>
        <el-tag size="small" type="info">{{ company.location }}</el-tag>
      </div>
      <p class="text-gray-600 text-sm line-clamp-2 mb-4">{{ company.description }}</p>
      <div class="mt-auto flex flex-wrap gap-1">
        <el-tag v-for="benefit in company.benefits.slice(0, 4)" :key="benefit" size="small" effect="plain" type="success">{{ benefit }}</el-tag>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { Company } from '@/types'

const props = defineProps<{
  company: Company
}>()

const router = useRouter()

const goToDetail = () => {
  router.push(`/company/${props.company.id}`)
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
