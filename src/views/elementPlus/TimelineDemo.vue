<template>
  <div class="demo-container">
    <div class="demo-header">
      <h2>时间线 Timeline</h2>
      <p>垂直展示的时间流信息，支持自定义时间戳、内容、图标等</p>
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
          <h4>时间线演示</h4>
          <el-timeline
            :reverse="cfg.reverse"
            @timeline-item-click="handleTimelineItemClick"
        >
          <el-timeline-item
            v-for="item in timelineItems"
            :key="item.timestamp"
            :timestamp="item.timestamp"
            :type="item.type"
            :color="item.color"
            :size="item.size"
            :icon="item.icon"
            :hollow="item.hollow"
            @click="handleItemClick(item)"
        >
          <el-card>
            <h4>{{ item.title }}</h4>
            <p>{{ item.content }}</p>
          </el-card>
        </el-timeline-item>
        </el-timeline>
        </div>

        <div class="demo-section">
          <h4>自定义时间戳演示</h4>
          <el-timeline>
            <el-timeline-item timestamp="2018/4/12" placement="top">
              <el-card>
                <h4>更新 Github 模板</h4>
                <p>王小虎 提交于 2018/4/12 20:46</p>
              </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2018/4/3" placement="top">
              <el-card>
                <h4>更新 Github 模板</h4>
                <p>王小虎 提交于 2018/4/3 20:46</p>
              </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2018/4/2" placement="top">
              <el-card>
                <h4>更新 Github 模板</h4>
                <p>王小虎 提交于 2018/4/2 20:46</p>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </div>

        <div class="demo-section">
          <h4>不同颜色演示</h4>
          <el-timeline>
            <el-timeline-item timestamp="2018/4/12" type="primary">
              <el-card>
                <h4>Primary</h4>
                <p>主要类型</p>
              </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2018/4/3" type="success">
              <el-card>
                <h4>Success</h4>
                <p>成功类型</p>
              </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2018/4/2" type="warning">
              <el-card>
                <h4>Warning</h4>
                <p>警告类型</p>
              </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2018/4/1" type="danger">
              <el-card>
                <h4>Danger</h4>
                <p>危险类型</p>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </div>

        <div class="demo-section">
          <h4>状态显示</h4>
          <p><strong>反向：</strong>{{ cfg.reverse ? '是' : '否' }}</p>
          <p><strong>时间线项目数：</strong>{{ timelineItems.length }}</p>
        </div>
      </el-card>
    </div>

    <!-- 属性设置抽屉 -->
    <el-drawer
      v-model="showSettings"
      title="时间线属性设置"
      direction="rtl"
      size="45%"
    >
      <div class="settings-container">
        <!-- 使用说明 -->
        <div class="form-section">
          <div class="section-title">使用说明</div>
          
          <div class="usage-item">
            <h5>1. 基础用法</h5>
            <div class="code-block">
              <pre><code>&lt;el-timeline&gt;
  &lt;el-timeline-item timestamp="2018/4/12"&gt;
    创建 Github 仓库
  &lt;/el-timeline-item&gt;
  &lt;el-timeline-item timestamp="2018/4/15"&gt;
    提交代码
  &lt;/el-timeline-item&gt;
  &lt;el-timeline-item timestamp="2018/4/20"&gt;
    发布版本
  &lt;/el-timeline-item&gt;
&lt;/el-timeline&gt;</code></pre>
            </div>
          </div>
          
          <div class="usage-item">
            <h5>2. 不同状态</h5>
            <div class="code-block">
              <pre><code>&lt;el-timeline&gt;
  &lt;el-timeline-item timestamp="2018/4/12" type="primary"&gt;
    主要事件
  &lt;/el-timeline-item&gt;
  &lt;el-timeline-item timestamp="2018/4/15" type="success"&gt;
    成功事件
  &lt;/el-timeline-item&gt;
  &lt;el-timeline-item timestamp="2018/4/20" type="warning"&gt;
    警告事件
  &lt;/el-timeline-item&gt;
  &lt;el-timeline-item timestamp="2018/4/25" type="danger"&gt;
    危险事件
  &lt;/el-timeline-item&gt;
&lt;/el-timeline&gt;</code></pre>
            </div>
          </div>
          
          <div class="usage-item">
            <h5>3. 自定义图标</h5>
            <div class="code-block">
              <pre><code>&lt;el-timeline&gt;
  &lt;el-timeline-item 
    timestamp="2018/4/12" 
    type="primary" 
    icon="el-icon-edit"
  &gt;
    编辑事件
  &lt;/el-timeline-item&gt;
  &lt;el-timeline-item 
    timestamp="2018/4/15" 
    type="success" 
    icon="el-icon-check"
  &gt;
    完成事件
  &lt;/el-timeline-item&gt;
&lt;/el-timeline&gt;</code></pre>
            </div>
          </div>
          
          <div class="usage-item">
            <h5>4. 自定义颜色</h5>
            <div class="code-block">
              <pre><code>&lt;el-timeline&gt;
  &lt;el-timeline-item 
    timestamp="2018/4/12" 
    color="#409eff"
  &gt;
    自定义颜色事件
  &lt;/el-timeline-item&gt;
  &lt;el-timeline-item 
    timestamp="2018/4/15" 
    color="#67c23a"
  &gt;
    绿色事件
  &lt;/el-timeline-item&gt;
&lt;/el-timeline&gt;</code></pre>
            </div>
          </div>
          
          <div class="usage-item">
            <h5>5. 时间戳位置</h5>
            <div class="code-block">
              <pre><code>&lt;el-timeline&gt;
  &lt;el-timeline-item timestamp="2018/4/12" placement="top"&gt;
    时间戳在上方
  &lt;/el-timeline-item&gt;
  &lt;el-timeline-item timestamp="2018/4/15" placement="bottom"&gt;
    时间戳在下方
  &lt;/el-timeline-item&gt;
&lt;/el-timeline&gt;</code></pre>
            </div>
          </div>
          
          <div class="usage-item">
            <h5>6. 空心节点</h5>
            <div class="code-block">
              <pre><code>&lt;el-timeline&gt;
  &lt;el-timeline-item 
    timestamp="2018/4/12" 
    type="primary" 
    hollow
  &gt;
    空心节点
  &lt;/el-timeline-item&gt;
  &lt;el-timeline-item 
    timestamp="2018/4/15" 
    type="success" 
    hollow
  &gt;
    空心成功节点
  &lt;/el-timeline-item&gt;
&lt;/el-timeline&gt;</code></pre>
            </div>
          </div>
          
          <div class="usage-item">
            <h5>7. 事件处理</h5>
            <div class="code-block">
              <pre><code>&lt;el-timeline @timeline-item-click="handleTimelineItemClick"&gt;
  &lt;el-timeline-item 
    timestamp="2018/4/12" 
    @click="handleItemClick"
  &gt;
    可点击事件
  &lt;/el-timeline-item&gt;
&lt;/el-timeline&gt;

&lt;script setup&gt;
const handleTimelineItemClick = (item) => {
  console.log('时间线项目点击:', item)
}

const handleItemClick = (event) => {
  console.log('项目点击:', event)
}
&lt;/script&gt;</code></pre>
            </div>
          </div>
        </div>
        
        <!-- 基础属性 -->
        <div class="form-section">
          <div class="section-title">基础属性</div>
          
          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">reverse</span>
              <span class="help-text">指定节点排序方向，默认为正序</span>
            </div>
            <el-switch v-model="cfg.reverse" />
          </div>
        </div>

        <!-- 时间线项目管理 -->
        <div class="form-section">
          <div class="section-title">时间线项目管理</div>
          
          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">时间线项目</span>
              <span class="help-text">时间线项目列表</span>
            </div>
            <div class="timeline-container">
              <div v-for="(item, index) in timelineItems" :key="index" class="timeline-item">
                <el-input v-model="item.timestamp" placeholder="时间戳" style="width: 150px;" />
                <el-input v-model="item.title" placeholder="标题" style="width: 120px;" />
                <el-input v-model="item.content" placeholder="内容" style="width: 200px;" />
                <el-select v-model="item.type" placeholder="类型" style="width: 100px;">
                  <el-option label="primary" value="primary" />
                  <el-option label="success" value="success" />
                  <el-option label="warning" value="warning" />
                  <el-option label="danger" value="danger" />
                  <el-option label="info" value="info" />
                </el-select>
                <el-input v-model="item.color" placeholder="颜色" style="width: 100px;" />
                <el-button type="danger" size="small" @click="removeTimelineItem(index)">删除</el-button>
              </div>
              <el-button type="primary" @click="addTimelineItem">添加项目</el-button>
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

// 配置对象
const cfg = reactive({
  reverse: false
})

// 时间线数据
const timelineItems = ref([
  {
    timestamp: '2018/4/12',
    title: '更新 Github 模板',
    content: '王小虎 提交于 2018/4/12 20:46',
    type: 'primary',
    color: '',
    size: 'normal',
    icon: '',
    hollow: false
  },
  {
    timestamp: '2018/4/3',
    title: '更新 Github 模板',
    content: '王小虎 提交于 2018/4/3 20:46',
    type: 'success',
    color: '',
    size: 'normal',
    icon: '',
    hollow: false
  },
  {
    timestamp: '2018/4/2',
    title: '更新 Github 模板',
    content: '王小虎 提交于 2018/4/2 20:46',
    type: 'warning',
    color: '',
    size: 'normal',
    icon: '',
    hollow: false
  },
  {
    timestamp: '2018/4/1',
    title: '更新 Github 模板',
    content: '王小虎 提交于 2018/4/1 20:46',
    type: 'danger',
    color: '',
    size: 'normal',
    icon: '',
    hollow: false
  }
])

// 事件处理
const handleTimelineItemClick = (item) => {
  console.log('时间线项目点击:', item)
  ElMessage.success(`点击时间线项目: ${item.timestamp}`)
}

const handleItemClick = (item) => {
  console.log('项目点击:', item)
  ElMessage.success(`点击项目: ${item.title}`)
}

// 时间线项目管理
const addTimelineItem = () => {
  const newIndex = timelineItems.value.length + 1
  timelineItems.value.push({
    timestamp: `2018/4/${newIndex}`,
    title: `项目${newIndex}`,
    content: `这是项目${newIndex}的内容`,
    type: 'primary',
    color: '',
    size: 'normal',
    icon: '',
    hollow: false
  })
}

const removeTimelineItem = (index) => {
  timelineItems.value.splice(index, 1)
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

.timeline-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.timeline-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background: #fff;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  flex-wrap: wrap;
}

.code-block {
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 4px;
  padding: 12px;
  margin: 8px 0;
}

.code-block pre {
  margin: 0;
  font-family: 'Courier New', Courier, monospace;
  font-size: 13px;
  line-height: 1.4;
  color: #333;
}

.usage-item {
  margin-bottom: 20px;
}

.usage-item h5 {
  margin: 0 0 8px 0;
  color: #409eff;
  font-size: 14px;
}
</style>
