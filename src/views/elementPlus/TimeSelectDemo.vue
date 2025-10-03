<template>
  <div class="demo-container">
    <div class="demo-header">
      <h2>时间选择 TimeSelect</h2>
      <p>用于选择时间，提供下拉选择框</p>
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
          <h4>时间选择演示</h4>
          <el-time-select
            v-model="value"
            :size="cfg.size"
            :disabled="cfg.disabled"
            :readonly="cfg.readonly"
            :editable="cfg.editable"
            :clearable="cfg.clearable"
            :placeholder="cfg.placeholder"
            :start="cfg.start"
            :end="cfg.end"
            :step="cfg.step"
            :min-time="cfg.minTime"
            :max-time="cfg.maxTime"
            :name="cfg.name"
            :prefix-icon="cfg.prefixIcon"
            :clear-icon="cfg.clearIcon"
            :format="cfg.format"
            :value-format="cfg.valueFormat"
            @change="handleChange"
            @blur="handleBlur"
            @focus="handleFocus"
        />
        </div>

        <div class="demo-section">
          <h4>自定义时间间隔演示</h4>
          <el-time-select
            v-model="customValue"
            :start="'08:30'"
            :step="'00:15'"
            :end="'18:30'"
            placeholder="选择时间"
            @change="handleCustomChange"
        />
        </div>

        <div class="demo-section">
          <h4>限制时间范围演示</h4>
          <el-time-select
            v-model="limitValue"
            :start="'09:00'"
            :end="'18:00'"
            :step="'00:30'"
            :min-time="'10:00'"
            :max-time="'16:00'"
            placeholder="限制时间范围"
            @change="handleLimitChange"
        />
        </div>

        <div class="demo-section">
          <h4>状态显示</h4>
          <p><strong>当前值：</strong>{{ value }}</p>
          <p><strong>自定义值：</strong>{{ customValue }}</p>
          <p><strong>限制值：</strong>{{ limitValue }}</p>
          <p><strong>尺寸：</strong>{{ cfg.size }}</p>
          <p><strong>禁用：</strong>{{ cfg.disabled ? '是' : '否' }}</p>
          <p><strong>只读：</strong>{{ cfg.readonly ? '是' : '否' }}</p>
          <p><strong>可编辑：</strong>{{ cfg.editable ? '是' : '否' }}</p>
          <p><strong>可清空：</strong>{{ cfg.clearable ? '是' : '否' }}</p>
          <p><strong>开始时间：</strong>{{ cfg.start }}</p>
          <p><strong>结束时间：</strong>{{ cfg.end }}</p>
          <p><strong>步长：</strong>{{ cfg.step }}</p>
          <p><strong>最小时间：</strong>{{ cfg.minTime }}</p>
          <p><strong>最大时间：</strong>{{ cfg.maxTime }}</p>
          <p><strong>格式：</strong>{{ cfg.format }}</p>
          <p><strong>值格式：</strong>{{ cfg.valueFormat }}</p>
        </div>
      </el-card>
    </div>

    <!-- 属性设置抽屉 -->
    <el-drawer
      v-model="showSettings"
      title="时间选择属性设置"
      direction="rtl"
      size="45%"
    >
      <div class="settings-container">
        <!-- 使用说明 -->
        <div class="form-section">
          <div class="section-title">使用说明</div>
          
          <div class="usage-item">
            <h5>1. 基础用法</h5>
            <div class="code-block">
              <pre><code>&lt;el-time-select v-model="value" /&gt;

&lt;script setup&gt;
import { ref } from 'vue'
const value = ref('')
&lt;/script&gt;</code></pre>
            </div>
          </div>
          
          <div class="usage-item">
            <h5>2. 设置时间范围</h5>
            <div class="code-block">
              <pre><code>&lt;el-time-select 
  v-model="value" 
  :start="'08:30'" 
  :end="'18:30'" 
  :step="'00:15'" 
  placeholder="选择时间" 
/&gt;</code></pre>
            </div>
          </div>
          
          <div class="usage-item">
            <h5>3. 设置最小/最大时间</h5>
            <div class="code-block">
              <pre><code>&lt;el-time-select 
  v-model="value" 
  :start="'08:30'" 
  :end="'18:30'" 
  :step="'00:15'" 
  :min-time="'09:00'" 
  :max-time="'17:00'" 
  placeholder="选择时间" 
/&gt;</code></pre>
            </div>
          </div>
          
          <div class="usage-item">
            <h5>4. 自定义格式</h5>
            <div class="code-block">
              <pre><code>&lt;el-time-select 
  v-model="value" 
  :start="'08:30'" 
  :end="'18:30'" 
  :step="'00:15'" 
  format="HH:mm" 
  value-format="HH:mm" 
  placeholder="选择时间" 
/&gt;</code></pre>
            </div>
          </div>
          
          <div class="usage-item">
            <h5>5. 禁用状态</h5>
            <div class="code-block">
              <pre><code>&lt;el-time-select 
  v-model="value" 
  :start="'08:30'" 
  :end="'18:30'" 
  :step="'00:15'" 
  disabled 
  placeholder="禁用状态" 
/&gt;</code></pre>
            </div>
          </div>
          
          <div class="usage-item">
            <h5>6. 只读状态</h5>
            <div class="code-block">
              <pre><code>&lt;el-time-select 
  v-model="value" 
  :start="'08:30'" 
  :end="'18:30'" 
  :step="'00:15'" 
  readonly 
  placeholder="只读状态" 
/&gt;</code></pre>
            </div>
          </div>
          
          <div class="usage-item">
            <h5>7. 事件处理</h5>
            <div class="code-block">
              <pre><code>&lt;el-time-select 
  v-model="value" 
  :start="'08:30'" 
  :end="'18:30'" 
  :step="'00:15'" 
  @change="handleChange" 
  @blur="handleBlur" 
  @focus="handleFocus" 
/&gt;

&lt;script setup&gt;
const handleChange = (value) => {
  console.log('时间改变:', value)
}

const handleBlur = (event) => {
  console.log('失去焦点:', event)
}

const handleFocus = (event) => {
  console.log('获得焦点:', event)
}
&lt;/script&gt;</code></pre>
            </div>
          </div>
        </div>
        
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
              <span class="prop-name">start</span>
              <span class="help-text">开始时间</span>
            </div>
            <el-input v-model="cfg.start" placeholder="如: 09:00" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">end</span>
              <span class="help-text">结束时间</span>
            </div>
            <el-input v-model="cfg.end" placeholder="如: 18:00" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">step</span>
              <span class="help-text">时间间隔</span>
            </div>
            <el-input v-model="cfg.step" placeholder="如: 00:30" />
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
        </div>

        <!-- 时间限制属性 -->
        <div class="form-section">
          <div class="section-title">时间限制属性</div>
          
          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">minTime</span>
              <span class="help-text">最小时间</span>
            </div>
            <el-input v-model="cfg.minTime" placeholder="如: 10:00" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">maxTime</span>
              <span class="help-text">最大时间</span>
            </div>
            <el-input v-model="cfg.maxTime" placeholder="如: 16:00" />
          </div>
        </div>

        <!-- 样式属性 -->
        <div class="form-section">
          <div class="section-title">样式属性</div>
          
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
            <el-input v-model="cfg.format" placeholder="如: HH:mm" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">valueFormat</span>
              <span class="help-text">绑定值格式</span>
            </div>
            <el-input v-model="cfg.valueFormat" placeholder="如: HH:mm" />
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
const customValue = ref('')
const limitValue = ref('')

// 配置对象
const cfg = reactive({
  size: 'default',
  disabled: false,
  readonly: false,
  editable: true,
  clearable: true,
  placeholder: '请选择时间',
  start: '09:00',
  end: '18:00',
  step: '00:30',
  minTime: '',
  maxTime: '',
  name: 'time',
  prefixIcon: '',
  clearIcon: '',
  format: 'HH:mm',
  valueFormat: 'HH:mm'
})

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

const handleCustomChange = (value) => {
  console.log('自定义时间改变:', value)
  ElMessage.success(`自定义时间: ${value}`)
}

const handleLimitChange = (value) => {
  console.log('限制时间改变:', value)
  ElMessage.success(`限制时间: ${value}`)
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

.code-block {
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 4px;
  padding: 12px;
  margin: 8px 0;
}

.code-block pre {
  margin: 0;
  font-family: 'Courier New', Courier, monospace;
  font-size: 13px;
  line-height: 1.4;
  color: #333;
}

.usage-item {
  margin-bottom: 20px;
}

.usage-item h5 {
  margin: 0 0 8px 0;
  color: #409eff;
  font-size: 14px;
}
</style>
