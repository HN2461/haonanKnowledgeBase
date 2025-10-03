<template>
  <div class="demo-container">
    <div class="demo-header">
      <h2>回到顶部 Backtop</h2>
      <p>返回页面顶部的操作按钮，支持自定义样式和触发条件</p>
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
          <h4>回到顶部演示</h4>
          <el-backtop
            :visibility-height="cfg.visibilityHeight"
            :target="cfg.target ? targetElement : undefined"
            :right="cfg.right"
            :bottom="cfg.bottom"
            @click="handleClick"
          >
            <div class="custom-backtop">
              <el-icon><ArrowUp /></el-icon>
              <span>顶部</span>
            </div>
          </el-backtop>
        </div>

        <div class="demo-section">
          <h4>不同触发高度演示</h4>
          <div class="backtop-group">
            <el-backtop :visibility-height="100" :right="20" :bottom="100">
              <div class="custom-backtop small">
                <el-icon><ArrowUp /></el-icon>
              </div>
            </el-backtop>
            <el-backtop :visibility-height="200" :right="20" :bottom="150">
              <div class="custom-backtop medium">
                <el-icon><ArrowUp /></el-icon>
                <span>200px</span>
              </div>
            </el-backtop>
            <el-backtop :visibility-height="300" :right="20" :bottom="200">
              <div class="custom-backtop large">
                <el-icon><ArrowUp /></el-icon>
                <span>300px</span>
              </div>
            </el-backtop>
          </div>
        </div>

        <div class="demo-section">
          <h4>不同位置演示</h4>
          <div class="backtop-group">
            <el-backtop :visibility-height="100" :right="20" :bottom="100">
              <div class="custom-backtop position-demo">
                <el-icon><ArrowUp /></el-icon>
                <span>右下</span>
              </div>
            </el-backtop>
            <el-backtop :visibility-height="100" :right="100" :bottom="100">
              <div class="custom-backtop position-demo">
                <el-icon><ArrowUp /></el-icon>
                <span>左下</span>
              </div>
            </el-backtop>
          </div>
        </div>

        <div class="demo-section">
          <h4>状态显示</h4>
          <p><strong>触发高度：</strong>{{ cfg.visibilityHeight }}px</p>
          <p><strong>目标元素：</strong>{{ cfg.target ? '自定义' : '默认' }}</p>
          <p><strong>右边距：</strong>{{ cfg.right }}px</p>
          <p><strong>底边距：</strong>{{ cfg.bottom }}px</p>
        </div>

        <!-- 用于演示的滚动内容 -->
        <div class="scroll-content">
          <h4>滚动内容区域</h4>
          <p>这是一个用于演示回到顶部效果的滚动内容区域。</p>
          <p>当您滚动页面超过触发高度时，回到顶部按钮会出现。</p>
          <div v-for="i in 30" :key="i" class="content-item">
            <h5>内容块 {{ i }}</h5>
            <p>这是第 {{ i }} 个内容块，用于演示滚动效果。当页面滚动超过触发高度时，回到顶部按钮会出现。</p>
            <p>您可以调整触发高度来测试不同的显示效果。</p>
          </div>
        </div>
      </el-card>
    </div>

    <!-- 属性设置抽屉 -->
    <el-drawer
      v-model="showSettings"
      title="回到顶部属性设置"
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
              <pre><code>&lt;el-backtop&gt;&lt;/el-backtop&gt;</code></pre>
            </div>
          </div>
          
          <div class="usage-item">
            <h5>2. 自定义触发高度</h5>
            <div class="code-block">
              <pre><code>&lt;el-backtop :visibility-height="200"&gt;&lt;/el-backtop&gt;</code></pre>
            </div>
          </div>
          
          <div class="usage-item">
            <h5>3. 自定义位置</h5>
            <div class="code-block">
              <pre><code>&lt;el-backtop
  :right="40"
  :bottom="40"
&gt;&lt;/el-backtop&gt;</code></pre>
            </div>
          </div>
          
          <div class="usage-item">
            <h5>4. 自定义内容</h5>
            <div class="code-block">
              <pre><code>&lt;el-backtop&gt;
  &lt;div class="custom-backtop"&gt;
    &lt;el-icon&gt;&lt;ArrowUp /&gt;&lt;/el-icon&gt;
    &lt;span&gt;顶部&lt;/span&gt;
  &lt;/div&gt;
&lt;/el-backtop&gt;</code></pre>
            </div>
          </div>
          
          <div class="usage-item">
            <h5>5. 指定容器</h5>
            <div class="code-block">
              <pre><code>&lt;el-backtop
  :target="targetElement"
  :visibility-height="100"
&gt;&lt;/el-backtop&gt;

&lt;script setup&gt;
const targetElement = ref(null)
&lt;/script&gt;</code></pre>
            </div>
          </div>
          
          <div class="usage-item">
            <h5>6. 事件处理</h5>
            <div class="code-block">
              <pre><code>&lt;el-backtop @click="handleClick"&gt;&lt;/el-backtop&gt;

&lt;script setup&gt;
const handleClick = () => {
  console.log('点击了回到顶部按钮')
  ElMessage.success('回到顶部')
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
              <span class="prop-name">visibilityHeight</span>
              <span class="help-text">触发高度</span>
            </div>
            <el-input-number v-model="cfg.visibilityHeight" :min="0" :max="1000" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">right</span>
              <span class="help-text">右边距</span>
            </div>
            <el-input-number v-model="cfg.right" :min="0" :max="500" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">bottom</span>
              <span class="help-text">底边距</span>
            </div>
            <el-input-number v-model="cfg.bottom" :min="0" :max="500" />
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
import { ArrowUp } from '@element-plus/icons-vue'

// 响应式数据
const showSettings = ref(false)
const targetElement = ref(null)

// 配置对象
const cfg = reactive({
  visibilityHeight: 200,
  right: 40,
  bottom: 40,
  target: false
})

// 事件处理
const handleClick = () => {
  console.log('回到顶部点击')
  ElMessage.success('回到顶部')
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

.custom-backtop {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: #409eff;
  color: #fff;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 12px;
  font-weight: 500;
}

.custom-backtop:hover {
  background: #66b1ff;
  transform: translateY(-2px);
}

.custom-backtop.small {
  width: 30px;
  height: 30px;
  font-size: 10px;
}

.custom-backtop.medium {
  width: 50px;
  height: 50px;
  font-size: 14px;
}

.custom-backtop.large {
  width: 60px;
  height: 60px;
  font-size: 16px;
}

.custom-backtop.position-demo {
  background: #67c23a;
}

.custom-backtop.position-demo:hover {
  background: #85ce61;
}

.backtop-group {
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
  margin: 0 0 10px 0;
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
