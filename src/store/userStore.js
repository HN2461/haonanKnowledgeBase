/**
 * 用户状态管理 Store
 * 使用 Pinia 进行状态管理，负责用户登录、退出、认证状态管理等功能
 */
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { ElMessage, ElNotification } from 'element-plus'

export const useUserStore = defineStore('user', () => {
  // ==================== 状态定义 ====================
  
  /**
   * 用户信息
   * 包含用户的基本信息
   */
  const userInfo = ref({
    username: '',      // 用户名
    nickname: '',      // 昵称
    avatar: '',        // 头像URL
    loginTime: '',     // 登录时间
    permissions: []    // 用户权限列表（预留）
  })
  
  /**
   * 登录状态
   */
  const isLoggedIn = ref(false)
  
  /**
   * 登录时间戳
   */
  const loginTimestamp = ref(0)
  
  /**
   * 是否记住登录状态
   */
  const rememberLogin = ref(false)

  // ==================== 计算属性 ====================
  
  /**
   * 用户显示名称
   * 优先显示昵称，如果没有昵称则显示用户名
   */
  const displayName = computed(() => {
    return userInfo.value.nickname || userInfo.value.username || '用户'
  })
  
  /**
   * 用户头像
   * 如果用户没有设置头像，返回默认头像或空字符串
   */
  const userAvatar = computed(() => {
    return userInfo.value.avatar || ''
  })
  
  /**
   * 登录时长（分钟）
   */
  const loginDuration = computed(() => {
    if (!isLoggedIn.value || !loginTimestamp.value) return 0
    return Math.floor((Date.now() - loginTimestamp.value) / (1000 * 60))
  })

  // ==================== 本地存储相关 ====================
  
  /**
   * 从本地存储加载用户数据
   */
  const loadFromStorage = () => {
    try {
      // 检查是否有记住的登录状态
      const savedRemember = localStorage.getItem('user_remember')
      const storageType = savedRemember === 'true' ? localStorage : sessionStorage
      
      const savedUserInfo = storageType.getItem('user_info')
      const savedIsLoggedIn = storageType.getItem('user_logged_in')
      const savedLoginTime = storageType.getItem('user_login_time')
      
      if (savedUserInfo && savedIsLoggedIn === 'true') {
        userInfo.value = JSON.parse(savedUserInfo)
        isLoggedIn.value = true
        loginTimestamp.value = parseInt(savedLoginTime) || Date.now()
        rememberLogin.value = savedRemember === 'true'
        
        console.log('已从本地存储恢复用户登录状态')
        return true
      }
    } catch (error) {
      console.error('从本地存储加载用户数据失败:', error)
      clearStorage()
    }
    return false
  }
  
  /**
   * 保存用户数据到本地存储
   */
  const saveToStorage = () => {
    try {
      const storageType = rememberLogin.value ? localStorage : sessionStorage
      
      storageType.setItem('user_info', JSON.stringify(userInfo.value))
      storageType.setItem('user_logged_in', isLoggedIn.value.toString())
      storageType.setItem('user_login_time', loginTimestamp.value.toString())
      
      // 记住登录状态总是保存在localStorage中
      localStorage.setItem('user_remember', rememberLogin.value.toString())
      
    } catch (error) {
      console.error('保存用户数据到本地存储失败:', error)
    }
  }
  
  /**
   * 清除本地存储的用户数据
   */
  const clearStorage = () => {
    try {
      // 清除localStorage
      localStorage.removeItem('user_info')
      localStorage.removeItem('user_logged_in')
      localStorage.removeItem('user_login_time')
      localStorage.removeItem('user_remember')
      
      // 清除sessionStorage
      sessionStorage.removeItem('user_info')
      sessionStorage.removeItem('user_logged_in')
      sessionStorage.removeItem('user_login_time')
      
    } catch (error) {
      console.error('清除本地存储失败:', error)
    }
  }

  // ==================== 方法定义 ====================
  
  /**
   * 用户登录
   * @param {Object} userData - 用户数据
   * @param {boolean} remember - 是否记住登录状态
   */
  const login = (userData, remember = false) => {
    try {
      // 更新用户信息
      userInfo.value = {
        username: userData.username || '',
        nickname: userData.nickname || userData.username || '',
        avatar: userData.avatar || '',
        loginTime: userData.loginTime || new Date().toISOString(),
        permissions: userData.permissions || []
      }
      
      // 更新登录状态
      isLoggedIn.value = true
      loginTimestamp.value = Date.now()
      rememberLogin.value = remember
      
      // 保存到本地存储
      saveToStorage()
      
      console.log('用户登录成功:', displayName.value)
      
    } catch (error) {
      console.error('登录过程中发生错误:', error)
      throw error
    }
  }
  
  /**
   * 用户退出登录
   * @param {boolean} showMessage - 是否显示退出消息
   */
  const logout = (showMessage = true) => {
    try {
      const currentUser = displayName.value
      
      // 清空用户信息
      userInfo.value = {
        username: '',
        nickname: '',
        avatar: '',
        loginTime: '',
        permissions: []
      }
      
      // 更新登录状态
      isLoggedIn.value = false
      loginTimestamp.value = 0
      rememberLogin.value = false
      
      // 清除本地存储
      clearStorage()
      
      if (showMessage) {
        ElMessage.success(`${currentUser}，您已安全退出系统`)
      }
      
      console.log('用户退出登录')
      
    } catch (error) {
      console.error('退出登录过程中发生错误:', error)
    }
  }
  
  /**
   * 更新用户信息
   * @param {Object} updates - 要更新的用户信息
   */
  const updateUserInfo = (updates) => {
    try {
      userInfo.value = { ...userInfo.value, ...updates }
      
      // 如果已登录，保存到本地存储
      if (isLoggedIn.value) {
        saveToStorage()
      }
      
      console.log('用户信息已更新')
      
    } catch (error) {
      console.error('更新用户信息失败:', error)
    }
  }
  
  /**
   * 检查用户权限
   * @param {string} permission - 权限名称
   * @returns {boolean} 是否有权限
   */
  const hasPermission = (permission) => {
    if (!isLoggedIn.value) return false
    return userInfo.value.permissions.includes(permission)
  }
  
  /**
   * 检查用户是否为管理员
   * @returns {boolean} 是否为管理员
   */
  const isAdmin = () => {
    return hasPermission('admin') || userInfo.value.username === '浩南'
  }
  
  /**
   * 刷新登录状态
   * 用于页面刷新时恢复登录状态
   */
  const refreshLoginStatus = () => {
    return loadFromStorage()
  }
  
  /**
   * 延长登录时间
   * 用于保持活跃状态
   */
  const extendLoginTime = () => {
    if (isLoggedIn.value) {
      loginTimestamp.value = Date.now()
      saveToStorage()
    }
  }

  // ==================== 初始化 ====================
  
  /**
   * 初始化用户状态
   * 在应用启动时调用
   */
  const initUserStore = () => {
    // 从本地存储恢复用户状态
    const restored = loadFromStorage()
    
    if (restored) {
      console.log('用户状态已从本地存储恢复')
    } else {
      console.log('未找到保存的用户状态')
    }
    
    return restored
  }

  // ==================== 导出接口 ====================
  
  return {
    // 状态
    userInfo,
    isLoggedIn,
    loginTimestamp,
    rememberLogin,
    
    // 计算属性
    displayName,
    userAvatar,
    loginDuration,
    
    // 方法
    login,
    logout,
    updateUserInfo,
    hasPermission,
    isAdmin,
    refreshLoginStatus,
    extendLoginTime,
    initUserStore
  }
}, {
  // 持久化配置（可选）
  persist: {
    key: 'user-store',
    storage: window.localStorage,
    paths: ['userInfo', 'isLoggedIn', 'rememberLogin', 'loginTimestamp']
  }
})
