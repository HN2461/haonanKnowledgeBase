<template>
  <div class="demo-container">
    <div class="demo-header">
      <h2>分页 Pagination</h2>
      <p>当数据量过多时，使用分页分解数据，支持页码跳转、每页条数设置等</p>
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
          <h4>分页演示</h4>
          <el-pagination
            :current-page="currentPage"
            :page-size="pageSize"
            :page-sizes="cfg.pageSizes"
            :total="cfg.total"
            :layout="cfg.layout"
            :background="cfg.background"
            :small="cfg.small"
            :disabled="cfg.disabled"
            :hide-on-single-page="cfg.hideOnSinglePage"
            :pager-count="cfg.pagerCount"
            :prev-text="cfg.prevText"
            :next-text="cfg.nextText"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            @prev-click="handlePrevClick"
            @next-click="handleNextClick"
        />
        </div>

        <div class="demo-section">
          <h4>简单分页演示</h4>
          <el-pagination
            :current-page="simplePage"
            :total="50"
            layout="prev, pager, next"
            @current-change="handleSimpleChange"
        />
        </div>

        <div class="demo-section">
          <h4>完整功能分页演示</h4>
          <el-pagination
            :current-page="fullPage"
            :page-size="fullPageSize"
            :page-sizes="[10, 20, 50, 100]"
            :total="400"
            layout="total, sizes, prev, pager, next, jumper"
            background
            @size-change="handleFullSizeChange"
            @current-change="handleFullChange"
        />
        </div>

        <div class="demo-section">
          <h4>状态显示</h4>
          <p><strong>当前页：</strong>{{ currentPage }}</p>
          <p><strong>每页条数：</strong>{{ pageSize }}</p>
          <p><strong>总条数：</strong>{{ cfg.total }}</p>
          <p><strong>布局：</strong>{{ cfg.layout }}</p>
          <p><strong>背景色：</strong>{{ cfg.background ? '是' : '否' }}</p>
          <p><strong>小尺寸：</strong>{{ cfg.small ? '是' : '否' }}</p>
          <p><strong>禁用：</strong>{{ cfg.disabled ? '是' : '否' }}</p>
          <p><strong>单页隐藏：</strong>{{ cfg.hideOnSinglePage ? '是' : '否' }}</p>
          <p><strong>页码数量：</strong>{{ cfg.pagerCount }}</p>
          <p><strong>上一页文字：</strong>{{ cfg.prevText }}</p>
          <p><strong>下一页文字：</strong>{{ cfg.nextText }}</p>
        </div>
      </el-card>
    </div>

    <!-- 属性设置抽屉 -->
    <el-drawer
      v-model="showSettings"
      title="分页属性设置"
      direction="rtl"
      size="45%"
    >
      <div class="settings-container">
        <!-- 基础属性 -->
        <div class="form-section">
          <div class="section-title">基础属性</div>
          
          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">total</span>
              <span class="help-text">总条目数</span>
            </div>
            <el-input-number v-model="cfg.total" :min="0" :max="10000" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">pageSizes</span>
              <span class="help-text">每页显示个数选择器的选项设置</span>
            </div>
            <div class="page-sizes-container">
              <el-input-number v-for="(size, index) in cfg.pageSizes" :key="index" v-model="cfg.pageSizes[index]" :min="1" :max="1000" />
              <el-button type="primary" size="small" @click="addPageSize">添加</el-button>
              <el-button type="danger" size="small" @click="removePageSize">删除</el-button>
            </div>
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">layout</span>
              <span class="help-text">组件布局</span>
            </div>
            <el-input v-model="cfg.layout" placeholder="如: total, sizes, prev, pager, next, jumper" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">pagerCount</span>
              <span class="help-text">页码按钮的数量</span>
            </div>
            <el-input-number v-model="cfg.pagerCount" :min="5" :max="21" />
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

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">small</span>
              <span class="help-text">是否使用小型分页样式</span>
            </div>
            <el-switch v-model="cfg.small" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">background</span>
              <span class="help-text">是否为分页按钮添加背景色</span>
            </div>
            <el-switch v-model="cfg.background" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">hideOnSinglePage</span>
              <span class="help-text">只有一页时是否隐藏</span>
            </div>
            <el-switch v-model="cfg.hideOnSinglePage" />
          </div>
        </div>

        <!-- 文字属性 -->
        <div class="form-section">
          <div class="section-title">文字属性</div>
          
          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">prevText</span>
              <span class="help-text">替代图标，上一页文字</span>
            </div>
            <el-input v-model="cfg.prevText" placeholder="如: 上一页" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">nextText</span>
              <span class="help-text">替代图标，下一页文字</span>
            </div>
            <el-input v-model="cfg.nextText" placeholder="如: 下一页" />
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
const currentPage = ref(1)
const pageSize = ref(10)
const simplePage = ref(1)
const fullPage = ref(1)
const fullPageSize = ref(20)

// 配置对象
const cfg = reactive({
  total: 100,
  pageSizes: [10, 20, 50, 100],
  layout: 'total, sizes, prev, pager, next, jumper',
  background: false,
  small: false,
  disabled: false,
  hideOnSinglePage: false,
  pagerCount: 7,
  prevText: '',
  nextText: ''
})

// 事件处理
const handleSizeChange = (val) => {
  console.log('每页条数改变:', val)
  ElMessage.success(`每页条数: ${val}`)
}

const handleCurrentChange = (val) => {
  console.log('当前页改变:', val)
  ElMessage.success(`当前页: ${val}`)
}

const handlePrevClick = (val) => {
  console.log('上一页点击:', val)
  ElMessage.info('上一页')
}

const handleNextClick = (val) => {
  console.log('下一页点击:', val)
  ElMessage.info('下一页')
}

const handleSimpleChange = (val) => {
  console.log('简单分页改变:', val)
  ElMessage.success(`简单分页: ${val}`)
}

const handleFullSizeChange = (val) => {
  console.log('完整分页每页条数改变:', val)
  ElMessage.success(`完整分页每页条数: ${val}`)
}

const handleFullChange = (val) => {
  console.log('完整分页当前页改变:', val)
  ElMessage.success(`完整分页当前页: ${val}`)
}

// 每页条数管理
const addPageSize = () => {
  cfg.pageSizes.push(50)
}

const removePageSize = () => {
  if (cfg.pageSizes.length > 1) {
    cfg.pageSizes.pop()
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

.page-sizes-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}
</style>
