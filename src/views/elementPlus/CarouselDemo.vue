<template>
  <div class="demo-page">
    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <span>Carousel 走马灯</span>
          <el-button type="primary" @click="openDrawer">属性设置</el-button>
        </div>
      </template>
      
      <!-- 预览走马灯 -->
      <div class="carousel-preview">
        <div class="demo-section">
          <h4>基础用法</h4>
          <el-carousel 
            :height="cfg.height"
            :interval="cfg.interval"
            :arrow="cfg.arrow"
            :autoplay="cfg.autoplay"
            :loop="cfg.loop"
            :direction="cfg.direction"
            :indicator-position="cfg.indicatorPosition"
            :type="cfg.type"
            :pause-on-hover="cfg.pauseOnHover"
            @change="handleChange"
          >
            <el-carousel-item v-for="item in basicItems" :key="item.id">
              <div class="carousel-item-content" :style="{ background: item.color }">
                <h3>{{ item.title }}</h3>
                <p>{{ item.description }}</p>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>

        <div class="demo-section">
          <h4>卡片化走马灯</h4>
          <el-carousel 
            height="300px"
            type="card"
            :interval="4000"
          >
            <el-carousel-item v-for="item in cardItems" :key="item.id">
              <div class="card-item-content">
                <el-image 
                  :src="item.image" 
                  fit="cover" 
                  style="width: 100%; height: 200px;"
                />
                <div class="card-info">
                  <h4>{{ item.title }}</h4>
                  <p>{{ item.description }}</p>
                </div>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>

        <div class="demo-section">
          <h4>垂直方向</h4>
          <el-carousel 
            height="200px"
            direction="vertical"
            :interval="3000"
          >
            <el-carousel-item v-for="item in verticalItems" :key="item.id">
              <div class="vertical-item-content" :style="{ background: item.color }">
                <el-icon :size="40"><component :is="item.icon" /></el-icon>
                <h3>{{ item.title }}</h3>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>

        <div class="demo-section">
          <h4>图片轮播</h4>
          <el-carousel 
            height="400px"
            :interval="5000"
            arrow="always"
          >
            <el-carousel-item v-for="item in imageItems" :key="item.id">
              <div class="image-item-content">
                <el-image 
                  :src="item.image" 
                  fit="cover" 
                  style="width: 100%; height: 100%;"
                />
                <div class="image-overlay">
                  <h2>{{ item.title }}</h2>
                  <p>{{ item.subtitle }}</p>
                </div>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      
      <!-- 状态显示 -->
      <div class="status">
        <div>高度: {{ cfg.height }}</div>
        <div>切换间隔: {{ cfg.interval }}ms</div>
        <div>自动播放: {{ cfg.autoplay ? '是' : '否' }}</div>
        <div>循环播放: {{ cfg.loop ? '是' : '否' }}</div>
        <div>方向: {{ cfg.direction }}</div>
        <div>指示器位置: {{ cfg.indicatorPosition }}</div>
      </div>
    </el-card>

    <el-drawer v-model="show" title="走马灯属性设置" size="45%" :close-on-click-modal="true">
      <div class="drawer-content">
        <el-alert type="info" show-icon :closable="false" style="margin-bottom: 20px;"
          description="提示：1) Carousel 用于在有限空间内循环播放内容；2) 支持水平和垂直方向；3) 可以自定义切换效果。" />
        
        <!-- 基础属性 -->
        <div class="section">
          <h4>基础属性</h4>
          
          <div class="form-item">
            <div class="label-text">高度</div>
            <div class="prop-name">height</div>
            <el-input v-model="cfg.height" placeholder="如 300px" style="width: 200px;" />
            <div class="help-text">走马灯的高度</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">切换间隔</div>
            <div class="prop-name">interval</div>
            <el-input-number v-model="cfg.interval" :min="1000" :max="10000" :step="1000" style="width: 200px;" />
            <div class="help-text">自动切换的时间间隔，单位为毫秒</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">自动播放</div>
            <div class="prop-name">autoplay</div>
            <el-switch v-model="cfg.autoplay" />
            <div class="help-text">是否自动切换</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">循环播放</div>
            <div class="prop-name">loop</div>
            <el-switch v-model="cfg.loop" />
            <div class="help-text">是否循环显示</div>
          </div>

          <div class="form-item">
            <div class="label-text">悬停暂停</div>
            <div class="prop-name">pause-on-hover</div>
            <el-switch v-model="cfg.pauseOnHover" />
            <div class="help-text">鼠标悬停时是否暂停</div>
          </div>
        </div>
        
        <!-- 显示设置 -->
        <div class="section">
          <h4>显示设置</h4>
          
          <div class="form-item">
            <div class="label-text">切换箭头显示时机</div>
            <div class="prop-name">arrow</div>
            <el-radio-group v-model="cfg.arrow">
              <el-radio-button label="always">always</el-radio-button>
              <el-radio-button label="hover">hover</el-radio-button>
              <el-radio-button label="never">never</el-radio-button>
            </el-radio-group>
            <div class="help-text">切换箭头的显示时机</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">方向</div>
            <div class="prop-name">direction</div>
            <el-radio-group v-model="cfg.direction">
              <el-radio-button label="horizontal">horizontal</el-radio-button>
              <el-radio-button label="vertical">vertical</el-radio-button>
            </el-radio-group>
            <div class="help-text">走马灯展示的方向</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">指示器位置</div>
            <div class="prop-name">indicator-position</div>
            <el-select v-model="cfg.indicatorPosition" style="width: 200px;">
              <el-option label="outside" value="outside" />
              <el-option label="none" value="none" />
              <el-option label="" value="" />
            </el-select>
            <div class="help-text">指示器的位置</div>
          </div>

          <div class="form-item">
            <div class="label-text">走马灯类型</div>
            <div class="prop-name">type</div>
            <el-radio-group v-model="cfg.type">
              <el-radio-button label="">default</el-radio-button>
              <el-radio-button label="card">card</el-radio-button>
            </el-radio-group>
            <div class="help-text">走马灯的类型</div>
          </div>
        </div>
        
        <!-- 使用说明 -->
        <div class="section">
          <h4>使用说明</h4>
          
          <div class="form-item">
            <div class="label-text">基本用法</div>
            <div class="prop-name">基本用法</div>
            <div class="code-block">
              <pre><code>&lt;el-carousel height="300px"&gt;
  &lt;el-carousel-item v-for="item in items" :key="item.id"&gt;
    &lt;h3&gt;&#123;&#123; item.title &#125;&#125;&lt;/h3&gt;
  &lt;/el-carousel-item&gt;
&lt;/el-carousel&gt;</code></pre>
            </div>
            <div class="help-text">Carousel 组件的基本使用方式</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">卡片化</div>
            <div class="prop-name">卡片化</div>
            <div class="code-block">
              <pre><code>&lt;el-carousel type="card" height="300px"&gt;
  &lt;el-carousel-item v-for="item in items" :key="item.id"&gt;
    &lt;div&gt;内容&lt;/div&gt;
  &lt;/el-carousel-item&gt;
&lt;/el-carousel&gt;</code></pre>
            </div>
            <div class="help-text">卡片化的走马灯效果</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">垂直方向</div>
            <div class="prop-name">垂直方向</div>
            <div class="code-block">
              <pre><code>&lt;el-carousel direction="vertical" height="200px"&gt;
  &lt;el-carousel-item v-for="item in items" :key="item.id"&gt;
    &lt;div&gt;内容&lt;/div&gt;
  &lt;/el-carousel-item&gt;
&lt;/el-carousel&gt;</code></pre>
            </div>
            <div class="help-text">垂直方向的走马灯</div>
          </div>
          
          <div class="form-item">
            <div class="label-text">事件处理</div>
            <div class="prop-name">事件处理</div>
            <div class="code-block">
              <pre><code>&lt;el-carousel @change="handleChange"&gt;
  &lt;el-carousel-item&gt;...&lt;/el-carousel-item&gt;
&lt;/el-carousel&gt;

const handleChange = (current, prev) => {
  console.log('切换:', current, prev)
}</code></pre>
            </div>
            <div class="help-text">监听走马灯切换事件</div>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { Picture, Star, TrendCharts, DataAnalysis } from '@element-plus/icons-vue'

// 响应式数据
const show = ref(false)

// 配置对象
const cfg = reactive({
  height: '300px',
  interval: 3000,
  arrow: 'hover',
  autoplay: true,
  loop: true,
  direction: 'horizontal',
  indicatorPosition: '',
  type: '',
  pauseOnHover: true
})

// 基础轮播项
const basicItems = ref([
  { id: 1, title: '第一页', description: '这是第一页的内容', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { id: 2, title: '第二页', description: '这是第二页的内容', color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
  { id: 3, title: '第三页', description: '这是第三页的内容', color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
  { id: 4, title: '第四页', description: '这是第四页的内容', color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }
])

// 卡片轮播项
const cardItems = ref([
  { id: 1, title: '风景图片 1', description: '美丽的自然风光', image: 'https://picsum.photos/600/400?random=1' },
  { id: 2, title: '风景图片 2', description: '壮观的山川景色', image: 'https://picsum.photos/600/400?random=2' },
  { id: 3, title: '风景图片 3', description: '宁静的湖泊景观', image: 'https://picsum.photos/600/400?random=3' },
  { id: 4, title: '风景图片 4', description: '迷人的城市夜景', image: 'https://picsum.photos/600/400?random=4' },
  { id: 5, title: '风景图片 5', description: '绚丽的日落余晖', image: 'https://picsum.photos/600/400?random=5' }
])

// 垂直轮播项
const verticalItems = ref([
  { id: 1, title: '图片库', icon: Picture, color: '#409eff' },
  { id: 2, title: '数据统计', icon: TrendCharts, color: '#67c23a' },
  { id: 3, title: '数据分析', icon: DataAnalysis, color: '#e6a23c' },
  { id: 4, title: '精选推荐', icon: Star, color: '#f56c6c' }
])

// 图片轮播项
const imageItems = ref([
  { id: 1, title: '探索自然之美', subtitle: '发现世界的精彩瞬间', image: 'https://picsum.photos/1200/600?random=10' },
  { id: 2, title: '城市的脉搏', subtitle: '感受现代都市的魅力', image: 'https://picsum.photos/1200/600?random=11' },
  { id: 3, title: '山川壮丽', subtitle: '领略大自然的鬼斧神工', image: 'https://picsum.photos/1200/600?random=12' },
  { id: 4, title: '海天一色', subtitle: '沉浸在蔚蓝的世界', image: 'https://picsum.photos/1200/600?random=13' }
])

// 方法
const openDrawer = () => {
  console.log('打开走马灯设置抽屉')
  show.value = true
}

// 事件处理
const handleChange = (current, prev) => {
  console.log('走马灯切换:', current, prev)
  ElMessage.info(`从第 ${prev + 1} 页切换到第 ${current + 1} 页`)
}
</script>

<style scoped>
.demo-page { padding: 12px; }
.card-header { font-weight: 600; display: flex; justify-content: space-between; align-items: center; }
.demo-section { margin-bottom: 30px; }
.demo-section h4 { margin: 0 0 15px 0; color: #303133; font-size: 16px; font-weight: 600; }
.status { margin: 12px 0; padding: 8px; background: #f5f7fa; border-radius: 4px; font-size: 12px; }

/* 基础轮播项样式 */
.carousel-item-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  text-align: center;
}

.carousel-item-content h3 {
  margin: 0 0 10px 0;
  font-size: 32px;
  font-weight: 600;
}

.carousel-item-content p {
  margin: 0;
  font-size: 18px;
  opacity: 0.9;
}

/* 卡片轮播项样式 */
.card-item-content {
  height: 100%;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.card-info {
  padding: 16px;
}

.card-info h4 {
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 600;
  color: #303133;
}

.card-info p {
  margin: 0;
  font-size: 14px;
  color: #909399;
}

/* 垂直轮播项样式 */
.vertical-item-content {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  color: #fff;
}

.vertical-item-content h3 {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
}

/* 图片轮播项样式 */
.image-item-content {
  height: 100%;
  position: relative;
}

.image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 40px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  color: #fff;
}

.image-overlay h2 {
  margin: 0 0 10px 0;
  font-size: 36px;
  font-weight: 600;
}

.image-overlay p {
  margin: 0;
  font-size: 18px;
  opacity: 0.9;
}

.drawer-content { padding: 0 8px; }
.section { margin-bottom: 24px; padding: 20px; background: #fafafa; border-radius: 8px; }
.section h4 { margin: 0 0 20px 0; font-size: 16px; font-weight: 600; color: #303133; border-bottom: 2px solid #e4e7ed; padding-bottom: 8px; }

.form-item { margin-bottom: 24px; padding: 16px; background: #fff; border-radius: 6px; border: 1px solid #e4e7ed; }
.label-text { font-size: 14px; font-weight: 600; color: #303133; margin-bottom: 4px; }
.prop-name { font-size: 12px; color: #409eff; background: #ecf5ff; padding: 2px 6px; border-radius: 3px; display: inline-block; margin-bottom: 12px; font-family: 'Courier New', monospace; }
.help-text { font-size: 12px; color: #909399; margin-top: 8px; line-height: 1.4; }

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
</style>

