<template>
  <div class="demo-container">
    <div class="demo-header">
      <h2>布局容器 Container</h2>
      <p>用于布局的容器组件，提供了 el-container、el-header、el-aside、el-main、el-footer 组件</p>
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
          <h4>容器组件演示</h4>
          <el-container :direction="cfg.direction" class="container-demo">
            <el-header v-if="cfg.showHeader" :height="cfg.headerHeight" class="demo-header">
              头部 (Header)
            </el-header>
            <el-container>
              <el-aside v-if="cfg.showAside" :width="cfg.asideWidth" class="demo-aside">
                侧边栏 (Aside)
              </el-aside>
              <el-main class="demo-main">
                主要内容 (Main)
              </el-main>
            </el-container>
            <el-footer v-if="cfg.showFooter" :height="cfg.footerHeight" class="demo-footer">
              底部 (Footer)
            </el-footer>
          </el-container>
        </div>

        <div class="demo-section">
          <h4>不同方向演示</h4>
          <div class="container-group">
            <div class="container-item">
              <h4>水平布局</h4>
              <el-container direction="horizontal" class="container-demo-small">
                <el-aside width="100px" class="demo-aside">侧边</el-aside>
                <el-main class="demo-main">主内容</el-main>
              </el-container>
            </div>
            <div class="container-item">
              <h4>垂直布局</h4>
              <el-container direction="vertical" class="container-demo-small">
                <el-header height="50px" class="demo-header">头部</el-header>
                <el-main class="demo-main">主内容</el-main>
              </el-container>
            </div>
          </div>
        </div>

        <div class="demo-section">
          <h4>状态显示</h4>
          <p><strong>方向：</strong>{{ cfg.direction }}</p>
          <p><strong>显示头部：</strong>{{ cfg.showHeader ? '是' : '否' }}</p>
          <p><strong>头部高度：</strong>{{ cfg.headerHeight }}</p>
          <p><strong>显示侧边栏：</strong>{{ cfg.showAside ? '是' : '否' }}</p>
          <p><strong>侧边栏宽度：</strong>{{ cfg.asideWidth }}</p>
          <p><strong>显示底部：</strong>{{ cfg.showFooter ? '是' : '否' }}</p>
          <p><strong>底部高度：</strong>{{ cfg.footerHeight }}</p>
        </div>
      </el-card>
    </div>

    <!-- 属性设置抽屉 -->
    <el-drawer
      v-model="showSettings"
      title="容器属性设置"
      direction="rtl"
      size="45%"
    >
      <div class="drawer-content">
        <el-alert type="info" show-icon :closable="false" style="margin-bottom: 20px;"
          description="提示：1) Container 是 Layout 的别名，提供相同的功能；2) 用于快速构建页面的整体结构；3) 支持响应式布局。" />
        
        <!-- 容器设置 -->
        <div class="section">
          <h4>容器设置</h4>
          
          <div class="form-item">
            <div class="label-text">布局方向</div>
            <div class="prop-name">direction</div>
            <el-radio-group v-model="cfg.direction">
              <el-radio-button label="horizontal">horizontal（水平）</el-radio-button>
              <el-radio-button label="vertical">vertical（垂直）</el-radio-button>
            </el-radio-group>
            <div class="help-text">设置子元素的排列方向</div>
          </div>
        </div>
        
        <!-- 头部设置 -->
        <div class="section">
          <h4>头部设置</h4>
          
          <div class="form-item">
            <div class="label-text">显示头部</div>
            <div class="prop-name">show-header</div>
            <el-switch v-model="cfg.showHeader" />
            <div class="help-text">是否显示头部区域</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">头部高度</div>
            <div class="prop-name">height</div>
            <el-input v-model="cfg.headerHeight" placeholder="如 60px" style="width: 200px;" />
            <div class="help-text">头部区域的高度</div>
          </div>
        </div>
        
        <!-- 侧边栏设置 -->
        <div class="section">
          <h4>侧边栏设置</h4>
          
          <div class="form-item">
            <div class="label-text">显示侧边栏</div>
            <div class="prop-name">show-aside</div>
            <el-switch v-model="cfg.showAside" />
            <div class="help-text">是否显示侧边栏区域</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">侧边栏宽度</div>
            <div class="prop-name">width</div>
            <el-input v-model="cfg.asideWidth" placeholder="如 200px" style="width: 200px;" />
            <div class="help-text">侧边栏区域的宽度</div>
          </div>
        </div>
        
        <!-- 底部设置 -->
        <div class="section">
          <h4>底部设置</h4>
          
          <div class="form-item">
            <div class="label-text">显示底部</div>
            <div class="prop-name">show-footer</div>
            <el-switch v-model="cfg.showFooter" />
            <div class="help-text">是否显示底部区域</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">底部高度</div>
            <div class="prop-name">height</div>
            <el-input v-model="cfg.footerHeight" placeholder="如 60px" style="width: 200px;" />
            <div class="help-text">底部区域的高度</div>
          </div>
        </div>
        
        <!-- 使用说明 -->
        <div class="section">
          <h4>使用说明</h4>
          
          <div class="form-item">
            <div class="label-text">基本用法</div>
            <div class="prop-name">基本用法</div>
            <div class="code-block">
              <pre><code>&lt;el-container&gt;
  &lt;el-header&gt;Header&lt;/el-header&gt;
  &lt;el-container&gt;
    &lt;el-aside&gt;Aside&lt;/el-aside&gt;
    &lt;el-main&gt;Main&lt;/el-main&gt;
  &lt;/el-container&gt;
  &lt;el-footer&gt;Footer&lt;/el-footer&gt;
&lt;/el-container&gt;</code></pre>
            </div>
            <div class="help-text">Container 组件的基本使用方式</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">响应式布局</div>
            <div class="prop-name">响应式布局</div>
            <div class="code-block">
              <pre><code>&lt;el-container&gt;
  &lt;el-aside :width="asideWidth"&gt;Aside&lt;/el-aside&gt;
  &lt;el-main&gt;Main&lt;/el-main&gt;
&lt;/el-container&gt;</code></pre>
            </div>
            <div class="help-text">通过动态绑定实现响应式布局</div>
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

// 配置对象
const cfg = reactive({
  direction: 'horizontal',
  showHeader: true,
  headerHeight: '60px',
  showAside: true,
  asideWidth: '200px',
  showFooter: true,
  footerHeight: '60px'
})

// 事件处理
const handleAction = () => {
  console.log('操作按钮点击')
  ElMessage.success('操作按钮点击')
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

.container-demo {
  height: 300px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
}

.container-demo-small {
  height: 150px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  margin-bottom: 10px;
}

.demo-header {
  background: #f5f7fa;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #303133;
  font-weight: 500;
}

.demo-aside {
  background: #ecf5ff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #303133;
  font-weight: 500;
}

.demo-main {
  background: #f0f9ff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #303133;
  font-weight: 500;
}

.demo-footer {
  background: #f5f7fa;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #303133;
  font-weight: 500;
}

.container-group {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.container-item {
  padding: 15px;
  background: #fff;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
}

.container-item h4 {
  margin: 0 0 15px 0;
  color: #303133;
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
</style>
