<template>
  <div class="docs-category-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <el-icon class="category-icon" :size="32" :style="{ color: categoryInfo.color }">
          <component :is="categoryInfo.icon" />
        </el-icon>
        <div class="header-text">
          <h1>{{ categoryInfo.title }}</h1>
          <p>{{ categoryInfo.description }}</p>
        </div>
      </div>
      <div class="header-stats">
        <el-statistic title="文档数量" :value="documents.length" />
      </div>
    </div>

    <!-- 文档列表 -->
    <div class="docs-content">
      <el-empty v-if="documents.length === 0" description="暂无文档" />
      <el-row :gutter="20" v-else>
        <el-col 
          :xs="24" 
          :sm="12" 
          :md="8" 
          :lg="6" 
          v-for="doc in documents" 
          :key="doc.id"
        >
          <el-card 
            class="doc-card" 
            @click="openDocument(doc)"
            :body-style="{ padding: '20px' }"
          >
            <div class="doc-header">
              <h3 class="doc-title">{{ doc.title }}</h3>
            </div>
            
            <el-tooltip 
              :content="doc.description" 
              placement="top" 
              :show-after="500"
              :hide-after="100"
            >
              <p class="doc-description">{{ doc.description }}</p>
            </el-tooltip>
            
            <div class="doc-footer">
              <div class="doc-links">
                <el-button 
                  type="primary" 
                  size="small" 
                  @click.stop="openDocument(doc.summaryUrl, doc.summaryLabel)"
                  class="link-button"
                >
                  <el-icon><Link /></el-icon>
                  {{ doc.summaryLabel || '查看文档' }}
                </el-button>
                <el-button 
                  v-if="doc.officialUrl"
                  type="default" 
                  size="small" 
                  @click.stop="openDocument(doc.officialUrl, doc.officialLabel)"
                  class="link-button"
                >
                  <el-icon><Document /></el-icon>
                  {{ doc.officialLabel || '官方文档' }}
                </el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Link, Document } from '@element-plus/icons-vue'
import { documentUtils } from '../data/documentStore'

const route = useRoute()

// 获取分类ID
const categoryId = computed(() => {
  return route.params.category || route.name?.replace('PersonalDocs', '').toLowerCase()
})

// 获取分类信息
const categoryInfo = computed(() => {
  return documentUtils.getCategoryInfo(categoryId.value) || {
    id: categoryId.value,
    title: '未知分类',
    description: '暂无描述',
    icon: 'Document',
    color: '#909399'
  }
})

// 获取该分类的文档
const documents = computed(() => {
  return documentUtils.getDocumentsByCategory(categoryId.value)
})

// 方法
const openDocument = (url, label) => {
  if (url) {
    window.open(url, '_blank')
    ElMessage.success(`正在打开${label}`)
  } else {
    ElMessage.warning('文档链接不存在')
  }
}

// 生命周期
onMounted(() => {
  console.log(`加载分类: ${categoryId.value}`)
})
</script>

<style scoped>
.docs-category-page {
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding: 20px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.header-content {
  display: flex;
  align-items: center;
  gap: 20px;
}

.category-icon {
  flex-shrink: 0;
}

.header-text h1 {
  font-size: 28px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 8px 0;
}

.header-text p {
  font-size: 16px;
  color: #6c757d;
  margin: 0;
}

.header-stats {
  text-align: center;
}

.docs-content {
  min-height: 400px;
}

.doc-card {
  cursor: pointer;
  transition: all 0.3s ease;
  height: 240px;
  margin-bottom: 20px;
  border: 2px solid transparent;
  display: flex;
  flex-direction: column;
}

.doc-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  border-color: #409EFF;
}

.doc-header {
  margin-bottom: 15px;
}

.doc-title {
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
  line-height: 1.4;
}

.doc-description {
  font-size: 14px;
  color: #5a6c7d;
  line-height: 1.6;
  margin: 0 0 15px 0;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  cursor: help;
  transition: color 0.2s ease;
}

.doc-description:hover {
  color: #409EFF;
}

.doc-footer {
  margin-top: auto;
  padding-top: 15px;
  border-top: 1px solid #f0f0f0;
}

.doc-links {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: auto;
}

.link-button {
  flex: 1;
  min-width: 80px;
  height: 32px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .docs-category-page {
    padding: 15px;
  }
  
  .page-header {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }
  
  .header-content {
    flex-direction: column;
    gap: 15px;
  }
  
  .header-text h1 {
    font-size: 24px;
  }
  
  .doc-card {
    height: 220px;
  }
  
  .doc-title {
    font-size: 16px;
  }
  
  .doc-links {
    flex-direction: column;
    gap: 6px;
  }
  
  .link-button {
    width: 100%;
  }
}
</style>
