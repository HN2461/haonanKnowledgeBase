<template>
  <div class="demo-container">
    <div class="demo-header">
      <h2>步骤条 Steps</h2>
      <p>引导用户按照流程完成任务的分步导航条，支持多种样式和状态</p>
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
          <h4>步骤条演示</h4>
          <el-steps
            :active="cfg.active"
            :direction="cfg.direction"
            :align-center="cfg.alignCenter"
            :simple="cfg.simple"
            :finish-status="cfg.finishStatus"
            :process-status="cfg.processStatus"
            @change="handleChange"
          >
            <el-step
              v-for="(step, index) in steps"
              :key="index"
              :title="step.title"
              :description="step.description"
              :icon="step.icon"
              :status="step.status"
            />
          </el-steps>
        </div>

        <div class="demo-section">
          <h4>不同方向演示</h4>
          <div class="steps-group">
            <div class="steps-item">
              <h4>水平方向</h4>
              <el-steps :active="2" direction="horizontal">
                <el-step title="步骤1" description="这是步骤1" />
                <el-step title="步骤2" description="这是步骤2" />
                <el-step title="步骤3" description="这是步骤3" />
                <el-step title="步骤4" description="这是步骤4" />
              </el-steps>
            </div>
            <div class="steps-item">
              <h4>垂直方向</h4>
              <el-steps :active="2" direction="vertical">
                <el-step title="步骤1" description="这是步骤1" />
                <el-step title="步骤2" description="这是步骤2" />
                <el-step title="步骤3" description="这是步骤3" />
                <el-step title="步骤4" description="这是步骤4" />
              </el-steps>
            </div>
          </div>
        </div>

        <div class="demo-section">
          <h4>不同状态演示</h4>
          <el-steps :active="2">
            <el-step title="已完成" description="这是已完成的步骤" status="finish" />
            <el-step title="进行中" description="这是进行中的步骤" status="process" />
            <el-step title="等待中" description="这是等待中的步骤" status="wait" />
            <el-step title="错误" description="这是错误的步骤" status="error" />
          </el-steps>
        </div>

        <div class="demo-section">
          <h4>带图标的步骤条演示</h4>
          <el-steps :active="2">
            <el-step title="步骤1" description="这是步骤1" icon="Edit" />
            <el-step title="步骤2" description="这是步骤2" icon="Upload" />
            <el-step title="步骤3" description="这是步骤3" icon="Picture" />
            <el-step title="步骤4" description="这是步骤4" icon="Check" />
          </el-steps>
        </div>

        <div class="demo-section">
          <h4>状态显示</h4>
          <p><strong>当前步骤：</strong>{{ cfg.active }}</p>
          <p><strong>方向：</strong>{{ cfg.direction }}</p>
          <p><strong>居中对齐：</strong>{{ cfg.alignCenter ? '是' : '否' }}</p>
          <p><strong>简洁模式：</strong>{{ cfg.simple ? '是' : '否' }}</p>
          <p><strong>完成状态：</strong>{{ cfg.finishStatus }}</p>
          <p><strong>进行状态：</strong>{{ cfg.processStatus }}</p>
        </div>
      </el-card>
    </div>

    <!-- 属性设置抽屉 -->
    <el-drawer
      v-model="showSettings"
      title="步骤条属性设置"
      direction="rtl"
      size="45%"
    >
      <div class="settings-container">
        <!-- 基础属性 -->
        <div class="form-section">
          <div class="section-title">基础属性</div>
          
          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">active</span>
              <span class="help-text">设置当前步骤</span>
            </div>
            <el-input-number v-model="cfg.active" :min="0" :max="steps.length - 1" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">direction</span>
              <span class="help-text">显示方向</span>
            </div>
            <el-radio-group v-model="cfg.direction">
              <el-radio-button label="horizontal">horizontal</el-radio-button>
              <el-radio-button label="vertical">vertical</el-radio-button>
            </el-radio-group>
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">alignCenter</span>
              <span class="help-text">进行居中对齐</span>
            </div>
            <el-switch v-model="cfg.alignCenter" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">simple</span>
              <span class="help-text">是否应用简洁模式</span>
            </div>
            <el-switch v-model="cfg.simple" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">finishStatus</span>
              <span class="help-text">完成步骤的状态</span>
            </div>
            <el-radio-group v-model="cfg.finishStatus">
              <el-radio-button label="finish">finish</el-radio-button>
              <el-radio-button label="success">success</el-radio-button>
            </el-radio-group>
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">processStatus</span>
              <span class="help-text">进行中步骤的状态</span>
            </div>
            <el-radio-group v-model="cfg.processStatus">
              <el-radio-button label="process">process</el-radio-button>
              <el-radio-button label="error">error</el-radio-button>
            </el-radio-group>
          </div>
        </div>

        <!-- 步骤管理 -->
        <div class="form-section">
          <div class="section-title">步骤管理</div>
          
          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">步骤</span>
              <span class="help-text">步骤列表</span>
            </div>
            <div class="steps-container">
              <div v-for="(step, index) in steps" :key="index" class="step-item">
                <el-input v-model="step.title" placeholder="步骤标题" style="width: 120px;" />
                <el-input v-model="step.description" placeholder="步骤描述" style="width: 150px;" />
                <el-input v-model="step.icon" placeholder="图标" style="width: 100px;" />
                <el-select v-model="step.status" placeholder="状态" style="width: 100px;">
                  <el-option label="wait" value="wait" />
                  <el-option label="process" value="process" />
                  <el-option label="finish" value="finish" />
                  <el-option label="error" value="error" />
                </el-select>
                <el-button type="danger" size="small" @click="removeStep(index)">删除</el-button>
              </div>
              <el-button type="primary" @click="addStep">添加步骤</el-button>
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

// 配置对象
const cfg = reactive({
  active: 1,
  direction: 'horizontal',
  alignCenter: false,
  simple: false,
  finishStatus: 'finish',
  processStatus: 'process'
})

// 步骤数据
const steps = ref([
  { title: '步骤1', description: '这是步骤1', icon: 'Edit', status: 'finish' },
  { title: '步骤2', description: '这是步骤2', icon: 'Upload', status: 'process' },
  { title: '步骤3', description: '这是步骤3', icon: 'Picture', status: 'wait' },
  { title: '步骤4', description: '这是步骤4', icon: 'Check', status: 'wait' }
])

// 事件处理
const handleChange = (active) => {
  console.log('步骤改变:', active)
  ElMessage.success(`切换到步骤: ${active + 1}`)
}

// 步骤管理
const addStep = () => {
  const newIndex = steps.value.length + 1
  steps.value.push({
    title: `步骤${newIndex}`,
    description: `这是步骤${newIndex}`,
    icon: '',
    status: 'wait'
  })
}

const removeStep = (index) => {
  if (steps.value.length > 1) {
    steps.value.splice(index, 1)
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

.steps-group {
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
}

.steps-item {
  flex: 1;
  min-width: 300px;
}

.steps-item h4 {
  margin: 0 0 15px 0;
  color: #303133;
  font-size: 14px;
}

.steps-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.step-item {
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
