import request from './request'
import base from './modules/base'
import user from './modules/user'

// 导入api模块
const apis = [...base, ...user]
let api = {}
// addPrefix(apis)

// 执行下面的循环后，api形如：
// {
//   index: params => {
//     return request.post('/index', params)
//   }
//   ......
// }
/**
 * name：api调用名称
 * method：请求方法，get，post，put，delete等
 * path：请求路径
 */
apis.map(item => {
  api[item.name] = params => request[item.method](item.path, params)
})

export default api
