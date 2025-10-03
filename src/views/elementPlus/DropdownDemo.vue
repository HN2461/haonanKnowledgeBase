<template>
  <div class="dropdown-demo">
    <div class="demo-header">
      <h1>Dropdown 下拉菜单</h1>
      <p>向下弹出的列表，用于选择操作。当页面上的操作命令过多时，用此组件可以收纳操作元素。</p>
    </div>

    <div class="demo-content">
      <!-- 基础用法 -->
      <el-card class="demo-card">
        <template #header>
          <div class="card-header">
            <span>基础用法</span>
            <el-button type="primary" @click="openDrawer">属性设置</el-button>
          </div>
        </template>
        
        <div class="demo-section">
          <el-dropdown
            :trigger="cfg.trigger"
            :placement="cfg.placement"
            :hide-on-click="cfg.hideOnClick"
            :show-timeout="cfg.showTimeout"
            :hide-timeout="cfg.hideTimeout"
            :disabled="cfg.disabled"
            :popper-class="cfg.popperClass"
            :popper-style="cfg.popperStyle"
            :max-height="cfg.maxHeight"
            :split-button="cfg.splitButton"
            :type="cfg.type"
            :size="cfg.size"
            :button-props="cfg.buttonProps"
            @command="handleCommand"
            @visible-change="handleVisibleChange"
          >
            <el-button type="primary">
              下拉菜单
              <el-icon class="el-icon--right"><arrow-down /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="a">黄金糕</el-dropdown-item>
                <el-dropdown-item command="b">狮子头</el-dropdown-item>
                <el-dropdown-item command="c">螺蛳粉</el-dropdown-item>
                <el-dropdown-item command="d" disabled>双皮奶</el-dropdown-item>
                <el-dropdown-item command="e" divided>蚵仔煎</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-card>

      <!-- 触发方式 -->
      <el-card class="demo-card">
        <template #header>
          <div class="card-header">
            <span>不同触发方式</span>
          </div>
        </template>
        
        <div class="demo-section">
          <el-space wrap>
            <el-dropdown trigger="hover">
              <el-button type="primary">
                悬停触发
                <el-icon class="el-icon--right"><arrow-down /></el-icon>
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>悬停菜单项1</el-dropdown-item>
                  <el-dropdown-item>悬停菜单项2</el-dropdown-item>
                  <el-dropdown-item>悬停菜单项3</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>

            <el-dropdown trigger="click">
              <el-button type="success">
                点击触发
                <el-icon class="el-icon--right"><arrow-down /></el-icon>
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>点击菜单项1</el-dropdown-item>
                  <el-dropdown-item>点击菜单项2</el-dropdown-item>
                  <el-dropdown-item>点击菜单项3</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>

            <el-dropdown trigger="contextmenu">
              <el-button type="warning">
                右键触发
                <el-icon class="el-icon--right"><arrow-down /></el-icon>
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>右键菜单项1</el-dropdown-item>
                  <el-dropdown-item>右键菜单项2</el-dropdown-item>
                  <el-dropdown-item>右键菜单项3</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </el-space>
        </div>
      </el-card>

      <!-- 不同位置 -->
      <el-card class="demo-card">
        <template #header>
          <div class="card-header">
            <span>不同位置</span>
          </div>
        </template>
        
        <div class="demo-section">
          <div class="placement-demo">
            <el-dropdown
              v-for="placement in placements"
              :key="placement"
              :placement="placement"
              trigger="click"
            >
              <el-button type="primary">
                {{ placement }}
                <el-icon class="el-icon--right"><arrow-down /></el-icon>
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>{{ placement }} 菜单项1</el-dropdown-item>
                  <el-dropdown-item>{{ placement }} 菜单项2</el-dropdown-item>
                  <el-dropdown-item>{{ placement }} 菜单项3</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </el-card>

      <!-- 分割按钮 -->
      <el-card class="demo-card">
        <template #header>
          <div class="card-header">
            <span>分割按钮</span>
          </div>
        </template>
        
        <div class="demo-section">
          <el-space wrap>
            <el-dropdown split-button type="primary" @click="handleClick">
              分割按钮
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>菜单项1</el-dropdown-item>
                  <el-dropdown-item>菜单项2</el-dropdown-item>
                  <el-dropdown-item>菜单项3</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>

            <el-dropdown split-button type="success" @click="handleClick">
              成功按钮
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>操作1</el-dropdown-item>
                  <el-dropdown-item>操作2</el-dropdown-item>
                  <el-dropdown-item>操作3</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>

            <el-dropdown split-button type="warning" @click="handleClick">
              警告按钮
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>选项1</el-dropdown-item>
                  <el-dropdown-item>选项2</el-dropdown-item>
                  <el-dropdown-item>选项3</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </el-space>
        </div>
      </el-card>

      <!-- 不同尺寸 -->
      <el-card class="demo-card">
        <template #header>
          <div class="card-header">
            <span>不同尺寸</span>
          </div>
        </template>
        
        <div class="demo-section">
          <el-space wrap>
            <el-dropdown size="large">
              <el-button type="primary" size="large">
                大尺寸
                <el-icon class="el-icon--right"><arrow-down /></el-icon>
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>大尺寸菜单项1</el-dropdown-item>
                  <el-dropdown-item>大尺寸菜单项2</el-dropdown-item>
                  <el-dropdown-item>大尺寸菜单项3</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>

            <el-dropdown size="default">
              <el-button type="primary">
                默认尺寸
                <el-icon class="el-icon--right"><arrow-down /></el-icon>
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>默认尺寸菜单项1</el-dropdown-item>
                  <el-dropdown-item>默认尺寸菜单项2</el-dropdown-item>
                  <el-dropdown-item>默认尺寸菜单项3</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>

            <el-dropdown size="small">
              <el-button type="primary" size="small">
                小尺寸
                <el-icon class="el-icon--right"><arrow-down /></el-icon>
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>小尺寸菜单项1</el-dropdown-item>
                  <el-dropdown-item>小尺寸菜单项2</el-dropdown-item>
                  <el-dropdown-item>小尺寸菜单项3</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </el-space>
        </div>
      </el-card>

      <!-- 自定义内容 -->
      <el-card class="demo-card">
        <template #header>
          <div class="card-header">
            <span>自定义内容</span>
          </div>
        </template>
        
        <div class="demo-section">
          <el-dropdown trigger="click">
            <el-button type="primary">
              自定义内容
              <el-icon class="el-icon--right"><arrow-down /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <el-icon><User /></el-icon>
                  个人中心
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-icon><Setting /></el-icon>
                  设置
                </el-dropdown-item>
                <el-dropdown-item divided>
                  <el-icon><SwitchButton /></el-icon>
                  退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-card>

      <!-- 嵌套菜单 -->
      <el-card class="demo-card">
        <template #header>
          <div class="card-header">
            <span>嵌套菜单</span>
          </div>
        </template>
        
        <div class="demo-section">
          <el-dropdown trigger="click">
            <el-button type="primary">
              嵌套菜单
              <el-icon class="el-icon--right"><arrow-down /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>一级菜单1</el-dropdown-item>
                <el-dropdown-item>一级菜单2</el-dropdown-item>
                <el-dropdown-item divided>
                  <span>一级菜单3</span>
                  <el-icon class="el-icon--right"><arrow-right /></el-icon>
                </el-dropdown-item>
                <el-dropdown-menu>
                  <el-dropdown-item>二级菜单3-1</el-dropdown-item>
                  <el-dropdown-item>二级菜单3-2</el-dropdown-item>
                  <el-dropdown-item>二级菜单3-3</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-card>

      <!-- 禁用状态 -->
      <el-card class="demo-card">
        <template #header>
          <div class="card-header">
            <span>禁用状态</span>
          </div>
        </template>
        
        <div class="demo-section">
          <el-space wrap>
            <el-dropdown :disabled="true">
              <el-button type="primary">
                禁用下拉菜单
                <el-icon class="el-icon--right"><arrow-down /></el-icon>
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>菜单项1</el-dropdown-item>
                  <el-dropdown-item>菜单项2</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>

            <el-dropdown split-button :disabled="true" @click="handleClick">
              禁用分割按钮
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>菜单项1</el-dropdown-item>
                  <el-dropdown-item>菜单项2</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </el-space>
        </div>
      </el-card>
    </div>

    <!-- 属性设置抽屉 -->
    <el-drawer
      v-model="show"
      title="Dropdown 属性设置"
      direction="rtl"
      size="45%"
    >
      <div class="drawer-content">
        <el-form :model="cfg" label-width="120px">
          <el-form-item label="触发方式">
            <el-select v-model="cfg.trigger" placeholder="选择触发方式">
              <el-option label="悬停" value="hover" />
              <el-option label="点击" value="click" />
              <el-option label="右键" value="contextmenu" />
            </el-select>
          </el-form-item>
          
          <el-form-item label="弹出位置">
            <el-select v-model="cfg.placement" placeholder="选择位置">
              <el-option
                v-for="placement in placements"
                :key="placement"
                :label="placement"
                :value="placement"
              />
            </el-select>
          </el-form-item>
          
          <el-form-item label="点击隐藏">
            <el-switch v-model="cfg.hideOnClick" />
          </el-form-item>
          
          <el-form-item label="显示延迟">
            <el-input-number v-model="cfg.showTimeout" :min="0" :max="2000" />
          </el-form-item>
          
          <el-form-item label="隐藏延迟">
            <el-input-number v-model="cfg.hideTimeout" :min="0" :max="2000" />
          </el-form-item>
          
          <el-form-item label="禁用状态">
            <el-switch v-model="cfg.disabled" />
          </el-form-item>
          
          <el-form-item label="最大高度">
            <el-input-number v-model="cfg.maxHeight" :min="100" :max="500" />
          </el-form-item>
          
          <el-form-item label="分割按钮">
            <el-switch v-model="cfg.splitButton" />
          </el-form-item>
          
          <el-form-item label="按钮类型" v-if="cfg.splitButton">
            <el-select v-model="cfg.type" placeholder="选择按钮类型">
              <el-option label="Primary" value="primary" />
              <el-option label="Success" value="success" />
              <el-option label="Warning" value="warning" />
              <el-option label="Danger" value="danger" />
              <el-option label="Info" value="info" />
            </el-select>
          </el-form-item>
          
          <el-form-item label="按钮尺寸" v-if="cfg.splitButton">
            <el-select v-model="cfg.size" placeholder="选择按钮尺寸">
              <el-option label="Large" value="large" />
              <el-option label="Default" value="default" />
              <el-option label="Small" value="small" />
            </el-select>
          </el-form-item>
        </el-form>

        <!-- 使用说明 -->
        <div class="usage-section">
          <h3>使用说明</h3>
          
          <div class="code-block">
            <h4>基础用法</h4>
            <pre><code>&lt;el-dropdown trigger="click"&gt;
  &lt;el-button type="primary"&gt;
    下拉菜单
    &lt;el-icon class="el-icon--right"&gt;&lt;arrow-down /&gt;&lt;/el-icon&gt;
  &lt;/el-button&gt;
  &lt;template #dropdown&gt;
    &lt;el-dropdown-menu&gt;
      &lt;el-dropdown-item command="a"&gt;黄金糕&lt;/el-dropdown-item&gt;
      &lt;el-dropdown-item command="b"&gt;狮子头&lt;/el-dropdown-item&gt;
      &lt;el-dropdown-item command="c"&gt;螺蛳粉&lt;/el-dropdown-item&gt;
      &lt;el-dropdown-item command="d" disabled&gt;双皮奶&lt;/el-dropdown-item&gt;
      &lt;el-dropdown-item command="e" divided&gt;蚵仔煎&lt;/el-dropdown-item&gt;
    &lt;/el-dropdown-menu&gt;
  &lt;/template&gt;
&lt;/el-dropdown&gt;</code></pre>
          </div>

          <div class="code-block">
            <h4>分割按钮</h4>
            <pre><code>&lt;el-dropdown split-button type="primary" @click="handleClick"&gt;
  分割按钮
  &lt;template #dropdown&gt;
    &lt;el-dropdown-menu&gt;
      &lt;el-dropdown-item&gt;菜单项1&lt;/el-dropdown-item&gt;
      &lt;el-dropdown-item&gt;菜单项2&lt;/el-dropdown-item&gt;
    &lt;/el-dropdown-menu&gt;
  &lt;/template&gt;
&lt;/el-dropdown&gt;</code></pre>
          </div>

          <div class="code-block">
            <h4>不同触发方式</h4>
            <pre><code>&lt;!-- 悬停触发 --&gt;
&lt;el-dropdown trigger="hover"&gt;...&lt;/el-dropdown&gt;

&lt;!-- 点击触发 --&gt;
&lt;el-dropdown trigger="click"&gt;...&lt;/el-dropdown&gt;

&lt;!-- 右键触发 --&gt;
&lt;el-dropdown trigger="contextmenu"&gt;...&lt;/el-dropdown&gt;</code></pre>
          </div>

          <div class="code-block">
            <h4>自定义内容</h4>
            <pre><code>&lt;el-dropdown-item&gt;
  &lt;el-icon&gt;&lt;User /&gt;&lt;/el-icon&gt;
  个人中心
&lt;/el-dropdown-item&gt;</code></pre>
          </div>

          <div class="code-block">
            <h4>主要属性</h4>
            <pre><code>// 触发方式
trigger: 'hover' | 'click' | 'contextmenu'

// 弹出位置
placement: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end'

// 其他选项
hide-on-click: Boolean
show-timeout: Number
hide-timeout: Number
disabled: Boolean
max-height: Number
split-button: Boolean
type: String
size: String</code></pre>
          </div>

          <div class="code-block">
            <h4>事件</h4>
            <pre><code>// 菜单项点击
@command="handleCommand"

// 下拉菜单显示/隐藏
@visible-change="handleVisibleChange"

// 分割按钮点击
@click="handleClick"</code></pre>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { ArrowDown, ArrowRight, User, Setting, SwitchButton } from '@element-plus/icons-vue'

// 抽屉显示状态
const show = ref(false)

// 弹出位置选项
const placements = [
  'top', 'top-start', 'top-end',
  'bottom', 'bottom-start', 'bottom-end',
  'left', 'left-start', 'left-end',
  'right', 'right-start', 'right-end'
]

// 配置对象
const cfg = reactive({
  trigger: 'click',
  placement: 'bottom',
  hideOnClick: true,
  showTimeout: 250,
  hideTimeout: 150,
  disabled: false,
  popperClass: '',
  popperStyle: {},
  maxHeight: 300,
  splitButton: false,
  type: 'primary',
  size: 'default',
  buttonProps: {}
})

// 事件处理
const handleCommand = (command) => {
  ElMessage.success(`点击了菜单项: ${command}`)
}

const handleClick = () => {
  ElMessage.info('点击了分割按钮')
}

const handleVisibleChange = (visible) => {
  ElMessage.info(`下拉菜单${visible ? '显示' : '隐藏'}`)
}

const openDrawer = () => {
  show.value = true
}
</script>

<style scoped>
.dropdown-demo {
  padding: 20px;
}

.demo-header {
  margin-bottom: 30px;
}

.demo-header h1 {
  color: #303133;
  margin-bottom: 10px;
}

.demo-header p {
  color: #606266;
  font-size: 14px;
  line-height: 1.6;
}

.demo-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.demo-section {
  padding: 20px 0;
}

.placement-demo {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  max-width: 800px;
}

.drawer-content {
  padding: 20px;
}

.usage-section {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #e4e7ed;
}

.usage-section h3 {
  color: #303133;
  margin-bottom: 15px;
}

.code-block {
  margin-bottom: 20px;
}

.code-block h4 {
  color: #409eff;
  margin-bottom: 8px;
  font-size: 14px;
}

.code-block pre {
  background: #f5f7fa;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  padding: 12px;
  margin: 0;
  overflow-x: auto;
  max-width: 100%;
}

.code-block pre code {
  color: #303133;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  line-height: 1.5;
  white-space: pre;
  overflow-x: auto;
  min-width: max-content;
}
</style>
