<template>
  <div class="max-w-5xl mx-auto px-4 py-8">
    <div v-if="company" class="space-y-6">
      <el-card>
        <div class="flex flex-col md:flex-row md:items-start gap-6">
          <img :src="company.logo" :alt="company.name" class="w-24 h-24 rounded-xl object-cover" />
          <div class="flex-1">
            <h1 class="text-2xl font-bold text-gray-800 mb-2">{{ company.name }}</h1>
            <div class="flex flex-wrap gap-3 mb-4">
              <el-tag type="info">🏭 {{ company.industry }}</el-tag>
              <el-tag type="info">📋 {{ company.type }}</el-tag>
              <el-tag type="info">👥 {{ company.scale }}</el-tag>
              <el-tag type="info">📍 {{ company.location }}</el-tag>
            </div>
            <div class="flex flex-wrap gap-2">
              <el-tag v-for="benefit in company.benefits" :key="benefit" type="success">
                {{ benefit }}
              </el-tag>
            </div>
          </div>
          <div>
            <a :href="company.website" target="_blank">
              <el-button type="primary" size="large">
                <el-icon class="mr-2"><Link /></el-icon>
                访问官网
              </el-button>
            </a>
          </div>
        </div>
      </el-card>

      <el-card>
        <template #header>
          <h3 class="font-semibold text-lg">📝 公司介绍</h3>
        </template>
        <div class="text-gray-700 leading-relaxed">
          {{ company.description }}
        </div>
      </el-card>

      <el-card>
        <template #header>
          <h3 class="font-semibold text-lg">💼 在招职位 ({{ companyJobs.length }})</h3>
        </template>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <JobCard v-for="job in companyJobs" :key="job.id" :job="job" />
          
          <el-empty v-if="companyJobs.length === 0" description="暂无在招职位" />
        </div>
      </el-card>
    </div>

    <el-empty v-else description="公司不存在" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCompanyStore } from '@/stores/company'
import { useJobStore } from '@/stores/job'
import JobCard from '@/components/JobCard.vue'
import { Link } from '@element-plus/icons-vue'

const route = useRoute()
const companyStore = useCompanyStore()
const jobStore = useJobStore()

const company = computed(() => companyStore.getCompanyById(Number(route.params.id)))
const companyJobs = computed(() => {
  if (!company.value) return []
  return jobStore.jobs.filter(job => job.companyId === company.value!.id)
})
</script>
