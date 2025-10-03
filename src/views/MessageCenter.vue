<template>
  <div class="message-center">
    <!-- 时间轴内容 -->
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

// 格式化时间戳 - 简单直接显示
const formatTimestamp = (timestamp) => {
  // 直接从时间戳字符串中提取日期时间部分
  const dateStr = timestamp.replace('T', ' ').replace('.000Z', '')
  const [datePart, timePart] = dateStr.split(' ')
  const [year, month, day] = datePart.split('-')
  const [hours, minutes] = timePart.split(':')
  
  return `${year}/${month}/${day} ${hours}:${minutes}`
}
</script>

<style scoped>
.message-center {
  padding: 40px;
  max-width: 1000px;
  margin: 0 auto;
}

.timeline-container {
  background: #fff;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
}

.timeline-item {
  padding: 25px 0;
  border-bottom: 1px solid #e8e8e8;
  transition: all 0.3s ease;
}

.timeline-item:hover {
  background: #fafafa;
  margin: 0 -20px;
  padding: 25px 20px;
  border-radius: 8px;
}

.timeline-item:last-child {
  border-bottom: none;
}

.timeline-item h3 {
  margin: 0 0 12px 0;
  font-size: 19px;
  font-weight: 600;
  color: #2c3e50;
  line-height: 1.4;
}

.timeline-item p {
  margin: 0 0 18px 0;
  color: #5a6c7d;
  line-height: 1.7;
  font-size: 15px;
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
    padding: 20px;
  }
  
  .timeline-container {
    padding: 20px;
  }
}
</style>