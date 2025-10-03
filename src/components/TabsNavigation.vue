<template>
  <div class="tabs-navigation">
    <div class="tabs-container">
      <div
        v-for="tab in tabs"
        :key="tab.id"
        :class="['tab-item', { active: activeTab === tab.path }]"
        @click="handleTabClick(tab.path)"
      >
        <span class="tab-handle">{{ tab.title }}</span>
        <span
          v-if="tabs.length > 1"
          class="tab-close-btn"
          @click.stop="handleCloseTab(tab.path)"
        >
          ×
        </span>
      </div>
      <!-- 标签页操作按钮 -->
      <el-dropdown class="tabs-operations">
        <el-button type="text" icon="MoreFilled" size="small" />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleCloseOtherTabs">关闭其他标签</el-dropdown-item>
            <el-dropdown-item @click="handleCloseAllTabs">关闭所有标签</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import Sortable from 'sortablejs'

// Props
const props = defineProps({
  tabs: {
    type: Array,
    default: () => []
  },
  activeTab: {
    type: String,
    default: ''
  }
})

// Emits
const emit = defineEmits([
  'tab-click',
  'close-tab',
  'close-other-tabs',
  'close-all-tabs',
  'tabs-reordered'
])

// Sortable 实例
let sortableInstance = null

// 处理标签点击
const handleTabClick = (path) => {
  emit('tab-click', path)
}

// 处理关闭标签
const handleCloseTab = (path) => {
  emit('close-tab', path)
}

// 处理关闭其他标签
const handleCloseOtherTabs = () => {
  emit('close-other-tabs')
}

// 处理关闭所有标签
const handleCloseAllTabs = () => {
  emit('close-all-tabs')
}

// 初始化Sortable
const initSortable = () => {
  const tabsContainer = document.querySelector('.tabs-container')
  if (tabsContainer && !sortableInstance && props.tabs.length > 1) {
    sortableInstance = new Sortable(tabsContainer, {
      animation: 150,
      ghostClass: 'sortable-ghost',
      handle: '.tab-handle',
      onEnd: (evt) => {
        // 重新排序标签页数组
        const newTabsOrder = [...props.tabs]
        const movedTab = newTabsOrder.splice(evt.oldIndex, 1)[0]
        newTabsOrder.splice(evt.newIndex, 0, movedTab)
        emit('tabs-reordered', newTabsOrder)
      }
    })
  }
}

// 清理Sortable实例
const destroySortable = () => {
  if (sortableInstance) {
    sortableInstance.destroy()
    sortableInstance = null
  }
}

// 组件挂载时初始化
onMounted(() => {
  // 延迟初始化Sortable，确保DOM已经渲染
  setTimeout(() => {
    initSortable()
  }, 100)
})

// 组件卸载时清理
onUnmounted(() => {
  destroySortable()
})

// 监听标签页变化，重新初始化Sortable
watch(
  () => props.tabs.length,
  () => {
    destroySortable()
    setTimeout(() => {
      initSortable()
    }, 100)
  }
)
</script>

<style scoped>
/* 标签页导航样式 */
.tabs-navigation {
  background: #fff;
  border-bottom: 1px solid #e4e7ed;
  padding: 0 20px;
  height: 48px;
  display: flex;
  align-items: center;
  overflow-x: auto;
}

.tabs-container {
  display: flex;
  align-items: center;
  gap: 0;
  flex: 1;
}

.tab-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 16px;
  height: 34px;
  border-radius: 0;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
  font-size: 14px;
  position: relative;
  background: #fff;
  border-right: 1px solid #e4e7ed;
}

/* 最后一个标签不显示右边框 */
.tab-item:last-child {
  border-right: none;
}

.tab-item:hover {
  background: #f5f7fa;
  transform: none;
}

.tab-item.active {
  background: #409eff;
  color: #fff;
  box-shadow: none;
  transform: none;
}

.tab-handle {
  user-select: none;
}

.tab-close-btn {
  display: none;
  width: 16px;
  height: 16px;
  color: #606266;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  margin-left: 4px;
  transition: none;
  background: none;
  border-radius: 0;
}

.tab-item:hover .tab-close-btn {
  display: flex;
  background: none;
}

.tab-item:hover .tab-close-btn:hover {
  background: none;
  color: #f56c6c;
}

/* 拖拽时的样式 */
.sortable-ghost {
  opacity: 0.4;
}

/* 隐藏滚动条但保留滚动功能 */
.tabs-navigation::-webkit-scrollbar {
  display: none;
}

.tabs-navigation {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>