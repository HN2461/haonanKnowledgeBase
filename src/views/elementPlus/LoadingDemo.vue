<template>
  <div class="demo-page">
    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <span>Loading 加载</span>
          <el-button type="primary" @click="show = true">属性设置</el-button>
        </div>
      </template>
      
      <!-- 预览加载 -->
      <div class="loading-preview">
        <div class="loading-demo" v-loading="cfg.loading" :element-loading-text="cfg.elementLoadingText" :element-loading-spinner="cfg.elementLoadingSpinner" :element-loading-svg="cfg.elementLoadingSvg" :element-loading-svg-view-box="cfg.elementLoadingSvgViewBox" :element-loading-background="cfg.elementLoadingBackground" :element-loading-custom-class="cfg.elementLoadingCustomClass" :element-loading-percent="cfg.elementLoadingPercent" :element-loading-duration="cfg.elementLoadingDuration" :element-loading-lock="cfg.elementLoadingLock" :element-loading-fullscreen="cfg.elementLoadingFullscreen" :element-loading-target="cfg.elementLoadingTarget" :element-loading-body="cfg.elementLoadingBody" :element-loading-invisible="cfg.elementLoadingInvisible">
          <div class="loading-content">
            <h3>加载区域</h3>
            <p>这是一个带有加载效果的演示区域。</p>
            <p>你可以通过下面的设置来控制加载效果的各种属性。</p>
          </div>
        </div>
        
        <div class="loading-controls">
          <el-button @click="toggleLoading">切换加载状态</el-button>
          <el-button @click="showFullscreenLoading">全屏加载</el-button>
          <el-button @click="showServiceLoading">服务加载</el-button>
        </div>
      </div>
      
      <!-- 状态显示 -->
      <div class="status">
        <div>加载状态: {{ cfg.loading ? '加载中' : '未加载' }}</div>
        <div>加载文本: {{ cfg.elementLoadingText }}</div>
        <div>加载图标: {{ cfg.elementLoadingSpinner }}</div>
        <div>全屏模式: {{ cfg.elementLoadingFullscreen ? '是' : '否' }}</div>
      </div>
    </el-card>

    <el-drawer v-model="show" title="加载属性设置" size="45%">
      <div class="drawer-content">
        <el-alert type="info" show-icon :closable="false" style="margin-bottom: 20px;"
          description="提示：1) Loading 可以用于局部加载和全屏加载；2) 支持自定义加载图标和文本；3) 可以通过服务方式调用。" />
        
        <!-- 基础属性 -->
        <div class="section">
          <h4>基础属性</h4>
          
          <div class="form-item">
            <div class="label-text">加载状态</div>
            <div class="prop-name">loading</div>
            <el-switch v-model="cfg.loading" />
            <div class="help-text">是否显示加载状态</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">加载文本</div>
            <div class="prop-name">element-loading-text</div>
            <el-input v-model="cfg.elementLoadingText" placeholder="如 加载中..." style="width: 200px;" />
            <div class="help-text">加载时显示的文本</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">加载图标</div>
            <div class="prop-name">element-loading-spinner</div>
            <el-select v-model="cfg.elementLoadingSpinner" style="width: 200px;">
              <el-option label="默认" value="" />
              <el-option label="Loading" value="Loading" />
              <el-option label="Edit" value="Edit" />
              <el-option label="Check" value="Check" />
            </el-select>
            <div class="help-text">加载时显示的图标</div>
          </div>
        </div>
        
        <!-- 样式设置 -->
        <div class="section">
          <h4>样式设置</h4>
          
          <div class="form-item">
            <div class="label-text">背景色</div>
            <div class="prop-name">element-loading-background</div>
            <el-input v-model="cfg.elementLoadingBackground" placeholder="如 rgba(0, 0, 0, 0.8)" style="width: 200px;" />
            <div class="help-text">加载遮罩的背景色</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">自定义类名</div>
            <div class="prop-name">element-loading-custom-class</div>
            <el-input v-model="cfg.elementLoadingCustomClass" placeholder="如 custom-loading" style="width: 200px;" />
            <div class="help-text">加载遮罩的自定义类名</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">全屏模式</div>
            <div class="prop-name">element-loading-fullscreen</div>
            <el-switch v-model="cfg.elementLoadingFullscreen" />
            <div class="help-text">是否全屏显示加载</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">锁定滚动</div>
            <div class="prop-name">element-loading-lock</div>
            <el-switch v-model="cfg.elementLoadingLock" />
            <div class="help-text">是否锁定页面滚动</div>
          </div>
        </div>
        
        <!-- 高级设置 -->
        <div class="section">
          <h4>高级设置</h4>
          
          <div class="form-item">
            <div class="label-text">加载百分比</div>
            <div class="prop-name">element-loading-percent</div>
            <el-input-number v-model="cfg.elementLoadingPercent" :min="0" :max="100" />
            <div class="help-text">加载的百分比（0-100）</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">动画时长</div>
            <div class="prop-name">element-loading-duration</div>
            <el-input-number v-model="cfg.elementLoadingDuration" :min="100" :max="5000" />
            <div class="help-text">动画时长（毫秒）</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">目标元素</div>
            <div class="prop-name">element-loading-target</div>
            <el-input v-model="cfg.elementLoadingTarget" placeholder="如 .loading-target" style="width: 200px;" />
            <div class="help-text">加载的目标元素</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">挂载到 body</div>
            <div class="prop-name">element-loading-body</div>
            <el-switch v-model="cfg.elementLoadingBody" />
            <div class="help-text">是否挂载到 body 元素</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">不可见</div>
            <div class="prop-name">element-loading-invisible</div>
            <el-switch v-model="cfg.elementLoadingInvisible" />
            <div class="help-text">是否不可见</div>
          </div>
        </div>
        
        <!-- 使用说明 -->
        <div class="section">
          <h4>使用说明</h4>
          
          <div class="form-item">
            <div class="label-text">指令方式</div>
            <div class="prop-name">指令方式</div>
            <div class="code-block">
              <pre><code>&lt;div v-loading="loading"&gt;
  内容
&lt;/div&gt;</code></pre>
            </div>
            <div class="help-text">通过 v-loading 指令使用加载效果</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">服务方式</div>
            <div class="prop-name">服务方式</div>
            <div class="code-block">
              <pre><code>import { ElLoading } from 'element-plus'

const loading = ElLoading.service({
  lock: true,
  text: 'Loading',
  background: 'rgba(0, 0, 0, 0.7)'
})

// 关闭加载
loading.close()</code></pre>
            </div>
            <div class="help-text">通过 ElLoading.service 方法调用加载服务</div>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElLoading, ElMessage } from 'element-plus'

const show = ref(false)

// 配置对象
const cfg = reactive({
  loading: false,
  elementLoadingText: '加载中...',
  elementLoadingSpinner: '',
  elementLoadingSvg: '',
  elementLoadingSvgViewBox: '',
  elementLoadingBackground: '',
  elementLoadingCustomClass: '',
  elementLoadingPercent: 0,
  elementLoadingDuration: 300,
  elementLoadingLock: false,
  elementLoadingFullscreen: false,
  elementLoadingTarget: '',
  elementLoadingBody: false,
  elementLoadingInvisible: false
})

// 方法
const toggleLoading = () => {
  cfg.loading = !cfg.loading
  ElMessage.info(cfg.loading ? '开始加载' : '停止加载')
}

const showFullscreenLoading = () => {
  const loading = ElLoading.service({
    lock: true,
    text: '全屏加载中...',
    background: 'rgba(0, 0, 0, 0.7)'
  })
  
  setTimeout(() => {
    loading.close()
    ElMessage.success('全屏加载完成')
  }, 2000)
}

const showServiceLoading = () => {
  const loading = ElLoading.service({
    lock: true,
    text: '服务加载中...',
    background: 'rgba(0, 0, 0, 0.7)',
    customClass: 'custom-loading'
  })
  
  setTimeout(() => {
    loading.close()
    ElMessage.success('服务加载完成')
  }, 3000)
}
</script>

<style scoped>
.demo-page { padding: 12px; }
.card-header { font-weight: 600; display: flex; justify-content: space-between; align-items: center; }
.loading-preview { margin-bottom: 12px; }
.loading-demo { position: relative; min-height: 200px; border: 1px solid #dcdfe6; border-radius: 4px; padding: 20px; }
.loading-content { text-align: center; }
.loading-controls { display: flex; gap: 12px; margin-top: 12px; flex-wrap: wrap; }
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
