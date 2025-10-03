<template>
  <div class="demo-page">
    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <span>DatePicker 日期选择器</span>
          <el-button type="primary" @click="show = true">属性设置</el-button>
        </div>
      </template>
      
      <!-- 预览日期选择器 -->
      <div class="row">
        <el-date-picker 
          v-model="date" 
          :type="cfg.type"
          :clearable="cfg.clearable" 
          :disabled="cfg.disabled" 
          :readonly="cfg.readonly"
          :editable="cfg.editable"
          :size="cfg.size"
          :placeholder="cfg.placeholder"
          :start-placeholder="cfg.startPlaceholder"
          :end-placeholder="cfg.endPlaceholder"
          :format="cfg.format"
          :value-format="cfg.valueFormat"
          :range-separator="cfg.rangeSeparator"
          :shortcuts="cfg.shortcuts ? shortcuts : undefined"
          :disabled-date="cfg.disabledDate ? disabledDateFn : undefined"
          :teleported="cfg.teleported"
          :unlink-panels="cfg.unlinkPanels"
          :validate-event="cfg.validateEvent"
          :prefix-icon="prefixIconComp"
          :clear-icon="clearIconComp"
          :suffix-icon="suffixIconComp"
          :effect="cfg.effect"
          style="width: 300px;"
          @change="onUI('change')"
          @blur="onUI('blur')"
          @focus="onUI('focus')"
          @visible-change="onUI('visible-change')"
          @panel-change="onUI('panel-change')"
          @calendar-change="onUI('calendar-change')"
        />
      </div>
      
      <!-- 状态显示 -->
      <div class="status">
        <div>当前值: {{ date || '未选择' }}</div>
        <div>选择器类型: {{ cfg.type }}</div>
        <div>显示格式: {{ cfg.format }}</div>
        <div>绑定值格式: {{ cfg.valueFormat }}</div>
        <div>占位符: {{ cfg.placeholder }}</div>
      </div>
    </el-card>

    <el-drawer v-model="show" title="日期选择器属性设置" size="45%">
      <div class="drawer-content">
        <el-alert type="info" show-icon :closable="false" style="margin-bottom: 20px;"
          description="提示：1) 不同类型的选择器支持不同的属性；2) 范围选择器需要设置 start-placeholder 和 end-placeholder；3) 格式化字符串影响显示格式。" />
        
        <!-- 基础属性 -->
        <div class="section">
          <h4>基础属性</h4>
          
          <div class="form-item">
            <div class="label-text">选择器类型</div>
            <div class="prop-name">type</div>
            <el-select v-model="cfg.type" style="width: 200px;">
              <el-option value="date" label="date（日期）" />
              <el-option value="datetime" label="datetime（日期时间）" />
              <el-option value="daterange" label="daterange（日期范围）" />
              <el-option value="datetimerange" label="datetimerange（日期时间范围）" />
              <el-option value="year" label="year（年）" />
              <el-option value="month" label="month（月）" />
              <el-option value="week" label="week（周）" />
              <el-option value="time" label="time（时间）" />
              <el-option value="timerange" label="timerange（时间范围）" />
            </el-select>
            <div class="help-text">选择器的类型，决定选择的内容</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">尺寸</div>
            <div class="prop-name">size</div>
            <el-radio-group v-model="cfg.size">
              <el-radio-button label="default">default</el-radio-button>
              <el-radio-button label="small">small</el-radio-button>
              <el-radio-button label="large">large</el-radio-button>
            </el-radio-group>
            <div class="help-text">选择器的尺寸大小</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">占位符</div>
            <div class="prop-name">placeholder</div>
            <el-input v-model="cfg.placeholder" placeholder="请输入占位符" style="width: 200px;" />
            <div class="help-text">选择框的占位符文本</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">开始占位符</div>
            <div class="prop-name">start-placeholder</div>
            <el-input v-model="cfg.startPlaceholder" placeholder="开始日期占位符" style="width: 200px;" />
            <div class="help-text">范围选择器开始日期的占位符</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">结束占位符</div>
            <div class="prop-name">end-placeholder</div>
            <el-input v-model="cfg.endPlaceholder" placeholder="结束日期占位符" style="width: 200px;" />
            <div class="help-text">范围选择器结束日期的占位符</div>
          </div>
        </div>
        
        <!-- 格式化设置 -->
        <div class="section">
          <h4>格式化设置</h4>
          
          <div class="form-item">
            <div class="label-text">显示格式</div>
            <div class="prop-name">format</div>
            <el-input v-model="cfg.format" placeholder="如 YYYY-MM-DD" style="width: 200px;" />
            <div class="help-text">选择器中显示值的格式（会根据类型自动调整）</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">绑定值格式</div>
            <div class="prop-name">value-format</div>
            <el-input v-model="cfg.valueFormat" placeholder="如 YYYY-MM-DD" style="width: 200px;" />
            <div class="help-text">绑定值的格式（会根据类型自动调整）</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">常用格式模板</div>
            <div class="prop-name">格式模板</div>
            <el-select v-model="selectedFormat" @change="applyFormatTemplate" placeholder="选择格式模板" style="width: 200px;">
              <el-option label="日期 (YYYY-MM-DD)" value="date" />
              <el-option label="日期时间 (YYYY-MM-DD HH:mm:ss)" value="datetime" />
              <el-option label="年份 (YYYY)" value="year" />
              <el-option label="月份 (YYYY-MM)" value="month" />
              <el-option label="时间 (HH:mm:ss)" value="time" />
              <el-option label="中文日期 (YYYY年MM月DD日)" value="chinese" />
              <el-option label="短日期 (MM/DD/YYYY)" value="short" />
            </el-select>
            <div class="help-text">选择常用格式模板快速应用</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">范围分隔符</div>
            <div class="prop-name">range-separator</div>
            <el-input v-model="cfg.rangeSeparator" placeholder="如 至" style="width: 200px;" />
            <div class="help-text">范围选择器分隔符</div>
          </div>
        </div>
        
        <!-- 功能开关 -->
        <div class="section">
          <h4>功能开关</h4>
          
          <div class="form-item">
            <div class="label-text">可清空</div>
            <div class="prop-name">clearable</div>
            <el-switch v-model="cfg.clearable" />
            <div class="help-text">是否显示清除按钮</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">禁用状态</div>
            <div class="prop-name">disabled</div>
            <el-switch v-model="cfg.disabled" />
            <div class="help-text">是否禁用选择器</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">只读状态</div>
            <div class="prop-name">readonly</div>
            <el-switch v-model="cfg.readonly" />
            <div class="help-text">是否只读</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">可编辑</div>
            <div class="prop-name">editable</div>
            <el-switch v-model="cfg.editable" />
            <div class="help-text">输入框是否可编辑</div>
          </div>
        </div>
        
        <!-- 高级设置 -->
        <div class="section">
          <h4>高级设置</h4>
          
          <div class="form-item">
            <div class="label-text">快捷选项</div>
            <div class="prop-name">shortcuts</div>
            <el-switch v-model="cfg.shortcuts" />
            <div class="help-text">是否显示快捷选项</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">禁用日期</div>
            <div class="prop-name">disabled-date</div>
            <el-switch v-model="cfg.disabledDate" />
            <div class="help-text">是否禁用某些日期</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">传送</div>
            <div class="prop-name">teleported</div>
            <el-switch v-model="cfg.teleported" />
            <div class="help-text">是否将下拉框传送到 body</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">下拉框类名</div>
            <div class="prop-name">popper-class</div>
            <el-input v-model="cfg.popperClass" placeholder="如 custom-popper" style="width: 200px;" />
            <div class="help-text">下拉框的自定义类名</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">下拉框样式</div>
            <div class="prop-name">popper-style</div>
            <el-input v-model="cfg.popperStyle" placeholder='如 {"background":"#fff"}' style="width: 200px;" />
            <div class="help-text">下拉框的自定义样式</div>
          </div>
        </div>
        
        <!-- 格式说明 -->
        <div class="section">
          <h4>格式说明</h4>
          
          <div class="form-item">
            <div class="label-text">格式字符说明</div>
            <div class="prop-name">格式字符</div>
            <div class="format-help">
              <div class="format-item">
                <strong>YYYY</strong> - 四位数年份 (如: 2024)
              </div>
              <div class="format-item">
                <strong>MM</strong> - 两位数月份 (如: 01, 12)
              </div>
              <div class="format-item">
                <strong>DD</strong> - 两位数日期 (如: 01, 31)
              </div>
              <div class="format-item">
                <strong>HH</strong> - 24小时制小时 (如: 00, 23)
              </div>
              <div class="format-item">
                <strong>mm</strong> - 分钟 (如: 00, 59)
              </div>
              <div class="format-item">
                <strong>ss</strong> - 秒 (如: 00, 59)
              </div>
              <div class="format-item">
                <strong>ww</strong> - 周数 (如: 01, 52)
              </div>
            </div>
            <div class="help-text">常用的日期时间格式字符</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">常用格式示例</div>
            <div class="prop-name">格式示例</div>
            <div class="format-examples">
              <div class="format-example">
                <code>YYYY-MM-DD</code> → 2024-01-15
              </div>
              <div class="format-example">
                <code>YYYY-MM-DD HH:mm:ss</code> → 2024-01-15 14:30:25
              </div>
              <div class="format-example">
                <code>YYYY年MM月DD日</code> → 2024年01月15日
              </div>
              <div class="format-example">
                <code>MM/DD/YYYY</code> → 01/15/2024
              </div>
              <div class="format-example">
                <code>YYYY 第 ww 周</code> → 2024 第 03 周
              </div>
            </div>
            <div class="help-text">不同格式的显示效果</div>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { Calendar, Clock, CircleClose } from '@element-plus/icons-vue'

const show = ref(false)
const date = ref(null)
const selectedFormat = ref('')

// 配置对象
const cfg = reactive({
  type: 'date',
  clearable: true,
  disabled: false,
  readonly: false,
  editable: true,
  size: 'default',
  placeholder: '选择日期',
  startPlaceholder: '开始日期',
  endPlaceholder: '结束日期',
  format: 'YYYY-MM-DD',
  valueFormat: 'YYYY-MM-DD',
  rangeSeparator: '至',
  shortcuts: false,
  disabledDate: false,
  teleported: true,
  unlinkPanels: false,
  validateEvent: true,
  prefixIcon: 'none',
  clearIcon: 'default',
  suffixIcon: 'none',
  effect: 'light'
})

// 根据类型自动设置格式
const formatOptions = {
  'date': { format: 'YYYY-MM-DD', valueFormat: 'YYYY-MM-DD', placeholder: '选择日期' },
  'datetime': { format: 'YYYY-MM-DD HH:mm:ss', valueFormat: 'YYYY-MM-DD HH:mm:ss', placeholder: '选择日期时间' },
  'daterange': { format: 'YYYY-MM-DD', valueFormat: 'YYYY-MM-DD', placeholder: '选择日期范围' },
  'datetimerange': { format: 'YYYY-MM-DD HH:mm:ss', valueFormat: 'YYYY-MM-DD HH:mm:ss', placeholder: '选择日期时间范围' },
  'year': { format: 'YYYY', valueFormat: 'YYYY', placeholder: '选择年份' },
  'month': { format: 'YYYY-MM', valueFormat: 'YYYY-MM', placeholder: '选择月份' },
  'week': { format: 'YYYY 第 ww 周', valueFormat: 'YYYY-MM-DD', placeholder: '选择周' },
  'time': { format: 'HH:mm:ss', valueFormat: 'HH:mm:ss', placeholder: '选择时间' },
  'timerange': { format: 'HH:mm:ss', valueFormat: 'HH:mm:ss', placeholder: '选择时间范围' }
}

// 监听类型变化，自动更新格式
watch(() => cfg.type, (newType) => {
  const formatOption = formatOptions[newType]
  if (formatOption) {
    cfg.format = formatOption.format
    cfg.valueFormat = formatOption.valueFormat
    cfg.placeholder = formatOption.placeholder
    
    // 根据类型设置占位符
    if (newType.includes('range')) {
      cfg.startPlaceholder = '开始' + formatOption.placeholder.replace('选择', '')
      cfg.endPlaceholder = '结束' + formatOption.placeholder.replace('选择', '')
    } else {
      cfg.startPlaceholder = '开始日期'
      cfg.endPlaceholder = '结束日期'
    }
  }
}, { immediate: true })


// 计算属性
const prefixIconComp = computed(() => {
  if (cfg.prefixIcon === 'Calendar') return Calendar
  if (cfg.prefixIcon === 'Clock') return Clock
  return undefined
})

const clearIconComp = computed(() => {
  if (cfg.clearIcon === 'CircleClose') return CircleClose
  return undefined
})

const suffixIconComp = computed(() => {
  if (cfg.suffixIcon === 'Calendar') return Calendar
  if (cfg.suffixIcon === 'Clock') return Clock
  return undefined
})

// 快捷选项
const shortcuts = [
  {
    text: '今天',
    value: () => new Date()
  },
  {
    text: '昨天',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24)
      return date
    }
  },
  {
    text: '一周前',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
      return date
    }
  }
]

// 禁用日期函数
const disabledDateFn = (time) => {
  return time.getTime() > Date.now()
}

// 格式模板
const formatTemplates = {
  'date': { format: 'YYYY-MM-DD', valueFormat: 'YYYY-MM-DD' },
  'datetime': { format: 'YYYY-MM-DD HH:mm:ss', valueFormat: 'YYYY-MM-DD HH:mm:ss' },
  'year': { format: 'YYYY', valueFormat: 'YYYY' },
  'month': { format: 'YYYY-MM', valueFormat: 'YYYY-MM' },
  'time': { format: 'HH:mm:ss', valueFormat: 'HH:mm:ss' },
  'chinese': { format: 'YYYY年MM月DD日', valueFormat: 'YYYY-MM-DD' },
  'short': { format: 'MM/DD/YYYY', valueFormat: 'YYYY-MM-DD' }
}

// 应用格式模板
const applyFormatTemplate = (templateKey) => {
  const template = formatTemplates[templateKey]
  if (template) {
    cfg.format = template.format
    cfg.valueFormat = template.valueFormat
    ElMessage.success(`已应用格式模板: ${template.format}`)
  }
}

// 事件处理
const onUI = (name) => ElMessage.info(`触发事件: ${name}`)
</script>

<style scoped>
.demo-page { padding: 12px; }
.card-header { font-weight: 600; display: flex; justify-content: space-between; align-items: center; }
.row { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 12px; }
.status { margin: 12px 0; padding: 8px; background: #f5f7fa; border-radius: 4px; font-size: 12px; }

.drawer-content { padding: 0 8px; }
.section { margin-bottom: 24px; padding: 20px; background: #fafafa; border-radius: 8px; }
.section h4 { margin: 0 0 20px 0; font-size: 16px; font-weight: 600; color: #303133; border-bottom: 2px solid #e4e7ed; padding-bottom: 8px; }

.form-item { margin-bottom: 24px; padding: 16px; background: #fff; border-radius: 6px; border: 1px solid #e4e7ed; }
.label-text { font-size: 14px; font-weight: 600; color: #303133; margin-bottom: 4px; }
.prop-name { font-size: 12px; color: #409eff; background: #ecf5ff; padding: 2px 6px; border-radius: 3px; display: inline-block; margin-bottom: 12px; font-family: 'Courier New', monospace; }
.help-text { font-size: 12px; color: #909399; margin-top: 8px; line-height: 1.4; }

.format-help { margin: 8px 0; }
.format-item { margin: 4px 0; font-size: 13px; }
.format-examples { margin: 8px 0; }
.format-example { margin: 4px 0; font-size: 13px; }
.format-example code { background: #f5f7fa; padding: 2px 4px; border-radius: 3px; font-family: 'Courier New', monospace; }
</style>