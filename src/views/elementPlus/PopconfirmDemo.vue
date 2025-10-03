<template>
  <div class="demo-page">
    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <span>Popconfirm 气泡确认框</span>
          <el-button type="primary" @click="show = true">属性设置</el-button>
        </div>
      </template>
      
      <!-- 预览气泡确认框 -->
      <div class="popconfirm-preview">
        <el-popconfirm
          :title="cfg.title"
          :confirm-button-text="cfg.confirmButtonText"
          :cancel-button-text="cfg.cancelButtonText"
          :confirm-button-type="cfg.confirmButtonType"
          :cancel-button-type="cfg.cancelButtonType"
          :icon="iconComp"
          :icon-color="cfg.iconColor"
          :hide-icon="cfg.hideIcon"
          :teleported="cfg.teleported"
          :popper-style="cfg.popperStyle ? JSON.parse(cfg.popperStyle) : undefined"
          :popper-class="cfg.popperClass"
          :teleport-to="cfg.teleportTo"
          :disabled="cfg.disabled"
          :width="cfg.width"
          :placement="cfg.placement"
          :trigger="cfg.trigger"
          :open-delay="cfg.openDelay"
          :close-delay="cfg.closeDelay"
          :hide-after="cfg.hideAfter"
          :show-after="cfg.showAfter"
          :auto-close="cfg.autoClose"
          :show-arrow="cfg.showArrow"
          :persistent="cfg.persistent"
          :gpu-acceleration="cfg.gpuAcceleration"
          :fallback-placements="cfg.fallbackPlacements ? cfg.fallbackPlacements.split(',') : undefined"
          :offset="cfg.offset"
          :boundary="cfg.boundary"
          :strategy="cfg.strategy"
          :virtual-ref="cfg.virtualRef"
          :virtual-triggering="cfg.virtualTriggering"
          :z-index="cfg.zIndex"
          @confirm="onConfirm"
          @cancel="onCancel"
        >
          <template #reference>
            <el-button type="danger">删除</el-button>
          </template>
        </el-popconfirm>
        
        <el-popconfirm
          title="确定要重置表单吗？"
          confirm-button-text="确定"
          cancel-button-text="取消"
          @confirm="onConfirm"
          @cancel="onCancel"
        >
          <template #reference>
            <el-button>重置</el-button>
          </template>
        </el-popconfirm>
        
        <el-popconfirm
          title="确定要保存更改吗？"
          confirm-button-text="保存"
          cancel-button-text="取消"
          confirm-button-type="success"
          @confirm="onConfirm"
          @cancel="onCancel"
        >
          <template #reference>
            <el-button type="primary">保存</el-button>
          </template>
        </el-popconfirm>
      </div>
      
      <!-- 状态显示 -->
      <div class="status">
        <div>确认框标题: {{ cfg.title }}</div>
        <div>触发方式: {{ cfg.trigger }}</div>
        <div>位置: {{ cfg.placement }}</div>
        <div>是否禁用: {{ cfg.disabled ? '是' : '否' }}</div>
      </div>
    </el-card>

    <el-drawer v-model="show" title="气泡确认框属性设置" size="45%">
      <div class="drawer-content">
        <el-alert type="info" show-icon :closable="false" style="margin-bottom: 20px;"
          description="提示：1) Popconfirm 用于在用户执行危险操作前进行确认；2) 支持多种触发方式和位置；3) 可以自定义按钮和图标。" />
        
        <!-- 使用说明 -->
        <div class="section">
          <h4>使用说明</h4>
          
          <div class="usage-item">
            <h5>1. 基础用法</h5>
            <div class="code-block">
              <pre><code>&lt;el-popconfirm
  title="确定要删除吗？"
  @confirm="handleConfirm"
  @cancel="handleCancel"
&gt;
  &lt;template #reference&gt;
    &lt;el-button type="danger"&gt;删除&lt;/el-button&gt;
  &lt;/template&gt;
&lt;/el-popconfirm&gt;</code></pre>
            </div>
          </div>
          
          <div class="usage-item">
            <h5>2. 自定义按钮文本</h5>
            <div class="code-block">
              <pre><code>&lt;el-popconfirm
  title="确定要保存吗？"
  confirm-button-text="保存"
  cancel-button-text="取消"
  @confirm="handleConfirm"
  @cancel="handleCancel"
&gt;
  &lt;template #reference&gt;
    &lt;el-button type="primary"&gt;保存&lt;/el-button&gt;
  &lt;/template&gt;
&lt;/el-popconfirm&gt;</code></pre>
            </div>
          </div>
          
          <div class="usage-item">
            <h5>3. 自定义按钮类型</h5>
            <div class="code-block">
              <pre><code>&lt;el-popconfirm
  title="确定要重置吗？"
  confirm-button-type="danger"
  cancel-button-type="info"
  @confirm="handleConfirm"
  @cancel="handleCancel"
&gt;
  &lt;template #reference&gt;
    &lt;el-button&gt;重置&lt;/el-button&gt;
  &lt;/template&gt;
&lt;/el-popconfirm&gt;</code></pre>
            </div>
          </div>
          
          <div class="usage-item">
            <h5>4. 不同触发方式</h5>
            <div class="code-block">
              <pre><code>&lt;!-- 点击触发 --&gt;
&lt;el-popconfirm trigger="click" title="点击触发"&gt;
  &lt;template #reference&gt;
    &lt;el-button&gt;点击触发&lt;/el-button&gt;
  &lt;/template&gt;
&lt;/el-popconfirm&gt;

&lt;!-- 悬停触发 --&gt;
&lt;el-popconfirm trigger="hover" title="悬停触发"&gt;
  &lt;template #reference&gt;
    &lt;el-button&gt;悬停触发&lt;/el-button&gt;
  &lt;/template&gt;
&lt;/el-popconfirm&gt;</code></pre>
            </div>
          </div>
          
          <div class="usage-item">
            <h5>5. 事件处理</h5>
            <div class="code-block">
              <pre><code>const handleConfirm = () => {
  console.log('用户确认了操作')
  ElMessage.success('操作已确认')
}

const handleCancel = () => {
  console.log('用户取消了操作')
  ElMessage.info('操作已取消')
}</code></pre>
            </div>
          </div>
        </div>
        
        <!-- 基础属性 -->
        <div class="section">
          <h4>基础属性</h4>
          
          <div class="form-item">
            <div class="label-text">标题</div>
            <div class="prop-name">title</div>
            <el-input v-model="cfg.title" placeholder="请输入确认标题" />
            <div class="help-text">确认框的标题文本</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">确认按钮文字</div>
            <div class="prop-name">confirm-button-text</div>
            <el-input v-model="cfg.confirmButtonText" placeholder="如 确定" style="width: 200px;" />
            <div class="help-text">确认按钮的文字</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">取消按钮文字</div>
            <div class="prop-name">cancel-button-text</div>
            <el-input v-model="cfg.cancelButtonText" placeholder="如 取消" style="width: 200px;" />
            <div class="help-text">取消按钮的文字</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">确认按钮类型</div>
            <div class="prop-name">confirm-button-type</div>
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
            <div class="prop-name">cancel-button-type</div>
            <el-select v-model="cfg.cancelButtonType" style="width: 200px;">
              <el-option label="default" value="" />
              <el-option label="primary" value="primary" />
              <el-option label="success" value="success" />
              <el-option label="warning" value="warning" />
              <el-option label="danger" value="danger" />
              <el-option label="info" value="info" />
            </el-select>
            <div class="help-text">取消按钮的类型</div>
          </div>
        </div>
        
        <!-- 图标设置 -->
        <div class="section">
          <h4>图标设置</h4>
          
          <div class="form-item">
            <div class="label-text">图标</div>
            <div class="prop-name">icon</div>
            <el-select v-model="cfg.icon" style="width: 200px;">
              <el-option label="默认" value="" />
              <el-option label="Warning" value="Warning" />
              <el-option label="InfoFilled" value="InfoFilled" />
              <el-option label="CircleClose" value="CircleClose" />
              <el-option label="QuestionFilled" value="QuestionFilled" />
            </el-select>
            <div class="help-text">确认框的图标</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">图标颜色</div>
            <div class="prop-name">icon-color</div>
            <el-input v-model="cfg.iconColor" placeholder="如 #f56c6c" style="width: 200px;" />
            <div class="help-text">图标的颜色</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">隐藏图标</div>
            <div class="prop-name">hide-icon</div>
            <el-switch v-model="cfg.hideIcon" />
            <div class="help-text">是否隐藏图标</div>
          </div>
        </div>
        
        <!-- 位置设置 -->
        <div class="section">
          <h4>位置设置</h4>
          
          <div class="form-item">
            <div class="label-text">位置</div>
            <div class="prop-name">placement</div>
            <el-select v-model="cfg.placement" style="width: 200px;">
              <el-option label="top" value="top" />
              <el-option label="top-start" value="top-start" />
              <el-option label="top-end" value="top-end" />
              <el-option label="bottom" value="bottom" />
              <el-option label="bottom-start" value="bottom-start" />
              <el-option label="bottom-end" value="bottom-end" />
              <el-option label="left" value="left" />
              <el-option label="left-start" value="left-start" />
              <el-option label="left-end" value="left-end" />
              <el-option label="right" value="right" />
              <el-option label="right-start" value="right-start" />
              <el-option label="right-end" value="right-end" />
            </el-select>
            <div class="help-text">确认框的显示位置</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">触发方式</div>
            <div class="prop-name">trigger</div>
            <el-radio-group v-model="cfg.trigger">
              <el-radio-button label="hover">hover</el-radio-button>
              <el-radio-button label="click">click</el-radio-button>
              <el-radio-button label="focus">focus</el-radio-button>
              <el-radio-button label="contextmenu">contextmenu</el-radio-button>
            </el-radio-group>
            <div class="help-text">触发确认框的方式</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">宽度</div>
            <div class="prop-name">width</div>
            <el-input v-model="cfg.width" placeholder="如 200px" style="width: 200px;" />
            <div class="help-text">确认框的宽度</div>
          </div>
        </div>
        
        <!-- 行为设置 -->
        <div class="section">
          <h4>行为设置</h4>
          
          <div class="form-item">
            <div class="label-text">禁用状态</div>
            <div class="prop-name">disabled</div>
            <el-switch v-model="cfg.disabled" />
            <div class="help-text">是否禁用确认框</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">打开延迟</div>
            <div class="prop-name">open-delay</div>
            <el-input-number v-model="cfg.openDelay" :min="0" :max="5000" />
            <div class="help-text">打开确认框的延迟时间（毫秒）</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">关闭延迟</div>
            <div class="prop-name">close-delay</div>
            <el-input-number v-model="cfg.closeDelay" :min="0" :max="5000" />
            <div class="help-text">关闭确认框的延迟时间（毫秒）</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">隐藏延迟</div>
            <div class="prop-name">hide-after</div>
            <el-input-number v-model="cfg.hideAfter" :min="0" :max="5000" />
            <div class="help-text">隐藏确认框的延迟时间（毫秒）</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">显示延迟</div>
            <div class="prop-name">show-after</div>
            <el-input-number v-model="cfg.showAfter" :min="0" :max="5000" />
            <div class="help-text">显示确认框的延迟时间（毫秒）</div>
          </div>
        </div>
        
        <!-- 高级设置 -->
        <div class="section">
          <h4>高级设置</h4>
          
          <div class="form-item">
            <div class="label-text">传送</div>
            <div class="prop-name">teleported</div>
            <el-switch v-model="cfg.teleported" />
            <div class="help-text">是否将确认框传送到body</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">传送目标</div>
            <div class="prop-name">teleport-to</div>
            <el-input v-model="cfg.teleportTo" placeholder="如 #app" style="width: 200px;" />
            <div class="help-text">传送的目标元素</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">弹出框类名</div>
            <div class="prop-name">popper-class</div>
            <el-input v-model="cfg.popperClass" placeholder="如 custom-popconfirm" style="width: 200px;" />
            <div class="help-text">弹出框的自定义类名</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">弹出框样式</div>
            <div class="prop-name">popper-style</div>
            <el-input v-model="cfg.popperStyle" placeholder='如 {"background":"#fff"}' style="width: 200px;" />
            <div class="help-text">弹出框的自定义样式（JSON格式）</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">显示箭头</div>
            <div class="prop-name">show-arrow</div>
            <el-switch v-model="cfg.showArrow" />
            <div class="help-text">是否显示箭头</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">持久化</div>
            <div class="prop-name">persistent</div>
            <el-switch v-model="cfg.persistent" />
            <div class="help-text">是否持久化显示</div>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { Warning, InfoFilled, CircleClose, QuestionFilled } from '@element-plus/icons-vue'

const show = ref(false)

// 配置对象
const cfg = reactive({
  title: '确定要删除这个项目吗？',
  confirmButtonText: '确定',
  cancelButtonText: '取消',
  confirmButtonType: 'danger',
  cancelButtonType: '',
  icon: 'Warning',
  iconColor: '#f56c6c',
  hideIcon: false,
  teleported: true,
  popperStyle: '',
  popperClass: '',
  teleportTo: '',
  disabled: false,
  width: '200px',
  placement: 'top',
  trigger: 'click',
  openDelay: 0,
  closeDelay: 0,
  hideAfter: 0,
  showAfter: 0,
  autoClose: 0,
  showArrow: true,
  persistent: false,
  gpuAcceleration: true,
  fallbackPlacements: '',
  offset: 0,
  boundary: 'clippingParents',
  strategy: 'absolute',
  virtualRef: '',
  virtualTriggering: false,
  zIndex: 0
})

// 计算属性
const iconComp = computed(() => {
  const iconMap = {
    'Warning': Warning,
    'InfoFilled': InfoFilled,
    'CircleClose': CircleClose,
    'QuestionFilled': QuestionFilled
  }
  return iconMap[cfg.icon] || undefined
})

// 事件处理
const onConfirm = () => {
  ElMessage.success('确认操作')
}

const onCancel = () => {
  ElMessage.info('取消操作')
}
</script>

<style scoped>
.demo-page { padding: 12px; }
.card-header { font-weight: 600; display: flex; justify-content: space-between; align-items: center; }
.popconfirm-preview { margin-bottom: 12px; display: flex; gap: 12px; flex-wrap: wrap; }
.status { margin: 12px 0; padding: 8px; background: #f5f7fa; border-radius: 4px; font-size: 12px; }

.drawer-content { padding: 0 8px; }
.section { margin-bottom: 24px; padding: 20px; background: #fafafa; border-radius: 8px; }
.section h4 { margin: 0 0 20px 0; font-size: 16px; font-weight: 600; color: #303133; border-bottom: 2px solid #e4e7ed; padding-bottom: 8px; }

.form-item { margin-bottom: 24px; padding: 16px; background: #fff; border-radius: 6px; border: 1px solid #e4e7ed; }
.label-text { font-size: 14px; font-weight: 600; color: #303133; margin-bottom: 4px; }
.prop-name { font-size: 12px; color: #409eff; background: #ecf5ff; padding: 2px 6px; border-radius: 3px; display: inline-block; margin-bottom: 12px; font-family: 'Courier New', monospace; }
.help-text { font-size: 12px; color: #909399; margin-top: 8px; line-height: 1.4; }

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
