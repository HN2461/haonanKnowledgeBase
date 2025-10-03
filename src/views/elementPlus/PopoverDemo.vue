<template>
  <div class="popover-demo">
    <div class="demo-header">
      <h1>Popover 弹出框</h1>
      <p>Popover 与 Tooltip 类似，Popover 除了可以像 Tooltip 一样显示提示信息外，还可以显示更多内容。</p>
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
          <el-popover
            :visible="cfg.visible"
            :placement="cfg.placement"
            :width="cfg.width"
            :trigger="cfg.trigger"
            :title="cfg.title"
            :content="cfg.content"
            :disabled="cfg.disabled"
            :hide-after="cfg.hideAfter"
            :show-after="cfg.showAfter"
            :popper-class="cfg.popperClass"
            :popper-style="cfg.popperStyle"
            :show-arrow="cfg.showArrow"
            :offset="cfg.offset"
            :transition="cfg.transition"
            :persistent="cfg.persistent"
            @show="handleShow"
            @hide="handleHide"
            @before-show="handleBeforeShow"
            @before-hide="handleBeforeHide"
          >
            <template #reference>
              <el-button type="primary">点击触发</el-button>
            </template>
          </el-popover>
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
            <el-popover
              placement="top"
              title="标题"
              content="这是通过点击触发的弹出框"
              trigger="click"
            >
              <template #reference>
                <el-button>点击触发</el-button>
              </template>
            </el-popover>

            <el-popover
              placement="top"
              title="标题"
              content="这是通过悬停触发的弹出框"
              trigger="hover"
            >
              <template #reference>
                <el-button>悬停触发</el-button>
              </template>
            </el-popover>

            <el-popover
              placement="top"
              title="标题"
              content="这是通过聚焦触发的弹出框"
              trigger="focus"
            >
              <template #reference>
                <el-input placeholder="聚焦触发" />
              </template>
            </el-popover>

            <el-popover
              placement="top"
              title="标题"
              content="这是手动控制的弹出框"
              trigger="manual"
              v-model:visible="manualVisible"
            >
              <template #reference>
                <el-button @click="manualVisible = !manualVisible">
                  {{ manualVisible ? '关闭' : '打开' }}
                </el-button>
              </template>
            </el-popover>
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
            <el-popover
              v-for="placement in placements"
              :key="placement"
              :placement="placement"
              :title="placement"
              content="这是弹出框内容"
              trigger="hover"
            >
              <template #reference>
                <el-button class="placement-btn">{{ placement }}</el-button>
              </template>
            </el-popover>
          </div>
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
          <el-popover
            placement="top"
            :width="300"
            trigger="click"
          >
            <template #reference>
              <el-button type="success">自定义内容</el-button>
            </template>
            <template #default>
              <div class="custom-content">
                <h4>自定义标题</h4>
                <p>这是一个自定义的弹出框内容，可以包含任何HTML元素。</p>
                <el-button type="primary" size="small">操作按钮</el-button>
                <el-button size="small">取消</el-button>
              </div>
            </template>
          </el-popover>
        </div>
      </el-card>

      <!-- 嵌套弹出框 -->
      <el-card class="demo-card">
        <template #header>
          <div class="card-header">
            <span>嵌套弹出框</span>
          </div>
        </template>
        
        <div class="demo-section">
          <el-popover
            placement="top"
            title="父弹出框"
            content="这是父弹出框的内容"
            trigger="click"
            :visible="parentVisible"
            @update:visible="parentVisible = $event"
          >
            <template #reference>
              <el-button type="warning">父弹出框</el-button>
            </template>
            <template #default>
              <div>
                <p>父弹出框内容</p>
                <el-popover
                  placement="right"
                  title="子弹出框"
                  content="这是嵌套的子弹出框"
                  trigger="click"
                  :visible="childVisible"
                  @update:visible="childVisible = $event"
                >
                  <template #reference>
                    <el-button size="small">子弹出框</el-button>
                  </template>
                </el-popover>
              </div>
            </template>
          </el-popover>
        </div>
      </el-card>
    </div>

    <!-- 属性设置抽屉 -->
    <el-drawer
      v-model="show"
      title="Popover 属性设置"
      direction="rtl"
      size="45%"
    >
      <div class="drawer-content">
        <el-form :model="cfg" label-width="120px">
          <el-form-item label="显示状态">
            <el-switch v-model="cfg.visible" />
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
          
          <el-form-item label="宽度">
            <el-input-number v-model="cfg.width" :min="100" :max="500" />
          </el-form-item>
          
          <el-form-item label="触发方式">
            <el-select v-model="cfg.trigger" placeholder="选择触发方式">
              <el-option label="点击" value="click" />
              <el-option label="悬停" value="hover" />
              <el-option label="聚焦" value="focus" />
              <el-option label="手动" value="manual" />
            </el-select>
          </el-form-item>
          
          <el-form-item label="标题">
            <el-input v-model="cfg.title" placeholder="输入标题" />
          </el-form-item>
          
          <el-form-item label="内容">
            <el-input v-model="cfg.content" type="textarea" placeholder="输入内容" />
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
          
          <el-form-item label="持久化">
            <el-switch v-model="cfg.persistent" />
          </el-form-item>
        </el-form>

        <!-- 使用说明 -->
        <div class="usage-section">
          <h3>使用说明</h3>
          
          <div class="code-block">
            <h4>基础用法</h4>
            <pre><code>&lt;el-popover
  placement="top"
  title="标题"
  content="这是弹出框内容"
  trigger="click"
&gt;
  &lt;template #reference&gt;
    &lt;el-button&gt;点击触发&lt;/el-button&gt;
  &lt;/template&gt;
&lt;/el-popover&gt;</code></pre>
          </div>

          <div class="code-block">
            <h4>不同触发方式</h4>
            <pre><code>&lt;!-- 点击触发 --&gt;
&lt;el-popover trigger="click"&gt;...&lt;/el-popover&gt;

&lt;!-- 悬停触发 --&gt;
&lt;el-popover trigger="hover"&gt;...&lt;/el-popover&gt;

&lt;!-- 聚焦触发 --&gt;
&lt;el-popover trigger="focus"&gt;...&lt;/el-popover&gt;

&lt;!-- 手动控制 --&gt;
&lt;el-popover trigger="manual" v-model:visible="visible"&gt;...&lt;/el-popover&gt;</code></pre>
          </div>

          <div class="code-block">
            <h4>自定义内容</h4>
            <pre><code>&lt;el-popover placement="top" :width="300"&gt;
  &lt;template #reference&gt;
    &lt;el-button&gt;自定义内容&lt;/el-button&gt;
  &lt;/template&gt;
  &lt;template #default&gt;
    &lt;div&gt;
      &lt;h4&gt;自定义标题&lt;/h4&gt;
      &lt;p&gt;自定义内容&lt;/p&gt;
      &lt;el-button&gt;操作按钮&lt;/el-button&gt;
    &lt;/div&gt;
  &lt;/template&gt;
&lt;/el-popover&gt;</code></pre>
          </div>

          <div class="code-block">
            <h4>主要属性</h4>
            <pre><code>// 显示状态
visible: Boolean

// 弹出位置
placement: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end'

// 触发方式
trigger: 'click' | 'hover' | 'focus' | 'manual'

// 宽度
width: String | Number

// 标题和内容
title: String
content: String

// 延迟时间
show-after: Number
hide-after: Number

// 其他选项
disabled: Boolean
show-arrow: Boolean
offset: Number
persistent: Boolean</code></pre>
          </div>

          <div class="code-block">
            <h4>事件</h4>
            <pre><code>// 显示事件
@show="handleShow"
@before-show="handleBeforeShow"

// 隐藏事件
@hide="handleHide"
@before-hide="handleBeforeHide</code></pre>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'

// 抽屉显示状态
const show = ref(false)

// 手动控制状态
const manualVisible = ref(false)
const parentVisible = ref(false)
const childVisible = ref(false)

// 弹出位置选项
const placements = [
  'top', 'top-start', 'top-end',
  'bottom', 'bottom-start', 'bottom-end',
  'left', 'left-start', 'left-end',
  'right', 'right-start', 'right-end'
]

// 配置对象
const cfg = reactive({
  visible: false,
  placement: 'top',
  width: 200,
  trigger: 'click',
  title: '弹出框标题',
  content: '这是弹出框的内容',
  disabled: false,
  showAfter: 0,
  hideAfter: 200,
  popperClass: '',
  popperStyle: {},
  showArrow: true,
  offset: 12,
  transition: 'el-fade-in-linear',
  persistent: false
})

// 事件处理
const handleShow = () => {
  ElMessage.success('弹出框显示')
}

const handleHide = () => {
  ElMessage.info('弹出框隐藏')
}

const handleBeforeShow = () => {
  ElMessage.info('弹出框即将显示')
}

const handleBeforeHide = () => {
  ElMessage.info('弹出框即将隐藏')
}

const openDrawer = () => {
  show.value = true
}
</script>

<style scoped>
.popover-demo {
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

.custom-content {
  padding: 10px;
}

.custom-content h4 {
  margin: 0 0 10px 0;
  color: #303133;
}

.custom-content p {
  margin: 0 0 15px 0;
  color: #606266;
  font-size: 14px;
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
