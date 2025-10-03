<template>
  <div class="not-found-container">
    <div class="not-found-content">
      <!-- 404 图标和动画 -->
      <div class="error-animation">
        <div class="error-number">
          <span class="digit digit-4">4</span>
          <span class="digit digit-0">
            <el-icon class="zero-icon">
              <QuestionFilled />
            </el-icon>
          </span>
          <span class="digit digit-4">4</span>
        </div>
      </div>
      
      <!-- 错误信息 -->
      <div class="error-info">
        <h1 class="error-title">页面未找到</h1>
        <p class="error-subtitle">抱歉，您访问的页面不存在或已被移除</p>
        
        <!-- 可能的原因 -->
        <div class="error-reasons">
          <h3>可能的原因：</h3>
          <ul>
            <li>URL 地址输入错误</li>
            <li>页面已被删除或移动</li>
            <li>您没有访问该页面的权限</li>
            <li>服务器临时无法访问</li>
          </ul>
        </div>
      </div>
      
      <!-- 操作按钮 -->
      <div class="error-actions">
        <el-button 
          type="primary" 
          size="large" 
          icon="House"
          @click="goHome"
        >
          返回首页
        </el-button>
        
        <el-button 
          size="large" 
          icon="Back"
          @click="goBack"
        >
          返回上页
        </el-button>
        
        <el-button 
          size="large" 
          icon="Refresh"
          @click="refresh"
        >
          刷新页面
        </el-button>
      </div>
      
      <!-- 快速导航 -->
      <div class="quick-navigation">
        <h3>快速导航：</h3>
        <div class="nav-links">
          <el-link 
            v-for="link in quickLinks"
            :key="link.path"
            :href="link.path"
            :icon="link.icon"
            class="nav-link"
            @click="navigateTo(link.path)"
          >
            {{ link.title }}
          </el-link>
        </div>
      </div>
      
      <!-- 搜索建议 -->
      <div class="search-section">
        <h3>或者搜索您需要的内容：</h3>
        <el-autocomplete
          v-model="searchValue"
          :fetch-suggestions="querySearchAsync"
          placeholder="搜索页面或功能..."
          prefix-icon="Search"
          class="search-input"
          size="large"
          @select="handleSelect"
          @keyup.enter="handleSearch"
          clearable
        >
          <template #default="{ item }">
            <div class="search-item">
              <el-icon class="search-icon">
                <component :is="item.icon" />
              </el-icon>
              <div class="search-content">
                <div class="search-title">{{ item.title }}</div>
                <div class="search-path">{{ item.path }}</div>
              </div>
            </div>
          </template>
        </el-autocomplete>
      </div>
    </div>
    
    <!-- 背景装饰 -->
    <div class="background-decoration">
      <div class="floating-shape shape-1"></div>
      <div class="floating-shape shape-2"></div>
      <div class="floating-shape shape-3"></div>
      <div class="floating-shape shape-4"></div>
      <div class="floating-shape shape-5"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { 
  QuestionFilled, 
  House, 
  Back, 
  Refresh, 
  Search,
  DataAnalysis,
  Collection,
  Upload,
  Document
} from '@element-plus/icons-vue'
import { useMenuStore } from '../store/menuStore'

// 路由相关
const router = useRouter()
const menuStore = useMenuStore()

// 搜索相关
const searchValue = ref('')

// 快速导航链接
const quickLinks = ref([
  {
    path: '/dashboard',
    title: '仪表板',
    icon: 'DataAnalysis'
  },
  {
    path: '/menu/management',
    title: '菜单管理',
    icon: 'Menu'
  },
  {
    path: '/content/upload',
    title: '文件上传',
    icon: 'Upload'
  },
  {
    path: '/ep/button',
    title: 'Element Plus 组件',
    icon: 'Collection'
  }
])

// 可搜索的页面数据
const searchablePages = ref([])

/**
 * 返回首页
 */
const goHome = () => {
  router.push('/dashboard')
  ElMessage.success('已返回首页')
}

/**
 * 返回上一页
 */
const goBack = () => {
  if (window.history.length > 1) {
    router.go(-1)
  } else {
    goHome()
  }
}

/**
 * 刷新页面
 */
const refresh = () => {
  window.location.reload()
}

/**
 * 导航到指定路径
 */
const navigateTo = (path) => {
  router.push(path)
}

/**
 * 初始化可搜索的页面数据
 */
const initSearchablePages = () => {
  const pages = []
  
  // 递归收集所有菜单项
  const collectMenuItems = (items, parentPath = '') => {
    items.forEach(item => {
      if (item.path && item.path !== '#') {
        pages.push({
          title: item.title,
          path: item.path,
          icon: item.icon || 'Document',
          category: parentPath || '主要功能'
        })
      }
      if (item.children && item.children.length > 0) {
        collectMenuItems(item.children, item.title)
      }
    })
  }
  
  // 收集所有菜单项
  collectMenuItems(menuStore.menuItems)
  
  // 添加一些额外的页面
  pages.push(
    { title: '仪表盘', path: '/dashboard', icon: 'DataAnalysis', category: '主要功能' },
    { title: '菜单管理', path: '/menu/management', icon: 'Menu', category: '系统管理' }
  )
  
  searchablePages.value = pages
}

/**
 * 异步搜索建议
 * @param {string} queryString - 搜索关键词
 * @param {Function} callback - 回调函数
 */
const querySearchAsync = (queryString, callback) => {
  if (!queryString) {
    callback([])
    return
  }
  
  const results = searchablePages.value.filter(item => 
    item.title.toLowerCase().includes(queryString.toLowerCase()) ||
    item.path.toLowerCase().includes(queryString.toLowerCase()) ||
    item.category.toLowerCase().includes(queryString.toLowerCase())
  )
  
  // 按分类和标题排序
  results.sort((a, b) => {
    if (a.category !== b.category) {
      return a.category.localeCompare(b.category)
    }
    return a.title.localeCompare(b.title)
  })
  
  callback(results.slice(0, 10)) // 限制结果数量
}

/**
 * 处理搜索建议选择
 * @param {Object} item - 选中的搜索项
 */
const handleSelect = (item) => {
  if (item && item.path) {
    router.push(item.path)
    ElMessage.success(`已跳转到: ${item.title}`)
  }
}

/**
 * 处理搜索
 */
const handleSearch = () => {
  if (!searchValue.value.trim()) {
    ElMessage.warning('请输入搜索关键词')
    return
  }
  
  const results = searchablePages.value.filter(item => 
    item.title.toLowerCase().includes(searchValue.value.toLowerCase()) ||
    item.path.toLowerCase().includes(searchValue.value.toLowerCase())
  )
  
  if (results.length === 0) {
    ElMessage.info('未找到相关页面')
    return
  }
  
  if (results.length === 1) {
    // 如果只有一个结果，直接跳转
    handleSelect(results[0])
  } else {
    // 如果有多个结果，显示第一个
    handleSelect(results[0])
  }
}

// 组件挂载时初始化
onMounted(() => {
  // 初始化搜索页面数据
  initSearchablePages()
  
  // 记录404页面访问
  console.log('404页面访问:', window.location.href)
})
</script>

<style scoped>
.not-found-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
  overflow: hidden;
}

.not-found-content {
  max-width: 800px;
  width: 100%;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 60px 40px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: relative;
  z-index: 2;
}

/* 404 数字动画 */
.error-animation {
  margin-bottom: 40px;
}

.error-number {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}

.digit {
  font-size: 120px;
  font-weight: 700;
  color: #409eff;
  text-shadow: 0 4px 8px rgba(64, 158, 255, 0.3);
  animation: bounce 2s infinite;
}

.digit-0 {
  animation-delay: 0.2s;
}

.digit-4:last-child {
  animation-delay: 0.4s;
}

.zero-icon {
  font-size: 100px;
  color: #409eff;
  animation: rotate 3s linear infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* 错误信息 */
.error-info {
  margin-bottom: 40px;
}

.error-title {
  font-size: 36px;
  font-weight: 600;
  color: #303133;
  margin: 0 0 16px 0;
}

.error-subtitle {
  font-size: 18px;
  color: #606266;
  margin: 0 0 30px 0;
  line-height: 1.6;
}

.error-reasons {
  text-align: left;
  background: #f5f7fa;
  padding: 20px;
  border-radius: 8px;
  margin: 20px 0;
  border-left: 4px solid #409eff;
}

.error-reasons h3 {
  margin: 0 0 12px 0;
  color: #303133;
  font-size: 16px;
}

.error-reasons ul {
  margin: 0;
  padding-left: 20px;
  color: #606266;
}

.error-reasons li {
  margin: 6px 0;
  line-height: 1.5;
}

/* 操作按钮 */
.error-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.error-actions .el-button {
  border-radius: 8px;
  padding: 12px 24px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.error-actions .el-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(64, 158, 255, 0.3);
}

/* 快速导航 */
.quick-navigation {
  margin-bottom: 40px;
  text-align: left;
}

.quick-navigation h3 {
  margin: 0 0 16px 0;
  color: #303133;
  font-size: 18px;
  text-align: center;
}

.nav-links {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
}

.nav-link {
  padding: 8px 16px;
  background: #f5f7fa;
  border-radius: 20px;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 1px solid #e4e7ed;
}

.nav-link:hover {
  background: #409eff;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.3);
}

/* 搜索区域 */
.search-section {
  text-align: left;
}

.search-section h3 {
  margin: 0 0 16px 0;
  color: #303133;
  font-size: 18px;
  text-align: center;
}

.search-input {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  display: block;
}

.search-input .el-input__wrapper {
  border-radius: 25px;
  padding: 0 20px;
  border: 2px solid #e4e7ed;
  transition: all 0.3s ease;
}

.search-input .el-input__wrapper:hover {
  border-color: #c0c4cc;
}

.search-input.is-focus .el-input__wrapper {
  border-color: #409eff;
  box-shadow: 0 0 0 4px rgba(64, 158, 255, 0.1);
}

/* 搜索建议样式 */
.search-item {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  gap: 12px;
}

.search-icon {
  color: #409eff;
  font-size: 16px;
  flex-shrink: 0;
}

.search-content {
  flex: 1;
  min-width: 0;
}

.search-title {
  font-size: 14px;
  font-weight: 500;
  color: #303133;
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.search-path {
  font-size: 12px;
  color: #909399;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 背景装饰 */
.background-decoration {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  pointer-events: none;
}

.floating-shape {
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  animation: float 6s ease-in-out infinite;
}

.shape-1 {
  width: 80px;
  height: 80px;
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.shape-2 {
  width: 60px;
  height: 60px;
  top: 20%;
  right: 20%;
  animation-delay: 1s;
}

.shape-3 {
  width: 40px;
  height: 40px;
  bottom: 30%;
  left: 20%;
  animation-delay: 2s;
}

.shape-4 {
  width: 50px;
  height: 50px;
  bottom: 20%;
  right: 10%;
  animation-delay: 3s;
}

.shape-5 {
  width: 70px;
  height: 70px;
  top: 50%;
  left: 5%;
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
    opacity: 0.5;
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
    opacity: 0.8;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .not-found-content {
    padding: 40px 24px;
  }
  
  .digit {
    font-size: 80px;
  }
  
  .zero-icon {
    font-size: 70px;
  }
  
  .error-title {
    font-size: 28px;
  }
  
  .error-subtitle {
    font-size: 16px;
  }
  
  .error-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .error-actions .el-button {
    width: 100%;
    max-width: 200px;
  }
  
  .nav-links {
    flex-direction: column;
    align-items: center;
  }
  
  .nav-link {
    width: 100%;
    max-width: 200px;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .not-found-content {
    padding: 30px 20px;
  }
  
  .error-number {
    gap: 10px;
  }
  
  .digit {
    font-size: 60px;
  }
  
  .zero-icon {
    font-size: 50px;
  }
  
  .error-title {
    font-size: 24px;
  }
  
  .error-reasons {
    padding: 16px;
  }
}
</style>
