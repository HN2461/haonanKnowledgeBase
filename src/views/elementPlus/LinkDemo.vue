<template>
  <div class="demo-page">
    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <span>Link 链接</span>
          <el-button type="primary" @click="show = true">属性设置</el-button>
        </div>
      </template>
      
      <!-- 预览链接 -->
      <div class="link-preview">
        <el-link
          :type="cfg.type"
          :underline="cfg.underline"
          :disabled="cfg.disabled"
          :href="cfg.href"
          :target="cfg.target"
          :icon="iconComp"
          @click="onClick"
        >
          {{ cfg.text }}
        </el-link>
      </div>
      
      <!-- 状态显示 -->
      <div class="status">
        <div>链接类型: {{ cfg.type }}</div>
        <div>下划线: {{ cfg.underline ? '显示' : '隐藏' }}</div>
        <div>禁用状态: {{ cfg.disabled ? '是' : '否' }}</div>
        <div>目标窗口: {{ cfg.target || '默认' }}</div>
      </div>
    </el-card>

    <el-drawer v-model="show" title="链接属性设置" size="45%">
      <div class="drawer-content">
        <el-alert type="info" show-icon :closable="false" style="margin-bottom: 20px;"
          description="提示：1) Link 用于页面内的链接跳转；2) 支持多种类型和样式；3) 可以自定义图标和行为。" />
        
        <!-- 基础属性 -->
        <div class="section">
          <h4>基础属性</h4>
          
          <div class="form-item">
            <div class="label-text">链接文本</div>
            <div class="prop-name">text</div>
            <el-input v-model="cfg.text" placeholder="请输入链接文本" style="width: 200px;" />
            <div class="help-text">链接显示的文本内容</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">链接类型</div>
            <div class="prop-name">type</div>
            <el-radio-group v-model="cfg.type">
              <el-radio-button label="primary">primary</el-radio-button>
              <el-radio-button label="success">success</el-radio-button>
              <el-radio-button label="warning">warning</el-radio-button>
              <el-radio-button label="danger">danger</el-radio-button>
              <el-radio-button label="info">info</el-radio-button>
            </el-radio-group>
            <div class="help-text">链接的类型</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">链接地址</div>
            <div class="prop-name">href</div>
            <el-input v-model="cfg.href" placeholder="如 https://example.com" style="width: 200px;" />
            <div class="help-text">链接的目标地址</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">目标窗口</div>
            <div class="prop-name">target</div>
            <el-select v-model="cfg.target" style="width: 200px;">
              <el-option label="默认" value="" />
              <el-option label="_blank" value="_blank" />
              <el-option label="_self" value="_self" />
              <el-option label="_parent" value="_parent" />
              <el-option label="_top" value="_top" />
            </el-select>
            <div class="help-text">链接打开的目标窗口</div>
          </div>
        </div>
        
        <!-- 显示设置 -->
        <div class="section">
          <h4>显示设置</h4>
          
          <div class="form-item">
            <div class="label-text">下划线</div>
            <div class="prop-name">underline</div>
            <el-switch v-model="cfg.underline" />
            <div class="help-text">是否显示下划线</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">禁用状态</div>
            <div class="prop-name">disabled</div>
            <el-switch v-model="cfg.disabled" />
            <div class="help-text">是否禁用链接</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">图标</div>
            <div class="prop-name">icon</div>
            <el-select v-model="cfg.icon" style="width: 200px;">
              <el-option label="无" value="" />
              <el-option label="Link" value="Link" />
              <el-option label="Edit" value="Edit" />
              <el-option label="View" value="View" />
              <el-option label="Download" value="Download" />
              <el-option label="Upload" value="Upload" />
              <el-option label="Share" value="Share" />
              <el-option label="Delete" value="Delete" />
            </el-select>
            <div class="help-text">链接的图标</div>
          </div>
        </div>
        
        <!-- 使用说明 -->
        <div class="section">
          <h4>使用说明</h4>
          
          <div class="form-item">
            <div class="label-text">基本用法</div>
            <div class="prop-name">基本用法</div>
            <div class="code-block">
              <pre><code>&lt;el-link href="https://element.eleme.io" target="_blank"&gt;默认链接&lt;/el-link&gt;
&lt;el-link type="primary"&gt;主要链接&lt;/el-link&gt;
&lt;el-link type="success"&gt;成功链接&lt;/el-link&gt;
&lt;el-link type="warning"&gt;警告链接&lt;/el-link&gt;
&lt;el-link type="danger"&gt;危险链接&lt;/el-link&gt;
&lt;el-link type="info"&gt;信息链接&lt;/el-link&gt;</code></pre>
            </div>
            <div class="help-text">Link 组件的基本使用方式</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">禁用状态</div>
            <div class="prop-name">禁用状态</div>
            <div class="code-block">
              <pre><code>&lt;el-link disabled&gt;默认链接&lt;/el-link&gt;
&lt;el-link type="primary" disabled&gt;主要链接&lt;/el-link&gt;</code></pre>
            </div>
            <div class="help-text">禁用状态的链接</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">下划线</div>
            <div class="prop-name">下划线</div>
            <div class="code-block">
              <pre><code>&lt;el-link :underline="false"&gt;无下划线&lt;/el-link&gt;
&lt;el-link&gt;有下划线&lt;/el-link&gt;</code></pre>
            </div>
            <div class="help-text">控制下划线的显示</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">图标</div>
            <div class="prop-name">图标</div>
            <div class="code-block">
              <pre><code>&lt;el-link :icon="Edit"&gt;编辑&lt;/el-link&gt;
&lt;el-link :icon="View"&gt;查看&lt;/el-link&gt;</code></pre>
            </div>
            <div class="help-text">带图标的链接</div>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { Link, Edit, View, Download, Upload, Share, Delete } from '@element-plus/icons-vue'

const show = ref(false)

// 配置对象
const cfg = reactive({
  text: '这是一个链接',
  type: 'primary',
  href: 'https://element-plus.org',
  target: '_blank',
  underline: true,
  disabled: false,
  icon: 'Link'
})

// 计算属性
const iconComp = computed(() => {
  const iconMap = {
    'Link': Link,
    'Edit': Edit,
    'View': View,
    'Download': Download,
    'Upload': Upload,
    'Share': Share,
    'Delete': Delete
  }
  return iconMap[cfg.icon] || undefined
})

// 方法
const onClick = () => {
  if (!cfg.disabled) {
    ElMessage.success('链接被点击了！')
  }
}
</script>

<style scoped>
.demo-page { padding: 12px; }
.card-header { font-weight: 600; display: flex; justify-content: space-between; align-items: center; }
.link-preview { margin-bottom: 12px; }
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
