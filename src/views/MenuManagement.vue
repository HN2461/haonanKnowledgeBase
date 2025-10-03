<template>
    <div class="menu-management">
      <div class="page-header">
        <h2>菜单管理</h2>
        <p class="page-description">新增菜单项并导出路由配置</p>
      </div>
  
      <el-card class="management-card">
        <template #header>
          <div class="card-header">
            <span>新增菜单</span>
            <el-button type="primary" @click="openAddMenuDialog">
              <el-icon><Plus /></el-icon>
              新增菜单
            </el-button>
          </div>
        </template>
  
        <!-- 已新增的菜单列表 -->
        <div v-if="addedMenuItems.length > 0" class="added-menus">
          <h3>已新增的菜单项</h3>
          <el-table :data="addedMenuItems" border>
            <el-table-column prop="index" label="菜单索引" width="120" />
            <el-table-column prop="title" label="菜单标题" width="150" />
            <el-table-column prop="path" label="菜单路径" width="200" />
            <el-table-column prop="icon" label="图标" width="100">
              <template #default="{ row }">
                <el-icon v-if="row.icon && checkIconExists(row.icon)">
                  <component :is="row.icon" />
                </el-icon>
                <span v-else class="no-icon">无</span>
              </template>
            </el-table-column>
            <el-table-column prop="parentIndex" label="父级菜单" width="120">
              <template #default="{ row }">
                {{ getParentTitle(row.parentIndex) }}
              </template>
            </el-table-column>
            <el-table-column label="操作" width="120">
              <template #default="{ $index }">
                <el-button type="danger" size="small" @click="removeMenuItem($index)">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
  
          <div class="export-section">
            <el-button type="success" @click="handleExportRoutes">
              <el-icon><Download /></el-icon>
              导出路由配置
            </el-button>
          </div>
        </div>
  
        <div v-else class="empty-state">
          <el-empty description="暂无新增的菜单项">
            <el-button type="primary" @click="openAddMenuDialog">立即新增</el-button>
          </el-empty>
        </div>
      </el-card>
  
      <!-- 新增菜单对话框 -->
      <el-dialog
        v-model="addMenuDialogVisible"
        title="新增菜单"
        width="500px"
      >
        <el-form :model="newMenuItem" label-width="120px">
          <el-form-item label="菜单索引 (index)" prop="index">
            <el-input v-model="newMenuItem.index" placeholder="请输入菜单索引" />
          </el-form-item>
          <el-form-item label="菜单标题 (title)" prop="title">
            <el-input v-model="newMenuItem.title" placeholder="请输入菜单标题" />
          </el-form-item>
          <el-form-item label="菜单路径 (path)" prop="path">
            <el-input v-model="newMenuItem.path" placeholder="请输入菜单路径" />
          </el-form-item>
          <el-form-item label="菜单图标 (icon)" prop="icon">
            <div class="icon-selector">
              <el-input v-model="newMenuItem.icon" placeholder="请选择菜单图标" />
              <el-button type="primary" @click="openIconSelector">
                <el-icon><Plus /></el-icon>
              </el-button>
            </div>
          </el-form-item>
          <el-form-item label="父级菜单" prop="parentIndex">
            <el-select v-model="newMenuItem.parentIndex" placeholder="请选择父级菜单（可选）">
              <el-option label="无（根菜单）" value="" />
              <el-option v-for="option in allParentMenuOptions" :key="option.index" :label="option.title" :value="option.index" />
            </el-select>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="addMenuDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="handleAddMenu">确定</el-button>
          </span>
        </template>
      </el-dialog>
  
      <!-- 图标选择器对话框 -->
      <el-dialog
        v-model="iconDialogVisible"
        title="选择图标"
        width="600px"
      >
        <div class="icon-list">
          <div 
            v-for="iconName in elementPlusIcons" 
            :key="iconName"
            class="icon-item"
            @click="selectIcon(iconName)"
          >
            <el-icon :size="32">
              <component 
                :is="iconName" 
                @error="handleIconError"
              />
            </el-icon>
            <span>{{ iconName }}</span>
          </div>
        </div>
      </el-dialog>
  
      <!-- 导出路由对话框 -->
      <el-dialog
        v-model="exportDialogVisible"
        title="导出路由配置"
        width="800px"
      >
        <div v-if="parentGroups.length > 1">
          <div class="mb-4">
            <span class="text-gray-700">请选择要导出的菜单分组：</span>
          </div>
          <el-radio-group v-model="selectedParentGroup" @change="showGroupRoutes(selectedParentGroup)">
            <el-radio v-for="group in parentGroups" :key="group.key" :label="group.key">
              {{ group.title }} ({{ group.items.length }}个菜单项)
            </el-radio>
          </el-radio-group>
        </div>
        <el-input
          v-model="routesText"
          type="textarea"
          :rows="15"
          readonly
          placeholder="路由信息将在此显示"
          v-if="routesText"
        />
        <div v-else-if="parentGroups.length === 0">
          <p class="text-gray-500 text-center py-8">暂无新增的路由对象</p>
        </div>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="exportDialogVisible = false">关闭</el-button>
            <el-button type="primary" @click="copyRoutes" v-if="routesText">复制</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { ElMessage } from 'element-plus'
  import { useMenuStore } from '../store/menuStore'
  import { 
    Plus, Download, Document, Menu, Setting, User, Lock, Key, Refresh, Bell, Message, Search,
    Folder, FolderOpened, Edit, Delete, Minus, Upload, House,
    PieChart, Calendar, ShoppingCart, Star, View, Share, Check,
    Clock, Filter, HelpFilled, MoreFilled
  } from '@element-plus/icons-vue'
  
  // 使用菜单store
  const menuStore = useMenuStore()
  
  // 新增菜单相关
  const addMenuDialogVisible = ref(false)
  const newMenuItem = ref({
    index: '',
    title: '',
    path: '',
    icon: '',
    parentIndex: ''
  })
  
  // 图标选择器相关
  const iconDialogVisible = ref(false)
  const elementPlusIcons = ref([
    'Document', 'Menu', 'Setting', 'User', 'Lock', 'Key', 'Plus', 'Refresh', 'Download', 'Bell', 'Message', 'Search',
    'Folder', 'FolderOpened', 'Edit', 'Delete', 'Minus', 'Upload', 'House',
    'PieChart', 'Calendar', 'ShoppingCart', 'Star', 'View', 'Share', 'Check',
    'Clock', 'Filter', 'HelpFilled', 'MoreFilled', 'DataAnalysis', 'Management', 'Files', 'Collection',
    'Location', 'Phone', 'Picture', 'Printer', 'Tools', 'Warning', 'SuccessFilled', 'InfoFilled'
  ])
  
  // 存储缺失的图标
  const missingIcons = ref(new Set())
  
  // 存储新增的菜单项
  const addedMenuItems = ref([])
  const allParentMenuOptions = ref([])
  
  // 导出路由相关
  const exportDialogVisible = ref(false)
  const routesText = ref('')
  const parentGroups = ref([])
  const selectedParentGroup = ref('')
  
  // 获取父菜单标题
  const getParentTitle = (parentIndex) => {
    if (!parentIndex) return '根菜单'
    const parent = allParentMenuOptions.value.find(option => option.index === parentIndex)
    return parent ? parent.title : parentIndex
  }
  
  // 递归获取所有菜单选项（包括子菜单）
  const getAllMenuOptions = (menuItems, options = []) => {
    for (const item of menuItems) {
      options.push({
        index: item.index,
        title: item.title
      })
      // 递归处理子菜单
      if (item.children && item.children.length > 0) {
        getAllMenuOptions(item.children, options)
      }
    }
    return options
  }
  
  const openAddMenuDialog = () => {
    // 重置表单
    newMenuItem.value = {
      index: '',
      title: '',
      path: '',
      icon: '',
      parentIndex: ''
    }
    
    // 获取所有可用的父级菜单选项
    allParentMenuOptions.value = getAllMenuOptions(menuStore.menuItems)
    
    addMenuDialogVisible.value = true
  }
  
  const handleAddMenu = () => {
    // 验证表单
    if (!newMenuItem.value.index || !newMenuItem.value.title || !newMenuItem.value.path) {
      ElMessage.error('请填写完整的菜单信息')
      return
    }
    
    // 检查索引是否已存在
    const existingItem = addedMenuItems.value.find(item => item.index === newMenuItem.value.index)
    if (existingItem) {
      ElMessage.error('菜单索引已存在，请使用其他索引')
      return
    }
    
    // 添加菜单项到菜单存储
    menuStore.addMenuItem(newMenuItem.value.parentIndex, {
      index: newMenuItem.value.index,
      title: newMenuItem.value.title,
      path: newMenuItem.value.path,
      icon: newMenuItem.value.icon || 'Document',
      children: []
    })
    
    // 存储到新增菜单项列表
    addedMenuItems.value.push({
      ...newMenuItem.value,
      children: []
    })
    
    // 关闭对话框
    addMenuDialogVisible.value = false
    ElMessage.success('菜单添加成功')
  }
  
  const removeMenuItem = (index) => {
    const item = addedMenuItems.value[index]
    if (item) {
      // 从菜单存储中移除
      menuStore.removeMenuItem(item.index)
      // 从列表中移除
      addedMenuItems.value.splice(index, 1)
      ElMessage.success('菜单删除成功')
    }
  }
  
  const openIconSelector = () => {
    iconDialogVisible.value = true
  }
  
  const selectIcon = (iconName) => {
    // 检查图标是否存在于已导入的图标列表中
    const iconExists = checkIconExists(iconName)
    if (!iconExists) {
      ElMessage.warning(`图标 ${iconName} 可能不存在，请选择其他图标`)
    }
    newMenuItem.value.icon = iconName
    iconDialogVisible.value = false
    ElMessage.success(`已选择图标: ${iconName}`)
  }
  
  // 检查图标是否存在
  const checkIconExists = (iconName) => {
    return elementPlusIcons.value.includes(iconName)
  }
  
  // 处理图标加载失败
  const handleIconError = (event) => {
    // 静默处理图标加载失败，不显示错误信息
    event.stopPropagation()
    event.preventDefault()
  }
  
  // 按父菜单分组新增的菜单项
  const getParentGroups = () => {
    const groups = new Map()
    
    // 将所有新增菜单项按父菜单分组
    addedMenuItems.value.forEach(item => {
      const parentKey = item.parentIndex || '根菜单'
      if (!groups.has(parentKey)) {
        groups.set(parentKey, [])
      }
      groups.get(parentKey).push(item)
    })
    
    // 转换为数组格式
    parentGroups.value = Array.from(groups.entries()).map(([key, items]) => {
      // 查找父菜单的标题
      const parentTitle = key === '根菜单' ? '根菜单' : 
        (allParentMenuOptions.value.find(option => option.index === key)?.title || key)
      return {
        key,
        title: parentTitle,
        items
      }
    })
  }
  
  const handleExportRoutes = () => {
    if (addedMenuItems.value.length === 0) {
      ElMessage.warning('暂无新增的菜单项')
      return
    }
    
    getParentGroups()
    
    // 如果只有一个分组，直接显示该分组的内容
    if (parentGroups.value.length === 1) {
      selectedParentGroup.value = parentGroups.value[0].key
      showGroupRoutes(selectedParentGroup.value)
    } else {
      // 有多个分组，让用户选择
      exportDialogVisible.value = true
    }
  }
  
  // 显示选中分组的路由
  const showGroupRoutes = (parentKey) => {
    const group = parentGroups.value.find(g => g.key === parentKey)
    if (!group) return
    
    // 格式化输出为用户需要的格式
    const codeString = `// ${group.title}下的新增菜单配置
  // 请按以下格式填写相应内容
  
  [${group.items.map((item, index) => {
      const isLast = index === group.items.length - 1
      
      // 处理嵌套的children
      const formatChildren = (children) => {
        if (!children || children.length === 0) return ''
        
        return `,\n  children: [${children.map((child, childIndex) => {
          const childIsLast = childIndex === children.length - 1
          return `\n    {\n      index: '${child.index}',\n      title: '${child.title}',\n      path: '${child.path}',\n      icon: '${child.icon || 'Menu'}'${formatChildren(child.children)}\n    }${childIsLast ? '' : ','}`
        }).join('')}\n  ]`
      }
      
      return `\n  {\n    index: '${item.index}',\n    title: '${item.title}',\n    path: '${item.path}',\n    icon: '${item.icon || 'Menu'}'${formatChildren(item.children)}\n  }${isLast ? '' : ','}`
    }).join('')}\n]`
    
    // 将生成的代码显示在导出对话框的文本区域
    routesText.value = codeString
    
    // 自动复制到剪贴板
    navigator.clipboard.writeText(codeString).then(() => {
      ElMessage.success(`${group.title}下的新增菜单对象已复制到剪贴板`)
    }).catch(() => {
      ElMessage.warning('自动复制失败，请手动复制代码')
    })
  }
  
  // 复制路由信息
  const copyRoutes = () => {
    navigator.clipboard.writeText(routesText.value).then(() => {
      ElMessage.success('路由信息已复制到剪贴板')
    }).catch(() => {
      ElMessage.error('复制失败，请手动复制')
    })
  }
  
  // 组件挂载时初始化
  onMounted(() => {
    // 获取所有可用的父级菜单选项
    allParentMenuOptions.value = getAllMenuOptions(menuStore.menuItems)
  })
  </script>
  
  <style scoped>
  .menu-management {
    padding: 20px;
  }
  
  .page-header {
    margin-bottom: 20px;
  }
  
  .page-header h2 {
    margin: 0 0 8px 0;
    color: #303133;
    font-size: 24px;
    font-weight: 600;
  }
  
  .page-description {
    margin: 0;
    color: #909399;
    font-size: 14px;
  }
  
  .management-card {
    margin-bottom: 20px;
  }
  
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .card-header span {
    font-size: 16px;
    font-weight: 500;
    color: #303133;
  }
  
  .added-menus {
    margin-top: 20px;
  }
  
  .added-menus h3 {
    margin: 0 0 16px 0;
    color: #303133;
    font-size: 16px;
    font-weight: 500;
  }
  
  .export-section {
    margin-top: 20px;
    text-align: center;
  }
  
  .empty-state {
    text-align: center;
    padding: 40px 0;
  }
  
  .icon-selector {
    display: flex;
    gap: 8px;
    align-items: center;
  }
  
  .icon-selector .el-input {
    flex: 1;
  }
  
  .icon-selector .el-button {
    white-space: nowrap;
  }
  
  .icon-list {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 16px;
    padding: 16px;
  }
  
  .icon-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 12px;
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s;
  }
  
  .icon-item:hover {
    border-color: #409eff;
    background-color: #f5f7fa;
  }
  
  .icon-item span {
    margin-top: 8px;
    font-size: 12px;
    color: #606266;
  }
  
  .missing-icon-text {
    font-size: 12px;
    color: #909399;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background-color: #f5f5f5;
    border-radius: 4px;
  }
  
  .mb-4 {
    margin-bottom: 16px;
  }
  
  .text-gray-700 {
    color: #374151;
  }
  
  .text-gray-500 {
    color: #6b7280;
  }
  
  .text-center {
    text-align: center;
  }
  
  .py-8 {
    padding: 32px 0;
  }
  
  .no-icon {
    color: #909399;
    font-size: 12px;
    font-style: italic;
  }
  </style>