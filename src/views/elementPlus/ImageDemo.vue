<template>
  <div class="demo-container">
    <div class="demo-header">
      <h2>图片 Image</h2>
      <p>图片容器，在保留原生img的特性下，支持懒加载，自定义占位、加载失败等</p>
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
          <h4>图片演示</h4>
          <el-image
            :src="cfg.src"
            :fit="cfg.fit"
            :alt="cfg.alt"
            :referrer-policy="cfg.referrerPolicy"
            :lazy="cfg.lazy"
            :scroll-container="cfg.scrollContainer"
            :preview-src-list="cfg.previewSrcList"
            :z-index="cfg.zIndex"
            :initial-index="cfg.initialIndex"
            :infinite="cfg.infinite"
            :hide-on-click-modal="cfg.hideOnClickModal"
            :teleported="cfg.teleported"
            :append-to-body="cfg.appendToBody"
            :preview-teleported="cfg.previewTeleported"
            @load="handleLoad"
            @error="handleError"
            @switch="handleSwitch"
            @close="handleClose"
            @show="handleShow"
        />
        </div>

        <div class="demo-section">
          <h4>不同适应方式演示</h4>
          <div class="image-group">
            <div class="image-item">
              <el-image
                src="https://fuss10.elemecdn.com/e/5d/4a1a3c305c64bed9a4ba3c43c43f7jpeg.jpeg"
                fit="fill"
                style="width: 100px; height: 100px;"
              />
              <p>fill</p>
            </div>
            <div class="image-item">
              <el-image
                src="https://fuss10.elemecdn.com/e/5d/4a1a3c305c64bed9a4ba3c43c43f7jpeg.jpeg"
                fit="contain"
                style="width: 100px; height: 100px;"
              />
              <p>contain</p>
            </div>
            <div class="image-item">
              <el-image
                src="https://fuss10.elemecdn.com/e/5d/4a1a3c305c64bed9a4ba3c43c43f7jpeg.jpeg"
                fit="cover"
                style="width: 100px; height: 100px;"
              />
              <p>cover</p>
            </div>
            <div class="image-item">
              <el-image
                src="https://fuss10.elemecdn.com/e/5d/4a1a3c305c64bed9a4ba3c43c43f7jpeg.jpeg"
                fit="none"
                style="width: 100px; height: 100px;"
              />
              <p>none</p>
            </div>
            <div class="image-item">
              <el-image
                src="https://fuss10.elemecdn.com/e/5d/4a1a3c305c64bed9a4ba3c43c43f7jpeg.jpeg"
                fit="scale-down"
                style="width: 100px; height: 100px;"
              />
              <p>scale-down</p>
            </div>
          </div>
        </div>

        <div class="demo-section">
          <h4>懒加载演示</h4>
          <div class="lazy-images">
            <el-image
              v-for="(item, index) in lazyImages"
              :key="index"
              :src="item.src"
              lazy
              style="width: 200px; height: 200px; margin: 10px;"
            />
          </div>
        </div>

        <div class="demo-section">
          <h4>状态显示</h4>
          <p><strong>图片源：</strong>{{ cfg.src }}</p>
          <p><strong>适应方式：</strong>{{ cfg.fit }}</p>
          <p><strong>替代文本：</strong>{{ cfg.alt }}</p>
          <p><strong>懒加载：</strong>{{ cfg.lazy ? '是' : '否' }}</p>
          <p><strong>预览图片列表：</strong>{{ cfg.previewSrcList.length }} 张</p>
          <p><strong>层级：</strong>{{ cfg.zIndex }}</p>
          <p><strong>初始索引：</strong>{{ cfg.initialIndex }}</p>
          <p><strong>无限循环：</strong>{{ cfg.infinite ? '是' : '否' }}</p>
        </div>
      </el-card>
    </div>

    <!-- 属性设置抽屉 -->
    <el-drawer
      v-model="showSettings"
      title="图片属性设置"
      direction="rtl"
      size="45%"
    >
      <div class="settings-container">
        <!-- 基础属性 -->
        <div class="form-section">
          <div class="section-title">基础属性</div>
          
          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">src</span>
              <span class="help-text">图片源地址</span>
            </div>
            <el-input v-model="cfg.src" placeholder="请输入图片地址" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">fit</span>
              <span class="help-text">确定图片如何适应容器框</span>
            </div>
            <el-radio-group v-model="cfg.fit">
              <el-radio-button label="fill">fill</el-radio-button>
              <el-radio-button label="contain">contain</el-radio-button>
              <el-radio-button label="cover">cover</el-radio-button>
              <el-radio-button label="none">none</el-radio-button>
              <el-radio-button label="scale-down">scale-down</el-radio-button>
            </el-radio-group>
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">alt</span>
              <span class="help-text">原生alt属性</span>
            </div>
            <el-input v-model="cfg.alt" placeholder="请输入替代文本" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">referrerPolicy</span>
              <span class="help-text">原生referrerPolicy属性</span>
            </div>
            <el-select v-model="cfg.referrerPolicy" placeholder="请选择">
              <el-option label="no-referrer" value="no-referrer" />
              <el-option label="no-referrer-when-downgrade" value="no-referrer-when-downgrade" />
              <el-option label="origin" value="origin" />
              <el-option label="origin-when-cross-origin" value="origin-when-cross-origin" />
              <el-option label="same-origin" value="same-origin" />
              <el-option label="strict-origin" value="strict-origin" />
              <el-option label="strict-origin-when-cross-origin" value="strict-origin-when-cross-origin" />
              <el-option label="unsafe-url" value="unsafe-url" />
            </el-select>
          </div>
        </div>

        <!-- 懒加载属性 -->
        <div class="form-section">
          <div class="section-title">懒加载属性</div>
          
          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">lazy</span>
              <span class="help-text">是否开启懒加载</span>
            </div>
            <el-switch v-model="cfg.lazy" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">scrollContainer</span>
              <span class="help-text">开启懒加载后，监听scroll事件的容器</span>
            </div>
            <el-input v-model="cfg.scrollContainer" placeholder="如: .el-scrollbar__wrap" />
          </div>
        </div>

        <!-- 预览属性 -->
        <div class="form-section">
          <div class="section-title">预览属性</div>
          
          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">previewSrcList</span>
              <span class="help-text">开启图片预览功能</span>
            </div>
            <div class="preview-list">
              <el-input
                v-for="(item, index) in cfg.previewSrcList"
                :key="index"
                v-model="cfg.previewSrcList[index]"
                placeholder="预览图片地址"
              />
              <el-button type="primary" size="small" @click="addPreviewSrc">添加</el-button>
              <el-button type="danger" size="small" @click="removePreviewSrc">删除</el-button>
            </div>
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">zIndex</span>
              <span class="help-text">设置图片预览的z-index</span>
            </div>
            <el-input-number v-model="cfg.zIndex" :min="0" :max="9999" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">initialIndex</span>
              <span class="help-text">初始预览图像索引</span>
            </div>
            <el-input-number v-model="cfg.initialIndex" :min="0" :max="cfg.previewSrcList.length - 1" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">infinite</span>
              <span class="help-text">是否可以无限循环预览</span>
            </div>
            <el-switch v-model="cfg.infinite" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">hideOnClickModal</span>
              <span class="help-text">点击遮罩层关闭预览</span>
            </div>
            <el-switch v-model="cfg.hideOnClickModal" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">teleported</span>
              <span class="help-text">是否将弹出层插入至body元素</span>
            </div>
            <el-switch v-model="cfg.teleported" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">appendToBody</span>
              <span class="help-text">是否将弹出层插入至body元素</span>
            </div>
            <el-switch v-model="cfg.appendToBody" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">previewTeleported</span>
              <span class="help-text">是否将预览弹出层插入至body元素</span>
            </div>
            <el-switch v-model="cfg.previewTeleported" />
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
  src: 'https://fuss10.elemecdn.com/e/5d/4a1a3c305c64bed9a4ba3c43c43f7jpeg.jpeg',
  fit: 'cover',
  alt: '图片',
  referrerPolicy: 'strict-origin-when-cross-origin',
  lazy: false,
  scrollContainer: '',
  previewSrcList: [
    'https://fuss10.elemecdn.com/e/5d/4a1a3c305c64bed9a4ba3c43c43f7jpeg.jpeg',
    'https://fuss10.elemecdn.com/a/3f/3302e58f9a607d92088f3f9c6b0d8jpeg.jpeg',
    'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg'
  ],
  zIndex: 2000,
  initialIndex: 0,
  infinite: true,
  hideOnClickModal: true,
  teleported: true,
  appendToBody: true,
  previewTeleported: true
})

// 懒加载图片数据
const lazyImages = ref([
  { src: 'https://fuss10.elemecdn.com/e/5d/4a1a3c305c64bed9a4ba3c43c43f7jpeg.jpeg' },
  { src: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a607d92088f3f9c6b0d8jpeg.jpeg' },
  { src: 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg' },
  { src: 'https://fuss10.elemecdn.com/0/6c/e75da1e244ba5e1c6c8e7a2e8e5a8jpeg.jpeg' },
  { src: 'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdejpeg.jpeg' }
])

// 事件处理
const handleLoad = (event) => {
  console.log('图片加载成功:', event)
  ElMessage.success('图片加载成功')
}

const handleError = (event) => {
  console.log('图片加载失败:', event)
  ElMessage.error('图片加载失败')
}

const handleSwitch = (index) => {
  console.log('切换图片:', index)
  ElMessage.info(`切换到第 ${index + 1} 张图片`)
}

const handleClose = () => {
  console.log('关闭预览')
  ElMessage.info('关闭预览')
}

const handleShow = (index) => {
  console.log('显示预览:', index)
  ElMessage.info(`显示第 ${index + 1} 张图片`)
}

// 预览图片管理
const addPreviewSrc = () => {
  cfg.previewSrcList.push('')
}

const removePreviewSrc = () => {
  if (cfg.previewSrcList.length > 1) {
    cfg.previewSrcList.pop()
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

.image-group {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.image-item {
  text-align: center;
}

.image-item p {
  margin: 5px 0 0 0;
  font-size: 12px;
  color: #909399;
}

.lazy-images {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
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

.preview-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
