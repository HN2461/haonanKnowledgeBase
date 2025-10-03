<template>
  <div class="personal-docs">
    <div class="docs-header">
      <h1>个人技术文档</h1>
      <p>这里存放我总结的各种技术文档和知识点</p>
    </div>

    <div class="docs-categories">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :md="8" :lg="6" v-for="category in categories" :key="category.id">
          <el-card 
            class="category-card" 
            :body-style="{ padding: '20px' }"
            @click="navigateToCategory(category.path)"
          >
            <div class="category-content">
              <el-icon class="category-icon" :size="40">
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

    <div class="recent-docs">
      <h2>最近更新的文档</h2>
      <el-timeline>
        <el-timeline-item
          v-for="doc in recentDocs"
          :key="doc.id"
          :timestamp="doc.updateTime"
          :type="doc.type"
        >
          <el-card>
            <div class="doc-item">
              <div class="doc-header">
                <h4>{{ doc.title }}</h4>
                <el-tag :type="doc.categoryType" size="small">{{ doc.category }}</el-tag>
              </div>
              <p class="doc-description">{{ doc.description }}</p>
              <div class="doc-meta">
                <span class="doc-tags">
                  <el-tag
                    v-for="tag in doc.tags"
                    :key="tag"
                    size="small"
                    type="info"
                  >
                    {{ tag }}
                  </el-tag>
                </span>
              </div>
            </div>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 文档分类数据
const categories = ref([
  {
    id: 'frontend',
    title: '前端技术',
    description: '前端开发相关技术总结和文档',
    icon: 'Monitor',
    path: '/personal-docs/frontend',
    count: 12,
    color: '#409EFF'
  },
  {
    id: 'notes',
    title: '随记文档',
    description: '日常学习笔记、心得体会、技术随记',
    icon: 'EditPen',
    path: '/personal-docs/notes',
    count: 25,
    color: '#67C23A'
  }
])

// 最近更新的文档
const recentDocs = ref([
  {
    id: 1,
    title: 'Vue 3 Composition API 深度解析',
    description: '详细介绍了Vue 3的Composition API的使用方法和最佳实践，包括setup函数、响应式API、生命周期钩子等核心概念。',
    category: '前端技术',
    categoryType: 'primary',
    tags: ['Vue.js', 'Composition API', '前端框架'],
    updateTime: '2025-10-03 16:30',
    type: 'primary'
  },
  {
    id: 2,
    title: '今天学习的新技术点',
    description: '记录今天学习到的新技术知识点，包括遇到的问题和解决方案，以及个人的理解和思考。',
    category: '随记文档',
    categoryType: 'success',
    tags: ['学习笔记', '技术总结', '心得体会'],
    updateTime: '2025-10-03 15:20',
    type: 'success'
  },
  {
    id: 3,
    title: '项目开发中的踩坑记录',
    description: '记录在项目开发过程中遇到的各种问题和解决方案，避免以后再次踩坑。',
    category: '随记文档',
    categoryType: 'warning',
    tags: ['踩坑记录', '问题解决', '经验总结'],
    updateTime: '2025-10-02 14:15',
    type: 'warning'
  },
  {
    id: 4,
    title: '前端性能优化实践',
    description: '总结前端性能优化的各种方法和技巧，包括代码分割、懒加载、缓存策略等。',
    category: '前端技术',
    categoryType: 'primary',
    tags: ['性能优化', '前端技术', '最佳实践'],
    updateTime: '2025-10-01 10:45',
    type: 'primary'
  }
])

// 导航到分类页面
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
}

.category-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.category-content {
  text-align: center;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.category-icon {
  color: #409EFF;
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

.recent-docs h2 {
  font-size: 24px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 20px 0;
}

.doc-item {
  padding: 10px 0;
}

.doc-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.doc-header h4 {
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
}

.doc-description {
  font-size: 14px;
  color: #5a6c7d;
  line-height: 1.6;
  margin: 0 0 15px 0;
}

.doc-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.doc-tags .el-tag {
  margin-right: 8px;
  margin-bottom: 5px;
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
  
  .recent-docs h2 {
    font-size: 20px;
  }
}
</style>
