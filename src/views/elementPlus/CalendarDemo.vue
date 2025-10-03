<template>
  <div class="demo-container">
    <div class="demo-header">
      <h2>日历 Calendar</h2>
      <p>显示日期，支持年/月切换，支持日期范围选择</p>
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
          <h4>日历演示</h4>
          <el-calendar
            v-model="value"
            :range="cfg.range"
            :first-day-of-week="cfg.firstDayOfWeek"
            @input="handleInput"
        />
        </div>

        <div class="demo-section">
          <h4>自定义内容演示</h4>
          <el-calendar v-model="customValue">
            <template #date-cell="{ data }">
              <p :class="data.isSelected ? 'is-selected' : ''">
                {{ data.day.split('-').slice(1).join('-') }}
                {{ data.isSelected ? '✔️' : '' }}
              </p>
            </template>
          </el-calendar>
        </div>

        <div class="demo-section">
          <h4>状态显示</h4>
          <p><strong>当前值：</strong>{{ value }}</p>
          <p><strong>自定义值：</strong>{{ customValue }}</p>
          <p><strong>范围：</strong>{{ cfg.range }}</p>
          <p><strong>一周开始：</strong>{{ cfg.firstDayOfWeek }}</p>
        </div>
      </el-card>
    </div>

    <!-- 属性设置抽屉 -->
    <el-drawer
      v-model="showSettings"
      title="日历属性设置"
      direction="rtl"
      size="45%"
    >
      <div class="settings-container">
        <!-- 基础属性 -->
        <div class="form-section">
          <div class="section-title">基础属性</div>
          
          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">range</span>
              <span class="help-text">时间范围，包括开始时间与结束时间</span>
            </div>
            <el-date-picker
              v-model="cfg.range"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">firstDayOfWeek</span>
              <span class="help-text">周起始日</span>
            </div>
            <el-radio-group v-model="cfg.firstDayOfWeek">
              <el-radio-button :label="1">周一</el-radio-button>
              <el-radio-button :label="2">周二</el-radio-button>
              <el-radio-button :label="3">周三</el-radio-button>
              <el-radio-button :label="4">周四</el-radio-button>
              <el-radio-button :label="5">周五</el-radio-button>
              <el-radio-button :label="6">周六</el-radio-button>
              <el-radio-button :label="0">周日</el-radio-button>
            </el-radio-group>
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
const value = ref(new Date())
const customValue = ref(new Date())

// 配置对象
const cfg = reactive({
  range: null,
  firstDayOfWeek: 1
})

// 事件处理
const handleInput = (val) => {
  console.log('日历值改变:', val)
  ElMessage.success(`选择日期: ${val}`)
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

.is-selected {
  color: #409eff;
  font-weight: bold;
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
