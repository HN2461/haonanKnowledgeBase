<template>
  <div class="demo-page">
    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <span>Input 输入框</span>
          <el-button type="primary" @click="show = true">属性设置</el-button>
        </div>
      </template>
      
      <!-- 预览输入框 -->
      <div class="row">
        <el-input 
          v-if="cfg.type !== 'textarea'" 
          v-model="value" 
          :type="cfg.type" 
          :maxlength="maxlengthProp"
          :minlength="minlengthProp" 
          :show-word-limit="cfg.showWordLimit" 
          :placeholder="cfg.placeholder"
          :clearable="cfg.clearable" 
          :clear-icon="clearIconComp" 
          :formatter="formatterFn" 
          :parser="parserFn"
          :show-password="cfg.showPassword" 
          :disabled="cfg.disabled" 
          :size="cfg.size" 
          :prefix-icon="prefixIconComp"
          :suffix-icon="suffixIconComp" 
          :autocomplete="cfg.autocomplete" 
          :readonly="cfg.readonly"
          :autofocus="cfg.autofocus" 
          :tabindex="cfg.tabindex" 
          :validate-event="cfg.validateEvent"
          :input-style="cfg.inputStyle" 
          :inputmode="cfg.inputmode" 
          style="max-width: 420px;" 
          @blur="onUI('blur')"
          @change="onUI('change')" 
          @clear="onUI('clear')" 
          @focus="onLog('focus')" 
          @input="onLog('input')"
          @keydown="onLog('keydown')" 
          @mouseleave="onLog('mouseleave')" 
          @mouseenter="onLog('mouseenter')"
          @compositionstart="onLog('compositionstart')" 
          @compositionupdate="onLog('compositionupdate')"
          @compositionend="onLog('compositionend')"
        >
          <template v-if="cfg.usePrefixSlot" #prefix>前缀</template>
          <template v-if="cfg.useSuffixSlot" #suffix>后缀</template>
          <template v-if="cfg.usePrependSlot" #prepend>http://</template>
          <template v-if="cfg.useAppendSlot" #append>.com</template>
        </el-input>

        <el-input 
          v-else 
          v-model="value" 
          type="textarea" 
          :rows="cfg.rows" 
          :autosize="cfg.autosize"
          :maxlength="maxlengthProp" 
          :minlength="minlengthProp" 
          :show-word-limit="cfg.showWordLimit"
          :placeholder="cfg.placeholder" 
          :disabled="cfg.disabled" 
          :readonly="cfg.readonly" 
          :resize="cfg.resize"
          :autofocus="cfg.autofocus" 
          :tabindex="cfg.tabindex" 
          :validate-event="cfg.validateEvent"
          :input-style="cfg.inputStyle" 
          style="max-width: 520px;" 
        />
      </div>
      
      <!-- 状态显示 -->
      <div class="status">
        <div>当前值: {{ value || '未输入' }}</div>
        <div>输入类型: {{ cfg.type }}</div>
        <div>字符长度: {{ (value || '').length }}</div>
      </div>
    </el-card>

    <el-drawer v-model="show" title="输入框属性设置" size="45%">
      <div class="drawer-content">
        <el-alert type="info" show-icon :closable="false" style="margin-bottom: 20px;"
          description="提示：1) 千分位/大写仅在 type=text 时生效；2) clearable 对 textarea 无效；3) number 类型建议配合 inputmode=numeric；4) autosize 仅 textarea 生效。" />
        
        <!-- 基础属性 -->
        <div class="section">
          <h4>基础属性</h4>
          
          <div class="form-item">
            <div class="label-text">类型</div>
            <div class="prop-name">type</div>
            <el-select v-model="cfg.type" style="width: 200px;">
              <el-option value="text" label="text（文本）" />
              <el-option value="password" label="password（密码）" />
              <el-option value="number" label="number（数字）" />
              <el-option value="textarea" label="textarea（多行文本）" />
            </el-select>
            <div class="help-text">设置输入框的类型</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">尺寸</div>
            <div class="prop-name">size</div>
            <el-radio-group v-model="cfg.size">
              <el-radio-button label="default">default</el-radio-button>
              <el-radio-button label="small">small</el-radio-button>
              <el-radio-button label="large">large</el-radio-button>
            </el-radio-group>
            <div class="help-text">设置输入框的尺寸</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">占位符</div>
            <div class="prop-name">placeholder</div>
            <el-input v-model="cfg.placeholder" placeholder="请输入占位符" style="width: 200px;" />
            <div class="help-text">设置输入框的占位文本</div>
          </div>
        </div>
        
        <!-- 文本属性 -->
        <div class="section">
          <h4>文本属性</h4>
          
          <div class="form-item">
            <div class="label-text">字数限制</div>
            <div class="prop-name">maxlength / minlength</div>
            <div class="inline-opts">
              <span>最小：</span>
              <el-input-number v-model="cfg.minlength" :min="0" :step="1" controls-position="right" style="width: 100px;" />
              <span>最大：</span>
              <el-input-number v-model="cfg.maxlength" :min="0" :step="1" controls-position="right" style="width: 100px;" />
              <el-checkbox v-model="cfg.showWordLimit">显示字数统计</el-checkbox>
            </div>
            <div class="help-text">设置输入文本的最小和最大长度</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">格式化</div>
            <div class="prop-name">formatter / parser</div>
            <el-select v-model="cfg.formatter" style="width: 200px;" placeholder="选择格式化方式">
              <el-option value="none" label="无（默认）" />
              <el-option value="upper" label="大写（将输入转为大写）" />
              <el-option value="comma" label="数字千分位（添加千分位分隔符）" />
            </el-select>
            <div class="help-text">设置输入内容的格式化和解析方式（仅 type=text 时生效）</div>
          </div>
        </div>
        
        <!-- 图标和样式 -->
        <div class="section">
          <h4>图标和样式</h4>
          
          <div class="form-item">
            <div class="label-text">清除按钮</div>
            <div class="prop-name">clearable / clear-icon</div>
            <div class="inline-opts">
              <el-switch v-model="cfg.clearable" />
              <el-select v-model="cfg.clearIcon" style="width: 160px;">
                <el-option value="default" label="默认图标" />
                <el-option value="CircleClose" label="CircleClose图标" />
                <el-option value="Edit" label="Edit图标" />
              </el-select>
            </div>
            <div class="help-text">设置是否显示清除按钮及其图标（仅非 textarea 生效）</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">前后图标</div>
            <div class="prop-name">prefix-icon / suffix-icon</div>
            <div class="inline-opts">
              <span>前缀图标：</span>
              <el-select v-model="cfg.prefixIcon" style="width: 140px;">
                <el-option value="none" label="无" />
                <el-option value="Edit" label="Edit图标" />
              </el-select>
              <span>后缀图标：</span>
              <el-select v-model="cfg.suffixIcon" style="width: 140px;">
                <el-option value="none" label="无" />
                <el-option value="Check" label="Check图标" />
              </el-select>
            </div>
            <div class="help-text">设置输入框前后的图标</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">内联样式</div>
            <div class="prop-name">input-style</div>
            <el-input v-model="cfg.inputStyle" placeholder='如 {"color":"#333"}' style="width: 200px;" />
            <div class="help-text">设置输入框的内联样式，格式为JSON字符串</div>
          </div>
        </div>
        
        <!-- 功能开关 -->
        <div class="section">
          <h4>功能开关</h4>
          
          <div class="form-item">
            <div class="label-text">只读状态</div>
            <div class="prop-name">readonly</div>
            <el-switch v-model="cfg.readonly" />
            <div class="help-text">设置输入框是否为只读状态</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">禁用状态</div>
            <div class="prop-name">disabled</div>
            <el-switch v-model="cfg.disabled" />
            <div class="help-text">设置输入框是否禁用</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">密码可见性</div>
            <div class="prop-name">show-password</div>
            <el-switch v-model="cfg.showPassword" />
            <div class="help-text">是否显示切换密码可见性的按钮（仅在 type=password 时可见）</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">校验事件</div>
            <div class="prop-name">validate-event</div>
            <el-switch v-model="cfg.validateEvent" />
            <div class="help-text">是否触发表单校验</div>
          </div>
        </div>
        
        <!-- 插槽设置 -->
        <div class="section">
          <h4>插槽设置</h4>
          
          <div class="form-item">
            <div class="label-text">插槽开关</div>
            <div class="prop-name">slots</div>
            <div class="inline-opts">
              <el-checkbox v-model="cfg.usePrefixSlot">prefix（前缀内容）</el-checkbox>
              <el-checkbox v-model="cfg.useSuffixSlot">suffix（后缀内容）</el-checkbox>
              <el-checkbox v-model="cfg.usePrependSlot">prepend（前置内容）</el-checkbox>
              <el-checkbox v-model="cfg.useAppendSlot">append（后置内容）</el-checkbox>
            </div>
            <div class="help-text">设置是否使用输入框的各种插槽</div>
          </div>
        </div>
        
        <!-- textarea 专用设置 -->
        <div class="section">
          <h4>textarea 专用设置</h4>
          
          <div class="form-item">
            <div class="label-text">行数和自适应</div>
            <div class="prop-name">rows / autosize</div>
            <div class="inline-opts">
              <span>行数：</span>
              <el-input-number v-model="cfg.rows" :min="1" :step="1" controls-position="right" style="width: 100px;" />
              <el-switch v-model="cfg.autosize" />
              <span>自适应高度</span>
            </div>
            <div class="help-text">设置多行文本框的行数和是否自适应高度（仅在 type=textarea 时生效）</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">调整大小</div>
            <div class="prop-name">resize</div>
            <el-select v-model="cfg.resize" style="width: 200px;">
              <el-option value="none" label="none（不可调整）" />
              <el-option value="both" label="both（双向调整）" />
              <el-option value="horizontal" label="horizontal（水平调整）" />
              <el-option value="vertical" label="vertical（垂直调整）" />
            </el-select>
            <div class="help-text">设置多行文本框是否可调整大小（仅在 type=textarea 时生效）</div>
          </div>
        </div>
        
        <!-- 高级设置 -->
        <div class="section">
          <h4>高级设置</h4>
          
          <div class="form-item">
            <div class="label-text">自动聚焦和Tab索引</div>
            <div class="prop-name">autofocus / tabindex</div>
            <div class="inline-opts">
              <span>自动聚焦：</span>
              <el-switch v-model="cfg.autofocus" />
              <span>Tab索引：</span>
              <el-input-number v-model="cfg.tabindex" :min="-1" :max="9999" :step="1" style="width: 100px;" />
            </div>
            <div class="help-text">autofocus：自动聚焦；tabindex：设置 Tab 键的跳转顺序</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">自动完成</div>
            <div class="prop-name">autocomplete</div>
            <el-input v-model="cfg.autocomplete" placeholder="off/on/one-time" style="width: 200px;" />
            <div class="help-text">设置输入框的自动完成功能</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">输入模式</div>
            <div class="prop-name">inputmode</div>
            <el-select v-model="cfg.inputmode" style="width: 200px;" placeholder="选择输入模式">
              <el-option value="" label="默认" />
              <el-option value="numeric" label="numeric（数字键盘）" />
              <el-option value="decimal" label="decimal（带小数点）" />
              <el-option value="email" label="email（邮箱键盘）" />
              <el-option value="search" label="search（搜索键盘）" />
              <el-option value="tel" label="tel（电话键盘）" />
              <el-option value="url" label="url（URL键盘）" />
              <el-option value="none" label="none（默认键盘）" />
            </el-select>
            <div class="help-text">inputmode 是原生输入法提示属性，用于建议浏览器在聚焦时展示何种输入键盘布局（主要对移动端虚拟键盘有效）</div>
          </div>
        </div>
        
        <!-- 使用说明 -->
        <div class="section">
          <h4>使用说明</h4>
          
          <div class="form-item">
            <div class="label-text">基本用法</div>
            <div class="prop-name">基本用法</div>
            <div class="code-block">
              <pre><code>&lt;el-input v-model="input" placeholder="请输入内容" /&gt;</code></pre>
            </div>
            <div class="help-text">输入框的基本使用方式</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">禁用状态</div>
            <div class="prop-name">禁用状态</div>
            <div class="code-block">
              <pre><code>&lt;el-input v-model="input" placeholder="请输入内容" disabled /&gt;</code></pre>
            </div>
            <div class="help-text">设置 disabled 属性可以禁用输入框</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">可清空</div>
            <div class="prop-name">可清空</div>
            <div class="code-block">
              <pre><code>&lt;el-input v-model="input" placeholder="请输入内容" clearable /&gt;</code></pre>
            </div>
            <div class="help-text">设置 clearable 属性可以显示清除按钮</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">密码框</div>
            <div class="prop-name">密码框</div>
            <div class="code-block">
              <pre><code>&lt;el-input v-model="input" type="password" placeholder="请输入密码" show-password /&gt;</code></pre>
            </div>
            <div class="help-text">设置 type="password" 和 show-password 可以显示密码切换按钮</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">带图标的输入框</div>
            <div class="prop-name">带图标的输入框</div>
            <div class="code-block">
              <pre><code>&lt;el-input v-model="input" placeholder="请输入内容"&gt;
  &lt;template #prefix&gt;
    &lt;el-icon&gt;&lt;Search /&gt;&lt;/el-icon&gt;
  &lt;/template&gt;
&lt;/el-input&gt;

&lt;el-input v-model="input" placeholder="请输入内容"&gt;
  &lt;template #suffix&gt;
    &lt;el-icon&gt;&lt;Calendar /&gt;&lt;/el-icon&gt;
  &lt;/template&gt;
&lt;/el-input&gt;</code></pre>
            </div>
            <div class="help-text">使用 prefix 和 suffix 插槽可以添加前后图标</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">带前后缀的输入框</div>
            <div class="prop-name">带前后缀的输入框</div>
            <div class="code-block">
              <pre><code>&lt;el-input v-model="input" placeholder="请输入内容"&gt;
  &lt;template #prepend&gt;Http://&lt;/template&gt;
&lt;/el-input&gt;

&lt;el-input v-model="input" placeholder="请输入内容"&gt;
  &lt;template #append&gt;.com&lt;/template&gt;
&lt;/el-input&gt;</code></pre>
            </div>
            <div class="help-text">使用 prepend 和 append 插槽可以添加前后缀内容</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">多行文本</div>
            <div class="prop-name">多行文本</div>
            <div class="code-block">
              <pre><code>&lt;el-input v-model="textarea" type="textarea" :rows="2" placeholder="请输入内容" /&gt;</code></pre>
            </div>
            <div class="help-text">设置 type="textarea" 可以显示为多行文本输入框</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">自适应高度</div>
            <div class="prop-name">自适应高度</div>
            <div class="code-block">
              <pre><code>&lt;el-input v-model="textarea" type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" placeholder="请输入内容" /&gt;</code></pre>
            </div>
            <div class="help-text">设置 autosize 属性可以让文本域自适应高度</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">字数限制</div>
            <div class="prop-name">字数限制</div>
            <div class="code-block">
              <pre><code>&lt;el-input v-model="input" maxlength="10" show-word-limit placeholder="请输入内容" /&gt;</code></pre>
            </div>
            <div class="help-text">设置 maxlength 和 show-word-limit 可以显示字数限制</div>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { Edit, Check, CircleClose } from '@element-plus/icons-vue'

const show = ref(false)
const value = ref('')
const cfg = reactive({
  type: 'text',
  maxlength: undefined,
  minlength: undefined,
  showWordLimit: false,
  placeholder: '请输入内容',
  clearable: true,
  clearIcon: 'default',
  formatter: 'none',
  showPassword: false,
  disabled: false,
  size: 'default',
  prefixIcon: 'none',
  suffixIcon: 'none',
  rows: 2,
  autosize: false,
  autocomplete: 'off',
  readonly: false,
  resize: 'none',
  autofocus: true,
  tabindex: 0,
  validateEvent: true,
  inputStyle: '',
  inputmode: '',
  usePrefixSlot: false,
  useSuffixSlot: false,
  usePrependSlot: false,
  useAppendSlot: false
})

// 仅当 >0 时才传递给 el-input，避免 0 阻止输入
const maxlengthProp = computed(() => {
  const n = Number(cfg.maxlength)
  return n > 0 ? n : undefined
})
const minlengthProp = computed(() => {
  const n = Number(cfg.minlength)
  return n > 0 ? n : undefined
})

const clearIconComp = computed(() => {
  if (cfg.clearIcon === 'CircleClose') return CircleClose
  if (cfg.clearIcon === 'Edit') return Edit
  return undefined
})
const prefixIconComp = computed(() => (cfg.prefixIcon === 'Edit' ? Edit : undefined))
const suffixIconComp = computed(() => (cfg.suffixIcon === 'Check' ? Check : undefined))

const formatterFn = computed(() => {
  if (cfg.type !== 'text') return undefined
  if (cfg.formatter === 'upper') return (v) => String(v || '').toUpperCase()
  if (cfg.formatter === 'comma') return (v) => {
    const s = String(v || '')
    if (!/^\d+(\.\d+)?$/.test(s)) return s
    const [i, d] = s.split('.')
    const isNeg = s.startsWith('-')
    const int = (isNeg ? i.slice(1) : i).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    return (isNeg ? '-' : '') + int + (d ? '.' + d : '')
  }
  return undefined
})
const parserFn = computed(() => {
  if (cfg.type !== 'text') return undefined
  if (cfg.formatter === 'comma') return (v) => String(v || '').replace(/,/g, '')
  if (cfg.formatter === 'upper') return (v) => v
  return undefined
})

const onUI = (name) => ElMessage.info(`触发事件: ${name}`)
const onLog = (name) => console.debug('[InputDemo]', name)
</script>

<style scoped>
.demo-page { padding: 12px; }
.card-header { font-weight: 600; display: flex; justify-content: space-between; align-items: center; }
.row { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 12px; align-items: center; }
.status { margin: 12px 0; padding: 8px; background: #f5f7fa; border-radius: 4px; font-size: 12px; }

.drawer-content { padding: 0 8px; }
.section { margin-bottom: 24px; padding: 20px; background: #fafafa; border-radius: 8px; }
.section h4 { margin: 0 0 20px 0; font-size: 16px; font-weight: 600; color: #303133; border-bottom: 2px solid #e4e7ed; padding-bottom: 8px; }

.form-item { margin-bottom: 24px; padding: 16px; background: #fff; border-radius: 6px; border: 1px solid #e4e7ed; }
.label-text { font-size: 14px; font-weight: 600; color: #303133; margin-bottom: 4px; }
.prop-name { font-size: 12px; color: #409eff; background: #ecf5ff; padding: 2px 6px; border-radius: 3px; display: inline-block; margin-bottom: 12px; font-family: 'Courier New', monospace; }
.help-text { font-size: 12px; color: #909399; margin-top: 8px; line-height: 1.4; }
.inline-opts { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }
.code-block { background: #f8f9fa; border: 1px solid #e9ecef; border-radius: 4px; padding: 12px; margin: 8px 0; }
.code-block pre { margin: 0; font-family: 'Courier New', monospace; font-size: 12px; line-height: 1.4; }
</style>