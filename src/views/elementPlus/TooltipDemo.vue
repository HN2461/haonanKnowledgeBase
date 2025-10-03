<template>
  <div class="tooltip-demo">
    <div class="demo-header">
      <h1>Tooltip 文字提示</h1>
      <p>常用于展示鼠标 hover 时的提示信息。常用于展示鼠标 hover 时的提示信息。</p>
    </div>

    <div class="demo-content">
      <!-- 基础用法 -->
      <el-card class="demo-card">
        <template #header>
          <div class="card-header">
            <span>基础用法</span>
            <el-button type="primary" @click="openDrawer">属性设置</el-button>
          </div>
        </template>
        
        <div class="demo-section">
          <el-tooltip
            :content="cfg.content"
            :placement="cfg.placement"
            :effect="cfg.effect"
            :disabled="cfg.disabled"
            :hide-after="cfg.hideAfter"
            :show-after="cfg.showAfter"
            :popper-class="cfg.popperClass"
            :popper-style="cfg.popperStyle"
            :show-arrow="cfg.showArrow"
            :offset="cfg.offset"
            :transition="cfg.transition"
            :enterable="cfg.enterable"
            :raw-content="cfg.rawContent"
            @show="handleShow"
            @hide="handleHide"
            @before-show="handleBeforeShow"
            @before-hide="handleBeforeHide"
          >
            <el-button>悬停显示提示</el-button>
          </el-tooltip>
        </div>
      </el-card>

      <!-- 不同主题 -->
      <el-card class="demo-card">
        <template #header>
          <div class="card-header">
            <span>不同主题</span>
          </div>
        </template>
        
        <div class="demo-section">
          <el-space wrap>
            <el-tooltip content="Dark theme" effect="dark">
              <el-button>Dark</el-button>
            </el-tooltip>

            <el-tooltip content="Light theme" effect="light">
              <el-button>Light</el-button>
            </el-tooltip>
          </el-space>
        </div>
      </el-card>

      <!-- 不同位置 -->
      <el-card class="demo-card">
        <template #header>
          <div class="card-header">
            <span>不同位置</span>
          </div>
        </template>
        
        <div class="demo-section">
          <div class="placement-demo">
            <el-tooltip
              v-for="placement in placements"
              :key="placement"
              :placement="placement"
              :content="`${placement} 位置`"
              effect="dark"
            >
              <el-button class="placement-btn">{{ placement }}</el-button>
            </el-tooltip>
          </div>
        </div>
      </el-card>

      <!-- 不同触发方式 -->
      <el-card class="demo-card">
        <template #header>
          <div class="card-header">
            <span>不同触发方式</span>
          </div>
        </template>
        
        <div class="demo-section">
          <el-space wrap>
            <el-tooltip content="悬停触发" trigger="hover">
              <el-button>悬停触发</el-button>
            </el-tooltip>

            <el-tooltip content="点击触发" trigger="click">
              <el-button>点击触发</el-button>
            </el-tooltip>

            <el-tooltip content="聚焦触发" trigger="focus">
              <el-input placeholder="聚焦触发" />
            </el-tooltip>

            <el-tooltip content="手动控制" trigger="manual" v-model:visible="manualVisible">
              <el-button @click="manualVisible = !manualVisible">
                {{ manualVisible ? '关闭' : '打开' }}
              </el-button>
            </el-tooltip>
          </el-space>
        </div>
      </el-card>

      <!-- 自定义内容 -->
      <el-card class="demo-card">
        <template #header>
          <div class="card-header">
            <span>自定义内容</span>
          </div>
        </template>
        
        <div class="demo-section">
          <el-tooltip placement="top" effect="dark">
            <template #content>
              <div class="custom-tooltip">
                <h4>自定义标题</h4>
                <p>这是自定义的提示内容</p>
                <el-button size="small" type="primary">操作</el-button>
              </div>
            </template>
            <el-button type="success">自定义内容</el-button>
          </el-tooltip>
        </div>
      </el-card>

      <!-- 多行文本 -->
      <el-card class="demo-card">
        <template #header>
          <div class="card-header">
            <span>多行文本</span>
          </div>
        </template>
        
        <div class="demo-section">
          <el-tooltip
            content="这是一段很长的提示文本，用来演示多行文本的显示效果。当文本内容超过一定长度时，会自动换行显示。"
            placement="top"
            effect="dark"
            :show-after="500"
          >
            <el-button>多行文本</el-button>
          </el-tooltip>
        </div>
      </el-card>

      <!-- 禁用状态 -->
      <el-card class="demo-card">
        <template #header>
          <div class="card-header">
            <span>禁用状态</span>
          </div>
        </template>
        
        <div class="demo-section">
          <el-space wrap>
            <el-tooltip content="正常状态" effect="dark">
              <el-button>正常状态</el-button>
            </el-tooltip>

            <el-tooltip content="禁用状态" effect="dark" :disabled="true">
              <el-button>禁用状态</el-button>
            </el-tooltip>
          </el-space>
        </div>
      </el-card>

      <!-- 在表单中使用 -->
      <el-card class="demo-card">
        <template #header>
          <div class="card-header">
            <span>在表单中使用</span>
          </div>
        </template>
        
        <div class="demo-section">
          <el-form :model="form" label-width="100px" style="max-width: 400px;">
            <el-form-item label="用户名">
              <el-input v-model="form.username" placeholder="请输入用户名">
                <template #suffix>
                  <el-tooltip content="用户名长度应为3-20个字符" placement="top">
                    <el-icon><QuestionFilled /></el-icon>
                  </el-tooltip>
                </template>
              </el-input>
            </el-form-item>
            
            <el-form-item label="密码">
              <el-input v-model="form.password" type="password" placeholder="请输入密码">
                <template #suffix>
                  <el-tooltip content="密码应包含字母、数字和特殊字符" placement="top">
                    <el-icon><QuestionFilled /></el-icon>
                  </el-tooltip>
                </template>
              </el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>

    <!-- 属性设置抽屉 -->
    <el-drawer
      v-model="show"
      title="Tooltip 属性设置"
      direction="rtl"
      size="45%"
    >
      <div class="drawer-content">
        <el-form :model="cfg" label-width="120px">
          <el-form-item label="提示内容">
            <el-input v-model="cfg.content" placeholder="输入提示内容" />
          </el-form-item>
          
          <el-form-item label="弹出位置">
            <el-select v-model="cfg.placement" placeholder="选择位置">
              <el-option
                v-for="placement in placements"
                :key="placement"
                :label="placement"
                :value="placement"
              />
            </el-select>
          </el-form-item>
          
          <el-form-item label="主题">
            <el-select v-model="cfg.effect" placeholder="选择主题">
              <el-option label="Dark" value="dark" />
              <el-option label="Light" value="light" />
            </el-select>
          </el-form-item>
          
          <el-form-item label="禁用状态">
            <el-switch v-model="cfg.disabled" />
          </el-form-item>
          
          <el-form-item label="显示延迟">
            <el-input-number v-model="cfg.showAfter" :min="0" :max="2000" />
          </el-form-item>
          
          <el-form-item label="隐藏延迟">
            <el-input-number v-model="cfg.hideAfter" :min="0" :max="2000" />
          </el-form-item>
          
          <el-form-item label="显示箭头">
            <el-switch v-model="cfg.showArrow" />
          </el-form-item>
          
          <el-form-item label="偏移量">
            <el-input-number v-model="cfg.offset" :min="0" :max="50" />
          </el-form-item>
          
          <el-form-item label="可进入">
            <el-switch v-model="cfg.enterable" />
          </el-form-item>
          
          <el-form-item label="原始内容">
            <el-switch v-model="cfg.rawContent" />
          </el-form-item>
        </el-form>

        <!-- 使用说明 -->
        <div class="usage-section">
          <h3>使用说明</h3>
          
          <div class="code-block">
            <h4>基础用法</h4>
            <pre><code>&lt;el-tooltip content="提示内容" placement="top"&gt;
  &lt;el-button&gt;悬停显示&lt;/el-button&gt;
&lt;/el-tooltip&gt;</code></pre>
          </div>

          <div class="code-block">
            <h4>不同主题</h4>
            <pre><code>&lt;!-- Dark 主题 --&gt;
&lt;el-tooltip content="Dark theme" effect="dark"&gt;
  &lt;el-button&gt;Dark&lt;/el-button&gt;
&lt;/el-tooltip&gt;

&lt;!-- Light 主题 --&gt;
&lt;el-tooltip content="Light theme" effect="light"&gt;
  &lt;el-button&gt;Light&lt;/el-button&gt;
&lt;/el-tooltip&gt;</code></pre>
          </div>

          <div class="code-block">
            <h4>不同触发方式</h4>
            <pre><code>&lt;!-- 悬停触发 --&gt;
&lt;el-tooltip content="悬停触发" trigger="hover"&gt;...&lt;/el-tooltip&gt;

&lt;!-- 点击触发 --&gt;
&lt;el-tooltip content="点击触发" trigger="click"&gt;...&lt;/el-tooltip&gt;

&lt;!-- 聚焦触发 --&gt;
&lt;el-tooltip content="聚焦触发" trigger="focus"&gt;...&lt;/el-tooltip&gt;

&lt;!-- 手动控制 --&gt;
&lt;el-tooltip content="手动控制" trigger="manual" v-model:visible="visible"&gt;...&lt;/el-tooltip&gt;</code></pre>
          </div>

          <div class="code-block">
            <h4>自定义内容</h4>
            <pre><code>&lt;el-tooltip placement="top" effect="dark"&gt;
  &lt;template #content&gt;
    &lt;div&gt;
      &lt;h4&gt;自定义标题&lt;/h4&gt;
      &lt;p&gt;自定义内容&lt;/p&gt;
      &lt;el-button size="small"&gt;操作&lt;/el-button&gt;
    &lt;/div&gt;
  &lt;/template&gt;
  &lt;el-button&gt;自定义内容&lt;/el-button&gt;
&lt;/el-tooltip&gt;</code></pre>
          </div>

          <div class="code-block">
            <h4>主要属性</h4>
            <pre><code>// 提示内容
content: String

// 弹出位置
placement: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end'

// 主题
effect: 'dark' | 'light'

// 触发方式
trigger: 'hover' | 'click' | 'focus' | 'manual'

// 延迟时间
show-after: Number
hide-after: Number

// 其他选项
disabled: Boolean
show-arrow: Boolean
offset: Number
enterable: Boolean
raw-content: Boolean</code></pre>
          </div>

          <div class="code-block">
            <h4>事件</h4>
            <pre><code>// 显示事件
@show="handleShow"
@before-show="handleBeforeShow"

// 隐藏事件
@hide="handleHide"
@before-hide="handleBeforeHide"</code></pre>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { QuestionFilled } from '@element-plus/icons-vue'

// 抽屉显示状态
const show = ref(false)

// 手动控制状态
const manualVisible = ref(false)

// 表单数据
const form = reactive({
  username: '',
  password: ''
})

// 弹出位置选项
const placements = [
  'top', 'top-start', 'top-end',
  'bottom', 'bottom-start', 'bottom-end',
  'left', 'left-start', 'left-end',
  'right', 'right-start', 'right-end'
]

// 配置对象
const cfg = reactive({
  content: '这是提示内容',
  placement: 'top',
  effect: 'dark',
  disabled: false,
  showAfter: 0,
  hideAfter: 200,
  popperClass: '',
  popperStyle: {},
  showArrow: true,
  offset: 12,
  transition: 'el-fade-in-linear',
  enterable: true,
  rawContent: false
})

// 事件处理
const handleShow = () => {
  ElMessage.success('提示显示')
}

const handleHide = () => {
  ElMessage.info('提示隐藏')
}

const handleBeforeShow = () => {
  ElMessage.info('提示即将显示')
}

const handleBeforeHide = () => {
  ElMessage.info('提示即将隐藏')
}

const openDrawer = () => {
  show.value = true
}
</script>

<style scoped>
.tooltip-demo {
  padding: 20px;
}

.demo-header {
  margin-bottom: 30px;
}

.demo-header h1 {
  color: #303133;
  margin-bottom: 10px;
}

.demo-header p {
  color: #606266;
  font-size: 14px;
  line-height: 1.6;
}

.demo-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.demo-section {
  padding: 20px 0;
}

.placement-demo {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  max-width: 600px;
}

.placement-btn {
  width: 100%;
}

.custom-tooltip {
  padding: 8px;
}

.custom-tooltip h4 {
  margin: 0 0 8px 0;
  color: #fff;
  font-size: 14px;
}

.custom-tooltip p {
  margin: 0 0 10px 0;
  color: #fff;
  font-size: 12px;
}

.drawer-content {
  padding: 20px;
}

.usage-section {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #e4e7ed;
}

.usage-section h3 {
  color: #303133;
  margin-bottom: 15px;
}

.code-block {
  margin-bottom: 20px;
}

.code-block h4 {
  color: #409eff;
  margin-bottom: 8px;
  font-size: 14px;
}

.code-block pre {
  background: #f5f7fa;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  padding: 12px;
  margin: 0;
  overflow-x: auto;
  max-width: 100%;
}

.code-block pre code {
  color: #303133;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  line-height: 1.5;
  white-space: pre;
  overflow-x: auto;
  min-width: max-content;
}
</style>
