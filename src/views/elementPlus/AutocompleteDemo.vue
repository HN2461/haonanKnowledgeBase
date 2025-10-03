<template>
  <div class="demo-page">
    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <span>Autocomplete 自动补全</span>
          <el-button type="primary" @click="openDrawer">属性设置</el-button>
        </div>
      </template>
      
      <!-- 预览自动补全 -->
      <div class="autocomplete-preview">
        <div class="demo-section">
          <h4>基础用法</h4>
          <el-autocomplete
            v-model="cfg.value"
            :fetch-suggestions="querySearch"
            :placeholder="cfg.placeholder"
            :clearable="cfg.clearable"
            :disabled="cfg.disabled"
            :size="cfg.size"
            :prefix-icon="cfg.prefixIcon ? prefixIconComp : undefined"
            :suffix-icon="cfg.suffixIcon ? suffixIconComp : undefined"
            :debounce="cfg.debounce"
            :trigger-on-focus="cfg.triggerOnFocus"
            :select-when-unmatched="cfg.selectWhenUnmatched"
            :hide-loading="cfg.hideLoading"
            :popper-class="cfg.popperClass"
            :placement="cfg.placement"
            :popper-append-to-body="cfg.popperAppendToBody"
            :highlight-first-item="cfg.highlightFirstItem"
            :value-key="cfg.valueKey"
            :label="cfg.label"
            :value="cfg.value"
            @select="handleSelect"
            @blur="handleBlur"
            @focus="handleFocus"
            @clear="handleClear"
            @change="handleChange"
          />
        </div>

        <div class="demo-section">
          <h4>不同尺寸演示</h4>
          <div class="size-demo">
            <el-autocomplete
              v-model="sizeValues.small"
              :fetch-suggestions="querySearch"
              placeholder="小尺寸"
              size="small"
              style="width: 200px; margin-right: 10px;"
            />
            <el-autocomplete
              v-model="sizeValues.default"
              :fetch-suggestions="querySearch"
              placeholder="默认尺寸"
              style="width: 200px; margin-right: 10px;"
            />
            <el-autocomplete
              v-model="sizeValues.large"
              :fetch-suggestions="querySearch"
              placeholder="大尺寸"
              size="large"
              style="width: 200px;"
            />
          </div>
        </div>

        <div class="demo-section">
          <h4>带图标的自动补全</h4>
          <div class="icon-demo">
            <el-autocomplete
              v-model="iconValues.search"
              :fetch-suggestions="querySearch"
              placeholder="搜索"
              :prefix-icon="Search"
              style="width: 200px; margin-right: 10px;"
            />
            <el-autocomplete
              v-model="iconValues.user"
              :fetch-suggestions="queryUsers"
              placeholder="用户"
              :prefix-icon="User"
              style="width: 200px;"
            />
          </div>
        </div>

        <div class="demo-section">
          <h4>自定义模板</h4>
          <el-autocomplete
            v-model="customValue"
            :fetch-suggestions="queryCustom"
            placeholder="搜索城市"
            style="width: 300px;"
          >
            <template #default="{ item }">
              <div class="custom-suggestion">
                <span class="city-name">{{ item.name }}</span>
                <span class="city-code">{{ item.code }}</span>
              </div>
            </template>
          </el-autocomplete>
        </div>
      </div>
      
      <!-- 状态显示 -->
      <div class="status">
        <div>当前值: {{ cfg.value }}</div>
        <div>占位符: {{ cfg.placeholder }}</div>
        <div>尺寸: {{ cfg.size }}</div>
        <div>可清除: {{ cfg.clearable ? '是' : '否' }}</div>
        <div>禁用状态: {{ cfg.disabled ? '是' : '否' }}</div>
        <div>防抖延迟: {{ cfg.debounce }}ms</div>
      </div>
    </el-card>

    <el-drawer v-model="show" title="自动补全属性设置" size="45%" :close-on-click-modal="true">
      <div class="drawer-content">
        <el-alert type="info" show-icon :closable="false" style="margin-bottom: 20px;"
          description="提示：1) Autocomplete 提供输入建议功能；2) 支持自定义建议模板；3) 可以监听多种事件。" />
        
        <!-- 基础属性 -->
        <div class="section">
          <h4>基础属性</h4>
          
          <div class="form-item">
            <div class="label-text">占位符</div>
            <div class="prop-name">placeholder</div>
            <el-input v-model="cfg.placeholder" placeholder="请输入占位符" style="width: 200px;" />
            <div class="help-text">输入框占位符文本</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">尺寸</div>
            <div class="prop-name">size</div>
            <el-radio-group v-model="cfg.size">
              <el-radio-button label="default">default</el-radio-button>
              <el-radio-button label="small">small</el-radio-button>
              <el-radio-button label="large">large</el-radio-button>
            </el-radio-group>
            <div class="help-text">输入框尺寸</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">可清除</div>
            <div class="prop-name">clearable</div>
            <el-switch v-model="cfg.clearable" />
            <div class="help-text">是否可清除</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">禁用状态</div>
            <div class="prop-name">disabled</div>
            <el-switch v-model="cfg.disabled" />
            <div class="help-text">是否禁用</div>
          </div>
        </div>
        
        <!-- 功能设置 -->
        <div class="section">
          <h4>功能设置</h4>
          
          <div class="form-item">
            <div class="label-text">防抖延迟</div>
            <div class="prop-name">debounce</div>
            <el-input-number v-model="cfg.debounce" :min="0" :max="2000" style="width: 200px;" />
            <div class="help-text">输入防抖延迟，单位毫秒</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">获取焦点时触发</div>
            <div class="prop-name">trigger-on-focus</div>
            <el-switch v-model="cfg.triggerOnFocus" />
            <div class="help-text">获取焦点时是否触发建议</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">无匹配时选择</div>
            <div class="prop-name">select-when-unmatched</div>
            <el-switch v-model="cfg.selectWhenUnmatched" />
            <div class="help-text">无匹配时是否选择第一个建议</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">隐藏加载图标</div>
            <div class="prop-name">hide-loading</div>
            <el-switch v-model="cfg.hideLoading" />
            <div class="help-text">是否隐藏加载图标</div>
          </div>
        </div>
        
        <!-- 样式设置 -->
        <div class="section">
          <h4>样式设置</h4>
          
          <div class="form-item">
            <div class="label-text">弹出层类名</div>
            <div class="prop-name">popper-class</div>
            <el-input v-model="cfg.popperClass" placeholder="如 custom-popper" style="width: 200px;" />
            <div class="help-text">弹出层的类名</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">弹出位置</div>
            <div class="prop-name">placement</div>
            <el-select v-model="cfg.placement" style="width: 200px;">
              <el-option label="bottom-start" value="bottom-start" />
              <el-option label="bottom" value="bottom" />
              <el-option label="bottom-end" value="bottom-end" />
              <el-option label="top-start" value="top-start" />
              <el-option label="top" value="top" />
              <el-option label="top-end" value="top-end" />
            </el-select>
            <div class="help-text">弹出层位置</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">高亮第一项</div>
            <div class="prop-name">highlight-first-item</div>
            <el-switch v-model="cfg.highlightFirstItem" />
            <div class="help-text">是否高亮第一项</div>
          </div>
        </div>
        
        <!-- 使用说明 -->
        <div class="section">
          <h4>使用说明</h4>
          
          <div class="form-item">
            <div class="label-text">基本用法</div>
            <div class="prop-name">基本用法</div>
            <div class="code-block">
              <pre><code>&lt;el-autocomplete
  v-model="value"
  :fetch-suggestions="querySearch"
  placeholder="请输入内容"
  @select="handleSelect"
&gt;&lt;/el-autocomplete&gt;</code></pre>
            </div>
            <div class="help-text">Autocomplete 组件的基本使用方式</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">自定义建议模板</div>
            <div class="prop-name">自定义建议模板</div>
            <div class="code-block">
              <pre><code>&lt;el-autocomplete
  v-model="value"
  :fetch-suggestions="querySearch"
&gt;
  &lt;template #default="{ item }"&gt;
    &lt;div class="custom-suggestion"&gt;
      &lt;span class="name"&gt;&#123;&#123; item.name &#125;&#125;&lt;/span&gt;
      &lt;span class="desc"&gt;&#123;&#123; item.desc &#125;&#125;&lt;/span&gt;
    &lt;/div&gt;
  &lt;/template&gt;
&lt;/el-autocomplete&gt;</code></pre>
            </div>
            <div class="help-text">使用插槽自定义建议项的显示</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">事件处理</div>
            <div class="prop-name">事件处理</div>
            <div class="code-block">
              <pre><code>&lt;el-autocomplete
  v-model="value"
  :fetch-suggestions="querySearch"
  @select="handleSelect"
  @blur="handleBlur"
  @focus="handleFocus"
  @change="handleChange"
&gt;&lt;/el-autocomplete&gt;

const handleSelect = (item) => {
  console.log('选择建议:', item)
}

const handleBlur = () => {
  console.log('失去焦点')
}

const handleFocus = () => {
  console.log('获得焦点')
}

const handleChange = (value) => {
  console.log('值变化:', value)
}</code></pre>
            </div>
            <div class="help-text">监听各种事件</div>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { Search, User, Location } from '@element-plus/icons-vue'

// 响应式数据
const show = ref(false)

// 配置对象
const cfg = reactive({
  value: '',
  placeholder: '请输入内容',
  clearable: true,
  disabled: false,
  size: 'default',
  prefixIcon: false,
  suffixIcon: false,
  debounce: 300,
  triggerOnFocus: true,
  selectWhenUnmatched: false,
  hideLoading: false,
  popperClass: '',
  placement: 'bottom-start',
  popperAppendToBody: true,
  highlightFirstItem: true,
  valueKey: 'value',
  label: ''
})

// 其他数据
const sizeValues = reactive({
  small: '',
  default: '',
  large: ''
})

const iconValues = reactive({
  search: '',
  user: ''
})

const customValue = ref('')

// 计算属性
const prefixIconComp = computed(() => Search)
const suffixIconComp = computed(() => Location)

// 模拟数据
const suggestions = ref([
  { value: 'JavaScript', desc: '编程语言' },
  { value: 'Vue.js', desc: '前端框架' },
  { value: 'React', desc: '前端框架' },
  { value: 'Angular', desc: '前端框架' },
  { value: 'Node.js', desc: '后端运行时' },
  { value: 'Python', desc: '编程语言' },
  { value: 'Java', desc: '编程语言' },
  { value: 'TypeScript', desc: '编程语言' },
  { value: 'HTML', desc: '标记语言' },
  { value: 'CSS', desc: '样式语言' }
])

const users = ref([
  { value: '张三', desc: '前端开发工程师' },
  { value: '李四', desc: '后端开发工程师' },
  { value: '王五', desc: 'UI设计师' },
  { value: '赵六', desc: '产品经理' },
  { value: '钱七', desc: '测试工程师' }
])

const cities = ref([
  { name: '北京', code: 'BJ' },
  { name: '上海', code: 'SH' },
  { name: '广州', code: 'GZ' },
  { name: '深圳', code: 'SZ' },
  { name: '杭州', code: 'HZ' },
  { name: '南京', code: 'NJ' },
  { name: '成都', code: 'CD' },
  { name: '武汉', code: 'WH' }
])

// 方法
const openDrawer = () => {
  console.log('打开自动补全设置抽屉')
  show.value = true
}

const querySearch = (queryString, callback) => {
  const results = queryString
    ? suggestions.value.filter(item => 
        item.value.toLowerCase().includes(queryString.toLowerCase())
      )
    : suggestions.value
  callback(results)
}

const queryUsers = (queryString, callback) => {
  const results = queryString
    ? users.value.filter(item => 
        item.value.toLowerCase().includes(queryString.toLowerCase())
      )
    : users.value
  callback(results)
}

const queryCustom = (queryString, callback) => {
  const results = queryString
    ? cities.value.filter(item => 
        item.name.toLowerCase().includes(queryString.toLowerCase())
      )
    : cities.value
  callback(results)
}

// 事件处理
const handleSelect = (item) => {
  console.log('选择建议:', item)
  ElMessage.success(`选择了: ${item.value}`)
}

const handleBlur = () => {
  console.log('失去焦点')
}

const handleFocus = () => {
  console.log('获得焦点')
}

const handleClear = () => {
  console.log('清除内容')
  ElMessage.info('已清除内容')
}

const handleChange = (value) => {
  console.log('值变化:', value)
}
</script>

<style scoped>
.demo-page { padding: 12px; }
.card-header { font-weight: 600; display: flex; justify-content: space-between; align-items: center; }
.demo-section { margin-bottom: 20px; }
.demo-section h4 { margin: 0 0 15px 0; color: #303133; font-size: 16px; }
.status { margin: 12px 0; padding: 8px; background: #f5f7fa; border-radius: 4px; font-size: 12px; }

.size-demo { display: flex; align-items: center; flex-wrap: wrap; }
.icon-demo { display: flex; align-items: center; flex-wrap: wrap; }

.custom-suggestion {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.city-name { font-weight: 600; color: #303133; }
.city-code { font-size: 12px; color: #909399; background: #f0f2f5; padding: 2px 6px; border-radius: 3px; }

.drawer-content { padding: 0 8px; }
.section { margin-bottom: 24px; padding: 20px; background: #fafafa; border-radius: 8px; }
.section h4 { margin: 0 0 20px 0; font-size: 16px; font-weight: 600; color: #303133; border-bottom: 2px solid #e4e7ed; padding-bottom: 8px; }

.form-item { margin-bottom: 24px; padding: 16px; background: #fff; border-radius: 6px; border: 1px solid #e4e7ed; }
.label-text { font-size: 14px; font-weight: 600; color: #303133; margin-bottom: 4px; }
.prop-name { font-size: 12px; color: #409eff; background: #ecf5ff; padding: 2px 6px; border-radius: 3px; display: inline-block; margin-bottom: 12px; font-family: 'Courier New', monospace; }
.help-text { font-size: 12px; color: #909399; margin-top: 8px; line-height: 1.4; }

.code-block { 
  background: #f8f9fa; 
  border: 1px solid #e9ecef; 
  border-radius: 4px; 
  padding: 12px; 
  margin: 8px 0; 
  overflow-x: auto;
  max-width: 100%;
}
.code-block pre { 
  margin: 0; 
  font-family: 'Courier New', monospace; 
  font-size: 12px; 
  line-height: 1.4; 
  white-space: pre;
  overflow-x: auto;
  min-width: max-content;
}
</style>
