<template>
  <div class="demo-container">
    <div class="demo-header">
      <h2>标签页 Tabs</h2>
      <p>分隔内容上有关联但属于不同类别的数据集合</p>
    </div>

    <div class="demo-content">
      <el-card class="demo-card">
        <template #header>
          <div class="card-header">
            <span>基础用法</span>
            <el-button type="primary" @click="showSettings = true">属性设置</el-button>
          </div>
        </template>
        
        <div class="demo-section">
          <h4>标签页演示</h4>
          <el-tabs
            v-model="activeName"
            :type="cfg.type"
            :closable="cfg.closable"
            :addable="cfg.addable"
            :editable="cfg.editable"
            :tab-position="cfg.tabPosition"
            :stretch="cfg.stretch"
            :before-leave="cfg.beforeLeave ? beforeLeaveHandler : undefined"
            @tab-click="handleTabClick"
            @tab-remove="handleTabRemove"
            @tab-add="handleTabAdd"
            @tab-change="handleTabChange"
        >
          <el-tab-pane
            v-for="tab in tabs"
            :key="tab.name"
            :label="tab.label"
            :name="tab.name"
            :disabled="tab.disabled"
            :closable="tab.closable"
            :lazy="tab.lazy"
        >
          {{ tab.content }}
        </el-tab-pane>
        </el-tabs>
        </div>

        <div class="demo-section">
          <h4>卡片式标签页演示</h4>
          <el-tabs type="card" v-model="cardActiveName">
            <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
            <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
            <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
            <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
          </el-tabs>
        </div>

        <div class="demo-section">
          <h4>可编辑标签页演示</h4>
          <el-tabs
            v-model="editableActiveName"
            type="card"
            editable
            @edit="handleEdit"
        >
          <el-tab-pane
            v-for="item in editableTabs"
            :key="item.name"
            :label="item.title"
            :name="item.name"
        >
          {{ item.content }}
        </el-tab-pane>
        </el-tabs>
        </div>

        <div class="demo-section">
          <h4>状态显示</h4>
          <p><strong>当前标签：</strong>{{ activeName }}</p>
          <p><strong>类型：</strong>{{ cfg.type }}</p>
          <p><strong>可关闭：</strong>{{ cfg.closable ? '是' : '否' }}</p>
          <p><strong>可添加：</strong>{{ cfg.addable ? '是' : '否' }}</p>
          <p><strong>可编辑：</strong>{{ cfg.editable ? '是' : '否' }}</p>
          <p><strong>标签位置：</strong>{{ cfg.tabPosition }}</p>
          <p><strong>拉伸：</strong>{{ cfg.stretch ? '是' : '否' }}</p>
        </div>
      </el-card>
    </div>

    <!-- 属性设置抽屉 -->
    <el-drawer
      v-model="showSettings"
      title="标签页属性设置"
      direction="rtl"
      size="45%"
    >
      <div class="settings-container">
        <!-- 基础属性 -->
        <div class="form-section">
          <div class="section-title">基础属性</div>
          
          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">type</span>
              <span class="help-text">风格类型</span>
            </div>
            <el-radio-group v-model="cfg.type">
              <el-radio-button label="">默认</el-radio-button>
              <el-radio-button label="card">card</el-radio-button>
              <el-radio-button label="border-card">border-card</el-radio-button>
            </el-radio-group>
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">tabPosition</span>
              <span class="help-text">选项卡所在位置</span>
            </div>
            <el-radio-group v-model="cfg.tabPosition">
              <el-radio-button label="top">top</el-radio-button>
              <el-radio-button label="right">right</el-radio-button>
              <el-radio-button label="bottom">bottom</el-radio-button>
              <el-radio-button label="left">left</el-radio-button>
            </el-radio-group>
          </div>
        </div>

        <!-- 状态属性 -->
        <div class="form-section">
          <div class="section-title">状态属性</div>
          
          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">closable</span>
              <span class="help-text">标签是否可关闭</span>
            </div>
            <el-switch v-model="cfg.closable" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">addable</span>
              <span class="help-text">标签是否可增加</span>
            </div>
            <el-switch v-model="cfg.addable" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">editable</span>
              <span class="help-text">标签是否同时可增加和关闭</span>
            </div>
            <el-switch v-model="cfg.editable" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">stretch</span>
              <span class="help-text">标签的宽度是否自撑开</span>
            </div>
            <el-switch v-model="cfg.stretch" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">beforeLeave</span>
              <span class="help-text">切换标签之前的钩子</span>
            </div>
            <el-switch v-model="cfg.beforeLeave" />
          </div>
        </div>

        <!-- 标签管理 -->
        <div class="form-section">
          <div class="section-title">标签管理</div>
          
          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">标签</span>
              <span class="help-text">标签页列表</span>
            </div>
            <div class="tabs-container">
              <div v-for="(tab, index) in tabs" :key="index" class="tab-item">
                <el-input v-model="tab.label" placeholder="标签名称" style="width: 120px;" />
                <el-input v-model="tab.name" placeholder="标签值" style="width: 120px;" />
                <el-input v-model="tab.content" placeholder="标签内容" style="width: 200px;" />
                <el-switch v-model="tab.disabled" />
                <el-switch v-model="tab.closable" />
                <el-switch v-model="tab.lazy" />
                <el-button type="danger" size="small" @click="removeTab(index)">删除</el-button>
              </div>
              <el-button type="primary" @click="addTab">添加标签</el-button>
            </div>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'

// 响应式数据
const showSettings = ref(false)
const activeName = ref('first')
const cardActiveName = ref('first')
const editableActiveName = ref('1')
let tabIndex = 2

// 配置对象
const cfg = reactive({
  type: '',
  closable: false,
  addable: false,
  editable: false,
  tabPosition: 'top',
  stretch: false,
  beforeLeave: false
})

// 标签数据
const tabs = ref([
  { label: '用户管理', name: 'first', content: '用户管理内容', disabled: false, closable: true, lazy: false },
  { label: '配置管理', name: 'second', content: '配置管理内容', disabled: false, closable: true, lazy: false },
  { label: '角色管理', name: 'third', content: '角色管理内容', disabled: true, closable: true, lazy: false },
  { label: '定时任务补偿', name: 'fourth', content: '定时任务补偿内容', disabled: false, closable: true, lazy: false }
])

const editableTabs = ref([
  { title: 'Tab 1', name: '1', content: 'Tab 1 content' },
  { title: 'Tab 2', name: '2', content: 'Tab 2 content' }
])

// 事件处理
const handleTabClick = (tab, event) => {
  console.log('标签点击:', tab, event)
  ElMessage.success(`点击标签: ${tab.props.label}`)
}

const handleTabRemove = (targetName) => {
  console.log('标签移除:', targetName)
  ElMessage.success(`移除标签: ${targetName}`)
}

const handleTabAdd = () => {
  console.log('标签添加')
  ElMessage.success('添加标签')
}

const handleTabChange = (name) => {
  console.log('标签改变:', name)
  ElMessage.success(`切换到标签: ${name}`)
}

const handleEdit = (targetName, action) => {
  console.log('标签编辑:', targetName, action)
  if (action === 'add') {
    const newTabName = `${++tabIndex}`
    editableTabs.value.push({
      title: 'New Tab',
      name: newTabName,
      content: 'New Tab content'
    })
    editableActiveName.value = newTabName
  } else if (action === 'remove') {
    const tabs = editableTabs.value
    let activeName = editableActiveName.value
    if (activeName === targetName) {
      tabs.forEach((tab, index) => {
        if (tab.name === targetName) {
          const nextTab = tabs[index + 1] || tabs[index - 1]
          if (nextTab) {
            activeName = nextTab.name
          }
        }
      })
    }
    editableActiveName.value = activeName
    editableTabs.value = tabs.filter(tab => tab.name !== targetName)
  }
  ElMessage.success(`${action === 'add' ? '添加' : '移除'}标签`)
}

// 切换前钩子
const beforeLeaveHandler = (activeName, oldActiveName) => {
  console.log('切换前钩子:', activeName, oldActiveName)
  return new Promise((resolve) => {
    ElMessage.info('正在切换...')
    setTimeout(() => {
      resolve(true)
    }, 1000)
  })
}

// 标签管理
const addTab = () => {
  const newIndex = tabs.value.length + 1
  tabs.value.push({
    label: `标签${newIndex}`,
    name: `tab${newIndex}`,
    content: `标签${newIndex}内容`,
    disabled: false,
    closable: true,
    lazy: false
  })
}

const removeTab = (index) => {
  tabs.value.splice(index, 1)
}
</script>

<style scoped>
.demo-container {
  padding: 20px;
}

.demo-header {
  margin-bottom: 20px;
}

.demo-header h2 {
  margin: 0 0 10px 0;
  color: #303133;
}

.demo-header p {
  margin: 0;
  color: #606266;
  font-size: 14px;
}

.demo-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.demo-card {
  width: 100%;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.demo-section {
  margin-bottom: 20px;
}

.demo-section h4 {
  margin: 0 0 15px 0;
  color: #303133;
  font-size: 16px;
}

.demo-section p {
  margin: 5px 0;
  color: #606266;
  font-size: 14px;
}

.settings-container {
  padding: 20px;
}

.form-section {
  margin-bottom: 30px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #409eff;
}

.form-item {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
}

.label-text {
  min-width: 200px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.prop-name {
  font-weight: 600;
  color: #303133;
  font-family: 'Courier New', monospace;
  background: #e8f4fd;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 13px;
}

.help-text {
  color: #909399;
  font-size: 12px;
}

.tabs-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.tab-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background: #fff;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
}
</style>
