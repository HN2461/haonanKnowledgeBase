<template>
  <div class="demo-container">
    <div class="demo-header">
      <h2>栅格布局 Layout</h2>
      <p>基于 24 栅格系统，通过 el-row 和 el-col 组件实现响应式布局</p>
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
          <h4>基础栅格布局</h4>
          <el-row :gutter="cfg.gutter" :justify="cfg.justify" :align="cfg.align">
            <el-col :span="cfg.col1" :offset="cfg.offset1">
              <div class="grid-content">col-{{ cfg.col1 }}</div>
            </el-col>
            <el-col :span="cfg.col2" :offset="cfg.offset2">
              <div class="grid-content">col-{{ cfg.col2 }}</div>
            </el-col>
            <el-col :span="cfg.col3" :offset="cfg.offset3">
              <div class="grid-content">col-{{ cfg.col3 }}</div>
            </el-col>
          </el-row>
        </div>

        <div class="demo-section">
          <h4>响应式布局</h4>
          <el-row :gutter="20">
            <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
              <div class="grid-content">响应式列</div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
              <div class="grid-content">响应式列</div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
              <div class="grid-content">响应式列</div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
              <div class="grid-content">响应式列</div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
              <div class="grid-content">响应式列</div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
              <div class="grid-content">响应式列</div>
            </el-col>
          </el-row>
        </div>

        <div class="demo-section">
          <h4>对齐方式演示</h4>
          <div class="alignment-demo">
            <div class="alignment-item">
              <h5>左对齐 (start)</h5>
              <el-row justify="start" :gutter="10">
                <el-col :span="6"><div class="grid-content">col-6</div></el-col>
                <el-col :span="6"><div class="grid-content">col-6</div></el-col>
                <el-col :span="6"><div class="grid-content">col-6</div></el-col>
              </el-row>
            </div>
            <div class="alignment-item">
              <h5>居中对齐 (center)</h5>
              <el-row justify="center" :gutter="10">
                <el-col :span="6"><div class="grid-content">col-6</div></el-col>
                <el-col :span="6"><div class="grid-content">col-6</div></el-col>
                <el-col :span="6"><div class="grid-content">col-6</div></el-col>
              </el-row>
            </div>
            <div class="alignment-item">
              <h5>右对齐 (end)</h5>
              <el-row justify="end" :gutter="10">
                <el-col :span="6"><div class="grid-content">col-6</div></el-col>
                <el-col :span="6"><div class="grid-content">col-6</div></el-col>
                <el-col :span="6"><div class="grid-content">col-6</div></el-col>
              </el-row>
            </div>
            <div class="alignment-item">
              <h5>两端对齐 (space-between)</h5>
              <el-row justify="space-between" :gutter="10">
                <el-col :span="6"><div class="grid-content">col-6</div></el-col>
                <el-col :span="6"><div class="grid-content">col-6</div></el-col>
                <el-col :span="6"><div class="grid-content">col-6</div></el-col>
              </el-row>
            </div>
          </div>
        </div>

        <div class="demo-section">
          <h4>状态显示</h4>
          <p><strong>栅格间距：</strong>{{ cfg.gutter }}px</p>
          <p><strong>水平对齐：</strong>{{ cfg.justify }}</p>
          <p><strong>垂直对齐：</strong>{{ cfg.align }}</p>
          <p><strong>列1：</strong>span={{ cfg.col1 }}, offset={{ cfg.offset1 }}</p>
          <p><strong>列2：</strong>span={{ cfg.col2 }}, offset={{ cfg.offset2 }}</p>
          <p><strong>列3：</strong>span={{ cfg.col3 }}, offset={{ cfg.offset3 }}</p>
        </div>
      </el-card>
    </div>

    <!-- 属性设置抽屉 -->
    <el-drawer
      v-model="showSettings"
      title="栅格布局属性设置"
      direction="rtl"
      size="45%"
    >
      <div class="settings-container">
        <el-alert type="info" show-icon :closable="false" style="margin-bottom: 20px;"
          description="提示：1) 基于 24 栅格系统；2) 通过 el-row 和 el-col 实现响应式布局；3) 支持 gutter 间距、justify 对齐、align 垂直对齐等属性。" />
        
        <!-- 栅格设置 -->
        <div class="form-section">
          <div class="section-title">栅格设置</div>
          
          <div class="form-item">
            <div class="label-text">
              <div class="prop-name">gutter</div>
              <div class="help-text">栅格间距，单位 px</div>
            </div>
            <el-input-number v-model="cfg.gutter" :min="0" :max="50" />
          </div>
          
          <div class="form-item">
            <div class="label-text">
              <div class="prop-name">justify</div>
              <div class="help-text">水平对齐方式</div>
            </div>
            <el-select v-model="cfg.justify" placeholder="选择对齐方式">
              <el-option label="start" value="start" />
              <el-option label="center" value="center" />
              <el-option label="end" value="end" />
              <el-option label="space-between" value="space-between" />
              <el-option label="space-around" value="space-around" />
            </el-select>
          </div>
          
          <div class="form-item">
            <div class="label-text">
              <div class="prop-name">align</div>
              <div class="help-text">垂直对齐方式</div>
            </div>
            <el-select v-model="cfg.align" placeholder="选择对齐方式">
              <el-option label="top" value="top" />
              <el-option label="middle" value="middle" />
              <el-option label="bottom" value="bottom" />
            </el-select>
          </div>
        </div>
        
        <!-- 列设置 -->
        <div class="form-section">
          <div class="section-title">列设置</div>
          
          <div class="form-item">
            <div class="label-text">
              <div class="prop-name">col1 span</div>
              <div class="help-text">第一列占位，范围 1-24</div>
            </div>
            <el-input-number v-model="cfg.col1" :min="1" :max="24" />
          </div>
          
          <div class="form-item">
            <div class="label-text">
              <div class="prop-name">col1 offset</div>
              <div class="help-text">第一列偏移量</div>
            </div>
            <el-input-number v-model="cfg.offset1" :min="0" :max="24" />
          </div>
          
          <div class="form-item">
            <div class="label-text">
              <div class="prop-name">col2 span</div>
              <div class="help-text">第二列占位，范围 1-24</div>
            </div>
            <el-input-number v-model="cfg.col2" :min="1" :max="24" />
          </div>
          
          <div class="form-item">
            <div class="label-text">
              <div class="prop-name">col2 offset</div>
              <div class="help-text">第二列偏移量</div>
            </div>
            <el-input-number v-model="cfg.offset2" :min="0" :max="24" />
          </div>
          
          <div class="form-item">
            <div class="label-text">
              <div class="prop-name">col3 span</div>
              <div class="help-text">第三列占位，范围 1-24</div>
            </div>
            <el-input-number v-model="cfg.col3" :min="1" :max="24" />
          </div>
          
          <div class="form-item">
            <div class="label-text">
              <div class="prop-name">col3 offset</div>
              <div class="help-text">第三列偏移量</div>
            </div>
            <el-input-number v-model="cfg.offset3" :min="0" :max="24" />
          </div>
        </div>
        
        <!-- 操作按钮 -->
        <div class="form-section">
          <div class="section-title">操作</div>
          <el-button type="primary" @click="handleAction">测试操作</el-button>
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

// 配置对象
const cfg = reactive({
  gutter: 20,
  justify: 'start',
  align: 'top',
  col1: 8,
  offset1: 0,
  col2: 8,
  offset2: 0,
  col3: 8,
  offset3: 0
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

.grid-content {
  min-height: 50px;
  background: #f0f9ff;
  border: 1px solid #409eff;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #409eff;
  font-weight: 500;
  margin-bottom: 10px;
}

.alignment-demo {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.alignment-item {
  padding: 15px;
  background: #f8f9fa;
  border-radius: 6px;
  border: 1px solid #e9ecef;
}

.alignment-item h5 {
  margin: 0 0 10px 0;
  color: #303133;
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
</style>
