<template>
  <div class="login-container">
    <!-- 背景轮播图 -->
    <el-carousel 
      class="login-carousel" 
      :interval="5000" 
      arrow="never" 
      :indicator-position="indicatorPosition"
      height="100vh"
    >
      <el-carousel-item v-for="(item, index) in carouselItems" :key="index">
        <div class="carousel-item-bg" :style="{ backgroundImage: `url(${item.image})` }">
          <div class="carousel-overlay"></div>
        </div>
      </el-carousel-item>
    </el-carousel>

    <!-- 左上角欢迎文字 -->
    <div class="welcome-text">
      <h1 class="welcome-title">欢迎来到浩南知识库</h1>
      <p class="welcome-subtitle">个人知识管理系统</p>
    </div>

    <!-- 右侧登录表单 -->
    <div class="login-form-container">
        <div class="login-form-wrapper">
          <div class="login-header">
            <h2 class="login-title">系统登录</h2>
            <p class="login-desc">请输入您的登录凭据</p>
          </div>

          <el-form 
            ref="loginFormRef"
            :model="loginForm" 
            :rules="rules" 
            class="login-form"
            size="large"
            @keyup.enter="handleLogin"
          >
            <el-form-item prop="username" class="form-item">
              <el-input
                v-model="loginForm.username"
                placeholder="请输入用户名"
                prefix-icon="User"
                clearable
                :disabled="loading"
              >

              </el-input>
            </el-form-item>

            <el-form-item prop="password" class="form-item">
              <el-input
                v-model="loginForm.password"
                type="password"
                placeholder="请输入密码"
                prefix-icon="Lock"
                show-password
                clearable
                :disabled="loading"
              >

              </el-input>
            </el-form-item>

            <el-form-item class="form-item remember-item">
              <el-checkbox v-model="loginForm.remember" :disabled="loading">
                记住我
              </el-checkbox>
            </el-form-item>

            <el-form-item class="form-item">
              <el-button 
                type="primary" 
                class="login-button"
                :loading="loading"
                :disabled="loading"
                @click="handleLogin"
              >
                <span v-if="!loading">登录</span>
                <span v-else>登录中...</span>
              </el-button>
            </el-form-item>
          </el-form>

          <!-- 登录提示信息 -->
          <div class="login-tips">
            <el-alert
              title="演示账号信息"
              type="info"
              :closable="false"
              show-icon
            >
              <template #default>
                <div class="tips-content">
                  <p><strong>用户名：</strong>浩南</p>
                  <p><strong>密码：</strong>123456</p>
                </div>
              </template>
            </el-alert>
          </div>
        </div>
    </div>

    <!-- 页面底部 -->
    <div class="login-footer">
      <p>&copy; 2025 浩南知识库. All rights reserved.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage, ElNotification } from 'element-plus'
import { 
  User, 
  Lock, 
  Star, 
  Document, 
  Collection, 
  DataAnalysis 
} from '@element-plus/icons-vue'
import { useUserStore } from '../store/userStore'

// 路由相关
const router = useRouter()
const route = useRoute()

// 定义事件发射器
const emit = defineEmits(['login-success'])

// 用户状态管理
const userStore = useUserStore()

// 表单引用
const loginFormRef = ref()

// 加载状态
const loading = ref(false)

// 轮播图指示器位置
const indicatorPosition = ref('none')

// 轮播图数据 - 使用更高清的图片
const carouselItems = ref([
  {
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&h=1080&fit=crop&q=90',
    title: '知识管理系统'
  },
  {
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop&q=90',
    title: 'Element Plus 演示'
  },
  {
    image: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=1920&h=1080&fit=crop&q=90',
    title: '数据可视化'
  },
  {
    image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1920&h=1080&fit=crop&q=90',
    title: '现代化界面'
  }
])

// 登录表单数据
const loginForm = reactive({
  username: '',
  password: '',
  remember: true
})

// 表单验证规则
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, max: 20, message: '用户名长度在 2 到 20 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' }
  ]
}

/**
 * 处理登录
 */
const handleLogin = async () => {
  if (!loginFormRef.value) return
  
  try {
    // 表单验证
    await loginFormRef.value.validate()
    
    loading.value = true
    
    // 模拟登录请求延迟
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // 验证用户名和密码
    if (loginForm.username === '浩南' && loginForm.password === '123456') {
      // 登录成功
      const userInfo = {
        username: '浩南',
        nickname: '浩南',
        avatar: '', // 可以设置头像URL
        loginTime: new Date().toISOString()
      }
      
      // 保存用户信息
      userStore.login(userInfo, loginForm.remember)
      
      // 显示登录成功消息
      ElNotification({
        title: '登录成功',
        message: `欢迎回来，${userInfo.nickname}！`,
        type: 'success',
        duration: 3000
      })
      
      // 发出登录成功事件给父组件（App.vue）
      setTimeout(() => {
        emit('login-success')
      }, 1000)
      
    } else {
      // 登录失败
      ElMessage.error('用户名或密码错误')
      loading.value = false
    }
    
  } catch (error) {
    console.error('登录失败:', error)
    ElMessage.error('登录过程中发生错误，请重试')
    loading.value = false
  }
}

// 组件挂载时初始化
onMounted(() => {
  // 自动填充演示账号（仅在开发环境）
  if (process.env.NODE_ENV === 'development') {
    loginForm.username = '浩南'
    loginForm.password = '123456'
  }
})
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

/* 轮播图背景 */
.login-carousel {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.login-carousel :deep(.el-carousel__container) {
  height: 100vh;
}

.carousel-item-bg {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
}

.carousel-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.35);
}

/* 左上角欢迎文字 */
.welcome-text {
  position: absolute;
  top: 60px;
  left: 60px;
  z-index: 10;
  color: #fff;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
}

.welcome-title {
  margin: 0 0 12px 0;
  font-size: 36px;
  font-weight: 600;
  color: #fff;
}

.welcome-subtitle {
  margin: 0;
  font-size: 16px;
  color: #fff;
  opacity: 0.95;
}

/* 右侧登录表单容器 */
.login-form-container {
  position: absolute;
  right: 80px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  width: 420px;
}

.login-form-wrapper {
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.6);
}

.login-header {
  text-align: center;
  margin-bottom: 32px;
}

.login-title {
  font-size: 28px;
  font-weight: 600;
  color: #303133;
  margin: 0 0 8px 0;
}

.login-desc {
  font-size: 14px;
  color: #909399;
  margin: 0;
}

.login-form {
  margin-bottom: 24px;
}

.form-item {
  margin-bottom: 24px;
}

.form-item .el-input {
  height: 48px;
}

.form-item .el-input .el-input__wrapper {
  padding: 0 16px;
  border-radius: 8px;
  border: 2px solid #e4e7ed;
  transition: all 0.3s ease;
}

.form-item .el-input .el-input__wrapper:hover {
  border-color: #c0c4cc;
}

.form-item .el-input.is-focus .el-input__wrapper {
  border-color: #409eff;
  box-shadow: 0 0 0 4px rgba(64, 158, 255, 0.1);
}

.input-icon {
  color: #909399;
  font-size: 16px;
}

.remember-item {
  margin-bottom: 16px;
}

.remember-item .el-checkbox {
  color: #606266;
}

.login-button {
  width: 100%;
  height: 48px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  background: linear-gradient(135deg, #409eff 0%, #3a8ee6 100%);
  border: none;
  transition: all 0.3s ease;
}

.login-button:hover {
  background: linear-gradient(135deg, #3a8ee6 0%, #337ecc 100%);
  transform: translateY(-1px);
  box-shadow: 0 8px 25px rgba(64, 158, 255, 0.3);
}

.login-button:active {
  transform: translateY(0);
}

.login-tips {
  margin-top: 24px;
}

.tips-content {
  font-size: 13px;
}

.tips-content p {
  margin: 4px 0;
}

.tips-content strong {
  color: #409eff;
}

.login-footer {
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  text-align: center;
  padding: 20px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
  z-index: 10;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .welcome-text {
    top: 40px;
    left: 40px;
  }
  
  .welcome-title {
    font-size: 28px;
  }
  
  .welcome-subtitle {
    font-size: 14px;
  }
  
  .login-form-container {
    right: 40px;
    width: 380px;
  }
}

@media (max-width: 768px) {
  .welcome-text {
    position: static;
    text-align: center;
    padding: 40px 20px 20px;
    text-shadow: none;
    color: #303133;
  }
  
  .welcome-title {
    font-size: 24px;
    color: #303133;
  }
  
  .welcome-subtitle {
    color: #606266;
  }
  
  .login-form-container {
    position: static;
    transform: none;
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .login-footer {
    position: static;
    background: #fff;
    color: #909399;
    text-shadow: none;
    border-top: 1px solid #e4e7ed;
  }
}

@media (max-width: 480px) {
  .login-form-wrapper {
    padding: 30px 24px;
  }
  
  .login-title {
    font-size: 22px;
  }
}
</style>
