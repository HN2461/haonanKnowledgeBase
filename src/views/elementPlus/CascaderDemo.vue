<template>
  <div class="demo-container">
    <div class="demo-header">
      <h2>级联选择器 Cascader</h2>
      <p>级联选择器，支持单选、多选、搜索、懒加载等功能</p>
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
          <h4>级联选择器演示</h4>
          <el-cascader
            v-model="cfg.value"
            :options="cfg.options"
            :props="cfg.props"
            :placeholder="cfg.placeholder"
            :disabled="cfg.disabled"
            :clearable="cfg.clearable"
            :show-all-levels="cfg.showAllLevels"
            :collapse-tags="cfg.collapseTags"
            :separator="cfg.separator"
            :filterable="cfg.filterable"
            :filter-method="cfg.filterMethod"
            :debounce="cfg.debounce"
            :before-filter="cfg.beforeFilter"
            :popper-class="cfg.popperClass"
            :teleported="cfg.teleported"
            :tag-type="cfg.tagType"
            :validate-event="cfg.validateEvent"
            :size="cfg.size"
            :max-collapse-tags="cfg.maxCollapseTags"
            @change="handleChange"
            @expand-change="handleExpandChange"
            @blur="handleBlur"
            @focus="handleFocus"
            @visible-change="handleVisibleChange"
            @remove-tag="handleRemoveTag"
          />
        </div>

        <div class="demo-section">
          <h4>不同配置演示</h4>
          <div class="cascader-group">
            <div class="cascader-item">
              <h4>基础级联选择器</h4>
              <el-cascader
                v-model="basicValue"
                :options="basicOptions"
                placeholder="请选择"
                clearable
              />
            </div>
            <div class="cascader-item">
              <h4>多选级联选择器</h4>
              <el-cascader
                v-model="multipleValue"
                :options="multipleOptions"
                :props="{ multiple: true }"
                placeholder="请选择多个"
                clearable
                collapse-tags
              />
            </div>
            <div class="cascader-item">
              <h4>可搜索级联选择器</h4>
              <el-cascader
                v-model="searchValue"
                :options="searchOptions"
                :filterable="true"
                placeholder="可搜索选择"
                clearable
              />
            </div>
          </div>
        </div>

        <div class="demo-section">
          <h4>状态显示</h4>
          <p><strong>选中值：</strong>{{ cfg.value }}</p>
          <p><strong>选项数量：</strong>{{ cfg.options.length }}</p>
          <p><strong>占位符：</strong>{{ cfg.placeholder }}</p>
          <p><strong>禁用：</strong>{{ cfg.disabled ? '是' : '否' }}</p>
          <p><strong>可清空：</strong>{{ cfg.clearable ? '是' : '否' }}</p>
          <p><strong>显示所有级别：</strong>{{ cfg.showAllLevels ? '是' : '否' }}</p>
          <p><strong>可搜索：</strong>{{ cfg.filterable ? '是' : '否' }}</p>
        </div>
      </el-card>
    </div>

    <!-- 属性设置抽屉 -->
    <el-drawer
      v-model="showSettings"
      title="级联选择器属性设置"
      direction="rtl"
      size="45%"
    >
      <div class="settings-container">
        <!-- 基础属性 -->
        <div class="form-section">
          <div class="section-title">基础属性</div>
          
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
              <span class="prop-name">clearable</span>
              <span class="help-text">是否可清空</span>
            </div>
            <el-switch v-model="cfg.clearable" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">showAllLevels</span>
              <span class="help-text">是否显示所有级别</span>
            </div>
            <el-switch v-model="cfg.showAllLevels" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">collapseTags</span>
              <span class="help-text">是否折叠标签</span>
            </div>
            <el-switch v-model="cfg.collapseTags" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">separator</span>
              <span class="help-text">分隔符</span>
            </div>
            <el-input v-model="cfg.separator" placeholder="如: /" />
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
              <span class="prop-name">debounce</span>
              <span class="help-text">搜索防抖延迟</span>
            </div>
            <el-input-number v-model="cfg.debounce" :min="0" :max="1000" />
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
              <span class="prop-name">选项数据</span>
              <span class="help-text">级联选择器数据</span>
            </div>
            <div class="data-container">
              <div v-for="(item, index) in cfg.options" :key="index" class="data-item">
                <el-input v-model="item.value" placeholder="值" style="width: 100px;" />
                <el-input v-model="item.label" placeholder="标签" style="width: 120px;" />
                <el-input v-model="item.disabled" placeholder="禁用" style="width: 80px;" />
                <el-button type="danger" size="small" @click="removeOptionItem(index)">删除</el-button>
              </div>
              <el-button type="primary" @click="addOptionItem">添加选项</el-button>
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
const multipleValue = ref([])
const searchValue = ref([])

// 配置对象
const cfg = reactive({
  value: [],
  options: [
    {
      value: 'zhejiang',
      label: '浙江',
      children: [
        { value: 'hangzhou', label: '杭州' },
        { value: 'ningbo', label: '宁波' }
      ]
    },
    {
      value: 'jiangsu',
      label: '江苏',
      children: [
        { value: 'nanjing', label: '南京' },
        { value: 'suzhou', label: '苏州' }
      ]
    }
  ],
  props: {
    value: 'value',
    label: 'label',
    children: 'children',
    disabled: 'disabled',
    multiple: false
  },
  placeholder: '请选择',
  disabled: false,
  clearable: true,
  showAllLevels: true,
  collapseTags: false,
  separator: ' / ',
  filterable: false,
  filterMethod: null,
  debounce: 300,
  beforeFilter: null,
  popperClass: '',
  teleported: true,
  tagType: '',
  validateEvent: true,
  size: 'default',
  maxCollapseTags: 3
})

// 基础数据
const basicOptions = ref([
  { value: '1', label: '选项1' },
  { value: '2', label: '选项2' },
  { value: '3', label: '选项3' }
])

const multipleOptions = ref([
  { value: '1', label: '选项1' },
  { value: '2', label: '选项2' },
  { value: '3', label: '选项3' }
])

const searchOptions = ref([
  { value: '1', label: '可搜索选项1' },
  { value: '2', label: '可搜索选项2' },
  { value: '3', label: '可搜索选项3' }
])

// 事件处理
const handleChange = (value) => {
  console.log('级联选择器改变:', value)
  ElMessage.success(`选中: ${value}`)
}

const handleExpandChange = (value) => {
  console.log('展开改变:', value)
}

const handleBlur = (event) => {
  console.log('失去焦点:', event)
}

const handleFocus = (event) => {
  console.log('获得焦点:', event)
}

const handleVisibleChange = (visible) => {
  console.log('可见性改变:', visible)
}

const handleRemoveTag = (value) => {
  console.log('移除标签:', value)
  ElMessage.info(`移除: ${value}`)
}

// 数据管理
const addOptionItem = () => {
  const newValue = Math.max(...cfg.options.map(item => parseInt(item.value))) + 1
  cfg.options.push({
    value: newValue.toString(),
    label: `选项${newValue}`,
    disabled: false
  })
}

const removeOptionItem = (index) => {
  if (cfg.options.length > 1) {
    cfg.options.splice(index, 1)
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

.cascader-group {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.cascader-item {
  flex: 1;
  min-width: 250px;
}

.cascader-item h4 {
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
</style>
