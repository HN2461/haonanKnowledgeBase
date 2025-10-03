/**
 * 消息数据仓库
 * 用于存储和管理系统消息和功能更新通知
 */

// 消息类型枚举
export const MESSAGE_TYPES = {
  PRIMARY: 'primary',    // 主要消息
  SUCCESS: 'success',    // 成功消息
  INFO: 'info',          // 信息消息
  WARNING: 'warning',    // 警告消息
  DANGER: 'danger'       // 危险消息
}

// 消息状态枚举
export const MESSAGE_STATUS = {
  PUBLISHED: 'published',  // 已发布
  DRAFT: 'draft',         // 草稿
  ARCHIVED: 'archived'    // 已归档
}

/**
 * 消息数据结构
 * @typedef {Object} Message
 * @property {string} id - 消息唯一标识
 * @property {string} timestamp - 时间戳 (ISO 8601 格式)
 * @property {string} type - 消息类型 (MESSAGE_TYPES)
 * @property {string} status - 消息状态 (MESSAGE_STATUS)
 * @property {string} title - 消息标题
 * @property {string} content - 消息内容
 * @property {string[]} tags - 标签数组
 * @property {string} icon - 图标名称 (可选)
 * @property {string} author - 作者 (可选)
 * @property {string} category - 分类 (可选)
 * @property {Object} metadata - 元数据 (可选)
 */

// 消息数据存储
// 注意：新消息请添加到数组开头，保持时间顺序（最新的在前）
const messages = [
  {
    id: 'msg-025',
    timestamp: '2025-10-03T17:25:00.000Z',
    type: MESSAGE_TYPES.SUCCESS,
    status: MESSAGE_STATUS.PUBLISHED,
    title: '🔧 修复404页面显示问题',
    content: '修复404页面在应用布局内显示的问题，现在404页面会全屏显示，不再包含在侧边栏和头部导航中，提供更好的用户体验',
    tags: ['Bug修复', '404页面', '全屏显示', '用户体验'],
    icon: 'Tools',
    author: '开发团队',
    category: 'Bug修复'
  },
  {
    id: 'msg-024',
    timestamp: '2025-10-03T17:20:00.000Z',
    type: MESSAGE_TYPES.SUCCESS,
    status: MESSAGE_STATUS.PUBLISHED,
    title: '📝 调整个人技术文档菜单结构',
    content: '简化个人技术文档菜单结构，移除后端技术、开发工具、架构设计分类，去除前端技术的子菜单，新增随记文档分类，让菜单更加简洁实用',
    tags: ['菜单优化', '结构简化', '随记文档', '用户体验'],
    icon: 'EditPen',
    author: '开发团队',
    category: '界面优化'
  },
  {
    id: 'msg-023',
    timestamp: '2025-10-03T17:15:00.000Z',
    type: MESSAGE_TYPES.SUCCESS,
    status: MESSAGE_STATUS.PUBLISHED,
    title: '📚 新增个人技术文档菜单',
    content: '在左侧菜单中新增"个人技术文档"菜单项，包含前端技术、后端技术、开发工具、架构设计四个分类，用于存放个人总结的各种技术文档和知识点',
    tags: ['菜单扩展', '文档管理', '技术总结', '知识库'],
    icon: 'Document',
    author: '开发团队',
    category: '功能新增'
  },
  {
    id: 'msg-022',
    timestamp: '2025-10-03T17:10:00.000Z',
    type: MESSAGE_TYPES.SUCCESS,
    status: MESSAGE_STATUS.PUBLISHED,
    title: '🗑️ 移除左侧标题区域',
    content: '完全移除左侧标题区域，让时间轴内容占据全屏，采用居中卡片布局，让开发记录更加突出和易读',
    tags: ['界面简化', '全屏布局', '内容突出', '用户体验'],
    icon: 'Delete',
    author: '开发团队',
    category: '界面优化'
  },
  {
    id: 'msg-021',
    timestamp: '2025-10-03T17:05:00.000Z',
    type: MESSAGE_TYPES.SUCCESS,
    status: MESSAGE_STATUS.PUBLISHED,
    title: '📍 左侧标题紧贴布局',
    content: '调整左侧标题区域紧贴屏幕左上角，采用全屏高度设计，移除边距和圆角，让标题区域更加紧凑和突出',
    tags: ['布局调整', '紧贴设计', '全屏高度', '界面优化'],
    icon: 'Position',
    author: '开发团队',
    category: '界面优化'
  },
  {
    id: 'msg-020',
    timestamp: '2025-10-03T17:00:00.000Z',
    type: MESSAGE_TYPES.SUCCESS,
    status: MESSAGE_STATUS.PUBLISHED,
    title: '🎨 左侧标题样式美化',
    content: '优化左侧标题区域的设计，添加渐变背景、阴影效果和更好的字体样式，让整体布局更加美观协调',
    tags: ['界面美化', '样式优化', '用户体验', '视觉设计'],
    icon: 'Picture',
    author: '开发团队',
    category: '界面优化'
  },
  {
    id: 'msg-019',
    timestamp: '2025-10-03T16:50:00.000Z',
    type: MESSAGE_TYPES.SUCCESS,
    status: MESSAGE_STATUS.PUBLISHED,
    title: '📐 开发记录布局优化',
    content: '调整开发记录页面布局，标题放在左侧固定位置，中间区域专注于显示时间轴内容，提升阅读体验',
    tags: ['布局优化', '用户体验', '界面设计', '响应式'],
    icon: 'Grid',
    author: '开发团队',
    category: '界面优化'
  },
  {
    id: 'msg-018',
    timestamp: '2025-10-03T16:45:00.000Z',
    type: MESSAGE_TYPES.INFO,
    status: MESSAGE_STATUS.PUBLISHED,
    title: '🕐 时间格式优化',
    content: '进一步简化时间显示，直接从时间戳字符串提取显示，完全避免Date对象转换，确保填什么显示什么',
    tags: ['时间显示', '格式优化', '字符串处理', 'Bug修复'],
    icon: 'Clock',
    author: '开发团队',
    category: '问题修复'
  },
  {
    id: 'msg-017',
    timestamp: '2025-10-03T16:27:00.000Z',
    type: MESSAGE_TYPES.SUCCESS,
    status: MESSAGE_STATUS.PUBLISHED,
    title: '🔢 菜单排序功能实现',
    content: '为菜单项添加了排序功能，通过sort字段控制菜单显示顺序，数值越小越靠前，支持同一父菜单下的排序',
    tags: ['菜单排序', '功能增强', '用户体验', '数据结构'],
    icon: 'Sort',
    author: '开发团队',
    category: '功能开发'
  },
  {
    id: 'msg-016',
    timestamp: '2025-10-03T16:17:00.000Z',
    type: MESSAGE_TYPES.SUCCESS,
    status: MESSAGE_STATUS.PUBLISHED,
    title: '📝 开发记录页面优化',
    content: '简化了开发记录页面，采用简洁的时间轴设计，并完善了消息仓库的注释和快速添加指南',
    tags: ['页面优化', '开发记录', '时间轴', '注释完善'],
    icon: 'Document',
    author: '开发团队',
    category: '界面优化'
  },
  {
    id: 'msg-001',
    timestamp: '2025-10-01T09:00:00.000Z',
    type: MESSAGE_TYPES.PRIMARY,
    status: MESSAGE_STATUS.PUBLISHED,
    title: '🎉 项目初始化完成',
    content: '浩南知识库前端项目正式创建，基于 Vue 3 + Element Plus + Vite 技术栈',
    tags: ['项目创建', 'Vue 3', 'Element Plus', 'Vite'],
    icon: 'Star',
    author: '系统管理员',
    category: '项目里程碑'
  },
  {
    id: 'msg-002',
    timestamp: '2025-10-01T10:30:00.000Z',
    type: MESSAGE_TYPES.SUCCESS,
    status: MESSAGE_STATUS.PUBLISHED,
    title: '🔐 登录系统实现',
    content: '完成用户登录功能，包括登录页面、用户状态管理、路由守卫等核心功能',
    tags: ['登录系统', 'Pinia', '路由守卫'],
    icon: 'Lock',
    author: '开发团队',
    category: '核心功能'
  },
  {
    id: 'msg-003',
    timestamp: '2025-10-01T11:15:00.000Z',
    type: MESSAGE_TYPES.SUCCESS,
    status: MESSAGE_STATUS.PUBLISHED,
    title: '🎨 登录页面设计',
    content: '设计并实现美观的登录页面，包含轮播图背景、响应式布局、表单验证等功能',
    tags: ['UI设计', '轮播图', '响应式'],
    icon: 'Picture',
    author: 'UI设计师',
    category: '界面设计'
  },
  {
    id: 'msg-004',
    timestamp: '2025-10-01T14:20:00.000Z',
    type: MESSAGE_TYPES.SUCCESS,
    status: MESSAGE_STATUS.PUBLISHED,
    title: '📱 主应用布局',
    content: '完成主应用界面布局，包括顶部导航栏、侧边栏菜单、主内容区域等',
    tags: ['布局设计', '导航栏', '侧边栏'],
    icon: 'Grid',
    author: '开发团队',
    category: '界面设计'
  },
  {
    id: 'msg-005',
    timestamp: '2025-10-01T15:45:00.000Z',
    type: MESSAGE_TYPES.SUCCESS,
    status: MESSAGE_STATUS.PUBLISHED,
    title: '🔍 智能搜索功能',
    content: '实现头部导航栏的智能模糊搜索功能，支持多维度搜索和关键词高亮显示',
    tags: ['搜索功能', '模糊搜索', '关键词高亮'],
    icon: 'Search',
    author: '开发团队',
    category: '核心功能'
  },
  {
    id: 'msg-006',
    timestamp: '2025-10-01T16:30:00.000Z',
    type: MESSAGE_TYPES.SUCCESS,
    status: MESSAGE_STATUS.PUBLISHED,
    title: '📋 Element Plus 组件库',
    content: '开始集成 Element Plus 组件库，创建各种组件的演示页面',
    tags: ['组件库', 'Element Plus', '演示页面'],
    icon: 'Collection',
    author: '开发团队',
    category: '组件开发'
  },
  {
    id: 'msg-007',
    timestamp: '2025-10-01T17:00:00.000Z',
    type: MESSAGE_TYPES.SUCCESS,
    status: MESSAGE_STATUS.PUBLISHED,
    title: '🎯 基础组件演示',
    content: '完成按钮、输入框、选择器、日期选择器等基础组件的演示页面',
    tags: ['基础组件', 'Button', 'Input', 'Select'],
    icon: 'Tools',
    author: '开发团队',
    category: '组件开发'
  },
  {
    id: 'msg-008',
    timestamp: '2025-10-02T18:15:00.000Z',
    type: MESSAGE_TYPES.SUCCESS,
    status: MESSAGE_STATUS.PUBLISHED,
    title: '📊 数据展示组件',
    content: '完成表格、分页、标签、进度条等数据展示组件的演示页面',
    tags: ['数据组件', 'Table', 'Pagination', 'Tag'],
    icon: 'DataAnalysis',
    author: '开发团队',
    category: '组件开发'
  },
  {
    id: 'msg-009',
    timestamp: '2025-10-02T19:30:00.000Z',
    type: MESSAGE_TYPES.SUCCESS,
    status: MESSAGE_STATUS.PUBLISHED,
    title: '💬 反馈组件',
    content: '完成消息提示、通知、对话框、抽屉等反馈组件的演示页面',
    tags: ['反馈组件', 'Message', 'Notification', 'Dialog'],
    icon: 'ChatDotSquare',
    author: '开发团队',
    category: '组件开发'
  },
  {
    id: 'msg-010',
    timestamp: '2025-10-02T20:45:00.000Z',
    type: MESSAGE_TYPES.SUCCESS,
    status: MESSAGE_STATUS.PUBLISHED,
    title: '🎨 布局组件',
    content: '完成容器、栅格、空间、分割线等布局组件的演示页面',
    tags: ['布局组件', 'Container', 'Row/Col', 'Space'],
    icon: 'Grid',
    author: '开发团队',
    category: '组件开发'
  },
  {
    id: 'msg-011',
    timestamp: '2025-10-02T21:30:00.000Z',
    type: MESSAGE_TYPES.SUCCESS,
    status: MESSAGE_STATUS.PUBLISHED,
    title: '📝 表单组件',
    content: '完成表单、单选框、复选框、开关等表单组件的演示页面',
    tags: ['表单组件', 'Form', 'Radio', 'Checkbox'],
    icon: 'Edit',
    author: '开发团队',
    category: '组件开发'
  },
  {
    id: 'msg-012',
    timestamp: '2025-10-02T22:00:00.000Z',
    type: MESSAGE_TYPES.SUCCESS,
    status: MESSAGE_STATUS.PUBLISHED,
    title: '🔧 功能组件',
    content: '完成上传、树形选择、穿梭框、级联选择等功能组件的演示页面',
    tags: ['功能组件', 'Upload', 'Tree', 'Transfer'],
    icon: 'Setting',
    author: '开发团队',
    category: '组件开发'
  },
  {
    id: 'msg-013',
    timestamp: '2025-10-02T22:30:00.000Z',
    type: MESSAGE_TYPES.SUCCESS,
    status: MESSAGE_STATUS.PUBLISHED,
    title: '📚 使用说明完善',
    content: '为所有组件演示页面添加详细的使用说明和代码示例',
    tags: ['文档完善', '使用说明', '代码示例'],
    icon: 'Document',
    author: '开发团队',
    category: '文档完善'
  },
  {
    id: 'msg-014',
    timestamp: '2025-10-02T23:00:00.000Z',
    type: MESSAGE_TYPES.SUCCESS,
    status: MESSAGE_STATUS.PUBLISHED,
    title: '🎯 缺失组件补充',
    content: '补充缺失的 Element Plus 组件，包括弹出框、文字提示、锚点、下拉菜单、页头等',
    tags: ['组件补充', 'Popover', 'Tooltip', 'Anchor'],
    icon: 'Plus',
    author: '开发团队',
    category: '组件开发'
  },
  {
    id: 'msg-015',
    timestamp: '2025-10-03T16:01:00.000Z',
    type: MESSAGE_TYPES.SUCCESS,
    status: MESSAGE_STATUS.PUBLISHED,
    title: '💬 消息中心创建',
    content: '创建消息中心页面，展示项目功能更新历史和使用说明',
    tags: ['消息中心', '时间轴', '功能历史'],
    icon: 'Bell',
    author: '开发团队',
    category: '功能开发'
  }
]

/**
 * 消息仓库类
 */
class MessageStore {
  constructor() {
    this.messages = [...messages]
  }

  /**
   * 获取所有已发布的消息
   * @returns {Message[]} 消息数组
   */
  getPublishedMessages() {
    return this.messages
      .filter(msg => msg.status === MESSAGE_STATUS.PUBLISHED)
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
  }

  /**
   * 根据分类获取消息
   * @param {string} category - 分类名称
   * @returns {Message[]} 消息数组
   */
  getMessagesByCategory(category) {
    return this.getPublishedMessages()
      .filter(msg => msg.category === category)
  }

  /**
   * 根据类型获取消息
   * @param {string} type - 消息类型
   * @returns {Message[]} 消息数组
   */
  getMessagesByType(type) {
    return this.getPublishedMessages()
      .filter(msg => msg.type === type)
  }

  /**
   * 搜索消息
   * @param {string} keyword - 搜索关键词
   * @returns {Message[]} 消息数组
   */
  searchMessages(keyword) {
    const lowerKeyword = keyword.toLowerCase()
    return this.getPublishedMessages()
      .filter(msg => 
        msg.title.toLowerCase().includes(lowerKeyword) ||
        msg.content.toLowerCase().includes(lowerKeyword) ||
        msg.tags.some(tag => tag.toLowerCase().includes(lowerKeyword))
      )
  }

  /**
   * 添加新消息
   * @param {Partial<Message>} messageData - 消息数据
   * @returns {Message} 添加的消息
   */
  addMessage(messageData) {
    const newMessage = {
      id: `msg-${Date.now()}`,
      timestamp: new Date().toISOString(),
      type: MESSAGE_TYPES.INFO,
      status: MESSAGE_STATUS.PUBLISHED,
      title: '',
      content: '',
      tags: [],
      icon: 'Bell',
      author: '系统管理员',
      category: '系统通知',
      metadata: {},
      ...messageData
    }

    this.messages.unshift(newMessage)
    return newMessage
  }

  /**
   * 更新消息
   * @param {string} id - 消息ID
   * @param {Partial<Message>} updates - 更新数据
   * @returns {Message|null} 更新后的消息
   */
  updateMessage(id, updates) {
    const index = this.messages.findIndex(msg => msg.id === id)
    if (index !== -1) {
      this.messages[index] = { ...this.messages[index], ...updates }
      return this.messages[index]
    }
    return null
  }

  /**
   * 删除消息
   * @param {string} id - 消息ID
   * @returns {boolean} 是否删除成功
   */
  deleteMessage(id) {
    const index = this.messages.findIndex(msg => msg.id === id)
    if (index !== -1) {
      this.messages.splice(index, 1)
      return true
    }
    return false
  }

  /**
   * 获取消息统计信息
   * @returns {Object} 统计信息
   */
  getStatistics() {
    const published = this.messages.filter(msg => msg.status === MESSAGE_STATUS.PUBLISHED)
    const drafts = this.messages.filter(msg => msg.status === MESSAGE_STATUS.DRAFT)
    const archived = this.messages.filter(msg => msg.status === MESSAGE_STATUS.ARCHIVED)

    const typeStats = {}
    const categoryStats = {}

    published.forEach(msg => {
      typeStats[msg.type] = (typeStats[msg.type] || 0) + 1
      categoryStats[msg.category] = (categoryStats[msg.category] || 0) + 1
    })

    return {
      total: this.messages.length,
      published: published.length,
      drafts: drafts.length,
      archived: archived.length,
      typeStats,
      categoryStats
    }
  }
}

// 创建消息仓库实例
export const messageStore = new MessageStore()

// 导出消息格式模板
export const MESSAGE_TEMPLATE = {
  // 基础信息
  id: 'msg-xxx',                    // 消息ID (自动生成)
  timestamp: '2024-01-15T00:00:00.000Z',  // 时间戳 (ISO 8601 格式)
  type: 'info',                     // 消息类型: primary, success, info, warning, danger
  status: 'published',              // 消息状态: published, draft, archived
  title: '消息标题',                // 消息标题 (必填)
  content: '消息内容描述',          // 消息内容 (必填)
  tags: ['标签1', '标签2'],        // 标签数组 (可选)
  
  // 扩展信息
  icon: 'Bell',                     // 图标名称 (可选)
  author: '作者名称',               // 作者 (可选)
  category: '分类名称',             // 分类 (可选)
  
  // 元数据
  metadata: {                       // 元数据 (可选)
    priority: 'normal',             // 优先级: low, normal, high, urgent
    readCount: 0,                   // 阅读次数
    likeCount: 0,                   // 点赞次数
    attachments: []                 // 附件列表
  }
}

/**
 * 快速添加消息指南
 * 
 * 1. 在 messages 数组的开头添加新消息（使用 unshift 保持最新消息在前）
 * 2. 复制下面的模板，修改相应字段
 * 3. 确保 id 唯一，建议使用 'msg-' + 时间戳
 * 4. 时间戳使用 ISO 8601 格式：'2024-01-15T10:30:00.000Z'
 * 
 * 消息类型说明：
 * - primary: 主要功能、重要更新
 * - success: 功能完成、问题修复
 * - info: 一般信息、说明
 * - warning: 注意事项、维护通知
 * - danger: 错误、紧急问题
 * 
 * 常用图标：
 * - Star: 新功能、重要更新
 * - Lock: 登录、安全相关
 * - Picture: UI设计、界面相关
 * - Grid: 布局、框架相关
 * - Search: 搜索功能
 * - Collection: 组件库、集合
 * - Tools: 工具、开发相关
 * - DataAnalysis: 数据、统计相关
 * - ChatDotSquare: 反馈、消息相关
 * - Edit: 表单、编辑相关
 * - Setting: 配置、设置相关
 * - Document: 文档、说明相关
 * - Plus: 新增、补充相关
 * - Bell: 通知、消息相关
 * - Bug: 问题修复
 * - Flag: 里程碑、标志性事件
 * 
 * 常用分类：
 * - 项目里程碑: 项目启动、重要节点
 * - 核心功能: 登录、搜索、主要功能
 * - 界面设计: UI/UX、布局、样式
 * - 组件开发: Element Plus组件相关
 * - 功能开发: 新功能开发
 * - 问题修复: Bug修复、问题解决
 * - 文档完善: 文档、说明、教程
 * - 系统通知: 维护、升级通知
 * - 重要通知: 重要公告
 * 
 * 标签建议：
 * - 技术栈: Vue 3, Element Plus, Vite, Pinia
 * - 功能类型: 登录, 搜索, 组件, 布局, 表单
 * - 开发阶段: 开发, 测试, 部署, 维护
 * - 组件名称: Button, Input, Table, Form 等
 * 
 * 示例消息模板：
 * {
 *   id: 'msg-xxx',
 *   timestamp: '2024-01-15T10:30:00.000Z',
 *   type: MESSAGE_TYPES.SUCCESS,
 *   status: MESSAGE_STATUS.PUBLISHED,
 *   title: '🎉 新功能上线',
 *   content: '详细描述新功能的内容和作用',
 *   tags: ['新功能', '用户管理', 'CRUD'],
 *   icon: 'Star',
 *   author: '开发团队',
 *   category: '功能开发'
 * }
 */

// 导出消息添加示例
export const MESSAGE_EXAMPLES = {
  // 功能更新示例
  featureUpdate: {
    title: '🚀 新功能发布',
    content: '新增了用户管理模块，支持用户的增删改查操作',
    type: MESSAGE_TYPES.SUCCESS,
    tags: ['新功能', '用户管理', 'CRUD'],
    icon: 'Star',
    category: '功能更新'
  },
  
  // 问题修复示例
  bugFix: {
    title: '🐛 问题修复',
    content: '修复了登录页面在某些浏览器下的兼容性问题',
    type: MESSAGE_TYPES.INFO,
    tags: ['问题修复', '兼容性', '登录'],
    icon: 'Tools',
    category: '问题修复'
  },
  
  // 系统维护示例
  maintenance: {
    title: '🔧 系统维护',
    content: '系统将于今晚22:00-24:00进行维护升级，期间可能无法正常访问',
    type: MESSAGE_TYPES.WARNING,
    tags: ['系统维护', '升级', '通知'],
    icon: 'Setting',
    category: '系统通知'
  },
  
  // 重要通知示例
  announcement: {
    title: '📢 重要通知',
    content: '由于业务发展需要，系统将于下月进行重大版本升级',
    type: MESSAGE_TYPES.PRIMARY,
    tags: ['重要通知', '版本升级', '业务发展'],
    icon: 'Bell',
    category: '重要通知'
  }
}

/**
 * ========================================
 * 快速添加新消息区域
 * ========================================
 * 
 * 复制下面的模板，修改相应内容，然后添加到 messages 数组的开头
 * 
 * 模板：
 * {
 *   id: 'msg-' + Date.now(),
 *   timestamp: new Date().toISOString(),
 *   type: MESSAGE_TYPES.SUCCESS,  // 可选: PRIMARY, SUCCESS, INFO, WARNING, DANGER
 *   status: MESSAGE_STATUS.PUBLISHED,
 *   title: '🎉 标题内容',
 *   content: '详细描述内容',
 *   tags: ['标签1', '标签2'],
 *   icon: 'Star',  // 可选图标
 *   author: '开发团队',
 *   category: '功能开发'  // 可选分类
 * }
 * 
 * 示例：
 * {
 *   id: 'msg-1733123456789',
 *   timestamp: '2024-12-01T14:30:00.000Z',
 *   type: MESSAGE_TYPES.SUCCESS,
 *   status: MESSAGE_STATUS.PUBLISHED,
 *   title: '🚀 新功能：用户权限管理',
 *   content: '新增了用户权限管理模块，支持角色分配和权限控制',
 *   tags: ['新功能', '权限管理', '用户管理'],
 *   icon: 'UserFilled',
 *   author: '开发团队',
 *   category: '功能开发'
 * }
 * 
 * 菜单排序使用说明：
 * - 在菜单项中添加 sort 字段，数值越小越靠前
 * - 例如：{ index: 'ep-button', title: '按钮', path: '/ep/button', sort: 1 }
 * - 使用 menuStore.updateMenuItemSort('ep-button', 1) 更新排序
 * - 使用 menuStore.sortMenuItems(menuItems) 重新排序
 */
