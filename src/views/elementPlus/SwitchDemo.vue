<template>
  <div class="demo-container">
    <div class="demo-header">
      <h2>开关 Switch</h2>
      <p>表示两种相互对立的状态间的切换，多用于触发「开/关」</p>
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
          <h4>开关演示</h4>
          <el-switch
            v-model="value"
            :size="cfg.size"
            :disabled="cfg.disabled"
            :loading="cfg.loading"
            :before-change="cfg.beforeChange ? beforeChangeHandler : undefined"
            :active-text="cfg.activeText"
            :inactive-text="cfg.inactiveText"
            :active-color="cfg.activeColor"
            :inactive-color="cfg.inactiveColor"
            :active-value="cfg.activeValue"
            :inactive-value="cfg.inactiveValue"
            :name="cfg.name"
            :validate-event="cfg.validateEvent"
            @change="handleChange"
            @click="handleClick"
          />
        </div>

        <div class="demo-section">
          <h4>不同尺寸演示</h4>
          <div class="switch-group">
            <el-switch v-model="value" size="large" active-text="大尺寸" />
            <el-switch v-model="value" size="default" active-text="默认尺寸" />
            <el-switch v-model="value" size="small" active-text="小尺寸" />
          </div>
        </div>

        <div class="demo-section">
          <h4>不同颜色演示</h4>
          <div class="switch-group">
            <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949" active-text="成功色" />
            <el-switch v-model="value" active-color="#409eff" inactive-color="#c0c4cc" active-text="信息色" />
            <el-switch v-model="value" active-color="#f56c6c" inactive-color="#909399" active-text="警告色" />
          </div>
        </div>

        <div class="demo-section">
          <h4>状态显示</h4>
          <p><strong>当前值：</strong>{{ value }}</p>
          <p><strong>尺寸：</strong>{{ cfg.size }}</p>
          <p><strong>禁用：</strong>{{ cfg.disabled ? '是' : '否' }}</p>
          <p><strong>加载中：</strong>{{ cfg.loading ? '是' : '否' }}</p>
          <p><strong>激活文字：</strong>{{ cfg.activeText }}</p>
          <p><strong>非激活文字：</strong>{{ cfg.inactiveText }}</p>
          <p><strong>激活颜色：</strong>{{ cfg.activeColor }}</p>
          <p><strong>非激活颜色：</strong>{{ cfg.inactiveColor }}</p>
          <p><strong>激活值：</strong>{{ cfg.activeValue }}</p>
          <p><strong>非激活值：</strong>{{ cfg.inactiveValue }}</p>
          <p><strong>名称：</strong>{{ cfg.name }}</p>
        </div>
      </el-card>
    </div>

    <!-- 属性设置抽屉 -->
    <el-drawer
      v-model="showSettings"
      title="开关属性设置"
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
              <span class="prop-name">name</span>
              <span class="help-text">原生name属性</span>
            </div>
            <el-input v-model="cfg.name" placeholder="请输入name" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">activeText</span>
              <span class="help-text">激活时的文字描述</span>
            </div>
            <el-input v-model="cfg.activeText" placeholder="请输入激活文字" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">inactiveText</span>
              <span class="help-text">非激活时的文字描述</span>
            </div>
            <el-input v-model="cfg.inactiveText" placeholder="请输入非激活文字" />
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
              <span class="prop-name">loading</span>
              <span class="help-text">是否显示加载中</span>
            </div>
            <el-switch v-model="cfg.loading" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">beforeChange</span>
              <span class="help-text">切换前的钩子函数</span>
            </div>
            <el-switch v-model="cfg.beforeChange" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">validateEvent</span>
              <span class="help-text">是否触发表单验证</span>
            </div>
            <el-switch v-model="cfg.validateEvent" />
          </div>
        </div>

        <!-- 样式属性 -->
        <div class="form-section">
          <div class="section-title">样式属性</div>
          
          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">activeColor</span>
              <span class="help-text">激活时的颜色</span>
            </div>
            <el-color-picker v-model="cfg.activeColor" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">inactiveColor</span>
              <span class="help-text">非激活时的颜色</span>
            </div>
            <el-color-picker v-model="cfg.inactiveColor" />
          </div>
        </div>

        <!-- 使用说明 -->
        <div class="form-section">
          <div class="section-title">使用说明</div>
          
          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">基础用法</span>
              <span class="help-text">开关的基本使用方式</span>
            </div>
            <div class="code-block">
              <pre><code>&lt;el-switch v-model="value" /&gt;</code></pre>
            </div>
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">带文字描述</span>
              <span class="help-text">为开关添加文字描述</span>
            </div>
            <div class="code-block">
              <pre><code>&lt;el-switch
  v-model="value"
  active-text="开启"
  inactive-text="关闭"
/&gt;</code></pre>
            </div>
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">禁用状态</span>
              <span class="help-text">设置开关为禁用状态</span>
            </div>
            <div class="code-block">
              <pre><code>&lt;el-switch v-model="value" disabled /&gt;</code></pre>
            </div>
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">加载状态</span>
              <span class="help-text">显示加载中的开关</span>
            </div>
            <div class="code-block">
              <pre><code>&lt;el-switch v-model="value" loading /&gt;</code></pre>
            </div>
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">自定义颜色</span>
              <span class="help-text">自定义开关的颜色</span>
            </div>
            <div class="code-block">
              <pre><code>&lt;el-switch
  v-model="value"
  active-color="#13ce66"
  inactive-color="#ff4949"
/&gt;</code></pre>
            </div>
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">不同尺寸</span>
              <span class="help-text">设置开关的尺寸</span>
            </div>
            <div class="code-block">
              <pre><code>&lt;el-switch v-model="value" size="large" /&gt;
&lt;el-switch v-model="value" size="default" /&gt;
&lt;el-switch v-model="value" size="small" /&gt;</code></pre>
            </div>
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">自定义值</span>
              <span class="help-text">使用自定义的激活和非激活值</span>
            </div>
            <div class="code-block">
              <pre><code>&lt;el-switch
  v-model="value"
  active-value="on"
  inactive-value="off"
/&gt;</code></pre>
            </div>
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">切换前确认</span>
              <span class="help-text">在切换前进行确认</span>
            </div>
            <div class="code-block">
              <pre><code>&lt;el-switch
  v-model="value"
  :before-change="beforeChange"
/&gt;

&lt;script setup&gt;
const beforeChange = () => {
  return new Promise((resolve) => {
    // 确认逻辑
    resolve(true)
  })
}
&lt;/script&gt;</code></pre>
            </div>
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">事件处理</span>
              <span class="help-text">监听开关变化事件</span>
            </div>
            <div class="code-block">
              <pre><code>&lt;el-switch
  v-model="value"
  @change="handleChange"
  @click="handleClick"
/&gt;

&lt;script setup&gt;
const handleChange = (value) => {
  console.log('开关状态:', value)
}

const handleClick = (event) => {
  console.log('开关点击:', event)
}
&lt;/script&gt;</code></pre>
            </div>
          </div>
        </div>

        <!-- 值属性 -->
        <div class="form-section">
          <div class="section-title">值属性</div>
          
          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">activeValue</span>
              <span class="help-text">激活时的值</span>
            </div>
            <el-input v-model="cfg.activeValue" placeholder="请输入激活值" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">inactiveValue</span>
              <span class="help-text">非激活时的值</span>
            </div>
            <el-input v-model="cfg.inactiveValue" placeholder="请输入非激活值" />
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
const value = ref(true)

// 配置对象
const cfg = reactive({
  size: 'default',
  disabled: false,
  loading: false,
  beforeChange: false,
  activeText: '开启',
  inactiveText: '关闭',
  activeColor: '#409eff',
  inactiveColor: '#c0c4cc',
  activeValue: true,
  inactiveValue: false,
  name: 'switch',
  validateEvent: true
})

// 事件处理
const handleChange = (value) => {
  console.log('开关值改变:', value)
  ElMessage.success(`开关状态: ${value ? '开启' : '关闭'}`)
}

const handleClick = (event) => {
  console.log('开关点击:', event)
}

// 切换前的钩子函数
const beforeChangeHandler = () => {
  return new Promise((resolve) => {
    ElMessage.info('正在切换...')
    setTimeout(() => {
      resolve(true)
    }, 1000)
  })
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

.switch-group {
  display: flex;
  flex-direction: column;
  gap: 15px;
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
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 4px;
  padding: 12px;
  margin: 8px 0;
}

.code-block pre {
  margin: 0;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  line-height: 1.4;
}
</style>
