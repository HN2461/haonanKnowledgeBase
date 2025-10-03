<template>
  <div class="upload-page">
    <el-card shadow="hover" class="upload-card">
      <template #header>
        <div class="card-header">
          <span>文件上传</span>
          <div class="actions">
            <el-button type="primary" :disabled="fileList.length === 0" @click="submitUpload">开始上传</el-button>
            <el-button @click="clearFiles">清空</el-button>
          </div>
        </div>
      </template>

      <el-upload
        ref="uploadRef"
        class="upload-area"
        drag
        multiple
        :auto-upload="false"
        :limit="5"
        :file-list="fileList"
        :on-exceed="handleExceed"
        :on-remove="handleRemove"
        :on-change="handleChange"
        :http-request="mockRequest"
      >
        <el-icon class="el-icon--upload"><UploadFilled /></el-icon>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <template #tip>
          <div class="el-upload__tip">支持格式不限，单次最多选择 5 个文件；此示例使用模拟请求</div>
        </template>
      </el-upload>

      <div class="options">
        <el-checkbox v-model="withProgress">显示进度</el-checkbox>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const uploadRef = ref(null)
const fileList = ref([])
const withProgress = ref(true)

const submitUpload = () => {
  if (!uploadRef.value) return
  if (fileList.value.length === 0) {
    ElMessage.warning('请先选择文件')
    return
  }
  uploadRef.value.submit()
}

const clearFiles = () => {
  fileList.value = []
}

const handleExceed = () => {
  ElMessage.warning('最多只能选择 5 个文件')
}

const handleRemove = () => {}
const handleChange = (file, files) => {
  fileList.value = files
}

const mockRequest = (options) => {
  console.log('自定义上传请求',options)
  const { file, onProgress, onSuccess, onError } = options
  const total = 100
  let loaded = 0

  const timer = setInterval(() => {
    loaded += 10
    if (withProgress.value && typeof onProgress === 'function') {
      onProgress({ percent: Math.min(loaded, total) })
    }
    if (loaded >= total) {
      clearInterval(timer)
      if (Math.random() < 0.95) {
        onSuccess && onSuccess({ code: 0, message: 'ok', name: file.name })
        ElMessage.success(`${file.name} 上传成功（模拟）`)
      } else {
        onError && onError(new Error('网络错误（模拟）'))
        ElMessage.error(`${file.name} 上传失败（模拟）`)
      }
    }
  }, 150)
}
</script>

<style scoped>
.upload-page {
  padding: 12px;
}

.upload-card {
  border: none;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.actions {
  display: flex;
  gap: 8px;
}

.upload-area {
  width: 100%;
}

.options {
  margin-top: 12px;
}
</style>

