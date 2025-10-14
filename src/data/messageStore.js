/**
 * 简化的消息数据仓库
 * 只用于展示开发记录，不需要复杂的增删改查功能
 */

// 消息类型枚举
export const MESSAGE_TYPES = {
  PRIMARY: 'primary',
  SUCCESS: 'success', 
  INFO: 'info',
  WARNING: 'warning',
  DANGER: 'danger'
}

// 消息状态枚举
export const MESSAGE_STATUS = {
  PUBLISHED: 'published',
  DRAFT: 'draft',
  ARCHIVED: 'archived'
}

// 消息数据存储
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
    title: '⏰ 时间显示简化',
    content: '简化开发记录页面的时间显示格式，直接显示用户输入的时间，不进行任何时区转换，确保显示的时间与用户输入完全一致',
    tags: ['时间显示', '时区处理', '用户体验', '界面优化'],
    icon: 'Clock',
    author: '开发团队',
    category: '界面优化'
  },
  {
    id: 'msg-022',
    timestamp: '2025-10-03T17:10:00.000Z',
    type: MESSAGE_TYPES.SUCCESS,
    status: MESSAGE_STATUS.PUBLISHED,
    title: '📋 菜单排序功能实现',
    content: '为菜单项添加排序功能，通过数值控制显示顺序，数值越小越靠前，支持同一父菜单下的排序，提供更灵活的菜单管理',
    tags: ['菜单排序', '功能开发', '用户体验', '界面优化'],
    icon: 'Sort',
    author: '开发团队',
    category: '功能开发'
  },
  {
    id: 'msg-021',
    timestamp: '2025-10-03T17:05:00.000Z',
    type: MESSAGE_TYPES.SUCCESS,
    status: MESSAGE_STATUS.PUBLISHED,
    title: '📱 开发记录页面优化',
    content: '优化开发记录页面布局，移除左侧标题区域，让时间轴内容占据更多空间，提供更好的阅读体验',
    tags: ['开发记录', '布局优化', '用户体验', '界面调整'],
    icon: 'EditPen',
    author: '开发团队',
    category: '界面优化'
  },
  {
    id: 'msg-020',
    timestamp: '2025-10-03T17:00:00.000Z',
    type: MESSAGE_TYPES.SUCCESS,
    status: MESSAGE_STATUS.PUBLISHED,
    title: '🔍 头部搜索功能增强',
    content: '增强头部导航栏的搜索功能，实现模糊搜索，支持按标题、路径、分类、关键词进行智能匹配和评分排序',
    tags: ['搜索功能', '模糊搜索', '智能匹配', '用户体验'],
    icon: 'Search',
    author: '开发团队',
    category: '功能开发'
  },
  {
    id: 'msg-019',
    timestamp: '2025-10-03T16:55:00.000Z',
    type: MESSAGE_TYPES.SUCCESS,
    status: MESSAGE_STATUS.PUBLISHED,
    title: '📄 补充缺失的Element Plus组件页面',
    content: '补充了Popover、Tooltip、Anchor、Dropdown、Page Header等缺失的Element Plus组件演示页面，完善组件库展示',
    tags: ['Element Plus', '组件演示', '页面补充', '功能完善'],
    icon: 'Document',
    author: '开发团队',
    category: '功能开发'
  },
  {
    id: 'msg-018',
    timestamp: '2025-10-03T16:50:00.000Z',
    type: MESSAGE_TYPES.SUCCESS,
    status: MESSAGE_STATUS.PUBLISHED,
    title: '🎠 轮播图组件集成',
    content: '在登录页面集成Element Plus轮播图组件，提供更丰富的视觉效果，并创建了轮播图演示页面',
    tags: ['轮播图', '登录页面', 'Element Plus', '视觉效果'],
    icon: 'Picture',
    author: '开发团队',
    category: '功能开发'
  },
  {
    id: 'msg-017',
    timestamp: '2025-10-03T16:45:00.000Z',
    type: MESSAGE_TYPES.SUCCESS,
    status: MESSAGE_STATUS.PUBLISHED,
    title: '🎨 头部导航栏布局调整',
    content: '调整头部导航栏布局，采用白色背景设计，优化按钮样式和用户信息显示，提供更清爽的视觉效果',
    tags: ['头部导航', '布局调整', '白色背景', '视觉优化'],
    icon: 'Setting',
    author: '开发团队',
    category: '界面优化'
  },
  {
    id: 'msg-016',
    timestamp: '2025-10-03T16:40:00.000Z',
    type: MESSAGE_TYPES.SUCCESS,
    status: MESSAGE_STATUS.PUBLISHED,
    title: '🔧 侧边栏菜单折叠修复',
    content: '修复侧边栏菜单折叠时文字和箭头仍然显示的问题，确保折叠状态下只显示图标，提供更整洁的界面',
    tags: ['侧边栏', '菜单折叠', 'Bug修复', '界面优化'],
    icon: 'Tools',
    author: '开发团队',
    category: 'Bug修复'
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
  },
  {
    id: 'msg-014',
    timestamp: '2025-10-03T15:55:00.000Z',
    type: MESSAGE_TYPES.SUCCESS,
    status: MESSAGE_STATUS.PUBLISHED,
    title: '📊 数据表格组件完善',
    content: '完善数据表格组件，支持排序、筛选、分页等功能，提供完整的数据展示解决方案',
    tags: ['数据表格', '排序', '筛选', '分页'],
    icon: 'Grid',
    author: '开发团队',
    category: '组件开发'
  },
  {
    id: 'msg-013',
    timestamp: '2025-10-03T15:50:00.000Z',
    type: MESSAGE_TYPES.SUCCESS,
    status: MESSAGE_STATUS.PUBLISHED,
    title: '📝 表单组件优化',
    content: '优化表单组件，增加验证规则、错误提示、动态表单等功能，提升用户体验',
    tags: ['表单', '验证', '错误提示', '动态表单'],
    icon: 'Edit',
    author: '开发团队',
    category: '组件开发'
  },
  {
    id: 'msg-012',
    timestamp: '2025-10-03T15:45:00.000Z',
    type: MESSAGE_TYPES.SUCCESS,
    status: MESSAGE_STATUS.PUBLISHED,
    title: '🎨 主题色彩系统',
    content: '建立统一的主题色彩系统，确保整个应用的视觉一致性',
    tags: ['主题', '色彩', '视觉一致性', '设计系统'],
    icon: 'Palette',
    author: '开发团队',
    category: '设计系统'
  },
  {
    id: 'msg-011',
    timestamp: '2025-10-03T15:40:00.000Z',
    type: MESSAGE_TYPES.SUCCESS,
    status: MESSAGE_STATUS.PUBLISHED,
    title: '📱 响应式布局实现',
    content: '实现响应式布局，确保在不同设备上都有良好的显示效果',
    tags: ['响应式', '移动端', '适配', '布局'],
    icon: 'Monitor',
    author: '开发团队',
    category: '界面优化'
  },
  {
    id: 'msg-010',
    timestamp: '2025-10-03T15:35:00.000Z',
    type: MESSAGE_TYPES.SUCCESS,
    status: MESSAGE_STATUS.PUBLISHED,
    title: '🔐 用户认证系统',
    content: '实现用户登录、注册、权限管理等功能，确保系统安全性',
    tags: ['用户认证', '登录', '权限', '安全'],
    icon: 'User',
    author: '开发团队',
    category: '功能开发'
  },
  {
    id: 'msg-009',
    timestamp: '2025-10-03T15:30:00.000Z',
    type: MESSAGE_TYPES.SUCCESS,
    status: MESSAGE_STATUS.PUBLISHED,
    title: '📁 文件上传功能',
    content: '实现文件上传功能，支持多种文件格式和大小限制',
    tags: ['文件上传', '文件管理', '格式支持'],
    icon: 'Upload',
    author: '开发团队',
    category: '功能开发'
  },
  {
    id: 'msg-008',
    timestamp: '2025-10-03T15:25:00.000Z',
    type: MESSAGE_TYPES.SUCCESS,
    status: MESSAGE_STATUS.PUBLISHED,
    title: '🎯 路由系统配置',
    content: '配置Vue Router路由系统，实现页面导航和权限控制',
    tags: ['路由', '导航', '权限控制', 'Vue Router'],
    icon: 'Location',
    author: '开发团队',
    category: '功能开发'
  },
  {
    id: 'msg-007',
    timestamp: '2025-10-03T15:20:00.000Z',
    type: MESSAGE_TYPES.SUCCESS,
    status: MESSAGE_STATUS.PUBLISHED,
    title: '🏪 状态管理集成',
    content: '集成Pinia状态管理，实现全局状态共享和管理',
    tags: ['状态管理', 'Pinia', '全局状态', '数据共享'],
    icon: 'Box',
    author: '开发团队',
    category: '功能开发'
  },
  {
    id: 'msg-006',
    timestamp: '2025-10-03T15:15:00.000Z',
    type: MESSAGE_TYPES.SUCCESS,
    status: MESSAGE_STATUS.PUBLISHED,
    title: '🎨 Element Plus集成',
    content: '集成Element Plus UI组件库，提供丰富的UI组件和交互效果',
    tags: ['Element Plus', 'UI组件', '组件库', '交互效果'],
    icon: 'Plus',
    author: '开发团队',
    category: '组件开发'
  },
  {
    id: 'msg-005',
    timestamp: '2025-10-03T15:10:00.000Z',
    type: MESSAGE_TYPES.SUCCESS,
    status: MESSAGE_STATUS.PUBLISHED,
    title: '⚡ Vite构建工具配置',
    content: '配置Vite构建工具，实现快速开发和构建',
    tags: ['Vite', '构建工具', '开发环境', '性能优化'],
    icon: 'Lightning',
    author: '开发团队',
    category: '开发环境'
  },
  {
    id: 'msg-004',
    timestamp: '2025-10-03T15:05:00.000Z',
    type: MESSAGE_TYPES.SUCCESS,
    status: MESSAGE_STATUS.PUBLISHED,
    title: '📦 项目依赖安装',
    content: '安装Vue 3、Element Plus、Pinia等核心依赖包',
    tags: ['依赖安装', 'Vue 3', 'Element Plus', 'Pinia'],
    icon: 'Box',
    author: '开发团队',
    category: '开发环境'
  },
  {
    id: 'msg-003',
    timestamp: '2025-10-03T15:00:00.000Z',
    type: MESSAGE_TYPES.SUCCESS,
    status: MESSAGE_STATUS.PUBLISHED,
    title: '🏗️ 项目结构搭建',
    content: '搭建Vue 3项目基础结构，配置开发环境',
    tags: ['项目结构', 'Vue 3', '开发环境', '基础配置'],
    icon: 'Setting',
    author: '开发团队',
    category: '项目初始化'
  },
  {
    id: 'msg-002',
    timestamp: '2025-10-03T14:55:00.000Z',
    type: MESSAGE_TYPES.SUCCESS,
    status: MESSAGE_STATUS.PUBLISHED,
    title: '📋 需求分析完成',
    content: '完成项目需求分析，确定技术栈和功能模块',
    tags: ['需求分析', '技术栈', '功能模块', '项目规划'],
    icon: 'Document',
    author: '开发团队',
    category: '项目规划'
  },
  {
    id: 'msg-001',
    timestamp: '2025-10-03T14:50:00.000Z',
    type: MESSAGE_TYPES.PRIMARY,
    status: MESSAGE_STATUS.PUBLISHED,
    title: '🚀 项目启动',
    content: '浩南知识库前端项目正式启动，开始构建现代化的知识管理系统',
    tags: ['项目启动', '知识库', '前端项目', '现代化'],
    icon: 'Rocket',
    author: '开发团队',
    category: '项目启动'
  },
  {
    id: 'msg-026',
    timestamp: '2025-10-03T20:00:00.000Z',
    type: MESSAGE_TYPES.PRIMARY,
    status: MESSAGE_STATUS.PUBLISHED,
    title: '📚 个人技术文档分类系统',
    content: '创建了完整的个人技术文档分类展示系统。每个分类都有独立的页面，以卡片形式展示文档链接和描述。支持前端技术、后端技术、数据库技术、运维部署、开发工具、随记文档等6个分类。',
    tags: ['个人文档', '分类系统', '卡片展示', '静态页面', '文档管理'],
    icon: 'Document',
    author: '系统',
    category: '功能开发'
  },
  {
    id: 'msg-027',
    timestamp: '2025-10-03T20:15:00.000Z',
    type: MESSAGE_TYPES.SUCCESS,
    status: MESSAGE_STATUS.PUBLISHED,
    title: '🎨 简化文档卡片格式',
    content: '根据用户反馈，简化了文档卡片的数据格式和展示内容。现在只需要文档标题、描述和链接三个核心字段，移除了标签、难度等级、阅读时间、创建时间等复杂信息，使界面更加简洁清爽。',
    tags: ['文档卡片', '界面简化', '用户体验', '数据格式'],
    icon: 'EditPen',
    author: '系统',
    category: 'UI优化'
  },
  {
    id: 'msg-028',
    timestamp: '2025-10-03T20:30:00.000Z',
    type: MESSAGE_TYPES.INFO,
    status: MESSAGE_STATUS.PUBLISHED,
    title: '📄 添加GoEasy WebSocket文档',
    content: '在前端技术分类中添加了GoEasy WebSocket实时通讯技术文档，包含长连接技术原理和GoEasy工具的使用说明。',
    tags: ['文档添加', 'WebSocket', 'GoEasy', '实时通讯', '前端技术'],
    icon: 'Document',
    author: '系统',
    category: '内容更新'
  },
  {
    id: 'msg-029',
    timestamp: '2025-10-03T20:45:00.000Z',
    type: MESSAGE_TYPES.PRIMARY,
    status: MESSAGE_STATUS.PUBLISHED,
    title: '🔗 支持双链接文档格式',
    content: '升级文档卡片格式，现在支持显示两个链接：个人总结链接和官方文档链接。卡片底部会显示两个按钮，用户可以根据需要选择查看个人总结或官方文档。如果没有官方链接，则只显示个人总结链接。',
    tags: ['文档格式', '双链接', '按钮设计', '用户体验'],
    icon: 'Link',
    author: '系统',
    category: '功能开发'
  },
  {
    id: 'msg-030',
    timestamp: '2025-10-03T21:00:00.000Z',
    type: MESSAGE_TYPES.SUCCESS,
    status: MESSAGE_STATUS.PUBLISHED,
    title: '💡 添加描述悬浮提示功能',
    content: '为文档卡片描述添加了悬浮提示功能。当描述文本被截断时，用户可以通过鼠标悬浮查看完整描述内容。使用Element Plus的Tooltip组件实现，提供更好的用户体验。',
    tags: ['悬浮提示', 'Tooltip', '描述显示', '用户体验'],
    icon: 'InfoFilled',
    author: '系统',
    category: '用户体验'
  },
  {
    id: 'msg-031',
    timestamp: '2025-10-03T21:15:00.000Z',
    type: MESSAGE_TYPES.INFO,
    status: MESSAGE_STATUS.PUBLISHED,
    title: '📤 添加文件上传HTTP请求文档',
    content: '在前端技术分类中添加了文件上传与HTTP请求全解析文档。该文档以"寄快递"类比的方式，详细讲解了HTTP请求的4个部分、FormData的使用方法、完整的实战代码以及常见的新手坑，帮助前端初学者掌握文件上传相关知识。',
    tags: ['文档添加', '文件上传', 'HTTP请求', 'FormData', '前端技术'],
    icon: 'Upload',
    author: '系统',
    category: '内容更新'
  },
  {
    id: 'msg-032',
    timestamp: '2025-10-03T21:30:00.000Z',
    type: MESSAGE_TYPES.WARNING,
    status: MESSAGE_STATUS.PUBLISHED,
    title: '🔧 修复开发记录显示问题',
    content: '修复了开发记录页面无法显示新添加消息的问题。原因是messageStore对象没有正确导出，导致MessageCenter页面无法获取消息数据。现已添加完整的messageStore导出和相应的方法。',
    tags: ['开发记录', '消息显示', '导出问题', 'Bug修复'],
    icon: 'Tools',
    author: '系统',
    category: 'Bug修复'
  },
  {
    id: 'msg-033',
    timestamp: '2025-10-03T21:45:00.000Z',
    type: MESSAGE_TYPES.SUCCESS,
    status: MESSAGE_STATUS.PUBLISHED,
    title: '🎯 简化消息仓库逻辑',
    content: '简化了消息仓库的复杂逻辑，移除了不必要的增删改查功能，只保留展示功能，使代码更加简洁易维护。',
    tags: ['代码简化', '消息仓库', '逻辑优化', '维护性'],
    icon: 'Setting',
    author: '系统',
    category: '代码优化'
  },
  {
    id: 'msg-034',
    timestamp: '2025-10-03T22:00:00.000Z',
    type: MESSAGE_TYPES.SUCCESS,
    status: MESSAGE_STATUS.PUBLISHED,
    title: '🎨 重构仪表盘页面',
    content: '完全重构了仪表盘页面，添加了炫酷的动效和现代化的UI设计。包括背景动效、卡片悬停效果、数字动画、粒子效果、渐变背景等，提供更好的用户体验。',
    tags: ['仪表盘', 'UI重构', '动效设计', '用户体验', '现代化'],
    icon: 'DataAnalysis',
    author: '系统',
    category: 'UI优化'
  },
  {
    id: 'msg-035',
    timestamp: '2025-10-03T22:15:00.000Z',
    type: MESSAGE_TYPES.INFO,
    status: MESSAGE_STATUS.PUBLISHED,
    title: '🧹 清理未使用页面',
    content: '清理了项目中未使用的页面文件，删除了DrawerDemo、PopconfirmDemo、TreeDemo等3个未在路由中定义的Element Plus组件演示页面，优化了项目结构。',
    tags: ['代码清理', '未使用文件', '项目优化', '维护性'],
    icon: 'Delete',
    author: '系统',
    category: '代码优化'
  },
  {
    id: 'msg-036',
    timestamp: '2025-10-03T22:30:00.000Z',
    type: MESSAGE_TYPES.SUCCESS,
    status: MESSAGE_STATUS.PUBLISHED,
    title: '🔄 恢复并添加路由配置',
    content: '恢复了之前删除的DrawerDemo、PopconfirmDemo、TreeDemo等3个Element Plus组件演示页面，并为它们添加了完整的路由配置和菜单项，现在可以通过导航正常访问这些组件演示页面。',
    tags: ['路由配置', '组件恢复', '菜单更新', '功能完善'],
    icon: 'Refresh',
    author: '系统',
    category: '功能开发'
  }
]

// 简化的消息仓库
export const messageStore = {
  // 获取所有已发布的消息（按时间倒序）
  getPublishedMessages() {
    return messages
      .filter(msg => msg.status === MESSAGE_STATUS.PUBLISHED)
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
  },

  // 添加新消息
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
      author: '系统',
      category: '系统通知',
      ...messageData
    }
    
    messages.unshift(newMessage)
    return newMessage
  }
}

// 导出默认数据
export default {
  messages,
  messageStore,
  MESSAGE_TYPES,
  MESSAGE_STATUS
}