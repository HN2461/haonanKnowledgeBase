<template>
  <div class="demo-page">
    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <span>Form 表单</span>
          <el-button type="primary" @click="show = true">属性设置</el-button>
        </div>
      </template>
      
      <!-- 预览表单 -->
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        :label-width="cfg.labelWidth"
        :label-position="cfg.labelPosition"
        :label-suffix="cfg.labelSuffix"
        :inline="cfg.inline"
        :size="cfg.size"
        :disabled="cfg.disabled"
        :validate-on-rule-change="cfg.validateOnRuleChange"
        :hide-required-asterisk="cfg.hideRequiredAsterisk"
        :show-message="cfg.showMessage"
        :inline-message="cfg.inlineMessage"
        :status-icon="cfg.statusIcon"
        :validate-trigger="cfg.validateTrigger"
        :scroll-to-error="cfg.scrollToError"
        :scroll-offset="cfg.scrollOffset"
        :class="cfg.customClass"
        :style="cfg.customStyle"
        @submit="onUI('submit')"
        @validate="onLog('validate')"
      >
        <el-form-item label="姓名" prop="name">
          <el-input 
            v-model="form.name" 
            :clearable="cfg.clearable"
            :disabled="cfg.disabled"
            placeholder="请输入姓名"
          />
        </el-form-item>
        
        <el-form-item label="年龄" prop="age">
          <el-input-number 
            v-model="form.age" 
            :min="0"
            :max="120"
            :disabled="cfg.disabled"
            placeholder="请输入年龄"
          />
        </el-form-item>
        
        <el-form-item label="城市" prop="city">
          <el-select 
            v-model="form.city" 
            :clearable="cfg.clearable"
            :disabled="cfg.disabled"
            placeholder="请选择城市"
            style="width: 200px;"
          >
            <el-option label="上海" value="sh" />
            <el-option label="北京" value="bj" />
            <el-option label="广州" value="gz" />
          </el-select>
        </el-form-item>
        
        <el-form-item label="邮箱" prop="email">
          <el-input 
            v-model="form.email" 
            :clearable="cfg.clearable"
            :disabled="cfg.disabled"
            placeholder="请输入邮箱"
          />
        </el-form-item>
        
        <el-form-item label="爱好" prop="hobbies">
          <el-checkbox-group v-model="form.hobbies" :disabled="cfg.disabled">
            <el-checkbox label="reading">阅读</el-checkbox>
            <el-checkbox label="music">音乐</el-checkbox>
            <el-checkbox label="sports">运动</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="form.gender" :disabled="cfg.disabled">
            <el-radio label="male">男</el-radio>
            <el-radio label="female">女</el-radio>
          </el-radio-group>
        </el-form-item>
        
        <el-form-item label="生日" prop="birthday">
          <el-date-picker 
            v-model="form.birthday" 
            type="date"
            :disabled="cfg.disabled"
            placeholder="请选择生日"
          />
        </el-form-item>
        
        <el-form-item label="个人简介" prop="description">
          <el-input 
            v-model="form.description" 
            type="textarea"
            :rows="cfg.textareaRows"
            :disabled="cfg.disabled"
            placeholder="请输入个人简介"
          />
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" @click="submit">提交</el-button>
          <el-button @click="reset">重置</el-button>
          <el-button @click="validate">校验</el-button>
          <el-button @click="clearValidate">清除校验</el-button>
        </el-form-item>
      </el-form>
      
      <!-- 状态显示 -->
      <div class="status">
        <div>表单值: {{ JSON.stringify(form) }}</div>
        <div>校验状态: {{ formRef?.validate ? '已初始化' : '未初始化' }}</div>
      </div>
    </el-card>

    <el-drawer v-model="show" title="表单属性设置" size="45%">
      <div class="drawer-content">
        <el-alert type="info" show-icon :closable="false" style="margin-bottom: 20px;"
          description="提示：1) 内联模式下 label-width 可能不生效；2) 校验触发时机可组合使用；3) 滚动相关属性在表单较长时生效。" />
        
        <!-- 基础属性 -->
        <div class="section">
          <h4>基础属性</h4>
          
          <div class="form-item">
            <div class="label-text">标签宽度</div>
            <div class="prop-name">label-width</div>
            <el-input v-model="cfg.labelWidth" placeholder="如 80px 或 120" style="width: 200px;" />
            <div class="help-text">表单标签的宽度，支持数字(px)或字符串</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">标签位置</div>
            <div class="prop-name">label-position</div>
            <el-radio-group v-model="cfg.labelPosition">
              <el-radio-button label="right">right</el-radio-button>
              <el-radio-button label="left">left</el-radio-button>
              <el-radio-button label="top">top</el-radio-button>
            </el-radio-group>
            <div class="help-text">表单标签的位置，影响整体布局</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">标签后缀</div>
            <div class="prop-name">label-suffix</div>
            <el-input v-model="cfg.labelSuffix" placeholder="如 :" style="width: 200px;" />
            <div class="help-text">表单标签的后缀，如冒号</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">内联模式</div>
            <div class="prop-name">inline</div>
            <el-switch v-model="cfg.inline" />
            <div class="help-text">是否内联模式，影响表单项排列</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">表单尺寸</div>
            <div class="prop-name">size</div>
            <el-radio-group v-model="cfg.size">
              <el-radio-button label="default">default</el-radio-button>
              <el-radio-button label="small">small</el-radio-button>
              <el-radio-button label="large">large</el-radio-button>
            </el-radio-group>
            <div class="help-text">表单尺寸，影响表单项大小</div>
          </div>
        </div>
        
        <!-- 校验设置 -->
        <div class="section">
          <h4>校验设置</h4>
          
          <div class="form-item">
            <div class="label-text">禁用表单</div>
            <div class="prop-name">disabled</div>
            <el-switch v-model="cfg.disabled" />
            <div class="help-text">是否禁用整个表单</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">规则变更校验</div>
            <div class="prop-name">validate-on-rule-change</div>
            <el-switch v-model="cfg.validateOnRuleChange" />
            <div class="help-text">是否在规则改变时重新校验</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">隐藏必填星号</div>
            <div class="prop-name">hide-required-asterisk</div>
            <el-switch v-model="cfg.hideRequiredAsterisk" />
            <div class="help-text">是否隐藏必填字段的星号</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">显示错误信息</div>
            <div class="prop-name">show-message</div>
            <el-switch v-model="cfg.showMessage" />
            <div class="help-text">是否显示校验错误信息</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">内联错误信息</div>
            <div class="prop-name">inline-message</div>
            <el-switch v-model="cfg.inlineMessage" />
            <div class="help-text">是否以内联模式显示校验信息</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">状态图标</div>
            <div class="prop-name">status-icon</div>
            <el-switch v-model="cfg.statusIcon" />
            <div class="help-text">是否在输入框中显示校验结果反馈图标</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">校验触发</div>
            <div class="prop-name">validate-trigger</div>
            <el-checkbox-group v-model="cfg.validateTrigger">
              <el-checkbox label="blur">blur</el-checkbox>
              <el-checkbox label="change">change</el-checkbox>
            </el-checkbox-group>
            <div class="help-text">校验触发时机，可组合使用</div>
          </div>
        </div>
        
        <!-- 滚动设置 -->
        <div class="section">
          <h4>滚动设置</h4>
          
          <div class="form-item">
            <div class="label-text">滚动到错误</div>
            <div class="prop-name">scroll-to-error</div>
            <el-switch v-model="cfg.scrollToError" />
            <div class="help-text">校验失败时是否滚动到错误字段</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">滚动偏移</div>
            <div class="prop-name">scroll-offset</div>
            <el-input-number v-model="cfg.scrollOffset" :min="0" :max="200" />
            <div class="help-text">滚动到错误字段时的偏移量</div>
          </div>
        </div>
        
        <!-- 样式设置 -->
        <div class="section">
          <h4>样式设置</h4>
          
          <div class="form-item">
            <div class="label-text">自定义类名</div>
            <div class="prop-name">class</div>
            <el-input v-model="cfg.customClass" placeholder="如 custom-form" style="width: 200px;" />
            <div class="help-text">自定义表单类名</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">自定义样式</div>
            <div class="prop-name">style</div>
            <el-input v-model="cfg.customStyle" placeholder='如 {"background":"#f5f5f5"}' style="width: 200px;" />
            <div class="help-text">自定义表单样式</div>
          </div>
        </div>
        
        <!-- 表单项设置 -->
        <div class="section">
          <h4>表单项设置</h4>
          
          <div class="form-item">
            <div class="label-text">可清空</div>
            <div class="prop-name">clearable</div>
            <el-switch v-model="cfg.clearable" />
            <div class="help-text">是否显示清除按钮</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">文本域行数</div>
            <div class="prop-name">textarea-rows</div>
            <el-input-number v-model="cfg.textareaRows" :min="1" :max="10" />
            <div class="help-text">文本域行数</div>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { ElMessage } from 'element-plus'

const formRef = ref(null)
const show = ref(false)

// 表单数据
const form = reactive({
  name: '',
  age: undefined,
  city: '',
  email: '',
  hobbies: [],
  gender: '',
  birthday: '',
  description: ''
})

// 配置对象
const cfg = reactive({
  // 基础属性
  labelWidth: '80px',
  labelPosition: 'right',
  labelSuffix: '',
  inline: false,
  size: 'default',
  
  // 校验设置
  disabled: false,
  validateOnRuleChange: true,
  hideRequiredAsterisk: false,
  showMessage: true,
  inlineMessage: false,
  statusIcon: false,
  validateTrigger: ['blur'],
  
  // 滚动设置
  scrollToError: false,
  scrollOffset: 0,
  
  // 样式设置
  customClass: '',
  customStyle: '',
  
  // 表单项设置
  clearable: true,
  textareaRows: 3
})

// 校验规则
const rules = computed(() => ({
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' }
  ],
  age: [
    { required: true, message: '请输入年龄', trigger: 'blur' },
    { type: 'number', message: '年龄必须为数字', trigger: 'blur' }
  ],
  city: [
    { required: true, message: '请选择城市', trigger: 'change' }
  ],
  email: [
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  hobbies: [
    { required: true, message: '请选择爱好', trigger: 'change' }
  ],
  gender: [
    { required: true, message: '请选择性别', trigger: 'change' }
  ],
  birthday: [
    { required: true, message: '请选择生日', trigger: 'change' }
  ],
  description: [
    { required: true, message: '请输入个人简介', trigger: 'blur' }
  ]
}))

// 事件处理
const onUI = (name) => ElMessage.info(`触发事件: ${name}`)
const onLog = (name) => console.debug('[FormDemo]', name)

const submit = () => {
  formRef.value?.validate((valid) => {
    if (valid) {
      ElMessage.success('提交成功')
    } else {
      ElMessage.error('校验失败')
    }
  })
}

const reset = () => {
  formRef.value?.resetFields()
  ElMessage.info('表单已重置')
}

const validate = () => {
  formRef.value?.validate()
}

const clearValidate = () => {
  formRef.value?.clearValidate()
  ElMessage.info('校验已清除')
}
</script>

<style scoped>
.demo-page { padding: 12px; }
.card-header { font-weight: 600; display: flex; justify-content: space-between; align-items: center; }
.status { margin: 12px 0; padding: 8px; background: #f5f7fa; border-radius: 4px; font-size: 12px; }

.drawer-content { padding: 0 8px; }
.section { margin-bottom: 24px; padding: 20px; background: #fafafa; border-radius: 8px; }
.section h4 { margin: 0 0 20px 0; font-size: 16px; font-weight: 600; color: #303133; border-bottom: 2px solid #e4e7ed; padding-bottom: 8px; }

.form-item { margin-bottom: 24px; padding: 16px; background: #fff; border-radius: 6px; border: 1px solid #e4e7ed; }
.label-text { font-size: 14px; font-weight: 600; color: #303133; margin-bottom: 4px; }
.prop-name { font-size: 12px; color: #409eff; background: #ecf5ff; padding: 2px 6px; border-radius: 3px; display: inline-block; margin-bottom: 12px; font-family: 'Courier New', monospace; }
.help-text { font-size: 12px; color: #909399; margin-top: 8px; line-height: 1.4; }
</style>