/**
 * 菜单状态管理 Store
 * 使用 Pinia 进行状态管理，负责菜单的展开/收起、菜单项管理等功能
 */
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export const useMenuStore = defineStore('menu', () => {
  // 获取路由实例，用于页面跳转
  const router = useRouter()
  const route = useRoute()

  // ==================== 状态定义 ====================
  
  /**
   * 侧边栏折叠状态
   * true: 折叠状态，只显示图标
   * false: 展开状态，显示完整菜单
   */
  const isCollapse = ref(false)
  
  /**
   * 菜单项数据
   * 采用树形结构，支持无限层级嵌套
   * 每个菜单项包含以下属性：
   * - index: 唯一标识符，用于菜单选中状态
   * - title: 菜单显示名称
   * - icon: Element Plus 图标名称
   * - path: 路由路径
   * - children: 子菜单数组（可选）
   */
  const menuItems = ref([
    // 仪表板 - 首页菜单项
    {
      index: 'dashboard', 
      title: '仪表板',
      icon: 'DataAnalysis',
      path: '/dashboard',
      children: [] // 无子菜单
    },
    
    // 新增菜单入口改为头部按钮，不在侧边栏展示
    
    // Element Plus 组件讲解
    {
      index: 'ep',
      title: 'ElementPlus组件',
      icon: 'Collection',
      path: '/ep',
      children: [
        {
          index: 'ep-basic',
          title: '基础',
          path: '/ep/basic',
          children: [
            { index: 'ep-button', title: '按钮 Button', path: '/ep/button' },
            { index: 'ep-button-group', title: '按钮组 ButtonGroup', path: '/ep/button-group' },
            { index: 'ep-link', title: '链接 Link', path: '/ep/link' },
            { index: 'ep-text', title: '文本 Text', path: '/ep/text' },
            { index: 'ep-space', title: '间距 Space', path: '/ep/space' }
          ]
        },
        {
          index: 'ep-layout',
          title: '布局',
          path: '/ep/layout',
          children: [
            { index: 'ep-layout', title: '布局 Layout', path: '/ep/layout' },
            { index: 'ep-container', title: '容器 Container', path: '/ep/container' },
            { index: 'ep-progress', title: '进度条 Progress', path: '/ep/progress' }
          ]
        },
        {
          index: 'ep-form',
          title: '表单',
          path: '/ep/form-root',
          children: [
            { index: 'ep-input', title: '输入框 Input', path: '/ep/input' },
            { index: 'ep-input-number', title: '数字输入框 InputNumber', path: '/ep/input-number' },
            { index: 'ep-select', title: '选择器 Select', path: '/ep/select' },
            { index: 'ep-radio', title: '单选框 Radio', path: '/ep/radio' },
            { index: 'ep-checkbox', title: '多选框 Checkbox', path: '/ep/checkbox' },
            { index: 'ep-switch', title: '开关 Switch', path: '/ep/switch' },
            { index: 'ep-slider', title: '滑块 Slider', path: '/ep/slider' },
            { index: 'ep-rate', title: '评分 Rate', path: '/ep/rate' },
            { index: 'ep-date', title: '日期 DatePicker', path: '/ep/date' },
            { index: 'ep-time-picker', title: '时间选择器 TimePicker', path: '/ep/time-picker' },
            { index: 'ep-time-select', title: '时间选择 TimeSelect', path: '/ep/time-select' },
            { index: 'ep-transfer', title: '穿梭框 Transfer', path: '/ep/transfer' },
            { index: 'ep-tree-select', title: '树形选择器 TreeSelect', path: '/ep/tree-select' },
            { index: 'ep-cascader', title: '级联选择器 Cascader', path: '/ep/cascader' },
            { index: 'ep-autocomplete', title: '自动补全 Autocomplete', path: '/ep/autocomplete' },
            { index: 'ep-form-demo', title: '表单 Form', path: '/ep/form' }
          ]
        },
        {
          index: 'ep-data',
          title: '数据展示',
          path: '/ep/data',
          children: [
            { index: 'ep-table', title: '表格 Table', path: '/ep/table' },
            { index: 'ep-pagination', title: '分页 Pagination', path: '/ep/pagination' },
            { index: 'ep-tag', title: '标签 Tag', path: '/ep/tag' },
            { index: 'ep-calendar', title: '日历 Calendar', path: '/ep/calendar' },
            { index: 'ep-image', title: '图片 Image', path: '/ep/image' },
            { index: 'ep-avatar', title: '头像 Avatar', path: '/ep/avatar' },
            { index: 'ep-badge', title: '徽章 Badge', path: '/ep/badge' },
            { index: 'ep-collapse', title: '折叠面板 Collapse', path: '/ep/collapse' },
            { index: 'ep-timeline', title: '时间线 Timeline', path: '/ep/timeline' },
            { index: 'ep-empty', title: '空状态 Empty', path: '/ep/empty' },
            { index: 'ep-result', title: '结果 Result', path: '/ep/result' },
            { index: 'ep-skeleton', title: '骨架屏 Skeleton', path: '/ep/skeleton' },
            { index: 'ep-scrollbar', title: '滚动条 Scrollbar', path: '/ep/scrollbar' },
            { index: 'ep-carousel', title: '走马灯 Carousel', path: '/ep/carousel' },
            { index: 'ep-popover', title: '弹出框 Popover', path: '/ep/popover' },
            { index: 'ep-tooltip', title: '文字提示 Tooltip', path: '/ep/tooltip' },
            { index: 'ep-anchor', title: '锚点 Anchor', path: '/ep/anchor' },
            { index: 'ep-dropdown', title: '下拉菜单 Dropdown', path: '/ep/dropdown' },
            { index: 'ep-page-header', title: '页头 Page Header', path: '/ep/page-header' }
          ]
        },
        {
          index: 'ep-feedback',
          title: '反馈',
          path: '/ep/feedback',
          children: [
            { index: 'ep-dialog', title: '对话框 Dialog', path: '/ep/dialog' },
            { index: 'ep-upload', title: '上传 Upload', path: '/ep/upload' },
            { index: 'ep-notification', title: '通知 Notification', path: '/ep/notification' },
            { index: 'ep-alert', title: '警告 Alert', path: '/ep/alert' },
            { index: 'ep-loading', title: '加载 Loading', path: '/ep/loading' },
            { index: 'ep-message', title: '消息 Message', path: '/ep/message' },
            { index: 'ep-messagebox', title: '消息框 MessageBox', path: '/ep/messagebox' }
          ]
        },
        {
          index: 'ep-navigation',
          title: '导航',
          path: '/ep/navigation',
          children: [
            { index: 'ep-tabs', title: '标签页 Tabs', path: '/ep/tabs' },
            { index: 'ep-breadcrumb', title: '面包屑 Breadcrumb', path: '/ep/breadcrumb' },
            { index: 'ep-steps', title: '步骤条 Steps', path: '/ep/steps' },
            { index: 'ep-affix', title: '固钉 Affix', path: '/ep/affix' },
            { index: 'ep-backtop', title: '回到顶部 Backtop', path: '/ep/backtop' }
          ]
        },
        {
          index: 'ep-other',
          title: '其他',
          path: '/ep/other',
          children: [
            { index: 'ep-divider', title: '分割线 Divider', path: '/ep/divider' },
            { index: 'ep-config-provider', title: '全局配置 ConfigProvider', path: '/ep/config-provider' }
          ]
        }
      ]
    },
    
    // 其余：Element Plus 组件讲解（已保留）
  ])

  // ==================== 计算属性 ====================
  
  /**
   * 当前激活的菜单项索引
   * 根据当前路由路径自动计算对应的菜单项
   * 用于高亮显示当前页面对应的菜单项
   */
  const activeMenu = computed(() => {
    const currentPath = route.path
    
    /**
     * 递归查找当前路径对应的菜单索引
     * @param {Array} items - 菜单项数组
     * @returns {string|null} 匹配的菜单索引，未找到返回null
     */
    const findActiveMenu = (items) => {
      for (const item of items) {
        // 如果当前菜单项的路径匹配当前路由路径
        if (item.path === currentPath) {
          return item.index
        }
        // 如果有子菜单，递归查找
        if (item.children && item.children.length > 0) {
          const found = findActiveMenu(item.children)
          if (found) {
            return found
          }
        }
      }
      return null
    }
    
    // 返回找到的菜单索引，如果未找到则默认返回仪表板
    return findActiveMenu(menuItems.value) || 'dashboard'
  })

  // ==================== 方法定义 ====================
  
  /**
   * 切换侧边栏折叠状态
   * 在展开和折叠之间切换
   */
  const toggleCollapse = () => {
    isCollapse.value = !isCollapse.value
  }

  /**
   * 处理菜单项选择事件
   * 当用户点击菜单项时，根据菜单索引跳转到对应页面
   * @param {string} index - 菜单项的唯一索引
   */
  const handleMenuSelect = (index) => {
    /**
     * 递归查找对应的菜单项
     * @param {Array} items - 菜单项数组
     * @returns {Object|null} 找到的菜单项对象，未找到返回null
     */
    const findMenuItem = (items) => {
      for (const item of items) {
        // 如果找到匹配的菜单项
        if (item.index === index) {
          return item
        }
        // 如果有子菜单，递归查找
        if (item.children && item.children.length > 0) {
          const found = findMenuItem(item.children)
          if (found) {
            return found
          }
        }
      }
      return null
    }
    
    // 查找对应的菜单项
    const menuItem = findMenuItem(menuItems.value)
    // 如果找到菜单项且有路径，则跳转到对应页面
    if (menuItem && menuItem.path) {
      router.push(menuItem.path)
    }
  }

  /**
   * 添加新的菜单项
   * 支持在指定父级菜单下添加子菜单，或添加到根级别
   * @param {string|null} parentIndex - 父级菜单的索引，为null时添加到根级别
   * @param {Object} newItem - 新的菜单项对象
   */
  const addMenuItem = (parentIndex, newItem) => {
    /**
     * 递归查找父级菜单并添加新菜单项
     * @param {Array} items - 菜单项数组
     * @returns {boolean} 是否成功添加
     */
    const findParentAndAdd = (items) => {
      for (const item of items) {
        // 如果找到指定的父级菜单
        if (item.index === parentIndex) {
          // 如果父级菜单没有children属性，初始化为空数组
          if (!item.children) {
            item.children = []
          }
          // 添加新的菜单项
          item.children.push(newItem)
          return true
        }
        // 如果有子菜单，递归查找
        if (item.children && item.children.length > 0) {
          const added = findParentAndAdd(item.children)
          if (added) {
            return true
          }
        }
      }
      return false
    }

    // 如果没有指定父级，则添加到根级别
    if (!parentIndex) {
      menuItems.value.push(newItem)
    } else {
      // 否则在指定父级下添加
      findParentAndAdd(menuItems.value)
    }
  }

  /**
   * 更新指定的菜单项
   * 根据菜单索引查找并更新菜单项属性
   * @param {string} index - 要更新的菜单项索引
   * @param {Object} updates - 要更新的属性对象
   */
  const updateMenuItem = (index, updates) => {
    /**
     * 递归查找并更新菜单项
     * @param {Array} items - 菜单项数组
     * @returns {boolean} 是否成功更新
     */
    const findAndUpdate = (items) => {
      for (let i = 0; i < items.length; i++) {
        // 如果找到匹配的菜单项
        if (items[i].index === index) {
          // 使用展开运算符合并更新属性
          items[i] = { ...items[i], ...updates }
          return true
        }
        // 如果有子菜单，递归查找
        if (items[i].children && items[i].children.length > 0) {
          const updated = findAndUpdate(items[i].children)
          if (updated) {
            return true
          }
        }
      }
      return false
    }

    findAndUpdate(menuItems.value)
  }

  /**
   * 删除指定的菜单项
   * 根据菜单索引查找并删除菜单项
   * @param {string} index - 要删除的菜单项索引
   */
  const removeMenuItem = (index) => {
    /**
     * 递归查找并删除菜单项
     * @param {Array} items - 菜单项数组
     * @returns {boolean} 是否成功删除
     */
    const findAndRemove = (items) => {
      for (let i = 0; i < items.length; i++) {
        // 如果找到匹配的菜单项
        if (items[i].index === index) {
          // 从数组中删除该菜单项
          items.splice(i, 1)
          return true
        }
        // 如果有子菜单，递归查找
        if (items[i].children && items[i].children.length > 0) {
          const removed = findAndRemove(items[i].children)
          if (removed) {
            // 如果删除后children为空，移除children属性以保持数据结构整洁
            if (items[i].children.length === 0) {
              delete items[i].children
            }
            return true
          }
        }
      }
      return false
    }

    findAndRemove(menuItems.value)
  }

  // ==================== 面包屑相关方法 ====================
  
  /**
   * 根据路径生成面包屑数据
   * @param {string} path - 当前路径
   * @returns {Array} 面包屑项数组
   */
  const generateBreadcrumb = (path) => {
    const breadcrumbItems = []
    
    /**
     * 递归查找菜单项并构建面包屑
     * @param {Array} items - 菜单项数组
     * @param {string} targetPath - 目标路径
     * @param {Array} parentPath - 父级路径
     * @returns {boolean} 是否找到
     */
    const findMenuItemPath = (items, targetPath, parentPath = []) => {
      for (const item of items) {
        const currentPath = [...parentPath, item]
        
        // 如果找到匹配的路径
        if (item.path === targetPath) {
          // 构建面包屑项
          currentPath.forEach(menuItem => {
            breadcrumbItems.push({
              path: menuItem.path,
              title: menuItem.title,
              icon: menuItem.icon
            })
          })
          return true
        }
        
        // 如果有子菜单，递归查找
        if (item.children && item.children.length > 0) {
          if (findMenuItemPath(item.children, targetPath, currentPath)) {
            return true
          }
        }
      }
      return false
    }
    
    // 从菜单数据中查找
    findMenuItemPath(menuItems.value, path)
    
    return breadcrumbItems
  }

  /**
   * 获取当前路径的面包屑数据
   * @returns {Array} 面包屑项数组
   */
  const getCurrentBreadcrumb = () => {
    return generateBreadcrumb(route.path)
  }

  // ==================== 导出接口 ====================
  
  /**
   * 返回store的公共接口
   * 包含状态、计算属性和方法，供组件使用
   */
  return {
    // 状态
    isCollapse,        // 侧边栏折叠状态
    menuItems,         // 菜单项数据
    
    // 计算属性
    activeMenu,        // 当前激活的菜单项
    
    // 方法
    toggleCollapse,    // 切换折叠状态
    handleMenuSelect,  // 处理菜单选择
    addMenuItem,       // 添加菜单项
    updateMenuItem,    // 更新菜单项
    removeMenuItem,    // 删除菜单项
    
    // 面包屑相关
    generateBreadcrumb,    // 生成面包屑数据
    getCurrentBreadcrumb   // 获取当前面包屑数据
  }
})