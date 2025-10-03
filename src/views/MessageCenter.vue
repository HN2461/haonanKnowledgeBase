<template>
  <div class="message-center">
    <!-- 简单标题 -->
    <div class="page-header">
      <h1>开发记录</h1>
      <p>项目功能开发时间轴</p>
    </div>

    <!-- 简单时间轴 -->
    <div class="timeline-container">
      <el-timeline>
        <el-timeline-item
          v-for="message in messageStore.getPublishedMessages()"
          :key="message.id"
          :timestamp="formatTimestamp(message.timestamp)"
          :type="message.type"
        >
          <div class="timeline-item">
            <h3>{{ message.title }}</h3>
            <p>{{ message.content }}</p>
            <div class="tags">
              <el-tag
                v-for="tag in message.tags"
                :key="tag"
                size="small"
                type="info"
              >
                {{ tag }}
              </el-tag>
            </div>
          </div>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script setup>
import { messageStore } from '../data/messageStore.js'

// 格式化时间戳
const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp)
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<style scoped>
.message-center {
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
}

.page-header {
  text-align: center;
  margin-bottom: 40px;
  padding: 30px 0;
  background: #f8f9fa;
  border-radius: 8px;
}

.page-header h1 {
  margin: 0 0 10px 0;
  font-size: 28px;
  font-weight: 600;
  color: #303133;
}

.page-header p {
  margin: 0;
  font-size: 16px;
  color: #606266;
}

.timeline-container {
  background: #fff;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.timeline-item {
  padding: 20px 0;
  border-bottom: 1px solid #f0f0f0;
}

.timeline-item:last-child {
  border-bottom: none;
}

.timeline-item h3 {
  margin: 0 0 10px 0;
  font-size: 18px;
  font-weight: 600;
  color: #303133;
}

.timeline-item p {
  margin: 0 0 15px 0;
  color: #606266;
  line-height: 1.6;
}

.tags {
  margin-top: 10px;
}

.tags .el-tag {
  margin-right: 8px;
  margin-bottom: 5px;
}

/* 时间轴样式 */
:deep(.el-timeline-item__timestamp) {
  font-weight: 600;
  color: #409eff;
  font-size: 14px;
}

:deep(.el-timeline-item__node) {
  border-width: 2px;
}

:deep(.el-timeline-item__content) {
  padding-bottom: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .message-center {
    padding: 10px;
  }
  
  .page-header {
    padding: 20px 0;
  }
  
  .page-header h1 {
    font-size: 24px;
  }
  
  .timeline-container {
    padding: 20px;
  }
}
</style>