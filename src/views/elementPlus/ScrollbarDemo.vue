<template>
  <div class="demo-page">
    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <span>Scrollbar 滚动条</span>
          <el-button type="primary" @click="show = true">属性设置</el-button>
        </div>
      </template>
      
      <!-- 预览滚动条 -->
      <div class="scrollbar-preview">
        <el-scrollbar
          :height="cfg.height"
          :max-height="cfg.maxHeight"
          :always="cfg.always"
          :wrap-style="cfg.wrapStyle"
          :wrap-class="cfg.wrapClass"
          :view-style="cfg.viewStyle"
          :view-class="cfg.viewClass"
          :noresize="cfg.noresize"
          :tag="cfg.tag"
          @scroll="onScroll"
        >
          <div class="scrollbar-content">
            <div v-for="i in 50" :key="i" class="scrollbar-item">
              <el-card shadow="hover" style="margin-bottom: 12px;">
                <h4>内容项 {{ i }}</h4>
                <p>这是第 {{ i }} 个内容项，用于演示滚动条的效果。滚动条可以帮助用户在有限的空间内浏览大量内容。</p>
                <p>当前滚动条配置：高度 {{ cfg.height }}，最大高度 {{ cfg.maxHeight }}，总是显示 {{ cfg.always ? '是' : '否' }}。</p>
              </el-card>
            </div>
          </div>
        </el-scrollbar>
      </div>
      
      <!-- 状态显示 -->
      <div class="status">
        <div>滚动条高度: {{ cfg.height }}</div>
        <div>最大高度: {{ cfg.maxHeight }}</div>
        <div>总是显示: {{ cfg.always ? '是' : '否' }}</div>
        <div>标签类型: {{ cfg.tag }}</div>
      </div>
    </el-card>

    <el-drawer v-model="show" title="滚动条属性设置" size="45%">
      <div class="drawer-content">
        <el-alert type="info" show-icon :closable="false" style="margin-bottom: 20px;"
          description="提示：1) Scrollbar 用于创建自定义滚动条；2) 支持多种样式和配置；3) 可以监听滚动事件。" />
        
        <!-- 基础属性 -->
        <div class="section">
          <h4>基础属性</h4>
          
          <div class="form-item">
            <div class="label-text">滚动条高度</div>
            <div class="prop-name">height</div>
            <el-input v-model="cfg.height" placeholder="如 300px" style="width: 200px;" />
            <div class="help-text">滚动条的高度</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">最大高度</div>
            <div class="prop-name">max-height</div>
            <el-input v-model="cfg.maxHeight" placeholder="如 400px" style="width: 200px;" />
            <div class="help-text">滚动条的最大高度</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">总是显示</div>
            <div class="prop-name">always</div>
            <el-switch v-model="cfg.always" />
            <div class="help-text">是否总是显示滚动条</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">标签类型</div>
            <div class="prop-name">tag</div>
            <el-select v-model="cfg.tag" style="width: 200px;">
              <el-option label="div" value="div" />
              <el-option label="section" value="section" />
              <el-option label="article" value="article" />
              <el-option label="aside" value="aside" />
              <el-option label="main" value="main" />
            </el-select>
            <div class="help-text">滚动条容器的标签类型</div>
          </div>
        </div>
        
        <!-- 样式设置 -->
        <div class="section">
          <h4>样式设置</h4>
          
          <div class="form-item">
            <div class="label-text">包装器样式</div>
            <div class="prop-name">wrap-style</div>
            <el-input v-model="cfg.wrapStyle" placeholder='如 {"border":"1px solid #ccc"}' style="width: 200px;" />
            <div class="help-text">滚动条包装器的样式</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">包装器类名</div>
            <div class="prop-name">wrap-class</div>
            <el-input v-model="cfg.wrapClass" placeholder="如 custom-scrollbar" style="width: 200px;" />
            <div class="help-text">滚动条包装器的类名</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">视图样式</div>
            <div class="prop-name">view-style</div>
            <el-input v-model="cfg.viewStyle" placeholder='如 {"padding":"10px"}' style="width: 200px;" />
            <div class="help-text">滚动条视图的样式</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">视图类名</div>
            <div class="prop-name">view-class</div>
            <el-input v-model="cfg.viewClass" placeholder="如 custom-view" style="width: 200px;" />
            <div class="help-text">滚动条视图的类名</div>
          </div>
        </div>
        
        <!-- 高级设置 -->
        <div class="section">
          <h4>高级设置</h4>
          
          <div class="form-item">
            <div class="label-text">不可调整大小</div>
            <div class="prop-name">noresize</div>
            <el-switch v-model="cfg.noresize" />
            <div class="help-text">是否不可调整大小</div>
          </div>
        </div>
        
        <!-- 使用说明 -->
        <div class="section">
          <h4>使用说明</h4>
          
          <div class="form-item">
            <div class="label-text">基本用法</div>
            <div class="prop-name">基本用法</div>
            <div class="code-block">
              <pre><code>&lt;el-scrollbar height="400px"&gt;
  &lt;div v-for="item in list" :key="item.id"&gt;
    {{ item.content }}
  &lt;/div&gt;
&lt;/el-scrollbar&gt;</code></pre>
            </div>
            <div class="help-text">Scrollbar 组件的基本使用方式</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">自定义样式</div>
            <div class="prop-name">自定义样式</div>
            <div class="code-block">
              <pre><code>&lt;el-scrollbar 
  height="400px" 
  wrap-class="custom-scrollbar"
  view-class="custom-view"
&gt;
  &lt;div&gt;内容&lt;/div&gt;
&lt;/el-scrollbar&gt;</code></pre>
            </div>
            <div class="help-text">自定义滚动条的样式</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">监听滚动</div>
            <div class="prop-name">监听滚动</div>
            <div class="code-block">
              <pre><code>&lt;el-scrollbar @scroll="handleScroll"&gt;
  &lt;div&gt;内容&lt;/div&gt;
&lt;/el-scrollbar&gt;

const handleScroll = ({ scrollTop, scrollLeft }) => {
  console.log('滚动位置:', scrollTop, scrollLeft)
}</code></pre>
            </div>
            <div class="help-text">监听滚动事件</div>
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
  height: '300px',
  maxHeight: '400px',
  always: false,
  wrapStyle: '',
  wrapClass: '',
  viewStyle: '',
  viewClass: '',
  noresize: false,
  tag: 'div'
})

// 方法
const onScroll = ({ scrollTop, scrollLeft }) => {
  console.log('滚动位置:', scrollTop, scrollLeft)
  ElMessage.info(`滚动位置: ${scrollTop}px`)
}
</script>

<style scoped>
.demo-page { padding: 12px; }
.card-header { font-weight: 600; display: flex; justify-content: space-between; align-items: center; }
.scrollbar-preview { margin-bottom: 12px; }
.scrollbar-content { padding: 12px; }
.scrollbar-item { margin-bottom: 12px; }
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
