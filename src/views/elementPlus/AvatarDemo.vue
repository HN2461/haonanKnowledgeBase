<template>
  <div class="demo-container">
    <div class="demo-header">
      <h2>头像 Avatar</h2>
      <p>用来代表用户或事物，支持图片、图标或字符展示</p>
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
          <h4>头像演示</h4>
          <el-avatar
            :size="cfg.size"
            :shape="cfg.shape"
            :src="cfg.src"
            :icon="cfg.icon"
            :alt="cfg.alt"
            :fit="cfg.fit"
            @error="handleError"
        >
          {{ cfg.text }}
        </el-avatar>
        </div>

        <div class="demo-section">
          <h4>不同尺寸演示</h4>
          <div class="avatar-group">
            <el-avatar :size="60">大</el-avatar>
            <el-avatar :size="40">中</el-avatar>
            <el-avatar :size="20">小</el-avatar>
          </div>
        </div>

        <div class="demo-section">
          <h4>不同形状演示</h4>
          <div class="avatar-group">
            <el-avatar shape="circle">圆</el-avatar>
            <el-avatar shape="square">方</el-avatar>
          </div>
        </div>

        <div class="demo-section">
          <h4>不同类型演示</h4>
          <div class="avatar-group">
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
            <el-avatar icon="User" />
            <el-avatar>U</el-avatar>
          </div>
        </div>

        <div class="demo-section">
          <h4>状态显示</h4>
          <p><strong>尺寸：</strong>{{ cfg.size }}</p>
          <p><strong>形状：</strong>{{ cfg.shape }}</p>
          <p><strong>图片源：</strong>{{ cfg.src || '无' }}</p>
          <p><strong>图标：</strong>{{ cfg.icon || '无' }}</p>
          <p><strong>替代文本：</strong>{{ cfg.alt }}</p>
          <p><strong>适应方式：</strong>{{ cfg.fit }}</p>
          <p><strong>文字：</strong>{{ cfg.text }}</p>
        </div>
      </el-card>
    </div>

    <!-- 属性设置抽屉 -->
    <el-drawer
      v-model="showSettings"
      title="头像属性设置"
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
              <span class="help-text">头像的基本使用方式</span>
            </div>
            <div class="code-block">
              <pre><code>&lt;el-avatar&gt;用户&lt;/el-avatar&gt;
&lt;el-avatar src="https://example.com/avatar.jpg" /&gt;
&lt;el-avatar icon="User" /&gt;</code></pre>
            </div>
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">不同尺寸</span>
              <span class="help-text">设置头像的尺寸</span>
            </div>
            <div class="code-block">
              <pre><code>&lt;el-avatar :size="60"&gt;大&lt;/el-avatar&gt;
&lt;el-avatar :size="40"&gt;中&lt;/el-avatar&gt;
&lt;el-avatar :size="20"&gt;小&lt;/el-avatar&gt;</code></pre>
            </div>
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">不同形状</span>
              <span class="help-text">设置头像的形状</span>
            </div>
            <div class="code-block">
              <pre><code>&lt;el-avatar shape="circle"&gt;圆&lt;/el-avatar&gt;
&lt;el-avatar shape="square"&gt;方&lt;/el-avatar&gt;</code></pre>
            </div>
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">图片头像</span>
              <span class="help-text">使用图片作为头像</span>
            </div>
            <div class="code-block">
              <pre><code>&lt;el-avatar
  src="https://example.com/avatar.jpg"
  alt="用户头像"
  :fit="cover"
/&gt;</code></pre>
            </div>
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">图标头像</span>
              <span class="help-text">使用图标作为头像</span>
            </div>
            <div class="code-block">
              <pre><code>&lt;el-avatar icon="User" /&gt;
&lt;el-avatar icon="Setting" /&gt;</code></pre>
            </div>
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">文字头像</span>
              <span class="help-text">使用文字作为头像</span>
            </div>
            <div class="code-block">
              <pre><code>&lt;el-avatar&gt;U&lt;/el-avatar&gt;
&lt;el-avatar&gt;用户&lt;/el-avatar&gt;</code></pre>
            </div>
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">图片适应方式</span>
              <span class="help-text">设置图片的适应方式</span>
            </div>
            <div class="code-block">
              <pre><code>&lt;el-avatar src="image.jpg" fit="cover" /&gt;
&lt;el-avatar src="image.jpg" fit="contain" /&gt;
&lt;el-avatar src="image.jpg" fit="fill" /&gt;</code></pre>
            </div>
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">事件处理</span>
              <span class="help-text">监听头像事件</span>
            </div>
            <div class="code-block">
              <pre><code>&lt;el-avatar
  src="image.jpg"
  @error="handleError"
/&gt;

&lt;script setup&gt;
const handleError = (event) => {
  console.log('图片加载失败:', event)
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
              <span class="prop-name">size</span>
              <span class="help-text">设置头像的大小</span>
            </div>
            <el-radio-group v-model="cfg.size">
              <el-radio-button :label="20">小 (20px)</el-radio-button>
              <el-radio-button :label="40">中 (40px)</el-radio-button>
              <el-radio-button :label="60">大 (60px)</el-radio-button>
              <el-radio-button :label="80">超大 (80px)</el-radio-button>
            </el-radio-group>
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">shape</span>
              <span class="help-text">设置头像的形状</span>
            </div>
            <el-radio-group v-model="cfg.shape">
              <el-radio-button label="circle">circle</el-radio-button>
              <el-radio-button label="square">square</el-radio-button>
            </el-radio-group>
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">src</span>
              <span class="help-text">图片类头像的资源地址</span>
            </div>
            <el-input v-model="cfg.src" placeholder="请输入图片地址" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">icon</span>
              <span class="help-text">设置头像的图标类型</span>
            </div>
            <el-input v-model="cfg.icon" placeholder="如: User" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">alt</span>
              <span class="help-text">图片类头像的alt属性</span>
            </div>
            <el-input v-model="cfg.alt" placeholder="请输入替代文本" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">fit</span>
              <span class="help-text">当展示类型为图片的时候，设置图片如何适应容器框</span>
            </div>
            <el-radio-group v-model="cfg.fit">
              <el-radio-button label="fill">fill</el-radio-button>
              <el-radio-button label="contain">contain</el-radio-button>
              <el-radio-button label="cover">cover</el-radio-button>
              <el-radio-button label="none">none</el-radio-button>
              <el-radio-button label="scale-down">scale-down</el-radio-button>
            </el-radio-group>
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">text</span>
              <span class="help-text">文字类头像的内容</span>
            </div>
            <el-input v-model="cfg.text" placeholder="请输入文字内容" />
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
  size: 40,
  shape: 'circle',
  src: '',
  icon: '',
  alt: '头像',
  fit: 'cover',
  text: '头像'
})

// 事件处理
const handleError = (event) => {
  console.log('头像加载失败:', event)
  ElMessage.error('头像加载失败')
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

.avatar-group {
  display: flex;
  gap: 20px;
  align-items: center;
  flex-wrap: wrap;
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
