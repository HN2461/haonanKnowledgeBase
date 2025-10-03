<template>
  <div class="demo-container">
    <div class="demo-header">
      <h2>滑块 Slider</h2>
      <p>通过拖动滑块在一个固定区间内进行选择，支持单值和范围选择</p>
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
          <h4>滑块演示</h4>
          <el-slider
            v-model="value"
            :min="cfg.min"
            :max="cfg.max"
            :step="cfg.step"
            :disabled="cfg.disabled"
            :show-input="cfg.showInput"
            :show-input-controls="cfg.showInputControls"
            :input-size="cfg.inputSize"
            :show-stops="cfg.showStops"
            :show-tooltip="cfg.showTooltip"
            :format-tooltip="cfg.formatTooltip ? formatTooltipHandler : undefined"
            :range="cfg.range"
            :vertical="cfg.vertical"
            :height="cfg.height"
            :label="cfg.label ? labelHandler : undefined"
            :tooltip-class="cfg.tooltipClass"
            :debounce="cfg.debounce"
            :marks="cfg.showMarks ? marks : undefined"
            @change="handleChange"
            @input="handleInput"
          />
        </div>

        <div class="demo-section">
          <h4>范围选择演示</h4>
          <el-slider
            v-model="rangeValue"
            :min="0"
            :max="100"
            :step="1"
            range
            show-input
            show-stops
            @change="handleRangeChange"
        />
        </div>

        <div class="demo-section">
          <h4>垂直滑块演示</h4>
          <div class="vertical-slider-container">
            <el-slider
              v-model="verticalValue"
              :min="0"
              :max="100"
              :step="1"
              vertical
              height="200px"
              show-input
              @change="handleVerticalChange"
          />
          </div>
        </div>

        <div class="demo-section">
          <h4>状态显示</h4>
          <p><strong>当前值：</strong>{{ value }}</p>
          <p><strong>范围值：</strong>{{ rangeValue }}</p>
          <p><strong>垂直值：</strong>{{ verticalValue }}</p>
          <p><strong>最小值：</strong>{{ cfg.min }}</p>
          <p><strong>最大值：</strong>{{ cfg.max }}</p>
          <p><strong>步长：</strong>{{ cfg.step }}</p>
          <p><strong>禁用：</strong>{{ cfg.disabled ? '是' : '否' }}</p>
          <p><strong>显示输入框：</strong>{{ cfg.showInput ? '是' : '否' }}</p>
          <p><strong>显示控制按钮：</strong>{{ cfg.showInputControls ? '是' : '否' }}</p>
          <p><strong>显示断点：</strong>{{ cfg.showStops ? '是' : '否' }}</p>
          <p><strong>显示提示：</strong>{{ cfg.showTooltip ? '是' : '否' }}</p>
          <p><strong>范围选择：</strong>{{ cfg.range ? '是' : '否' }}</p>
          <p><strong>垂直方向：</strong>{{ cfg.vertical ? '是' : '否' }}</p>
        </div>
      </el-card>
    </div>

    <!-- 属性设置抽屉 -->
    <el-drawer
      v-model="showSettings"
      title="滑块属性设置"
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
              <span class="prop-name">inputSize</span>
              <span class="help-text">输入框尺寸</span>
            </div>
            <el-radio-group v-model="cfg.inputSize">
              <el-radio-button label="large">large</el-radio-button>
              <el-radio-button label="default">default</el-radio-button>
              <el-radio-button label="small">small</el-radio-button>
            </el-radio-group>
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">height</span>
              <span class="help-text">滑块高度（垂直时）</span>
            </div>
            <el-input v-model="cfg.height" placeholder="如: 200px" />
          </div>
        </div>

        <!-- 显示属性 -->
        <div class="form-section">
          <div class="section-title">显示属性</div>
          
          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">showInput</span>
              <span class="help-text">是否显示输入框</span>
            </div>
            <el-switch v-model="cfg.showInput" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">showInputControls</span>
              <span class="help-text">是否显示输入框控制按钮</span>
            </div>
            <el-switch v-model="cfg.showInputControls" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">showStops</span>
              <span class="help-text">是否显示断点</span>
            </div>
            <el-switch v-model="cfg.showStops" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">showTooltip</span>
              <span class="help-text">是否显示提示</span>
            </div>
            <el-switch v-model="cfg.showTooltip" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">showMarks</span>
              <span class="help-text">是否显示标记</span>
            </div>
            <el-switch v-model="cfg.showMarks" />
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
              <span class="prop-name">range</span>
              <span class="help-text">是否为范围选择</span>
            </div>
            <el-switch v-model="cfg.range" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">vertical</span>
              <span class="help-text">是否垂直方向</span>
            </div>
            <el-switch v-model="cfg.vertical" />
          </div>
        </div>

        <!-- 其他属性 -->
        <div class="form-section">
          <div class="section-title">其他属性</div>
          
          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">formatTooltip</span>
              <span class="help-text">格式化提示内容</span>
            </div>
            <el-switch v-model="cfg.formatTooltip" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">label</span>
              <span class="help-text">屏幕阅读器标签</span>
            </div>
            <el-switch v-model="cfg.label" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">tooltipClass</span>
              <span class="help-text">提示框类名</span>
            </div>
            <el-input v-model="cfg.tooltipClass" placeholder="请输入类名" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">debounce</span>
              <span class="help-text">防抖延迟（毫秒）</span>
            </div>
            <el-input-number v-model="cfg.debounce" :min="0" :max="1000" />
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
const value = ref(30)
const rangeValue = ref([20, 50])
const verticalValue = ref(40)

// 配置对象
const cfg = reactive({
  min: 0,
  max: 100,
  step: 1,
  disabled: false,
  showInput: false,
  showInputControls: true,
  inputSize: 'default',
  showStops: false,
  showTooltip: true,
  formatTooltip: false,
  range: false,
  vertical: false,
  height: '200px',
  label: false,
  tooltipClass: '',
  debounce: 0,
  showMarks: false
})

// 标记点
const marks = {
  0: '0°C',
  8: '8°C',
  37: '37°C',
  50: '50°C',
  100: '100°C'
}

// 事件处理
const handleChange = (value) => {
  console.log('滑块值改变:', value)
  ElMessage.success(`滑块值: ${value}`)
}

const handleInput = (value) => {
  console.log('滑块输入:', value)
}

const handleRangeChange = (value) => {
  console.log('范围值改变:', value)
  ElMessage.success(`范围值: ${value[0]} - ${value[1]}`)
}

const handleVerticalChange = (value) => {
  console.log('垂直滑块值改变:', value)
  ElMessage.success(`垂直滑块值: ${value}`)
}

// 格式化提示内容
const formatTooltipHandler = (value) => {
  return `${value}%`
}

// 屏幕阅读器标签
const labelHandler = (value) => {
  return `当前值: ${value}`
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

.vertical-slider-container {
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
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
