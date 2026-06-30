import axios from 'axios'

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // 使用环境变量或代理路径
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 添加 token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    console.error('请求错误:', error)
    // 统一错误处理
    if (error.response?.status === 401) {
      // 跳转到登录页
      window.location.href = '/login'
    }
    return Promise.reject(error)
  },
)

export default request
