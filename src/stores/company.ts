import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Company } from '@/types'
import { mockCompanies } from '@/data/mock'

export const useCompanyStore = defineStore('company', () => {
  const companies = ref<Company[]>(mockCompanies)
  const selectedIndustry = ref('')
  const selectedType = ref('')
  const selectedScale = ref('')
  const selectedCity = ref('')

  const filteredCompanies = computed(() => {
    return companies.value.filter(company => {
      if (selectedIndustry.value && company.industry !== selectedIndustry.value) {
        return false
      }
      if (selectedType.value && company.type !== selectedType.value) {
        return false
      }
      if (selectedScale.value && company.scale !== selectedScale.value) {
        return false
      }
      if (selectedCity.value && company.location !== selectedCity.value) {
        return false
      }
      return true
    })
  })

  const getCompanyById = (id: number) => {
    return companies.value.find(company => company.id === id)
  }

  const getCompanyJobs = (companyId: number) => {
    const { mockJobs } = require('@/data/mock')
    return mockJobs.filter((job: any) => job.companyId === companyId)
  }

  const resetFilters = () => {
    selectedIndustry.value = ''
    selectedType.value = ''
    selectedScale.value = ''
    selectedCity.value = ''
  }

  return {
    companies,
    filteredCompanies,
    selectedIndustry,
    selectedType,
    selectedScale,
    selectedCity,
    getCompanyById,
    getCompanyJobs,
    resetFilters
  }
})
