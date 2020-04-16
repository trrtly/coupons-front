import axios from 'axios'

// 请求的默认配置
const service = axios.create({
  timeout: 60 * 1000
})
// 添加请求拦截器
service.interceptors.request.use(
  res => {
    // 在发送请求之前做些什么
    res.headers.common['Authorization'] = localStorage.getItem('token') || ''
    return res
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  res => {
    // 对响应数据做点什么
    return res
  },
  error => {
    // 对响应错误做点什么
    return Promise.reject(error.response)
  }
)

export default service
