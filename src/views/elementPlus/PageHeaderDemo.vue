<template>
  <div class="page-header-demo">
    <div class="demo-header">
      <h1>Page Header 页头</h1>
      <p>如果页面的路径比较简单，推荐使用页头组件而非面包屑组件。</p>
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
          <el-page-header
            :icon="cfg.icon"
            :title="cfg.title"
            :content="cfg.content"
            @back="handleBack"
          />
        </div>
      </el-card>

      <!-- 自定义图标 -->
      <el-card class="demo-card">
        <template #header>
          <div class="card-header">
            <span>自定义图标</span>
          </div>
        </template>
        
        <div class="demo-section">
          <el-space direction="vertical" style="width: 100%;">
            <el-page-header
              icon="House"
              title="首页"
              content="欢迎来到系统首页"
              @back="handleBack"
            />
            
            <el-page-header
              icon="User"
              title="个人中心"
              content="管理您的个人信息"
              @back="handleBack"
            />
            
            <el-page-header
              icon="Setting"
              title="系统设置"
              content="配置系统参数"
              @back="handleBack"
            />
            
            <el-page-header
              icon="Document"
              title="文档管理"
              content="查看和管理文档"
              @back="handleBack"
            />
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
          <el-page-header @back="handleBack">
            <template #icon>
              <el-icon><DataAnalysis /></el-icon>
            </template>
            <template #title>
              <span style="color: #409eff; font-weight: bold;">数据分析</span>
            </template>
            <template #content>
              <div style="color: #606266;">
                <p style="margin: 0;">查看系统数据统计和分析报告</p>
                <p style="margin: 5px 0 0 0; font-size: 12px;">最后更新：2024-01-15 14:30</p>
              </div>
            </template>
            <template #extra>
              <el-space>
                <el-button type="primary" size="small">导出报告</el-button>
                <el-button size="small">刷新数据</el-button>
              </el-space>
            </template>
          </el-page-header>
        </div>
      </el-card>

      <!-- 带操作按钮 -->
      <el-card class="demo-card">
        <template #header>
          <div class="card-header">
            <span>带操作按钮</span>
          </div>
        </template>
        
        <div class="demo-section">
          <el-space direction="vertical" style="width: 100%;">
            <el-page-header
              icon="Edit"
              title="编辑文章"
              content="修改文章内容和设置"
              @back="handleBack"
            >
              <template #extra>
                <el-button-group>
                  <el-button type="primary">保存</el-button>
                  <el-button>预览</el-button>
                  <el-button>发布</el-button>
                </el-button-group>
              </template>
            </el-page-header>
            
            <el-page-header
              icon="ShoppingCart"
              title="购物车"
              content="管理您的商品订单"
              @back="handleBack"
            >
              <template #extra>
                <el-space>
                  <el-badge :value="3" class="item">
                    <el-button>购物车</el-button>
                  </el-badge>
                  <el-button type="primary">结算</el-button>
                </el-space>
              </template>
            </el-page-header>
          </el-space>
        </div>
      </el-card>

      <!-- 不同尺寸 -->
      <el-card class="demo-card">
        <template #header>
          <div class="card-header">
            <span>不同尺寸</span>
          </div>
        </template>
        
        <div class="demo-section">
          <el-space direction="vertical" style="width: 100%;">
            <el-page-header
              icon="House"
              title="大尺寸页头"
              content="这是大尺寸的页头组件"
              size="large"
              @back="handleBack"
            />
            
            <el-page-header
              icon="House"
              title="默认尺寸页头"
              content="这是默认尺寸的页头组件"
              @back="handleBack"
            />
            
            <el-page-header
              icon="House"
              title="小尺寸页头"
              content="这是小尺寸的页头组件"
              size="small"
              @back="handleBack"
            />
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
          <el-page-header
            icon="Edit"
            title="用户信息编辑"
            content="修改用户的基本信息和权限设置"
            @back="handleBack"
          >
            <template #extra>
              <el-space>
                <el-button @click="handleReset">重置</el-button>
                <el-button type="primary" @click="handleSave">保存</el-button>
              </el-space>
            </template>
          </el-page-header>
          
          <el-divider />
          
          <el-form :model="form" label-width="100px" style="max-width: 600px;">
            <el-form-item label="用户名">
              <el-input v-model="form.username" placeholder="请输入用户名" />
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="form.email" placeholder="请输入邮箱" />
            </el-form-item>
            <el-form-item label="手机号">
              <el-input v-model="form.phone" placeholder="请输入手机号" />
            </el-form-item>
            <el-form-item label="角色">
              <el-select v-model="form.role" placeholder="请选择角色">
                <el-option label="管理员" value="admin" />
                <el-option label="编辑" value="editor" />
                <el-option label="查看者" value="viewer" />
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </el-card>

      <!-- 在表格中使用 -->
      <el-card class="demo-card">
        <template #header>
          <div class="card-header">
            <span>在表格中使用</span>
          </div>
        </template>
        
        <div class="demo-section">
          <el-page-header
            icon="List"
            title="用户列表"
            content="管理系统用户信息"
            @back="handleBack"
          >
            <template #extra>
              <el-space>
                <el-input
                  v-model="searchValue"
                  placeholder="搜索用户"
                  style="width: 200px;"
                >
                  <template #prefix>
                    <el-icon><Search /></el-icon>
                  </template>
                </el-input>
                <el-button type="primary" @click="handleAdd">新增用户</el-button>
              </el-space>
            </template>
          </el-page-header>
          
          <el-divider />
          
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="name" label="姓名" />
            <el-table-column prop="email" label="邮箱" />
            <el-table-column prop="role" label="角色" />
            <el-table-column label="操作">
              <template #default="scope">
                <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
                <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
    </div>

    <!-- 属性设置抽屉 -->
    <el-drawer
      v-model="show"
      title="Page Header 属性设置"
      direction="rtl"
      size="45%"
    >
      <div class="drawer-content">
        <el-form :model="cfg" label-width="120px">
          <el-form-item label="图标">
            <el-input v-model="cfg.icon" placeholder="输入图标名称" />
          </el-form-item>
          
          <el-form-item label="标题">
            <el-input v-model="cfg.title" placeholder="输入标题" />
          </el-form-item>
          
          <el-form-item label="内容">
            <el-input v-model="cfg.content" type="textarea" placeholder="输入内容" />
          </el-form-item>
        </el-form>

        <!-- 使用说明 -->
        <div class="usage-section">
          <h3>使用说明</h3>
          
          <div class="code-block">
            <h4>基础用法</h4>
            <pre><code>&lt;el-page-header
  icon="House"
  title="首页"
  content="欢迎来到系统首页"
  @back="handleBack"
/&gt;</code></pre>
          </div>

          <div class="code-block">
            <h4>自定义内容</h4>
            <pre><code>&lt;el-page-header @back="handleBack"&gt;
  &lt;template #icon&gt;
    &lt;el-icon&gt;&lt;DataAnalysis /&gt;&lt;/el-icon&gt;
  &lt;/template&gt;
  &lt;template #title&gt;
    &lt;span style="color: #409eff;"&gt;数据分析&lt;/span&gt;
  &lt;/template&gt;
  &lt;template #content&gt;
    &lt;div&gt;查看系统数据统计和分析报告&lt;/div&gt;
  &lt;/template&gt;
  &lt;template #extra&gt;
    &lt;el-button type="primary"&gt;导出报告&lt;/el-button&gt;
  &lt;/template&gt;
&lt;/el-page-header&gt;</code></pre>
          </div>

          <div class="code-block">
            <h4>不同尺寸</h4>
            <pre><code>&lt;!-- 大尺寸 --&gt;
&lt;el-page-header size="large" ... /&gt;

&lt;!-- 默认尺寸 --&gt;
&lt;el-page-header ... /&gt;

&lt;!-- 小尺寸 --&gt;
&lt;el-page-header size="small" ... /&gt;</code></pre>
          </div>

          <div class="code-block">
            <h4>主要属性</h4>
            <pre><code>// 图标
icon: String

// 标题
title: String

// 内容
content: String

// 尺寸
size: 'large' | 'default' | 'small'</code></pre>
          </div>

          <div class="code-block">
            <h4>插槽</h4>
            <pre><code>// 自定义图标
#icon

// 自定义标题
#title

// 自定义内容
#content

// 右侧操作区域
#extra</code></pre>
          </div>

          <div class="code-block">
            <h4>事件</h4>
            <pre><code>// 返回按钮点击
@back="handleBack"</code></pre>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { DataAnalysis, Search } from '@element-plus/icons-vue'

// 抽屉显示状态
const show = ref(false)

// 搜索值
const searchValue = ref('')

// 表单数据
const form = reactive({
  username: '',
  email: '',
  phone: '',
  role: ''
})

// 表格数据
const tableData = ref([
  { name: '张三', email: 'zhangsan@example.com', role: '管理员' },
  { name: '李四', email: 'lisi@example.com', role: '编辑' },
  { name: '王五', email: 'wangwu@example.com', role: '查看者' }
])

// 配置对象
const cfg = reactive({
  icon: 'House',
  title: '首页',
  content: '欢迎来到系统首页'
})

// 事件处理
const handleBack = () => {
  ElMessage.info('返回上一页')
}

const handleReset = () => {
  Object.assign(form, {
    username: '',
    email: '',
    phone: '',
    role: ''
  })
  ElMessage.success('表单已重置')
}

const handleSave = () => {
  ElMessage.success('保存成功')
}

const handleAdd = () => {
  ElMessage.info('新增用户')
}

const handleEdit = (row) => {
  ElMessage.info(`编辑用户: ${row.name}`)
}

const handleDelete = (row) => {
  ElMessage.warning(`删除用户: ${row.name}`)
}

const openDrawer = () => {
  show.value = true
}
</script>

<style scoped>
.page-header-demo {
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
