<template>
  <div class="demo-container">
    <div class="demo-header">
      <h2>树形控件 Tree</h2>
      <p>用清晰的层级结构展示信息，可展开或折叠</p>
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
          <h4>树形控件演示</h4>
          <el-tree
            :data="treeData"
            :props="cfg.props"
            :node-key="cfg.nodeKey"
            :default-expand-all="cfg.defaultExpandAll"
            :expand-on-click-node="cfg.expandOnClickNode"
            :check-on-click-node="cfg.checkOnClickNode"
            :auto-expand-parent="cfg.autoExpandParent"
            :default-expanded-keys="cfg.defaultExpandedKeys"
            :default-checked-keys="cfg.defaultCheckedKeys"
            :check-strictly="cfg.checkStrictly"
            :indent="cfg.indent"
            :icon="cfg.icon"
            :lazy="cfg.lazy"
            :load="cfg.lazy ? loadNode : undefined"
            :render-after-expand="cfg.renderAfterExpand"
            :highlight-current="cfg.highlightCurrent"
            :accordion="cfg.accordion"
            :filter-node-method="cfg.filterNodeMethod ? filterNode : undefined"
            :empty-text="cfg.emptyText"
            :show-checkbox="cfg.showCheckbox"
            :draggable="cfg.draggable"
            :allow-drag="cfg.allowDrag ? allowDrag : undefined"
            :allow-drop="cfg.allowDrop ? allowDrop : undefined"
            @node-click="handleNodeClick"
            @node-contextmenu="handleNodeContextmenu"
            @check-change="handleCheckChange"
            @check="handleCheck"
            @current-change="handleCurrentChange"
            @node-expand="handleNodeExpand"
            @node-collapse="handleNodeCollapse"
            @node-drag-start="handleNodeDragStart"
            @node-drag-enter="handleNodeDragEnter"
            @node-drag-leave="handleNodeDragLeave"
            @node-drag-over="handleNodeDragOver"
            @node-drag-end="handleNodeDragEnd"
            @node-drop="handleNodeDrop"
        />
        </div>

        <div class="demo-section">
          <h4>可勾选树形控件演示</h4>
          <el-tree
            :data="checkableTreeData"
            show-checkbox
            node-key="id"
            :default-expanded-keys="[1, 2]"
            :default-checked-keys="[5]"
            :props="{ children: 'children', label: 'name' }"
            @check="handleCheckableCheck"
        />
        </div>

        <div class="demo-section">
          <h4>可拖拽树形控件演示</h4>
          <el-tree
            :data="draggableTreeData"
            draggable
            node-key="id"
            :default-expanded-keys="[1, 2]"
            :props="{ children: 'children', label: 'name' }"
            @node-drop="handleDraggableDrop"
        />
        </div>

        <div class="demo-section">
          <h4>状态显示</h4>
          <p><strong>节点键：</strong>{{ cfg.nodeKey }}</p>
          <p><strong>默认展开全部：</strong>{{ cfg.defaultExpandAll ? '是' : '否' }}</p>
          <p><strong>点击节点展开：</strong>{{ cfg.expandOnClickNode ? '是' : '否' }}</p>
          <p><strong>点击节点勾选：</strong>{{ cfg.checkOnClickNode ? '是' : '否' }}</p>
          <p><strong>自动展开父节点：</strong>{{ cfg.autoExpandParent ? '是' : '否' }}</p>
          <p><strong>严格模式：</strong>{{ cfg.checkStrictly ? '是' : '否' }}</p>
          <p><strong>缩进：</strong>{{ cfg.indent }}</p>
          <p><strong>懒加载：</strong>{{ cfg.lazy ? '是' : '否' }}</p>
          <p><strong>高亮当前节点：</strong>{{ cfg.highlightCurrent ? '是' : '否' }}</p>
          <p><strong>手风琴模式：</strong>{{ cfg.accordion ? '是' : '否' }}</p>
          <p><strong>显示复选框：</strong>{{ cfg.showCheckbox ? '是' : '否' }}</p>
          <p><strong>可拖拽：</strong>{{ cfg.draggable ? '是' : '否' }}</p>
        </div>
      </el-card>
    </div>

    <!-- 属性设置抽屉 -->
    <el-drawer
      v-model="showSettings"
      title="树形控件属性设置"
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
              <pre><code>&lt;el-tree :data="data" :props="defaultProps" /&gt;

&lt;script setup&gt;
const data = [
  {
    label: '一级 1',
    children: [
      { label: '二级 1-1' },
      { label: '二级 1-2' }
    ]
  },
  {
    label: '一级 2',
    children: [
      { label: '二级 2-1' },
      { label: '二级 2-2' }
    ]
  }
]

const defaultProps = {
  children: 'children',
  label: 'label'
}
&lt;/script&gt;</code></pre>
            </div>
          </div>
          
          <div class="usage-item">
            <h5>2. 可选择</h5>
            <div class="code-block">
              <pre><code>&lt;el-tree 
  :data="data" 
  :props="defaultProps" 
  show-checkbox 
  @check="handleCheck" 
/&gt;

&lt;script setup&gt;
const handleCheck = (data, checked) => {
  console.log('选中节点:', data, checked)
}
&lt;/script&gt;</code></pre>
            </div>
          </div>
          
          <div class="usage-item">
            <h5>3. 懒加载</h5>
            <div class="code-block">
              <pre><code>&lt;el-tree 
  :data="data" 
  :props="defaultProps" 
  :load="loadNode" 
  lazy 
/&gt;

&lt;script setup&gt;
const loadNode = (node, resolve) => {
  if (node.level === 0) {
    return resolve([{ name: 'region1' }, { name: 'region2' }])
  }
  if (node.level > 3) {
    return resolve([])
  }
  setTimeout(() => {
    resolve([
      { name: 'leaf' },
      { name: 'zone' }
    ])
  }, 1000)
}
&lt;/script&gt;</code></pre>
            </div>
          </div>
          
          <div class="usage-item">
            <h5>4. 可拖拽</h5>
            <div class="code-block">
              <pre><code>&lt;el-tree 
  :data="data" 
  :props="defaultProps" 
  draggable 
  :allow-drag="allowDrag" 
  :allow-drop="allowDrop" 
  @node-drag-start="handleDragStart" 
  @node-drop="handleDrop" 
/&gt;

&lt;script setup&gt;
const allowDrag = (node) => {
  return node.level !== 1
}

const allowDrop = (draggingNode, dropNode, type) => {
  return type !== 'inner'
}

const handleDragStart = (node) => {
  console.log('开始拖拽:', node)
}

const handleDrop = (draggingNode, dropNode, dropType) => {
  console.log('拖拽完成:', draggingNode, dropNode, dropType)
}
&lt;/script&gt;</code></pre>
            </div>
          </div>
          
          <div class="usage-item">
            <h5>5. 自定义节点内容</h5>
            <div class="code-block">
              <pre><code>&lt;el-tree :data="data" :props="defaultProps"&gt;
  &lt;template #default="{ node, data }"&gt;
    &lt;span class="custom-tree-node"&gt;
      &lt;span&gt;{{ node.label }}&lt;/span&gt;
      &lt;span&gt;
        &lt;el-button 
          type="text" 
          size="small" 
          @click="append(data)"
        &gt;
          Append
        &lt;/el-button&gt;
        &lt;el-button 
          type="text" 
          size="small" 
          @click="remove(node, data)"
        &gt;
          Delete
        &lt;/el-button&gt;
      &lt;/span&gt;
    &lt;/span&gt;
  &lt;/template&gt;
&lt;/el-tree&gt;</code></pre>
            </div>
          </div>
          
          <div class="usage-item">
            <h5>6. 过滤节点</h5>
            <div class="code-block">
              <pre><code>&lt;el-input 
  v-model="filterText" 
  placeholder="输入关键字进行过滤" 
/&gt;
&lt;el-tree 
  :data="data" 
  :props="defaultProps" 
  :filter-node-method="filterNode" 
  ref="tree" 
/&gt;

&lt;script setup&gt;
import { ref, watch } from 'vue'

const filterText = ref('')
const tree = ref(null)

const filterNode = (value, data) => {
  if (!value) return true
  return data.label.indexOf(value) !== -1
}

watch(filterText, (val) => {
  tree.value.filter(val)
})
&lt;/script&gt;</code></pre>
            </div>
          </div>
          
          <div class="usage-item">
            <h5>7. 事件处理</h5>
            <div class="code-block">
              <pre><code>&lt;el-tree 
  :data="data" 
  :props="defaultProps" 
  @node-click="handleNodeClick" 
  @node-expand="handleNodeExpand" 
  @node-collapse="handleNodeCollapse" 
  @check-change="handleCheckChange" 
/&gt;

&lt;script setup&gt;
const handleNodeClick = (data, node) => {
  console.log('节点点击:', data, node)
}

const handleNodeExpand = (data, node) => {
  console.log('节点展开:', data, node)
}

const handleNodeCollapse = (data, node) => {
  console.log('节点收起:', data, node)
}

const handleCheckChange = (data, checked, indeterminate) => {
  console.log('选中状态改变:', data, checked, indeterminate)
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
              <span class="prop-name">nodeKey</span>
              <span class="help-text">每个树节点用来作为唯一标识的属性</span>
            </div>
            <el-input v-model="cfg.nodeKey" placeholder="如: id" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">indent</span>
              <span class="help-text">相邻级节点间的水平缩进</span>
            </div>
            <el-input-number v-model="cfg.indent" :min="0" :max="50" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">emptyText</span>
              <span class="help-text">内容为空的时候展示的文本</span>
            </div>
            <el-input v-model="cfg.emptyText" placeholder="如: 暂无数据" />
          </div>
        </div>

        <!-- 状态属性 -->
        <div class="form-section">
          <div class="section-title">状态属性</div>
          
          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">defaultExpandAll</span>
              <span class="help-text">是否默认展开所有节点</span>
            </div>
            <el-switch v-model="cfg.defaultExpandAll" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">expandOnClickNode</span>
              <span class="help-text">是否在点击节点的时候展开或者收缩节点</span>
            </div>
            <el-switch v-model="cfg.expandOnClickNode" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">checkOnClickNode</span>
              <span class="help-text">是否在点击节点的时候选中节点</span>
            </div>
            <el-switch v-model="cfg.checkOnClickNode" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">autoExpandParent</span>
              <span class="help-text">展开子节点的时候是否自动展开父节点</span>
            </div>
            <el-switch v-model="cfg.autoExpandParent" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">checkStrictly</span>
              <span class="help-text">在显示复选框的情况下，是否严格的遵循父子不互相关联的做法</span>
            </div>
            <el-switch v-model="cfg.checkStrictly" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">lazy</span>
              <span class="help-text">是否懒加载子节点</span>
            </div>
            <el-switch v-model="cfg.lazy" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">renderAfterExpand</span>
              <span class="help-text">是否在第一次展开某个树节点后才渲染其子节点</span>
            </div>
            <el-switch v-model="cfg.renderAfterExpand" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">highlightCurrent</span>
              <span class="help-text">是否高亮当前选中节点</span>
            </div>
            <el-switch v-model="cfg.highlightCurrent" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">accordion</span>
              <span class="help-text">是否每次只打开一个同级树节点展开</span>
            </div>
            <el-switch v-model="cfg.accordion" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">showCheckbox</span>
              <span class="help-text">节点是否可被选择</span>
            </div>
            <el-switch v-model="cfg.showCheckbox" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">draggable</span>
              <span class="help-text">是否开启拖拽节点功能</span>
            </div>
            <el-switch v-model="cfg.draggable" />
          </div>
        </div>

        <!-- 其他属性 -->
        <div class="form-section">
          <div class="section-title">其他属性</div>
          
          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">filterNodeMethod</span>
              <span class="help-text">对树节点进行筛选时执行的方法</span>
            </div>
            <el-switch v-model="cfg.filterNodeMethod" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">allowDrag</span>
              <span class="help-text">判断节点能否被拖拽</span>
            </div>
            <el-switch v-model="cfg.allowDrag" />
          </div>

          <div class="form-item">
            <div class="label-text">
              <span class="prop-name">allowDrop</span>
              <span class="help-text">拖拽时判定目标节点能否被放置</span>
            </div>
            <el-switch v-model="cfg.allowDrop" />
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
  nodeKey: 'id',
  defaultExpandAll: false,
  expandOnClickNode: true,
  checkOnClickNode: false,
  autoExpandParent: true,
  checkStrictly: false,
  indent: 18,
  lazy: false,
  renderAfterExpand: true,
  highlightCurrent: false,
  accordion: false,
  showCheckbox: false,
  draggable: false,
  filterNodeMethod: false,
  allowDrag: false,
  allowDrop: false,
  emptyText: '暂无数据',
  props: {
    children: 'children',
    label: 'label',
    disabled: 'disabled',
    isLeaf: 'isLeaf'
  },
  defaultExpandedKeys: [],
  defaultCheckedKeys: []
})

// 树形数据
const treeData = ref([
  {
    id: 1,
    label: '一级 1',
    children: [
      {
        id: 4,
        label: '二级 1-1',
        children: [
          {
            id: 9,
            label: '三级 1-1-1'
          },
          {
            id: 10,
            label: '三级 1-1-2'
          }
        ]
      }
    ]
  },
  {
    id: 2,
    label: '一级 2',
    children: [
      {
        id: 5,
        label: '二级 2-1'
      },
      {
        id: 6,
        label: '二级 2-2'
      }
    ]
  },
  {
    id: 3,
    label: '一级 3',
    children: [
      {
        id: 7,
        label: '二级 3-1'
      },
      {
        id: 8,
        label: '二级 3-2'
      }
    ]
  }
])

const checkableTreeData = ref([
  {
    id: 1,
    name: '一级 1',
    children: [
      {
        id: 4,
        name: '二级 1-1',
        children: [
          {
            id: 9,
            name: '三级 1-1-1'
          },
          {
            id: 10,
            name: '三级 1-1-2'
          }
        ]
      }
    ]
  },
  {
    id: 2,
    name: '一级 2',
    children: [
      {
        id: 5,
        name: '二级 2-1'
      },
      {
        id: 6,
        name: '二级 2-2'
      }
    ]
  }
])

const draggableTreeData = ref([
  {
    id: 1,
    name: '一级 1',
    children: [
      {
        id: 4,
        name: '二级 1-1',
        children: [
          {
            id: 9,
            name: '三级 1-1-1'
          }
        ]
      }
    ]
  },
  {
    id: 2,
    name: '一级 2',
    children: [
      {
        id: 5,
        name: '二级 2-1'
      }
    ]
  }
])

// 事件处理
const handleNodeClick = (data, node, nodeComponent) => {
  console.log('节点点击:', data, node, nodeComponent)
  ElMessage.success(`点击节点: ${data.label}`)
}

const handleNodeContextmenu = (event, data, node, nodeComponent) => {
  console.log('节点右键:', event, data, node, nodeComponent)
  ElMessage.info('节点右键')
}

const handleCheckChange = (data, checked, indeterminate) => {
  console.log('勾选状态改变:', data, checked, indeterminate)
  ElMessage.success(`勾选状态: ${checked ? '选中' : '取消选中'}`)
}

const handleCheck = (data, checkedInfo) => {
  console.log('勾选:', data, checkedInfo)
  ElMessage.success('勾选事件')
}

const handleCurrentChange = (data, node) => {
  console.log('当前节点改变:', data, node)
  ElMessage.success(`当前节点: ${data.label}`)
}

const handleNodeExpand = (data, node, nodeComponent) => {
  console.log('节点展开:', data, node, nodeComponent)
  ElMessage.info('节点展开')
}

const handleNodeCollapse = (data, node, nodeComponent) => {
  console.log('节点折叠:', data, node, nodeComponent)
  ElMessage.info('节点折叠')
}

const handleNodeDragStart = (node, event) => {
  console.log('拖拽开始:', node, event)
  ElMessage.info('拖拽开始')
}

const handleNodeDragEnter = (draggingNode, dropNode, event) => {
  console.log('拖拽进入:', draggingNode, dropNode, event)
}

const handleNodeDragLeave = (draggingNode, dropNode, event) => {
  console.log('拖拽离开:', draggingNode, dropNode, event)
}

const handleNodeDragOver = (draggingNode, dropNode, event) => {
  console.log('拖拽悬停:', draggingNode, dropNode, event)
}

const handleNodeDragEnd = (draggingNode, dropNode, dropType, event) => {
  console.log('拖拽结束:', draggingNode, dropNode, dropType, event)
  ElMessage.success('拖拽结束')
}

const handleNodeDrop = (draggingNode, dropNode, dropType, event) => {
  console.log('拖拽放置:', draggingNode, dropNode, dropType, event)
  ElMessage.success('拖拽放置')
}

const handleCheckableCheck = (data, checkedInfo) => {
  console.log('可勾选树勾选:', data, checkedInfo)
  ElMessage.success('可勾选树勾选')
}

const handleDraggableDrop = (draggingNode, dropNode, dropType, event) => {
  console.log('可拖拽树放置:', draggingNode, dropNode, dropType, event)
  ElMessage.success('可拖拽树放置')
}

// 懒加载
const loadNode = (node, resolve) => {
  if (node.level === 0) {
    return resolve([
      { name: 'region1' },
      { name: 'region2' }
    ])
  }
  if (node.level > 3) return resolve([])
  setTimeout(() => {
    const data = [
      {
        name: 'zone' + Math.random().toString(16).substr(2, 7)
      },
      {
        name: 'zone' + Math.random().toString(16).substr(2, 7)
      }
    ]
    resolve(data)
  }, 500)
}

// 过滤节点
const filterNode = (value, data) => {
  if (!value) return true
  return data.label.indexOf(value) !== -1
}

// 允许拖拽
const allowDrag = (draggingNode) => {
  return draggingNode.level === 1
}

// 允许放置
const allowDrop = (draggingNode, dropNode, type) => {
  if (type === 'prev' || type === 'next') {
    return true
  }
  return false
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
