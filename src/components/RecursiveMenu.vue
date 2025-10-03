<!--
  递归菜单组件
  支持无限层级的菜单渲染，通过组件自身调用自身实现递归
  特点：
  1. 自动识别末级菜单和有子菜单的菜单项
  2. 支持图标显示和错误处理
  3. 支持展开层级计算和事件传递
  4. 响应式设计，支持不同层级的样式
-->
<template>
  <div>
    <!-- 遍历菜单项数组 -->
    <template v-for="item in items">
      <!-- 末级菜单项：没有子菜单或子菜单为空 -->
      <el-menu-item 
        v-if="!item.children || item.children.length === 0"
        :key="item.index"
        :index="item.index"
        :class="{ 'first-level': level === 0 }"
        @click="handleMenuItemClick(item)">
        <!-- 只有第一级菜单显示图标 -->
        <template v-if="level === 0">
          <el-icon>
            <!-- 图标正常显示 -->
            <template v-if="!item.icon.includes('图标缺失')">
              <component :is="item.icon" @error="handleIconError" />
            </template>
            <!-- 图标缺失时显示占位文字 -->
            <template v-else>
              <span class="missing-icon-text">图标缺失</span>
            </template>
          </el-icon>
        </template>
        <!-- 菜单标题 -->
        <template #title>{{ item.title }}</template>
      </el-menu-item>
      
      <!-- 含有子菜单的菜单项：使用子菜单组件 -->
      <el-sub-menu 
        v-else 
        :key="`sub-${item.index}`"
        :index="item.index" 
        :class="{ 'first-level': level === 0 }"
        :data-menu-index="item.index"
        @open="handleExpand(level + 1)"
        @close="handleCollapse"
      >
        <!-- 子菜单标题 -->
        <template #title>
          <!-- 只有第一级菜单显示图标 -->
          <template v-if="level === 0">
            <el-icon>
              <!-- 图标正常显示 -->
              <template v-if="!item.icon.includes('图标缺失')">
                <component :is="item.icon" @error="handleIconError" />
              </template>
              <!-- 图标缺失时显示占位文字 -->
              <template v-else>
                <span class="missing-icon-text">图标缺失</span>
              </template>
            </el-icon>
          </template>
          <!-- 菜单标题 -->
          <span>{{ item.title }}</span>
        </template>
        
        <!-- 递归渲染子菜单：关键部分，实现无限层级 -->
        <RecursiveMenu 
          :items="item.children" 
          :level="level + 1" 
          @update:expandedLevel="handleExpandedLevelFromChild"
          @menuItemClick="handleMenuItemClick"
          @iconError="handleIconError"
        />
      </el-sub-menu>
    </template>
  </div>
</template>

<script setup>
import { defineProps, ref, h } from 'vue'

// ==================== 组件属性定义 ====================

/**
 * 组件属性定义
 * 使用 defineProps 定义组件接收的属性
 */
const props = defineProps({
  /**
   * 菜单项数组
   * 包含菜单项的数据，支持树形结构
   */
  items: {
    type: Array,
    required: true,
    default: () => []
  },
  /**
   * 当前层级
   * 用于标识当前菜单的层级深度，0表示顶级菜单
   * 用于样式控制和层级计算
   */
  level: {
    type: Number,
    default: 0
  }
})

// ==================== 事件定义 ====================

/**
 * 组件事件定义
 * 使用 defineEmits 定义组件可以触发的事件
 */
const emit = defineEmits(['update:expandedLevel', 'menuItemClick', 'iconError'])

// ==================== 状态管理 ====================

/**
 * 存储当前展开的最大层级
 * 用于计算侧边栏宽度和展开状态
 */
const currentMaxLevel = ref(0)

// ==================== 事件处理方法 ====================

/**
 * 处理菜单项展开事件
 * 当子菜单展开时触发，用于计算展开层级
 * @param {number} expandedLevel - 展开的层级深度
 */
const handleExpand = (expandedLevel) => {
  console.log(`RecursiveMenu 展开事件: 当前层级=${props.level}, 展开层级=${expandedLevel}`)
  // 更新当前展开的最大层级
  if (expandedLevel > currentMaxLevel.value) {
    currentMaxLevel.value = expandedLevel
  }
  
  // 向父组件发送更新后的最大层级
  emit('update:expandedLevel', currentMaxLevel.value)
}

/**
 * 处理菜单项收起事件
 * 当子菜单收起时触发
 * 简化处理，收起时不立即缩小宽度
 */
const handleCollapse = () => {
  // 这里为了简化，收起时不立即缩小宽度
  // 在实际应用中，可以根据需要实现更复杂的收起逻辑
}

/**
 * 处理菜单项点击事件
 * 当用户点击菜单项时触发，将事件向上传递
 * @param {Object} item - 被点击的菜单项对象
 */
const handleMenuItemClick = (item) => {
  emit('menuItemClick', item)
}

/**
 * 处理子组件传递的展开层级
 * 接收子组件传递的展开层级信息并向上传递
 * @param {number} level - 子组件传递的层级深度
 */
const handleExpandedLevelFromChild = (level) => {
  // 直接使用子组件传递的层级，因为它已经是绝对层级
  if (level > currentMaxLevel.value) {
    currentMaxLevel.value = level
  }
  emit('update:expandedLevel', currentMaxLevel.value)
}

/**
 * 处理图标加载失败事件
 * 当Element Plus图标组件加载失败时触发
 * @param {Event} event - 图标加载失败事件
 */
const handleIconError = (event) => {
  // 获取图标名称，用于错误追踪
  const iconName = event.target?.__vueParentComponent?.props?.icon || '未知'
  
  // 在控制台打印错误信息，便于调试
  console.warn(`图标加载失败: ${iconName}`)
  
  // 阻止事件冒泡，避免影响其他组件
  event.stopPropagation()
  
  // 通知父组件图标错误，用于统一处理
  emit('iconError', iconName)
  
  // 注意：这里不能直接修改DOM，Vue会在下次渲染时处理
  // 模板中已经通过条件渲染处理了图标缺失的情况
}
</script>

<style scoped>
/* ==================== 菜单样式定义 ==================== */

/* 第一级菜单样式：添加底部边框区分层级 */
.first-level .el-menu-item,
.first-level .el-sub-menu__title {
  border-bottom: 1px solid #f0f0f0;
}

/* 子菜单缩进调整：为子菜单添加左侧缩进 */
.el-sub-menu .el-menu {
  padding-left: 10px;
}

/* 菜单项通用样式：添加过渡动画效果 */
.el-menu-item,
.el-sub-menu__title {
  transition: all 0.3s ease;
}

/* 图标缺失时的占位文字样式 */
.missing-icon-text {
  font-size: 12px;           /* 字体大小 */
  color: #909399;            /* 文字颜色 */
  display: flex;             /* 弹性布局 */
  align-items: center;       /* 垂直居中 */
  justify-content: center;   /* 水平居中 */
  width: 16px;              /* 宽度 */
  height: 16px;             /* 高度 */
  background-color: #f5f5f5; /* 背景色 */
  border-radius: 2px;       /* 圆角 */
}
</style>