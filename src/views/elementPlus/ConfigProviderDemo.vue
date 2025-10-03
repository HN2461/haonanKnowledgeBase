<template>
  <div class="demo-container">
    <div class="demo-header">
      <h2>全局配置 ConfigProvider</h2>
      <p>为组件提供全局配置，包括主题、语言、尺寸等设置</p>
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
          <h4>全局配置演示</h4>
          <el-config-provider
            :locale="cfg.locale"
            :size="cfg.size"
            :z-index="cfg.zIndex"
            :button="cfg.button"
            :message="cfg.message"
            :namespace="cfg.namespace"
          >
            <div class="config-demo">
              <h4>配置影响下的组件</h4>
              <div class="component-group">
                <el-button type="primary">主要按钮</el-button>
                <el-button type="success">成功按钮</el-button>
                <el-button type="warning">警告按钮</el-button>
                <el-button type="danger">危险按钮</el-button>
              </div>
              
              <div class="component-group">
                <el-input v-model="inputValue" placeholder="输入框" />
                <el-input v-model="inputValue" placeholder="输入框" type="textarea" />
              </div>
              
              <div class="component-group">
                <el-select v-model="selectValue" placeholder="选择器">
                  <el-option label="选项1" value="1" />
                  <el-option label="选项2" value="2" />
                  <el-option label="选项3" value="3" />
                </el-select>
              </div>
              
              <div class="component-group">
                <el-switch v-model="switchValue" />
                <el-checkbox v-model="checkboxValue">复选框</el-checkbox>
                <el-radio v-model="radioValue" label="1">单选框</el-radio>
              </div>
            </div>
          </el-config-provider>
        </div>

        <div class="demo-section">
          <h4>不同尺寸演示</h4>
          <div class="size-group">
            <div class="size-item">
              <h4>小尺寸</h4>
              <el-config-provider size="small">
                <div class="component-group">
                  <el-button type="primary">小按钮</el-button>
                  <el-input placeholder="小输入框" />
                  <el-select placeholder="小选择器">
                    <el-option label="选项1" value="1" />
                  </el-select>
                </div>
              </el-config-provider>
            </div>
            <div class="size-item">
              <h4>默认尺寸</h4>
              <el-config-provider size="default">
                <div class="component-group">
                  <el-button type="primary">默认按钮</el-button>
                  <el-input placeholder="默认输入框" />
                  <el-select placeholder="默认选择器">
                    <el-option label="选项1" value="1" />
                  </el-select>
                </div>
              </el-config-provider>
            </div>
            <div class="size-item">
              <h4>大尺寸</h4>
              <el-config-provider size="large">
                <div class="component-group">
                  <el-button type="primary">大按钮</el-button>
                  <el-input placeholder="大输入框" />
                  <el-select placeholder="大选择器">
                    <el-option label="选项1" value="1" />
                  </el-select>
                </div>
              </el-config-provider>
            </div>
          </div>
        </div>

        <div class="demo-section">
          <h4>状态显示</h4>
          <p><strong>语言：</strong>{{ cfg.locale }}</p>
          <p><strong>尺寸：</strong>{{ cfg.size }}</p>
          <p><strong>层级：</strong>{{ cfg.zIndex }}</p>
          <p><strong>命名空间：</strong>{{ cfg.namespace }}</p>
          <p><strong>按钮配置：</strong>{{ JSON.stringify(cfg.button) }}</p>
          <p><strong>消息配置：</strong>{{ JSON.stringify(cfg.message) }}</p>
        </div>
      </el-card>
    </div>

    <!-- 属性设置抽屉 -->
    <el-drawer
      v-model="showSettings"
      title="全局配置属性设置"
      direction="rtl"
      size="45%"
    >
      <div class="settings-container">
        <!-- 基础属性 -->
        <div class="form-section">
          <div class="section-title">基础属性</div>
          
          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">size</span>
              <span class="help-text">组件尺寸</span>
            </div>
            <el-radio-group v-model="cfg.size">
              <el-radio-button label="small">small</el-radio-button>
              <el-radio-button label="default">default</el-radio-button>
              <el-radio-button label="large">large</el-radio-button>
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
              <span class="prop-name">namespace</span>
              <span class="help-text">命名空间</span>
            </div>
            <el-input v-model="cfg.namespace" placeholder="请输入命名空间" />
          </div>
        </div>

        <!-- 按钮配置 -->
        <div class="form-section">
          <div class="section-title">按钮配置</div>
          
          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">autoInsertSpace</span>
              <span class="help-text">自动插入空格</span>
            </div>
            <el-switch v-model="cfg.button.autoInsertSpace" />
          </div>
        </div>

        <!-- 使用说明 -->
        <div class="form-section">
          <div class="section-title">使用说明</div>
          
          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">基础用法</span>
              <span class="help-text">全局配置的基本使用方式</span>
            </div>
            <div class="code-block">
              <pre><code>&lt;el-config-provider :locale="locale" :size="size"&gt;
  &lt;el-button&gt;按钮&lt;/el-button&gt;
  &lt;el-input placeholder="输入框" /&gt;
&lt;/el-config-provider&gt;</code></pre>
            </div>
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">国际化配置</span>
              <span class="help-text">设置组件的语言</span>
            </div>
            <div class="code-block">
              <pre><code>import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'

&lt;el-config-provider :locale="zhCn"&gt;
  &lt;!-- 组件内容 --&gt;
&lt;/el-config-provider&gt;</code></pre>
            </div>
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">全局尺寸</span>
              <span class="help-text">设置所有组件的默认尺寸</span>
            </div>
            <div class="code-block">
              <pre><code>&lt;el-config-provider size="large"&gt;
  &lt;el-button&gt;大按钮&lt;/el-button&gt;
  &lt;el-input placeholder="大输入框" /&gt;
&lt;/el-config-provider&gt;</code></pre>
            </div>
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">按钮配置</span>
              <span class="help-text">配置按钮的全局属性</span>
            </div>
            <div class="code-block">
              <pre><code>&lt;el-config-provider :button="{ autoInsertSpace: true }"&gt;
  &lt;el-button&gt;按钮&lt;/el-button&gt;
&lt;/el-config-provider&gt;</code></pre>
            </div>
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">消息配置</span>
              <span class="help-text">配置消息组件的全局属性</span>
            </div>
            <div class="code-block">
              <pre><code>&lt;el-config-provider :message="{ max: 3 }"&gt;
  &lt;!-- 组件内容 --&gt;
&lt;/el-config-provider&gt;</code></pre>
            </div>
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">命名空间</span>
              <span class="help-text">自定义组件的命名空间</span>
            </div>
            <div class="code-block">
              <pre><code>&lt;el-config-provider namespace="ep"&gt;
  &lt;!-- 组件内容 --&gt;
&lt;/el-config-provider&gt;</code></pre>
            </div>
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">层级配置</span>
              <span class="help-text">设置组件的默认层级</span>
            </div>
            <div class="code-block">
              <pre><code>&lt;el-config-provider :z-index="3000"&gt;
  &lt;!-- 组件内容 --&gt;
&lt;/el-config-provider&gt;</code></pre>
            </div>
          </div>
        </div>

        <!-- 消息配置 -->
        <div class="form-section">
          <div class="section-title">消息配置</div>
          
          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">max</span>
              <span class="help-text">最大显示数量</span>
            </div>
            <el-input-number v-model="cfg.message.max" :min="1" :max="10" />
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'

// 响应式数据
const showSettings = ref(false)
const inputValue = ref('')
const selectValue = ref('')
const switchValue = ref(false)
const checkboxValue = ref(false)
const radioValue = ref('')

// 配置对象
const cfg = reactive({
  locale: zhCn,
  size: 'default',
  zIndex: 2000,
  namespace: 'el',
  button: {
    autoInsertSpace: true
  },
  message: {
    max: 3
  }
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

.config-demo {
  padding: 20px;
  background: #f5f7fa;
  border-radius: 4px;
}

.config-demo h4 {
  margin: 0 0 20px 0;
  color: #303133;
}

.component-group {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  align-items: center;
}

.size-group {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.size-item {
  padding: 20px;
  background: #fff;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
}

.size-item h4 {
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
