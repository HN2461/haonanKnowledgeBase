<template>
  <div class="demo-page">
    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <span>Upload 上传</span>
          <el-button type="primary" @click="show = true">属性设置</el-button>
        </div>
      </template>

      <!-- 预览上传组件 -->
      <div class="row">
        <el-upload ref="uploadRef" class="upload-demo" :action="cfg.action"
          :headers="cfg.headers ? JSON.parse(cfg.headers) : undefined" :method="cfg.method" :multiple="cfg.multiple"
          :data="cfg.data ? JSON.parse(cfg.data) : undefined" :name="cfg.name" :with-credentials="cfg.withCredentials"
          :show-file-list="cfg.showFileList" :drag="cfg.drag" :accept="cfg.accept" :on-preview="handlePreview"
          :on-remove="handleRemove" :on-success="handleSuccess" :on-error="handleError" :on-progress="handleProgress"
          :on-change="handleChange" :before-upload="beforeUpload" :before-remove="beforeRemove"
          :list-type="cfg.listType" :auto-upload="cfg.autoUpload" :file-list="fileList"
          :http-request="cfg.customRequest ? customRequest : undefined" :disabled="cfg.disabled" :limit="cfg.limit"
          :on-exceed="handleExceed" :on-before-upload="onBeforeUpload" :on-before-remove="onBeforeRemove"
          :on-after-read="onAfterRead" :on-oversize="onOversize" :before-read="beforeRead" :after-read="afterRead"
          :max-size="cfg.maxSize" :max-count="cfg.maxCount" :result-type="cfg.resultType" :upload-text="cfg.uploadText"
          :upload-icon="uploadIconComp" :delete-icon="deleteIconComp" :preview-icon="previewIconComp" :tip="cfg.tip"
          :trigger="cfg.trigger" :popper-class="cfg.popperClass" :popper-style="cfg.popperStyle"
          :teleported="cfg.teleported" :teleport-to="cfg.teleportTo" :validate-event="cfg.validateEvent"
          :size="cfg.size" :status-icon="cfg.statusIcon" :effect="cfg.effect">
          <template v-if="cfg.drag">
            <el-icon class="el-icon--upload">
              <UploadFilled />
            </el-icon>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </template>
          <template v-else>
            <el-button type="primary" :icon="UploadFilled">选择文件</el-button>
          </template>
        </el-upload>
      </div>

      <!-- 状态显示 -->
      <div class="status">
        <div>文件数量: {{ fileList.length }}</div>
        <div>上传地址: {{ cfg.action }}</div>
        <div>自动上传: {{ cfg.autoUpload ? '是' : '否' }}</div>
      </div>
    </el-card>

    <el-drawer v-model="show" title="上传属性设置" size="45%">
      <div class="drawer-content">
        <el-alert type="info" show-icon :closable="false" style="margin-bottom: 20px;"
          description="提示：1) 上传地址需要后端支持；2) 自定义请求可以模拟上传过程；3) 文件类型限制通过 accept 属性设置。" />

        <!-- 使用说明 -->
        <div class="section">
          <h4>使用说明</h4>

          <div class="usage-item">
            <h5>1. 基础用法</h5>
            <div class="code-block">
              <pre><code>&lt;el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              :file-list="fileList"
              @change="handleChange"
              &gt;
              &lt;el-button type="primary"&gt;点击上传&lt;/el-button&gt;
              &lt;/el-upload&gt;</code></pre>
            </div>
          </div>

          <div class="usage-item">
            <h5>2. 拖拽上传</h5>
            <div class="code-block">
              <pre><code>&lt;el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              :file-list="fileList"
              :drag="true"
              @change="handleChange"
              &gt;
              &lt;el-icon class="el-icon--upload"&gt;&lt;upload-filled /&gt;&lt;/el-icon&gt;
              &lt;div class="el-upload__text"&gt;
              将文件拖到此处，或&lt;em&gt;点击上传&lt;/em&gt;
              &lt;/div&gt;
              &lt;/el-upload&gt;</code></pre>
            </div>
          </div>

          <div class="usage-item">
            <h5>3. 多文件上传</h5>
            <div class="code-block">
              <pre><code>&lt;el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              :file-list="fileList"
              :multiple="true"
              @change="handleChange"
              &gt;
              &lt;el-button type="primary"&gt;多文件上传&lt;/el-button&gt;
              &lt;/el-upload&gt;</code></pre>
            </div>
          </div>

          <div class="usage-item">
            <h5>4. 文件类型限制</h5>
            <div class="code-block">
              <pre><code>&lt;el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              :file-list="fileList"
              accept=".jpg,.png,.gif"
              :before-upload="beforeUpload"
              @change="handleChange"
              &gt;
              &lt;el-button type="primary"&gt;只能上传图片&lt;/el-button&gt;
              &lt;/el-upload&gt;

              &lt;script setup&gt;
              const beforeUpload = (file) => {
              const isImage = file.type.startsWith('image/')
              if (!isImage) {
              ElMessage.error('只能上传图片文件!')
              return false
              }
              return true
              }
              &lt;/script&gt;</code></pre>
            </div>
          </div>

          <div class="usage-item">
            <h5>5. 文件大小限制</h5>
            <div class="code-block">
              <pre><code>&lt;el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              :file-list="fileList"
              :before-upload="beforeUpload"
              @change="handleChange"
              &gt;
              &lt;el-button type="primary"&gt;上传文件&lt;/el-button&gt;
              &lt;/el-upload&gt;

              &lt;script setup&gt;
              const beforeUpload = (file) => {
              const isLt2M = file.size / 1024 / 1024 < 2 if (!isLt2M) { ElMessage.error('文件大小不能超过 2MB!') return false }
                return true } &lt;/script&gt;</code>
          </pre>
            </div>
          </div>

          <div class="usage-item">
            <h5>6. 自定义上传</h5>
            <div class="code-block">
              <pre><code>&lt;el-upload
              :file-list="fileList"
              :http-request="customRequest"
              @change="handleChange"
              &gt;
              &lt;el-button type="primary"&gt;自定义上传&lt;/el-button&gt;
              &lt;/el-upload&gt;

              &lt;script setup&gt;
              const customRequest = (options) => {
              // 自定义上传逻辑
              const formData = new FormData()
              formData.append('file', options.file)

              // 模拟上传
              setTimeout(() => {
              options.onSuccess({ url: 'https://example.com/uploaded-file.jpg' })
              }, 1000)
              }
              &lt;/script&gt;</code></pre>
            </div>
          </div>

          <div class="usage-item">
            <h5>7. 事件处理</h5>
            <div class="code-block">
              <pre><code>&lt;el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              :file-list="fileList"
              @change="handleChange"
              @success="handleSuccess"
              @error="handleError"
              @progress="handleProgress"
              @remove="handleRemove"
              &gt;
              &lt;el-button type="primary"&gt;上传文件&lt;/el-button&gt;
              &lt;/el-upload&gt;

              &lt;script setup&gt;
              const handleChange = (file, fileList) => {
              console.log('文件列表改变:', file, fileList)
              }

              const handleSuccess = (response, file, fileList) => {
              console.log('上传成功:', response, file, fileList)
              }

              const handleError = (error, file, fileList) => {
              console.log('上传失败:', error, file, fileList)
              }

              const handleProgress = (event, file, fileList) => {
              console.log('上传进度:', event.percent, file, fileList)
              }

              const handleRemove = (file, fileList) => {
              console.log('文件移除:', file, fileList)
              }
              &lt;/script&gt;</code></pre>
            </div>
          </div>
        </div>

        <!-- 基础属性 -->
        <div class="section">
          <h4>基础属性</h4>

          <div class="form-item">
            <div class="label-text">上传地址</div>
            <div class="prop-name">action</div>
            <el-input v-model="cfg.action" placeholder="如 /api/upload" style="width: 200px;" />
            <div class="help-text">上传的地址</div>
          </div>

          <div class="form-item">
            <div class="label-text">请求方法</div>
            <div class="prop-name">method</div>
            <el-select v-model="cfg.method" style="width: 200px;">
              <el-option value="post" label="POST" />
              <el-option value="put" label="PUT" />
              <el-option value="patch" label="PATCH" />
            </el-select>
            <div class="help-text">上传请求的 HTTP method</div>
          </div>

          <div class="form-item">
            <div class="label-text">文件字段名</div>
            <div class="prop-name">name</div>
            <el-input v-model="cfg.name" placeholder="如 file" style="width: 200px;" />
            <div class="help-text">上传的文件字段名</div>
          </div>

          <div class="form-item">
            <div class="label-text">文件类型</div>
            <div class="prop-name">accept</div>
            <el-input v-model="cfg.accept" placeholder="如 .jpg,.png" style="width: 200px;" />
            <div class="help-text">接受上传的文件类型</div>
          </div>
        </div>

        <!-- 功能开关 -->
        <div class="section">
          <h4>功能开关</h4>

          <div class="form-item">
            <div class="label-text">多选文件</div>
            <div class="prop-name">multiple</div>
            <el-switch v-model="cfg.multiple" />
            <div class="help-text">是否支持多选文件</div>
          </div>

          <div class="form-item">
            <div class="label-text">拖拽上传</div>
            <div class="prop-name">drag</div>
            <el-switch v-model="cfg.drag" />
            <div class="help-text">是否启用拖拽上传</div>
          </div>

          <div class="form-item">
            <div class="label-text">自动上传</div>
            <div class="prop-name">auto-upload</div>
            <el-switch v-model="cfg.autoUpload" />
            <div class="help-text">是否在选取文件后立即进行上传</div>
          </div>

          <div class="form-item">
            <div class="label-text">显示文件列表</div>
            <div class="prop-name">show-file-list</div>
            <el-switch v-model="cfg.showFileList" />
            <div class="help-text">是否显示已上传文件列表</div>
          </div>

          <div class="form-item">
            <div class="label-text">禁用状态</div>
            <div class="prop-name">disabled</div>
            <el-switch v-model="cfg.disabled" />
            <div class="help-text">是否禁用上传</div>
          </div>
        </div>

        <!-- 限制设置 -->
        <div class="section">
          <h4>限制设置</h4>

          <div class="form-item">
            <div class="label-text">文件数量限制</div>
            <div class="prop-name">limit</div>
            <el-input-number v-model="cfg.limit" :min="1" :max="20" />
            <div class="help-text">最大允许上传个数</div>
          </div>

          <div class="form-item">
            <div class="label-text">文件大小限制</div>
            <div class="prop-name">max-size</div>
            <el-input-number v-model="cfg.maxSize" :min="1" :max="10000" />
            <div class="help-text">文件大小限制（MB）</div>
          </div>

          <div class="form-item">
            <div class="label-text">最大文件数</div>
            <div class="prop-name">max-count</div>
            <el-input-number v-model="cfg.maxCount" :min="1" :max="20" />
            <div class="help-text">最大允许上传文件个数</div>
          </div>
        </div>

        <!-- 列表设置 -->
        <div class="section">
          <h4>列表设置</h4>

          <div class="form-item">
            <div class="label-text">列表类型</div>
            <div class="prop-name">list-type</div>
            <el-select v-model="cfg.listType" style="width: 200px;">
              <el-option value="text" label="text（文本）" />
              <el-option value="picture" label="picture（图片）" />
              <el-option value="picture-card" label="picture-card（图片卡片）" />
            </el-select>
            <div class="help-text">文件列表的类型</div>
          </div>

          <div class="form-item">
            <div class="label-text">上传文本</div>
            <div class="prop-name">upload-text</div>
            <el-input v-model="cfg.uploadText" placeholder="如 点击上传" style="width: 200px;" />
            <div class="help-text">上传按钮的文本</div>
          </div>

          <div class="form-item">
            <div class="label-text">提示文本</div>
            <div class="prop-name">tip</div>
            <el-input v-model="cfg.tip" placeholder="如 只能上传jpg/png文件" style="width: 200px;" />
            <div class="help-text">提示文本</div>
          </div>
        </div>

        <!-- 高级设置 -->
        <div class="section">
          <h4>高级设置</h4>

          <div class="form-item">
            <div class="label-text">请求头</div>
            <div class="prop-name">headers</div>
            <el-input v-model="cfg.headers" placeholder='如 {"Authorization":"Bearer token"}' style="width: 200px;" />
            <div class="help-text">设置上传的请求头部</div>
          </div>

          <div class="form-item">
            <div class="label-text">额外数据</div>
            <div class="prop-name">data</div>
            <el-input v-model="cfg.data" placeholder='如 {"userId":123}' style="width: 200px;" />
            <div class="help-text">上传时附带的额外参数</div>
          </div>

          <div class="form-item">
            <div class="label-text">携带凭证</div>
            <div class="prop-name">with-credentials</div>
            <el-switch v-model="cfg.withCredentials" />
            <div class="help-text">支持发送 cookie 凭证信息</div>
          </div>

          <div class="form-item">
            <div class="label-text">自定义请求</div>
            <div class="prop-name">http-request</div>
            <el-switch v-model="cfg.customRequest" />
            <div class="help-text">覆盖默认的上传行为，可以自定义上传的实现</div>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { UploadFilled, Delete, View, CircleClose } from '@element-plus/icons-vue'

const show = ref(false)
const uploadRef = ref(null)
const fileList = ref([])

// 配置对象
const cfg = reactive({
  action: '#',
  headers: '',
  method: 'post',
  multiple: true,
  data: '',
  name: 'file',
  withCredentials: false,
  showFileList: true,
  drag: true,
  accept: '',
  listType: 'text',
  autoUpload: false,
  customRequest: false,
  disabled: false,
  limit: 5,
  maxSize: 10,
  maxCount: 5,
  uploadText: '点击上传',
  tip: '',
  popperClass: '',
  popperStyle: '',
  teleported: true,
  teleportTo: '',
  validateEvent: true,
  size: 'default',
  statusIcon: false,
  effect: 'light'
})

// 计算属性
const uploadIconComp = computed(() => UploadFilled)
const deleteIconComp = computed(() => Delete)
const previewIconComp = computed(() => View)

// 自定义上传请求
const customRequest = (options) => {
  console.log('自定义上传请求', options)
  const { file, onProgress, onSuccess, onError } = options

  // 模拟上传进度
  let progress = 0
  const timer = setInterval(() => {
    progress += 10
    onProgress({ percent: progress })

    if (progress >= 100) {
      clearInterval(timer)
      if (Math.random() > 0.1) {
        onSuccess({ message: '上传成功' })
        ElMessage.success('上传成功')
      } else {
        onError(new Error('上传失败'))
        ElMessage.error('上传失败')
      }
    }
  }, 200)
}

// 事件处理
const handlePreview = (file) => {
  console.log('预览文件', file)
  ElMessage.info(`预览文件: ${file.name}`)
}

const handleRemove = (file, fileList) => {
  console.log('移除文件', file, fileList)
  ElMessage.info(`移除文件: ${file.name}`)
}

const handleSuccess = (response, file, fileList) => {
  console.log('上传成功', response, file, fileList)
  ElMessage.success(`上传成功: ${file.name}`)
}

const handleError = (error, file, fileList) => {
  console.log('上传失败', error, file, fileList)
  ElMessage.error(`上传失败: ${file.name}`)
}

const handleProgress = (event, file, fileList) => {
  console.log('上传进度', event, file, fileList)
}

const handleChange = (file, fileList) => {
  console.log('文件变化', file, fileList)
}

const beforeUpload = (file) => {
  console.log('上传前', file)
  if (file.size > cfg.maxSize * 1024 * 1024) {
    ElMessage.error(`文件大小不能超过 ${cfg.maxSize}MB`)
    return false
  }
  return true
}

const beforeRemove = (file, fileList) => {
  console.log('移除前', file, fileList)
  return true
}

const handleExceed = (files, fileList) => {
  console.log('超出限制', files, fileList)
  ElMessage.warning(`最多只能上传 ${cfg.limit} 个文件`)
}

const onBeforeUpload = (file) => {
  console.log('上传前钩子', file)
}

const onBeforeRemove = (file, fileList) => {
  console.log('移除前钩子', file, fileList)
}

const onAfterRead = (file, fileList) => {
  console.log('读取后钩子', file, fileList)
}

const onOversize = (file, fileList) => {
  console.log('文件过大', file, fileList)
  ElMessage.error(`文件 ${file.name} 大小超出限制`)
}

const beforeRead = (file) => {
  console.log('读取前', file)
  return true
}

const afterRead = (file, fileList) => {
  console.log('读取后', file, fileList)
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

.row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 12px;
}

.status {
  margin: 12px 0;
  padding: 8px;
  background: #f5f7fa;
  border-radius: 4px;
  font-size: 12px;
}

.upload-demo {
  width: 100%;
}

.drawer-content {
  padding: 0 8px;
}

.section {
  margin-bottom: 24px;
  padding: 20px;
  background: #fafafa;
  border-radius: 8px;
}

.section h4 {
  margin: 0 0 20px 0;
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  border-bottom: 2px solid #e4e7ed;
  padding-bottom: 8px;
}

.form-item {
  margin-bottom: 24px;
  padding: 16px;
  background: #fff;
  border-radius: 6px;
  border: 1px solid #e4e7ed;
}

.label-text {
  font-size: 14px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 4px;
}

.prop-name {
  font-size: 12px;
  color: #409eff;
  background: #ecf5ff;
  padding: 2px 6px;
  border-radius: 3px;
  display: inline-block;
  margin-bottom: 12px;
  font-family: 'Courier New', monospace;
}

.help-text {
  font-size: 12px;
  color: #909399;
  margin-top: 8px;
  line-height: 1.4;
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