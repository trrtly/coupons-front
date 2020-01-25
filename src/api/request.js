import service from './service'
import { Toast } from 'vant'

function axios(config) {
  return new Promise(resolve => {
    service(config)
      .then(res => {
        if (res.status === 200) {
          resolve(res.data)
        } else {
          Toast(res.msg)
        }
      })
      .catch(error => {
        Toast(error.data.msg)
      })
  })
}

const request = {
  get: (url, params) => {
    let config = {
      url,
      method: 'get',
      params
    }
    return axios(config)
  },
  post: (url, data) => {
    let config = {
      url,
      method: 'post',
      data: data,
      headers: { 'Content-Type': 'application/json;charset=UTF-8' }
    }
    return axios(config)
  },
  put: (url, data) => {
    let config = {
      url,
      method: 'put',
      data
    }
    return axios(config)
  },
  delete: (url, data) => {
    let config = {
      url,
      method: 'delete',
      data
    }
    return axios(config)
  }
}

export default request
