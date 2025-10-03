<template>
  <div class="demo-page">
    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <span>Select 选择器</span>
          <el-button type="primary" @click="show = true">属性设置</el-button>
        </div>
      </template>
      
      <!-- 预览选择器 -->
      <div class="row">
        <el-select
          v-model="value"
          :clearable="cfg.clearable"
          :disabled="cfg.disabled"
          :filterable="cfg.filterable"
          :remote="cfg.remote"
          :multiple="cfg.multiple"
          :collapse-tags="cfg.collapseTags"
          :collapse-tags-tooltip="cfg.collapseTagsTooltip"
          :multiple-limit="multipleLimitProp"
          :placeholder="cfg.placeholder"
          :size="cfg.size"
          :reserve-keyword="cfg.reserveKeyword"
          :default-first-option="cfg.defaultFirstOption"
          :popper-append-to-body="cfg.popperAppendToBody"
          :automatic-dropdown="cfg.automaticDropdown"
          :clear-icon="clearIconComp"
          :fit-input-width="cfg.fitInputWidth"
          :validate-event="cfg.validateEvent"
          :value-key="cfg.valueKey"
          :collapse-tags-max="cfg.collapseTagsMax"
          :teleported="cfg.teleported"
          :persistent="cfg.persistent"
          :filter-method="filterMethodFn"
          :remote-method="remoteMethodFn"
          :loading="cfg.loading"
          :loading-text="cfg.loadingText"
          :no-match-text="cfg.noMatchText"
          :no-data-text="cfg.noDataText"
          :popper-class="cfg.popperClass"
          :teleport-to="cfg.teleportTo"
          :tag-type="cfg.tagType"
          :effect="cfg.effect"
          style="width: 300px;"
          @focus="onUI('focus')"
          @blur="onUI('blur')"
          @change="onUI('change')"
          @visible-change="onUI('visible-change')"
          @remove-tag="onUI('remove-tag')"
          @clear="onUI('clear')"
        >
          <el-option
            v-for="item in filteredOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          />
        </el-select>
      </div>
      
      <!-- 状态显示 -->
      <div class="status">
        <div>当前值: {{ value || '未选择' }}</div>
        <div>选项数量: {{ filteredOptions.length }}</div>
        <div>模式: {{ cfg.multiple ? '多选' : '单选' }}</div>
      </div>
    </el-card>

    <el-drawer v-model="show" title="选择器属性设置" size="45%">
      <div class="drawer-content">
        <el-alert type="info" show-icon :closable="false" style="margin-bottom: 20px;"
          description="提示：1) remote 需要配合 filterable 使用；2) multiple 模式下 collapse-tags 生效；3) 远程搜索会模拟延迟加载；4) 折叠标签在多选模式下才有效果。" />
        
        <!-- 基础属性 -->
        <div class="section">
          <h4>基础属性</h4>
          
          <div class="form-item">
            <div class="label-text">选择模式</div>
            <div class="prop-name">multiple</div>
            <el-radio-group v-model="cfg.mode">
              <el-radio-button label="single">单选</el-radio-button>
              <el-radio-button label="multiple">多选</el-radio-button>
            </el-radio-group>
            <div class="help-text">选择器的工作模式，单选或多选</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">尺寸</div>
            <div class="prop-name">size</div>
            <el-radio-group v-model="cfg.size">
              <el-radio-button label="default">default</el-radio-button>
              <el-radio-button label="small">small</el-radio-button>
              <el-radio-button label="large">large</el-radio-button>
            </el-radio-group>
            <div class="help-text">选择器的尺寸大小</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">占位符</div>
            <div class="prop-name">placeholder</div>
            <el-input v-model="cfg.placeholder" placeholder="请输入占位符" style="width: 200px;" />
            <div class="help-text">选择框的占位符文本</div>
          </div>
        </div>
        
        <!-- 功能开关 -->
        <div class="section">
          <h4>功能开关</h4>
          
          <div class="form-item">
            <div class="label-text">可清空</div>
            <div class="prop-name">clearable</div>
            <el-switch v-model="cfg.clearable" />
            <div class="help-text">是否显示清除按钮</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">禁用状态</div>
            <div class="prop-name">disabled</div>
            <el-switch v-model="cfg.disabled" />
            <div class="help-text">是否禁用选择器</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">可搜索</div>
            <div class="prop-name">filterable</div>
            <el-switch v-model="cfg.filterable" />
            <div class="help-text">是否允许搜索选项</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">远程搜索</div>
            <div class="prop-name">remote</div>
            <el-switch v-model="cfg.remote" :disabled="!cfg.filterable" />
            <div class="help-text">是否使用远程搜索（需要配合 filterable 使用）</div>
          </div>
        </div>
        
        <!-- 多选设置 -->
        <div class="section">
          <h4>多选设置</h4>
          
          <div class="form-item">
            <div class="label-text">折叠标签</div>
            <div class="prop-name">collapse-tags</div>
            <el-switch v-model="cfg.collapseTags" :disabled="!cfg.multiple" />
            <div class="help-text">多选时是否将选中值按数量折叠</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">折叠提示</div>
            <div class="prop-name">collapse-tags-tooltip</div>
            <el-switch v-model="cfg.collapseTagsTooltip" :disabled="!cfg.multiple || !cfg.collapseTags" />
            <div class="help-text">折叠标签是否显示提示</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">多选限制</div>
            <div class="prop-name">multiple-limit</div>
            <el-input-number v-model="cfg.multipleLimit" :min="0" :max="10" :disabled="!cfg.multiple" />
            <div class="help-text">多选时用户最多可以选择的项目数，0 为不限制</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">折叠标签数量</div>
            <div class="prop-name">collapse-tags-max</div>
            <el-input-number v-model="cfg.collapseTagsMax" :min="1" :max="10" :disabled="!cfg.multiple || !cfg.collapseTags" />
            <div class="help-text">多选且折叠时，最多显示的标签数量</div>
          </div>
        </div>
        
        <!-- 搜索设置 -->
        <div class="section">
          <h4>搜索设置</h4>
          
          <div class="form-item">
            <div class="label-text">保留关键词</div>
            <div class="prop-name">reserve-keyword</div>
            <el-switch v-model="cfg.reserveKeyword" :disabled="!cfg.filterable" />
            <div class="help-text">多选且可搜索时，是否在选择一个选项后保留当前的搜索关键词</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">默认第一项</div>
            <div class="prop-name">default-first-option</div>
            <el-switch v-model="cfg.defaultFirstOption" :disabled="!cfg.filterable" />
            <div class="help-text">在输入框按下回车，选择第一个匹配项</div>
          </div>
        </div>
        
        <!-- 下拉框设置 -->
        <div class="section">
          <h4>下拉框设置</h4>
          
          <div class="form-item">
            <div class="label-text">挂载到 body</div>
            <div class="prop-name">popper-append-to-body</div>
            <el-switch v-model="cfg.popperAppendToBody" />
            <div class="help-text">是否将下拉框挂载到 body 元素上</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">自动下拉</div>
            <div class="prop-name">automatic-dropdown</div>
            <el-switch v-model="cfg.automaticDropdown" />
            <div class="help-text">对于不可搜索的 Select，是否在输入框获得焦点后自动弹出选项菜单</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">适应宽度</div>
            <div class="prop-name">fit-input-width</div>
            <el-switch v-model="cfg.fitInputWidth" />
            <div class="help-text">下拉框的宽度是否与选择器相同</div>
          </div>
        </div>
        
        <!-- 图标和样式 -->
        <div class="section">
          <h4>图标和样式</h4>
          
          <div class="form-item">
            <div class="label-text">清除图标</div>
            <div class="prop-name">clear-icon</div>
            <el-select v-model="cfg.clearIcon" style="width: 200px;">
              <el-option value="default" label="默认" />
              <el-option value="CircleClose" label="CircleClose" />
              <el-option value="CloseBold" label="CloseBold" />
            </el-select>
            <div class="help-text">自定义清除按钮的图标</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">标签类型</div>
            <div class="prop-name">tag-type</div>
            <el-select v-model="cfg.tagType" style="width: 200px;" :disabled="!cfg.multiple">
              <el-option value="default" label="default" />
              <el-option value="success" label="success" />
              <el-option value="warning" label="warning" />
              <el-option value="danger" label="danger" />
              <el-option value="info" label="info" />
            </el-select>
            <div class="help-text">多选时标签的类型（仅多选模式有效）</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">主题</div>
            <div class="prop-name">effect</div>
            <el-select v-model="cfg.effect" style="width: 200px;">
              <el-option value="light" label="light" />
              <el-option value="dark" label="dark" />
            </el-select>
            <div class="help-text">选择器的主题</div>
          </div>
        </div>
        
        <!-- 状态和文本 -->
        <div class="section">
          <h4>状态和文本</h4>
          
          <div class="form-item">
            <div class="label-text">加载状态</div>
            <div class="prop-name">loading</div>
            <el-switch v-model="cfg.loading" />
            <div class="help-text">是否显示加载状态</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">加载文本</div>
            <div class="prop-name">loading-text</div>
            <el-input v-model="cfg.loadingText" placeholder="加载中..." style="width: 200px;" />
            <div class="help-text">加载时显示的文本</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">无数据文本</div>
            <div class="prop-name">no-data-text</div>
            <el-input v-model="cfg.noDataText" placeholder="无数据" style="width: 200px;" />
            <div class="help-text">无选项时显示的文本</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">无匹配文本</div>
            <div class="prop-name">no-match-text</div>
            <el-input v-model="cfg.noMatchText" placeholder="无匹配数据" style="width: 200px;" />
            <div class="help-text">搜索无匹配时显示的文本</div>
          </div>
        </div>
        
        <!-- 高级设置 -->
        <div class="section">
          <h4>高级设置</h4>
          
          <div class="form-item">
            <div class="label-text">校验事件</div>
            <div class="prop-name">validate-event</div>
            <el-switch v-model="cfg.validateEvent" />
            <div class="help-text">输入时是否触发表单的校验</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">传送</div>
            <div class="prop-name">teleported</div>
            <el-switch v-model="cfg.teleported" />
            <div class="help-text">是否将下拉框传送到 body</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">持久化</div>
            <div class="prop-name">persistent</div>
            <el-switch v-model="cfg.persistent" />
            <div class="help-text">当下拉框关闭时，是否保持下拉框的状态</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">值键</div>
            <div class="prop-name">value-key</div>
            <el-input v-model="cfg.valueKey" placeholder="如 value" style="width: 200px;" />
            <div class="help-text">作为 value 唯一标识的键名</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">下拉框类名</div>
            <div class="prop-name">popper-class</div>
            <el-input v-model="cfg.popperClass" placeholder="如 custom-popper" style="width: 200px;" />
            <div class="help-text">下拉框的自定义类名</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">传送目标</div>
            <div class="prop-name">teleport-to</div>
            <el-input v-model="cfg.teleportTo" placeholder="如 #app" style="width: 200px;" />
            <div class="help-text">下拉框传送的目标元素</div>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { CircleClose, Close } from '@element-plus/icons-vue'

const show = ref(false)
const value = ref('')

// 选项数据
const options = ref([
  { label: '选项一', value: '1' },
  { label: '选项二', value: '2' },
  { label: '选项三', value: '3' },
  { label: '选项四', value: '4' },
  { label: '选项五', value: '5' },
  { label: '禁用选项', value: '6', disabled: true }
])

// 配置对象
const cfg = reactive({
  mode: 'single',
  multiple: false,
  clearable: true,
  disabled: false,
  filterable: true,
  remote: false,
  placeholder: '请选择',
  size: 'default',
  collapseTags: false,
  collapseTagsTooltip: false,
  multipleLimit: 0,
  collapseTagsMax: 3,
  reserveKeyword: false,
  defaultFirstOption: false,
  popperAppendToBody: true,
  automaticDropdown: false,
  clearIcon: 'default',
  fitInputWidth: false,
  validateEvent: true,
  valueKey: 'value',
  tagType: 'default',
  effect: 'light',
  loading: false,
  loadingText: '加载中...',
  noDataText: '无数据',
  noMatchText: '无匹配数据',
  popperClass: '',
  teleported: true,
  persistent: false,
  teleportTo: ''
})

// 监听模式切换
watch(() => cfg.mode, (newMode) => {
  cfg.multiple = newMode === 'multiple'
  if (newMode === 'single') {
    value.value = ''
  } else {
    value.value = []
  }
})

// 计算属性
const multipleLimitProp = computed(() => {
  return cfg.multipleLimit > 0 ? cfg.multipleLimit : undefined
})

const clearIconComp = computed(() => {
  if (cfg.clearIcon === 'CircleClose') return CircleClose
  if (cfg.clearIcon === 'CloseBold') return CloseBold
  return undefined
})

const filteredOptions = computed(() => {
  if (cfg.remote) {
    return options.value.filter(item => 
      item.label.toLowerCase().includes((value.value || '').toString().toLowerCase())
    )
  }
  return options.value
})

// 过滤方法
const filterMethodFn = computed(() => {
  if (!cfg.filterable) return undefined
  return (query) => {
    console.log('本地过滤:', query)
    return options.value.filter(item => 
      item.label.toLowerCase().includes(query.toLowerCase())
    )
  }
})

// 远程方法
const remoteMethodFn = computed(() => {
  if (!cfg.remote) return undefined
  return (query) => {
    console.log('远程搜索:', query)
    cfg.loading = true
    setTimeout(() => {
      cfg.loading = false
    }, 1000)
  }
})

// 事件处理
const onUI = (name) => ElMessage.info(`触发事件: ${name}`)
const onLog = (name) => console.debug('[SelectDemo]', name)
</script>

<style scoped>
.demo-page { padding: 12px; }
.card-header { font-weight: 600; display: flex; justify-content: space-between; align-items: center; }
.row { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 12px; }
.status { margin: 12px 0; padding: 8px; background: #f5f7fa; border-radius: 4px; font-size: 12px; }

.drawer-content { padding: 0 8px; }
.section { margin-bottom: 24px; padding: 20px; background: #fafafa; border-radius: 8px; }
.section h4 { margin: 0 0 20px 0; font-size: 16px; font-weight: 600; color: #303133; border-bottom: 2px solid #e4e7ed; padding-bottom: 8px; }

.form-item { margin-bottom: 24px; padding: 16px; background: #fff; border-radius: 6px; border: 1px solid #e4e7ed; }
.label-text { font-size: 14px; font-weight: 600; color: #303133; margin-bottom: 4px; }
.prop-name { font-size: 12px; color: #409eff; background: #ecf5ff; padding: 2px 6px; border-radius: 3px; display: inline-block; margin-bottom: 12px; font-family: 'Courier New', monospace; }
.help-text { font-size: 12px; color: #909399; margin-top: 8px; line-height: 1.4; }
</style>