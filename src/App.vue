<template>
  <!-- 登录页面 - 作为应用入口 -->
  <Login v-if="!userStore.isLoggedIn" @login-success="handleLoginSuccess" />

  <!-- 404页面 - 全屏显示 -->
  <NotFound v-else-if="isNotFoundPage" />

  <!-- 主应用界面 - 登录后显示 -->
  <div v-else class="app-container">
    <!-- 顶部导航栏 -->
    <el-header class="header">
      <div class="header-left">
        <el-button text icon="Menu" @click="menuStore.toggleCollapse" class="collapse-btn" />
        <div class="logo-wrapper">
          <el-icon class="logo-icon" :size="28">
            <DataAnalysis />
          </el-icon>
          <h1 class="title">浩南知识库</h1>
        </div>
      </div>

      <div class="header-center">
        <el-autocomplete v-model="searchValue" :fetch-suggestions="querySearchAsync" placeholder="搜索页面..."
          prefix-icon="Search" class="search-input" @select="handleSelect" @keyup.enter="handleSearch" clearable>
          <template #default="{ item }">
            <div class="search-item">
              <el-icon class="search-icon">
                <component :is="item.icon" />
              </el-icon>
              <div class="search-content">
                <div class="search-title" v-html="highlightText(item.title, searchValue)"></div>
                <div class="search-path">{{ item.path }}</div>
                <div class="search-category">{{ item.category }}</div>
              </div>
            </div>
          </template>
        </el-autocomplete>
      </div>

      <div class="header-right">
        <el-tooltip content="刷新页面" placement="bottom">
          <el-button icon="Refresh" circle @click="handleRefresh" />
        </el-tooltip>

        <el-tooltip content="新增菜单" placement="bottom">
          <el-button icon="Plus" circle @click="router.push('/menu/management')" />
        </el-tooltip>

        <!-- 开发记录，隐藏徽章，仅显示按钮 -->
        <el-tooltip content="开发记录" placement="bottom">
          <el-button icon="Edit" circle @click="router.push('/message-center')" />
        </el-tooltip>

        <!-- 用户信息，采用下拉菜单组件 -->
        <el-dropdown @command="handleUserCommand" class="user-dropdown">
          <div class="user-info">
            <el-avatar v-if="userStore.userAvatar" :src="userStore.userAvatar" :size="32" />
            <el-avatar v-else :size="32">
              <el-icon>
                <User />
              </el-icon>
            </el-avatar>
            <span class="username">{{ userStore.displayName }}</span>
            <el-icon class="dropdown-icon">
              <ArrowDown />
            </el-icon>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="profile">
                <el-icon>
                  <User />
                </el-icon>
                个人中心
              </el-dropdown-item>
              <el-dropdown-item command="settings">
                <el-icon>
                  <Setting />
                </el-icon>
                设置
              </el-dropdown-item>
              <el-dropdown-item divided command="logout">
                <el-icon>
                  <SwitchButton />
                </el-icon>
                退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-header>

    <el-container class="main-container">
      <!-- 侧边栏：包含菜单导航 -->
      <el-aside :width="sidebarWidth()" class="sidebar" :style="{ '--sidebar-width': sidebarWidth() }">
        <!-- Element Plus 菜单组件 -->
        <el-menu :default-active="menuStore.activeMenu" mode="vertical" :collapse="menuStore.isCollapse"
          :unique-opened="true" @select="menuStore.handleMenuSelect" @open="handleMenuOpen" @close="handleMenuClose"
          @collapse="handleMenuClose" class="sidebar-menu">
          <!-- 使用递归组件渲染无限层级菜单 -->
          <RecursiveMenu :items="menuStore.menuItems" @update:expandedLevel="handleExpandedLevelUpdate"
            @menuItemClick="handleMenuSelect" @iconError="handleMenuItemIconError" />
        </el-menu>
      </el-aside>

      <!-- 主内容区域 -->
      <el-main class="main-content">
        <!-- 面包屑导航 -->
        <Breadcrumb :show-page-title="true" class="breadcrumb-navigation" />

        <!-- 标签页导航 -->
        <TabsNavigation :tabs="openedTabs" :active-tab="activeTab" @tab-click="switchTab" @close-tab="closeTab"
          @close-other-tabs="closeOtherTabs" @close-all-tabs="closeAllTabs" @tabs-reordered="handleTabsReordered" />

        <!-- 页面内容 -->
        <div class="page-content">
          <router-view />
        </div>
      </el-main>
    </el-container>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { ElMessage } from 'element-plus'
import {
  User,
  Setting,
  SwitchButton
} from '@element-plus/icons-vue'
import { useMenuStore } from './store/menuStore'
import { useUserStore } from './store/userStore'
import RecursiveMenu from './components/RecursiveMenu.vue'
import TabsNavigation from './components/TabsNavigation.vue'
import Breadcrumb from './components/Breadcrumb.vue'
import Login from './views/Login.vue'
import NotFound from './views/NotFound.vue'
import { useRoute, useRouter } from 'vue-router'
import appRouter from './router/index.js'

// ==================== 状态管理 ====================

// 使用菜单状态管理
const menuStore = useMenuStore()

// 使用用户状态管理
const userStore = useUserStore()

// 获取路由实例
const route = useRoute()

// 搜索框的值
const searchValue = ref('')

// 判断是否为404页面
const isNotFoundPage = computed(() => {
  return route.name === 'NotFound'
})

// 缺失的图标集合
const missingIcons = ref(new Set())

// 搜索建议列表
const searchSuggestions = ref([])

// 所有可搜索的页面数据
const searchablePages = ref([])

// 路由相关
const router = useRouter()

// 标签页管理
const openedTabs = ref([])  // 已打开的标签页数组
const activeTab = ref('')   // 当前激活的标签页

// ==================== 菜单相关方法 ====================

/**
 * 处理菜单选择事件
 * 当用户点击菜单项时，打开对应的标签页并跳转路由
 * @param {string} index - 菜单项索引
 * @param {Object} menuItem - 菜单项对象（可选）
 */
const handleMenuSelect = (index, menuItem) => {
  /**
   * 递归查找菜单项
   * @param {Array} items - 菜单项数组
   * @returns {Object|null} 找到的菜单项
   */
  const findMenuItem = (items) => {
    for (const item of items) {
      if (item.index === index) {
        return item
      }
      if (item.children && item.children.length > 0) {
        const found = findMenuItem(item.children)
        if (found) {
          return found
        }
      }
    }
    return null
  }

  // 获取菜单项信息
  const item = menuItem || findMenuItem(menuStore.menuItems)
  if (!item || !item.path) return

  // 检查标签页是否已存在
  const existingTab = openedTabs.value.find(tab => tab.path === item.path)

  if (!existingTab) {
    // 添加新标签页
    openedTabs.value.push({
      id: item.index,      // 菜单项ID
      title: item.title,   // 标签页标题
      path: item.path,     // 路由路径
      icon: item.icon      // 图标
    })
  }

  // 设置当前活动标签页
  activeTab.value = item.path
}

// 切换标签页
const switchTab = (path) => {
  activeTab.value = path
  // 导航到对应的路由
  router.push(path)
}

// 处理标签页重新排序
const handleTabsReordered = (newTabsOrder) => {
  openedTabs.value = newTabsOrder
}

// 关闭标签页
const closeTab = (path, event) => {
  event?.stopPropagation()

  const index = openedTabs.value.findIndex(tab => tab.path === path)
  if (index === -1) return

  // 如果关闭的是当前活动标签页，切换到其他标签页
  if (path === activeTab.value) {
    const newActiveTab = index > 0 ? openedTabs.value[index - 1] : (openedTabs.value.length > 1 ? openedTabs.value[1] : null)
    if (newActiveTab) {
      activeTab.value = newActiveTab.path
      window.location.href = '#' + newActiveTab.path
    }
  }

  // 移除标签页
  openedTabs.value.splice(index, 1)
}

// 关闭其他标签页
const closeOtherTabs = () => {
  const activeTabInfo = openedTabs.value.find(tab => tab.path === activeTab.value)
  if (activeTabInfo) {
    openedTabs.value = [activeTabInfo]
  }
}

// 关闭所有标签页，但保留当前选中的标签页
const closeAllTabs = () => {
  if (activeTab.value) {
    const activeTabInfo = openedTabs.value.find(tab => tab.path === activeTab.value)
    if (activeTabInfo) {
      openedTabs.value = [activeTabInfo]
    }
  }
}



// 监听路由变化
watch(() => route.path, (newPath) => {
  if (newPath && newPath !== '/') {
    // 查找对应的菜单项
    const findRouteInMenu = (items) => {
      for (const item of items) {
        if (item.path === newPath) {
          return item
        }
        if (item.children && item.children.length > 0) {
          const found = findRouteInMenu(item.children)
          if (found) {
            return found
          }
        }
      }
      return null
    }

    const menuItem = findRouteInMenu(menuStore.menuItems)
    if (menuItem) {
      handleMenuSelect(menuItem.index, menuItem)
    }
  }
}, { immediate: true })

// 存储展开的菜单层级，用于动态调整侧边栏宽度
const expandedMenuLevel = ref(0)

// 处理展开菜单层级更新
const handleExpandedLevelUpdate = (level) => {
  console.log('Received expanded level update:', level)
  expandedMenuLevel.value = level
}

// 存储当前展开的菜单项
const openedMenus = ref(new Set())

// 监听菜单展开状态变化
const handleMenuOpen = (index) => {
  console.log('菜单展开:', index)
  openedMenus.value.add(index)

  // 计算当前展开菜单的最大层级
  const currentMaxLevel = calculateCurrentExpandedLevel()
  expandedMenuLevel.value = currentMaxLevel
  console.log('当前展开的最大层级:', currentMaxLevel)
}

// 监听菜单收起状态变化
const handleMenuClose = (index) => {
  console.log('菜单收起:', index)
  console.log('收起前展开的菜单:', Array.from(openedMenus.value))

  openedMenus.value.delete(index)

  console.log('收起后展开的菜单:', Array.from(openedMenus.value))

  // 重新计算当前展开菜单的最大层级
  const currentMaxLevel = calculateCurrentExpandedLevel()
  expandedMenuLevel.value = currentMaxLevel
  console.log('收起后当前展开的最大层级:', currentMaxLevel)
}

// 计算当前实际展开菜单的最大层级
const calculateCurrentExpandedLevel = () => {
  let maxLevel = 0

  // 遍历所有展开的菜单项，计算它们的层级
  openedMenus.value.forEach(menuIndex => {
    const level = getMenuLevel(menuStore.menuItems, menuIndex, 0)
    if (level !== -1) {
      maxLevel = Math.max(maxLevel, level)
    }
  })

  console.log(`计算展开层级: 展开菜单=${Array.from(openedMenus.value)}, 最大层级=${maxLevel}`)
  return maxLevel
}

// 递归查找菜单项的层级
const getMenuLevel = (items, targetIndex, currentLevel) => {
  for (const item of items) {
    if (item.index === targetIndex) {
      return currentLevel
    }
    if (item.children && item.children.length > 0) {
      const found = getMenuLevel(item.children, targetIndex, currentLevel + 1)
      if (found !== -1) {
        return found
      }
    }
  }
  return -1
}

// 计算侧边栏宽度
const sidebarWidth = () => {
  if (menuStore.isCollapse) {
    return '64px'
  }

  // 基础宽度250px，每增加一级展开层级额外增加30px，确保有足够空间显示文字
  const baseWidth = 250
  const extraWidth = expandedMenuLevel.value * 30
  const finalWidth = Math.min(baseWidth + extraWidth, 600)

  console.log(`侧边栏宽度计算: 基础宽度=${baseWidth}, 当前展开层级=${expandedMenuLevel.value}, 额外宽度=${extraWidth}, 最终宽度=${finalWidth}px`)

  return `${finalWidth}px`
}

// ==================== 搜索功能 ====================

/**
 * 初始化可搜索的页面数据
 */
const initSearchablePages = () => {
  const pages = []

  // 递归收集所有菜单项
  const collectMenuItems = (items, parentPath = '') => {
    items.forEach(item => {
      if (item.path && item.path !== '#') {
        // 为每个页面添加更多搜索关键词
        const keywords = []

        // 从标题中提取关键词
        if (item.title.includes('按钮')) keywords.push('button', 'btn', '点击')
        if (item.title.includes('输入')) keywords.push('input', '输入框', '表单')
        if (item.title.includes('表格')) keywords.push('table', '数据', '列表')
        if (item.title.includes('表单')) keywords.push('form', '验证', '提交')
        if (item.title.includes('对话框')) keywords.push('dialog', '弹窗', '模态框')
        if (item.title.includes('抽屉')) keywords.push('drawer', '侧边栏')
        if (item.title.includes('消息')) keywords.push('message', '通知', '提示')
        if (item.title.includes('加载')) keywords.push('loading', '加载中', '等待')
        if (item.title.includes('分页')) keywords.push('pagination', '翻页', '页码')
        if (item.title.includes('标签')) keywords.push('tag', '标签页', '标记')
        if (item.title.includes('步骤')) keywords.push('steps', '流程', '向导')
        if (item.title.includes('时间')) keywords.push('time', '日期', '选择器')
        if (item.title.includes('选择')) keywords.push('select', '下拉', '选项')
        if (item.title.includes('开关')) keywords.push('switch', '切换', '开关')
        if (item.title.includes('单选框')) keywords.push('radio', '单选', '选项')
        if (item.title.includes('复选框')) keywords.push('checkbox', '多选', '勾选')
        if (item.title.includes('滑块')) keywords.push('slider', '范围', '滑动')
        if (item.title.includes('评分')) keywords.push('rate', '星级', '评价')
        if (item.title.includes('进度')) keywords.push('progress', '进度条', '百分比')
        if (item.title.includes('头像')) keywords.push('avatar', '头像', '用户')
        if (item.title.includes('徽章')) keywords.push('badge', '标记', '数字')
        if (item.title.includes('面包屑')) keywords.push('breadcrumb', '导航', '路径')
        if (item.title.includes('日历')) keywords.push('calendar', '日期', '月历')
        if (item.title.includes('级联')) keywords.push('cascader', '级联', '联动')
        if (item.title.includes('折叠')) keywords.push('collapse', '折叠', '展开')
        if (item.title.includes('配置')) keywords.push('config', '设置', '配置')
        if (item.title.includes('容器')) keywords.push('container', '布局', '容器')
        if (item.title.includes('分割')) keywords.push('divider', '分割线', '分隔')
        if (item.title.includes('空状态')) keywords.push('empty', '空', '无数据')
        if (item.title.includes('图片')) keywords.push('image', '图片', '预览')
        if (item.title.includes('链接')) keywords.push('link', '链接', '跳转')
        if (item.title.includes('确认')) keywords.push('popconfirm', '确认', '删除')
        if (item.title.includes('结果')) keywords.push('result', '结果', '状态')
        if (item.title.includes('返回')) keywords.push('backtop', '返回顶部', '顶部')
        if (item.title.includes('滚动')) keywords.push('scrollbar', '滚动条', '滚动')
        if (item.title.includes('骨架')) keywords.push('skeleton', '骨架屏', '加载')
        if (item.title.includes('空间')) keywords.push('space', '间距', '布局')
        if (item.title.includes('文本')) keywords.push('text', '文字', '文本')
        if (item.title.includes('时间线')) keywords.push('timeline', '时间线', '历史')
        if (item.title.includes('穿梭')) keywords.push('transfer', '穿梭框', '移动')
        if (item.title.includes('树形')) keywords.push('tree', '树形', '节点')
        if (item.title.includes('树选择')) keywords.push('treeselect', '树选择', '树形选择')
        if (item.title.includes('上传')) keywords.push('upload', '上传', '文件')
        if (item.title.includes('自动补全')) keywords.push('autocomplete', '自动补全', '补全')
        if (item.title.includes('走马灯')) keywords.push('carousel', '轮播', '幻灯片')

        pages.push({
          title: item.title,
          path: item.path,
          icon: item.icon || 'Document',
          category: parentPath || '主要功能',
          keywords: keywords.join(' ')
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
    { title: '仪表盘', path: '/dashboard', icon: 'Odometer', category: '主要功能' },
    { title: '菜单管理', path: '/menu/management', icon: 'Menu', category: '系统管理' }
  )

  searchablePages.value = pages
}

/**
 * 异步搜索建议 - 增强版模糊搜索
 * @param {string} queryString - 搜索关键词
 * @param {Function} callback - 回调函数
 */
const querySearchAsync = (queryString, callback) => {
  if (!queryString || queryString.trim().length === 0) {
    callback([])
    return
  }

  const query = queryString.toLowerCase().trim()
  const results = []

  // 为每个页面计算匹配分数
  searchablePages.value.forEach(item => {
    let score = 0
    const title = item.title.toLowerCase()
    const path = item.path.toLowerCase()
    const category = item.category.toLowerCase()
    const keywords = (item.keywords || '').toLowerCase()

    // 标题完全匹配 - 最高分
    if (title === query) {
      score += 100
    }
    // 标题开头匹配 - 高分
    else if (title.startsWith(query)) {
      score += 80
    }
    // 标题包含匹配 - 中分
    else if (title.includes(query)) {
      score += 60
    }
    // 关键词包含匹配 - 中分
    else if (keywords.includes(query)) {
      score += 50
    }
    // 路径包含匹配 - 低分
    else if (path.includes(query)) {
      score += 40
    }
    // 分类包含匹配 - 低分
    else if (category.includes(query)) {
      score += 30
    }

    // 如果分数大于0，添加到结果中
    if (score > 0) {
      results.push({
        ...item,
        score: score
      })
    }
  })

  // 按分数降序排序，分数相同时按分类和标题排序
  results.sort((a, b) => {
    if (a.score !== b.score) {
      return b.score - a.score
    }
    if (a.category !== b.category) {
      return a.category.localeCompare(b.category)
    }
    return a.title.localeCompare(b.title)
  })

  // 限制结果数量，避免过多建议
  const limitedResults = results.slice(0, 20)

  callback(limitedResults)
}

/**
 * 高亮显示匹配的文本
 * @param {string} text - 原始文本
 * @param {string} query - 搜索关键词
 * @returns {string} - 高亮后的HTML
 */
const highlightText = (text, query) => {
  if (!query || !text) return text

  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  return text.replace(regex, '<mark class="search-highlight">$1</mark>')
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
 * 处理搜索 - 使用与建议相同的搜索逻辑
 */
const handleSearch = () => {
  if (!searchValue.value.trim()) {
    ElMessage.warning('请输入搜索关键词')
    return
  }

  const query = searchValue.value.toLowerCase().trim()
  const results = []

  // 使用与querySearchAsync相同的搜索逻辑
  searchablePages.value.forEach(item => {
    let score = 0
    const title = item.title.toLowerCase()
    const path = item.path.toLowerCase()
    const category = item.category.toLowerCase()
    const keywords = (item.keywords || '').toLowerCase()

    // 标题完全匹配 - 最高分
    if (title === query) {
      score += 100
    }
    // 标题开头匹配 - 高分
    else if (title.startsWith(query)) {
      score += 80
    }
    // 标题包含匹配 - 中分
    else if (title.includes(query)) {
      score += 60
    }
    // 关键词包含匹配 - 中分
    else if (keywords.includes(query)) {
      score += 50
    }
    // 路径包含匹配 - 低分
    else if (path.includes(query)) {
      score += 40
    }
    // 分类包含匹配 - 低分
    else if (category.includes(query)) {
      score += 30
    }

    // 如果分数大于0，添加到结果中
    if (score > 0) {
      results.push({
        ...item,
        score: score
      })
    }
  })

  // 按分数排序
  results.sort((a, b) => {
    if (a.score !== b.score) {
      return b.score - a.score
    }
    if (a.category !== b.category) {
      return a.category.localeCompare(b.category)
    }
    return a.title.localeCompare(b.title)
  })

  if (results.length === 0) {
    ElMessage.info('未找到相关页面')
    return
  }

  if (results.length === 1) {
    // 如果只有一个结果，直接跳转
    handleSelect(results[0])
  } else {
    // 如果有多个结果，显示第一个（最高分）
    handleSelect(results[0])
    ElMessage.success(`找到 ${results.length} 个相关页面，已跳转到最佳匹配`)
  }
}

const handleRefresh = () => {
  // 实现页面刷新
  location.reload()
}

// ==================== 用户相关方法 ====================

/**
 * 处理用户下拉菜单命令
 * @param {string} command - 命令类型
 */
const handleUserCommand = (command) => {
  switch (command) {
    case 'profile':
      // 跳转到个人中心（暂时用消息提示）
      ElMessage.info('个人中心功能正在开发中...')
      break
    case 'settings':
      // 跳转到设置页面（暂时用消息提示）
      ElMessage.info('设置功能正在开发中...')
      break
    case 'logout':
      handleLogout()
      break
    default:
      console.warn('未知的用户命令:', command)
  }
}

/**
 * 处理用户退出登录
 */
const handleLogout = () => {
  try {
    // 调用用户store的退出登录方法
    userStore.logout()

    // 关闭所有打开的标签页
    closeAllTabs()

    // 重置路由到根路径
    router.push('/')

  } catch (error) {
    console.error('退出登录失败:', error)
    ElMessage.error('退出登录失败，请刷新页面重试')
  }
}

/**
 * 处理登录成功事件
 */
const handleLoginSuccess = () => {
  // 登录成功后，App.vue 会根据 userStore.isLoggedIn 自动切换到主应用界面
  // 跳转到仪表板
  router.push('/dashboard')

  // 初始化搜索页面数据（因为之前可能还没有初始化）
  initSearchablePages()
}



// 组件挂载时初始化
onMounted(() => {
  // 初始化用户状态（从本地存储恢复登录状态）
  userStore.initUserStore()

  // 只有在已登录时才初始化搜索页面数据和排序菜单
  if (userStore.isLoggedIn) {
    initSearchablePages()
    // 初始化时对菜单进行排序
    menuStore.sortMenuItems(menuStore.menuItems)
  }

  // 组件挂载时的其他初始化操作

  // 使用MutationObserver监听菜单DOM变化
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        const target = mutation.target
        if (target.classList.contains('el-sub-menu')) {
          const isOpen = target.classList.contains('is-opened')
          const menuIndex = target.getAttribute('data-menu-index') || target.querySelector('[data-menu-index]')?.getAttribute('data-menu-index')

          if (menuIndex) {
            if (isOpen) {
              console.log('通过DOM检测到菜单展开:', menuIndex)
              handleMenuOpen(menuIndex)
            } else {
              console.log('通过DOM检测到菜单收起:', menuIndex)
              handleMenuClose(menuIndex)
            }
          }
        }
      }
    })
  })

  // 开始观察菜单容器
  const menuContainer = document.querySelector('.sidebar-menu')
  if (menuContainer) {
    observer.observe(menuContainer, {
      attributes: true,
      subtree: true,
      attributeFilter: ['class']
    })
  }
})

// 组件卸载时清理
onUnmounted(() => {
  // 组件卸载时的清理操作
})

// 处理菜单项图标错误
const handleMenuItemIconError = (iconName) => {
  // 将缺失的图标添加到missingIcons集合中
  if (iconName && !missingIcons.value.has(iconName)) {
    missingIcons.value.add(iconName)
    console.warn(`菜单项图标错误: ${iconName}`)
  }
}
</script>

<style scoped>
.app-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background: #fff;
  border-bottom: 1px solid #e4e7ed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  height: 60px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
}

.collapse-btn {
  font-size: 24px;
  padding: 8px;
  color: #606266 !important;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.collapse-btn:hover {
  background: #f5f7fa;
  color: #409eff !important;
  transform: scale(1.05);
}

.logo-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-icon {
  color: #409eff;
}

.title {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #303133;
  letter-spacing: 0.5px;
  white-space: nowrap;
}

.header-center {
  flex: 1;
  max-width: 600px;
  margin: 0 32px;
}

.search-input {
  width: 100%;
}

.search-input :deep(.el-input__wrapper) {
  background: #f5f7fa;
  border-radius: 24px;
  box-shadow: none;
  padding: 8px 16px;
  transition: all 0.3s ease;
}

.search-input :deep(.el-input__wrapper:hover) {
  background: #e8ecf0;
}

.search-input :deep(.el-input__wrapper.is-focus) {
  background: #fff;
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
}

.search-input :deep(.el-input__inner) {
  font-size: 14px;
  color: #303133;
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
  margin-bottom: 2px;
}

.search-category {
  font-size: 11px;
  color: #c0c4cc;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 搜索高亮样式 */
.search-highlight {
  background-color: #fff2cc;
  color: #e6a23c;
  padding: 1px 2px;
  border-radius: 2px;
  font-weight: 600;
}

.search-input .el-input__inner:focus {
  border-color: #409eff;
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.1);
}

.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.header-right .el-button {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  font-size: 16px;
  background: #f5f7fa;
  border: 1px solid #e4e7ed;
  color: #606266 !important;
  transition: all 0.3s ease;
}

.header-right .el-button:hover {
  background: #409eff;
  border-color: #409eff;
  color: #fff !important;
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.3);
}

.notification-badge {
  margin-right: 0;
}

.notification-badge .el-badge__content {
  font-size: 12px;
  height: 18px;
  line-height: 18px;
  min-width: 18px;
  padding: 0 6px;
  background: #f56c6c;
  border: 2px solid #fff;
}

.user-dropdown {
  margin-left: 4px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 16px;
  border-radius: 24px;
  background: #f5f7fa;
  border: 1px solid #e4e7ed;
  transition: all 0.3s ease;
  cursor: pointer;
}

.user-info:hover {
  background: #ecf5ff;
  border-color: #409eff;
  box-shadow: 0 2px 8px rgba(64, 158, 255, 0.2);
}

.user-info .el-avatar {
  border: 2px solid #e4e7ed;
}

.username {
  font-size: 14px;
  font-weight: 500;
  color: #303133;
  white-space: nowrap;
}

.dropdown-icon {
  color: #909399;
  font-size: 12px;
  white-space: nowrap;
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.main-container {
  flex: 1;
  height: calc(100vh - 70px);
  display: flex;
}

.sidebar {
  background: #ffffff;
  transition: width 0.3s;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  border-right: 1px solid #e4e7ed;
  overflow: hidden !important;
  width: var(--sidebar-width) !important;
  height: calc(100vh - 70px);
  position: relative;
}

.sidebar .el-menu {
  width: 100% !important;
  min-width: 100% !important;
  max-width: none !important;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}

.sidebar .el-menu-item,
.sidebar .el-sub-menu__title {
  max-width: none !important;
  overflow: hidden !important;
  white-space: nowrap;
  text-overflow: ellipsis;
}

/* 确保主内容区域能正确响应侧边栏宽度变化 */
.main-content {
  transition: all 0.3s;
  padding: 0;
  flex: 1;
  overflow: hidden;
}



.sidebar-menu {
  border: none;
  background: #ffffff;
  padding: 0;
}

/* 折叠状态下隐藏菜单文字与箭头，防止文字溢出 */
.sidebar .el-menu.el-menu--collapse .el-sub-menu__title span,
.sidebar .el-menu.el-menu--collapse .el-menu-item span {
  display: none !important;
  opacity: 0 !important;
  visibility: hidden !important;
  width: 0 !important;
  height: 0 !important;
  overflow: hidden !important;
}

/* 更具体的选择器确保样式生效 */
.sidebar .el-menu.el-menu--collapse .el-sub-menu .el-sub-menu__title span,
.sidebar .el-menu.el-menu--collapse .el-menu-item span {
  display: none !important;
  opacity: 0 !important;
  visibility: hidden !important;
  width: 0 !important;
  height: 0 !important;
  overflow: hidden !important;
}

/* 针对递归组件中的span元素 */
.sidebar .el-menu.el-menu--collapse [data-v-3341fe46] span {
  display: none !important;
  opacity: 0 !important;
  visibility: hidden !important;
  width: 0 !important;
  height: 0 !important;
  overflow: hidden !important;
}

.sidebar .el-menu.el-menu--collapse .el-sub-menu__title,
.sidebar .el-menu.el-menu--collapse .el-menu-item {
  overflow: hidden !important;
  padding-left: 20px !important;
  padding-right: 20px !important;
  text-align: center;
  justify-content: center !important;
  display: flex !important;
  align-items: center !important;
}

.sidebar .el-menu.el-menu--collapse .el-sub-menu__title .el-sub-menu__icon-arrow {
  display: none !important;
  opacity: 0 !important;
  visibility: hidden !important;
  width: 0 !important;
  height: 0 !important;
}

/* 确保折叠状态下只显示图标 */
.sidebar .el-menu.el-menu--collapse .el-sub-menu__title .el-icon,
.sidebar .el-menu.el-menu--collapse .el-menu-item .el-icon {
  margin-right: 0 !important;
  flex-shrink: 0 !important;
}

/* 进一步隐藏任何残留文字节点 */
.sidebar .el-menu.el-menu--collapse .el-sub-menu__title,
.sidebar .el-menu.el-menu--collapse .el-menu-item {
  font-size: 0 !important;
}

/* 保持图标可见并设置合适尺寸 */
.sidebar .el-menu.el-menu--collapse .el-sub-menu__title .el-icon,
.sidebar .el-menu.el-menu--collapse .el-menu-item .el-icon {
  font-size: 18px !important;
  margin: 0 !important;
}

/* 确保折叠状态下完全隐藏文字 */
.sidebar .el-menu.el-menu--collapse .el-sub-menu__title *:not(.el-icon):not(svg):not(i),
.sidebar .el-menu.el-menu--collapse .el-menu-item *:not(.el-icon):not(svg):not(i) {
  display: none !important;
  opacity: 0 !important;
  visibility: hidden !important;
  width: 0 !important;
  max-width: 0 !important;
  overflow: hidden !important;
  position: absolute !important;
  left: -9999px !important;
}

/* 自定义滚动条样式 */
.sidebar .el-menu::-webkit-scrollbar {
  width: 6px;
}

.sidebar .el-menu::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.sidebar .el-menu::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.sidebar .el-menu::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

.sidebar-menu .el-menu-item {
  color: #303133;
  margin: 0;
  border-radius: 0;
  transition: all 0.3s ease;
  font-weight: 400;
  height: 48px;
  line-height: 48px;
  padding: 0 20px;
  border-bottom: 1px solid #f0f0f0;
  white-space: nowrap;
  overflow: visible;
}

.sidebar-menu .el-menu-item:hover {
  background: #f5f7fa;
  color: #303133;
}

.sidebar-menu .el-menu-item.is-active {
  background: #409eff;
  color: #ffffff;
  font-weight: 500;
}

.sidebar-menu .el-sub-menu .el-sub-menu__title {
  color: #303133;
  margin: 0;
  border-radius: 0;
  transition: all 0.3s ease;
  font-weight: 400;
  height: 48px;
  line-height: 48px;
  padding: 0 20px;
  border-bottom: 1px solid #f0f0f0;
  white-space: nowrap;
  overflow: visible;
}

.sidebar-menu .el-sub-menu .el-sub-menu__title:hover {
  background: #f5f7fa;
  color: #303133;
}

.sidebar-menu .el-sub-menu .el-menu-item {
  background: #ffffff;
  margin: 0;
  border-radius: 0;
  color: #606266;
  transition: all 0.3s ease;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  padding: 0 40px;
  border-bottom: 1px solid #f8f9fa;
  white-space: nowrap;
  overflow: visible;
}

.sidebar-menu .el-sub-menu .el-menu-item:hover {
  background: #f5f7fa;
  color: #303133;
}

.sidebar-menu .el-sub-menu .el-menu-item.is-active {
  background: #409eff;
  color: #ffffff;
  font-weight: 500;
}

.sidebar-menu .el-sub-menu .el-sub-menu__title .el-sub-menu__icon-arrow {
  color: #909399;
  transition: all 0.3s ease;
}

.sidebar-menu .el-sub-menu.is-opened .el-sub-menu__title .el-sub-menu__icon-arrow {
  transform: rotate(180deg);
  color: #303133;
}

.main-content {
  background: #f5f5f5;
  padding: 0;
  display: flex;
  flex-direction: column;
}

/* ==================== 面包屑导航样式 ==================== */

.breadcrumb-navigation {
  flex-shrink: 0;
  z-index: 10;
}

/* ==================== 页面内容样式 ==================== */

.page-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background: #f5f5f5;
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.content-header h2 {
  margin: 0;
  color: #303133;
}

.header-actions {
  display: flex;
  gap: 10px;
}

.stats-row {
  margin-bottom: 20px;
}

.stat-card {
  border: none;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.stat-content {
  display: flex;
  align-items: center;
  gap: 15px;
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #fff;
}

.stat-icon.users {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.stat-icon.orders {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.stat-icon.revenue {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.stat-icon.products {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
}

.stat-info {
  flex: 1;
}

.stat-number {
  font-size: 24px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 14px;
  color: #909399;
}

.content-row {
  margin-top: 20px;
}

.chart-card,
.activity-card {
  border: none;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chart-placeholder {
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #909399;
  background: #fafafa;
  border-radius: 4px;
}

.chart-placeholder p {
  margin-top: 10px;
  font-size: 14px;
}

.activity-list {
  max-height: 300px;
  overflow-y: auto;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
}

.activity-item:last-child {
  border-bottom: none;
}


.activity-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #409eff;
}

.activity-content {
  flex: 1;
}

.activity-message {
  font-size: 14px;
  color: #303133;
  margin-bottom: 4px;
}

.activity-time {
  font-size: 12px;
  color: #909399;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .header-center {
    display: none;
  }

  .stats-row .el-col {
    margin-bottom: 10px;
  }

  .content-row .el-col {
    margin-bottom: 20px;
  }
}
</style>

<!-- 全局样式：用于菜单收缩时隐藏文字 -->
<style>
/* 最高优先级：强制隐藏菜单收缩时的文字 */
.el-menu--collapse .el-sub-menu__title span,
.el-menu--collapse .el-menu-item span {
  display: none !important;
  opacity: 0 !important;
  visibility: hidden !important;
  width: 0 !important;
  max-width: 0 !important;
  height: 0 !important;
  max-height: 0 !important;
  overflow: hidden !important;
  position: absolute !important;
  left: -99999px !important;
  pointer-events: none !important;
}

/* 隐藏箭头图标 */
.el-menu--collapse .el-sub-menu__title .el-sub-menu__icon-arrow,
.el-menu--collapse .el-sub-menu__icon-arrow {
  display: none !important;
  opacity: 0 !important;
  visibility: hidden !important;
  width: 0 !important;
  height: 0 !important;
  overflow: hidden !important;
  position: absolute !important;
  left: -99999px !important;
}

/* 确保菜单项居中显示图标 */
.el-menu--collapse .el-sub-menu__title,
.el-menu--collapse .el-menu-item {
  padding-left: 0 !important;
  padding-right: 0 !important;
  justify-content: center !important;
  display: flex !important;
  align-items: center !important;
}

/* 设置图标样式 */
.el-menu--collapse .el-sub-menu__title .el-icon,
.el-menu--collapse .el-menu-item .el-icon {
  margin: 0 auto !important;
  font-size: 18px !important;
}
</style>
