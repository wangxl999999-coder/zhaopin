<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold text-gray-800 mb-6">🗺️ 地图找工作</h1>
    
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div class="lg:col-span-3">
        <el-card class="h-full">
          <div ref="mapContainer" class="map-container rounded-lg"></div>
        </el-card>
      </div>

      <aside>
        <el-card class="sticky top-24">
          <template #header>
            <span class="font-semibold">热门城市</span>
          </template>
          <div class="space-y-3">
            <div
              v-for="region in mapRegions"
              :key="region.name"
              class="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
              @click="selectRegion(region)"
            >
              <div>
                <h4 class="font-medium text-gray-800">{{ region.name }}</h4>
                <p class="text-sm text-gray-500">{{ region.companyCount }}家公司</p>
              </div>
              <el-icon class="text-gray-400"><ArrowRight /></el-icon>
            </div>
          </div>
        </el-card>

        <el-card class="mt-6" v-if="regionJobs.length > 0">
          <template #header>
            <span class="font-semibold">该区域职位</span>
          </template>
          <div class="space-y-3 max-h-96 overflow-y-auto">
            <div
              v-for="job in regionJobs"
              :key="job.id"
              class="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
              @click="goToJob(job.id)"
            >
              <h4 class="font-medium text-gray-800 truncate">{{ job.title }}</h4>
              <p class="text-sm text-primary font-semibold">{{ job.salary }}</p>
              <p class="text-sm text-gray-500 truncate">{{ job.company }}</p>
            </div>
          </div>
        </el-card>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useJobStore } from '@/stores/job'
import { mockMapRegions } from '@/data/mock'
import type { MapRegion } from '@/types'
import L from 'leaflet'
import { ArrowRight } from '@element-plus/icons-vue'

const router = useRouter()
const jobStore = useJobStore()

const mapContainer = ref<HTMLElement | null>(null)
const currentRegion = ref<MapRegion | null>(null)

const mapRegions = mockMapRegions

const regionJobs = computed(() => {
  if (!currentRegion.value) return []
  return jobStore.jobs.filter(job => job.location === currentRegion.value!.name)
})

let map: L.Map | null = null

const initMap = () => {
  if (!mapContainer.value) return

  map = L.map(mapContainer.value).setView([35.8617, 104.1954], 4)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map)

  mapRegions.forEach(region => {
    const marker = L.marker([region.lat, region.lng]).addTo(map!)
    marker.bindPopup(`
      <div class="p-2">
        <h4 class="font-bold">${region.name}</h4>
        <p class="text-sm">${region.companyCount}家公司</p>
      </div>
    `)
    marker.on('click', () => selectRegion(region))
  })
}

const selectRegion = (region: MapRegion) => {
  currentRegion.value = region
  if (map) {
    map.setView([region.lat, region.lng], region.zoom)
  }
}

const goToJob = (jobId: number) => {
  router.push(`/job/${jobId}`)
}

onMounted(() => {
  setTimeout(() => {
    initMap()
  }, 100)
})
</script>

<style>
.leaflet-container {
  height: 600px;
  width: 100%;
}
</style>
