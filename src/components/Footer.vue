<template>
  <footer class="bg-gray-800 text-white py-12 mt-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 class="text-xl font-bold mb-4">智聘</h3>
          <p class="text-gray-400 text-sm">专业的招聘平台，连接优秀人才与优质企业，让每个人找到理想的工作。</p>
        </div>
        <div>
          <h4 class="font-semibold mb-4">求职者</h4>
          <ul class="space-y-2 text-gray-400 text-sm">
            <li><router-link to="/jobs" class="hover:text-white">找工作</router-link></li>
            <li><router-link to="/resume" class="hover:text-white">简历管理</router-link></li>
            <li><router-link to="/map" class="hover:text-white">地图找工作</router-link></li>
          </ul>
        </div>
        <div>
          <h4 class="font-semibold mb-4">企业服务</h4>
          <ul class="space-y-2 text-gray-400 text-sm">
            <li><a href="#" class="hover:text-white">发布职位</a></li>
            <li><a href="#" class="hover:text-white">人才搜索</a></li>
            <li><a href="#" class="hover:text-white">企业认证</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-semibold mb-4">关于我们</h4>
          <ul class="space-y-2 text-gray-400 text-sm">
            <li><a href="#" class="hover:text-white">公司介绍</a></li>
            <li><a href="#" class="hover:text-white">联系我们</a></li>
            <li><a href="#" class="hover:text-white">帮助中心</a></li>
          </ul>
        </div>
      </div>
      <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
        <p>&copy; 2024 智聘. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
</script>
