<template>
  <div class="demo-page">
    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <span>Alert 警告</span>
          <el-button type="primary" @click="show = true">属性设置</el-button>
        </div>
      </template>
      
      <!-- 预览警告 -->
      <div class="alert-preview">
        <el-alert
          :title="cfg.title"
          :type="cfg.type"
          :description="cfg.description"
          :closable="cfg.closable"
          :center="cfg.center"
          :close-text="cfg.closeText"
          :show-icon="cfg.showIcon"
          :effect="cfg.effect"
          @close="onClose"
        />
      </div>
      
      <!-- 状态显示 -->
      <div class="status">
        <div>警告类型: {{ cfg.type }}</div>
        <div>是否可关闭: {{ cfg.closable ? '是' : '否' }}</div>
        <div>是否居中: {{ cfg.center ? '是' : '否' }}</div>
        <div>是否显示图标: {{ cfg.showIcon ? '是' : '否' }}</div>
      </div>
    </el-card>

    <el-drawer v-model="show" title="警告属性设置" size="45%">
      <div class="drawer-content">
        <el-alert type="info" show-icon :closable="false" style="margin-bottom: 20px;"
          description="提示：1) Alert 用于页面中展示重要的提示信息；2) 支持多种类型和样式；3) 可以自定义内容和行为。" />
        
        <!-- 基础属性 -->
        <div class="section">
          <h4>基础属性</h4>
          
          <div class="form-item">
            <div class="label-text">标题</div>
            <div class="prop-name">title</div>
            <el-input v-model="cfg.title" placeholder="请输入标题" style="width: 200px;" />
            <div class="help-text">警告的标题</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">类型</div>
            <div class="prop-name">type</div>
            <el-radio-group v-model="cfg.type">
              <el-radio-button label="success">success</el-radio-button>
              <el-radio-button label="warning">warning</el-radio-button>
              <el-radio-button label="info">info</el-radio-button>
              <el-radio-button label="error">error</el-radio-button>
            </el-radio-group>
            <div class="help-text">警告的类型</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">描述</div>
            <div class="prop-name">description</div>
            <el-input v-model="cfg.description" type="textarea" :rows="3" placeholder="请输入描述" />
            <div class="help-text">警告的描述信息</div>
          </div>
        </div>
        
        <!-- 显示设置 -->
        <div class="section">
          <h4>显示设置</h4>
          
          <div class="form-item">
            <div class="label-text">可关闭</div>
            <div class="prop-name">closable</div>
            <el-switch v-model="cfg.closable" />
            <div class="help-text">是否显示关闭按钮</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">居中</div>
            <div class="prop-name">center</div>
            <el-switch v-model="cfg.center" />
            <div class="help-text">文字是否居中</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">显示图标</div>
            <div class="prop-name">show-icon</div>
            <el-switch v-model="cfg.showIcon" />
            <div class="help-text">是否显示类型图标</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">关闭按钮文字</div>
            <div class="prop-name">close-text</div>
            <el-input v-model="cfg.closeText" placeholder="如 知道了" style="width: 200px;" />
            <div class="help-text">自定义关闭按钮的文字</div>
          </div>
        </div>
        
        <!-- 样式设置 -->
        <div class="section">
          <h4>样式设置</h4>
          
          <div class="form-item">
            <div class="label-text">主题</div>
            <div class="prop-name">effect</div>
            <el-radio-group v-model="cfg.effect">
              <el-radio-button label="light">light</el-radio-button>
              <el-radio-button label="dark">dark</el-radio-button>
            </el-radio-group>
            <div class="help-text">警告的主题</div>
          </div>
        </div>
        
        <!-- 使用说明 -->
        <div class="section">
          <h4>使用说明</h4>
          
          <div class="form-item">
            <div class="label-text">基本用法</div>
            <div class="prop-name">基本用法</div>
            <div class="code-block">
              <pre><code>&lt;el-alert
  title="成功提示的文案"
  type="success"
  :closable="false"
  show-icon
/&gt;</code></pre>
            </div>
            <div class="help-text">Alert 组件的基本使用方式</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">带描述</div>
            <div class="prop-name">带描述</div>
            <div class="code-block">
              <pre><code>&lt;el-alert
  title="带辅助性文字介绍"
  type="info"
  :closable="false"
  show-icon
  description="这是一段描述文字"
/&gt;</code></pre>
            </div>
            <div class="help-text">带描述信息的警告</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">自定义关闭</div>
            <div class="prop-name">自定义关闭</div>
            <div class="code-block">
              <pre><code>&lt;el-alert
  title="不可关闭的 alert"
  type="success"
  :closable="false"
  show-icon
/&gt;

&lt;el-alert
  title="自定义 close-text"
  type="info"
  close-text="知道了"
  show-icon
/&gt;</code></pre>
            </div>
            <div class="help-text">自定义关闭按钮的警告</div>
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

// 配置对象
const cfg = reactive({
  title: '警告标题',
  type: 'success',
  description: '这是一条警告的描述信息，用于说明警告的详细内容。',
  closable: true,
  center: false,
  closeText: '',
  showIcon: true,
  effect: 'light'
})

// 方法
const onClose = () => {
  ElMessage.info('警告已关闭')
}
</script>

<style scoped>
.demo-page { padding: 12px; }
.card-header { font-weight: 600; display: flex; justify-content: space-between; align-items: center; }
.alert-preview { margin-bottom: 12px; }
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
