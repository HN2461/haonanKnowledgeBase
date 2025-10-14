<template>
  <div class="personal-docs">
    <div class="docs-header">
      <h1>个人技术文档</h1>
      <p>这里存放我总结的各种技术文档和知识点</p>
    </div>

    <!-- 文档分类 -->
    <div class="docs-categories">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :md="8" :lg="6" v-for="category in categories" :key="category.id">
          <el-card 
            class="category-card" 
            :body-style="{ padding: '20px' }"
            @click="navigateToCategory(category.path)"
          >
            <div class="category-content">
              <el-icon class="category-icon" :size="40" :style="{ color: category.color }">
                <component :is="category.icon" />
              </el-icon>
              <h3>{{ category.title }}</h3>
              <p>{{ category.description }}</p>
              <div class="category-stats">
                <span>{{ category.count }} 篇文档</span>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { documentCategories, documentUtils } from '../data/documentStore'

const router = useRouter()

// 计算属性
const categories = computed(() => {
  return Object.values(documentCategories).map(category => ({
    ...category,
    count: documentUtils.getDocumentsByCategory(category.id).length
  }))
})

// 方法
const navigateToCategory = (path) => {
  router.push(path)
}
</script>

<style scoped>
.personal-docs {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.docs-header {
  text-align: center;
  margin-bottom: 40px;
}

.docs-header h1 {
  font-size: 32px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 10px 0;
}

.docs-header p {
  font-size: 16px;
  color: #6c757d;
  margin: 0;
}

.docs-categories {
  margin-bottom: 50px;
}

.category-card {
  cursor: pointer;
  transition: all 0.3s ease;
  height: 200px;
  margin-bottom: 20px;
  border: 2px solid transparent;
}

.category-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  border-color: #409EFF;
}

.category-content {
  text-align: center;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.category-icon {
  margin-bottom: 15px;
}

.category-content h3 {
  font-size: 20px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 10px 0;
}

.category-content p {
  font-size: 14px;
  color: #6c757d;
  margin: 0 0 15px 0;
  line-height: 1.5;
}

.category-stats {
  font-size: 12px;
  color: #909399;
  font-weight: 500;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .personal-docs {
    padding: 15px;
  }
  
  .docs-header h1 {
    font-size: 24px;
  }
  
  .category-card {
    height: 160px;
  }
  
  .category-content h3 {
    font-size: 18px;
  }
}
</style>