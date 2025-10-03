<template>
  <div class="demo-page">
    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <span>Container 布局容器</span>
          <el-button type="primary" @click="showSettings = true">属性设置</el-button>
        </div>
      </template>
      
      <!-- 基础容器演示 -->
      <div class="demo-section">
        <h4>基础容器布局</h4>
        <div class="preview-container">
          <el-container :direction="cfg.direction" class="container-demo">
            <el-header v-if="cfg.showHeader" :height="cfg.headerHeight" class="demo-header">
              <div class="header-content">
                <el-icon><Menu /></el-icon>
                <span>头部区域 (Header)</span>
                <el-icon><Setting /></el-icon>
              </div>
            </el-header>
            <el-container>
              <el-aside v-if="cfg.showAside" :width="cfg.asideWidth" class="demo-aside">
                <div class="aside-content">
                  <div class="aside-item">
                    <el-icon><House /></el-icon>
                    <span>首页</span>
                  </div>
                  <div class="aside-item">
                    <el-icon><User /></el-icon>
                    <span>用户管理</span>
                  </div>
                  <div class="aside-item">
                    <el-icon><Setting /></el-icon>
                    <span>系统设置</span>
                  </div>
                </div>
              </el-aside>
              <el-main class="demo-main">
                <div class="main-content">
                  <h3>主要内容区域 (Main)</h3>
                  <p>这里是页面的主要内容，可以放置各种组件和内容。</p>
                  <el-button type="primary">操作按钮</el-button>
                </div>
              </el-main>
            </el-container>
            <el-footer v-if="cfg.showFooter" :height="cfg.footerHeight" class="demo-footer">
              <div class="footer-content">
                <span>© 2024 浩南知识库演示系统</span>
                <span>底部区域 (Footer)</span>
              </div>
            </el-footer>
          </el-container>
        </div>
      </div>

      <!-- 不同布局方向演示 -->
      <div class="demo-section">
        <h4>不同布局方向</h4>
        <div class="layout-examples">
          <div class="layout-example">
            <h5>水平布局 (Horizontal)</h5>
            <div class="preview-container">
              <el-container direction="horizontal" class="container-demo-small">
                <el-aside width="120px" class="demo-aside">
                  <div class="aside-content-small">侧边栏</div>
                </el-aside>
                <el-main class="demo-main">
                  <div class="main-content-small">主内容区</div>
                </el-main>
              </el-container>
            </div>
          </div>
          
          <div class="layout-example">
            <h5>垂直布局 (Vertical)</h5>
            <div class="preview-container">
              <el-container direction="vertical" class="container-demo-small">
                <el-header height="50px" class="demo-header">
                  <div class="header-content-small">头部</div>
                </el-header>
                <el-main class="demo-main">
                  <div class="main-content-small">主内容区</div>
                </el-main>
                <el-footer height="40px" class="demo-footer">
                  <div class="footer-content-small">底部</div>
                </el-footer>
              </el-container>
            </div>
          </div>
        </div>
      </div>

      <!-- 常用布局模式 -->
      <div class="demo-section">
        <h4>常用布局模式</h4>
        
        <!-- 经典后台布局 -->
        <div class="layout-pattern">
          <h5>经典后台管理布局</h5>
          <div class="preview-container">
            <el-container class="admin-layout">
              <el-header height="60px" class="admin-header">
                <div class="admin-header-content">
                  <div class="logo">LOGO</div>
                  <div class="nav-menu">
                    <span>首页</span>
                    <span>用户</span>
                    <span>设置</span>
                  </div>
                  <div class="user-info">
                    <el-avatar size="small" />
                    <span>管理员</span>
                  </div>
                </div>
              </el-header>
              <el-container>
                <el-aside width="200px" class="admin-aside">
                  <div class="admin-aside-content">
                    <div class="menu-item active">仪表盘</div>
                    <div class="menu-item">用户管理</div>
                    <div class="menu-item">内容管理</div>
                    <div class="menu-item">系统设置</div>
                  </div>
                </el-aside>
                <el-main class="admin-main">
                  <div class="admin-main-content">
                    <h3>欢迎使用管理系统</h3>
                    <p>这是一个经典的后台管理布局示例</p>
                  </div>
                </el-main>
              </el-container>
            </el-container>
          </div>
        </div>

        <!-- 博客布局 -->
        <div class="layout-pattern">
          <h5>博客文章布局</h5>
          <div class="preview-container">
            <el-container class="blog-layout">
              <el-header height="50px" class="blog-header">
                <div class="blog-header-content">
                  <span>我的博客</span>
                  <div class="blog-nav">
                    <span>首页</span>
                    <span>分类</span>
                    <span>关于</span>
                  </div>
                </div>
              </el-header>
              <el-container>
                <el-main class="blog-main">
                  <div class="blog-main-content">
                    <h2>文章标题</h2>
                    <p>这里是文章的主要内容...</p>
                  </div>
                </el-main>
                <el-aside width="250px" class="blog-aside">
                  <div class="blog-aside-content">
                    <h4>相关文章</h4>
                    <div class="article-item">文章1</div>
                    <div class="article-item">文章2</div>
                    <div class="article-item">文章3</div>
                  </div>
                </el-aside>
              </el-container>
              <el-footer height="40px" class="blog-footer">
                <div class="blog-footer-content">
                  <span>© 2024 我的博客</span>
                </div>
              </el-footer>
            </el-container>
          </div>
        </div>

        <!-- 仪表板布局 -->
        <div class="layout-pattern">
          <h5>仪表板布局</h5>
          <div class="preview-container">
            <el-container class="dashboard-layout">
              <el-header height="50px" class="dashboard-header">
                <div class="dashboard-header-content">
                  <span>数据仪表板</span>
                  <el-button type="primary" size="small">刷新数据</el-button>
                </div>
              </el-header>
              <el-main class="dashboard-main">
                <div class="dashboard-main-content">
                  <div class="stats-grid">
                    <div class="stat-card">总用户</div>
                    <div class="stat-card">今日访问</div>
                    <div class="stat-card">订单数</div>
                    <div class="stat-card">收入</div>
                  </div>
                  <div class="chart-area">图表区域</div>
                </div>
              </el-main>
            </el-container>
          </div>
        </div>
      </div>

      <!-- 状态显示 -->
      <div class="status">
        <div><strong>布局方向：</strong>{{ cfg.direction }}</div>
        <div><strong>显示头部：</strong>{{ cfg.showHeader ? '是' : '否' }} (高度: {{ cfg.headerHeight }})</div>
        <div><strong>显示侧边栏：</strong>{{ cfg.showAside ? '是' : '否' }} (宽度: {{ cfg.asideWidth }})</div>
        <div><strong>显示底部：</strong>{{ cfg.showFooter ? '是' : '否' }} (高度: {{ cfg.footerHeight }})</div>
      </div>
    </el-card>

    <!-- 属性设置抽屉 -->
    <el-drawer
      v-model="showSettings"
      title="容器属性设置"
      direction="rtl"
      size="45%"
    >
      <div class="settings-container">
        <el-alert type="info" show-icon :closable="false" style="margin-bottom: 20px;"
          description="提示：1) Container 是 Layout 的别名，提供相同的功能；2) 用于快速构建页面的整体结构；3) 支持响应式布局。" />
        
        <!-- 使用说明 -->
        <div class="section">
          <h4>使用说明</h4>
          
          <div class="usage-item">
            <h5>1. 基础布局</h5>
            <div class="code-block">
              <pre><code>&lt;el-container&gt;
  &lt;el-header&gt;头部区域&lt;/el-header&gt;
  &lt;el-main&gt;主要内容区域&lt;/el-main&gt;
  &lt;el-footer&gt;底部区域&lt;/el-footer&gt;
&lt;/el-container&gt;</code></pre>
            </div>
          </div>
          
          <div class="usage-item">
            <h5>2. 侧边栏布局</h5>
            <div class="code-block">
              <pre><code>&lt;el-container&gt;
  &lt;el-header&gt;头部区域&lt;/el-header&gt;
  &lt;el-container&gt;
    &lt;el-aside width="200px"&gt;侧边栏&lt;/el-aside&gt;
    &lt;el-main&gt;主要内容区域&lt;/el-main&gt;
  &lt;/el-container&gt;
&lt;/el-container&gt;</code></pre>
            </div>
          </div>
          
          <div class="usage-item">
            <h5>3. 垂直布局</h5>
            <div class="code-block">
              <pre><code>&lt;el-container direction="vertical"&gt;
  &lt;el-header&gt;头部区域&lt;/el-header&gt;
  &lt;el-main&gt;主要内容区域&lt;/el-main&gt;
  &lt;el-footer&gt;底部区域&lt;/el-footer&gt;
&lt;/el-container&gt;</code></pre>
            </div>
          </div>
          
          <div class="usage-item">
            <h5>4. 自定义尺寸</h5>
            <div class="code-block">
              <pre><code>&lt;el-container&gt;
  &lt;el-header :height="80"&gt;头部区域&lt;/el-header&gt;
  &lt;el-container&gt;
    &lt;el-aside :width="250"&gt;侧边栏&lt;/el-aside&gt;
    &lt;el-main&gt;主要内容区域&lt;/el-main&gt;
  &lt;/el-container&gt;
  &lt;el-footer :height="60"&gt;底部区域&lt;/el-footer&gt;
&lt;/el-container&gt;</code></pre>
            </div>
          </div>
          
          <div class="usage-item">
            <h5>5. 响应式布局</h5>
            <div class="code-block">
              <pre><code>&lt;el-container&gt;
  &lt;el-header&gt;头部区域&lt;/el-header&gt;
  &lt;el-container&gt;
    &lt;el-aside :width="asideWidth"&gt;侧边栏&lt;/el-aside&gt;
    &lt;el-main&gt;主要内容区域&lt;/el-main&gt;
  &lt;/el-container&gt;
&lt;/el-container&gt;

&lt;script setup&gt;
import { ref, onMounted, onUnmounted } from 'vue'

const asideWidth = ref('200px')

const updateLayout = () => {
  asideWidth.value = window.innerWidth < 768 ? '0px' : '200px'
}

onMounted(() => {
  window.addEventListener('resize', updateLayout)
  updateLayout()
})

onUnmounted(() => {
  window.removeEventListener('resize', updateLayout)
})
&lt;/script&gt;</code></pre>
            </div>
          </div>
        </div>
        
        <!-- 容器设置 -->
        <div class="form-section">
          <div class="section-title">容器设置</div>
          
          <div class="form-item">
            <div class="label-text">
              <div class="prop-name">direction</div>
              <div class="help-text">布局方向</div>
            </div>
            <el-radio-group v-model="cfg.direction">
              <el-radio-button label="horizontal">horizontal（水平）</el-radio-button>
              <el-radio-button label="vertical">vertical（垂直）</el-radio-button>
            </el-radio-group>
          </div>
        </div>
        
        <!-- 头部设置 -->
        <div class="form-section">
          <div class="section-title">头部设置</div>
          
          <div class="form-item">
            <div class="label-text">
              <div class="prop-name">show-header</div>
              <div class="help-text">是否显示头部</div>
            </div>
            <el-switch v-model="cfg.showHeader" />
          </div>
          
          <div class="form-item" v-if="cfg.showHeader">
            <div class="label-text">
              <div class="prop-name">height</div>
              <div class="help-text">头部高度</div>
            </div>
            <el-input v-model="cfg.headerHeight" placeholder="如 60px" style="width: 200px;" />
          </div>
        </div>
        
        <!-- 侧边栏设置 -->
        <div class="form-section">
          <div class="section-title">侧边栏设置</div>
          
          <div class="form-item">
            <div class="label-text">
              <div class="prop-name">show-aside</div>
              <div class="help-text">是否显示侧边栏</div>
            </div>
            <el-switch v-model="cfg.showAside" />
          </div>
          
          <div class="form-item" v-if="cfg.showAside">
            <div class="label-text">
              <div class="prop-name">width</div>
              <div class="help-text">侧边栏宽度</div>
            </div>
            <el-input v-model="cfg.asideWidth" placeholder="如 200px" style="width: 200px;" />
          </div>
        </div>
        
        <!-- 底部设置 -->
        <div class="form-section">
          <div class="section-title">底部设置</div>
          
          <div class="form-item">
            <div class="label-text">
              <div class="prop-name">show-footer</div>
              <div class="help-text">是否显示底部</div>
            </div>
            <el-switch v-model="cfg.showFooter" />
          </div>
          
          <div class="form-item" v-if="cfg.showFooter">
            <div class="label-text">
              <div class="prop-name">height</div>
              <div class="help-text">底部高度</div>
            </div>
            <el-input v-model="cfg.footerHeight" placeholder="如 60px" style="width: 200px;" />
          </div>
        </div>
        
        <!-- 快速预设 -->
        <div class="form-section">
          <div class="section-title">快速预设</div>
          <div class="preset-buttons">
            <el-button @click="setPreset('admin')">后台管理</el-button>
            <el-button @click="setPreset('blog')">博客布局</el-button>
            <el-button @click="setPreset('dashboard')">仪表板</el-button>
            <el-button @click="setPreset('simple')">简单布局</el-button>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { 
  Menu, 
  Setting, 
  House, 
  User 
} from '@element-plus/icons-vue'

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

// 快速预设
const setPreset = (type) => {
  switch (type) {
    case 'admin':
      cfg.direction = 'horizontal'
      cfg.showHeader = true
      cfg.headerHeight = '60px'
      cfg.showAside = true
      cfg.asideWidth = '200px'
      cfg.showFooter = false
      break
    case 'blog':
      cfg.direction = 'horizontal'
      cfg.showHeader = true
      cfg.headerHeight = '50px'
      cfg.showAside = true
      cfg.asideWidth = '250px'
      cfg.showFooter = true
      cfg.footerHeight = '40px'
      break
    case 'dashboard':
      cfg.direction = 'horizontal'
      cfg.showHeader = true
      cfg.headerHeight = '50px'
      cfg.showAside = false
      cfg.showFooter = false
      break
    case 'simple':
      cfg.direction = 'vertical'
      cfg.showHeader = true
      cfg.headerHeight = '50px'
      cfg.showAside = false
      cfg.showFooter = true
      cfg.footerHeight = '40px'
      break
  }
  ElMessage.success(`已应用${type}预设`)
}
</script>

<style scoped>
.demo-page { 
  padding: 12px; 
}

.card-header { 
  font-weight: 600; 
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
}

.demo-section { 
  margin-bottom: 30px; 
}

.demo-section h4 { 
  margin: 0 0 16px 0; 
  font-size: 16px; 
  font-weight: 600; 
  color: #303133; 
  border-bottom: 2px solid #e4e7ed; 
  padding-bottom: 8px; 
}

.preview-container {
  padding: 20px;
  background: #f8f9fa;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  margin-bottom: 16px;
}

.container-demo {
  height: 300px;
  border: 2px solid #409eff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.1);
}

.container-demo-small {
  height: 150px;
  border: 2px solid #67c23a;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(103, 194, 58, 0.1);
}

/* 头部样式 - 蓝色系 */
.demo-header {
  background: linear-gradient(135deg, #409eff 0%, #337ecc 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  border-bottom: 2px solid #337ecc;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  justify-content: space-between;
  padding: 0 20px;
}

.header-content-small {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-weight: 500;
}

/* 侧边栏样式 - 绿色系 */
.demo-aside {
  background: linear-gradient(135deg, #67c23a 0%, #529b2e 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  border-right: 2px solid #529b2e;
}

.aside-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  padding: 20px;
}

.aside-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.aside-item:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateX(4px);
}

.aside-content-small {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-weight: 500;
}

/* 主内容区样式 - 橙色系 */
.demo-main {
  background: linear-gradient(135deg, #e6a23c 0%, #d4941e 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}

.main-content {
  text-align: center;
  padding: 20px;
}

.main-content h3 {
  margin: 0 0 12px 0;
  font-size: 18px;
}

.main-content p {
  margin: 0 0 16px 0;
  opacity: 0.9;
}

.main-content-small {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-weight: 500;
}

/* 底部样式 - 紫色系 */
.demo-footer {
  background: linear-gradient(135deg, #909399 0%, #73767a 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  border-top: 2px solid #73767a;
}

.footer-content {
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
  justify-content: space-between;
  padding: 0 20px;
}

.footer-content-small {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-weight: 500;
}

/* 布局示例 */
.layout-examples {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.layout-example {
  padding: 16px;
  background: #fafafa;
  border-radius: 6px;
  border: 1px solid #e4e7ed;
}

.layout-example h5 {
  margin: 0 0 12px 0;
  color: #303133;
  font-size: 14px;
  font-weight: 500;
}

/* 布局模式 */
.layout-pattern {
  margin-bottom: 24px;
  padding: 16px;
  background: #fafafa;
  border-radius: 6px;
  border: 1px solid #e4e7ed;
}

.layout-pattern h5 {
  margin: 0 0 12px 0;
  color: #303133;
  font-size: 14px;
  font-weight: 500;
}

/* 后台管理布局 */
.admin-layout {
  height: 250px;
  border: 2px solid #f56c6c;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(245, 108, 108, 0.1);
}

.admin-header {
  background: linear-gradient(135deg, #f56c6c 0%, #f23030 100%);
  color: white;
  border-bottom: 2px solid #f23030;
}

.admin-header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 20px;
}

.logo {
  font-weight: bold;
  font-size: 18px;
}

.nav-menu {
  display: flex;
  gap: 20px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.admin-aside {
  background: linear-gradient(135deg, #e6a23c 0%, #d4941e 100%);
  color: white;
  border-right: 2px solid #d4941e;
}

.admin-aside-content {
  padding: 20px;
}

.menu-item {
  padding: 12px 16px;
  margin-bottom: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.menu-item:hover {
  background: rgba(255, 255, 255, 0.2);
}

.menu-item.active {
  background: rgba(255, 255, 255, 0.3);
  font-weight: bold;
}

.admin-main {
  background: linear-gradient(135deg, #409eff 0%, #337ecc 100%);
  color: white;
}

.admin-main-content {
  padding: 20px;
}

/* 博客布局 */
.blog-layout {
  height: 250px;
  border: 2px solid #67c23a;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(103, 194, 58, 0.1);
}

.blog-header {
  background: linear-gradient(135deg, #67c23a 0%, #529b2e 100%);
  color: white;
  border-bottom: 2px solid #529b2e;
}

.blog-header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 20px;
}

.blog-nav {
  display: flex;
  gap: 20px;
}

.blog-main {
  background: linear-gradient(135deg, #e6a23c 0%, #d4941e 100%);
  color: white;
}

.blog-main-content {
  padding: 20px;
}

.blog-aside {
  background: linear-gradient(135deg, #909399 0%, #73767a 100%);
  color: white;
  border-left: 2px solid #73767a;
}

.blog-aside-content {
  padding: 20px;
}

.article-item {
  padding: 8px 12px;
  margin-bottom: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.article-item:hover {
  background: rgba(255, 255, 255, 0.2);
}

.blog-footer {
  background: linear-gradient(135deg, #909399 0%, #73767a 100%);
  color: white;
  border-top: 2px solid #73767a;
}

.blog-footer-content {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

/* 仪表板布局 */
.dashboard-layout {
  height: 250px;
  border: 2px solid #722ed1;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(114, 46, 209, 0.1);
}

.dashboard-header {
  background: linear-gradient(135deg, #722ed1 0%, #531dab 100%);
  color: white;
  border-bottom: 2px solid #531dab;
}

.dashboard-header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 20px;
}

.dashboard-main {
  background: linear-gradient(135deg, #13c2c2 0%, #08979c 100%);
  color: white;
}

.dashboard-main-content {
  padding: 20px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 20px;
}

.stat-card {
  background: rgba(255, 255, 255, 0.1);
  padding: 16px;
  border-radius: 6px;
  text-align: center;
  font-weight: 500;
}

.chart-area {
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 6px;
  text-align: center;
  font-weight: 500;
}

.status { 
  margin: 20px 0; 
  padding: 16px; 
  background: #f5f7fa; 
  border-radius: 6px; 
  font-size: 13px; 
  line-height: 1.6;
  border: 1px solid #e4e7ed;
}

.status div {
  margin: 4px 0;
  color: #606266;
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

.preset-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.preset-buttons .el-button {
  margin: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .form-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .label-text {
    min-width: auto;
    width: 100%;
  }
  
  .preset-buttons {
    flex-direction: column;
  }
  
  .preset-buttons .el-button {
    width: 100%;
  }
  
  .layout-examples {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
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