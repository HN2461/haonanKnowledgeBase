<template>
  <div class="demo-page">
    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <span>Table 表格</span>
          <el-button type="primary" @click="openDrawer">属性设置</el-button>
        </div>
      </template>

      <!-- 预览表格 -->
      <div class="row">
        <el-input v-model="keyword" placeholder="搜索姓名" style="max-width: 220px;" clearable />
        <el-button @click="refresh">刷新数据</el-button>
      </div>

      <el-table :data="filteredData" :stripe="cfg.stripe" :border="cfg.border" :size="cfg.size" :height="cfg.height"
        :max-height="cfg.maxHeight" :fit="cfg.fit" :show-header="cfg.showHeader"
        :highlight-current-row="cfg.highlightCurrentRow" :row-class-name="cfg.rowClassName ? rowClassNameFn : null"
        :row-style="cfg.rowStyle ? rowStyleFn : null" :cell-class-name="cfg.cellClassName ? cellClassNameFn : null"
        :cell-style="cfg.cellStyle ? cellStyleFn : null" :header-row-class-name="cfg.headerRowClassName || null"
        :header-row-style="cfg.headerRowStyle ? headerRowStyleFn : null"
        :header-cell-class-name="cfg.headerCellClassName || null"
        :header-cell-style="cfg.headerCellStyle ? headerCellStyleFn : null" :empty-text="cfg.emptyText"
        :default-sort="cfg.defaultSort ? (() => { try { return JSON.parse(cfg.defaultSort) } catch { return undefined } })() : undefined"
        :tooltip-effect="cfg.tooltipEffect" :show-summary="cfg.showSummary" :sum-text="cfg.sumText"
        :summary-method="cfg.summaryMethod ? summaryMethodFn : null" :span-method="cfg.spanMethod ? spanMethodFn : null"
        :select-on-indeterminate="cfg.selectOnIndeterminate" :indent="cfg.indent" :lazy="cfg.lazy"
        :load="cfg.load ? loadFn : null"
        :tree-props="cfg.treeProps ? (() => { try { return JSON.parse(cfg.treeProps) } catch { return undefined } })() : undefined"
        :default-expand-all="cfg.defaultExpandAll"
        :expand-row-keys="cfg.expandRowKeys ? (() => { try { return JSON.parse(cfg.expandRowKeys) } catch { return undefined } })() : undefined"
        :row-key="cfg.rowKey" :current-row-key="cfg.currentRowKey" :empty-icon="emptyIconComp" :sort-icon="sortIconComp"
        :filter-icon="filterIconComp" :loading="cfg.loading" :element-loading-text="cfg.elementLoadingText"
        :element-loading-spinner="cfg.elementLoadingSpinner" :element-loading-svg="cfg.elementLoadingSvg"
        :element-loading-svg-view-box="cfg.elementLoadingSvgViewBox" :scrollbar-always-on="cfg.scrollbarAlwaysOn"
        :flexible="cfg.flexible" style="width: 100%" @select="onUI('select')" @select-all="onUI('select-all')"
        @selection-change="onUI('selection-change')" @cell-mouse-enter="onUI('cell-mouse-enter')"
        @cell-mouse-leave="onUI('cell-mouse-leave')" @cell-click="onUI('cell-click')"
        @cell-dblclick="onUI('cell-dblclick')" @row-click="onUI('row-click')" @row-contextmenu="onUI('row-contextmenu')"
        @row-dblclick="onUI('row-dblclick')" @header-click="onUI('header-click')"
        @header-contextmenu="onUI('header-contextmenu')" @sort-change="onUI('sort-change')"
        @filter-change="onUI('filter-change')" @current-change="onUI('current-change')"
        @header-dragend="onUI('header-dragend')" @expand-change="onUI('expand-change')">
        <el-table-column type="index" label="#" width="60" />
        <el-table-column prop="date" label="日期" width="150" :sortable="cfg.sortable" />
        <el-table-column prop="name" label="姓名" width="120" :sortable="cfg.sortable" />
        <el-table-column prop="address" label="地址" />
        <el-table-column label="操作" width="140">
          <template #default="scope">
            <el-button link type="primary" size="small" @click="edit(scope?.row)" :disabled="!scope?.row">编辑</el-button>
            <el-button link type="danger" size="small" @click="remove(scope?.$index)"
              :disabled="scope?.$index === undefined">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 状态显示 -->
      <div class="status">
        <div>数据行数: {{ filteredData.length }}</div>
        <div>表格尺寸: {{ cfg.size }}</div>
        <div>斑马纹: {{ cfg.stripe ? '是' : '否' }}</div>
        <div>边框: {{ cfg.border ? '是' : '否' }}</div>
      </div>
    </el-card>

    <el-drawer v-model="show" title="表格属性设置" size="45%" :close-on-click-modal="true">
      <div class="drawer-content">
        <el-alert type="info" show-icon :closable="false" style="margin-bottom: 20px;"
          description="提示：1) 表格支持多种显示模式；2) 排序和筛选功能需要配合列定义使用；3) 树形表格需要设置 tree-props 属性。" />

        <!-- 基础属性 -->
        <div class="section">
          <h4>基础属性</h4>

          <div class="form-item">
            <div class="label-text">尺寸</div>
            <div class="prop-name">size</div>
            <el-radio-group v-model="cfg.size">
              <el-radio-button label="default">default</el-radio-button>
              <el-radio-button label="small">small</el-radio-button>
              <el-radio-button label="large">large</el-radio-button>
            </el-radio-group>
            <div class="help-text">表格的尺寸</div>
          </div>

          <div class="form-item">
            <div class="label-text">高度</div>
            <div class="prop-name">height</div>
            <el-input v-model="cfg.height" placeholder="如 400px" style="width: 200px;" />
            <div class="help-text">表格的高度</div>
          </div>

          <div class="form-item">
            <div class="label-text">最大高度</div>
            <div class="prop-name">max-height</div>
            <el-input v-model="cfg.maxHeight" placeholder="如 400px" style="width: 200px;" />
            <div class="help-text">表格的最大高度</div>
          </div>

          <div class="form-item">
            <div class="label-text">行键</div>
            <div class="prop-name">row-key</div>
            <el-input v-model="cfg.rowKey" placeholder="如 id" style="width: 200px;" />
            <div class="help-text">行数据的 Key，用来优化 Table 的渲染</div>
          </div>
        </div>

        <!-- 显示设置 -->
        <div class="section">
          <h4>显示设置</h4>

          <div class="form-item">
            <div class="label-text">斑马纹</div>
            <div class="prop-name">stripe</div>
            <el-switch v-model="cfg.stripe" />
            <div class="help-text">是否为斑马纹 table</div>
          </div>

          <div class="form-item">
            <div class="label-text">边框</div>
            <div class="prop-name">border</div>
            <el-switch v-model="cfg.border" />
            <div class="help-text">是否带有纵向边框</div>
          </div>

          <div class="form-item">
            <div class="label-text">自适应列宽</div>
            <div class="prop-name">fit</div>
            <el-switch v-model="cfg.fit" />
            <div class="help-text">列的宽度是否自撑开</div>
          </div>

          <div class="form-item">
            <div class="label-text">显示表头</div>
            <div class="prop-name">show-header</div>
            <el-switch v-model="cfg.showHeader" />
            <div class="help-text">是否显示表头</div>
          </div>

          <div class="form-item">
            <div class="label-text">高亮当前行</div>
            <div class="prop-name">highlight-current-row</div>
            <el-switch v-model="cfg.highlightCurrentRow" />
            <div class="help-text">是否要高亮当前行</div>
          </div>
        </div>

        <!-- 功能设置 -->
        <div class="section">
          <h4>功能设置</h4>

          <div class="form-item">
            <div class="label-text">列可排序</div>
            <div class="prop-name">sortable</div>
            <el-switch v-model="cfg.sortable" />
            <div class="help-text">是否在列中显示排序按钮</div>
          </div>

          <div class="form-item">
            <div class="label-text">显示汇总</div>
            <div class="prop-name">show-summary</div>
            <el-switch v-model="cfg.showSummary" />
            <div class="help-text">是否在表尾显示合计行</div>
          </div>

          <div class="form-item">
            <div class="label-text">汇总文本</div>
            <div class="prop-name">sum-text</div>
            <el-input v-model="cfg.sumText" placeholder="如 合计" style="width: 200px;" />
            <div class="help-text">合计行第一列的文本</div>
          </div>

          <div class="form-item">
            <div class="label-text">空数据文本</div>
            <div class="prop-name">empty-text</div>
            <el-input v-model="cfg.emptyText" placeholder="如 暂无数据" style="width: 200px;" />
            <div class="help-text">空数据时显示的文本内容</div>
          </div>
        </div>

        <!-- 加载设置 -->
        <div class="section">
          <h4>加载设置</h4>

          <div class="form-item">
            <div class="label-text">加载状态</div>
            <div class="prop-name">loading</div>
            <el-switch v-model="cfg.loading" />
            <div class="help-text">是否显示加载状态</div>
          </div>

          <div class="form-item">
            <div class="label-text">加载文本</div>
            <div class="prop-name">element-loading-text</div>
            <el-input v-model="cfg.elementLoadingText" placeholder="如 加载中..." style="width: 200px;" />
            <div class="help-text">加载状态的文本</div>
          </div>
        </div>

        <!-- 高级设置 -->
        <div class="section">
          <h4>高级设置</h4>

          <div class="form-item">
            <div class="label-text">默认排序</div>
            <div class="prop-name">default-sort</div>
            <el-input v-model="cfg.defaultSort" placeholder='如 {"prop":"date","order":"descending"}'
              style="width: 200px;" />
            <div class="help-text">默认的排序列的 prop 和顺序</div>
          </div>

          <div class="form-item">
            <div class="label-text">工具提示效果</div>
            <div class="prop-name">tooltip-effect</div>
            <el-select v-model="cfg.tooltipEffect" style="width: 200px;">
              <el-option value="dark" label="dark" />
              <el-option value="light" label="light" />
            </el-select>
            <div class="help-text">tooltip effect 属性</div>
          </div>

          <div class="form-item">
            <div class="label-text">树形属性</div>
            <div class="prop-name">tree-props</div>
            <el-input v-model="cfg.treeProps" placeholder='如 {"children":"children","hasChildren":"hasChildren"}'
              style="width: 200px;" />
            <div class="help-text">渲染嵌套数据的配置选项</div>
          </div>

          <div class="form-item">
            <div class="label-text">默认展开所有</div>
            <div class="prop-name">default-expand-all</div>
            <el-switch v-model="cfg.defaultExpandAll" />
            <div class="help-text">是否默认展开所有行</div>
          </div>
        </div>

        <!-- 使用说明 -->
        <div class="section">
          <h4>使用说明</h4>

          <div class="form-item">
            <div class="label-text">基本用法</div>
            <div class="prop-name">基本用法</div>
            <div class="code-block">
              <pre><code>&lt;el-table :data="tableData"&gt;
              &lt;el-table-column prop="date" label="日期" width="180" /&gt;
              &lt;el-table-column prop="name" label="姓名" width="180" /&gt;
              &lt;el-table-column prop="address" label="地址" /&gt;
              &lt;/el-table&gt;</code></pre>
            </div>
            <div class="help-text">表格的基本使用方式，通过 data 属性传入数据</div>
          </div>

          <div class="form-item">
            <div class="label-text">带边框表格</div>
            <div class="prop-name">带边框表格</div>
            <div class="code-block">
              <pre><code>&lt;el-table :data="tableData" border&gt;
              &lt;el-table-column prop="date" label="日期" width="180" /&gt;
              &lt;el-table-column prop="name" label="姓名" width="180" /&gt;
              &lt;el-table-column prop="address" label="地址" /&gt;
              &lt;/el-table&gt;</code></pre>
            </div>
            <div class="help-text">设置 border 属性可以显示纵向边框</div>
          </div>

          <div class="form-item">
            <div class="label-text">斑马纹表格</div>
            <div class="prop-name">斑马纹表格</div>
            <div class="code-block">
              <pre><code>&lt;el-table :data="tableData" stripe&gt;
              &lt;el-table-column prop="date" label="日期" width="180" /&gt;
              &lt;el-table-column prop="name" label="姓名" width="180" /&gt;
              &lt;el-table-column prop="address" label="地址" /&gt;
              &lt;/el-table&gt;</code></pre>
            </div>
            <div class="help-text">设置 stripe 属性可以显示斑马纹</div>
          </div>

          <div class="form-item">
            <div class="label-text">可排序表格</div>
            <div class="prop-name">可排序表格</div>
            <div class="code-block">
              <pre><code>&lt;el-table :data="tableData"&gt;
              &lt;el-table-column prop="date" label="日期" width="180" sortable /&gt;
              &lt;el-table-column prop="name" label="姓名" width="180" sortable /&gt;
              &lt;el-table-column prop="address" label="地址" /&gt;
              &lt;/el-table&gt;</code></pre>
            </div>
            <div class="help-text">在列上设置 sortable 属性可以对该列进行排序</div>
          </div>

          <div class="form-item">
            <div class="label-text">带操作列</div>
            <div class="prop-name">带操作列</div>
            <div class="code-block">
              <pre><code>使用作用域插槽可以自定义列的内容
在 el-table-column 中使用 template #default="scope"
通过 scope.row 访问行数据，scope.$index 访问行索引</code></pre>
            </div>
            <div class="help-text">使用作用域插槽可以自定义列的内容</div>
          </div>

          <div class="form-item">
            <div class="label-text">多选表格</div>
            <div class="prop-name">多选表格</div>
            <div class="code-block">
              <pre><code>&lt;el-table :data="tableData" @selection-change="handleSelectionChange"&gt;
              &lt;el-table-column type="selection" width="55" /&gt;
              &lt;el-table-column prop="date" label="日期" width="180" /&gt;
              &lt;el-table-column prop="name" label="姓名" width="180" /&gt;
              &lt;el-table-column prop="address" label="地址" /&gt;
              &lt;/el-table&gt;</code></pre>
            </div>
            <div class="help-text">添加 type="selection" 的列可以显示多选框</div>
          </div>

          <div class="form-item">
            <div class="label-text">展开行</div>
            <div class="prop-name">展开行</div>
            <div class="code-block">
              <pre><code>添加 type="expand" 的列可以显示展开行
在展开行中使用 template #default="scope"
通过 scope.row 访问行数据</code></pre>
            </div>
            <div class="help-text">添加 type="expand" 的列可以显示展开行</div>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { Loading, Sort, Filter } from '@element-plus/icons-vue'

const show = ref(false)
const keyword = ref('')

// 数据源
const source = ref([
  { id: 1, date: '2024-01-01', name: '张三', address: '上海市浦东新区' },
  { id: 2, date: '2024-01-02', name: '李四', address: '北京市海淀区' },
  { id: 3, date: '2024-01-03', name: '王五', address: '广州市天河区' }
])

// 配置对象
const cfg = reactive({
  stripe: true,
  border: true,
  sortable: true,
  size: 'default',
  height: '',
  maxHeight: '',
  fit: true,
  showHeader: true,
  highlightCurrentRow: false,
  rowClassName: false,
  rowStyle: false,
  cellClassName: false,
  cellStyle: false,
  headerRowClassName: '',
  headerRowStyle: false,
  headerCellClassName: '',
  headerCellStyle: false,
  emptyText: '暂无数据',
  defaultSort: '',
  tooltipEffect: 'dark',
  showSummary: false,
  sumText: '合计',
  summaryMethod: false,
  spanMethod: false,
  selectOnIndeterminate: true,
  indent: 16,
  lazy: false,
  load: false,
  treeProps: '',
  defaultExpandAll: false,
  expandRowKeys: '',
  rowKey: 'id',
  currentRowKey: '',
  loading: false,
  elementLoadingText: '加载中...',
  elementLoadingSpinner: '',
  elementLoadingSvg: '',
  elementLoadingSvgViewBox: '',
  scrollbarAlwaysOn: false,
  flexible: false
})

// 计算属性
const filteredData = computed(() => {
  const k = keyword.value.trim()
  if (!k) return source.value
  return source.value.filter(r => r.name.includes(k))
})

const emptyIconComp = computed(() => Loading)
const sortIconComp = computed(() => Sort)
const filterIconComp = computed(() => Filter)

// 方法
const openDrawer = () => {
  console.log('打开抽屉')
  show.value = true
}

const refresh = () => {
  ElMessage.success('刷新成功（模拟）')
}

const edit = (row) => {
  if (!row) {
    ElMessage.warning('无法编辑：数据无效')
    return
  }
  ElMessage.info(`编辑：${row.name}`)
}

const remove = (idx) => {
  if (idx === undefined || idx < 0 || idx >= source.value.length) {
    ElMessage.warning('无法删除：索引无效')
    return
  }
  source.value.splice(idx, 1)
  ElMessage.success('删除成功')
}

// 样式方法
const rowClassNameFn = ({ row, rowIndex }) => {
  if (rowIndex === 1) {
    return 'warning-row'
  } else if (rowIndex === 3) {
    return 'success-row'
  }
  return ''
}

const rowStyleFn = ({ row, rowIndex }) => {
  if (rowIndex === 1) {
    return { background: '#fdf6ec' }
  }
  return {}
}

const cellClassNameFn = ({ row, column, rowIndex, columnIndex }) => {
  if (rowIndex === 1 && columnIndex === 1) {
    return 'warning-cell'
  }
  return ''
}

const cellStyleFn = ({ row, column, rowIndex, columnIndex }) => {
  if (rowIndex === 1 && columnIndex === 1) {
    return { background: '#fdf6ec' }
  }
  return {}
}

const headerRowStyleFn = () => {
  return { background: '#f5f7fa' }
}

const headerCellStyleFn = ({ column, columnIndex }) => {
  if (columnIndex === 0) {
    return { background: '#f5f7fa' }
  }
  return {}
}

const summaryMethodFn = ({ columns, data }) => {
  const sums = []
  columns.forEach((column, index) => {
    if (index === 0) {
      sums[index] = '合计'
      return
    }
    const values = data.map(item => Number(item[column.property]))
    if (!values.every(value => Number.isNaN(value))) {
      sums[index] = values.reduce((prev, curr) => {
        const value = Number(curr)
        if (!Number.isNaN(value)) {
          return prev + curr
        } else {
          return prev
        }
      }, 0)
    } else {
      sums[index] = ''
    }
  })
  return sums
}

const spanMethodFn = ({ row, column, rowIndex, columnIndex }) => {
  if (rowIndex % 2 === 0) {
    if (columnIndex === 0) {
      return [1, 2]
    } else if (columnIndex === 1) {
      return [0, 0]
    }
  }
}

const loadFn = (tree, treeNode, resolve) => {
  setTimeout(() => {
    resolve([
      {
        id: 31,
        date: '2024-01-31',
        name: '子节点1',
        address: '子节点地址1'
      },
      {
        id: 32,
        date: '2024-01-32',
        name: '子节点2',
        address: '子节点地址2'
      }
    ])
  }, 1000)
}

// 事件处理
const onUI = (name) => ElMessage.info(`触发事件: ${name}`)
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
  align-items: center;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.status {
  margin: 12px 0;
  padding: 8px;
  background: #f5f7fa;
  border-radius: 4px;
  font-size: 12px;
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
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 4px;
  padding: 12px;
  margin: 8px 0;
  overflow-x: auto;
  max-width: 100%;
}

.code-block pre {
  margin: 0;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  line-height: 1.4;
  white-space: pre;
  overflow-x: auto;
  min-width: max-content;
}

/* 表格样式 */
:deep(.warning-row) {
  background: #fdf6ec;
}

:deep(.success-row) {
  background: #f0f9ff;
}

:deep(.warning-cell) {
  background: #fdf6ec;
}
</style>