<template>
  <div class="dashboard">
    <!-- 背景动效 -->
    <div class="dashboard-bg">
      <div class="bg-circle circle-1"></div>
      <div class="bg-circle circle-2"></div>
      <div class="bg-circle circle-3"></div>
    </div>

    <!-- 页面标题区域 -->
    <div class="page-header">
      <div class="header-content">
        <h1 class="page-title">
          <span class="title-text">路由导航</span>
          <div class="title-underline"></div>
        </h1>
        <p class="page-subtitle">系统所有可用路由页面</p>
      </div>
      <div class="header-actions">
        <el-button type="primary" class="action-btn primary-btn" @click="refreshData">
          <el-icon><Refresh /></el-icon>
          刷新数据
        </el-button>
        <el-button class="action-btn secondary-btn" @click="toggleViewMode">
          <el-icon><Grid /></el-icon>
          {{ viewMode === 'grid' ? '列表视图' : '网格视图' }}
        </el-button>
      </div>
    </div>

    <!-- 路由统计信息 -->
    <div class="route-stats">
      <div class="stat-item">
        <div class="stat-number">{{ totalRoutes }}</div>
        <div class="stat-label">总路由数</div>
            </div>
      <div class="stat-item">
        <div class="stat-number">{{ elementPlusRoutes }}</div>
        <div class="stat-label">Element Plus 组件</div>
            </div>
      <div class="stat-item">
        <div class="stat-number">{{ systemRoutes }}</div>
        <div class="stat-label">系统功能</div>
          </div>
      <div class="stat-item">
        <div class="stat-number">{{ personalRoutes }}</div>
        <div class="stat-label">个人文档</div>
            </div>
          </div>

    <!-- 搜索和筛选 -->
    <div class="search-section">
      <div class="search-container">
        <el-input
          v-model="searchKeyword"
          placeholder="搜索路由页面..."
          prefix-icon="Search"
          class="search-input"
          clearable
          @input="handleSearch"
        />
        <el-select v-model="selectedCategory" placeholder="选择分类" class="category-select" clearable>
          <el-option label="全部" value="" />
          <el-option label="系统功能" value="system" />
          <el-option label="Element Plus" value="element" />
          <el-option label="个人文档" value="personal" />
        </el-select>
            </div>
          </div>

    <!-- 路由卡片区域 -->
    <div class="routes-container" :class="{ 'list-view': viewMode === 'list' }">
      <div 
        v-for="(route, index) in filteredRoutes" 
        :key="route.path"
        class="route-card-wrapper"
        :style="{ '--delay': index * 0.05 + 's' }"
      >
        <div class="route-card" @click="navigateToRoute(route.path)" @mouseenter="onCardHover" @mouseleave="onCardLeave">
          <div class="card-glow"></div>
          <div class="route-icon" :class="route.category">
            <el-icon :size="24">
              <component :is="route.icon" />
            </el-icon>
            <div class="icon-pulse"></div>
            </div>
          <div class="route-content">
            <div class="route-title">{{ route.title }}</div>
            <div class="route-path">{{ route.path }}</div>
            <div class="route-category">{{ getCategoryLabel(route.category) }}</div>
            <div class="route-description">{{ route.description }}</div>
          </div>
          <div class="route-actions">
            <el-button type="primary" size="small" circle>
              <el-icon><ArrowRight /></el-icon>
            </el-button>
            </div>
          <div class="card-particles">
            <div class="particle" v-for="i in 4" :key="i" :style="{ '--i': i }"></div>
              </div>
              </div>
            </div>
          </div>

    <!-- 空状态 -->
    <div v-if="filteredRoutes.length === 0" class="empty-state">
      <el-icon size="60"><Search /></el-icon>
      <h3>未找到匹配的路由</h3>
      <p>请尝试调整搜索关键词或筛选条件</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()

// 响应式数据
const searchKeyword = ref('')
const selectedCategory = ref('')
const viewMode = ref('grid') // 'grid' 或 'list'

// 路由数据
const routes = ref([
  // 系统功能
  { path: '/dashboard', title: '仪表板', icon: 'DataAnalysis', category: 'system', description: '系统首页和数据概览' },
  { path: '/menu/management', title: '菜单管理', icon: 'Menu', category: 'system', description: '新增菜单项并导出路由配置' },
  { path: '/content/upload', title: '文件上传', icon: 'Upload', category: 'system', description: '文件上传和管理功能' },
  { path: '/message-center', title: '开发记录', icon: 'Bell', category: 'system', description: '开发记录和系统消息' },
  
  // 个人文档
  { path: '/personal-docs', title: '个人技术文档', icon: 'Document', category: 'personal', description: '个人技术文档总览' },
  { path: '/personal-docs/frontend', title: '前端技术', icon: 'Monitor', category: 'personal', description: '前端相关技术文档' },
  { path: '/personal-docs/backend', title: '后端技术', icon: 'Server', category: 'personal', description: '后端相关技术文档' },
  { path: '/personal-docs/database', title: '数据库技术', icon: 'Coin', category: 'personal', description: '数据库相关技术文档' },
  { path: '/personal-docs/devops', title: '运维部署', icon: 'Setting', category: 'personal', description: '运维部署相关文档' },
  { path: '/personal-docs/tools', title: '开发工具', icon: 'Tools', category: 'personal', description: '开发工具相关文档' },
  { path: '/personal-docs/notes', title: '随记文档', icon: 'EditPen', category: 'personal', description: '随记和笔记文档' },
  
  // Element Plus 基础组件
  { path: '/ep/button', title: '按钮 Button', icon: 'Pointer', category: 'element', description: '按钮组件演示' },
  { path: '/ep/button-group', title: '按钮组 ButtonGroup', icon: 'MoreFilled', category: 'element', description: '按钮组组件演示' },
  { path: '/ep/link', title: '链接 Link', icon: 'Link', category: 'element', description: '链接组件演示' },
  { path: '/ep/text', title: '文本 Text', icon: 'Document', category: 'element', description: '文本组件演示' },
  { path: '/ep/space', title: '间距 Space', icon: 'Grid', category: 'element', description: '间距组件演示' },
  
  // Element Plus 布局组件
  { path: '/ep/layout', title: '布局 Layout', icon: 'Grid', category: 'element', description: '布局组件演示' },
  { path: '/ep/container', title: '容器 Container', icon: 'Box', category: 'element', description: '容器组件演示' },
  { path: '/ep/progress', title: '进度条 Progress', icon: 'Loading', category: 'element', description: '进度条组件演示' },
  
  // Element Plus 表单组件
  { path: '/ep/input', title: '输入框 Input', icon: 'Edit', category: 'element', description: '输入框组件演示' },
  { path: '/ep/input-number', title: '数字输入框 InputNumber', icon: 'Calculator', category: 'element', description: '数字输入框组件演示' },
  { path: '/ep/select', title: '选择器 Select', icon: 'ArrowDown', category: 'element', description: '选择器组件演示' },
  { path: '/ep/radio', title: '单选框 Radio', icon: 'CircleCheck', category: 'element', description: '单选框组件演示' },
  { path: '/ep/checkbox', title: '多选框 Checkbox', icon: 'Select', category: 'element', description: '多选框组件演示' },
  { path: '/ep/switch', title: '开关 Switch', icon: 'Switch', category: 'element', description: '开关组件演示' },
  { path: '/ep/slider', title: '滑块 Slider', icon: 'Rank', category: 'element', description: '滑块组件演示' },
  { path: '/ep/rate', title: '评分 Rate', icon: 'Star', category: 'element', description: '评分组件演示' },
  { path: '/ep/date', title: '日期 DatePicker', icon: 'Calendar', category: 'element', description: '日期选择器组件演示' },
  { path: '/ep/time-picker', title: '时间选择器 TimePicker', icon: 'Clock', category: 'element', description: '时间选择器组件演示' },
  { path: '/ep/time-select', title: '时间选择 TimeSelect', icon: 'Timer', category: 'element', description: '时间选择组件演示' },
  { path: '/ep/transfer', title: '穿梭框 Transfer', icon: 'Sort', category: 'element', description: '穿梭框组件演示' },
  { path: '/ep/tree-select', title: '树形选择器 TreeSelect', icon: 'List', category: 'element', description: '树形选择器组件演示' },
  { path: '/ep/cascader', title: '级联选择器 Cascader', icon: 'Connection', category: 'element', description: '级联选择器组件演示' },
  { path: '/ep/autocomplete', title: '自动补全 Autocomplete', icon: 'Search', category: 'element', description: '自动补全组件演示' },
  { path: '/ep/form', title: '表单 Form', icon: 'List', category: 'element', description: '表单组件演示' },
  
  // Element Plus 数据展示组件
  { path: '/ep/table', title: '表格 Table', icon: 'Grid', category: 'element', description: '表格组件演示' },
  { path: '/ep/pagination', title: '分页 Pagination', icon: 'DocumentCopy', category: 'element', description: '分页组件演示' },
  { path: '/ep/tag', title: '标签 Tag', icon: 'PriceTag', category: 'element', description: '标签组件演示' },
  { path: '/ep/calendar', title: '日历 Calendar', icon: 'Calendar', category: 'element', description: '日历组件演示' },
  { path: '/ep/image', title: '图片 Image', icon: 'Picture', category: 'element', description: '图片组件演示' },
  { path: '/ep/avatar', title: '头像 Avatar', icon: 'User', category: 'element', description: '头像组件演示' },
  { path: '/ep/badge', title: '徽章 Badge', icon: 'Bell', category: 'element', description: '徽章组件演示' },
  { path: '/ep/collapse', title: '折叠面板 Collapse', icon: 'Fold', category: 'element', description: '折叠面板组件演示' },
  { path: '/ep/timeline', title: '时间线 Timeline', icon: 'Clock', category: 'element', description: '时间线组件演示' },
  { path: '/ep/empty', title: '空状态 Empty', icon: 'Box', category: 'element', description: '空状态组件演示' },
  { path: '/ep/result', title: '结果 Result', icon: 'CircleCheck', category: 'element', description: '结果组件演示' },
  { path: '/ep/skeleton', title: '骨架屏 Skeleton', icon: 'Loading', category: 'element', description: '骨架屏组件演示' },
  { path: '/ep/scrollbar', title: '滚动条 Scrollbar', icon: 'Sort', category: 'element', description: '滚动条组件演示' },
  { path: '/ep/carousel', title: '走马灯 Carousel', icon: 'Picture', category: 'element', description: '走马灯组件演示' },
  { path: '/ep/popover', title: '弹出框 Popover', icon: 'ChatDotSquare', category: 'element', description: '弹出框组件演示' },
  { path: '/ep/tooltip', title: '文字提示 Tooltip', icon: 'InfoFilled', category: 'element', description: '文字提示组件演示' },
  { path: '/ep/anchor', title: '锚点 Anchor', icon: 'Link', category: 'element', description: '锚点组件演示' },
  { path: '/ep/dropdown', title: '下拉菜单 Dropdown', icon: 'ArrowDown', category: 'element', description: '下拉菜单组件演示' },
  { path: '/ep/page-header', title: '页头 Page Header', icon: 'Document', category: 'element', description: '页头组件演示' },
  { path: '/ep/drawer', title: '抽屉 Drawer', icon: 'Menu', category: 'element', description: '抽屉组件演示' },
  { path: '/ep/popconfirm', title: '气泡确认框 Popconfirm', icon: 'QuestionFilled', category: 'element', description: '气泡确认框组件演示' },
  { path: '/ep/tree', title: '树形控件 Tree', icon: 'List', category: 'element', description: '树形控件组件演示' },
  
  // Element Plus 反馈组件
  { path: '/ep/dialog', title: '对话框 Dialog', icon: 'ChatLineSquare', category: 'element', description: '对话框组件演示' },
  { path: '/ep/upload', title: '上传 Upload', icon: 'Upload', category: 'element', description: '上传组件演示' },
  { path: '/ep/notification', title: '通知 Notification', icon: 'Bell', category: 'element', description: '通知组件演示' },
  { path: '/ep/alert', title: '警告 Alert', icon: 'Warning', category: 'element', description: '警告组件演示' },
  { path: '/ep/loading', title: '加载 Loading', icon: 'Loading', category: 'element', description: '加载组件演示' },
  { path: '/ep/message', title: '消息 Message', icon: 'ChatDotRound', category: 'element', description: '消息组件演示' },
  { path: '/ep/messagebox', title: '消息框 MessageBox', icon: 'ChatLineSquare', category: 'element', description: '消息框组件演示' },
  
  // Element Plus 导航组件
  { path: '/ep/tabs', title: '标签页 Tabs', icon: 'Document', category: 'element', description: '标签页组件演示' },
  { path: '/ep/breadcrumb', title: '面包屑 Breadcrumb', icon: 'ArrowRight', category: 'element', description: '面包屑组件演示' },
  { path: '/ep/steps', title: '步骤条 Steps', icon: 'List', category: 'element', description: '步骤条组件演示' },
  { path: '/ep/affix', title: '固钉 Affix', icon: 'Pin', category: 'element', description: '固钉组件演示' },
  { path: '/ep/backtop', title: '回到顶部 Backtop', icon: 'ArrowUp', category: 'element', description: '回到顶部组件演示' },
  
  // Element Plus 其他组件
  { path: '/ep/divider', title: '分割线 Divider', icon: 'Minus', category: 'element', description: '分割线组件演示' },
  { path: '/ep/config-provider', title: '全局配置 ConfigProvider', icon: 'Setting', category: 'element', description: '全局配置组件演示' }
])

// 计算属性
const totalRoutes = computed(() => routes.value.length)
const elementPlusRoutes = computed(() => routes.value.filter(r => r.category === 'element').length)
const systemRoutes = computed(() => routes.value.filter(r => r.category === 'system').length)
const personalRoutes = computed(() => routes.value.filter(r => r.category === 'personal').length)

const filteredRoutes = computed(() => {
  let result = routes.value

  // 按分类筛选
  if (selectedCategory.value) {
    result = result.filter(route => route.category === selectedCategory.value)
  }

  // 按关键词搜索
  if (searchKeyword.value) {
    const keyword = searchKeyword.value.toLowerCase()
    result = result.filter(route => 
      route.title.toLowerCase().includes(keyword) ||
      route.path.toLowerCase().includes(keyword) ||
      route.description.toLowerCase().includes(keyword)
    )
  }

  return result
})

// 方法
const getCategoryLabel = (category) => {
  const labels = {
    system: '系统功能',
    element: 'Element Plus',
    personal: '个人文档'
  }
  return labels[category] || '其他'
}

const navigateToRoute = (path) => {
  router.push(path)
  ElMessage.success(`正在跳转到 ${path}`)
}

const refreshData = () => {
  ElMessage.success('数据已刷新')
}

const toggleViewMode = () => {
  viewMode.value = viewMode.value === 'grid' ? 'list' : 'grid'
  ElMessage.info(`已切换到${viewMode.value === 'grid' ? '网格' : '列表'}视图`)
}

const handleSearch = () => {
  // 搜索逻辑已在计算属性中处理
}

const onCardHover = (event) => {
  const card = event.currentTarget
  card.style.transform = 'translateY(-8px) scale(1.02)'
}

const onCardLeave = (event) => {
  const card = event.currentTarget
  card.style.transform = 'translateY(0) scale(1)'
}

// 组件挂载
onMounted(() => {
  // 初始化逻辑
})
</script>

<style scoped>
.dashboard {
  position: relative;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
  overflow: hidden;
}

/* 背景动效 */
.dashboard-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.bg-circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  animation: float 6s ease-in-out infinite;
}

.circle-1 {
  width: 200px;
  height: 200px;
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.circle-2 {
  width: 150px;
  height: 150px;
  top: 60%;
  right: 15%;
  animation-delay: 2s;
}

.circle-3 {
  width: 100px;
  height: 100px;
  bottom: 20%;
  left: 20%;
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}

/* 页面标题 */
.page-header {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  animation: slideInDown 0.8s ease-out;
}

.header-content {
  color: white;
}

.page-title {
  position: relative;
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 10px 0;
  background: linear-gradient(45deg, #fff, #e0e7ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.title-underline {
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, #4facfe, #00f2fe);
  border-radius: 2px;
  animation: expandWidth 1s ease-out 0.5s both;
}

.page-subtitle {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 15px;
}

.action-btn {
  padding: 12px 24px;
  border-radius: 25px;
  font-weight: 600;
  transition: all 0.3s ease;
  border: none;
  position: relative;
  overflow: hidden;
}

.action-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.action-btn:hover::before {
  left: 100%;
}

.primary-btn {
  background: linear-gradient(45deg, #4facfe, #00f2fe);
  color: white;
  box-shadow: 0 4px 15px rgba(79, 172, 254, 0.4);
}

.primary-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(79, 172, 254, 0.6);
}

.secondary-btn {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.secondary-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

/* 路由统计 */
.route-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
  position: relative;
  z-index: 1;
}

.stat-item {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 20px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.stat-item:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-5px);
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: white;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
}

/* 搜索区域 */
.search-section {
  margin-bottom: 30px;
  position: relative;
  z-index: 1;
}

.search-container {
  display: flex;
  gap: 15px;
  max-width: 600px;
}

.search-input {
  flex: 1;
}

.category-select {
  width: 150px;
}

/* 路由卡片区域 */
.routes-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
  position: relative;
  z-index: 1;
}

.routes-container.list-view {
  grid-template-columns: 1fr;
}

.route-card-wrapper {
  animation: slideInUp 0.6s ease-out var(--delay, 0s) both;
}

.route-card {
  position: relative;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 25px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  cursor: pointer;
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: 20px;
}

.routes-container.list-view .route-card {
  padding: 20px;
}

.route-card:hover {
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.card-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent, rgba(79, 172, 254, 0.1), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.route-card:hover .card-glow {
  opacity: 1;
}

.route-icon {
  position: relative;
  width: 60px;
  height: 60px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.route-icon.system {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.route-icon.element {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.route-icon.personal {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.icon-pulse {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  border-radius: 15px;
  background: inherit;
  transform: translate(-50%, -50%);
  opacity: 0.3;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
  50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.1; }
  100% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
}

.route-content {
  flex: 1;
  min-width: 0;
}

.route-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 8px;
  background: linear-gradient(45deg, #2c3e50, #3498db);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.route-path {
  font-size: 0.9rem;
  color: #7f8c8d;
  margin-bottom: 5px;
  font-family: 'Courier New', monospace;
  background: #f8f9fa;
  padding: 2px 8px;
  border-radius: 4px;
  display: inline-block;
}

.route-category {
  font-size: 0.8rem;
  color: #95a5a6;
  margin-bottom: 8px;
  font-weight: 500;
}

.route-description {
  font-size: 0.9rem;
  color: #6c757d;
  line-height: 1.4;
}

.route-actions {
  flex-shrink: 0;
}

.card-particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
}

.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: rgba(79, 172, 254, 0.6);
  border-radius: 50%;
  animation: particleFloat 3s ease-in-out infinite;
  animation-delay: calc(var(--i) * 0.5s);
}

.particle:nth-child(odd) {
  left: 10%;
  top: 20%;
}

.particle:nth-child(even) {
  right: 10%;
  top: 60%;
}

@keyframes particleFloat {
  0%, 100% { transform: translateY(0px) scale(0); opacity: 0; }
  50% { transform: translateY(-20px) scale(1); opacity: 1; }
}

/* 空状态 */
.empty-state {
  text-align: center;
  color: white;
  padding: 60px 20px;
  position: relative;
  z-index: 1;
}

.empty-state h3 {
  margin: 20px 0 10px 0;
  font-size: 1.5rem;
}

.empty-state p {
  margin: 0;
  opacity: 0.8;
}

/* 动画关键帧 */
@keyframes slideInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes expandWidth {
  from {
    width: 0;
  }
  to {
    width: 60px;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .dashboard {
    padding: 15px;
  }
  
  .page-header {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .routes-container {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  
  .route-card {
    padding: 20px;
  }
  
  .search-container {
    flex-direction: column;
  }
  
  .category-select {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .route-card {
    flex-direction: column;
    text-align: center;
  }
  
  .route-icon {
    width: 50px;
    height: 50px;
  }
}
</style>
