<template>
  <div class="demo-page">
    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <span>Drawer 抽屉</span>
          <el-button type="primary" @click="show = true">属性设置</el-button>
        </div>
      </template>
      
      <!-- 预览抽屉 -->
      <div class="drawer-preview">
        <el-button @click="drawerVisible = true" type="primary">
          打开抽屉
        </el-button>
        
        <el-drawer
          v-model="drawerVisible"
          :title="cfg.title"
          :direction="cfg.direction"
          :size="cfg.size"
          :close-on-click-modal="cfg.closeOnClickModal"
          :close-on-press-escape="cfg.closeOnPressEscape"
          :open-delay="cfg.openDelay"
          :close-delay="cfg.closeDelay"
          :lock-scroll="cfg.lockScroll"
          :modal="cfg.modal"
          :append-to-body="cfg.appendToBody"
          :show-close="cfg.showClose"
          :before-close="cfg.beforeClose ? beforeCloseFn : undefined"
          :destroy-on-close="cfg.destroyOnClose"
          :modal-class="cfg.modalClass"
          :z-index="cfg.zIndex"
          :with-header="cfg.withHeader"
          :header-height="cfg.headerHeight"
          :body-style="cfg.bodyStyle ? JSON.parse(cfg.bodyStyle) : undefined"
          :wrapper-closable="cfg.wrapperClosable"
          @open="onOpen"
          @opened="onOpened"
          @close="onClose"
          @closed="onClosed"
        >
          <div class="drawer-content">
            <h3>抽屉内容</h3>
            <p>这是一个抽屉组件的内容区域。</p>
            <p>您可以在这里放置任何内容，比如表单、列表、设置面板等。</p>
            
            <el-divider />
            
            <h4>当前配置：</h4>
            <ul>
              <li>方向: {{ cfg.direction }}</li>
              <li>大小: {{ cfg.size }}</li>
              <li>点击遮罩关闭: {{ cfg.closeOnClickModal ? '是' : '否' }}</li>
              <li>按ESC关闭: {{ cfg.closeOnPressEscape ? '是' : '否' }}</li>
              <li>锁定滚动: {{ cfg.lockScroll ? '是' : '否' }}</li>
              <li>显示遮罩: {{ cfg.modal ? '是' : '否' }}</li>
            </ul>
            
            <el-divider />
            
            <el-button @click="drawerVisible = false" type="primary">
              关闭抽屉
            </el-button>
          </div>
        </el-drawer>
      </div>
      
      <!-- 状态显示 -->
      <div class="status">
        <div>抽屉状态: {{ drawerVisible ? '打开' : '关闭' }}</div>
        <div>抽屉方向: {{ cfg.direction }}</div>
        <div>抽屉大小: {{ cfg.size }}</div>
        <div>是否显示遮罩: {{ cfg.modal ? '是' : '否' }}</div>
      </div>
    </el-card>

    <el-drawer v-model="show" title="抽屉属性设置" size="45%">
      <div class="drawer-content">
        <el-alert type="info" show-icon :closable="false" style="margin-bottom: 20px;"
          description="提示：1) Drawer 用于从侧边栏滑出内容；2) 支持多种方向和大小；3) 可以自定义头部和内容样式。" />
        
        <!-- 基础属性 -->
        <div class="section">
          <h4>基础属性</h4>
          
          <div class="form-item">
            <div class="label-text">标题</div>
            <div class="prop-name">title</div>
            <el-input v-model="cfg.title" placeholder="请输入标题" style="width: 200px;" />
            <div class="help-text">抽屉的标题</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">方向</div>
            <div class="prop-name">direction</div>
            <el-radio-group v-model="cfg.direction">
              <el-radio-button label="rtl">rtl（从右到左）</el-radio-button>
              <el-radio-button label="ltr">ltr（从左到右）</el-radio-button>
              <el-radio-button label="ttb">ttb（从上到下）</el-radio-button>
              <el-radio-button label="btt">btt（从下到上）</el-radio-button>
            </el-radio-group>
            <div class="help-text">抽屉的打开方向</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">大小</div>
            <div class="prop-name">size</div>
            <el-input v-model="cfg.size" placeholder="如 50% 或 300px" style="width: 200px;" />
            <div class="help-text">抽屉的大小，可以是百分比或像素值</div>
          </div>
        </div>
        
        <!-- 行为设置 -->
        <div class="section">
          <h4>行为设置</h4>
          
          <div class="form-item">
            <div class="label-text">点击遮罩关闭</div>
            <div class="prop-name">close-on-click-modal</div>
            <el-switch v-model="cfg.closeOnClickModal" />
            <div class="help-text">是否可以通过点击遮罩关闭抽屉</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">按ESC关闭</div>
            <div class="prop-name">close-on-press-escape</div>
            <el-switch v-model="cfg.closeOnPressEscape" />
            <div class="help-text">是否可以通过按ESC键关闭抽屉</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">锁定滚动</div>
            <div class="prop-name">lock-scroll</div>
            <el-switch v-model="cfg.lockScroll" />
            <div class="help-text">是否锁定页面滚动</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">显示遮罩</div>
            <div class="prop-name">modal</div>
            <el-switch v-model="cfg.modal" />
            <div class="help-text">是否显示遮罩层</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">传送到body</div>
            <div class="prop-name">append-to-body</div>
            <el-switch v-model="cfg.appendToBody" />
            <div class="help-text">是否将抽屉传送到body元素</div>
          </div>
        </div>
        
        <!-- 显示设置 -->
        <div class="section">
          <h4>显示设置</h4>
          
          <div class="form-item">
            <div class="label-text">显示关闭按钮</div>
            <div class="prop-name">show-close</div>
            <el-switch v-model="cfg.showClose" />
            <div class="help-text">是否显示关闭按钮</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">显示头部</div>
            <div class="prop-name">with-header</div>
            <el-switch v-model="cfg.withHeader" />
            <div class="help-text">是否显示头部区域</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">头部高度</div>
            <div class="prop-name">header-height</div>
            <el-input v-model="cfg.headerHeight" placeholder="如 50px" style="width: 200px;" />
            <div class="help-text">头部区域的高度</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">包装器可关闭</div>
            <div class="prop-name">wrapper-closable</div>
            <el-switch v-model="cfg.wrapperClosable" />
            <div class="help-text">是否可以通过点击包装器关闭抽屉</div>
          </div>
        </div>
        
        <!-- 动画设置 -->
        <div class="section">
          <h4>动画设置</h4>
          
          <div class="form-item">
            <div class="label-text">打开延迟</div>
            <div class="prop-name">open-delay</div>
            <el-input-number v-model="cfg.openDelay" :min="0" :max="5000" />
            <div class="help-text">打开动画的延迟时间（毫秒）</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">关闭延迟</div>
            <div class="prop-name">close-delay</div>
            <el-input-number v-model="cfg.closeDelay" :min="0" :max="5000" />
            <div class="help-text">关闭动画的延迟时间（毫秒）</div>
          </div>
        </div>
        
        <!-- 高级设置 -->
        <div class="section">
          <h4>高级设置</h4>
          
          <div class="form-item">
            <div class="label-text">关闭前回调</div>
            <div class="prop-name">before-close</div>
            <el-switch v-model="cfg.beforeClose" />
            <div class="help-text">是否启用关闭前回调</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">销毁时关闭</div>
            <div class="prop-name">destroy-on-close</div>
            <el-switch v-model="cfg.destroyOnClose" />
            <div class="help-text">关闭时是否销毁抽屉内容</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">遮罩类名</div>
            <div class="prop-name">modal-class</div>
            <el-input v-model="cfg.modalClass" placeholder="如 custom-modal" style="width: 200px;" />
            <div class="help-text">遮罩层的自定义类名</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">层级</div>
            <div class="prop-name">z-index</div>
            <el-input-number v-model="cfg.zIndex" :min="1" :max="9999" />
            <div class="help-text">抽屉的层级</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">内容样式</div>
            <div class="prop-name">body-style</div>
            <el-input v-model="cfg.bodyStyle" placeholder='如 {"padding":"20px"}' style="width: 200px;" />
            <div class="help-text">抽屉内容的样式（JSON格式）</div>
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
const drawerVisible = ref(false)

// 配置对象
const cfg = reactive({
  title: '抽屉标题',
  direction: 'rtl',
  size: '50%',
  closeOnClickModal: true,
  closeOnPressEscape: true,
  openDelay: 0,
  closeDelay: 0,
  lockScroll: true,
  modal: true,
  appendToBody: true,
  showClose: true,
  beforeClose: false,
  destroyOnClose: false,
  modalClass: '',
  zIndex: 0,
  withHeader: true,
  headerHeight: '50px',
  bodyStyle: '',
  wrapperClosable: true
})

// 关闭前回调函数
const beforeCloseFn = (done) => {
  ElMessage.confirm('确定要关闭抽屉吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    done()
  }).catch(() => {
    ElMessage.info('已取消关闭')
  })
}

// 事件处理
const onOpen = () => {
  ElMessage.success('抽屉已打开')
}

const onOpened = () => {
  console.log('抽屉打开动画完成')
}

const onClose = () => {
  ElMessage.info('抽屉正在关闭')
}

const onClosed = () => {
  console.log('抽屉关闭动画完成')
}
</script>

<style scoped>
.demo-page { padding: 12px; }
.card-header { font-weight: 600; display: flex; justify-content: space-between; align-items: center; }
.drawer-preview { margin-bottom: 12px; }
.status { margin: 12px 0; padding: 8px; background: #f5f7fa; border-radius: 4px; font-size: 12px; }

.drawer-content { padding: 0 8px; }
.section { margin-bottom: 24px; padding: 20px; background: #fafafa; border-radius: 8px; }
.section h4 { margin: 0 0 20px 0; font-size: 16px; font-weight: 600; color: #303133; border-bottom: 2px solid #e4e7ed; padding-bottom: 8px; }

.form-item { margin-bottom: 24px; padding: 16px; background: #fff; border-radius: 6px; border: 1px solid #e4e7ed; }
.label-text { font-size: 14px; font-weight: 600; color: #303133; margin-bottom: 4px; }
.prop-name { font-size: 12px; color: #409eff; background: #ecf5ff; padding: 2px 6px; border-radius: 3px; display: inline-block; margin-bottom: 12px; font-family: 'Courier New', monospace; }
.help-text { font-size: 12px; color: #909399; margin-top: 8px; line-height: 1.4; }
</style>
