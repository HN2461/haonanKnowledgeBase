<template>
  <div class="demo-container">
    <div class="demo-header">
      <h2>徽章 Badge</h2>
      <p>出现在按钮、图标旁的数字或状态标记</p>
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
          <h4>徽章演示</h4>
          <el-badge
            :value="cfg.value"
            :max="cfg.max"
            :is-dot="cfg.isDot"
            :hidden="cfg.hidden"
            :type="cfg.type"
            :show-zero="cfg.showZero"
        >
          <el-button>消息</el-button>
        </el-badge>
        </div>

        <div class="demo-section">
          <h4>不同数值演示</h4>
          <div class="badge-group">
            <el-badge :value="12">
              <el-button>评论</el-button>
            </el-badge>
            <el-badge :value="3">
              <el-button>回复</el-button>
            </el-badge>
            <el-badge :value="1" type="primary">
              <el-button>评论</el-button>
            </el-badge>
            <el-badge :value="2" type="warning">
              <el-button>回复</el-button>
            </el-badge>
          </div>
        </div>

        <div class="demo-section">
          <h4>小圆点演示</h4>
          <div class="badge-group">
            <el-badge is-dot>
              <el-button>消息</el-button>
            </el-badge>
            <el-badge is-dot type="success">
              <el-button>消息</el-button>
            </el-badge>
            <el-badge is-dot type="warning">
              <el-button>消息</el-button>
            </el-badge>
            <el-badge is-dot type="danger">
              <el-button>消息</el-button>
            </el-badge>
          </div>
        </div>

        <div class="demo-section">
          <h4>最大值演示</h4>
          <div class="badge-group">
            <el-badge :value="200" :max="99">
              <el-button>消息</el-button>
            </el-badge>
            <el-badge :value="100" :max="10">
              <el-button>消息</el-button>
            </el-badge>
          </div>
        </div>

        <div class="demo-section">
          <h4>自定义内容演示</h4>
          <div class="badge-group">
            <el-badge value="new">
              <el-button>消息</el-button>
            </el-badge>
            <el-badge value="hot">
              <el-button>消息</el-button>
            </el-badge>
            <el-badge value="NEW">
              <el-button>消息</el-button>
            </el-badge>
          </div>
        </div>

        <div class="demo-section">
          <h4>状态显示</h4>
          <p><strong>数值：</strong>{{ cfg.value }}</p>
          <p><strong>最大值：</strong>{{ cfg.max }}</p>
          <p><strong>小圆点：</strong>{{ cfg.isDot ? '是' : '否' }}</p>
          <p><strong>隐藏：</strong>{{ cfg.hidden ? '是' : '否' }}</p>
          <p><strong>类型：</strong>{{ cfg.type }}</p>
          <p><strong>显示零值：</strong>{{ cfg.showZero ? '是' : '否' }}</p>
        </div>
      </el-card>
    </div>

    <!-- 属性设置抽屉 -->
    <el-drawer
      v-model="showSettings"
      title="徽章属性设置"
      direction="rtl"
      size="45%"
    >
      <div class="settings-container">
        <!-- 基础属性 -->
        <div class="form-section">
          <div class="section-title">基础属性</div>
          
          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">value</span>
              <span class="help-text">显示值</span>
            </div>
            <el-input v-model="cfg.value" placeholder="请输入显示值" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">max</span>
              <span class="help-text">最大值，超过最大值会显示 '{max}+'</span>
            </div>
            <el-input-number v-model="cfg.max" :min="1" :max="999" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">type</span>
              <span class="help-text">类型</span>
            </div>
            <el-radio-group v-model="cfg.type">
              <el-radio-button label="">默认</el-radio-button>
              <el-radio-button label="primary">primary</el-radio-button>
              <el-radio-button label="success">success</el-radio-button>
              <el-radio-button label="warning">warning</el-radio-button>
              <el-radio-button label="danger">danger</el-radio-button>
              <el-radio-button label="info">info</el-radio-button>
            </el-radio-group>
          </div>
        </div>

        <!-- 使用说明 -->
        <div class="form-section">
          <div class="section-title">使用说明</div>
          
          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">基础用法</span>
              <span class="help-text">徽章的基本使用方式</span>
            </div>
            <div class="code-block">
              <pre><code>&lt;el-badge :value="12"&gt;
  &lt;el-button&gt;消息&lt;/el-button&gt;
&lt;/el-badge&gt;</code></pre>
            </div>
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">最大值</span>
              <span class="help-text">设置徽章的最大值</span>
            </div>
            <div class="code-block">
              <pre><code>&lt;el-badge :value="200" :max="99"&gt;
  &lt;el-button&gt;消息&lt;/el-button&gt;
&lt;/el-badge&gt;</code></pre>
            </div>
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">小圆点</span>
              <span class="help-text">显示小圆点徽章</span>
            </div>
            <div class="code-block">
              <pre><code>&lt;el-badge is-dot&gt;
  &lt;el-button&gt;消息&lt;/el-button&gt;
&lt;/el-badge&gt;</code></pre>
            </div>
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">不同类型</span>
              <span class="help-text">设置徽章的类型</span>
            </div>
            <div class="code-block">
              <pre><code>&lt;el-badge :value="12" type="primary"&gt;
  &lt;el-button&gt;主要&lt;/el-button&gt;
&lt;/el-badge&gt;

&lt;el-badge :value="12" type="success"&gt;
  &lt;el-button&gt;成功&lt;/el-button&gt;
&lt;/el-badge&gt;

&lt;el-badge :value="12" type="warning"&gt;
  &lt;el-button&gt;警告&lt;/el-button&gt;
&lt;/el-badge&gt;

&lt;el-badge :value="12" type="danger"&gt;
  &lt;el-button&gt;危险&lt;/el-button&gt;
&lt;/el-badge&gt;</code></pre>
            </div>
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">自定义内容</span>
              <span class="help-text">使用自定义内容作为徽章</span>
            </div>
            <div class="code-block">
              <pre><code>&lt;el-badge value="new"&gt;
  &lt;el-button&gt;消息&lt;/el-button&gt;
&lt;/el-badge&gt;

&lt;el-badge value="hot"&gt;
  &lt;el-button&gt;消息&lt;/el-button&gt;
&lt;/el-badge&gt;</code></pre>
            </div>
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">显示零值</span>
              <span class="help-text">控制是否显示零值</span>
            </div>
            <div class="code-block">
              <pre><code>&lt;el-badge :value="0" :show-zero="true"&gt;
  &lt;el-button&gt;消息&lt;/el-button&gt;
&lt;/el-badge&gt;</code></pre>
            </div>
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">隐藏徽章</span>
              <span class="help-text">控制徽章的显示和隐藏</span>
            </div>
            <div class="code-block">
              <pre><code>&lt;el-badge :value="12" :hidden="isHidden"&gt;
  &lt;el-button&gt;消息&lt;/el-button&gt;
&lt;/el-badge&gt;</code></pre>
            </div>
          </div>
        </div>

        <!-- 状态属性 -->
        <div class="form-section">
          <div class="section-title">状态属性</div>
          
          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">isDot</span>
              <span class="help-text">是否显示小圆点</span>
            </div>
            <el-switch v-model="cfg.isDot" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">hidden</span>
              <span class="help-text">是否隐藏徽章</span>
            </div>
            <el-switch v-model="cfg.hidden" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">showZero</span>
              <span class="help-text">当数值为0时，是否显示徽章</span>
            </div>
            <el-switch v-model="cfg.showZero" />
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
  value: 12,
  max: 99,
  isDot: false,
  hidden: false,
  type: '',
  showZero: false
})

// 事件处理
const handleError = (event) => {
  console.log('徽章错误:', event)
  ElMessage.error('徽章错误')
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

.badge-group {
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
