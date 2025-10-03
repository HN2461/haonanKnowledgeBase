<template>
  <div class="demo-page">
    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <span>Layout 布局</span>
          <el-button type="primary" @click="showSettings = true">属性设置</el-button>
        </div>
      </template>
      
      <!-- 基础栅格布局演示 -->
      <div class="demo-section">
        <h4>基础栅格布局</h4>
        <div class="preview-container">
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
      </div>

      <!-- 响应式布局演示 -->
      <div class="demo-section">
        <h4>响应式布局</h4>
        <div class="preview-container">
          <el-row :gutter="20">
            <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
              <div class="grid-content responsive">xs:24 sm:12 md:8 lg:6 xl:4</div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
              <div class="grid-content responsive">xs:24 sm:12 md:8 lg:6 xl:4</div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
              <div class="grid-content responsive">xs:24 sm:12 md:8 lg:6 xl:4</div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
              <div class="grid-content responsive">xs:24 sm:12 md:8 lg:6 xl:4</div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
              <div class="grid-content responsive">xs:24 sm:12 md:8 lg:6 xl:4</div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
              <div class="grid-content responsive">xs:24 sm:12 md:8 lg:6 xl:4</div>
            </el-col>
          </el-row>
        </div>
      </div>

      <!-- 对齐方式演示 -->
      <div class="demo-section">
        <h4>对齐方式演示</h4>
        <div class="alignment-demo">
          <div class="alignment-item">
            <h5>左对齐 (start)</h5>
            <div class="preview-container">
              <el-row justify="start" :gutter="10">
                <el-col :span="6"><div class="grid-content">col-6</div></el-col>
                <el-col :span="6"><div class="grid-content">col-6</div></el-col>
                <el-col :span="6"><div class="grid-content">col-6</div></el-col>
              </el-row>
            </div>
          </div>
          <div class="alignment-item">
            <h5>居中对齐 (center)</h5>
            <div class="preview-container">
              <el-row justify="center" :gutter="10">
                <el-col :span="6"><div class="grid-content">col-6</div></el-col>
                <el-col :span="6"><div class="grid-content">col-6</div></el-col>
                <el-col :span="6"><div class="grid-content">col-6</div></el-col>
              </el-row>
            </div>
          </div>
          <div class="alignment-item">
            <h5>右对齐 (end)</h5>
            <div class="preview-container">
              <el-row justify="end" :gutter="10">
                <el-col :span="6"><div class="grid-content">col-6</div></el-col>
                <el-col :span="6"><div class="grid-content">col-6</div></el-col>
                <el-col :span="6"><div class="grid-content">col-6</div></el-col>
              </el-row>
            </div>
          </div>
          <div class="alignment-item">
            <h5>两端对齐 (space-between)</h5>
            <div class="preview-container">
              <el-row justify="space-between" :gutter="10">
                <el-col :span="6"><div class="grid-content">col-6</div></el-col>
                <el-col :span="6"><div class="grid-content">col-6</div></el-col>
                <el-col :span="6"><div class="grid-content">col-6</div></el-col>
              </el-row>
            </div>
          </div>
          <div class="alignment-item">
            <h5>环绕对齐 (space-around)</h5>
            <div class="preview-container">
              <el-row justify="space-around" :gutter="10">
                <el-col :span="6"><div class="grid-content">col-6</div></el-col>
                <el-col :span="6"><div class="grid-content">col-6</div></el-col>
                <el-col :span="6"><div class="grid-content">col-6</div></el-col>
              </el-row>
            </div>
          </div>
        </div>
      </div>

      <!-- 垂直对齐演示 -->
      <div class="demo-section">
        <h4>垂直对齐演示</h4>
        <div class="vertical-demo">
          <div class="vertical-item">
            <h5>顶部对齐 (top)</h5>
            <div class="preview-container">
              <el-row align="top" :gutter="10" style="height: 100px;">
                <el-col :span="8"><div class="grid-content tall">高列</div></el-col>
                <el-col :span="8"><div class="grid-content">普通列</div></el-col>
                <el-col :span="8"><div class="grid-content short">矮列</div></el-col>
              </el-row>
            </div>
          </div>
          <div class="vertical-item">
            <h5>居中对齐 (middle)</h5>
            <div class="preview-container">
              <el-row align="middle" :gutter="10" style="height: 100px;">
                <el-col :span="8"><div class="grid-content tall">高列</div></el-col>
                <el-col :span="8"><div class="grid-content">普通列</div></el-col>
                <el-col :span="8"><div class="grid-content short">矮列</div></el-col>
              </el-row>
            </div>
          </div>
          <div class="vertical-item">
            <h5>底部对齐 (bottom)</h5>
            <div class="preview-container">
              <el-row align="bottom" :gutter="10" style="height: 100px;">
                <el-col :span="8"><div class="grid-content tall">高列</div></el-col>
                <el-col :span="8"><div class="grid-content">普通列</div></el-col>
                <el-col :span="8"><div class="grid-content short">矮列</div></el-col>
              </el-row>
            </div>
          </div>
        </div>
      </div>

      <!-- 常用布局模式 -->
      <div class="demo-section">
        <h4>常用布局模式</h4>
        
        <!-- 经典三栏布局 -->
        <div class="layout-pattern">
          <h5>经典三栏布局</h5>
          <div class="preview-container">
            <el-row :gutter="10">
              <el-col :span="6">
                <div class="grid-content sidebar">侧边栏</div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content main">主内容区</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content sidebar">侧边栏</div>
              </el-col>
            </el-row>
          </div>
        </div>

        <!-- 卡片网格布局 -->
        <div class="layout-pattern">
          <h5>卡片网格布局</h5>
          <div class="preview-container">
            <el-row :gutter="16">
              <el-col :span="8" v-for="i in 6" :key="i">
                <div class="grid-content card">卡片 {{ i }}</div>
              </el-col>
            </el-row>
          </div>
        </div>

        <!-- 表单布局 -->
        <div class="layout-pattern">
          <h5>表单布局</h5>
          <div class="preview-container">
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="grid-content form-field">用户名</div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content form-field">密码</div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content form-field">邮箱地址</div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content form-field">省份</div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content form-field">城市</div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content form-field">区县</div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>

      <!-- 状态显示 -->
      <div class="status">
        <div><strong>栅格间距：</strong>{{ cfg.gutter }}px</div>
        <div><strong>水平对齐：</strong>{{ cfg.justify }}</div>
        <div><strong>垂直对齐：</strong>{{ cfg.align }}</div>
        <div><strong>列1：</strong>span={{ cfg.col1 }}, offset={{ cfg.offset1 }}</div>
        <div><strong>列2：</strong>span={{ cfg.col2 }}, offset={{ cfg.offset2 }}</div>
        <div><strong>列3：</strong>span={{ cfg.col3 }}, offset={{ cfg.offset3 }}</div>
      </div>
    </el-card>

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
        
        <!-- 快速预设 -->
        <div class="form-section">
          <div class="section-title">快速预设</div>
          <div class="preset-buttons">
            <el-button @click="setPreset('equal')">等宽三列</el-button>
            <el-button @click="setPreset('sidebar')">侧边栏布局</el-button>
            <el-button @click="setPreset('form')">表单布局</el-button>
            <el-button @click="setPreset('cards')">卡片网格</el-button>
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

// 快速预设
const setPreset = (type) => {
  switch (type) {
    case 'equal':
      cfg.col1 = 8
      cfg.offset1 = 0
      cfg.col2 = 8
      cfg.offset2 = 0
      cfg.col3 = 8
      cfg.offset3 = 0
      cfg.gutter = 20
      cfg.justify = 'start'
      break
    case 'sidebar':
      cfg.col1 = 4
      cfg.offset1 = 0
      cfg.col2 = 16
      cfg.offset2 = 0
      cfg.col3 = 4
      cfg.offset3 = 0
      cfg.gutter = 10
      cfg.justify = 'start'
      break
    case 'form':
      cfg.col1 = 12
      cfg.offset1 = 0
      cfg.col2 = 12
      cfg.offset2 = 0
      cfg.col3 = 24
      cfg.offset3 = 0
      cfg.gutter = 20
      cfg.justify = 'start'
      break
    case 'cards':
      cfg.col1 = 8
      cfg.offset1 = 0
      cfg.col2 = 8
      cfg.offset2 = 0
      cfg.col3 = 8
      cfg.offset3 = 0
      cfg.gutter = 16
      cfg.justify = 'start'
      break
  }
  ElMessage.success(`已应用${type}预设`)
}
</script>

<style scoped>
.demo-page { 
  padding: 12px; 
}

.card-header { 
  font-weight: 600; 
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
}

.demo-section { 
  margin-bottom: 30px; 
}

.demo-section h4 { 
  margin: 0 0 16px 0; 
  font-size: 16px; 
  font-weight: 600; 
  color: #303133; 
  border-bottom: 2px solid #e4e7ed; 
  padding-bottom: 8px; 
}

.preview-container {
  padding: 20px;
  background: #f8f9fa;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  margin-bottom: 16px;
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
  transition: all 0.3s ease;
}

.grid-content:hover {
  background: #e6f7ff;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.2);
}

.grid-content.responsive {
  font-size: 12px;
  text-align: center;
  line-height: 1.4;
}

.grid-content.tall {
  min-height: 80px;
}

.grid-content.short {
  min-height: 30px;
}

.grid-content.sidebar {
  background: #f6ffed;
  border-color: #52c41a;
  color: #52c41a;
}

.grid-content.main {
  background: #fff2e8;
  border-color: #fa8c16;
  color: #fa8c16;
}

.grid-content.card {
  background: #f9f0ff;
  border-color: #722ed1;
  color: #722ed1;
  min-height: 80px;
}

.grid-content.form-field {
  background: #fff7e6;
  border-color: #faad14;
  color: #faad14;
  min-height: 40px;
}

.alignment-demo {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.alignment-item {
  padding: 16px;
  background: #f8f9fa;
  border-radius: 6px;
  border: 1px solid #e9ecef;
}

.alignment-item h5 {
  margin: 0 0 12px 0;
  color: #303133;
  font-size: 14px;
  font-weight: 500;
}

.vertical-demo {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.vertical-item {
  padding: 16px;
  background: #f8f9fa;
  border-radius: 6px;
  border: 1px solid #e9ecef;
}

.vertical-item h5 {
  margin: 0 0 12px 0;
  color: #303133;
  font-size: 14px;
  font-weight: 500;
}

.layout-pattern {
  margin-bottom: 24px;
  padding: 16px;
  background: #fafafa;
  border-radius: 6px;
  border: 1px solid #e4e7ed;
}

.layout-pattern h5 {
  margin: 0 0 12px 0;
  color: #303133;
  font-size: 14px;
  font-weight: 500;
}

.status { 
  margin: 20px 0; 
  padding: 16px; 
  background: #f5f7fa; 
  border-radius: 6px; 
  font-size: 13px; 
  line-height: 1.6;
  border: 1px solid #e4e7ed;
}

.status div {
  margin: 4px 0;
  color: #606266;
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

.preset-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.preset-buttons .el-button {
  margin: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .form-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .label-text {
    min-width: auto;
    width: 100%;
  }
  
  .preset-buttons {
    flex-direction: column;
  }
  
  .preset-buttons .el-button {
    width: 100%;
  }
}
</style>