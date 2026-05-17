<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-gray-800">📄 我的简历</h1>
      <div class="flex gap-3">
        <el-button @click="exportResume">
          <el-icon class="mr-2"><Download /></el-icon>
          导出简历
        </el-button>
        <el-button type="primary" @click="editVisible = true">
          <el-icon class="mr-2"><Edit /></el-icon>
          编辑简历
        </el-button>
      </div>
    </div>

    <el-card class="resume-section">
      <div class="flex items-center gap-6">
        <img :src="resume.avatar" :alt="resume.name" class="w-24 h-24 rounded-full object-cover" />
        <div class="flex-1">
          <h2 class="text-2xl font-bold text-gray-800 mb-2">{{ resume.name }}</h2>
          <div class="flex flex-wrap gap-4 text-gray-600">
            <span class="flex items-center gap-1">
              <el-icon><Phone /></el-icon>
              {{ resume.phone }}
            </span>
            <span class="flex items-center gap-1">
              <el-icon><Message /></el-icon>
              {{ resume.email }}
            </span>
          </div>
        </div>
      </div>
    </el-card>

    <el-card class="resume-section">
      <template #header>
        <div class="flex items-center justify-between">
          <span class="font-semibold">求职意向</span>
        </div>
      </template>
      <div class="space-y-3">
        <div class="flex items-center">
          <span class="w-24 text-gray-500">期望职位:</span>
          <span class="text-gray-800 font-medium">{{ resume.expectedPosition }}</span>
        </div>
        <div class="flex items-center">
          <span class="w-24 text-gray-500">期望薪资:</span>
          <span class="text-gray-800 font-medium">{{ resume.expectedSalary }}</span>
        </div>
        <div class="flex items-center">
          <span class="w-24 text-gray-500">期望城市:</span>
          <span class="text-gray-800 font-medium">{{ resume.expectedCity }}</span>
        </div>
      </div>
    </el-card>

    <el-card class="resume-section">
      <template #header>
        <div class="flex items-center justify-between">
          <span class="font-semibold">个人简介</span>
        </div>
      </template>
      <p class="text-gray-700 leading-relaxed">{{ resume.introduction }}</p>
    </el-card>

    <el-card class="resume-section">
      <template #header>
        <div class="flex items-center justify-between">
          <span class="font-semibold">教育经历</span>
        </div>
      </template>
      <div class="space-y-4">
        <div v-for="edu in resume.education" :key="edu.id" class="border-b pb-4 last:border-0">
          <div class="flex items-center justify-between mb-2">
            <h4 class="font-semibold text-gray-800">{{ edu.school }}</h4>
            <span class="text-gray-500 text-sm">{{ edu.startDate }} - {{ edu.endDate }}</span>
          </div>
          <p class="text-gray-600">{{ edu.major }} · {{ edu.degree }}</p>
        </div>
      </div>
    </el-card>

    <el-card class="resume-section">
      <template #header>
        <div class="flex items-center justify-between">
          <span class="font-semibold">工作经历</span>
        </div>
      </template>
      <div class="space-y-4">
        <div v-for="exp in resume.experience" :key="exp.id" class="border-b pb-4 last:border-0">
          <div class="flex items-center justify-between mb-2">
            <h4 class="font-semibold text-gray-800">{{ exp.company }}</h4>
            <span class="text-gray-500 text-sm">{{ exp.startDate }} - {{ exp.endDate }}</span>
          </div>
          <p class="text-gray-600 mb-2">{{ exp.position }}</p>
          <p class="text-gray-700">{{ exp.description }}</p>
        </div>
      </div>
    </el-card>

    <el-card class="resume-section">
      <template #header>
        <div class="flex items-center justify-between">
          <span class="font-semibold">技能特长</span>
        </div>
      </template>
      <div class="flex flex-wrap gap-2">
        <el-tag v-for="skill in resume.skills" :key="skill" type="primary">{{ skill }}</el-tag>
      </div>
    </el-card>

    <el-dialog v-model="editVisible" title="编辑简历" width="600px">
      <el-form :model="editForm" label-width="100px">
        <el-form-item label="姓名">
          <el-input v-model="editForm.name" />
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="editForm.phone" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="editForm.email" />
        </el-form-item>
        <el-form-item label="期望职位">
          <el-input v-model="editForm.expectedPosition" />
        </el-form-item>
        <el-form-item label="期望薪资">
          <el-input v-model="editForm.expectedSalary" />
        </el-form-item>
        <el-form-item label="期望城市">
          <el-input v-model="editForm.expectedCity" />
        </el-form-item>
        <el-form-item label="个人简介">
          <el-input v-model="editForm.introduction" type="textarea" :rows="3" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="editVisible = false">取消</el-button>
        <el-button type="primary" @click="saveResume">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'
import { Download, Edit, Phone, Message } from '@element-plus/icons-vue'
import type { Resume } from '@/types'

const userStore = useUserStore()

const resume = ref<Resume>(userStore.resume)
const editVisible = ref(false)
const editForm = reactive({
  name: '',
  phone: '',
  email: '',
  expectedPosition: '',
  expectedSalary: '',
  expectedCity: '',
  introduction: ''
})

const exportResume = () => {
  const content = `
简历 - ${resume.value.name}

联系方式
电话: ${resume.value.phone}
邮箱: ${resume.value.email}

求职意向
期望职位: ${resume.value.expectedPosition}
期望薪资: ${resume.value.expectedSalary}
期望城市: ${resume.value.expectedCity}

个人简介
${resume.value.introduction}

教育经历
${resume.value.education.map(edu => `${edu.school} - ${edu.major} (${edu.degree})`).join('\n')}

工作经历
${resume.value.experience.map(exp => `${exp.company} - ${exp.position}\n${exp.description}`).join('\n\n')}

技能特长
${resume.value.skills.join(', ')}
  `

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${resume.value.name}-简历.txt`
  link.click()
  URL.revokeObjectURL(url)
  
  ElMessage.success('简历导出成功')
}

const saveResume = () => {
  Object.assign(resume.value, editForm)
  userStore.updateResume(resume.value)
  editVisible.value = false
  ElMessage.success('简历保存成功')
}

onMounted(() => {
  Object.assign(editForm, resume.value)
})
</script>
