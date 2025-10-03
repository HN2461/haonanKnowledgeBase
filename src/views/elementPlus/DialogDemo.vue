<template>
  <div class="demo-page">
    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <span>Dialog 对话框</span>
          <el-button type="primary" @click="show = true">属性设置</el-button>
        </div>
      </template>
      
      <!-- 预览对话框 -->
      <div class="row">
        <el-button type="primary" @click="visible = true">打开对话框</el-button>
        <el-button type="success" @click="openFullscreen">全屏对话框</el-button>
        <el-button type="warning" @click="openNested">嵌套对话框</el-button>
      </div>
      
      <!-- 主对话框 -->
      <el-dialog 
        v-model="visible" 
        :title="cfg.title"
        :width="cfg.width"
        :fullscreen="cfg.fullscreen"
        :top="cfg.top"
        :modal="cfg.modal"
        :modal-class="cfg.modalClass"
        :append-to-body="cfg.appendToBody"
        :lock-scroll="cfg.lockScroll"
        :custom-class="cfg.customClass"
        :open-delay="cfg.openDelay"
        :close-delay="cfg.closeDelay"
        :close-on-click-modal="cfg.closeOnClickModal"
        :close-on-press-escape="cfg.closeOnPressEscape"
        :show-close="cfg.showClose"
        :before-close="cfg.beforeClose ? beforeCloseFn : undefined"
        :center="cfg.center"
        :align-center="cfg.alignCenter"
        :destroy-on-close="cfg.destroyOnClose"
        :draggable="cfg.draggable"
        :close-icon="closeIconComp"
        :z-index="cfg.zIndex"
        :header-aria-level="cfg.headerAriaLevel"
        :aria-label="cfg.ariaLabel"
        @open="onUI('open')"
        @opened="onUI('opened')"
        @close="onUI('close')"
        @closed="onUI('closed')"
        @open-auto-focus="onUI('open-auto-focus')"
        @close-auto-focus="onUI('close-auto-focus')"
      >
        <div class="dialog-content">
          <p>这是一个对话框的演示内容。</p>
          <p>你可以在这里放置任何内容，包括表单、表格、图片等。</p>
          <el-input v-model="inputValue" placeholder="输入一些内容" style="margin-top: 16px;" />
        </div>
        
        <template #header>
          <div class="dialog-header">
            <span>{{ cfg.title }}</span>
            <el-button type="text" @click="visible = false">×</el-button>
          </div>
        </template>
        
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="visible = false">取消</el-button>
            <el-button type="primary" @click="visible = false">确定</el-button>
          </div>
        </template>
      </el-dialog>
      
      <!-- 全屏对话框 -->
      <el-dialog 
        v-model="fullscreenVisible" 
        title="全屏对话框"
        fullscreen
        :close-on-click-modal="false"
      >
        <div class="fullscreen-content">
          <h3>全屏对话框</h3>
          <p>这是一个全屏对话框，占据整个屏幕空间。</p>
          <el-button @click="fullscreenVisible = false">关闭</el-button>
        </div>
      </el-dialog>
      
      <!-- 嵌套对话框 -->
      <el-dialog 
        v-model="nestedVisible" 
        title="嵌套对话框"
        width="600px"
      >
        <div class="nested-content">
          <p>这是第一个对话框</p>
          <el-button type="primary" @click="innerVisible = true">打开内层对话框</el-button>
        </div>
      </el-dialog>
      
      <!-- 内层对话框 -->
      <el-dialog 
        v-model="innerVisible" 
        title="内层对话框"
        width="400px"
        :append-to-body="true"
      >
        <div class="inner-content">
          <p>这是内层对话框</p>
          <el-button @click="innerVisible = false">关闭内层</el-button>
        </div>
      </el-dialog>
      
      <!-- 状态显示 -->
      <div class="status">
        <div>对话框状态: {{ visible ? '打开' : '关闭' }}</div>
        <div>对话框宽度: {{ cfg.width }}</div>
        <div>全屏模式: {{ cfg.fullscreen ? '是' : '否' }}</div>
        <div>可拖拽: {{ cfg.draggable ? '是' : '否' }}</div>
      </div>
    </el-card>

    <el-drawer v-model="show" title="对话框属性设置" size="45%">
      <div class="drawer-content">
        <el-alert type="info" show-icon :closable="false" style="margin-bottom: 20px;"
          description="提示：1) 对话框支持多种显示模式；2) 全屏模式会占据整个屏幕；3) 嵌套对话框需要设置 append-to-body 属性。" />
        
        <!-- 基础属性 -->
        <div class="section">
          <h4>基础属性</h4>
          
          <div class="form-item">
            <div class="label-text">标题</div>
            <div class="prop-name">title</div>
            <el-input v-model="cfg.title" placeholder="请输入标题" style="width: 200px;" />
            <div class="help-text">对话框的标题</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">宽度</div>
            <div class="prop-name">width</div>
            <el-input v-model="cfg.width" placeholder="如 50% 或 500px" style="width: 200px;" />
            <div class="help-text">对话框的宽度</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">距离顶部</div>
            <div class="prop-name">top</div>
            <el-input v-model="cfg.top" placeholder="如 15vh" style="width: 200px;" />
            <div class="help-text">对话框 CSS 中的 margin-top 值</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">层级</div>
            <div class="prop-name">z-index</div>
            <el-input-number v-model="cfg.zIndex" :min="1" :max="9999" />
            <div class="help-text">设置 dialog 的 z-index</div>
          </div>
        </div>
        
        <!-- 显示设置 -->
        <div class="section">
          <h4>显示设置</h4>
          
          <div class="form-item">
            <div class="label-text">全屏</div>
            <div class="prop-name">fullscreen</div>
            <el-switch v-model="cfg.fullscreen" />
            <div class="help-text">是否全屏显示对话框</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">居中</div>
            <div class="prop-name">center</div>
            <el-switch v-model="cfg.center" />
            <div class="help-text">是否居中布局</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">对齐居中</div>
            <div class="prop-name">align-center</div>
            <el-switch v-model="cfg.alignCenter" />
            <div class="help-text">是否水平垂直居中</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">显示遮罩</div>
            <div class="prop-name">modal</div>
            <el-switch v-model="cfg.modal" />
            <div class="help-text">是否显示遮罩层</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">显示关闭按钮</div>
            <div class="prop-name">show-close</div>
            <el-switch v-model="cfg.showClose" />
            <div class="help-text">是否显示关闭按钮</div>
          </div>
        </div>
        
        <!-- 交互设置 -->
        <div class="section">
          <h4>交互设置</h4>
          
          <div class="form-item">
            <div class="label-text">点击遮罩关闭</div>
            <div class="prop-name">close-on-click-modal</div>
            <el-switch v-model="cfg.closeOnClickModal" />
            <div class="help-text">是否可以通过点击 modal 关闭对话框</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">按ESC关闭</div>
            <div class="prop-name">close-on-press-escape</div>
            <el-switch v-model="cfg.closeOnPressEscape" />
            <div class="help-text">是否可以通过按下 ESC 关闭对话框</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">可拖拽</div>
            <div class="prop-name">draggable</div>
            <el-switch v-model="cfg.draggable" />
            <div class="help-text">是否可拖拽</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">锁定滚动</div>
            <div class="prop-name">lock-scroll</div>
            <el-switch v-model="cfg.lockScroll" />
            <div class="help-text">是否在对话框出现时将 body 滚动锁定</div>
          </div>
        </div>
        
        <!-- 高级设置 -->
        <div class="section">
          <h4>高级设置</h4>
          
          <div class="form-item">
            <div class="label-text">挂载到body</div>
            <div class="prop-name">append-to-body</div>
            <el-switch v-model="cfg.appendToBody" />
            <div class="help-text">是否将对话框挂载到 body 元素上</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">关闭时销毁</div>
            <div class="prop-name">destroy-on-close</div>
            <el-switch v-model="cfg.destroyOnClose" />
            <div class="help-text">当关闭对话框时，销毁其中的元素</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">打开延迟</div>
            <div class="prop-name">open-delay</div>
            <el-input-number v-model="cfg.openDelay" :min="0" :max="1000" />
            <div class="help-text">对话框打开的延时时间（毫秒）</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">关闭延迟</div>
            <div class="prop-name">close-delay</div>
            <el-input-number v-model="cfg.closeDelay" :min="0" :max="1000" />
            <div class="help-text">对话框关闭的延时时间（毫秒）</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">自定义类名</div>
            <div class="prop-name">custom-class</div>
            <el-input v-model="cfg.customClass" placeholder="如 custom-dialog" style="width: 200px;" />
            <div class="help-text">对话框的自定义类名</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">遮罩类名</div>
            <div class="prop-name">modal-class</div>
            <el-input v-model="cfg.modalClass" placeholder="如 custom-modal" style="width: 200px;" />
            <div class="help-text">遮罩层的自定义类名</div>
          </div>
        </div>
        
        <!-- 无障碍设置 -->
        <div class="section">
          <h4>无障碍设置</h4>
          
          <div class="form-item">
            <div class="label-text">标题级别</div>
            <div class="prop-name">header-aria-level</div>
            <el-input-number v-model="cfg.headerAriaLevel" :min="1" :max="6" />
            <div class="help-text">对话框标题的 aria-level 属性</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">标签</div>
            <div class="prop-name">aria-label</div>
            <el-input v-model="cfg.ariaLabel" placeholder="如 对话框" style="width: 200px;" />
            <div class="help-text">对话框的 aria-label 属性</div>
          </div>
        </div>
        
        <!-- 使用说明 -->
        <div class="section">
          <h4>使用说明</h4>
          
          <div class="form-item">
            <div class="label-text">基本用法</div>
            <div class="prop-name">基本用法</div>
            <div class="code-block">
              <pre><code>&lt;el-dialog v-model="visible" title="提示" width="30%"&gt;
  &lt;span&gt;这是一段信息&lt;/span&gt;
  &lt;template #footer&gt;
    &lt;el-button @click="visible = false"&gt;取消&lt;/el-button&gt;
    &lt;el-button type="primary" @click="visible = false"&gt;确定&lt;/el-button&gt;
  &lt;/template&gt;
&lt;/el-dialog&gt;</code></pre>
            </div>
            <div class="help-text">对话框的基本使用方式</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">自定义内容</div>
            <div class="prop-name">自定义内容</div>
            <div class="code-block">
              <pre><code>&lt;el-dialog v-model="visible" title="编辑用户" width="50%"&gt;
  &lt;el-form :model="form" label-width="80px"&gt;
    &lt;el-form-item label="姓名"&gt;
      &lt;el-input v-model="form.name" /&gt;
    &lt;/el-form-item&gt;
    &lt;el-form-item label="邮箱"&gt;
      &lt;el-input v-model="form.email" /&gt;
    &lt;/el-form-item&gt;
  &lt;/el-form&gt;
  &lt;template #footer&gt;
    &lt;el-button @click="visible = false"&gt;取消&lt;/el-button&gt;
    &lt;el-button type="primary" @click="handleSubmit"&gt;确定&lt;/el-button&gt;
  &lt;/template&gt;
&lt;/el-dialog&gt;</code></pre>
            </div>
            <div class="help-text">在对话框中使用表单等复杂内容</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">居中布局</div>
            <div class="prop-name">居中布局</div>
            <div class="code-block">
              <pre><code>&lt;el-dialog v-model="visible" title="提示" center&gt;
  &lt;span&gt;这是一段信息&lt;/span&gt;
  &lt;template #footer&gt;
    &lt;el-button @click="visible = false"&gt;取消&lt;/el-button&gt;
    &lt;el-button type="primary" @click="visible = false"&gt;确定&lt;/el-button&gt;
  &lt;/template&gt;
&lt;/el-dialog&gt;</code></pre>
            </div>
            <div class="help-text">设置 center 属性可以让对话框居中显示</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">全屏对话框</div>
            <div class="prop-name">全屏对话框</div>
            <div class="code-block">
              <pre><code>&lt;el-dialog v-model="visible" title="全屏对话框" fullscreen&gt;
  &lt;span&gt;这是全屏对话框的内容&lt;/span&gt;
&lt;/el-dialog&gt;</code></pre>
            </div>
            <div class="help-text">设置 fullscreen 属性可以显示全屏对话框</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">嵌套对话框</div>
            <div class="prop-name">嵌套对话框</div>
            <div class="code-block">
              <pre><code>&lt;el-dialog v-model="outerVisible" title="外层对话框"&gt;
  &lt;el-dialog v-model="innerVisible" title="内层对话框" append-to-body&gt;
    &lt;span&gt;内层对话框内容&lt;/span&gt;
  &lt;/el-dialog&gt;
  &lt;span&gt;外层对话框内容&lt;/span&gt;
&lt;/el-dialog&gt;</code></pre>
            </div>
            <div class="help-text">嵌套对话框需要设置 append-to-body 属性</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">关闭前确认</div>
            <div class="prop-name">关闭前确认</div>
            <div class="code-block">
              <pre><code>&lt;el-dialog v-model="visible" title="提示" :before-close="handleClose"&gt;
  &lt;span&gt;这是一段信息&lt;/span&gt;
&lt;/el-dialog&gt;

const handleClose = (done) => {
  ElMessageBox.confirm('确认关闭？')
    .then(() => {
      done()
    })
    .catch(() => {})
}</code></pre>
            </div>
            <div class="help-text">使用 before-close 属性可以在关闭前进行确认</div>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { CircleClose } from '@element-plus/icons-vue'

const show = ref(false)
const visible = ref(false)
const fullscreenVisible = ref(false)
const nestedVisible = ref(false)
const innerVisible = ref(false)
const inputValue = ref('')

// 配置对象
const cfg = reactive({
  title: '演示对话框',
  width: '50%',
  fullscreen: false,
  top: '15vh',
  modal: true,
  modalClass: '',
  appendToBody: false,
  lockScroll: true,
  customClass: '',
  openDelay: 0,
  closeDelay: 0,
  closeOnClickModal: true,
  closeOnPressEscape: true,
  showClose: true,
  beforeClose: false,
  center: false,
  alignCenter: false,
  destroyOnClose: false,
  draggable: false,
  zIndex: 2000,
  headerAriaLevel: 2,
  ariaLabel: ''
})

// 计算属性
const closeIconComp = computed(() => CircleClose)

// 方法
const openFullscreen = () => {
  fullscreenVisible.value = true
}

const openNested = () => {
  nestedVisible.value = true
}

const beforeCloseFn = (done) => {
  ElMessage.confirm('确认关闭对话框？')
    .then(() => {
      done()
    })
    .catch(() => {
      // 取消关闭
    })
}

// 事件处理
const onUI = (name) => ElMessage.info(`触发事件: ${name}`)
</script>

<style scoped>
.demo-page { padding: 12px; }
.card-header { font-weight: 600; display: flex; justify-content: space-between; align-items: center; }
.row { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 12px; }
.status { margin: 12px 0; padding: 8px; background: #f5f7fa; border-radius: 4px; font-size: 12px; }

.dialog-content { padding: 20px 0; }
.dialog-header { display: flex; justify-content: space-between; align-items: center; }
.dialog-footer { display: flex; justify-content: flex-end; gap: 8px; }
.fullscreen-content { padding: 20px; text-align: center; }
.nested-content { padding: 20px; text-align: center; }
.inner-content { padding: 20px; text-align: center; }

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