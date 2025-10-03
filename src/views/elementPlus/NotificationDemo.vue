<template>
  <div class="demo-page">
    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <span>Notification 通知</span>
          <el-button type="primary" @click="show = true">属性设置</el-button>
        </div>
      </template>
      
      <!-- 预览通知 -->
      <div class="notification-preview">
        <div class="demo-buttons">
          <el-button @click="showNotification('success')">成功通知</el-button>
          <el-button @click="showNotification('warning')">警告通知</el-button>
          <el-button @click="showNotification('error')">错误通知</el-button>
          <el-button @click="showNotification('info')">信息通知</el-button>
        </div>
        
        <div class="demo-buttons">
          <el-button @click="showCustomNotification">自定义通知</el-button>
          <el-button @click="showPositionNotification">位置通知</el-button>
          <el-button @click="showDurationNotification">时长通知</el-button>
          <el-button @click="showHtmlNotification">HTML通知</el-button>
        </div>
      </div>
      
      <!-- 状态显示 -->
      <div class="status">
        <div>通知类型: {{ cfg.type }}</div>
        <div>通知位置: {{ cfg.position }}</div>
        <div>显示时长: {{ cfg.duration }}ms</div>
        <div>是否显示关闭按钮: {{ cfg.showClose ? '是' : '否' }}</div>
      </div>
    </el-card>

    <el-drawer v-model="show" title="通知属性设置" size="45%">
      <div class="drawer-content">
        <el-alert type="info" show-icon :closable="false" style="margin-bottom: 20px;"
          description="提示：1) Notification 是全局通知组件；2) 支持多种类型和位置；3) 可以自定义内容和样式。" />
        
        <!-- 基础属性 -->
        <div class="section">
          <h4>基础属性</h4>
          
          <div class="form-item">
            <div class="label-text">通知类型</div>
            <div class="prop-name">type</div>
            <el-radio-group v-model="cfg.type">
              <el-radio-button label="success">success</el-radio-button>
              <el-radio-button label="warning">warning</el-radio-button>
              <el-radio-button label="error">error</el-radio-button>
              <el-radio-button label="info">info</el-radio-button>
            </el-radio-group>
            <div class="help-text">通知的类型</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">通知位置</div>
            <div class="prop-name">position</div>
            <el-select v-model="cfg.position" style="width: 200px;">
              <el-option label="top-right" value="top-right" />
              <el-option label="top-left" value="top-left" />
              <el-option label="bottom-right" value="bottom-right" />
              <el-option label="bottom-left" value="bottom-left" />
            </el-select>
            <div class="help-text">通知出现的位置</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">标题</div>
            <div class="prop-name">title</div>
            <el-input v-model="cfg.title" placeholder="请输入标题" style="width: 200px;" />
            <div class="help-text">通知的标题</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">消息内容</div>
            <div class="prop-name">message</div>
            <el-input v-model="cfg.message" type="textarea" :rows="3" placeholder="请输入消息内容" />
            <div class="help-text">通知的消息内容</div>
          </div>
        </div>
        
        <!-- 显示设置 -->
        <div class="section">
          <h4>显示设置</h4>
          
          <div class="form-item">
            <div class="label-text">显示时长</div>
            <div class="prop-name">duration</div>
            <el-input-number v-model="cfg.duration" :min="0" :max="10000" />
            <div class="help-text">显示时长，0 为不自动关闭</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">显示关闭按钮</div>
            <div class="prop-name">showClose</div>
            <el-switch v-model="cfg.showClose" />
            <div class="help-text">是否显示关闭按钮</div>
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
            <el-input v-model="cfg.customClass" placeholder="如 custom-notification" style="width: 200px;" />
            <div class="help-text">自定义通知的类名</div>
          </div>
        </div>
        
        <!-- 高级设置 -->
        <div class="section">
          <h4>高级设置</h4>
          
          <div class="form-item">
            <div class="label-text">偏移量</div>
            <div class="prop-name">offset</div>
            <el-input-number v-model="cfg.offset" :min="0" :max="100" />
            <div class="help-text">距离屏幕边缘的偏移量</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">层级</div>
            <div class="prop-name">zIndex</div>
            <el-input-number v-model="cfg.zIndex" :min="1" :max="9999" />
            <div class="help-text">通知的层级</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">是否可点击关闭</div>
            <div class="prop-name">onClick</div>
            <el-switch v-model="cfg.onClick" />
            <div class="help-text">点击通知时是否关闭</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">是否可拖拽</div>
            <div class="prop-name">draggable</div>
            <el-switch v-model="cfg.draggable" />
            <div class="help-text">是否可以拖拽</div>
          </div>
        </div>
        
        <!-- 使用说明 -->
        <div class="section">
          <h4>使用说明</h4>
          
          <div class="form-item">
            <div class="label-text">基本用法</div>
            <div class="prop-name">基本用法</div>
            <div class="code-block">
              <pre><code>import { ElNotification } from 'element-plus'

ElNotification({
  title: '标题',
  message: '消息内容',
  type: 'success'
})</code></pre>
            </div>
            <div class="help-text">通过 ElNotification 方法调用通知</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">关闭通知</div>
            <div class="prop-name">关闭通知</div>
            <div class="code-block">
              <pre><code>const notification = ElNotification({
  title: '标题',
  message: '消息内容'
})

// 手动关闭
notification.close()</code></pre>
            </div>
            <div class="help-text">可以通过返回的实例手动关闭通知</div>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElNotification } from 'element-plus'

const show = ref(false)

// 配置对象
const cfg = reactive({
  type: 'success',
  position: 'top-right',
  title: '通知标题',
  message: '这是一条通知消息',
  duration: 4500,
  showClose: true,
  dangerouslyUseHTMLString: false,
  customClass: '',
  offset: 0,
  zIndex: 0,
  onClick: false,
  draggable: false
})

// 方法
const showNotification = (type) => {
  ElNotification({
    type,
    title: `${type.toUpperCase()} 通知`,
    message: `这是一条 ${type} 类型的通知消息`,
    position: cfg.position,
    duration: cfg.duration,
    showClose: cfg.showClose,
    customClass: cfg.customClass,
    offset: cfg.offset,
    zIndex: cfg.zIndex,
    onClick: cfg.onClick ? () => ElNotification.closeAll() : undefined,
    draggable: cfg.draggable
  })
}

const showCustomNotification = () => {
  ElNotification({
    type: 'info',
    title: '自定义通知',
    message: '这是一个自定义样式的通知',
    position: 'top-left',
    duration: 0,
    showClose: true,
    customClass: 'custom-notification'
  })
}

const showPositionNotification = () => {
  const positions = ['top-right', 'top-left', 'bottom-right', 'bottom-left']
  positions.forEach((position, index) => {
    setTimeout(() => {
      ElNotification({
        type: 'info',
        title: '位置通知',
        message: `这是 ${position} 位置的通知`,
        position,
        duration: 3000
      })
    }, index * 500)
  })
}

const showDurationNotification = () => {
  ElNotification({
    type: 'warning',
    title: '时长通知',
    message: '这个通知会在 2 秒后自动关闭',
    duration: 2000
  })
}

const showHtmlNotification = () => {
  ElNotification({
    type: 'success',
    title: 'HTML 通知',
    message: '<strong>这是</strong> <em>HTML</em> 格式的通知',
    dangerouslyUseHTMLString: true,
    duration: 3000
  })
}
</script>

<style scoped>
.demo-page { padding: 12px; }
.card-header { font-weight: 600; display: flex; justify-content: space-between; align-items: center; }
.notification-preview { margin-bottom: 12px; }
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
