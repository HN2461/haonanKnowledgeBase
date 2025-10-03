<template>
  <div class="anchor-demo">
    <div class="demo-header">
      <h1>Anchor 锚点</h1>
      <p>用于跳转到页面指定位置的锚点组件。</p>
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
          <div class="anchor-container">
            <el-anchor
              :offset="cfg.offset"
              :bounds="cfg.bounds"
              :direction="cfg.direction"
              :target-offset="cfg.targetOffset"
              :show-tooltip="cfg.showTooltip"
              :clickable="cfg.clickable"
              :container="cfg.container"
              :marker="cfg.marker"
              @change="handleChange"
              @click="handleClick"
            >
              <el-anchor-link href="#basic" title="基础用法" />
              <el-anchor-link href="#placement" title="不同位置" />
              <el-anchor-link href="#custom" title="自定义内容" />
              <el-anchor-link href="#nested" title="嵌套锚点" />
            </el-anchor>
          </div>
        </div>
      </el-card>

      <!-- 不同位置 -->
      <el-card class="demo-card" id="placement">
        <template #header>
          <div class="card-header">
            <span>不同位置</span>
          </div>
        </template>
        
        <div class="demo-section">
          <div class="placement-demo">
            <div class="anchor-left">
              <el-anchor direction="vertical" :offset="20">
                <el-anchor-link href="#left-1" title="左侧锚点1" />
                <el-anchor-link href="#left-2" title="左侧锚点2" />
                <el-anchor-link href="#left-3" title="左侧锚点3" />
              </el-anchor>
            </div>
            
            <div class="anchor-right">
              <el-anchor direction="horizontal" :offset="20">
                <el-anchor-link href="#right-1" title="顶部锚点1" />
                <el-anchor-link href="#right-2" title="顶部锚点2" />
                <el-anchor-link href="#right-3" title="顶部锚点3" />
              </el-anchor>
            </div>
          </div>
        </div>
      </el-card>

      <!-- 自定义内容 -->
      <el-card class="demo-card" id="custom">
        <template #header>
          <div class="card-header">
            <span>自定义内容</span>
          </div>
        </template>
        
        <div class="demo-section">
          <el-anchor :offset="20" :show-tooltip="true">
            <el-anchor-link href="#custom-1" title="自定义标题1">
              <template #title>
                <span style="color: #409eff;">🎯 自定义标题1</span>
              </template>
            </el-anchor-link>
            <el-anchor-link href="#custom-2" title="自定义标题2">
              <template #title>
                <span style="color: #67c23a;">🚀 自定义标题2</span>
              </template>
            </el-anchor-link>
            <el-anchor-link href="#custom-3" title="自定义标题3">
              <template #title>
                <span style="color: #e6a23c;">⭐ 自定义标题3</span>
              </template>
            </el-anchor-link>
          </el-anchor>
        </div>
      </el-card>

      <!-- 嵌套锚点 -->
      <el-card class="demo-card" id="nested">
        <template #header>
          <div class="card-header">
            <span>嵌套锚点</span>
          </div>
        </template>
        
        <div class="demo-section">
          <el-anchor :offset="20">
            <el-anchor-link href="#nested-1" title="一级锚点1">
              <el-anchor-link href="#nested-1-1" title="二级锚点1-1" />
              <el-anchor-link href="#nested-1-2" title="二级锚点1-2" />
            </el-anchor-link>
            <el-anchor-link href="#nested-2" title="一级锚点2">
              <el-anchor-link href="#nested-2-1" title="二级锚点2-1" />
              <el-anchor-link href="#nested-2-2" title="二级锚点2-2" />
            </el-anchor-link>
          </el-anchor>
        </div>
      </el-card>

      <!-- 滚动容器 -->
      <el-card class="demo-card">
        <template #header>
          <div class="card-header">
            <span>滚动容器</span>
          </div>
        </template>
        
        <div class="demo-section">
          <div class="scroll-container" ref="scrollContainer">
            <el-anchor
              :container="scrollContainer"
              :offset="20"
              direction="vertical"
            >
              <el-anchor-link href="#scroll-1" title="滚动内容1" />
              <el-anchor-link href="#scroll-2" title="滚动内容2" />
              <el-anchor-link href="#scroll-3" title="滚动内容3" />
            </el-anchor>
            
            <div class="scroll-content">
              <div id="scroll-1" class="scroll-item">
                <h3>滚动内容1</h3>
                <p>这是滚动容器中的第一个内容区域。</p>
              </div>
              <div id="scroll-2" class="scroll-item">
                <h3>滚动内容2</h3>
                <p>这是滚动容器中的第二个内容区域。</p>
              </div>
              <div id="scroll-3" class="scroll-item">
                <h3>滚动内容3</h3>
                <p>这是滚动容器中的第三个内容区域。</p>
              </div>
            </div>
          </div>
        </div>
      </el-card>

      <!-- 内容区域 -->
      <div class="content-area">
        <div id="basic" class="content-section">
          <h2>基础用法</h2>
          <p>锚点组件用于快速定位到页面的指定位置。通过点击锚点链接，页面会自动滚动到对应的目标元素。</p>
        </div>

        <div id="left-1" class="content-section">
          <h2>左侧锚点1</h2>
          <p>这是左侧锚点1对应的内容区域。</p>
        </div>

        <div id="left-2" class="content-section">
          <h2>左侧锚点2</h2>
          <p>这是左侧锚点2对应的内容区域。</p>
        </div>

        <div id="left-3" class="content-section">
          <h2>左侧锚点3</h2>
          <p>这是左侧锚点3对应的内容区域。</p>
        </div>

        <div id="right-1" class="content-section">
          <h2>顶部锚点1</h2>
          <p>这是顶部锚点1对应的内容区域。</p>
        </div>

        <div id="right-2" class="content-section">
          <h2>顶部锚点2</h2>
          <p>这是顶部锚点2对应的内容区域。</p>
        </div>

        <div id="right-3" class="content-section">
          <h2>顶部锚点3</h2>
          <p>这是顶部锚点3对应的内容区域。</p>
        </div>

        <div id="custom-1" class="content-section">
          <h2>自定义内容1</h2>
          <p>这是自定义锚点1对应的内容区域。</p>
        </div>

        <div id="custom-2" class="content-section">
          <h2>自定义内容2</h2>
          <p>这是自定义锚点2对应的内容区域。</p>
        </div>

        <div id="custom-3" class="content-section">
          <h2>自定义内容3</h2>
          <p>这是自定义锚点3对应的内容区域。</p>
        </div>

        <div id="nested-1" class="content-section">
          <h2>嵌套锚点1</h2>
          <p>这是一级锚点1对应的内容区域。</p>
          
          <div id="nested-1-1" class="content-subsection">
            <h3>二级锚点1-1</h3>
            <p>这是二级锚点1-1对应的内容区域。</p>
          </div>
          
          <div id="nested-1-2" class="content-subsection">
            <h3>二级锚点1-2</h3>
            <p>这是二级锚点1-2对应的内容区域。</p>
          </div>
        </div>

        <div id="nested-2" class="content-section">
          <h2>嵌套锚点2</h2>
          <p>这是一级锚点2对应的内容区域。</p>
          
          <div id="nested-2-1" class="content-subsection">
            <h3>二级锚点2-1</h3>
            <p>这是二级锚点2-1对应的内容区域。</p>
          </div>
          
          <div id="nested-2-2" class="content-subsection">
            <h3>二级锚点2-2</h3>
            <p>这是二级锚点2-2对应的内容区域。</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 属性设置抽屉 -->
    <el-drawer
      v-model="show"
      title="Anchor 属性设置"
      direction="rtl"
      size="45%"
    >
      <div class="drawer-content">
        <el-form :model="cfg" label-width="120px">
          <el-form-item label="偏移量">
            <el-input-number v-model="cfg.offset" :min="0" :max="200" />
          </el-form-item>
          
          <el-form-item label="边界值">
            <el-input-number v-model="cfg.bounds" :min="0" :max="200" />
          </el-form-item>
          
          <el-form-item label="方向">
            <el-select v-model="cfg.direction" placeholder="选择方向">
              <el-option label="垂直" value="vertical" />
              <el-option label="水平" value="horizontal" />
            </el-select>
          </el-form-item>
          
          <el-form-item label="目标偏移">
            <el-input-number v-model="cfg.targetOffset" :min="0" :max="200" />
          </el-form-item>
          
          <el-form-item label="显示提示">
            <el-switch v-model="cfg.showTooltip" />
          </el-form-item>
          
          <el-form-item label="可点击">
            <el-switch v-model="cfg.clickable" />
          </el-form-item>
          
          <el-form-item label="显示标记">
            <el-switch v-model="cfg.marker" />
          </el-form-item>
        </el-form>

        <!-- 使用说明 -->
        <div class="usage-section">
          <h3>使用说明</h3>
          
          <div class="code-block">
            <h4>基础用法</h4>
            <pre><code>&lt;el-anchor :offset="20"&gt;
  &lt;el-anchor-link href="#basic" title="基础用法" /&gt;
  &lt;el-anchor-link href="#placement" title="不同位置" /&gt;
  &lt;el-anchor-link href="#custom" title="自定义内容" /&gt;
&lt;/el-anchor&gt;</code></pre>
          </div>

          <div class="code-block">
            <h4>不同方向</h4>
            <pre><code>&lt;!-- 垂直方向 --&gt;
&lt;el-anchor direction="vertical"&gt;...&lt;/el-anchor&gt;

&lt;!-- 水平方向 --&gt;
&lt;el-anchor direction="horizontal"&gt;...&lt;/el-anchor&gt;</code></pre>
          </div>

          <div class="code-block">
            <h4>自定义内容</h4>
            <pre><code>&lt;el-anchor-link href="#custom" title="自定义标题"&gt;
  &lt;template #title&gt;
    &lt;span style="color: #409eff;"&gt;🎯 自定义标题&lt;/span&gt;
  &lt;/template&gt;
&lt;/el-anchor-link&gt;</code></pre>
          </div>

          <div class="code-block">
            <h4>嵌套锚点</h4>
            <pre><code>&lt;el-anchor&gt;
  &lt;el-anchor-link href="#parent" title="父级锚点"&gt;
    &lt;el-anchor-link href="#child1" title="子级锚点1" /&gt;
    &lt;el-anchor-link href="#child2" title="子级锚点2" /&gt;
  &lt;/el-anchor-link&gt;
&lt;/el-anchor&gt;</code></pre>
          </div>

          <div class="code-block">
            <h4>滚动容器</h4>
            <pre><code>&lt;el-anchor :container="scrollContainer"&gt;
  &lt;el-anchor-link href="#content1" title="内容1" /&gt;
  &lt;el-anchor-link href="#content2" title="内容2" /&gt;
&lt;/el-anchor&gt;</code></pre>
          </div>

          <div class="code-block">
            <h4>主要属性</h4>
            <pre><code>// 偏移量
offset: Number

// 边界值
bounds: Number

// 方向
direction: 'vertical' | 'horizontal'

// 目标偏移
target-offset: Number

// 其他选项
show-tooltip: Boolean
clickable: Boolean
marker: Boolean
container: String | HTMLElement</code></pre>
          </div>

          <div class="code-block">
            <h4>事件</h4>
            <pre><code>// 锚点改变
@change="handleChange"

// 锚点点击
@click="handleClick"</code></pre>
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

// 滚动容器引用
const scrollContainer = ref()

// 配置对象
const cfg = reactive({
  offset: 20,
  bounds: 5,
  direction: 'vertical',
  targetOffset: 0,
  showTooltip: false,
  clickable: true,
  container: '',
  marker: true
})

// 事件处理
const handleChange = (newLink, oldLink) => {
  ElMessage.success(`锚点改变: ${oldLink} → ${newLink}`)
}

const handleClick = (link) => {
  ElMessage.info(`点击锚点: ${link}`)
}

const openDrawer = () => {
  show.value = true
}
</script>

<style scoped>
.anchor-demo {
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

.anchor-container {
  display: flex;
  gap: 40px;
}

.placement-demo {
  display: flex;
  gap: 40px;
  min-height: 200px;
}

.anchor-left {
  width: 200px;
}

.anchor-right {
  flex: 1;
}

.scroll-container {
  display: flex;
  gap: 20px;
  height: 300px;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  overflow: hidden;
}

.scroll-content {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.scroll-item {
  margin-bottom: 100px;
  padding: 20px;
  background: #f5f7fa;
  border-radius: 4px;
}

.scroll-item h3 {
  margin: 0 0 10px 0;
  color: #303133;
}

.scroll-item p {
  margin: 0;
  color: #606266;
}

.content-area {
  margin-top: 40px;
}

.content-section {
  margin-bottom: 60px;
  padding: 30px;
  background: #f9f9f9;
  border-radius: 8px;
  border-left: 4px solid #409eff;
}

.content-section h2 {
  margin: 0 0 15px 0;
  color: #303133;
  font-size: 24px;
}

.content-section p {
  margin: 0;
  color: #606266;
  line-height: 1.6;
}

.content-subsection {
  margin: 20px 0;
  padding: 20px;
  background: #fff;
  border-radius: 4px;
  border-left: 3px solid #67c23a;
}

.content-subsection h3 {
  margin: 0 0 10px 0;
  color: #303133;
  font-size: 18px;
}

.content-subsection p {
  margin: 0;
  color: #606266;
  line-height: 1.6;
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
