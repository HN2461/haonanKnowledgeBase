<template>
  <div class="demo-page">
    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <span>MessageBox 消息框</span>
          <el-button type="primary" @click="show = true">属性设置</el-button>
        </div>
      </template>
      
      <!-- 预览消息框 -->
      <div class="messagebox-preview">
        <div class="demo-buttons">
          <el-button @click="showAlert">Alert 提示</el-button>
          <el-button @click="showConfirm">Confirm 确认</el-button>
          <el-button @click="showPrompt">Prompt 输入</el-button>
          <el-button @click="showCustom">自定义消息框</el-button>
        </div>
        
        <div class="demo-buttons">
          <el-button @click="showHtml">HTML 消息框</el-button>
          <el-button @click="showCenter">居中消息框</el-button>
          <el-button @click="showBeforeClose">关闭前回调</el-button>
          <el-button @click="showDistinguish">区分取消和关闭</el-button>
        </div>
      </div>
      
      <!-- 状态显示 -->
      <div class="status">
        <div>消息框类型: {{ cfg.type }}</div>
        <div>标题: {{ cfg.title }}</div>
        <div>消息: {{ cfg.message }}</div>
        <div>是否居中: {{ cfg.center ? '是' : '否' }}</div>
      </div>
    </el-card>

    <el-drawer v-model="show" title="消息框属性设置" size="45%">
      <div class="drawer-content">
        <el-alert type="info" show-icon :closable="false" style="margin-bottom: 20px;"
          description="提示：1) MessageBox 是模态对话框组件；2) 支持多种类型和自定义内容；3) 可以自定义按钮和回调函数。" />
        
        <!-- 基础属性 -->
        <div class="section">
          <h4>基础属性</h4>
          
          <div class="form-item">
            <div class="label-text">消息框类型</div>
            <div class="prop-name">type</div>
            <el-radio-group v-model="cfg.type">
              <el-radio-button label="alert">alert</el-radio-button>
              <el-radio-button label="confirm">confirm</el-radio-button>
              <el-radio-button label="prompt">prompt</el-radio-button>
            </el-radio-group>
            <div class="help-text">消息框的类型</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">标题</div>
            <div class="prop-name">title</div>
            <el-input v-model="cfg.title" placeholder="请输入标题" style="width: 200px;" />
            <div class="help-text">消息框的标题</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">消息内容</div>
            <div class="prop-name">message</div>
            <el-input v-model="cfg.message" type="textarea" :rows="3" placeholder="请输入消息内容" />
            <div class="help-text">消息框的内容</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">输入框占位符</div>
            <div class="prop-name">inputPlaceholder</div>
            <el-input v-model="cfg.inputPlaceholder" placeholder="请输入占位符" style="width: 200px;" />
            <div class="help-text">Prompt 类型输入框的占位符</div>
          </div>
        </div>
        
        <!-- 显示设置 -->
        <div class="section">
          <h4>显示设置</h4>
          
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
            <el-input v-model="cfg.customClass" placeholder="如 custom-messagebox" style="width: 200px;" />
            <div class="help-text">自定义消息框的类名</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">区分取消和关闭</div>
            <div class="prop-name">distinguishCancelAndClose</div>
            <el-switch v-model="cfg.distinguishCancelAndClose" />
            <div class="help-text">是否区分取消和关闭按钮</div>
          </div>
        </div>
        
        <!-- 按钮设置 -->
        <div class="section">
          <h4>按钮设置</h4>
          
          <div class="form-item">
            <div class="label-text">确认按钮文字</div>
            <div class="prop-name">confirmButtonText</div>
            <el-input v-model="cfg.confirmButtonText" placeholder="如 确定" style="width: 200px;" />
            <div class="help-text">确认按钮的文字</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">取消按钮文字</div>
            <div class="prop-name">cancelButtonText</div>
            <el-input v-model="cfg.cancelButtonText" placeholder="如 取消" style="width: 200px;" />
            <div class="help-text">取消按钮的文字</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">确认按钮类型</div>
            <div class="prop-name">confirmButtonType</div>
            <el-select v-model="cfg.confirmButtonType" style="width: 200px;">
              <el-option label="primary" value="primary" />
              <el-option label="success" value="success" />
              <el-option label="warning" value="warning" />
              <el-option label="danger" value="danger" />
              <el-option label="info" value="info" />
            </el-select>
            <div class="help-text">确认按钮的类型</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">取消按钮类型</div>
            <div class="prop-name">cancelButtonType</div>
            <el-select v-model="cfg.cancelButtonType" style="width: 200px;">
              <el-option label="primary" value="primary" />
              <el-option label="success" value="success" />
              <el-option label="warning" value="warning" />
              <el-option label="danger" value="danger" />
              <el-option label="info" value="info" />
            </el-select>
            <div class="help-text">取消按钮的类型</div>
          </div>
        </div>
        
        <!-- 使用说明 -->
        <div class="section">
          <h4>使用说明</h4>
          
          <div class="form-item">
            <div class="label-text">基本用法</div>
            <div class="prop-name">基本用法</div>
            <div class="code-block">
              <pre><code>import { ElMessageBox } from 'element-plus'

// Alert
ElMessageBox.alert('这是一段内容', '标题名称', {
  confirmButtonText: '确定'
})

// Confirm
ElMessageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示', {
  confirmButtonText: '确定',
  cancelButtonText: '取消',
  type: 'warning'
})

// Prompt
ElMessageBox.prompt('请输入邮箱', '提示', {
  confirmButtonText: '确定',
  cancelButtonText: '取消',
  inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
  inputErrorMessage: '邮箱格式不正确'
})</code></pre>
            </div>
            <div class="help-text">MessageBox 的基本使用方式</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">回调函数</div>
            <div class="prop-name">回调函数</div>
            <div class="code-block">
              <pre><code>ElMessageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示', {
  confirmButtonText: '确定',
  cancelButtonText: '取消',
  type: 'warning'
}).then(() => {
  ElMessage.success('删除成功!')
}).catch(() => {
  ElMessage.info('已取消删除')
})</code></pre>
            </div>
            <div class="help-text">使用 Promise 处理用户操作</div>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'

const show = ref(false)

// 配置对象
const cfg = reactive({
  type: 'alert',
  title: '提示',
  message: '这是一段内容',
  inputPlaceholder: '请输入内容',
  center: false,
  dangerouslyUseHTMLString: false,
  customClass: '',
  distinguishCancelAndClose: false,
  confirmButtonText: '确定',
  cancelButtonText: '取消',
  confirmButtonType: 'primary',
  cancelButtonType: ''
})

// 方法
const showAlert = () => {
  ElMessageBox.alert(cfg.message, cfg.title, {
    confirmButtonText: cfg.confirmButtonText,
    type: 'info',
    center: cfg.center,
    customClass: cfg.customClass
  })
}

const showConfirm = () => {
  ElMessageBox.confirm(cfg.message, cfg.title, {
    confirmButtonText: cfg.confirmButtonText,
    cancelButtonText: cfg.cancelButtonText,
    type: 'warning',
    center: cfg.center,
    customClass: cfg.customClass,
    distinguishCancelAndClose: cfg.distinguishCancelAndClose
  }).then(() => {
    ElMessage.success('操作成功!')
  }).catch(() => {
    ElMessage.info('已取消操作')
  })
}

const showPrompt = () => {
  ElMessageBox.prompt(cfg.message, cfg.title, {
    confirmButtonText: cfg.confirmButtonText,
    cancelButtonText: cfg.cancelButtonText,
    inputPlaceholder: cfg.inputPlaceholder,
    center: cfg.center,
    customClass: cfg.customClass
  }).then(({ value }) => {
    ElMessage.success(`输入的内容是: ${value}`)
  }).catch(() => {
    ElMessage.info('已取消输入')
  })
}

const showCustom = () => {
  ElMessageBox({
    title: '自定义消息框',
    message: '这是一个自定义的消息框',
    showCancelButton: true,
    confirmButtonText: '好的',
    cancelButtonText: '算了',
    type: 'warning',
    center: true,
    customClass: 'custom-messagebox'
  }).then(() => {
    ElMessage.success('自定义操作成功!')
  }).catch(() => {
    ElMessage.info('已取消自定义操作')
  })
}

const showHtml = () => {
  ElMessageBox.alert('<strong>这是</strong> <em>HTML</em> 格式的内容', 'HTML 消息框', {
    confirmButtonText: '确定',
    dangerouslyUseHTMLString: true,
    center: true
  })
}

const showCenter = () => {
  ElMessageBox.alert('这是一个居中显示的消息框', '居中消息框', {
    confirmButtonText: '确定',
    center: true
  })
}

const showBeforeClose = () => {
  ElMessageBox.confirm('关闭前会执行回调函数', '关闭前回调', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    beforeClose: (action, instance, done) => {
      if (action === 'confirm') {
        ElMessage.success('确认操作')
        done()
      } else {
        ElMessage.info('取消操作')
        done()
      }
    }
  })
}

const showDistinguish = () => {
  ElMessageBox.confirm('区分取消和关闭按钮', '区分测试', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    distinguishCancelAndClose: true
  }).then(() => {
    ElMessage.success('点击了确定')
  }).catch((action) => {
    if (action === 'cancel') {
      ElMessage.info('点击了取消')
    } else if (action === 'close') {
      ElMessage.warning('点击了关闭')
    }
  })
}
</script>

<style scoped>
.demo-page { padding: 12px; }
.card-header { font-weight: 600; display: flex; justify-content: space-between; align-items: center; }
.messagebox-preview { margin-bottom: 12px; }
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
