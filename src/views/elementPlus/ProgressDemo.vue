<template>
  <div class="demo-page">
    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <span>Progress 进度条</span>
          <el-button type="primary" @click="show = true">属性设置</el-button>
        </div>
      </template>
      
      <!-- 预览进度条 -->
      <div class="progress-preview">
        <el-progress
          :percentage="cfg.percentage"
          :type="cfg.type"
          :stroke-width="cfg.strokeWidth"
          :text-inside="cfg.textInside"
          :status="cfg.status"
          :color="cfg.color || undefined"
          :format="formatFn"
          :show-text="cfg.showText"
          :stroke-linecap="cfg.strokeLinecap"
          :success-color="cfg.successColor"
          :warning-color="cfg.warningColor"
          :danger-color="cfg.dangerColor"
          :info-color="cfg.infoColor"
          :indeterminate="cfg.indeterminate"
          :duration="cfg.duration"
          :striped="cfg.striped"
          :striped-flow="cfg.stripedFlow"
          :text-color="cfg.textColor"
          :width="cfg.width"
          :height="cfg.height"
          :is-dashboard="cfg.isDashboard"
          :gap-degree="cfg.gapDegree"
          :gap-position="cfg.gapPosition"
          :track-color="cfg.trackColor"
          :show-percentage="cfg.showPercentage"
          :percentage-text-size="cfg.percentageTextSize"
          :format-text="cfg.formatText ? formatTextFn : undefined"
        />
      </div>
      
      <!-- 控制按钮 -->
      <div class="controls">
        <el-button @click="startProgress">开始进度</el-button>
        <el-button @click="resetProgress">重置进度</el-button>
        <el-button @click="randomProgress">随机进度</el-button>
      </div>
      
      <!-- 状态显示 -->
      <div class="status">
        <div>当前进度: {{ cfg.percentage }}%</div>
        <div>进度条类型: {{ cfg.type }}</div>
        <div>状态: {{ cfg.status || 'normal' }}</div>
        <div>是否显示文字: {{ cfg.showText ? '是' : '否' }}</div>
      </div>
    </el-card>

    <el-drawer v-model="show" title="进度条属性设置" size="45%">
      <div class="drawer-content">
        <el-alert type="info" show-icon :closable="false" style="margin-bottom: 20px;"
          description="提示：1) 进度条支持多种类型和状态；2) 可以自定义颜色和样式；3) 支持动画效果和条纹效果。" />
        
        <!-- 基础属性 -->
        <div class="section">
          <h4>基础属性</h4>
          
          <div class="form-item">
            <div class="label-text">进度百分比</div>
            <div class="prop-name">percentage</div>
            <el-slider v-model="cfg.percentage" :min="0" :max="100" />
            <div class="help-text">进度百分比，取值范围 0-100</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">进度条类型</div>
            <div class="prop-name">type</div>
            <el-radio-group v-model="cfg.type">
              <el-radio-button label="line">line（直线）</el-radio-button>
              <el-radio-button label="circle">circle（圆形）</el-radio-button>
              <el-radio-button label="dashboard">dashboard（仪表盘）</el-radio-button>
            </el-radio-group>
            <div class="help-text">进度条的类型</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">状态</div>
            <div class="prop-name">status</div>
            <el-select v-model="cfg.status" style="width: 200px;">
              <el-option label="normal" value="" />
              <el-option label="success" value="success" />
              <el-option label="warning" value="warning" />
              <el-option label="exception" value="exception" />
            </el-select>
            <div class="help-text">进度条的状态</div>
          </div>
        </div>
        
        <!-- 样式设置 -->
        <div class="section">
          <h4>样式设置</h4>
          
          <div class="form-item">
            <div class="label-text">进度条宽度</div>
            <div class="prop-name">stroke-width</div>
            <el-input-number v-model="cfg.strokeWidth" :min="1" :max="20" />
            <div class="help-text">进度条的宽度（仅 line 类型有效）</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">文字内显</div>
            <div class="prop-name">text-inside</div>
            <el-switch v-model="cfg.textInside" />
            <div class="help-text">进度条文字是否显示在内部（仅 line 类型有效）</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">显示文字</div>
            <div class="prop-name">show-text</div>
            <el-switch v-model="cfg.showText" />
            <div class="help-text">是否显示进度条文字</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">自定义颜色</div>
            <div class="prop-name">color</div>
            <el-input v-model="cfg.color" placeholder="如 #409eff" style="width: 200px;" />
            <div class="help-text">进度条的颜色</div>
          </div>
        </div>
        
        <!-- 圆形进度条设置 -->
        <div class="section">
          <h4>圆形进度条设置</h4>
          
          <div class="form-item">
            <div class="label-text">宽度</div>
            <div class="prop-name">width</div>
            <el-input-number v-model="cfg.width" :min="50" :max="200" />
            <div class="help-text">圆形进度条的宽度（仅 circle 和 dashboard 类型有效）</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">高度</div>
            <div class="prop-name">height</div>
            <el-input-number v-model="cfg.height" :min="50" :max="200" />
            <div class="help-text">圆形进度条的高度（仅 circle 和 dashboard 类型有效）</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">仪表盘</div>
            <div class="prop-name">is-dashboard</div>
            <el-switch v-model="cfg.isDashboard" />
            <div class="help-text">是否为仪表盘模式（仅 circle 类型有效）</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">缺口角度</div>
            <div class="prop-name">gap-degree</div>
            <el-input-number v-model="cfg.gapDegree" :min="0" :max="360" />
            <div class="help-text">仪表盘缺口角度（仅 dashboard 类型有效）</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">缺口位置</div>
            <div class="prop-name">gap-position</div>
            <el-select v-model="cfg.gapPosition" style="width: 200px;">
              <el-option label="top" value="top" />
              <el-option label="bottom" value="bottom" />
              <el-option label="left" value="left" />
              <el-option label="right" value="right" />
            </el-select>
            <div class="help-text">仪表盘缺口位置（仅 dashboard 类型有效）</div>
          </div>
        </div>
        
        <!-- 动画设置 -->
        <div class="section">
          <h4>动画设置</h4>
          
          <div class="form-item">
            <div class="label-text">不确定进度</div>
            <div class="prop-name">indeterminate</div>
            <el-switch v-model="cfg.indeterminate" />
            <div class="help-text">是否为不确定进度</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">动画时长</div>
            <div class="prop-name">duration</div>
            <el-input-number v-model="cfg.duration" :min="100" :max="5000" />
            <div class="help-text">动画时长（毫秒）</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">条纹效果</div>
            <div class="prop-name">striped</div>
            <el-switch v-model="cfg.striped" />
            <div class="help-text">是否显示条纹效果</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">流动条纹</div>
            <div class="prop-name">striped-flow</div>
            <el-switch v-model="cfg.stripedFlow" />
            <div class="help-text">条纹是否流动</div>
          </div>
        </div>
        
        <!-- 颜色设置 -->
        <div class="section">
          <h4>颜色设置</h4>
          
          <div class="form-item">
            <div class="label-text">成功颜色</div>
            <div class="prop-name">success-color</div>
            <el-input v-model="cfg.successColor" placeholder="如 #67c23a" style="width: 200px;" />
            <div class="help-text">成功状态的颜色</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">警告颜色</div>
            <div class="prop-name">warning-color</div>
            <el-input v-model="cfg.warningColor" placeholder="如 #e6a23c" style="width: 200px;" />
            <div class="help-text">警告状态的颜色</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">危险颜色</div>
            <div class="prop-name">danger-color</div>
            <el-input v-model="cfg.dangerColor" placeholder="如 #f56c6c" style="width: 200px;" />
            <div class="help-text">危险状态的颜色</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">信息颜色</div>
            <div class="prop-name">info-color</div>
            <el-input v-model="cfg.infoColor" placeholder="如 #909399" style="width: 200px;" />
            <div class="help-text">信息状态的颜色</div>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { ElMessage } from 'element-plus'

const show = ref(false)

// 配置对象
const cfg = reactive({
  percentage: 50,
  type: 'line',
  strokeWidth: 6,
  textInside: false,
  status: '',
  color: '',
  showText: true,
  strokeLinecap: 'round',
  successColor: '#67c23a',
  warningColor: '#e6a23c',
  dangerColor: '#f56c6c',
  infoColor: '#909399',
  indeterminate: false,
  duration: 3000,
  striped: false,
  stripedFlow: false,
  textColor: '',
  width: 126,
  height: 126,
  isDashboard: false,
  gapDegree: 75,
  gapPosition: 'bottom',
  trackColor: '#f5f7fa',
  showPercentage: true,
  percentageTextSize: 16,
  formatText: false
})

// 计算属性
const formatFn = computed(() => {
  if (cfg.formatText) {
    return formatTextFn
  }
  return undefined
})

// 方法
const formatTextFn = (percentage) => {
  return `${percentage}% 完成`
}

const startProgress = () => {
  let progress = 0
  const timer = setInterval(() => {
    progress += 10
    cfg.percentage = progress
    if (progress >= 100) {
      clearInterval(timer)
      ElMessage.success('进度完成！')
    }
  }, 200)
}

const resetProgress = () => {
  cfg.percentage = 0
  ElMessage.info('进度已重置')
}

const randomProgress = () => {
  cfg.percentage = Math.floor(Math.random() * 101)
  ElMessage.info(`随机进度: ${cfg.percentage}%`)
}
</script>

<style scoped>
.demo-page { padding: 12px; }
.card-header { font-weight: 600; display: flex; justify-content: space-between; align-items: center; }
.progress-preview { margin-bottom: 12px; }
.controls { display: flex; gap: 12px; margin-bottom: 12px; }
.status { margin: 12px 0; padding: 8px; background: #f5f7fa; border-radius: 4px; font-size: 12px; }

.drawer-content { padding: 0 8px; }
.section { margin-bottom: 24px; padding: 20px; background: #fafafa; border-radius: 8px; }
.section h4 { margin: 0 0 20px 0; font-size: 16px; font-weight: 600; color: #303133; border-bottom: 2px solid #e4e7ed; padding-bottom: 8px; }

.form-item { margin-bottom: 24px; padding: 16px; background: #fff; border-radius: 6px; border: 1px solid #e4e7ed; }
.label-text { font-size: 14px; font-weight: 600; color: #303133; margin-bottom: 4px; }
.prop-name { font-size: 12px; color: #409eff; background: #ecf5ff; padding: 2px 6px; border-radius: 3px; display: inline-block; margin-bottom: 12px; font-family: 'Courier New', monospace; }
.help-text { font-size: 12px; color: #909399; margin-top: 8px; line-height: 1.4; }
</style>
