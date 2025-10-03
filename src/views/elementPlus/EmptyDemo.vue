<template>
  <div class="demo-container">
    <div class="demo-header">
      <h2>空状态 Empty</h2>
      <p>空状态时的展示占位图，支持自定义图片、描述文字和操作按钮</p>
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
          <h4>空状态演示</h4>
          <el-empty
            :image="cfg.image"
            :image-size="cfg.imageSize"
            :description="cfg.description"
          >
            <el-button type="primary" @click="handleAction">操作按钮</el-button>
          </el-empty>
        </div>

        <div class="demo-section">
          <h4>不同图片演示</h4>
          <div class="empty-group">
            <div class="empty-item">
              <el-empty description="暂无数据" />
            </div>
            <div class="empty-item">
              <el-empty image="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" description="自定义图片" />
            </div>
            <div class="empty-item">
              <el-empty :image-size="200" description="大图片" />
            </div>
          </div>
        </div>

        <div class="demo-section">
          <h4>自定义内容演示</h4>
          <el-empty>
            <template #image>
              <el-icon size="100" color="#409eff">
                <Document />
              </el-icon>
            </template>
            <template #description>
              <p>自定义描述内容</p>
              <p>可以包含多行文字</p>
            </template>
            <el-button type="primary" @click="handleCustomAction">自定义操作</el-button>
          </el-empty>
        </div>

        <div class="demo-section">
          <h4>状态显示</h4>
          <p><strong>图片：</strong>{{ cfg.image || '默认' }}</p>
          <p><strong>图片尺寸：</strong>{{ cfg.imageSize }}</p>
          <p><strong>描述：</strong>{{ cfg.description }}</p>
        </div>
      </el-card>
    </div>

    <!-- 属性设置抽屉 -->
    <el-drawer
      v-model="showSettings"
      title="空状态属性设置"
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
              <pre><code>&lt;el-empty description="暂无数据"&gt;&lt;/el-empty&gt;</code></pre>
            </div>
          </div>
          
          <div class="usage-item">
            <h5>2. 带操作按钮</h5>
            <div class="code-block">
              <pre><code>&lt;el-empty description="暂无数据"&gt;
  &lt;el-button type="primary"&gt;操作按钮&lt;/el-button&gt;
&lt;/el-empty&gt;</code></pre>
            </div>
          </div>
          
          <div class="usage-item">
            <h5>3. 自定义图片</h5>
            <div class="code-block">
              <pre><code>&lt;el-empty
  image="https://example.com/empty.png"
  description="自定义图片"
&gt;&lt;/el-empty&gt;</code></pre>
            </div>
          </div>
          
          <div class="usage-item">
            <h5>4. 自定义图片尺寸</h5>
            <div class="code-block">
              <pre><code>&lt;el-empty
  :image-size="200"
  description="大图片"
&gt;&lt;/el-empty&gt;</code></pre>
            </div>
          </div>
          
          <div class="usage-item">
            <h5>5. 自定义图标</h5>
            <div class="code-block">
              <pre><code>&lt;el-empty&gt;
  &lt;template #image&gt;
    &lt;el-icon size="100" color="#409eff"&gt;
      &lt;Document /&gt;
    &lt;/el-icon&gt;
  &lt;/template&gt;
  &lt;template #description&gt;
    &lt;p&gt;自定义描述内容&lt;/p&gt;
  &lt;/template&gt;
  &lt;el-button type="primary"&gt;自定义操作&lt;/el-button&gt;
&lt;/el-empty&gt;</code></pre>
            </div>
          </div>
          
          <div class="usage-item">
            <h5>6. 事件处理</h5>
            <div class="code-block">
              <pre><code>&lt;el-empty description="暂无数据"&gt;
  &lt;el-button type="primary" @click="handleAction"&gt;
    操作按钮
  &lt;/el-button&gt;
&lt;/el-empty&gt;

&lt;script setup&gt;
const handleAction = () => {
  console.log('操作按钮点击')
  ElMessage.success('操作成功')
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
              <span class="prop-name">image</span>
              <span class="help-text">图片地址</span>
            </div>
            <el-input v-model="cfg.image" placeholder="请输入图片地址" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">imageSize</span>
              <span class="help-text">图片尺寸</span>
            </div>
            <el-input-number v-model="cfg.imageSize" :min="50" :max="500" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">description</span>
              <span class="help-text">描述文字</span>
            </div>
            <el-input v-model="cfg.description" placeholder="请输入描述文字" />
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { Document } from '@element-plus/icons-vue'

// 响应式数据
const showSettings = ref(false)

// 配置对象
const cfg = reactive({
  image: '',
  imageSize: 200,
  description: '暂无数据'
})

// 事件处理
const handleAction = () => {
  console.log('操作按钮点击')
  ElMessage.success('操作按钮点击')
}

const handleCustomAction = () => {
  console.log('自定义操作点击')
  ElMessage.success('自定义操作点击')
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

.empty-group {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.empty-item {
  flex: 1;
  min-width: 200px;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  padding: 20px;
  text-align: center;
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
