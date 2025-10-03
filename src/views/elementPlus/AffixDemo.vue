<template>
  <div class="demo-container">
    <div class="demo-header">
      <h2>固钉 Affix</h2>
      <p>将页面元素钉在可视范围，常用于导航栏、按钮组等需要固定在页面某个位置的元素</p>
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
          <h4>固钉演示</h4>
          <el-affix
            :offset="cfg.offset"
            :position="cfg.position"
            :target="cfg.target ? targetElement : undefined"
            :z-index="cfg.zIndex"
            @change="handleChange"
            @scroll="handleScroll"
          >
            <el-button type="primary">固定在顶部</el-button>
          </el-affix>
        </div>

        <div class="demo-section">
          <h4>不同位置演示</h4>
          <div class="affix-group">
            <el-affix :offset="20" position="top">
              <el-button type="success">顶部固定</el-button>
            </el-affix>
            <el-affix :offset="20" position="bottom">
              <el-button type="warning">底部固定</el-button>
            </el-affix>
          </div>
        </div>

        <div class="demo-section">
          <h4>不同偏移量演示</h4>
          <div class="affix-group">
            <el-affix :offset="0" position="top">
              <el-button type="info">无偏移</el-button>
            </el-affix>
            <el-affix :offset="50" position="top">
              <el-button type="primary">50px偏移</el-button>
            </el-affix>
            <el-affix :offset="100" position="top">
              <el-button type="success">100px偏移</el-button>
            </el-affix>
          </div>
        </div>

        <div class="demo-section">
          <h4>状态显示</h4>
          <p><strong>偏移量：</strong>{{ cfg.offset }}px</p>
          <p><strong>位置：</strong>{{ cfg.position }}</p>
          <p><strong>目标元素：</strong>{{ cfg.target ? '自定义' : '默认' }}</p>
          <p><strong>层级：</strong>{{ cfg.zIndex }}</p>
        </div>

        <!-- 用于演示的滚动内容 -->
        <div class="scroll-content">
          <h4>滚动内容区域</h4>
          <p>这是一个用于演示固钉效果的滚动内容区域。</p>
          <p>当您滚动页面时，固钉元素会保持在指定位置。</p>
          <div v-for="i in 20" :key="i" class="content-item">
            <h5>内容块 {{ i }}</h5>
            <p>这是第 {{ i }} 个内容块，用于演示滚动效果。当页面滚动时，固钉元素会保持在指定位置。</p>
          </div>
        </div>
      </el-card>
    </div>

    <!-- 属性设置抽屉 -->
    <el-drawer
      v-model="showSettings"
      title="固钉属性设置"
      direction="rtl"
      size="45%"
    >
      <div class="settings-container">
        <!-- 使用说明 -->
        <div class="form-section">
          <div class="section-title">使用说明</div>
          
          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">基础用法</span>
              <span class="help-text">固钉的基本使用方式</span>
            </div>
            <div class="code-block">
              <pre><code>&lt;el-affix :offset="0"&gt;
  &lt;el-button type="primary"&gt;固定在顶部&lt;/el-button&gt;
&lt;/el-affix&gt;</code></pre>
            </div>
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">不同位置</span>
              <span class="help-text">固定在顶部或底部</span>
            </div>
            <div class="code-block">
              <pre><code>&lt;!-- 固定在顶部 --&gt;
&lt;el-affix :offset="20" position="top"&gt;
  &lt;el-button type="success"&gt;顶部固定&lt;/el-button&gt;
&lt;/el-affix&gt;

&lt;!-- 固定在底部 --&gt;
&lt;el-affix :offset="20" position="bottom"&gt;
  &lt;el-button type="warning"&gt;底部固定&lt;/el-button&gt;
&lt;/el-affix&gt;</code></pre>
            </div>
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">偏移距离</span>
              <span class="help-text">设置固定位置的偏移距离</span>
            </div>
            <div class="code-block">
              <pre><code>&lt;el-affix :offset="50"&gt;
  &lt;el-button&gt;50px偏移&lt;/el-button&gt;
&lt;/el-affix&gt;

&lt;el-affix :offset="100"&gt;
  &lt;el-button&gt;100px偏移&lt;/el-button&gt;
&lt;/el-affix&gt;</code></pre>
            </div>
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">指定容器</span>
              <span class="help-text">指定固钉的容器元素</span>
            </div>
            <div class="code-block">
              <pre><code>&lt;div ref="container"&gt;
  &lt;el-affix :target="container"&gt;
    &lt;el-button&gt;容器内固定&lt;/el-button&gt;
  &lt;/el-affix&gt;
&lt;/div&gt;</code></pre>
            </div>
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">层级设置</span>
              <span class="help-text">设置固钉元素的层级</span>
            </div>
            <div class="code-block">
              <pre><code>&lt;el-affix :z-index="1000"&gt;
  &lt;el-button&gt;高层级固定&lt;/el-button&gt;
&lt;/el-affix&gt;</code></pre>
            </div>
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">事件处理</span>
              <span class="help-text">监听固钉状态变化</span>
            </div>
            <div class="code-block">
              <pre><code>&lt;el-affix
  :offset="0"
  @change="handleChange"
  @scroll="handleScroll"
&gt;
  &lt;el-button&gt;固定按钮&lt;/el-button&gt;
&lt;/el-affix&gt;

&lt;script setup&gt;
const handleChange = (fixed) => {
  console.log('固钉状态:', fixed ? '已固定' : '未固定')
}

const handleScroll = (event) => {
  console.log('滚动事件:', event)
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
              <span class="prop-name">offset</span>
              <span class="help-text">偏移距离</span>
            </div>
            <el-input-number v-model="cfg.offset" :min="0" :max="500" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">position</span>
              <span class="help-text">固钉位置</span>
            </div>
            <el-radio-group v-model="cfg.position">
              <el-radio-button label="top">top</el-radio-button>
              <el-radio-button label="bottom">bottom</el-radio-button>
            </el-radio-group>
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">zIndex</span>
              <span class="help-text">层级</span>
            </div>
            <el-input-number v-model="cfg.zIndex" :min="0" :max="9999" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">target</span>
              <span class="help-text">指定容器</span>
            </div>
            <el-switch v-model="cfg.target" />
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
const targetElement = ref(null)

// 配置对象
const cfg = reactive({
  offset: 0,
  position: 'top',
  zIndex: 100,
  target: false
})

// 事件处理
const handleChange = (fixed) => {
  console.log('固钉状态改变:', fixed)
  ElMessage.success(`固钉状态: ${fixed ? '已固定' : '未固定'}`)
}

const handleScroll = (event) => {
  console.log('滚动事件:', event)
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

.affix-group {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.scroll-content {
  margin-top: 40px;
  padding: 20px;
  background: #f5f7fa;
  border-radius: 4px;
}

.scroll-content h4 {
  margin: 0 0 15px 0;
  color: #303133;
}

.scroll-content p {
  margin: 0 0 15px 0;
  color: #606266;
}

.content-item {
  margin-bottom: 20px;
  padding: 15px;
  background: #fff;
  border-radius: 4px;
  border: 1px solid #e4e7ed;
}

.content-item h5 {
  margin: 0 0 10px 0;
  color: #303133;
  font-size: 16px;
}

.content-item p {
  margin: 0;
  color: #606266;
  line-height: 1.6;
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
