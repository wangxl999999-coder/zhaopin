<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <div class="flex flex-col lg:flex-row gap-8">
      <aside class="lg:w-72 shrink-0">
        <el-card class="sticky top-24">
          <template #header>
            <div class="flex items-center justify-between">
              <span class="font-semibold">筛选条件</span>
              <el-button type="text" size="small" @click="resetFilters">重置</el-button>
            </div>
          </template>
          
          <div class="mb-6">
            <h4 class="font-medium text-gray-700 mb-3">职位类别</h4>
            <el-cascader
              v-model="selectedCascade"
              :options="jobCategories"
              placeholder="选择职位类别"
              clearable
              @change="handleCategoryChange"
            />
          </div>

          <div class="mb-6">
            <h4 class="font-medium text-gray-700 mb-3">薪资范围</h4>
            <div class="flex flex-wrap gap-2">
              <el-tag
                v-for="salary in salaryRanges"
                :key="salary"
                class="filter-tag"
                :class="{ active: selectedSalary === salary }"
                effect="plain"
                @click="selectedSalary = selectedSalary === salary ? '' : salary"
              >
                {{ salary }}
              </el-tag>
            </div>
          </div>

          <div class="mb-6">
            <h4 class="font-medium text-gray-700 mb-3">工作经验</h4>
            <div class="flex flex-wrap gap-2">
              <el-tag
                v-for="exp in experienceLevels"
                :key="exp"
                class="filter-tag"
                :class="{ active: selectedExperience === exp }"
                effect="plain"
                @click="selectedExperience = selectedExperience === exp ? '' : exp"
              >
                {{ exp }}
              </el-tag>
            </div>
          </div>

          <div class="mb-6">
            <h4 class="font-medium text-gray-700 mb-3">学历要求</h4>
            <div class="flex flex-wrap gap-2">
              <el-tag
                v-for="edu in educationLevels"
                :key="edu"
                class="filter-tag"
                :class="{ active: selectedEducation === edu }"
                effect="plain"
                @click="selectedEducation = selectedEducation === edu ? '' : edu"
              >
                {{ edu }}
              </el-tag>
            </div>
          </div>

          <div class="mb-6">
            <h4 class="font-medium text-gray-700 mb-3">行业</h4>
            <div class="flex flex-wrap gap-2">
              <el-tag
                v-for="industry in industries"
                :key="industry"
                class="filter-tag"
                :class="{ active: selectedIndustry === industry }"
                effect="plain"
                @click="selectedIndustry = selectedIndustry === industry ? '' : industry"
              >
                {{ industry }}
              </el-tag>
            </div>
          </div>

          <div>
            <h4 class="font-medium text-gray-700 mb-3">工作城市</h4>
            <div class="flex flex-wrap gap-2">
              <el-tag
                v-for="city in cities"
                :key="city"
                class="filter-tag"
                :class="{ active: selectedCity === city }"
                effect="plain"
                @click="selectedCity = selectedCity === city ? '' : city"
              >
                {{ city }}
              </el-tag>
            </div>
          </div>
        </el-card>
      </aside>

      <main class="flex-1">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h1 class="text-2xl font-bold text-gray-800">职位列表</h1>
            <p class="text-gray-500 mt-1">共 {{ filteredJobs.length }} 个职位</p>
          </div>
          <el-select v-model="sortBy" placeholder="排序方式" size="large">
            <el-option label="最新发布" value="newest" />
            <el-option label="薪资最高" value="salary" />
          </el-select>
        </div>

        <div class="space-y-4">
          <JobCard v-for="job in sortedJobs" :key="job.id" :job="job" />
          
          <el-empty v-if="filteredJobs.length === 0" description="暂无符合条件的职位" />
        </div>

        <div class="flex justify-center mt-8" v-if="filteredJobs.length > 0">
          <el-pagination
            v-model:current-page="currentPage"
            :page-size="pageSize"
            :total="filteredJobs.length"
            layout="prev, pager, next"
          />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useJobStore } from '@/stores/job'
import JobCard from '@/components/JobCard.vue'
import { jobCategories, salaryRanges, experienceLevels, educationLevels, industries, cities } from '@/data/mock'

const jobStore = useJobStore()

const selectedCascade = ref<string[]>([])
const sortBy = ref('newest')
const currentPage = ref(1)
const pageSize = ref(10)

const selectedSalary = computed({
  get: () => jobStore.selectedSalary,
  set: (val) => jobStore.selectedSalary = val
})

const selectedExperience = computed({
  get: () => jobStore.selectedExperience,
  set: (val) => jobStore.selectedExperience = val
})

const selectedEducation = computed({
  get: () => jobStore.selectedEducation,
  set: (val) => jobStore.selectedEducation = val
})

const selectedIndustry = computed({
  get: () => jobStore.selectedIndustry,
  set: (val) => jobStore.selectedIndustry = val
})

const selectedCity = computed({
  get: () => jobStore.selectedCity,
  set: (val) => jobStore.selectedCity = val
})

const filteredJobs = computed(() => jobStore.filteredJobs)

const sortedJobs = computed(() => {
  const jobs = [...filteredJobs.value]
  if (sortBy.value === 'salary') {
    return jobs.sort((a, b) => b.salaryMax - a.salaryMax)
  }
  return jobs.sort((a, b) => new Date(b.publishTime).getTime() - new Date(a.publishTime).getTime())
})

const handleCategoryChange = (value: string[]) => {
  jobStore.selectedCategory = value[value.length - 1] || ''
}

const resetFilters = () => {
  selectedCascade.value = []
  jobStore.resetFilters()
}
</script>
