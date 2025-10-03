<template>
  <div class="demo-container">
    <div class="demo-header">
      <h2>穿梭框 Transfer</h2>
      <p>双栏穿梭选择器，支持数据源、目标项、搜索、排序等功能</p>
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
          <h4>穿梭框演示</h4>
          <el-transfer
            v-model="cfg.value"
            :data="cfg.data"
            :titles="cfg.titles"
            :button-texts="cfg.buttonTexts"
            :filterable="cfg.filterable"
            :filter-placeholder="cfg.filterPlaceholder"
            :filter-method="cfg.filterMethod"
            :render-content="cfg.renderContent"
            :format="cfg.format"
            :props="cfg.props"
            :left-default-checked="cfg.leftDefaultChecked"
            :right-default-checked="cfg.rightDefaultChecked"
            @change="handleChange"
            @left-check-change="handleLeftCheckChange"
            @right-check-change="handleRightCheckChange"
          />
        </div>

        <div class="demo-section">
          <h4>不同配置演示</h4>
          <div class="transfer-group">
            <div class="transfer-item">
              <h4>基础穿梭框</h4>
              <el-transfer
                v-model="basicValue"
                :data="basicData"
                titles="['源列表', '目标列表']"
              />
            </div>
            <div class="transfer-item">
              <h4>可搜索穿梭框</h4>
              <el-transfer
                v-model="searchValue"
                :data="searchData"
                :filterable="true"
                filter-placeholder="请输入搜索内容"
                titles="['可搜索源', '可搜索目标']"
              />
            </div>
          </div>
        </div>

        <div class="demo-section">
          <h4>状态显示</h4>
          <p><strong>选中值：</strong>{{ cfg.value }}</p>
          <p><strong>数据源：</strong>{{ cfg.data.length }} 项</p>
          <p><strong>标题：</strong>{{ cfg.titles }}</p>
          <p><strong>按钮文字：</strong>{{ cfg.buttonTexts }}</p>
          <p><strong>可搜索：</strong>{{ cfg.filterable ? '是' : '否' }}</p>
          <p><strong>搜索占位符：</strong>{{ cfg.filterPlaceholder }}</p>
        </div>
      </el-card>
    </div>

    <!-- 属性设置抽屉 -->
    <el-drawer
      v-model="showSettings"
      title="穿梭框属性设置"
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
              <pre><code>&lt;el-transfer v-model="value" :data="data" /&gt;

&lt;script setup&gt;
import { ref } from 'vue'

const value = ref([])
const data = ref([
  { key: 1, label: '选项1', disabled: false },
  { key: 2, label: '选项2', disabled: false },
  { key: 3, label: '选项3', disabled: false },
  { key: 4, label: '选项4', disabled: false },
  { key: 5, label: '选项5', disabled: false }
])
&lt;/script&gt;</code></pre>
            </div>
          </div>
          
          <div class="usage-item">
            <h5>2. 自定义标题</h5>
            <div class="code-block">
              <pre><code>&lt;el-transfer 
  v-model="value" 
  :data="data" 
  :titles="['源列表', '目标列表']" 
/&gt;</code></pre>
            </div>
          </div>
          
          <div class="usage-item">
            <h5>3. 自定义按钮文本</h5>
            <div class="code-block">
              <pre><code>&lt;el-transfer 
  v-model="value" 
  :data="data" 
  :button-texts="['向左移动', '向右移动']" 
/&gt;</code></pre>
            </div>
          </div>
          
          <div class="usage-item">
            <h5>4. 可搜索</h5>
            <div class="code-block">
              <pre><code>&lt;el-transfer 
  v-model="value" 
  :data="data" 
  filterable 
  filter-placeholder="请输入搜索内容" 
/&gt;</code></pre>
            </div>
          </div>
          
          <div class="usage-item">
            <h5>5. 自定义数据字段</h5>
            <div class="code-block">
              <pre><code>&lt;el-transfer 
  v-model="value" 
  :data="data" 
  :props="{
    key: 'value',
    label: 'desc',
    disabled: 'disabled'
  }" 
/&gt;

&lt;script setup&gt;
const data = ref([
  { value: 1, desc: '选项1', disabled: false },
  { value: 2, desc: '选项2', disabled: false },
  { value: 3, desc: '选项3', disabled: false }
])
&lt;/script&gt;</code></pre>
            </div>
          </div>
          
          <div class="usage-item">
            <h5>6. 自定义渲染内容</h5>
            <div class="code-block">
              <pre><code>&lt;el-transfer 
  v-model="value" 
  :data="data" 
  :render-content="renderFunc" 
/&gt;

&lt;script setup&gt;
const renderFunc = (h, option) => {
  return h('span', [
    h('span', option.label),
    h('el-tag', { size: 'small' }, option.key)
  ])
}
&lt;/script&gt;</code></pre>
            </div>
          </div>
          
          <div class="usage-item">
            <h5>7. 事件处理</h5>
            <div class="code-block">
              <pre><code>&lt;el-transfer 
  v-model="value" 
  :data="data" 
  @change="handleChange" 
  @left-check-change="handleLeftCheckChange" 
  @right-check-change="handleRightCheckChange" 
/&gt;

&lt;script setup&gt;
const handleChange = (value, direction, movedKeys) => {
  console.log('值改变:', value, direction, movedKeys)
}

const handleLeftCheckChange = (value, movedKeys) => {
  console.log('左侧选中改变:', value, movedKeys)
}

const handleRightCheckChange = (value, movedKeys) => {
  console.log('右侧选中改变:', value, movedKeys)
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
              <span class="prop-name">titles</span>
              <span class="help-text">标题数组</span>
            </div>
            <el-input v-model="cfg.titles" placeholder="如: ['源列表', '目标列表']" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">buttonTexts</span>
              <span class="help-text">按钮文字数组</span>
            </div>
            <el-input v-model="cfg.buttonTexts" placeholder="如: ['到右边', '到左边']" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">filterable</span>
              <span class="help-text">是否可搜索</span>
            </div>
            <el-switch v-model="cfg.filterable" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">filterPlaceholder</span>
              <span class="help-text">搜索占位符</span>
            </div>
            <el-input v-model="cfg.filterPlaceholder" placeholder="请输入搜索占位符" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">props</span>
              <span class="help-text">数据源的字段别名</span>
            </div>
            <el-input v-model="cfg.props" placeholder="如: { key: 'value', label: 'desc' }" />
          </div>
        </div>

        <!-- 数据管理 -->
        <div class="form-section">
          <div class="section-title">数据管理</div>
          
          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">数据源</span>
              <span class="help-text">穿梭框数据</span>
            </div>
            <div class="data-container">
              <div v-for="(item, index) in cfg.data" :key="index" class="data-item">
                <el-input v-model="item.key" placeholder="键" style="width: 100px;" />
                <el-input v-model="item.label" placeholder="标签" style="width: 120px;" />
                <el-input v-model="item.disabled" placeholder="禁用" style="width: 80px;" />
                <el-button type="danger" size="small" @click="removeDataItem(index)">删除</el-button>
              </div>
              <el-button type="primary" @click="addDataItem">添加数据</el-button>
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
const basicValue = ref([])
const searchValue = ref([])

// 配置对象
const cfg = reactive({
  value: [1, 4],
  data: [
    { key: 1, label: '选项1', disabled: false },
    { key: 2, label: '选项2', disabled: false },
    { key: 3, label: '选项3', disabled: true },
    { key: 4, label: '选项4', disabled: false },
    { key: 5, label: '选项5', disabled: false }
  ],
  titles: ['源列表', '目标列表'],
  buttonTexts: ['到右边', '到左边'],
  filterable: false,
  filterPlaceholder: '请输入搜索内容',
  filterMethod: null,
  renderContent: null,
  props: { key: 'key', label: 'label', disabled: 'disabled' },
  leftDefaultChecked: [],
  rightDefaultChecked: []
})

// 基础数据
const basicData = ref([
  { key: 1, label: '选项1' },
  { key: 2, label: '选项2' },
  { key: 3, label: '选项3' },
  { key: 4, label: '选项4' },
  { key: 5, label: '选项5' }
])

const searchData = ref([
  { key: 1, label: '可搜索选项1' },
  { key: 2, label: '可搜索选项2' },
  { key: 3, label: '可搜索选项3' },
  { key: 4, label: '可搜索选项4' },
  { key: 5, label: '可搜索选项5' }
])

// 事件处理
const handleChange = (value, direction, movedKeys) => {
  console.log('穿梭框改变:', { value, direction, movedKeys })
  ElMessage.success(`已${direction === 'right' ? '添加' : '移除'} ${movedKeys.length} 项`)
}

const handleLeftCheckChange = (value, movedKeys) => {
  console.log('左侧选中改变:', { value, movedKeys })
}

const handleRightCheckChange = (value, movedKeys) => {
  console.log('右侧选中改变:', { value, movedKeys })
}

// 数据管理
const addDataItem = () => {
  const newKey = Math.max(...cfg.data.map(item => item.key)) + 1
  cfg.data.push({
    key: newKey,
    label: `选项${newKey}`,
    disabled: false
  })
}

const removeDataItem = (index) => {
  if (cfg.data.length > 1) {
    cfg.data.splice(index, 1)
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

.transfer-group {
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
}

.transfer-item {
  flex: 1;
  min-width: 300px;
}

.transfer-item h4 {
  margin: 0 0 15px 0;
  color: #303133;
  font-size: 14px;
}

.data-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.data-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background: #fff;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
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
