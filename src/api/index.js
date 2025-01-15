// src/api/index.js
import axios from 'axios'
import { ElMessage } from 'element-plus'

// 创建 axios 实例
const service = axios.create({
    baseURL: 'http://localhost:3000/api', // 替换为后端接口地址
    timeout: 10000,
})

// 请求拦截器
service.interceptors.request.use(
    (config) => {
        // 例如给请求头自动添加 token
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// 响应拦截器
service.interceptors.response.use(
    (response) => {
        // 可根据后端约定的返回格式做统一处理
        if (response.data.code !== 0) {
            // 表示业务逻辑错误
            ElMessage.error(response.data.message || '请求失败')
            return Promise.reject(new Error(response.data.message))
        }
        return response.data
    },
    (error) => {
        ElMessage.error(error.message || '网络错误')
        return Promise.reject(error)
    }
)

export default service
