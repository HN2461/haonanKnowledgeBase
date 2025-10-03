<template>
  <div class="demo-container">
    <div class="demo-header">
      <h2>分割线 Divider</h2>
      <p>用于分隔内容的水平线，支持文字、图标和自定义样式</p>
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
          <h4>分割线演示</h4>
          <div class="divider-content">
            <p>这是分割线上方的内容</p>
            <el-divider
              :direction="cfg.direction"
              :content-position="cfg.contentPosition"
              :border-style="cfg.borderStyle"
            >
              <span v-if="cfg.text">{{ cfg.text }}</span>
              <el-icon v-if="cfg.icon" class="divider-icon">
                <component :is="cfg.icon" />
              </el-icon>
            </el-divider>
            <p>这是分割线下方的内容</p>
          </div>
        </div>

        <div class="demo-section">
          <h4>不同方向演示</h4>
          <div class="divider-group">
            <div class="divider-item">
              <h4>水平分割线</h4>
              <p>上方内容</p>
              <el-divider direction="horizontal">水平分割线</el-divider>
              <p>下方内容</p>
            </div>
            <div class="divider-item">
              <h4>垂直分割线</h4>
              <div class="vertical-content">
                <span>左侧内容</span>
                <el-divider direction="vertical" />
                <span>右侧内容</span>
              </div>
            </div>
          </div>
        </div>

        <div class="demo-section">
          <h4>不同内容位置演示</h4>
          <div class="divider-group">
            <div class="divider-item">
              <h4>左对齐</h4>
              <p>上方内容</p>
              <el-divider content-position="left">左对齐</el-divider>
              <p>下方内容</p>
            </div>
            <div class="divider-item">
              <h4>居中</h4>
              <p>上方内容</p>
              <el-divider content-position="center">居中</el-divider>
              <p>下方内容</p>
            </div>
            <div class="divider-item">
              <h4>右对齐</h4>
              <p>上方内容</p>
              <el-divider content-position="right">右对齐</el-divider>
              <p>下方内容</p>
            </div>
          </div>
        </div>

        <div class="demo-section">
          <h4>不同边框样式演示</h4>
          <div class="divider-group">
            <div class="divider-item">
              <h4>实线</h4>
              <p>上方内容</p>
              <el-divider border-style="solid">实线</el-divider>
              <p>下方内容</p>
            </div>
            <div class="divider-item">
              <h4>虚线</h4>
              <p>上方内容</p>
              <el-divider border-style="dashed">虚线</el-divider>
              <p>下方内容</p>
            </div>
            <div class="divider-item">
              <h4>点线</h4>
              <p>上方内容</p>
              <el-divider border-style="dotted">点线</el-divider>
              <p>下方内容</p>
            </div>
          </div>
        </div>

        <div class="demo-section">
          <h4>带图标的分割线演示</h4>
          <div class="divider-group">
            <div class="divider-item">
              <h4>带图标</h4>
              <p>上方内容</p>
              <el-divider>
                <el-icon class="divider-icon">
                  <Star />
                </el-icon>
                带图标
              </el-divider>
              <p>下方内容</p>
            </div>
            <div class="divider-item">
              <h4>纯图标</h4>
              <p>上方内容</p>
              <el-divider>
                <el-icon class="divider-icon">
                  <Check />
                </el-icon>
              </el-divider>
              <p>下方内容</p>
            </div>
          </div>
        </div>

        <div class="demo-section">
          <h4>状态显示</h4>
          <p><strong>方向：</strong>{{ cfg.direction }}</p>
          <p><strong>内容位置：</strong>{{ cfg.contentPosition }}</p>
          <p><strong>边框样式：</strong>{{ cfg.borderStyle }}</p>
          <p><strong>文字内容：</strong>{{ cfg.text || '无' }}</p>
          <p><strong>图标：</strong>{{ cfg.icon || '无' }}</p>
        </div>
      </el-card>
    </div>

    <!-- 属性设置抽屉 -->
    <el-drawer
      v-model="showSettings"
      title="分割线属性设置"
      direction="rtl"
      size="45%"
    >
      <div class="settings-container">
        <!-- 基础属性 -->
        <div class="form-section">
          <div class="section-title">基础属性</div>
          
          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">direction</span>
              <span class="help-text">分割线方向</span>
            </div>
            <el-radio-group v-model="cfg.direction">
              <el-radio-button label="horizontal">horizontal</el-radio-button>
              <el-radio-button label="vertical">vertical</el-radio-button>
            </el-radio-group>
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">contentPosition</span>
              <span class="help-text">内容位置</span>
            </div>
            <el-radio-group v-model="cfg.contentPosition">
              <el-radio-button label="left">left</el-radio-button>
              <el-radio-button label="center">center</el-radio-button>
              <el-radio-button label="right">right</el-radio-button>
            </el-radio-group>
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">borderStyle</span>
              <span class="help-text">边框样式</span>
            </div>
            <el-radio-group v-model="cfg.borderStyle">
              <el-radio-button label="solid">solid</el-radio-button>
              <el-radio-button label="dashed">dashed</el-radio-button>
              <el-radio-button label="dotted">dotted</el-radio-button>
            </el-radio-group>
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">text</span>
              <span class="help-text">文字内容</span>
            </div>
            <el-input v-model="cfg.text" placeholder="请输入文字内容" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">icon</span>
              <span class="help-text">图标名称</span>
            </div>
            <el-input v-model="cfg.icon" placeholder="请输入图标名称" />
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { Star, Check } from '@element-plus/icons-vue'

// 响应式数据
const showSettings = ref(false)

// 配置对象
const cfg = reactive({
  direction: 'horizontal',
  contentPosition: 'center',
  borderStyle: 'solid',
  text: '分割线',
  icon: 'Star'
})

// 事件处理
const handleAction = () => {
  console.log('操作按钮点击')
  ElMessage.success('操作按钮点击')
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

.divider-content {
  padding: 20px;
  background: #f5f7fa;
  border-radius: 4px;
}

.divider-group {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.divider-item {
  padding: 20px;
  background: #fff;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
}

.divider-item h4 {
  margin: 0 0 15px 0;
  color: #303133;
  font-size: 14px;
}

.divider-item p {
  margin: 10px 0;
  color: #606266;
}

.vertical-content {
  display: flex;
  align-items: center;
  gap: 20px;
  height: 100px;
}

.divider-icon {
  margin: 0 5px;
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
</style>
