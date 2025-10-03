<template>
  <div class="demo-container">
    <div class="demo-header">
      <h2>结果 Result</h2>
      <p>用于反馈一系列操作任务的处理结果，支持成功、警告、错误等状态</p>
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
          <h4>结果演示</h4>
          <el-result
            :icon="cfg.icon"
            :title="cfg.title"
            :sub-title="cfg.subTitle"
          >
            <template #extra>
              <el-button type="primary" @click="handlePrimary">主要操作</el-button>
              <el-button @click="handleSecondary">次要操作</el-button>
            </template>
          </el-result>
        </div>

        <div class="demo-section">
          <h4>不同状态演示</h4>
          <div class="result-group">
            <div class="result-item">
              <el-result icon="success" title="成功提示" sub-title="请根据提示进行操作">
                <template #extra>
                  <el-button type="primary">确定</el-button>
                </template>
              </el-result>
            </div>
            <div class="result-item">
              <el-result icon="warning" title="警告提示" sub-title="请根据提示进行操作">
                <template #extra>
                  <el-button type="primary">确定</el-button>
                </template>
              </el-result>
            </div>
            <div class="result-item">
              <el-result icon="error" title="错误提示" sub-title="请根据提示进行操作">
                <template #extra>
                  <el-button type="primary">确定</el-button>
                </template>
              </el-result>
            </div>
            <div class="result-item">
              <el-result icon="info" title="信息提示" sub-title="请根据提示进行操作">
                <template #extra>
                  <el-button type="primary">确定</el-button>
                </template>
              </el-result>
            </div>
          </div>
        </div>

        <div class="demo-section">
          <h4>自定义图标演示</h4>
          <el-result title="自定义图标" sub-title="使用自定义图标">
            <template #icon>
              <el-icon size="100" color="#409eff">
                <Document />
              </el-icon>
            </template>
            <template #extra>
              <el-button type="primary">确定</el-button>
            </template>
          </el-result>
        </div>

        <div class="demo-section">
          <h4>状态显示</h4>
          <p><strong>图标：</strong>{{ cfg.icon }}</p>
          <p><strong>标题：</strong>{{ cfg.title }}</p>
          <p><strong>副标题：</strong>{{ cfg.subTitle }}</p>
        </div>
      </el-card>
    </div>

    <!-- 属性设置抽屉 -->
    <el-drawer
      v-model="showSettings"
      title="结果属性设置"
      direction="rtl"
      size="45%"
    >
      <div class="settings-container">
        <!-- 基础属性 -->
        <div class="form-section">
          <div class="section-title">基础属性</div>
          
          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">icon</span>
              <span class="help-text">图标类型</span>
            </div>
            <el-radio-group v-model="cfg.icon">
              <el-radio-button label="success">success</el-radio-button>
              <el-radio-button label="warning">warning</el-radio-button>
              <el-radio-button label="error">error</el-radio-button>
              <el-radio-button label="info">info</el-radio-button>
            </el-radio-group>
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">title</span>
              <span class="help-text">标题</span>
            </div>
            <el-input v-model="cfg.title" placeholder="请输入标题" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">subTitle</span>
              <span class="help-text">副标题</span>
            </div>
            <el-input v-model="cfg.subTitle" placeholder="请输入副标题" />
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { Document } from '@element-plus/icons-vue'

// 响应式数据
const showSettings = ref(false)

// 配置对象
const cfg = reactive({
  icon: 'success',
  title: '操作成功',
  subTitle: '请根据提示进行操作'
})

// 事件处理
const handlePrimary = () => {
  console.log('主要操作点击')
  ElMessage.success('主要操作点击')
}

const handleSecondary = () => {
  console.log('次要操作点击')
  ElMessage.info('次要操作点击')
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

.result-group {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.result-item {
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  padding: 20px;
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
