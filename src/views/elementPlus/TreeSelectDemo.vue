<template>
  <div class="demo-container">
    <div class="demo-header">
      <h2>树形选择器 TreeSelect</h2>
      <p>树形结构的选择器，支持单选、多选、搜索、懒加载等功能</p>
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
          <h4>树形选择器演示</h4>
          <el-tree-select
            v-model="cfg.value"
            :data="cfg.data"
            :multiple="cfg.multiple"
            :clearable="cfg.clearable"
            :show-checkbox="cfg.showCheckbox"
            :check-strictly="cfg.checkStrictly"
            :check-on-click-node="cfg.checkOnClickNode"
            :default-expanded-keys="cfg.defaultExpandedKeys"
            :default-checked-keys="cfg.defaultCheckedKeys"
            :filter-node-method="cfg.filterNodeMethod"
            :placeholder="cfg.placeholder"
            :disabled="cfg.disabled"
            :size="cfg.size"
            :max-collapse-tags="cfg.maxCollapseTags"
            :render-after-expand="cfg.renderAfterExpand"
            :lazy="cfg.lazy"
            :load="cfg.load"
            :node-key="cfg.nodeKey"
            :props="cfg.props"
            @change="handleChange"
            @visible-change="handleVisibleChange"
            @remove-tag="handleRemoveTag"
            @clear="handleClear"
          />
        </div>

        <div class="demo-section">
          <h4>不同配置演示</h4>
          <div class="treeselect-group">
            <div class="treeselect-item">
              <h4>单选模式</h4>
              <el-tree-select
                v-model="singleValue"
                :data="singleData"
                placeholder="请选择"
                clearable
              />
            </div>
            <div class="treeselect-item">
              <h4>多选模式</h4>
              <el-tree-select
                v-model="multipleValue"
                :data="multipleData"
                :multiple="true"
                placeholder="请选择多个"
                clearable
                show-checkbox
              />
            </div>
            <div class="treeselect-item">
              <h4>可搜索模式</h4>
              <el-tree-select
                v-model="searchValue"
                :data="searchData"
                :filter-node-method="filterNode"
                placeholder="可搜索选择"
                clearable
              />
            </div>
          </div>
        </div>

        <div class="demo-section">
          <h4>状态显示</h4>
          <p><strong>选中值：</strong>{{ cfg.value }}</p>
          <p><strong>多选：</strong>{{ cfg.multiple ? '是' : '否' }}</p>
          <p><strong>可清空：</strong>{{ cfg.clearable ? '是' : '否' }}</p>
          <p><strong>显示复选框：</strong>{{ cfg.showCheckbox ? '是' : '否' }}</p>
          <p><strong>严格模式：</strong>{{ cfg.checkStrictly ? '是' : '否' }}</p>
          <p><strong>占位符：</strong>{{ cfg.placeholder }}</p>
        </div>
      </el-card>
    </div>

    <!-- 属性设置抽屉 -->
    <el-drawer
      v-model="showSettings"
      title="树形选择器属性设置"
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
              <pre><code>&lt;el-tree-select v-model="value" :data="data" /&gt;

&lt;script setup&gt;
import { ref } from 'vue'

const value = ref('')
const data = ref([
  {
    value: '1',
    label: '一级 1',
    children: [
      { value: '1-1', label: '二级 1-1' },
      { value: '1-2', label: '二级 1-2' }
    ]
  },
  {
    value: '2',
    label: '一级 2',
    children: [
      { value: '2-1', label: '二级 2-1' },
      { value: '2-2', label: '二级 2-2' }
    ]
  }
])
&lt;/script&gt;</code></pre>
            </div>
          </div>
          
          <div class="usage-item">
            <h5>2. 多选模式</h5>
            <div class="code-block">
              <pre><code>&lt;el-tree-select 
  v-model="value" 
  :data="data" 
  multiple 
  :collapse-tags="true" 
  :max-collapse-tags="3" 
/&gt;

&lt;script setup&gt;
const value = ref([])
&lt;/script&gt;</code></pre>
            </div>
          </div>
          
          <div class="usage-item">
            <h5>3. 显示复选框</h5>
            <div class="code-block">
              <pre><code>&lt;el-tree-select 
  v-model="value" 
  :data="data" 
  show-checkbox 
  check-strictly 
/&gt;</code></pre>
            </div>
          </div>
          
          <div class="usage-item">
            <h5>4. 可清空</h5>
            <div class="code-block">
              <pre><code>&lt;el-tree-select 
  v-model="value" 
  :data="data" 
  clearable 
  placeholder="请选择" 
/&gt;</code></pre>
            </div>
          </div>
          
          <div class="usage-item">
            <h5>5. 自定义数据字段</h5>
            <div class="code-block">
              <pre><code>&lt;el-tree-select 
  v-model="value" 
  :data="data" 
  :props="{
    value: 'id',
    label: 'name',
    children: 'children'
  }" 
/&gt;

&lt;script setup&gt;
const data = ref([
  {
    id: 1,
    name: '一级 1',
    children: [
      { id: 11, name: '二级 1-1' },
      { id: 12, name: '二级 1-2' }
    ]
  }
])
&lt;/script&gt;</code></pre>
            </div>
          </div>
          
          <div class="usage-item">
            <h5>6. 懒加载</h5>
            <div class="code-block">
              <pre><code>&lt;el-tree-select 
  v-model="value" 
  :data="data" 
  :load="loadNode" 
  lazy 
/&gt;

&lt;script setup&gt;
const loadNode = (node, resolve) => {
  if (node.level === 0) {
    return resolve([{ value: '1', label: 'region1' }])
  }
  if (node.level > 3) {
    return resolve([])
  }
  setTimeout(() => {
    resolve([
      { value: 'leaf', label: 'leaf' },
      { value: 'zone', label: 'zone' }
    ])
  }, 1000)
}
&lt;/script&gt;</code></pre>
            </div>
          </div>
          
          <div class="usage-item">
            <h5>7. 事件处理</h5>
            <div class="code-block">
              <pre><code>&lt;el-tree-select 
  v-model="value" 
  :data="data" 
  @change="handleChange" 
  @visible-change="handleVisibleChange" 
  @remove-tag="handleRemoveTag" 
  @clear="handleClear" 
/&gt;

&lt;script setup&gt;
const handleChange = (value) => {
  console.log('值改变:', value)
}

const handleVisibleChange = (visible) => {
  console.log('显示状态改变:', visible)
}

const handleRemoveTag = (value) => {
  console.log('移除标签:', value)
}

const handleClear = () => {
  console.log('清空')
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
              <span class="prop-name">multiple</span>
              <span class="help-text">是否多选</span>
            </div>
            <el-switch v-model="cfg.multiple" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">clearable</span>
              <span class="help-text">是否可清空</span>
            </div>
            <el-switch v-model="cfg.clearable" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">showCheckbox</span>
              <span class="help-text">是否显示复选框</span>
            </div>
            <el-switch v-model="cfg.showCheckbox" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">checkStrictly</span>
              <span class="help-text">是否严格模式</span>
            </div>
            <el-switch v-model="cfg.checkStrictly" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">checkOnClickNode</span>
              <span class="help-text">点击节点时选中</span>
            </div>
            <el-switch v-model="cfg.checkOnClickNode" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">placeholder</span>
              <span class="help-text">占位符</span>
            </div>
            <el-input v-model="cfg.placeholder" placeholder="请输入占位符" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">disabled</span>
              <span class="help-text">是否禁用</span>
            </div>
            <el-switch v-model="cfg.disabled" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">size</span>
              <span class="help-text">尺寸</span>
            </div>
            <el-radio-group v-model="cfg.size">
              <el-radio-button label="small">small</el-radio-button>
              <el-radio-button label="default">default</el-radio-button>
              <el-radio-button label="large">large</el-radio-button>
            </el-radio-group>
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">maxCollapseTags</span>
              <span class="help-text">最大折叠标签数</span>
            </div>
            <el-input-number v-model="cfg.maxCollapseTags" :min="0" :max="10" />
          </div>
        </div>

        <!-- 数据管理 -->
        <div class="form-section">
          <div class="section-title">数据管理</div>
          
          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">数据源</span>
              <span class="help-text">树形数据</span>
            </div>
            <div class="data-container">
              <div v-for="(item, index) in cfg.data" :key="index" class="data-item">
                <el-input v-model="item.value" placeholder="值" style="width: 100px;" />
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
const singleValue = ref('')
const multipleValue = ref([])
const searchValue = ref('')

// 配置对象
const cfg = reactive({
  value: '',
  data: [
    {
      value: '1',
      label: '一级 1',
      children: [
        { value: '1-1', label: '二级 1-1' },
        { value: '1-2', label: '二级 1-2' }
      ]
    },
    {
      value: '2',
      label: '一级 2',
      children: [
        { value: '2-1', label: '二级 2-1' },
        { value: '2-2', label: '二级 2-2' }
      ]
    }
  ],
  multiple: false,
  clearable: true,
  showCheckbox: false,
  checkStrictly: false,
  checkOnClickNode: false,
  defaultExpandedKeys: [],
  defaultCheckedKeys: [],
  filterNodeMethod: null,
  placeholder: '请选择',
  disabled: false,
  size: 'default',
  maxCollapseTags: 3,
  renderAfterExpand: true,
  lazy: false,
  load: null,
  nodeKey: 'value',
  props: { value: 'value', label: 'label', children: 'children', disabled: 'disabled' }
})

// 基础数据
const singleData = ref([
  { value: '1', label: '选项1' },
  { value: '2', label: '选项2' },
  { value: '3', label: '选项3' }
])

const multipleData = ref([
  { value: '1', label: '选项1' },
  { value: '2', label: '选项2' },
  { value: '3', label: '选项3' }
])

const searchData = ref([
  { value: '1', label: '可搜索选项1' },
  { value: '2', label: '可搜索选项2' },
  { value: '3', label: '可搜索选项3' }
])

// 事件处理
const handleChange = (value) => {
  console.log('树形选择器改变:', value)
  ElMessage.success(`选中: ${value}`)
}

const handleVisibleChange = (visible) => {
  console.log('可见性改变:', visible)
}

const handleRemoveTag = (value) => {
  console.log('移除标签:', value)
  ElMessage.info(`移除: ${value}`)
}

const handleClear = () => {
  console.log('清空')
  ElMessage.info('已清空')
}

// 搜索过滤
const filterNode = (value, data) => {
  if (!value) return true
  return data.label.includes(value)
}

// 数据管理
const addDataItem = () => {
  const newValue = Math.max(...cfg.data.map(item => parseInt(item.value))) + 1
  cfg.data.push({
    value: newValue.toString(),
    label: `选项${newValue}`,
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

.treeselect-group {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.treeselect-item {
  flex: 1;
  min-width: 250px;
}

.treeselect-item h4 {
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
