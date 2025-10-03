<template>
  <div class="demo-page">
    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <span>Text 文本</span>
          <el-button type="primary" @click="show = true">属性设置</el-button>
        </div>
      </template>
      
      <!-- 预览文本 -->
      <div class="text-preview">
        <el-text
          :type="cfg.type"
          :size="cfg.size"
          :truncated="cfg.truncated"
          :tag="cfg.tag"
          :effect="cfg.effect"
        >
          {{ cfg.content }}
        </el-text>
      </div>
      
      <!-- 状态显示 -->
      <div class="status">
        <div>文本类型: {{ cfg.type }}</div>
        <div>文本大小: {{ cfg.size }}</div>
        <div>是否截断: {{ cfg.truncated ? '是' : '否' }}</div>
        <div>标签类型: {{ cfg.tag }}</div>
      </div>
    </el-card>

    <el-drawer v-model="show" title="文本属性设置" size="45%">
      <div class="drawer-content">
        <el-alert type="info" show-icon :closable="false" style="margin-bottom: 20px;"
          description="提示：1) Text 用于文本的显示和样式控制；2) 支持多种类型和大小；3) 可以自定义标签和效果。" />
        
        <!-- 基础属性 -->
        <div class="section">
          <h4>基础属性</h4>
          
          <div class="form-item">
            <div class="label-text">文本内容</div>
            <div class="prop-name">content</div>
            <el-input v-model="cfg.content" type="textarea" :rows="3" placeholder="请输入文本内容" />
            <div class="help-text">文本显示的内容</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">文本类型</div>
            <div class="prop-name">type</div>
            <el-radio-group v-model="cfg.type">
              <el-radio-button label="primary">primary</el-radio-button>
              <el-radio-button label="success">success</el-radio-button>
              <el-radio-button label="warning">warning</el-radio-button>
              <el-radio-button label="danger">danger</el-radio-button>
              <el-radio-button label="info">info</el-radio-button>
            </el-radio-group>
            <div class="help-text">文本的类型</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">文本大小</div>
            <div class="prop-name">size</div>
            <el-radio-group v-model="cfg.size">
              <el-radio-button label="large">large</el-radio-button>
              <el-radio-button label="default">default</el-radio-button>
              <el-radio-button label="small">small</el-radio-button>
            </el-radio-group>
            <div class="help-text">文本的大小</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">标签类型</div>
            <div class="prop-name">tag</div>
            <el-select v-model="cfg.tag" style="width: 200px;">
              <el-option label="span" value="span" />
              <el-option label="p" value="p" />
              <el-option label="div" value="div" />
              <el-option label="h1" value="h1" />
              <el-option label="h2" value="h2" />
              <el-option label="h3" value="h3" />
              <el-option label="h4" value="h4" />
              <el-option label="h5" value="h5" />
              <el-option label="h6" value="h6" />
              <el-option label="strong" value="strong" />
              <el-option label="em" value="em" />
              <el-option label="code" value="code" />
            </el-select>
            <div class="help-text">文本的 HTML 标签类型</div>
          </div>
        </div>
        
        <!-- 显示设置 -->
        <div class="section">
          <h4>显示设置</h4>
          
          <div class="form-item">
            <div class="label-text">文本截断</div>
            <div class="prop-name">truncated</div>
            <el-switch v-model="cfg.truncated" />
            <div class="help-text">是否截断过长的文本</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">文本效果</div>
            <div class="prop-name">effect</div>
            <el-radio-group v-model="cfg.effect">
              <el-radio-button label="light">light</el-radio-button>
              <el-radio-button label="dark">dark</el-radio-button>
            </el-radio-group>
            <div class="help-text">文本的效果</div>
          </div>
        </div>
        
        <!-- 使用说明 -->
        <div class="section">
          <h4>使用说明</h4>
          
          <div class="form-item">
            <div class="label-text">基本用法</div>
            <div class="prop-name">基本用法</div>
            <div class="code-block">
              <pre><code>&lt;el-text&gt;默认文本&lt;/el-text&gt;
&lt;el-text type="primary"&gt;主要文本&lt;/el-text&gt;
&lt;el-text type="success"&gt;成功文本&lt;/el-text&gt;
&lt;el-text type="warning"&gt;警告文本&lt;/el-text&gt;
&lt;el-text type="danger"&gt;危险文本&lt;/el-text&gt;
&lt;el-text type="info"&gt;信息文本&lt;/el-text&gt;</code></pre>
            </div>
            <div class="help-text">Text 组件的基本使用方式</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">不同大小</div>
            <div class="prop-name">不同大小</div>
            <div class="code-block">
              <pre><code>&lt;el-text size="large"&gt;大号文本&lt;/el-text&gt;
&lt;el-text size="default"&gt;默认文本&lt;/el-text&gt;
&lt;el-text size="small"&gt;小号文本&lt;/el-text&gt;</code></pre>
            </div>
            <div class="help-text">不同大小的文本</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">文本截断</div>
            <div class="prop-name">文本截断</div>
            <div class="code-block">
              <pre><code>&lt;el-text truncated&gt;这是一段很长的文本，会被截断显示&lt;/el-text&gt;</code></pre>
            </div>
            <div class="help-text">截断过长的文本</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">自定义标签</div>
            <div class="prop-name">自定义标签</div>
            <div class="code-block">
              <pre><code>&lt;el-text tag="h1"&gt;标题文本&lt;/el-text&gt;
&lt;el-text tag="strong"&gt;粗体文本&lt;/el-text&gt;
&lt;el-text tag="code"&gt;代码文本&lt;/el-text&gt;</code></pre>
            </div>
            <div class="help-text">使用不同的 HTML 标签</div>
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
  content: '这是一段文本内容，用于演示 Text 组件的各种属性和效果。',
  type: 'primary',
  size: 'default',
  truncated: false,
  tag: 'span',
  effect: 'light'
})
</script>

<style scoped>
.demo-page { padding: 12px; }
.card-header { font-weight: 600; display: flex; justify-content: space-between; align-items: center; }
.text-preview { margin-bottom: 12px; min-height: 40px; display: flex; align-items: center; }
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
