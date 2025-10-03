<template>
  <div class="demo-container">
    <div class="demo-header">
      <h2>标签 Tag</h2>
      <p>用于标记和选择，支持多种颜色、尺寸和状态</p>
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
          <h4>标签演示</h4>
          <el-tag
            :type="cfg.type"
            :size="cfg.size"
            :effect="cfg.effect"
            :round="cfg.round"
            :closable="cfg.closable"
            :disable-transitions="cfg.disableTransitions"
            :hit="cfg.hit"
            :color="cfg.color"
            @close="handleClose"
            @click="handleClick"
        >
          {{ cfg.text }}
        </el-tag>
        </div>

        <div class="demo-section">
          <h4>不同类型演示</h4>
          <div class="tag-group">
            <el-tag>默认标签</el-tag>
            <el-tag type="success">成功标签</el-tag>
            <el-tag type="info">信息标签</el-tag>
            <el-tag type="warning">警告标签</el-tag>
            <el-tag type="danger">危险标签</el-tag>
          </div>
        </div>

        <div class="demo-section">
          <h4>不同尺寸演示</h4>
          <div class="tag-group">
            <el-tag size="large">大标签</el-tag>
            <el-tag size="default">默认标签</el-tag>
            <el-tag size="small">小标签</el-tag>
          </div>
        </div>

        <div class="demo-section">
          <h4>不同效果演示</h4>
          <div class="tag-group">
            <el-tag effect="dark">深色标签</el-tag>
            <el-tag effect="light">浅色标签</el-tag>
            <el-tag effect="plain">朴素标签</el-tag>
          </div>
        </div>

        <div class="demo-section">
          <h4>可关闭标签演示</h4>
          <div class="tag-group">
            <el-tag
              v-for="tag in closableTags"
              :key="tag.name"
              closable
              @close="handleCloseTag(tag)"
            >
              {{ tag.name }}
            </el-tag>
          </div>
        </div>

        <div class="demo-section">
          <h4>自定义颜色演示</h4>
          <div class="tag-group">
            <el-tag color="#f50">#f50</el-tag>
            <el-tag color="#2db7f5">#2db7f5</el-tag>
            <el-tag color="#87d068">#87d068</el-tag>
            <el-tag color="#108ee9">#108ee9</el-tag>
          </div>
        </div>

        <div class="demo-section">
          <h4>状态显示</h4>
          <p><strong>类型：</strong>{{ cfg.type }}</p>
          <p><strong>尺寸：</strong>{{ cfg.size }}</p>
          <p><strong>效果：</strong>{{ cfg.effect }}</p>
          <p><strong>圆角：</strong>{{ cfg.round ? '是' : '否' }}</p>
          <p><strong>可关闭：</strong>{{ cfg.closable ? '是' : '否' }}</p>
          <p><strong>禁用过渡：</strong>{{ cfg.disableTransitions ? '是' : '否' }}</p>
          <p><strong>边框：</strong>{{ cfg.hit ? '是' : '否' }}</p>
          <p><strong>颜色：</strong>{{ cfg.color }}</p>
          <p><strong>文字：</strong>{{ cfg.text }}</p>
        </div>
      </el-card>
    </div>

    <!-- 属性设置抽屉 -->
    <el-drawer
      v-model="showSettings"
      title="标签属性设置"
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
              <pre><code>&lt;el-tag&gt;标签一&lt;/el-tag&gt;
&lt;el-tag&gt;标签二&lt;/el-tag&gt;
&lt;el-tag&gt;标签三&lt;/el-tag&gt;</code></pre>
            </div>
          </div>
          
          <div class="usage-item">
            <h5>2. 不同类型</h5>
            <div class="code-block">
              <pre><code>&lt;el-tag&gt;默认标签&lt;/el-tag&gt;
&lt;el-tag type="success"&gt;成功标签&lt;/el-tag&gt;
&lt;el-tag type="info"&gt;信息标签&lt;/el-tag&gt;
&lt;el-tag type="warning"&gt;警告标签&lt;/el-tag&gt;
&lt;el-tag type="danger"&gt;危险标签&lt;/el-tag&gt;</code></pre>
            </div>
          </div>
          
          <div class="usage-item">
            <h5>3. 不同尺寸</h5>
            <div class="code-block">
              <pre><code>&lt;el-tag size="large"&gt;大标签&lt;/el-tag&gt;
&lt;el-tag size="default"&gt;默认标签&lt;/el-tag&gt;
&lt;el-tag size="small"&gt;小标签&lt;/el-tag&gt;</code></pre>
            </div>
          </div>
          
          <div class="usage-item">
            <h5>4. 不同主题</h5>
            <div class="code-block">
              <pre><code>&lt;el-tag effect="dark"&gt;深色标签&lt;/el-tag&gt;
&lt;el-tag effect="light"&gt;浅色标签&lt;/el-tag&gt;
&lt;el-tag effect="plain"&gt;朴素标签&lt;/el-tag&gt;</code></pre>
            </div>
          </div>
          
          <div class="usage-item">
            <h5>5. 可关闭标签</h5>
            <div class="code-block">
              <pre><code>&lt;el-tag 
  v-for="tag in tags" 
  :key="tag" 
  closable 
  @close="handleClose(tag)"
&gt;
  {{ tag }}
&lt;/el-tag&gt;

&lt;script setup&gt;
import { ref } from 'vue'

const tags = ref(['标签一', '标签二', '标签三'])

const handleClose = (tag) => {
  const index = tags.value.indexOf(tag)
  if (index > -1) {
    tags.value.splice(index, 1)
  }
}
&lt;/script&gt;</code></pre>
            </div>
          </div>
          
          <div class="usage-item">
            <h5>6. 自定义颜色</h5>
            <div class="code-block">
              <pre><code>&lt;el-tag color="#f50"&gt;自定义颜色&lt;/el-tag&gt;
&lt;el-tag color="#2db7f5"&gt;自定义颜色&lt;/el-tag&gt;
&lt;el-tag color="#87d068"&gt;自定义颜色&lt;/el-tag&gt;</code></pre>
            </div>
          </div>
          
          <div class="usage-item">
            <h5>7. 圆角标签</h5>
            <div class="code-block">
              <pre><code>&lt;el-tag round&gt;圆角标签&lt;/el-tag&gt;
&lt;el-tag type="success" round&gt;圆角成功标签&lt;/el-tag&gt;</code></pre>
            </div>
          </div>
          
          <div class="usage-item">
            <h5>8. 事件处理</h5>
            <div class="code-block">
              <pre><code>&lt;el-tag 
  closable 
  @close="handleClose" 
  @click="handleClick"
&gt;
  可点击标签
&lt;/el-tag&gt;

&lt;script setup&gt;
const handleClose = () => {
  console.log('标签关闭')
}

const handleClick = () => {
  console.log('标签点击')
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
              <span class="prop-name">type</span>
              <span class="help-text">类型</span>
            </div>
            <el-radio-group v-model="cfg.type">
              <el-radio-button label="">默认</el-radio-button>
              <el-radio-button label="success">success</el-radio-button>
              <el-radio-button label="info">info</el-radio-button>
              <el-radio-button label="warning">warning</el-radio-button>
              <el-radio-button label="danger">danger</el-radio-button>
            </el-radio-group>
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">size</span>
              <span class="help-text">尺寸</span>
            </div>
            <el-radio-group v-model="cfg.size">
              <el-radio-button label="large">large</el-radio-button>
              <el-radio-button label="default">default</el-radio-button>
              <el-radio-button label="small">small</el-radio-button>
            </el-radio-group>
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">effect</span>
              <span class="help-text">主题</span>
            </div>
            <el-radio-group v-model="cfg.effect">
              <el-radio-button label="dark">dark</el-radio-button>
              <el-radio-button label="light">light</el-radio-button>
              <el-radio-button label="plain">plain</el-radio-button>
            </el-radio-group>
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">text</span>
              <span class="help-text">标签文字</span>
            </div>
            <el-input v-model="cfg.text" placeholder="请输入标签文字" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">color</span>
              <span class="help-text">自定义颜色</span>
            </div>
            <el-color-picker v-model="cfg.color" />
          </div>
        </div>

        <!-- 状态属性 -->
        <div class="form-section">
          <div class="section-title">状态属性</div>
          
          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">round</span>
              <span class="help-text">是否圆角</span>
            </div>
            <el-switch v-model="cfg.round" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">closable</span>
              <span class="help-text">是否可关闭</span>
            </div>
            <el-switch v-model="cfg.closable" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">disableTransitions</span>
              <span class="help-text">是否禁用渐变动画</span>
            </div>
            <el-switch v-model="cfg.disableTransitions" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">hit</span>
              <span class="help-text">是否有边框描边</span>
            </div>
            <el-switch v-model="cfg.hit" />
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
const closableTags = ref([
  { name: '标签一' },
  { name: '标签二' },
  { name: '标签三' },
  { name: '标签四' }
])

// 配置对象
const cfg = reactive({
  type: '',
  size: 'default',
  effect: 'light',
  round: false,
  closable: false,
  disableTransitions: false,
  hit: false,
  color: '',
  text: '标签'
})

// 事件处理
const handleClose = (event) => {
  console.log('标签关闭:', event)
  ElMessage.success('标签关闭')
}

const handleClick = (event) => {
  console.log('标签点击:', event)
  ElMessage.info('标签点击')
}

const handleCloseTag = (tag) => {
  const index = closableTags.value.indexOf(tag)
  if (index > -1) {
    closableTags.value.splice(index, 1)
    ElMessage.success(`关闭标签: ${tag.name}`)
  }
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

.tag-group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
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
