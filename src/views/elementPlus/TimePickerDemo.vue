<template>
  <div class="demo-container">
    <div class="demo-header">
      <h2>时间选择器 TimePicker</h2>
      <p>用于选择或输入时间，支持任意时间格式</p>
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
          <h4>时间选择器演示</h4>
          <el-time-picker
            v-model="value"
            :size="cfg.size"
            :disabled="cfg.disabled"
            :readonly="cfg.readonly"
            :editable="cfg.editable"
            :clearable="cfg.clearable"
            :placeholder="cfg.placeholder"
            :start-placeholder="cfg.startPlaceholder"
            :end-placeholder="cfg.endPlaceholder"
            :is-range="cfg.isRange"
            :arrow-control="cfg.arrowControl"
            :align="cfg.align"
            :popper-class="cfg.popperClass"
            :range-separator="cfg.rangeSeparator"
            :default-value="cfg.defaultValue"
            :name="cfg.name"
            :prefix-icon="cfg.prefixIcon"
            :clear-icon="cfg.clearIcon"
            :format="cfg.format"
            :value-format="cfg.valueFormat"
            :disabled-hours="cfg.disabledHours ? disabledHoursHandler : undefined"
            :disabled-minutes="cfg.disabledMinutes ? disabledMinutesHandler : undefined"
            :disabled-seconds="cfg.disabledSeconds ? disabledSecondsHandler : undefined"
            @change="handleChange"
            @blur="handleBlur"
            @focus="handleFocus"
        />
        </div>

        <div class="demo-section">
          <h4>时间范围选择器演示</h4>
          <el-time-picker
            v-model="rangeValue"
            is-range
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            @change="handleRangeChange"
        />
        </div>

        <div class="demo-section">
          <h4>任意时间点演示</h4>
          <el-time-picker
            v-model="anyValue"
            :picker-options="pickerOptions"
            placeholder="任意时间点"
            @change="handleAnyChange"
        />
        </div>

        <div class="demo-section">
          <h4>状态显示</h4>
          <p><strong>当前值：</strong>{{ value }}</p>
          <p><strong>范围值：</strong>{{ rangeValue }}</p>
          <p><strong>任意值：</strong>{{ anyValue }}</p>
          <p><strong>尺寸：</strong>{{ cfg.size }}</p>
          <p><strong>禁用：</strong>{{ cfg.disabled ? '是' : '否' }}</p>
          <p><strong>只读：</strong>{{ cfg.readonly ? '是' : '否' }}</p>
          <p><strong>可编辑：</strong>{{ cfg.editable ? '是' : '否' }}</p>
          <p><strong>可清空：</strong>{{ cfg.clearable ? '是' : '否' }}</p>
          <p><strong>范围选择：</strong>{{ cfg.isRange ? '是' : '否' }}</p>
          <p><strong>箭头控制：</strong>{{ cfg.arrowControl ? '是' : '否' }}</p>
          <p><strong>对齐方式：</strong>{{ cfg.align }}</p>
          <p><strong>格式：</strong>{{ cfg.format }}</p>
          <p><strong>值格式：</strong>{{ cfg.valueFormat }}</p>
        </div>
      </el-card>
    </div>

    <!-- 属性设置抽屉 -->
    <el-drawer
      v-model="showSettings"
      title="时间选择器属性设置"
      direction="rtl"
      size="45%"
    >
      <div class="settings-container">
        <!-- 基础属性 -->
        <div class="form-section">
          <div class="section-title">基础属性</div>
          
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
              <span class="prop-name">placeholder</span>
              <span class="help-text">占位符</span>
            </div>
            <el-input v-model="cfg.placeholder" placeholder="请输入占位符" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">startPlaceholder</span>
              <span class="help-text">开始时间占位符</span>
            </div>
            <el-input v-model="cfg.startPlaceholder" placeholder="请输入开始时间占位符" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">endPlaceholder</span>
              <span class="help-text">结束时间占位符</span>
            </div>
            <el-input v-model="cfg.endPlaceholder" placeholder="请输入结束时间占位符" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">rangeSeparator</span>
              <span class="help-text">范围分隔符</span>
            </div>
            <el-input v-model="cfg.rangeSeparator" placeholder="如: 至" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">name</span>
              <span class="help-text">原生name属性</span>
            </div>
            <el-input v-model="cfg.name" placeholder="请输入name" />
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

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">editable</span>
              <span class="help-text">是否可编辑</span>
            </div>
            <el-switch v-model="cfg.editable" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">clearable</span>
              <span class="help-text">是否可清空</span>
            </div>
            <el-switch v-model="cfg.clearable" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">isRange</span>
              <span class="help-text">是否为时间范围选择</span>
            </div>
            <el-switch v-model="cfg.isRange" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">arrowControl</span>
              <span class="help-text">是否使用箭头进行时间选择</span>
            </div>
            <el-switch v-model="cfg.arrowControl" />
          </div>
        </div>

        <!-- 样式属性 -->
        <div class="form-section">
          <div class="section-title">样式属性</div>
          
          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">align</span>
              <span class="help-text">对齐方式</span>
            </div>
            <el-radio-group v-model="cfg.align">
              <el-radio-button label="left">left</el-radio-button>
              <el-radio-button label="center">center</el-radio-button>
              <el-radio-button label="right">right</el-radio-button>
            </el-radio-group>
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">popperClass</span>
              <span class="help-text">下拉框类名</span>
            </div>
            <el-input v-model="cfg.popperClass" placeholder="请输入类名" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">prefixIcon</span>
              <span class="help-text">自定义前缀图标</span>
            </div>
            <el-input v-model="cfg.prefixIcon" placeholder="如: el-icon-time" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">clearIcon</span>
              <span class="help-text">自定义清空图标</span>
            </div>
            <el-input v-model="cfg.clearIcon" placeholder="如: el-icon-circle-close" />
          </div>
        </div>

        <!-- 格式属性 -->
        <div class="form-section">
          <div class="section-title">格式属性</div>
          
          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">format</span>
              <span class="help-text">显示格式</span>
            </div>
            <el-input v-model="cfg.format" placeholder="如: HH:mm:ss" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">valueFormat</span>
              <span class="help-text">绑定值格式</span>
            </div>
            <el-input v-model="cfg.valueFormat" placeholder="如: HH:mm:ss" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">defaultValue</span>
              <span class="help-text">默认时间</span>
            </div>
            <el-time-picker v-model="cfg.defaultValue" placeholder="选择默认时间" />
          </div>
        </div>

        <!-- 禁用属性 -->
        <div class="form-section">
          <div class="section-title">禁用属性</div>
          
          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">disabledHours</span>
              <span class="help-text">禁用小时</span>
            </div>
            <el-switch v-model="cfg.disabledHours" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">disabledMinutes</span>
              <span class="help-text">禁用分钟</span>
            </div>
            <el-switch v-model="cfg.disabledMinutes" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">disabledSeconds</span>
              <span class="help-text">禁用秒</span>
            </div>
            <el-switch v-model="cfg.disabledSeconds" />
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
const value = ref('')
const rangeValue = ref([])
const anyValue = ref('')

// 配置对象
const cfg = reactive({
  size: 'default',
  disabled: false,
  readonly: false,
  editable: true,
  clearable: true,
  placeholder: '请选择时间',
  startPlaceholder: '开始时间',
  endPlaceholder: '结束时间',
  isRange: false,
  arrowControl: false,
  align: 'left',
  popperClass: '',
  rangeSeparator: '至',
  defaultValue: null,
  name: 'time',
  prefixIcon: '',
  clearIcon: '',
  format: 'HH:mm:ss',
  valueFormat: 'HH:mm:ss',
  disabledHours: false,
  disabledMinutes: false,
  disabledSeconds: false
})

// 选择器选项
const pickerOptions = {
  selectableRange: '09:00:00 - 18:00:00'
}

// 事件处理
const handleChange = (value) => {
  console.log('时间改变:', value)
  ElMessage.success(`选择时间: ${value}`)
}

const handleBlur = (event) => {
  console.log('失去焦点:', event)
}

const handleFocus = (event) => {
  console.log('获得焦点:', event)
}

const handleRangeChange = (value) => {
  console.log('时间范围改变:', value)
  ElMessage.success(`时间范围: ${value[0]} - ${value[1]}`)
}

const handleAnyChange = (value) => {
  console.log('任意时间改变:', value)
  ElMessage.success(`任意时间: ${value}`)
}

// 禁用处理函数
const disabledHoursHandler = () => {
  return [0, 1, 2, 3, 4, 5, 6, 7, 8, 22, 23]
}

const disabledMinutesHandler = (hour) => {
  if (hour === 9) {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29]
  }
  return []
}

const disabledSecondsHandler = (hour, minute) => {
  if (hour === 9 && minute === 0) {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29]
  }
  return []
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
