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

          <div class="mb-6">
            <h4 class="font-medium text-gray-700 mb-3">公司类型</h4>
            <div class="flex flex-wrap gap-2">
              <el-tag
                v-for="type in companyTypes"
                :key="type"
                class="filter-tag"
                :class="{ active: selectedType === type }"
                effect="plain"
                @click="selectedType = selectedType === type ? '' : type"
              >
                {{ type }}
              </el-tag>
            </div>
          </div>

          <div class="mb-6">
            <h4 class="font-medium text-gray-700 mb-3">公司规模</h4>
            <div class="flex flex-wrap gap-2">
              <el-tag
                v-for="scale in companyScales"
                :key="scale"
                class="filter-tag"
                :class="{ active: selectedScale === scale }"
                effect="plain"
                @click="selectedScale = selectedScale === scale ? '' : scale"
              >
                {{ scale }}
              </el-tag>
            </div>
          </div>

          <div>
            <h4 class="font-medium text-gray-700 mb-3">所在城市</h4>
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
            <h1 class="text-2xl font-bold text-gray-800">公司列表</h1>
            <p class="text-gray-500 mt-1">共 {{ filteredCompanies.length }} 家公司</p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CompanyCard v-for="company in filteredCompanies" :key="company.id" :company="company" />
          
          <el-empty v-if="filteredCompanies.length === 0" description="暂无符合条件的公司" />
        </div>

        <div class="flex justify-center mt-8" v-if="filteredCompanies.length > 0">
          <el-pagination
            v-model:current-page="currentPage"
            :page-size="pageSize"
            :total="filteredCompanies.length"
            layout="prev, pager, next"
          />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCompanyStore } from '@/stores/company'
import CompanyCard from '@/components/CompanyCard.vue'
import { industries, companyTypes, companyScales, cities } from '@/data/mock'

const companyStore = useCompanyStore()

const currentPage = ref(1)
const pageSize = ref(12)

const selectedIndustry = computed({
  get: () => companyStore.selectedIndustry,
  set: (val) => companyStore.selectedIndustry = val
})

const selectedType = computed({
  get: () => companyStore.selectedType,
  set: (val) => companyStore.selectedType = val
})

const selectedScale = computed({
  get: () => companyStore.selectedScale,
  set: (val) => companyStore.selectedScale = val
})

const selectedCity = computed({
  get: () => companyStore.selectedCity,
  set: (val) => companyStore.selectedCity = val
})

const filteredCompanies = computed(() => companyStore.filteredCompanies)

const resetFilters = () => {
  companyStore.resetFilters()
}
</script>
