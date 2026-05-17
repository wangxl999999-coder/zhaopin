<template>
  <div>
    <section class="gradient-bg py-16 px-4">
      <div class="max-w-4xl mx-auto text-center">
        <h1 class="text-3xl md:text-4xl font-bold text-white mb-4">找到理想的工作</h1>
        <p class="text-white/80 mb-8 text-lg">海量优质岗位，智能匹配，助力您的职业发展</p>
        <div class="search-box flex items-center p-2 max-w-2xl mx-auto">
          <el-input
            v-model="searchKeyword"
            placeholder="搜索职位、公司"
            size="large"
            class="flex-1"
            :prefix-icon="Search"
            @keyup.enter="handleSearch"
          />
          <el-button type="primary" size="large" class="ml-2 rounded-full" @click="handleSearch">
            搜索
          </el-button>
        </div>
        <div class="flex flex-wrap justify-center gap-2 mt-4">
          <el-button v-for="tag in hotTags" :key="tag" size="small" text class="text-white/80 hover:text-white" @click="quickSearch(tag)">
            {{ tag }}
          </el-button>
        </div>
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-4 py-12">
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-2xl font-bold text-gray-800">🔥 精选岗位</h2>
        <router-link to="/jobs">
          <el-button type="primary" text>查看全部 →</el-button>
        </router-link>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <JobCard v-for="job in hotJobs" :key="job.id" :job="job" />
      </div>
    </section>

    <section class="bg-gray-50 py-12">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-2xl font-bold text-gray-800">✨ 最新岗位</h2>
          <router-link to="/jobs">
            <el-button type="primary" text>查看全部 →</el-button>
          </router-link>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <JobCard v-for="job in newJobs" :key="job.id" :job="job" />
        </div>
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-4 py-12">
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-2xl font-bold text-gray-800">🏢 热门公司</h2>
        <router-link to="/companies">
          <el-button type="primary" text>查看全部 →</el-button>
        </router-link>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <CompanyCard v-for="company in companies" :key="company.id" :company="company" />
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-4 py-12">
      <h2 class="text-2xl font-bold text-gray-800 mb-8 text-center">📊 职位分类</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div
          v-for="category in categories"
          :key="category.name"
          class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer text-center"
          @click="filterByCategory(category.name)"
        >
          <el-icon class="text-4xl text-primary mb-3">
            <component :is="category.icon" />
          </el-icon>
          <h3 class="font-semibold text-gray-800 mb-2">{{ category.name }}</h3>
          <p class="text-gray-500 text-sm">{{ category.count }}个职位</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useJobStore } from '@/stores/job'
import { useCompanyStore } from '@/stores/company'
import JobCard from '@/components/JobCard.vue'
import CompanyCard from '@/components/CompanyCard.vue'
import { Search, Monitor, Connection, DataLine, TrendCharts } from '@element-plus/icons-vue'

const router = useRouter()
const jobStore = useJobStore()
const companyStore = useCompanyStore()

const searchKeyword = ref('')
const hotTags = ['前端开发', 'Java开发', '产品经理', 'UI设计师', '数据分析师']

const hotJobs = computed(() => jobStore.hotJobs)
const newJobs = computed(() => jobStore.newJobs)
const companies = computed(() => companyStore.companies.slice(0, 4))

const categories = [
  { name: '技术', icon: Monitor, count: 500 },
  { name: '产品', icon: Connection, count: 200 },
  { name: '运营', icon: TrendCharts, count: 180 },
  { name: '数据', icon: DataLine, count: 150 }
]

const handleSearch = () => {
  if (searchKeyword.value) {
    jobStore.setSearchKeyword(searchKeyword.value)
    router.push('/jobs')
  }
}

const quickSearch = (tag: string) => {
  jobStore.setSearchKeyword(tag)
  router.push('/jobs')
}

const filterByCategory = (category: string) => {
  jobStore.selectedCategory = category
  router.push('/jobs')
}
</script>
