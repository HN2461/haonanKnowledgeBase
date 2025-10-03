<template>
  <div class="demo-page">
    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <span>Message 消息提示</span>
          <el-button type="primary" @click="show = true">属性设置</el-button>
        </div>
      </template>
      
      <!-- 预览消息 -->
      <div class="message-preview">
        <div class="demo-buttons">
          <el-button @click="showMessage('success')">成功消息</el-button>
          <el-button @click="showMessage('warning')">警告消息</el-button>
          <el-button @click="showMessage('error')">错误消息</el-button>
          <el-button @click="showMessage('info')">信息消息</el-button>
        </div>
        
        <div class="demo-buttons">
          <el-button @click="showCustomMessage">自定义消息</el-button>
          <el-button @click="showDurationMessage">时长消息</el-button>
          <el-button @click="showHtmlMessage">HTML消息</el-button>
          <el-button @click="showGroupMessage">分组消息</el-button>
        </div>
      </div>
      
      <!-- 状态显示 -->
      <div class="status">
        <div>消息类型: {{ cfg.type }}</div>
        <div>显示时长: {{ cfg.duration }}ms</div>
        <div>是否显示关闭按钮: {{ cfg.showClose ? '是' : '否' }}</div>
        <div>是否居中: {{ cfg.center ? '是' : '否' }}</div>
      </div>
    </el-card>

    <el-drawer v-model="show" title="消息属性设置" size="45%">
      <div class="drawer-content">
        <el-alert type="info" show-icon :closable="false" style="margin-bottom: 20px;"
          description="提示：1) Message 是全局消息提示组件；2) 支持多种类型和样式；3) 可以自定义内容和行为。" />
        
        <!-- 使用说明 -->
        <div class="section">
          <h4>使用说明</h4>
          
          <div class="usage-item">
            <h5>1. 基础用法</h5>
            <div class="code-block">
              <pre><code>import { ElMessage } from 'element-plus'

// 成功消息
ElMessage.success('这是一条成功消息')

// 警告消息
ElMessage.warning('这是一条警告消息')

// 错误消息
ElMessage.error('这是一条错误消息')

// 信息消息
ElMessage.info('这是一条信息消息')</code></pre>
            </div>
          </div>
          
          <div class="usage-item">
            <h5>2. 自定义消息</h5>
            <div class="code-block">
              <pre><code>ElMessage({
  message: '恭喜你，这是一条成功消息',
  type: 'success',
  duration: 3000,
  showClose: true
})</code></pre>
            </div>
          </div>
          
          <div class="usage-item">
            <h5>3. 分组消息</h5>
            <div class="code-block">
              <pre><code>// 分组消息，相同类型的消息会合并
ElMessage.success('操作成功')
ElMessage.success('数据已保存')
ElMessage.success('提交完成')</code></pre>
            </div>
          </div>
          
          <div class="usage-item">
            <h5>4. 关闭所有消息</h5>
            <div class="code-block">
              <pre><code>ElMessage.closeAll()</code></pre>
            </div>
          </div>
        </div>
        
        <!-- 基础属性 -->
        <div class="section">
          <h4>基础属性</h4>
          
          <div class="form-item">
            <div class="label-text">消息类型</div>
            <div class="prop-name">type</div>
            <el-radio-group v-model="cfg.type">
              <el-radio-button label="success">success</el-radio-button>
              <el-radio-button label="warning">warning</el-radio-button>
              <el-radio-button label="error">error</el-radio-button>
              <el-radio-button label="info">info</el-radio-button>
            </el-radio-group>
            <div class="help-text">消息的类型</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">消息内容</div>
            <div class="prop-name">message</div>
            <el-input v-model="cfg.message" placeholder="请输入消息内容" />
            <div class="help-text">消息的内容</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">显示时长</div>
            <div class="prop-name">duration</div>
            <el-input-number v-model="cfg.duration" :min="0" :max="10000" />
            <div class="help-text">显示时长，0 为不自动关闭</div>
          </div>
        </div>
        
        <!-- 显示设置 -->
        <div class="section">
          <h4>显示设置</h4>
          
          <div class="form-item">
            <div class="label-text">显示关闭按钮</div>
            <div class="prop-name">showClose</div>
            <el-switch v-model="cfg.showClose" />
            <div class="help-text">是否显示关闭按钮</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">居中显示</div>
            <div class="prop-name">center</div>
            <el-switch v-model="cfg.center" />
            <div class="help-text">是否居中显示</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">危险模式</div>
            <div class="prop-name">dangerouslyUseHTMLString</div>
            <el-switch v-model="cfg.dangerouslyUseHTMLString" />
            <div class="help-text">是否将 message 属性作为 HTML 片段处理</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">自定义类名</div>
            <div class="prop-name">customClass</div>
            <el-input v-model="cfg.customClass" placeholder="如 custom-message" style="width: 200px;" />
            <div class="help-text">自定义消息的类名</div>
          </div>
        </div>
        
        <!-- 高级设置 -->
        <div class="section">
          <h4>高级设置</h4>
          
          <div class="form-item">
            <div class="label-text">层级</div>
            <div class="prop-name">zIndex</div>
            <el-input-number v-model="cfg.zIndex" :min="1" :max="9999" />
            <div class="help-text">消息的层级</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">分组</div>
            <div class="prop-name">grouping</div>
            <el-switch v-model="cfg.grouping" />
            <div class="help-text">是否合并为一条消息</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">偏移量</div>
            <div class="prop-name">offset</div>
            <el-input-number v-model="cfg.offset" :min="0" :max="100" />
            <div class="help-text">距离顶部的偏移量</div>
          </div>
        </div>
        
        <!-- 使用说明 -->
        <div class="section">
          <h4>使用说明</h4>
          
          <div class="form-item">
            <div class="label-text">基本用法</div>
            <div class="prop-name">基本用法</div>
            <div class="code-block">
              <pre><code>import { ElMessage } from 'element-plus'

ElMessage('这是一条消息提示')

ElMessage({
  type: 'success',
  message: '恭喜你，这是一条成功消息'
})</code></pre>
            </div>
            <div class="help-text">通过 ElMessage 方法调用消息提示</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">不同类型</div>
            <div class="prop-name">不同类型</div>
            <div class="code-block">
              <pre><code>ElMessage.success('这是一条成功消息')
ElMessage.warning('这是一条警告消息')
ElMessage.error('这是一条错误消息')
ElMessage.info('这是一条信息消息')</code></pre>
            </div>
            <div class="help-text">使用不同类型的消息方法</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">关闭消息</div>
            <div class="prop-name">关闭消息</div>
            <div class="code-block">
              <pre><code>// 关闭所有消息
ElMessage.closeAll()

// 关闭指定消息
const message = ElMessage('这是一条消息')
message.close()</code></pre>
            </div>
            <div class="help-text">关闭消息的方法</div>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'

const show = ref(false)

// 配置对象
const cfg = reactive({
  type: 'success',
  message: '这是一条消息提示',
  duration: 3000,
  showClose: false,
  center: false,
  dangerouslyUseHTMLString: false,
  customClass: '',
  zIndex: 0,
  grouping: false,
  offset: 20
})

// 方法
const showMessage = (type) => {
  ElMessage({
    type,
    message: `这是一条 ${type} 类型的消息`,
    duration: cfg.duration,
    showClose: cfg.showClose,
    center: cfg.center,
    customClass: cfg.customClass,
    zIndex: cfg.zIndex,
    grouping: cfg.grouping,
    offset: cfg.offset
  })
}

const showCustomMessage = () => {
  ElMessage({
    type: 'info',
    message: '这是一条自定义消息',
    duration: 0,
    showClose: true,
    center: true,
    customClass: 'custom-message'
  })
}

const showDurationMessage = () => {
  ElMessage({
    type: 'warning',
    message: '这条消息会在 2 秒后自动关闭',
    duration: 2000
  })
}

const showHtmlMessage = () => {
  ElMessage({
    type: 'success',
    message: '<strong>这是</strong> <em>HTML</em> 格式的消息',
    dangerouslyUseHTMLString: true,
    duration: 3000
  })
}

const showGroupMessage = () => {
  // 快速连续发送多条消息，测试分组功能
  for (let i = 1; i <= 3; i++) {
    setTimeout(() => {
      ElMessage({
        type: 'info',
        message: `分组消息 ${i}`,
        grouping: true,
        duration: 3000
      })
    }, i * 100)
  }
}
</script>

<style scoped>
.demo-page { padding: 12px; }
.card-header { font-weight: 600; display: flex; justify-content: space-between; align-items: center; }
.message-preview { margin-bottom: 12px; }
.demo-buttons { display: flex; gap: 12px; margin-bottom: 12px; flex-wrap: wrap; }
.status { margin: 12px 0; padding: 8px; background: #f5f7fa; border-radius: 4px; font-size: 12px; }

.drawer-content { padding: 0 8px; }
.section { margin-bottom: 24px; padding: 20px; background: #fafafa; border-radius: 8px; }
.section h4 { margin: 0 0 20px 0; font-size: 16px; font-weight: 600; color: #303133; border-bottom: 2px solid #e4e7ed; padding-bottom: 8px; }

.form-item { margin-bottom: 24px; padding: 16px; background: #fff; border-radius: 6px; border: 1px solid #e4e7ed; }
.label-text { font-size: 14px; font-weight: 600; color: #303133; margin-bottom: 4px; }
.prop-name { font-size: 12px; color: #409eff; background: #ecf5ff; padding: 2px 6px; border-radius: 3px; display: inline-block; margin-bottom: 12px; font-family: 'Courier New', monospace; }
.help-text { font-size: 12px; color: #909399; margin-top: 8px; line-height: 1.4; }
.code-block { background: #f8f9fa; border: 1px solid #e9ecef; border-radius: 4px; padding: 12px; margin: 8px 0; }
.code-block pre { margin: 0; font-family: 'Courier New', monospace; font-size: 12px; line-height: 1.4; }
</style>
