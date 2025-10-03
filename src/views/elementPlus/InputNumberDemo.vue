<template>
  <div class="demo-container">
    <div class="demo-header">
      <h2>数字输入框 InputNumber</h2>
      <p>仅允许输入数字的输入框，支持自定义精度、步长等</p>
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
          <h4>数字输入框演示</h4>
          <el-input-number
            v-model="value"
            :min="cfg.min"
            :max="cfg.max"
            :step="cfg.step"
            :precision="cfg.precision"
            :size="cfg.size"
            :disabled="cfg.disabled"
            :readonly="cfg.readonly"
            :controls="cfg.controls"
            :controls-position="cfg.controlsPosition"
            :placeholder="cfg.placeholder"
            :step-strictly="cfg.stepStrictly"
            :value-on-clear="cfg.valueOnClear"
            :validate-event="cfg.validateEvent"
            @change="handleChange"
            @blur="handleBlur"
            @focus="handleFocus"
          />
        </div>

        <div class="demo-section">
          <h4>状态显示</h4>
          <p><strong>当前值：</strong>{{ value }}</p>
          <p><strong>最小值：</strong>{{ cfg.min }}</p>
          <p><strong>最大值：</strong>{{ cfg.max }}</p>
          <p><strong>步长：</strong>{{ cfg.step }}</p>
          <p><strong>精度：</strong>{{ cfg.precision }}</p>
          <p><strong>尺寸：</strong>{{ cfg.size }}</p>
          <p><strong>禁用：</strong>{{ cfg.disabled ? '是' : '否' }}</p>
          <p><strong>只读：</strong>{{ cfg.readonly ? '是' : '否' }}</p>
          <p><strong>显示控制按钮：</strong>{{ cfg.controls ? '是' : '否' }}</p>
          <p><strong>控制按钮位置：</strong>{{ cfg.controlsPosition }}</p>
        </div>
      </el-card>
    </div>

    <!-- 属性设置抽屉 -->
    <el-drawer
      v-model="showSettings"
      title="数字输入框属性设置"
      direction="rtl"
      size="45%"
    >
      <div class="settings-container">
        <!-- 基础属性 -->
        <div class="form-section">
          <div class="section-title">基础属性</div>
          
          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">min</span>
              <span class="help-text">最小值</span>
            </div>
            <el-input-number v-model="cfg.min" :min="-999999" :max="999999" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">max</span>
              <span class="help-text">最大值</span>
            </div>
            <el-input-number v-model="cfg.max" :min="-999999" :max="999999" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">step</span>
              <span class="help-text">步长</span>
            </div>
            <el-input-number v-model="cfg.step" :min="0.1" :max="100" :step="0.1" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">precision</span>
              <span class="help-text">精度（小数位数）</span>
            </div>
            <el-input-number v-model="cfg.precision" :min="0" :max="10" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">placeholder</span>
              <span class="help-text">占位符</span>
            </div>
            <el-input v-model="cfg.placeholder" placeholder="请输入占位符" />
          </div>
        </div>

        <!-- 外观属性 -->
        <div class="form-section">
          <div class="section-title">外观属性</div>
          
          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">size</span>
              <span class="help-text">尺寸</span>
            </div>
            <el-radio-group v-model="cfg.size">
              <el-radio-button label="large">large</el-radio-button>
              <el-radio-button label="default">default</el-radio-button>
              <el-radio-button label="small">small</el-radio-button>
            </el-radio-group>
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">controls</span>
              <span class="help-text">是否显示控制按钮</span>
            </div>
            <el-switch v-model="cfg.controls" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">controlsPosition</span>
              <span class="help-text">控制按钮位置</span>
            </div>
            <el-radio-group v-model="cfg.controlsPosition">
              <el-radio-button label="right">right</el-radio-button>
              <el-radio-button label="left">left</el-radio-button>
            </el-radio-group>
          </div>
        </div>

        <!-- 状态属性 -->
        <div class="form-section">
          <div class="section-title">状态属性</div>
          
          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">disabled</span>
              <span class="help-text">是否禁用</span>
            </div>
            <el-switch v-model="cfg.disabled" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">readonly</span>
              <span class="help-text">是否只读</span>
            </div>
            <el-switch v-model="cfg.readonly" />
          </div>
        </div>

        <!-- 其他属性 -->
        <div class="form-section">
          <div class="section-title">其他属性</div>
          
          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">stepStrictly</span>
              <span class="help-text">是否只能输入 step 的倍数</span>
            </div>
            <el-switch v-model="cfg.stepStrictly" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">valueOnClear</span>
              <span class="help-text">清空时的值</span>
            </div>
            <el-input-number v-model="cfg.valueOnClear" :min="-999999" :max="999999" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">validateEvent</span>
              <span class="help-text">是否触发表单验证</span>
            </div>
            <el-switch v-model="cfg.validateEvent" />
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
const value = ref(0)

// 配置对象
const cfg = reactive({
  min: 0,
  max: 100,
  step: 1,
  precision: 0,
  size: 'default',
  disabled: false,
  readonly: false,
  controls: true,
  controlsPosition: 'right',
  placeholder: '请输入数字',
  stepStrictly: false,
  valueOnClear: null,
  validateEvent: true
})

// 事件处理
const handleChange = (value) => {
  console.log('值改变:', value)
  ElMessage.success(`值改变为: ${value}`)
}

const handleBlur = (event) => {
  console.log('失去焦点:', event)
}

const handleFocus = (event) => {
  console.log('获得焦点:', event)
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
</style>
