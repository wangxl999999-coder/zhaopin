import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Job } from '@/types'
import { mockJobs } from '@/data/mock'

export const useJobStore = defineStore('job', () => {
  const jobs = ref<Job[]>(mockJobs)
  const searchKeyword = ref('')
  const selectedCategory = ref('')
  const selectedSalary = ref('')
  const selectedExperience = ref('')
  const selectedEducation = ref('')
  const selectedIndustry = ref('')
  const selectedCity = ref('')

  const hotJobs = computed(() => jobs.value.filter(job => job.isHot))
  const newJobs = computed(() => jobs.value.filter(job => job.isNew))

  const filteredJobs = computed(() => {
    return jobs.value.filter(job => {
      if (searchKeyword.value) {
        const keyword = searchKeyword.value.toLowerCase()
        if (!job.title.toLowerCase().includes(keyword) && 
            !job.company.toLowerCase().includes(keyword)) {
          return false
        }
      }
      if (selectedSalary.value && !job.salary.includes(selectedSalary.value.split('-')[0])) {
        return false
      }
      if (selectedExperience.value && job.experience !== selectedExperience.value) {
        return false
      }
      if (selectedEducation.value && job.education !== selectedEducation.value) {
        return false
      }
      if (selectedIndustry.value && job.industry !== selectedIndustry.value) {
        return false
      }
      if (selectedCity.value && job.location !== selectedCity.value) {
        return false
      }
      return true
    })
  })

  const getJobById = (id: number) => {
    return jobs.value.find(job => job.id === id)
  }

  const setSearchKeyword = (keyword: string) => {
    searchKeyword.value = keyword
  }

  const resetFilters = () => {
    selectedCategory.value = ''
    selectedSalary.value = ''
    selectedExperience.value = ''
    selectedEducation.value = ''
    selectedIndustry.value = ''
    selectedCity.value = ''
  }

  return {
    jobs,
    hotJobs,
    newJobs,
    filteredJobs,
    searchKeyword,
    selectedCategory,
    selectedSalary,
    selectedExperience,
    selectedEducation,
    selectedIndustry,
    selectedCity,
    getJobById,
    setSearchKeyword,
    resetFilters
  }
})
