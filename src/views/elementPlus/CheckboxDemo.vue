<template>
  <div class="demo-container">
    <div class="demo-header">
      <h2>多选框 Checkbox</h2>
      <p>在一组备选项中进行多选，用于在多个选项中选择多个结果</p>
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
          <h4>多选框演示</h4>
          <el-checkbox-group
            v-model="value"
            :size="cfg.size"
            :disabled="cfg.disabled"
            :min="cfg.min"
            :max="cfg.max"
            :text-color="cfg.textColor"
            :fill="cfg.fill"
            @change="handleChange"
          >
            <el-checkbox
              v-for="option in options"
              :key="option.value"
              :label="option.value"
              :disabled="option.disabled"
              :border="cfg.border"
              :indeterminate="option.indeterminate"
            >
              {{ option.label }}
            </el-checkbox>
          </el-checkbox-group>
        </div>

        <div class="demo-section">
          <h4>多选框按钮演示</h4>
          <el-checkbox-group
            v-model="buttonValue"
            :size="cfg.size"
            :disabled="cfg.disabled"
            :min="cfg.min"
            :max="cfg.max"
            :text-color="cfg.textColor"
            :fill="cfg.fill"
            @change="handleButtonChange"
          >
            <el-checkbox-button
              v-for="option in buttonOptions"
              :key="option.value"
              :label="option.value"
              :disabled="option.disabled"
            >
              {{ option.label }}
            </el-checkbox-button>
          </el-checkbox-group>
        </div>

        <div class="demo-section">
          <h4>全选/半选演示</h4>
          <el-checkbox
            v-model="checkAll"
            :indeterminate="isIndeterminate"
            @change="handleCheckAllChange"
          >
            全选
          </el-checkbox>
          <el-checkbox-group
            v-model="checkAllValue"
            :size="cfg.size"
            :disabled="cfg.disabled"
            @change="handleCheckAllGroupChange"
          >
            <el-checkbox
              v-for="option in checkAllOptions"
              :key="option.value"
              :label="option.value"
            >
              {{ option.label }}
            </el-checkbox>
          </el-checkbox-group>
        </div>

        <div class="demo-section">
          <h4>状态显示</h4>
          <p><strong>选中值：</strong>{{ value }}</p>
          <p><strong>按钮选中值：</strong>{{ buttonValue }}</p>
          <p><strong>全选值：</strong>{{ checkAllValue }}</p>
          <p><strong>全选状态：</strong>{{ checkAll ? '是' : '否' }}</p>
          <p><strong>半选状态：</strong>{{ isIndeterminate ? '是' : '否' }}</p>
          <p><strong>尺寸：</strong>{{ cfg.size }}</p>
          <p><strong>禁用：</strong>{{ cfg.disabled ? '是' : '否' }}</p>
          <p><strong>边框：</strong>{{ cfg.border ? '是' : '否' }}</p>
          <p><strong>最小选择数：</strong>{{ cfg.min }}</p>
          <p><strong>最大选择数：</strong>{{ cfg.max }}</p>
          <p><strong>文字颜色：</strong>{{ cfg.textColor }}</p>
          <p><strong>填充色：</strong>{{ cfg.fill }}</p>
        </div>
      </el-card>
    </div>

    <!-- 属性设置抽屉 -->
    <el-drawer
      v-model="showSettings"
      title="多选框属性设置"
      direction="rtl"
      size="45%"
    >
      <div class="settings-container">
        <!-- 基础属性 -->
        <div class="form-section">
          <div class="section-title">基础属性</div>
          
          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">size</span>
              <span class="help-text">尺寸</span>
            </div>
            <el-radio-group v-model="cfg.size">
              <el-radio-button label="large">large</el-radio-button>
              <el-radio-button label="default">default</el-radio-button>
              <el-radio-button label="small">small</el-radio-button>
            </el-radio-group>
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">border</span>
              <span class="help-text">是否显示边框</span>
            </div>
            <el-switch v-model="cfg.border" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">min</span>
              <span class="help-text">最小选择数</span>
            </div>
            <el-input-number v-model="cfg.min" :min="0" :max="10" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">max</span>
              <span class="help-text">最大选择数</span>
            </div>
            <el-input-number v-model="cfg.max" :min="1" :max="10" />
          </div>
        </div>

        <!-- 状态属性 -->
        <div class="form-section">
          <div class="section-title">状态属性</div>
          
          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">disabled</span>
              <span class="help-text">是否禁用</span>
            </div>
            <el-switch v-model="cfg.disabled" />
          </div>
        </div>

        <!-- 样式属性 -->
        <div class="form-section">
          <div class="section-title">样式属性</div>
          
          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">textColor</span>
              <span class="help-text">文字颜色</span>
            </div>
            <el-color-picker v-model="cfg.textColor" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">fill</span>
              <span class="help-text">填充色</span>
            </div>
            <el-color-picker v-model="cfg.fill" />
          </div>
        </div>

        <!-- 使用说明 -->
        <div class="form-section">
          <div class="section-title">使用说明</div>
          
          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">基础用法</span>
              <span class="help-text">多选框的基本使用方式</span>
            </div>
            <div class="code-block">
              <pre><code>&lt;el-checkbox-group v-model="value"&gt;
  &lt;el-checkbox label="option1"&gt;选项1&lt;/el-checkbox&gt;
  &lt;el-checkbox label="option2"&gt;选项2&lt;/el-checkbox&gt;
  &lt;el-checkbox label="option3"&gt;选项3&lt;/el-checkbox&gt;
&lt;/el-checkbox-group&gt;</code></pre>
            </div>
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">多选框按钮</span>
              <span class="help-text">使用多选框按钮样式</span>
            </div>
            <div class="code-block">
              <pre><code>&lt;el-checkbox-group v-model="value"&gt;
  &lt;el-checkbox-button label="button1"&gt;按钮1&lt;/el-checkbox-button&gt;
  &lt;el-checkbox-button label="button2"&gt;按钮2&lt;/el-checkbox-button&gt;
  &lt;el-checkbox-button label="button3"&gt;按钮3&lt;/el-checkbox-button&gt;
&lt;/el-checkbox-group&gt;</code></pre>
            </div>
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">禁用状态</span>
              <span class="help-text">设置多选框为禁用状态</span>
            </div>
            <div class="code-block">
              <pre><code>&lt;el-checkbox-group v-model="value" disabled&gt;
  &lt;el-checkbox label="option1"&gt;选项1&lt;/el-checkbox&gt;
  &lt;el-checkbox label="option2"&gt;选项2&lt;/el-checkbox&gt;
&lt;/el-checkbox-group&gt;

&lt;!-- 或者单个禁用 --&gt;
&lt;el-checkbox label="option3" disabled&gt;选项3&lt;/el-checkbox&gt;</code></pre>
            </div>
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">边框样式</span>
              <span class="help-text">为多选框添加边框</span>
            </div>
            <div class="code-block">
              <pre><code>&lt;el-checkbox-group v-model="value"&gt;
  &lt;el-checkbox label="option1" border&gt;选项1&lt;/el-checkbox&gt;
  &lt;el-checkbox label="option2" border&gt;选项2&lt;/el-checkbox&gt;
&lt;/el-checkbox-group&gt;</code></pre>
            </div>
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">全选/半选</span>
              <span class="help-text">实现全选和半选功能</span>
            </div>
            <div class="code-block">
              <pre><code>&lt;el-checkbox
  v-model="checkAll"
  :indeterminate="isIndeterminate"
  @change="handleCheckAllChange"
&gt;
  全选
&lt;/el-checkbox&gt;

&lt;el-checkbox-group
  v-model="checkedCities"
  @change="handleCheckedCitiesChange"
&gt;
  &lt;el-checkbox
    v-for="city in cities"
    :key="city"
    :label="city"
  &gt;
    {{ city }}
  &lt;/el-checkbox&gt;
&lt;/el-checkbox-group&gt;</code></pre>
            </div>
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">不同尺寸</span>
              <span class="help-text">设置多选框的尺寸</span>
            </div>
            <div class="code-block">
              <pre><code>&lt;el-checkbox-group v-model="value" size="large"&gt;
  &lt;el-checkbox label="option1"&gt;大尺寸&lt;/el-checkbox&gt;
  &lt;el-checkbox label="option2"&gt;大尺寸&lt;/el-checkbox&gt;
&lt;/el-checkbox-group&gt;

&lt;el-checkbox-group v-model="value" size="small"&gt;
  &lt;el-checkbox label="option1"&gt;小尺寸&lt;/el-checkbox&gt;
  &lt;el-checkbox label="option2"&gt;小尺寸&lt;/el-checkbox&gt;
&lt;/el-checkbox-group&gt;</code></pre>
            </div>
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">事件处理</span>
              <span class="help-text">监听多选框变化事件</span>
            </div>
            <div class="code-block">
              <pre><code>&lt;el-checkbox-group v-model="value" @change="handleChange"&gt;
  &lt;el-checkbox label="option1"&gt;选项1&lt;/el-checkbox&gt;
  &lt;el-checkbox label="option2"&gt;选项2&lt;/el-checkbox&gt;
&lt;/el-checkbox-group&gt;

&lt;script setup&gt;
const handleChange = (value) => {
  console.log('选中值:', value)
}
&lt;/script&gt;</code></pre>
            </div>
          </div>
        </div>

        <!-- 选项管理 -->
        <div class="form-section">
          <div class="section-title">选项管理</div>
          
          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">选项</span>
              <span class="help-text">多选框选项</span>
            </div>
            <div class="options-container">
              <div v-for="(option, index) in options" :key="index" class="option-item">
                <el-input v-model="option.label" placeholder="标签" style="width: 120px;" />
                <el-input v-model="option.value" placeholder="值" style="width: 120px;" />
                <el-switch v-model="option.disabled" />
                <el-switch v-model="option.indeterminate" />
                <el-button type="danger" size="small" @click="removeOption(index)">删除</el-button>
              </div>
              <el-button type="primary" @click="addOption">添加选项</el-button>
            </div>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { ElMessage } from 'element-plus'

// 响应式数据
const showSettings = ref(false)
const value = ref(['option1'])
const buttonValue = ref(['button1'])
const checkAll = ref(false)
const checkAllValue = ref(['check1', 'check2'])

// 配置对象
const cfg = reactive({
  size: 'default',
  disabled: false,
  border: false,
  min: 0,
  max: 0,
  textColor: '#409eff',
  fill: '#409eff'
})

// 选项数据
const options = ref([
  { label: '选项1', value: 'option1', disabled: false, indeterminate: false },
  { label: '选项2', value: 'option2', disabled: false, indeterminate: false },
  { label: '选项3', value: 'option3', disabled: true, indeterminate: false },
  { label: '选项4', value: 'option4', disabled: false, indeterminate: false }
])

const buttonOptions = ref([
  { label: '按钮1', value: 'button1', disabled: false },
  { label: '按钮2', value: 'button2', disabled: false },
  { label: '按钮3', value: 'button3', disabled: true },
  { label: '按钮4', value: 'button4', disabled: false }
])

const checkAllOptions = ref([
  { label: '全选项1', value: 'check1' },
  { label: '全选项2', value: 'check2' },
  { label: '全选项3', value: 'check3' },
  { label: '全选项4', value: 'check4' }
])

// 计算属性
const isIndeterminate = computed(() => {
  const checkedCount = checkAllValue.value.length
  return checkedCount > 0 && checkedCount < checkAllOptions.value.length
})

// 事件处理
const handleChange = (value) => {
  console.log('多选框值改变:', value)
  ElMessage.success(`选中: ${value.join(', ')}`)
}

const handleButtonChange = (value) => {
  console.log('多选框按钮值改变:', value)
  ElMessage.success(`选中按钮: ${value.join(', ')}`)
}

const handleCheckAllChange = (val) => {
  checkAllValue.value = val ? checkAllOptions.value.map(option => option.value) : []
  ElMessage.success(val ? '全选' : '取消全选')
}

const handleCheckAllGroupChange = (value) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === checkAllOptions.value.length
  ElMessage.success(`选中 ${checkedCount} 项`)
}

// 选项管理
const addOption = () => {
  const newIndex = options.value.length + 1
  options.value.push({
    label: `选项${newIndex}`,
    value: `option${newIndex}`,
    disabled: false,
    indeterminate: false
  })
}

const removeOption = (index) => {
  options.value.splice(index, 1)
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

.options-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.option-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background: #fff;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
}

.code-block {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 4px;
  padding: 12px;
  margin: 8px 0;
}

.code-block pre {
  margin: 0;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  line-height: 1.4;
}
</style>
