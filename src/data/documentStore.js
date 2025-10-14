/**
 * 个人技术文档数据仓库
 * 静态文档数据，用于展示不同分类的文档
 */

// 文档分类配置
export const documentCategories = {
  frontend: {
    id: 'frontend',
    title: '前端技术',
    description: '前端开发相关技术总结和文档',
    icon: 'Monitor',
    color: '#409EFF'
  },
  backend: {
    id: 'backend',
    title: '后端技术',
    description: '后端开发相关技术文档',
    icon: 'Server',
    color: '#E6A23C'
  },
  database: {
    id: 'database',
    title: '数据库技术',
    description: '数据库相关技术文档',
    icon: 'Coin',
    color: '#67C23A'
  },
  devops: {
    id: 'devops',
    title: '运维部署',
    description: '运维和部署相关技术文档',
    icon: 'Setting',
    color: '#F56C6C'
  },
  tools: {
    id: 'tools',
    title: '开发工具',
    description: '开发工具使用技巧和配置',
    icon: 'Tools',
    color: '#909399'
  },
  notes: {
    id: 'notes',
    title: '随记文档',
    description: '日常学习笔记、心得体会、技术随记',
    icon: 'EditPen',
    color: '#9C27B0'
  }
}

// 文档数据 - 按分类存储
export const documentsByCategory = {
  // 前端技术文档
  frontend: [
    {
      id: 'frontend-1',
      title: 'GoEasy WebSocket 实时通讯技术',
      description: 'GoEasy是一种"长连接"技术（像打电话，接通后一直保持通话），能让前端和后端/前端和前端实时传消息（比如聊天、直播弹幕、实时数据更新）。GoEasy帮我们"封装好复杂Websocket底层逻辑"的工具（不用自己写服务器、处理断连重连），我们直接调用它的接口就能实现实时通讯。',
      summaryUrl: 'https://www.yuque.com/chenhaonan-b76av/wcyi7i/fbtg26ic67e9ob0i',
      summaryLabel: '我的总结',
      officialUrl: 'https://www.goeasy.io/',
      officialLabel: 'GoEasy官网'
    },
    {
      id: 'frontend-2',
      title: '文件上传与 HTTP 请求全解析',
      description: '该文以"寄快递"类比，帮前端初学者理清文件上传相关的HTTP请求知识与实操。先借表格将HTTP请求4部分对应快递场景：请求行是收件地址与寄件方式，请求头（如权限、Cookie）像快递单备注，请求体（文件、表单等）是包裹内物品，params/query是定位小信息。接着讲文件上传关键的FormData（类比带标签文件袋），分3步教用法，再给完整实战代码：HTML用input选文件、button触发，JS获取文件、组装FormData并通过Axios POST请求发送。还列出4个新手坑（如字段名不符、手动设Content-Type），最后总结数据存放规则与文件上传要点，助初学者掌握相关知识。',
      summaryUrl: 'https://www.yuque.com/chenhaonan-b76av/wcyi7i/molghp8xz1vuo0o3#tXciL',
      summaryLabel: '我的总结',
      officialUrl: 'https://developer.mozilla.org/zh-CN/docs/Web/API/FormData',
      officialLabel: 'FormData官方文档'
    }
    // 您可以在这里添加更多前端技术文档
  ],

  // 后端技术文档
  backend: [
    // 您可以在这里添加后端技术文档
  ],

  // 数据库技术文档
  database: [
    // 您可以在这里添加数据库技术文档
  ],

  // 运维部署文档
  devops: [
    // 您可以在这里添加运维部署文档
  ],

  // 开发工具文档
  tools: [
    // 您可以在这里添加开发工具文档
  ],

  // 随记文档
  notes: [
    // 您可以在这里添加随记文档
  ]
}

// 工具函数
export const documentUtils = {
  // 根据分类获取文档
  getDocumentsByCategory: (categoryId) => {
    return documentsByCategory[categoryId] || []
  },

  // 获取所有分类
  getAllCategories: () => {
    return Object.values(documentCategories)
  },

  // 获取分类信息
  getCategoryInfo: (categoryId) => {
    return documentCategories[categoryId] || null
  },

}

export default {
  documentCategories,
  documentsByCategory,
  documentUtils
}
