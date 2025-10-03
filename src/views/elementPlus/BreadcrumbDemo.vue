<template>
  <div class="demo-container">
    <div class="demo-header">
      <h2>面包屑 Breadcrumb</h2>
      <p>显示当前页面的路径，快速返回之前的任意页面</p>
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
          <h4>面包屑演示</h4>
          <el-breadcrumb
            :separator="cfg.separator"
            :separator-icon="cfg.separatorIcon ? SeparatorIcon : undefined"
          >
            <el-breadcrumb-item
              v-for="item in breadcrumbItems"
              :key="item.path"
              :to="item.to"
              :replace="item.replace"
              @click="handleItemClick(item)"
            >
              <el-icon v-if="item.icon" class="breadcrumb-icon">
                <component :is="item.icon" />
              </el-icon>
              {{ item.label }}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>

        <div class="demo-section">
          <h4>不同分隔符演示</h4>
          <div class="breadcrumb-group">
            <div class="breadcrumb-item">
              <h4>默认分隔符</h4>
              <el-breadcrumb>
                <el-breadcrumb-item>首页</el-breadcrumb-item>
                <el-breadcrumb-item>组件</el-breadcrumb-item>
                <el-breadcrumb-item>面包屑</el-breadcrumb-item>
              </el-breadcrumb>
            </div>
            <div class="breadcrumb-item">
              <h4>自定义分隔符</h4>
              <el-breadcrumb separator="/">
                <el-breadcrumb-item>首页</el-breadcrumb-item>
                <el-breadcrumb-item>组件</el-breadcrumb-item>
                <el-breadcrumb-item>面包屑</el-breadcrumb-item>
              </el-breadcrumb>
            </div>
            <div class="breadcrumb-item">
              <h4>图标分隔符</h4>
              <el-breadcrumb separator-icon="ArrowRight">
                <el-breadcrumb-item>首页</el-breadcrumb-item>
                <el-breadcrumb-item>组件</el-breadcrumb-item>
                <el-breadcrumb-item>面包屑</el-breadcrumb-item>
              </el-breadcrumb>
            </div>
          </div>
        </div>

        <div class="demo-section">
          <h4>带图标的面包屑演示</h4>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>
              <el-icon class="breadcrumb-icon">
                <HomeFilled />
              </el-icon>
              首页
            </el-breadcrumb-item>
            <el-breadcrumb-item>
              <el-icon class="breadcrumb-icon">
                <FolderOpened />
              </el-icon>
              组件
            </el-breadcrumb-item>
            <el-breadcrumb-item>
              <el-icon class="breadcrumb-icon">
                <Document />
              </el-icon>
              面包屑
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>

        <div class="demo-section">
          <h4>状态显示</h4>
          <p><strong>分隔符：</strong>{{ cfg.separator }}</p>
          <p><strong>分隔符图标：</strong>{{ cfg.separatorIcon || '无' }}</p>
          <p><strong>面包屑项数：</strong>{{ breadcrumbItems.length }}</p>
        </div>
      </el-card>
    </div>

    <!-- 属性设置抽屉 -->
    <el-drawer
      v-model="showSettings"
      title="面包屑属性设置"
      direction="rtl"
      size="45%"
    >
      <div class="settings-container">
        <!-- 基础属性 -->
        <div class="form-section">
          <div class="section-title">基础属性</div>
          
          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">separator</span>
              <span class="help-text">分隔符</span>
            </div>
            <el-input v-model="cfg.separator" placeholder="如: /" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">separatorIcon</span>
              <span class="help-text">分隔符图标</span>
            </div>
            <el-input v-model="cfg.separatorIcon" placeholder="如: ArrowRight" />
          </div>
        </div>

        <!-- 面包屑项管理 -->
        <div class="form-section">
          <div class="section-title">面包屑项管理</div>
          
          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">面包屑项</span>
              <span class="help-text">面包屑项列表</span>
            </div>
            <div class="breadcrumb-container">
              <div v-for="(item, index) in breadcrumbItems" :key="index" class="breadcrumb-item-edit">
                <el-input v-model="item.label" placeholder="标签" style="width: 120px;" />
                <el-input v-model="item.path" placeholder="路径" style="width: 120px;" />
                <el-input v-model="item.icon" placeholder="图标" style="width: 100px;" />
                <el-switch v-model="item.replace" />
                <el-button type="danger" size="small" @click="removeBreadcrumbItem(index)">删除</el-button>
              </div>
              <el-button type="primary" @click="addBreadcrumbItem">添加项</el-button>
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
import { HomeFilled, FolderOpened, Document, ArrowRight } from '@element-plus/icons-vue'

// 响应式数据
const showSettings = ref(false)

// 配置对象
const cfg = reactive({
  separator: '/',
  separatorIcon: ''
})

// 面包屑数据
const breadcrumbItems = ref([
  { label: '首页', path: '/', icon: 'HomeFilled', replace: false },
  { label: '组件', path: '/components', icon: 'Collection', replace: false },
  { label: '面包屑', path: '/breadcrumb', icon: 'Document', replace: false }
])

// 分隔符图标
const SeparatorIcon = ArrowRight

// 事件处理
const handleItemClick = (item) => {
  console.log('面包屑项点击:', item)
  ElMessage.success(`点击: ${item.label}`)
}

// 面包屑项管理
const addBreadcrumbItem = () => {
  const newIndex = breadcrumbItems.value.length + 1
  breadcrumbItems.value.push({
    label: `项${newIndex}`,
    path: `/item${newIndex}`,
    icon: '',
    replace: false
  })
}

const removeBreadcrumbItem = (index) => {
  if (breadcrumbItems.value.length > 1) {
    breadcrumbItems.value.splice(index, 1)
  }
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

.breadcrumb-icon {
  margin-right: 5px;
}

.breadcrumb-group {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.breadcrumb-item {
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  padding: 20px;
}

.breadcrumb-item h4 {
  margin: 0 0 15px 0;
  color: #303133;
  font-size: 14px;
}

.breadcrumb-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.breadcrumb-item-edit {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background: #fff;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
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
</style>
