<template>
  <div class="demo-container">
    <div class="demo-header">
      <h2>折叠面板 Collapse</h2>
      <p>通过折叠面板收纳内容区域，支持手风琴模式</p>
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
          <h4>折叠面板演示</h4>
          <el-collapse
            v-model="activeNames"
            :accordion="cfg.accordion"
            @change="handleChange"
        >
          <el-collapse-item
            v-for="item in collapseItems"
            :key="item.name"
            :title="item.title"
            :name="item.name"
            :disabled="item.disabled"
        >
          <template #title v-if="cfg.customTitle">
            <span style="color: #409eff;">{{ item.title }}</span>
          </template>
          {{ item.content }}
        </el-collapse-item>
        </el-collapse>
        </div>

        <div class="demo-section">
          <h4>手风琴模式演示</h4>
          <el-collapse v-model="accordionActive" accordion>
            <el-collapse-item title="一致性 Consistency" name="1">
              <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
              <div>在界面中一致：所有的元素和结构需保持一致，设计语言、交互模式、视觉风格应保持一致；</div>
            </el-collapse-item>
            <el-collapse-item title="反馈 Feedback" name="2">
              <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
              <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
            </el-collapse-item>
            <el-collapse-item title="效率 Efficiency" name="3">
              <div>简化流程：设计简洁直观的操作流程；</div>
              <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
              <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
            </el-collapse-item>
          </el-collapse>
        </div>

        <div class="demo-section">
          <h4>状态显示</h4>
          <p><strong>当前激活：</strong>{{ activeNames }}</p>
          <p><strong>手风琴模式：</strong>{{ cfg.accordion ? '是' : '否' }}</p>
          <p><strong>自定义标题：</strong>{{ cfg.customTitle ? '是' : '否' }}</p>
        </div>
      </el-card>
    </div>

    <!-- 属性设置抽屉 -->
    <el-drawer
      v-model="showSettings"
      title="折叠面板属性设置"
      direction="rtl"
      size="45%"
    >
      <div class="settings-container">
        <!-- 基础属性 -->
        <div class="form-section">
          <div class="section-title">基础属性</div>
          
          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">accordion</span>
              <span class="help-text">是否手风琴模式</span>
            </div>
            <el-switch v-model="cfg.accordion" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">customTitle</span>
              <span class="help-text">是否自定义标题</span>
            </div>
            <el-switch v-model="cfg.customTitle" />
          </div>
        </div>

        <!-- 使用说明 -->
        <div class="form-section">
          <div class="section-title">使用说明</div>
          
          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">基础用法</span>
              <span class="help-text">折叠面板的基本使用方式</span>
            </div>
            <div class="code-block">
              <pre><code>&lt;el-collapse v-model="activeNames"&gt;
  &lt;el-collapse-item title="一致性 Consistency" name="1"&gt;
    &lt;div&gt;与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；&lt;/div&gt;
  &lt;/el-collapse-item&gt;
  &lt;el-collapse-item title="反馈 Feedback" name="2"&gt;
    &lt;div&gt;控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；&lt;/div&gt;
  &lt;/el-collapse-item&gt;
&lt;/el-collapse&gt;</code></pre>
            </div>
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">手风琴模式</span>
              <span class="help-text">每次只能展开一个面板</span>
            </div>
            <div class="code-block">
              <pre><code>&lt;el-collapse v-model="activeName" accordion&gt;
  &lt;el-collapse-item title="一致性 Consistency" name="1"&gt;
    &lt;div&gt;内容1&lt;/div&gt;
  &lt;/el-collapse-item&gt;
  &lt;el-collapse-item title="反馈 Feedback" name="2"&gt;
    &lt;div&gt;内容2&lt;/div&gt;
  &lt;/el-collapse-item&gt;
&lt;/el-collapse&gt;</code></pre>
            </div>
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">禁用状态</span>
              <span class="help-text">设置面板为禁用状态</span>
            </div>
            <div class="code-block">
              <pre><code>&lt;el-collapse v-model="activeNames"&gt;
  &lt;el-collapse-item title="一致性 Consistency" name="1"&gt;
    &lt;div&gt;内容1&lt;/div&gt;
  &lt;/el-collapse-item&gt;
  &lt;el-collapse-item title="反馈 Feedback" name="2" disabled&gt;
    &lt;div&gt;内容2（禁用）&lt;/div&gt;
  &lt;/el-collapse-item&gt;
&lt;/el-collapse&gt;</code></pre>
            </div>
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">自定义标题</span>
              <span class="help-text">使用插槽自定义标题内容</span>
            </div>
            <div class="code-block">
              <pre><code>&lt;el-collapse v-model="activeNames"&gt;
  &lt;el-collapse-item name="1"&gt;
    &lt;template #title&gt;
      &lt;span style="color: #409eff;"&gt;自定义标题&lt;/span&gt;
    &lt;/template&gt;
    &lt;div&gt;内容&lt;/div&gt;
  &lt;/el-collapse-item&gt;
&lt;/el-collapse&gt;</code></pre>
            </div>
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">事件处理</span>
              <span class="help-text">监听面板展开/收起事件</span>
            </div>
            <div class="code-block">
              <pre><code>&lt;el-collapse v-model="activeNames" @change="handleChange"&gt;
  &lt;el-collapse-item title="一致性 Consistency" name="1"&gt;
    &lt;div&gt;内容1&lt;/div&gt;
  &lt;/el-collapse-item&gt;
&lt;/el-collapse&gt;

&lt;script setup&gt;
const handleChange = (val) => {
  console.log('当前激活的面板:', val)
}
&lt;/script&gt;</code></pre>
            </div>
          </div>
        </div>

        <!-- 面板管理 -->
        <div class="form-section">
          <div class="section-title">面板管理</div>
          
          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">面板</span>
              <span class="help-text">折叠面板列表</span>
            </div>
            <div class="collapse-container">
              <div v-for="(item, index) in collapseItems" :key="index" class="collapse-item">
                <el-input v-model="item.title" placeholder="面板标题" style="width: 150px;" />
                <el-input v-model="item.name" placeholder="面板名称" style="width: 120px;" />
                <el-input v-model="item.content" placeholder="面板内容" style="width: 200px;" />
                <el-switch v-model="item.disabled" />
                <el-button type="danger" size="small" @click="removeCollapseItem(index)">删除</el-button>
              </div>
              <el-button type="primary" @click="addCollapseItem">添加面板</el-button>
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
const activeNames = ref(['1'])
const accordionActive = ref('1')

// 配置对象
const cfg = reactive({
  accordion: false,
  customTitle: false
})

// 折叠面板数据
const collapseItems = ref([
  { title: '一致性 Consistency', name: '1', content: '与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；在界面中一致：所有的元素和结构需保持一致，设计语言、交互模式、视觉风格应保持一致；', disabled: false },
  { title: '反馈 Feedback', name: '2', content: '控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。', disabled: false },
  { title: '效率 Efficiency', name: '3', content: '简化流程：设计简洁直观的操作流程；清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。', disabled: false },
  { title: '可控 Controllability', name: '4', content: '用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。', disabled: true }
])

// 事件处理
const handleChange = (val) => {
  console.log('折叠面板改变:', val)
  ElMessage.success(`折叠面板改变: ${val}`)
}

// 面板管理
const addCollapseItem = () => {
  const newIndex = collapseItems.value.length + 1
  collapseItems.value.push({
    title: `面板${newIndex}`,
    name: `${newIndex}`,
    content: `这是面板${newIndex}的内容`,
    disabled: false
  })
}

const removeCollapseItem = (index) => {
  collapseItems.value.splice(index, 1)
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

.collapse-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.collapse-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background: #fff;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
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
