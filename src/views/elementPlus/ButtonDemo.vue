<template>
  <div class="demo-page">
    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <span>Button 按钮</span>
          <el-button type="primary" @click="show = true">属性设置</el-button>
        </div>
      </template>
      
      <!-- 预览按钮 -->
      <div class="row">
        <el-button
          :size="cfg.size"
          :type="cfg.type"
          :plain="cfg.plain"
          :text="cfg.text"
          :bg="cfg.bg"
          :link="cfg.link"
          :round="cfg.round"
          :circle="cfg.circle"
          :loading="cfg.loading"
          :loading-icon="loadingIconComp"
          :disabled="cfg.disabled"
          :icon="iconComp"
          :autofocus="cfg.autofocus"
          :native-type="cfg.nativeType"
          :auto-insert-space="cfg.autoInsertSpace"
          :color="cfg.color || undefined"
          :dark="cfg.dark"
          :tag="cfg.tag || 'button'"
        >
          <template v-if="cfg.loadingSlot" #loading>
            <el-icon><Loading /></el-icon>
          </template>
          {{ cfg.text ? '文字按钮' : '演示按钮' }}
        </el-button>
      </div>
      
      <!-- 状态显示 -->
      <div class="status">
        <div>按钮类型: {{ cfg.type || 'default' }}</div>
        <div>按钮尺寸: {{ cfg.size }}</div>
        <div>按钮状态: {{ cfg.disabled ? '禁用' : '启用' }}</div>
      </div>
    </el-card>

    <el-drawer v-model="show" title="按钮属性设置" size="45%">
      <div class="drawer-content">
        <el-alert type="info" show-icon :closable="false" style="margin-bottom: 20px;"
          description="提示：1) text、bg、link 是按钮的变体样式；2) round 和 circle 是形状样式；3) 自定义颜色会覆盖 type 的颜色；4) 圆形按钮建议配合图标使用。" />
        
        <!-- 基础属性 -->
        <div class="section">
          <h4>基础属性</h4>
          
          <div class="form-item">
            <div class="label-text">尺寸</div>
            <div class="prop-name">size</div>
            <el-radio-group v-model="cfg.size">
              <el-radio-button label="default">default</el-radio-button>
              <el-radio-button label="small">small</el-radio-button>
              <el-radio-button label="large">large</el-radio-button>
            </el-radio-group>
            <div class="help-text">按钮的尺寸大小</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">类型</div>
            <div class="prop-name">type</div>
            <el-select v-model="cfg.type" style="width: 200px;">
              <el-option label="默认" value="" />
              <el-option label="primary" value="primary" />
              <el-option label="success" value="success" />
              <el-option label="warning" value="warning" />
              <el-option label="danger" value="danger" />
              <el-option label="info" value="info" />
            </el-select>
            <div class="help-text">按钮的类型，决定按钮的颜色主题</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">原生类型</div>
            <div class="prop-name">native-type</div>
            <el-radio-group v-model="cfg.nativeType">
              <el-radio-button label="button">button</el-radio-button>
              <el-radio-button label="submit">submit</el-radio-button>
              <el-radio-button label="reset">reset</el-radio-button>
            </el-radio-group>
            <div class="help-text">原生 button 元素的 type 属性</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">标签元素</div>
            <div class="prop-name">tag</div>
            <el-input v-model="cfg.tag" placeholder="如 a/button/div" style="width: 200px;" />
            <div class="help-text">自定义按钮的 HTML 标签</div>
          </div>
        </div>
        
        <!-- 样式变体 -->
        <div class="section">
          <h4>样式变体</h4>
          
          <div class="form-item">
            <div class="label-text">朴素按钮</div>
            <div class="prop-name">plain</div>
            <el-switch v-model="cfg.plain" />
            <div class="help-text">是否为朴素按钮（透明背景，有边框）</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">文字按钮</div>
            <div class="prop-name">text</div>
            <el-switch v-model="cfg.text" />
            <div class="help-text">是否为文字按钮（无背景，无边框）</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">文字按钮背景</div>
            <div class="prop-name">bg</div>
            <el-switch v-model="cfg.bg" />
            <div class="help-text">文字按钮是否显示背景颜色</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">链接按钮</div>
            <div class="prop-name">link</div>
            <el-switch v-model="cfg.link" />
            <div class="help-text">是否为链接按钮（类似链接样式）</div>
          </div>
        </div>
        
        <!-- 形状样式 -->
        <div class="section">
          <h4>形状样式</h4>
          
          <div class="form-item">
            <div class="label-text">圆角按钮</div>
            <div class="prop-name">round</div>
            <el-switch v-model="cfg.round" />
            <div class="help-text">是否为圆角按钮</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">圆形按钮</div>
            <div class="prop-name">circle</div>
            <el-switch v-model="cfg.circle" />
            <div class="help-text">是否为圆形按钮（建议配合图标使用）</div>
          </div>
        </div>
        
        <!-- 图标设置 -->
        <div class="section">
          <h4>图标设置</h4>
          
          <div class="form-item">
            <div class="label-text">图标</div>
            <div class="prop-name">icon</div>
            <el-select v-model="cfg.icon" style="width: 200px;">
              <el-option label="无" value="none" />
              <el-option label="Edit" value="Edit" />
              <el-option label="Check" value="Check" />
              <el-option label="Delete" value="Delete" />
              <el-option label="Search" value="Search" />
            </el-select>
            <div class="help-text">按钮的图标组件</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">加载图标</div>
            <div class="prop-name">loading-icon</div>
            <el-select v-model="cfg.loadingIcon" style="width: 200px;">
              <el-option label="默认 Loading" value="Loading" />
              <el-option label="Edit" value="Edit" />
              <el-option label="Check" value="Check" />
            </el-select>
            <div class="help-text">加载状态时显示的图标</div>
          </div>
        </div>
        
        <!-- 状态设置 -->
        <div class="section">
          <h4>状态设置</h4>
          
          <div class="form-item">
            <div class="label-text">加载状态</div>
            <div class="prop-name">loading</div>
            <el-switch v-model="cfg.loading" />
            <div class="help-text">是否为加载中状态</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">自定义加载槽</div>
            <div class="prop-name">loading slot</div>
            <el-switch v-model="cfg.loadingSlot" />
            <div class="help-text">是否使用自定义的加载插槽</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">禁用状态</div>
            <div class="prop-name">disabled</div>
            <el-switch v-model="cfg.disabled" />
            <div class="help-text">按钮是否为禁用状态</div>
          </div>
        </div>
        
        <!-- 颜色设置 -->
        <div class="section">
          <h4>颜色设置</h4>
          
          <div class="form-item">
            <div class="label-text">自定义颜色</div>
            <div class="prop-name">color</div>
            <el-input v-model="cfg.color" placeholder="#409eff 或 rgb()" style="width: 200px;" />
            <div class="help-text">自定义按钮颜色，会覆盖 type 的颜色</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">暗色模式</div>
            <div class="prop-name">dark</div>
            <el-switch v-model="cfg.dark" />
            <div class="help-text">是否为暗色模式，自动设置暗色主题颜色</div>
          </div>
        </div>
        
        <!-- 高级设置 -->
        <div class="section">
          <h4>高级设置</h4>
          
          <div class="form-item">
            <div class="label-text">自动聚焦</div>
            <div class="prop-name">autofocus</div>
            <el-switch v-model="cfg.autofocus" />
            <div class="help-text">原生 autofocus 属性</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">自动插入空格</div>
            <div class="prop-name">auto-insert-space</div>
            <el-switch v-model="cfg.autoInsertSpace" />
            <div class="help-text">两个中文字符之间自动插入空格</div>
          </div>
        </div>
        
        <!-- 使用说明 -->
        <div class="section">
          <h4>使用说明</h4>
          
          <div class="form-item">
            <div class="label-text">基本用法</div>
            <div class="prop-name">基本用法</div>
            <div class="code-block">
              <pre><code>&lt;el-button&gt;默认按钮&lt;/el-button&gt;
&lt;el-button type="primary"&gt;主要按钮&lt;/el-button&gt;
&lt;el-button type="success"&gt;成功按钮&lt;/el-button&gt;
&lt;el-button type="info"&gt;信息按钮&lt;/el-button&gt;
&lt;el-button type="warning"&gt;警告按钮&lt;/el-button&gt;
&lt;el-button type="danger"&gt;危险按钮&lt;/el-button&gt;</code></pre>
            </div>
            <div class="help-text">按钮的基本使用方式，支持多种类型</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">朴素按钮</div>
            <div class="prop-name">朴素按钮</div>
            <div class="code-block">
              <pre><code>&lt;el-button plain&gt;朴素按钮&lt;/el-button&gt;
&lt;el-button type="primary" plain&gt;主要按钮&lt;/el-button&gt;
&lt;el-button type="success" plain&gt;成功按钮&lt;/el-button&gt;</code></pre>
            </div>
            <div class="help-text">设置 plain 属性可以显示为朴素按钮</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">圆角按钮</div>
            <div class="prop-name">圆角按钮</div>
            <div class="code-block">
              <pre><code>&lt;el-button round&gt;圆角按钮&lt;/el-button&gt;
&lt;el-button type="primary" round&gt;主要按钮&lt;/el-button&gt;</code></pre>
            </div>
            <div class="help-text">设置 round 属性可以显示为圆角按钮</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">圆形按钮</div>
            <div class="prop-name">圆形按钮</div>
            <div class="code-block">
              <pre><code>&lt;el-button circle&gt;
  &lt;el-icon&gt;&lt;Search /&gt;&lt;/el-icon&gt;
&lt;/el-button&gt;
&lt;el-button type="primary" circle&gt;
  &lt;el-icon&gt;&lt;Edit /&gt;&lt;/el-icon&gt;
&lt;/el-button&gt;</code></pre>
            </div>
            <div class="help-text">设置 circle 属性可以显示为圆形按钮，建议配合图标使用</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">禁用状态</div>
            <div class="prop-name">禁用状态</div>
            <div class="code-block">
              <pre><code>&lt;el-button disabled&gt;禁用按钮&lt;/el-button&gt;
&lt;el-button type="primary" disabled&gt;禁用按钮&lt;/el-button&gt;</code></pre>
            </div>
            <div class="help-text">设置 disabled 属性可以禁用按钮</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">加载状态</div>
            <div class="prop-name">加载状态</div>
            <div class="code-block">
              <pre><code>&lt;el-button :loading="true"&gt;加载中&lt;/el-button&gt;
&lt;el-button type="primary" :loading="loading" @click="handleClick"&gt;
  {{ loading ? '加载中' : '点击加载' }}
&lt;/el-button&gt;</code></pre>
            </div>
            <div class="help-text">设置 loading 属性可以显示加载状态</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">按钮组</div>
            <div class="prop-name">按钮组</div>
            <div class="code-block">
              <pre><code>&lt;el-button-group&gt;
  &lt;el-button type="primary"&gt;上一页&lt;/el-button&gt;
  &lt;el-button type="primary"&gt;下一页&lt;/el-button&gt;
&lt;/el-button-group&gt;</code></pre>
            </div>
            <div class="help-text">使用 el-button-group 可以创建按钮组</div>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import { Edit, Check, Delete, Search, Loading } from '@element-plus/icons-vue'

const show = ref(false)
const cfg = reactive({
  size: 'default',
  type: '',
  plain: false,
  text: false,
  bg: false,
  link: false,
  round: false,
  circle: false,
  loading: false,
  loadingIcon: 'Loading',
  loadingSlot: false,
  disabled: false,
  icon: 'none',
  autofocus: false,
  nativeType: 'button',
  autoInsertSpace: false,
  color: '',
  dark: false,
  tag: ''
})

const iconComp = computed(() => {
  if (cfg.icon === 'Edit') return Edit
  if (cfg.icon === 'Check') return Check
  if (cfg.icon === 'Delete') return Delete
  if (cfg.icon === 'Search') return Search
  return undefined
})

const loadingIconComp = computed(() => {
  if (cfg.loadingIcon === 'Edit') return Edit
  if (cfg.loadingIcon === 'Check') return Check
  return Loading
})
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
.code-block { background: #f8f9fa; border: 1px solid #e9ecef; border-radius: 4px; padding: 12px; margin: 8px 0; }
.code-block pre { margin: 0; font-family: 'Courier New', monospace; font-size: 12px; line-height: 1.4; }
</style>