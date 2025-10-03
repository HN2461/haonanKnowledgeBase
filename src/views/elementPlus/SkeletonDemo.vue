<template>
  <div class="demo-container">
    <div class="demo-header">
      <h2>骨架屏 Skeleton</h2>
      <p>在需要等待加载内容的位置设置一个骨架屏，提升用户体验</p>
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
          <h4>骨架屏演示</h4>
          <el-skeleton
            :rows="cfg.rows"
            :animated="cfg.animated"
            :loading="cfg.loading"
            :throttle="cfg.throttle"
          >
            <template #template>
              <el-skeleton-item variant="h1" style="width: 40%" />
              <el-skeleton-item variant="text" style="width: 100%" />
              <el-skeleton-item variant="text" style="width: 80%" />
              <el-skeleton-item variant="text" style="width: 60%" />
            </template>
            <div class="skeleton-content">
              <h1>真实内容标题</h1>
              <p>这是真实的页面内容，当loading为false时会显示。</p>
              <p>骨架屏会在内容加载完成后消失。</p>
            </div>
          </el-skeleton>
        </div>

        <div class="demo-section">
          <h4>不同变体演示</h4>
          <div class="skeleton-group">
            <div class="skeleton-item">
              <h4>文本</h4>
              <el-skeleton :rows="3" animated />
            </div>
            <div class="skeleton-item">
              <h4>头像</h4>
              <el-skeleton :rows="0" animated>
                <template #template>
                  <el-skeleton-item variant="circle" style="width: 60px; height: 60px;" />
                </template>
              </el-skeleton>
            </div>
            <div class="skeleton-item">
              <h4>按钮</h4>
              <el-skeleton :rows="0" animated>
                <template #template>
                  <el-skeleton-item variant="button" style="width: 100px; height: 32px;" />
                </template>
              </el-skeleton>
            </div>
            <div class="skeleton-item">
              <h4>图片</h4>
              <el-skeleton :rows="0" animated>
                <template #template>
                  <el-skeleton-item variant="image" style="width: 200px; height: 120px;" />
                </template>
              </el-skeleton>
            </div>
          </div>
        </div>

        <div class="demo-section">
          <h4>列表骨架屏演示</h4>
          <el-skeleton :rows="5" animated>
            <template #template>
              <div v-for="i in 5" :key="i" class="list-item">
                <el-skeleton-item variant="circle" style="width: 40px; height: 40px;" />
                <div class="list-content">
                  <el-skeleton-item variant="text" style="width: 80%" />
                  <el-skeleton-item variant="text" style="width: 60%" />
                </div>
              </div>
            </template>
            <div class="list-content">
              <div v-for="i in 5" :key="i" class="list-item">
                <el-avatar :size="40" :src="`https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`" />
                <div class="list-text">
                  <h4>用户 {{ i }}</h4>
                  <p>这是用户 {{ i }} 的描述信息</p>
                </div>
              </div>
            </div>
          </el-skeleton>
        </div>

        <div class="demo-section">
          <h4>状态显示</h4>
          <p><strong>行数：</strong>{{ cfg.rows }}</p>
          <p><strong>动画：</strong>{{ cfg.animated ? '是' : '否' }}</p>
          <p><strong>加载中：</strong>{{ cfg.loading ? '是' : '否' }}</p>
          <p><strong>节流：</strong>{{ cfg.throttle }}ms</p>
        </div>
      </el-card>
    </div>

    <!-- 属性设置抽屉 -->
    <el-drawer
      v-model="showSettings"
      title="骨架屏属性设置"
      direction="rtl"
      size="45%"
    >
      <div class="settings-container">
        <!-- 基础属性 -->
        <div class="form-section">
          <div class="section-title">基础属性</div>
          
          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">rows</span>
              <span class="help-text">骨架屏行数</span>
            </div>
            <el-input-number v-model="cfg.rows" :min="0" :max="20" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">animated</span>
              <span class="help-text">是否显示动画效果</span>
            </div>
            <el-switch v-model="cfg.animated" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">loading</span>
              <span class="help-text">是否显示骨架屏</span>
            </div>
            <el-switch v-model="cfg.loading" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">throttle</span>
              <span class="help-text">延迟显示时间（毫秒）</span>
            </div>
            <el-input-number v-model="cfg.throttle" :min="0" :max="5000" />
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
  rows: 4,
  animated: true,
  loading: true,
  throttle: 0
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

.skeleton-content {
  padding: 20px;
}

.skeleton-group {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.skeleton-item {
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  padding: 20px;
  text-align: center;
}

.skeleton-item h4 {
  margin: 0 0 15px 0;
  color: #303133;
  font-size: 14px;
}

.list-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px 0;
  border-bottom: 1px solid #f0f0f0;
}

.list-item:last-child {
  border-bottom: none;
}

.list-content {
  flex: 1;
}

.list-text h4 {
  margin: 0 0 5px 0;
  color: #303133;
  font-size: 16px;
}

.list-text p {
  margin: 0;
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
</style>
