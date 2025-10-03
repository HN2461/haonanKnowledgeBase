<template>
  <div class="demo-page">
    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <span>Space 间距</span>
          <el-button type="primary" @click="show = true">属性设置</el-button>
        </div>
      </template>
      
      <!-- 预览间距 -->
      <div class="space-preview">
        <el-space
          :size="cfg.size"
          :direction="cfg.direction"
          :alignment="cfg.alignment"
          :wrap="cfg.wrap"
          :fill="cfg.fill"
          :fill-ratio="cfg.fillRatio"
        >
          <el-button>按钮 1</el-button>
          <el-button type="primary">按钮 2</el-button>
          <el-button type="success">按钮 3</el-button>
          <el-button type="warning">按钮 4</el-button>
          <el-button type="danger">按钮 5</el-button>
        </el-space>
      </div>
      
      <!-- 状态显示 -->
      <div class="status">
        <div>间距大小: {{ cfg.size }}</div>
        <div>排列方向: {{ cfg.direction }}</div>
        <div>对齐方式: {{ cfg.alignment }}</div>
        <div>是否换行: {{ cfg.wrap ? '是' : '否' }}</div>
      </div>
    </el-card>

    <el-drawer v-model="show" title="间距属性设置" size="45%">
      <div class="drawer-content">
        <el-alert type="info" show-icon :closable="false" style="margin-bottom: 20px;"
          description="提示：1) Space 用于设置子元素之间的间距；2) 支持水平和垂直方向；3) 可以控制对齐方式和换行。" />
        
        <!-- 基础属性 -->
        <div class="section">
          <h4>基础属性</h4>
          
          <div class="form-item">
            <div class="label-text">间距大小</div>
            <div class="prop-name">size</div>
            <el-radio-group v-model="cfg.size">
              <el-radio-button label="small">small</el-radio-button>
              <el-radio-button label="default">default</el-radio-button>
              <el-radio-button label="large">large</el-radio-button>
            </el-radio-group>
            <div class="help-text">子元素之间的间距大小</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">排列方向</div>
            <div class="prop-name">direction</div>
            <el-radio-group v-model="cfg.direction">
              <el-radio-button label="horizontal">horizontal（水平）</el-radio-button>
              <el-radio-button label="vertical">vertical（垂直）</el-radio-button>
            </el-radio-group>
            <div class="help-text">子元素的排列方向</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">对齐方式</div>
            <div class="prop-name">alignment</div>
            <el-select v-model="cfg.alignment" style="width: 200px;">
              <el-option label="start" value="start" />
              <el-option label="end" value="end" />
              <el-option label="center" value="center" />
              <el-option label="baseline" value="baseline" />
              <el-option label="stretch" value="stretch" />
            </el-select>
            <div class="help-text">子元素的对齐方式</div>
          </div>
        </div>
        
        <!-- 高级设置 -->
        <div class="section">
          <h4>高级设置</h4>
          
          <div class="form-item">
            <div class="label-text">是否换行</div>
            <div class="prop-name">wrap</div>
            <el-switch v-model="cfg.wrap" />
            <div class="help-text">是否自动换行</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">是否填充</div>
            <div class="prop-name">fill</div>
            <el-switch v-model="cfg.fill" />
            <div class="help-text">是否填充父容器</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">填充比例</div>
            <div class="prop-name">fill-ratio</div>
            <el-input-number v-model="cfg.fillRatio" :min="0" :max="1" :step="0.1" />
            <div class="help-text">填充的比例（0-1）</div>
          </div>
        </div>
        
        <!-- 使用说明 -->
        <div class="section">
          <h4>使用说明</h4>
          
          <div class="form-item">
            <div class="label-text">基本用法</div>
            <div class="prop-name">基本用法</div>
            <div class="code-block">
              <pre><code>&lt;el-space&gt;
  &lt;el-button&gt;按钮 1&lt;/el-button&gt;
  &lt;el-button&gt;按钮 2&lt;/el-button&gt;
  &lt;el-button&gt;按钮 3&lt;/el-button&gt;
&lt;/el-space&gt;</code></pre>
            </div>
            <div class="help-text">Space 组件的基本使用方式</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">垂直排列</div>
            <div class="prop-name">垂直排列</div>
            <div class="code-block">
              <pre><code>&lt;el-space direction="vertical"&gt;
  &lt;el-button&gt;按钮 1&lt;/el-button&gt;
  &lt;el-button&gt;按钮 2&lt;/el-button&gt;
  &lt;el-button&gt;按钮 3&lt;/el-button&gt;
&lt;/el-space&gt;</code></pre>
            </div>
            <div class="help-text">垂直排列的子元素</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">自定义大小</div>
            <div class="prop-name">自定义大小</div>
            <div class="code-block">
              <pre><code>&lt;el-space :size="20"&gt;
  &lt;el-button&gt;按钮 1&lt;/el-button&gt;
  &lt;el-button&gt;按钮 2&lt;/el-button&gt;
&lt;/el-space&gt;</code></pre>
            </div>
            <div class="help-text">自定义间距大小</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">换行显示</div>
            <div class="prop-name">换行显示</div>
            <div class="code-block">
              <pre><code>&lt;el-space wrap&gt;
  &lt;el-button&gt;按钮 1&lt;/el-button&gt;
  &lt;el-button&gt;按钮 2&lt;/el-button&gt;
  &lt;el-button&gt;按钮 3&lt;/el-button&gt;
  &lt;el-button&gt;按钮 4&lt;/el-button&gt;
&lt;/el-space&gt;</code></pre>
            </div>
            <div class="help-text">自动换行的间距</div>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const show = ref(false)

// 配置对象
const cfg = reactive({
  size: 'default',
  direction: 'horizontal',
  alignment: 'center',
  wrap: false,
  fill: false,
  fillRatio: 0.5
})
</script>

<style scoped>
.demo-page { padding: 12px; }
.card-header { font-weight: 600; display: flex; justify-content: space-between; align-items: center; }
.space-preview { margin-bottom: 12px; min-height: 60px; display: flex; align-items: center; }
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
