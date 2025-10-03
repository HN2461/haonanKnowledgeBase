<!--
  面包屑导航组件
  根据当前路由自动生成面包屑导航路径
  特点：
  1. 自动解析路由路径生成面包屑
  2. 支持点击跳转到上级页面
  3. 显示当前页面位置
  4. 响应式设计，支持移动端
-->
<template>
  <div class="breadcrumb-container">
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item 
        v-for="(item, index) in breadcrumbItems" 
        :key="item.path"
        :to="index < breadcrumbItems.length - 1 ? item.path : undefined"
        :class="{ 'is-current': index === breadcrumbItems.length - 1 }"
      >
        <el-icon v-if="item.icon && index === 0" class="breadcrumb-icon">
          <component :is="item.icon" />
        </el-icon>
        <span class="breadcrumb-text">{{ item.title }}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
    
    <!-- 页面标题 -->
    <div class="page-title">
      <h2>{{ currentPageTitle }}</h2>
    </div>
  </div>
</template>

<script setup>
import { computed, watch, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMenuStore } from '../store/menuStore'

// ==================== 组件属性定义 ====================

/**
 * 组件属性定义
 */
const props = defineProps({
  /**
   * 是否显示页面标题
   */
  showPageTitle: {
    type: Boolean,
    default: true
  },
  /**
   * 自定义面包屑项
   * 如果提供，将使用自定义数据而不是自动生成
   */
  customItems: {
    type: Array,
    default: () => []
  }
})

// ==================== 状态管理 ====================

// 路由相关
const route = useRoute()
const router = useRouter()

// 菜单状态管理
const menuStore = useMenuStore()

// 面包屑项数据
const breadcrumbItems = ref([])

// ==================== 计算属性 ====================

/**
 * 当前页面标题
 * 从路由meta或面包屑最后一项获取
 */
const currentPageTitle = computed(() => {
  if (breadcrumbItems.value.length > 0) {
    return breadcrumbItems.value[breadcrumbItems.value.length - 1].title
  }
  return route.meta?.title || '未知页面'
})

// ==================== 方法定义 ====================

/**
 * 根据路径生成面包屑项
 * @param {string} path - 当前路径
 * @returns {Array} 面包屑项数组
 */
const generateBreadcrumbItems = (path) => {
  const items = []
  
  // 如果提供了自定义项，直接使用
  if (props.customItems && props.customItems.length > 0) {
    return props.customItems
  }
  
  // 解析路径
  const pathSegments = path.split('/').filter(segment => segment)
  
  // 构建路径映射
  const pathMap = {
    'dashboard': { title: '仪表板', icon: 'DataAnalysis' },
    'user': { title: '用户管理', icon: 'User' },
    'list': { title: '用户列表' },
    'role': { title: '角色管理' },
    'permission': { title: '权限设置' },
    'content': { title: '内容管理', icon: 'Document' },
    'article': { title: '文章管理' },
    'category': { title: '分类管理' },
    'tag': { title: '标签管理' },
    'system': { title: '系统设置', icon: 'Setting' },
    'basic': { title: '基本设置' },
    'security': { title: '安全设置' },
    'backup': { title: '备份恢复' },
    'menu-management': { title: '新增菜单' }
  }
  
  // 构建完整路径
  let currentPath = ''
  
  pathSegments.forEach((segment, index) => {
    currentPath += '/' + segment
    
    // 查找对应的标题
    const title = pathMap[segment]?.title || segment
    const icon = pathMap[segment]?.icon
    
    items.push({
      path: currentPath,
      title: title,
      icon: icon
    })
  })
  
  return items
}

/**
 * 从菜单数据中查找面包屑项
 * @param {string} path - 当前路径
 * @returns {Array} 面包屑项数组
 */
const findBreadcrumbFromMenu = (path) => {
  // 使用菜单store中的方法生成面包屑
  return menuStore.generateBreadcrumb(path)
}

/**
 * 更新面包屑数据
 */
const updateBreadcrumb = () => {
  const currentPath = route.path
  
  // 首先尝试从菜单数据中查找
  let items = findBreadcrumbFromMenu(currentPath)
  
  // 如果菜单中没有找到，使用路径解析
  if (items.length === 0) {
    items = generateBreadcrumbItems(currentPath)
  }
  
  breadcrumbItems.value = items
}

// ==================== 生命周期 ====================

// 监听路由变化
watch(
  () => route.path,
  () => {
    updateBreadcrumb()
  },
  { immediate: true }
)

// 监听自定义项变化
watch(
  () => props.customItems,
  () => {
    updateBreadcrumb()
  },
  { deep: true }
)
</script>

<style scoped>
/* ==================== 面包屑容器样式 ==================== */

.breadcrumb-container {
  background: #fff;
  padding: 16px 20px;
  border-bottom: 1px solid #e4e7ed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 60px;
}

/* ==================== 面包屑导航样式 ==================== */

.breadcrumb {
  font-size: 14px;
}

.breadcrumb :deep(.el-breadcrumb__item) {
  display: flex;
  align-items: center;
}

.breadcrumb :deep(.el-breadcrumb__inner) {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #606266;
  font-weight: 400;
  transition: color 0.3s ease;
}

.breadcrumb :deep(.el-breadcrumb__inner:hover) {
  color: #409eff;
}

.breadcrumb :deep(.el-breadcrumb__inner.is-link) {
  cursor: pointer;
}

/* 当前页面样式 */
.breadcrumb :deep(.el-breadcrumb__item.is-current .el-breadcrumb__inner) {
  color: #303133;
  font-weight: 500;
  cursor: default;
}

.breadcrumb :deep(.el-breadcrumb__item.is-current .el-breadcrumb__inner:hover) {
  color: #303133;
}

/* ==================== 图标样式 ==================== */

.breadcrumb-icon {
  font-size: 16px;
  color: #409eff;
}

/* ==================== 页面标题样式 ==================== */

.page-title {
  display: flex;
  align-items: center;
}

.page-title h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #303133;
  letter-spacing: 0.5px;
}

/* ==================== 响应式设计 ==================== */

@media (max-width: 768px) {
  .breadcrumb-container {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    padding: 12px 16px;
    min-height: auto;
  }
  
  .page-title h2 {
    font-size: 18px;
  }
  
  .breadcrumb {
    font-size: 13px;
  }
  
  /* 移动端隐藏部分面包屑项 */
  .breadcrumb :deep(.el-breadcrumb__item:nth-child(n+4)) {
    display: none;
  }
  
  .breadcrumb :deep(.el-breadcrumb__item:nth-child(3))::before {
    content: '...';
    margin: 0 8px;
    color: #c0c4cc;
  }
}

@media (max-width: 480px) {
  .breadcrumb-container {
    padding: 10px 12px;
  }
  
  .page-title h2 {
    font-size: 16px;
  }
  
  .breadcrumb {
    font-size: 12px;
  }
  
  .breadcrumb-icon {
    font-size: 14px;
  }
  
  /* 小屏幕只显示最后两级 */
  .breadcrumb :deep(.el-breadcrumb__item:nth-child(n+3)) {
    display: none;
  }
  
  .breadcrumb :deep(.el-breadcrumb__item:nth-child(2))::before {
    content: '...';
    margin: 0 8px;
    color: #c0c4cc;
  }
}

/* ==================== 动画效果 ==================== */

.breadcrumb-container {
  transition: all 0.3s ease;
}

.breadcrumb-text {
  transition: color 0.3s ease;
}
</style>
