<template>
  <div class="demo-container">
    <div class="demo-header">
      <h2>评分 Rate</h2>
      <p>用于对事物进行评级操作，支持半星、自定义图标等</p>
    </div>

    <div class="demo-content">
      <el-card class="demo-card">
        <template #header>
          <div class="card-header">
            <span>基础用法</span>
            <el-button type="primary" @click="showSettings = true">属性设置</el-button>
          </div>
        </template>
        
        <div class="demo-section">
          <h4>评分演示</h4>
          <el-rate
            v-model="value"
            :max="cfg.max"
            :disabled="cfg.disabled"
            :allow-half="cfg.allowHalf"
            :low-threshold="cfg.lowThreshold"
            :high-threshold="cfg.highThreshold"
            :colors="cfg.colors"
            :void-color="cfg.voidColor"
            :disabled-void-color="cfg.disabledVoidColor"
            :icon-classes="cfg.iconClasses"
            :void-icon-class="cfg.voidIconClass"
            :disabled-void-icon-class="cfg.disabledVoidIconClass"
            :show-text="cfg.showText"
            :show-score="cfg.showScore"
            :text-color="cfg.textColor"
            :texts="cfg.texts"
            :score-template="cfg.scoreTemplate"
            @change="handleChange"
            @click="handleClick"
        />
        </div>

        <div class="demo-section">
          <h4>半星评分演示</h4>
          <el-rate
            v-model="halfValue"
            :max="5"
            allow-half
            show-text
            :texts="['极差', '失望', '一般', '满意', '惊喜']"
            @change="handleHalfChange"
        />
        </div>

        <div class="demo-section">
          <h4>自定义图标演示</h4>
          <el-rate
            v-model="customValue"
            :max="5"
            :icon-classes="['el-icon-star-on', 'el-icon-star-on', 'el-icon-star-on']"
            void-icon-class="el-icon-star-off"
            :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
            @change="handleCustomChange"
        />
        </div>

        <div class="demo-section">
          <h4>状态显示</h4>
          <p><strong>当前值：</strong>{{ value }}</p>
          <p><strong>半星值：</strong>{{ halfValue }}</p>
          <p><strong>自定义值：</strong>{{ customValue }}</p>
          <p><strong>最大值：</strong>{{ cfg.max }}</p>
          <p><strong>禁用：</strong>{{ cfg.disabled ? '是' : '否' }}</p>
          <p><strong>允许半星：</strong>{{ cfg.allowHalf ? '是' : '否' }}</p>
          <p><strong>低分阈值：</strong>{{ cfg.lowThreshold }}</p>
          <p><strong>高分阈值：</strong>{{ cfg.highThreshold }}</p>
          <p><strong>显示文字：</strong>{{ cfg.showText ? '是' : '否' }}</p>
          <p><strong>显示分数：</strong>{{ cfg.showScore ? '是' : '否' }}</p>
        </div>
      </el-card>
    </div>

    <!-- 属性设置抽屉 -->
    <el-drawer
      v-model="showSettings"
      title="评分属性设置"
      direction="rtl"
      size="45%"
    >
      <div class="settings-container">
        <!-- 基础属性 -->
        <div class="form-section">
          <div class="section-title">基础属性</div>
          
          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">max</span>
              <span class="help-text">最大值</span>
            </div>
            <el-input-number v-model="cfg.max" :min="1" :max="10" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">lowThreshold</span>
              <span class="help-text">低分阈值</span>
            </div>
            <el-input-number v-model="cfg.lowThreshold" :min="1" :max="10" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">highThreshold</span>
              <span class="help-text">高分阈值</span>
            </div>
            <el-input-number v-model="cfg.highThreshold" :min="1" :max="10" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">scoreTemplate</span>
              <span class="help-text">分数显示模板</span>
            </div>
            <el-input v-model="cfg.scoreTemplate" placeholder="如: { value } 分" />
          </div>
        </div>

        <!-- 状态属性 -->
        <div class="form-section">
          <div class="section-title">状态属性</div>
          
          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">disabled</span>
              <span class="help-text">是否禁用</span>
            </div>
            <el-switch v-model="cfg.disabled" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">allowHalf</span>
              <span class="help-text">是否允许半星</span>
            </div>
            <el-switch v-model="cfg.allowHalf" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">showText</span>
              <span class="help-text">是否显示文字</span>
            </div>
            <el-switch v-model="cfg.showText" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">showScore</span>
              <span class="help-text">是否显示分数</span>
            </div>
            <el-switch v-model="cfg.showScore" />
          </div>
        </div>

        <!-- 样式属性 -->
        <div class="form-section">
          <div class="section-title">样式属性</div>
          
          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">colors</span>
              <span class="help-text">颜色数组</span>
            </div>
            <div class="color-array">
              <el-color-picker v-for="(color, index) in cfg.colors" :key="index" v-model="cfg.colors[index]" />
              <el-button type="primary" size="small" @click="addColor">添加颜色</el-button>
              <el-button type="danger" size="small" @click="removeColor">删除颜色</el-button>
            </div>
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">voidColor</span>
              <span class="help-text">未选中颜色</span>
            </div>
            <el-color-picker v-model="cfg.voidColor" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">disabledVoidColor</span>
              <span class="help-text">禁用时未选中颜色</span>
            </div>
            <el-color-picker v-model="cfg.disabledVoidColor" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">textColor</span>
              <span class="help-text">文字颜色</span>
            </div>
            <el-color-picker v-model="cfg.textColor" />
          </div>
        </div>

        <!-- 图标属性 -->
        <div class="form-section">
          <div class="section-title">图标属性</div>
          
          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">iconClasses</span>
              <span class="help-text">图标类名数组</span>
            </div>
            <div class="icon-array">
              <el-input v-for="(icon, index) in cfg.iconClasses" :key="index" v-model="cfg.iconClasses[index]" placeholder="图标类名" />
              <el-button type="primary" size="small" @click="addIcon">添加图标</el-button>
              <el-button type="danger" size="small" @click="removeIcon">删除图标</el-button>
            </div>
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">voidIconClass</span>
              <span class="help-text">未选中图标类名</span>
            </div>
            <el-input v-model="cfg.voidIconClass" placeholder="如: el-icon-star-off" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">disabledVoidIconClass</span>
              <span class="help-text">禁用时未选中图标类名</span>
            </div>
            <el-input v-model="cfg.disabledVoidIconClass" placeholder="如: el-icon-star-off" />
          </div>
        </div>

        <!-- 文字属性 -->
        <div class="form-section">
          <div class="section-title">文字属性</div>
          
          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">texts</span>
              <span class="help-text">文字数组</span>
            </div>
            <div class="text-array">
              <el-input v-for="(text, index) in cfg.texts" :key="index" v-model="cfg.texts[index]" placeholder="文字内容" />
              <el-button type="primary" size="small" @click="addText">添加文字</el-button>
              <el-button type="danger" size="small" @click="removeText">删除文字</el-button>
            </div>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'

// 响应式数据
const showSettings = ref(false)
const value = ref(3)
const halfValue = ref(2.5)
const customValue = ref(4)

// 配置对象
const cfg = reactive({
  max: 5,
  disabled: false,
  allowHalf: false,
  lowThreshold: 2,
  highThreshold: 4,
  colors: ['#F7BA2A', '#F7BA2A', '#F7BA2A'],
  voidColor: '#C6D1DE',
  disabledVoidColor: '#C0C4CC',
  iconClasses: ['el-icon-star-on', 'el-icon-star-on', 'el-icon-star-on'],
  voidIconClass: 'el-icon-star-off',
  disabledVoidIconClass: 'el-icon-star-off',
  showText: false,
  showScore: false,
  textColor: '#1F2D3D',
  texts: ['极差', '失望', '一般', '满意', '惊喜'],
  scoreTemplate: '{ value } 分'
})

// 事件处理
const handleChange = (value) => {
  console.log('评分改变:', value)
  ElMessage.success(`评分: ${value} 星`)
}

const handleClick = (value) => {
  console.log('评分点击:', value)
}

const handleHalfChange = (value) => {
  console.log('半星评分改变:', value)
  ElMessage.success(`半星评分: ${value} 星`)
}

const handleCustomChange = (value) => {
  console.log('自定义评分改变:', value)
  ElMessage.success(`自定义评分: ${value} 星`)
}

// 颜色管理
const addColor = () => {
  cfg.colors.push('#F7BA2A')
}

const removeColor = () => {
  if (cfg.colors.length > 1) {
    cfg.colors.pop()
  }
}

// 图标管理
const addIcon = () => {
  cfg.iconClasses.push('el-icon-star-on')
}

const removeIcon = () => {
  if (cfg.iconClasses.length > 1) {
    cfg.iconClasses.pop()
  }
}

// 文字管理
const addText = () => {
  cfg.texts.push('新文字')
}

const removeText = () => {
  if (cfg.texts.length > 1) {
    cfg.texts.pop()
  }
}
</script>

<style scoped>
.demo-container {
  padding: 20px;
}

.demo-header {
  margin-bottom: 20px;
}

.demo-header h2 {
  margin: 0 0 10px 0;
  color: #303133;
}

.demo-header p {
  margin: 0;
  color: #606266;
  font-size: 14px;
}

.demo-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.demo-card {
  width: 100%;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.demo-section {
  margin-bottom: 20px;
}

.demo-section h4 {
  margin: 0 0 15px 0;
  color: #303133;
  font-size: 16px;
}

.demo-section p {
  margin: 5px 0;
  color: #606266;
  font-size: 14px;
}

.settings-container {
  padding: 20px;
}

.form-section {
  margin-bottom: 30px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #409eff;
}

.form-item {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
}

.label-text {
  min-width: 200px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.prop-name {
  font-weight: 600;
  color: #303133;
  font-family: 'Courier New', monospace;
  background: #e8f4fd;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 13px;
}

.help-text {
  color: #909399;
  font-size: 12px;
}

.color-array,
.icon-array,
.text-array {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.color-array {
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}

.icon-array,
.text-array {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
</style>
