<template>
  <div class="demo-page">
    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <span>ButtonGroup 按钮组</span>
          <el-button type="primary" @click="show = true">属性设置</el-button>
        </div>
      </template>
      
      <!-- 预览按钮组 -->
      <div class="row">
        <el-button-group :size="cfg.size" :type="cfg.type">
          <el-button :type="cfg.type">上一页</el-button>
          <el-button :type="cfg.type">下一页</el-button>
          <el-button :type="cfg.type">更多</el-button>
        </el-button-group>
      </div>
      
      <div class="row">
        <el-button-group>
          <el-button>默认</el-button>
          <el-button type="primary">主要</el-button>
          <el-button type="success">成功</el-button>
        </el-button-group>
      </div>
      
      <div class="row">
        <el-button-group>
          <el-button type="primary" :icon="Edit">编辑</el-button>
          <el-button type="success" :icon="Check">确认</el-button>
          <el-button type="danger" :icon="Delete">删除</el-button>
        </el-button-group>
      </div>
      
      <!-- 状态显示 -->
      <div class="status">
        <div>按钮组尺寸: {{ cfg.size }}</div>
        <div>按钮组类型: {{ cfg.type || 'default' }}</div>
        <div>按钮数量: 3</div>
      </div>
    </el-card>

    <el-drawer v-model="show" title="按钮组属性设置" size="45%">
      <div class="drawer-content">
        <el-alert type="info" show-icon :closable="false" style="margin-bottom: 20px;"
          description="提示：1) 按钮组用于将多个按钮组合在一起；2) 按钮组内的按钮会自动调整样式；3) 按钮组支持所有按钮的属性。" />
        
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
            <div class="help-text">用于控制该按钮组内按钮的大小</div>
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
            <div class="help-text">用于控制该按钮组内按钮的类型</div>
          </div>
        </div>
        
        <!-- 使用说明 -->
        <div class="section">
          <h4>使用说明</h4>
          
          <div class="form-item">
            <div class="label-text">基本用法</div>
            <div class="prop-name">基本用法</div>
            <div class="code-block">
              <pre><code>&lt;el-button-group&gt;
  &lt;el-button&gt;按钮1&lt;/el-button&gt;
  &lt;el-button&gt;按钮2&lt;/el-button&gt;
  &lt;el-button&gt;按钮3&lt;/el-button&gt;
&lt;/el-button-group&gt;</code></pre>
            </div>
            <div class="help-text">将多个按钮放在 el-button-group 标签内</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">带属性</div>
            <div class="prop-name">带属性</div>
            <div class="code-block">
              <pre><code>&lt;el-button-group :size="size" :type="type"&gt;
  &lt;el-button&gt;按钮1&lt;/el-button&gt;
  &lt;el-button&gt;按钮2&lt;/el-button&gt;
  &lt;el-button&gt;按钮3&lt;/el-button&gt;
&lt;/el-button-group&gt;</code></pre>
            </div>
            <div class="help-text">按钮组可以设置 size 和 type 属性，会影响组内所有按钮</div>
          </div>
        </div>
        
        <!-- 注意事项 -->
        <div class="section">
          <h4>注意事项</h4>
          
          <div class="form-item">
            <div class="label-text">样式说明</div>
            <div class="prop-name">样式说明</div>
            <div class="help-text">
              • 按钮组内的按钮会自动调整边框样式，第一个按钮只有右边框，最后一个按钮只有左边框<br/>
              • 按钮组内的按钮会紧密连接，没有间距<br/>
              • 按钮组支持所有 el-button 的属性，如 disabled、loading 等<br/>
              • 按钮组主要用于操作按钮的组合，如分页、工具栏等场景
            </div>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { Edit, Check, Delete } from '@element-plus/icons-vue'

const show = ref(false)
const cfg = reactive({ 
  size: 'default', 
  type: '' 
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