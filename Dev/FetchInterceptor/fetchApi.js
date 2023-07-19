import { Nfetch, interceptors } from './fetch-interceptor'
const Cookies = 'cookie message'
/**
 * config 自定义配置项
 * @param withoutCheck 不使用默认的接口状态校验，直接返回 response
 * @param returnOrigin 是否返回整个 response 对象，为 false 只返回 response.data
 * @param showError 全局错误时，是否使用统一的报错方式
 * @param canEmpty 传输参数是否可以为空
 * @param mock 是否使用 mock 服务
 * @param timeout 接口请求超时时间，默认10秒
 */

let configDefault = {
  withoutCheck: false,
  returnOrigin: false,
  showError: true,
  canEmpty: false,
  mock: false,
  timeout: 10000
}

// 添加请求拦截器
interceptors.request.use(config => {
  const token = Cookies
  configDefault = Object.assign({
    responsetype: 'json',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: `Bearer ${token}`
    }
  },configDefault, config)
  return configDefault
})
// 添加响应拦截器
interceptors.response.use(async response => {
  const res = await resultReduction(response.clone())
  if(response.status >= 200 && response.status < 300) {
    return response
  } else {
    if (configDefault.withoutCheck) { // 不进行状态检测
      return Promise.reject(response)
    }
    return Promise.reject(response)
  }
})

// 结果处理，fetch请求响应结果是promise，需要二次处理
async function resultReduction(response) {
  let res = ''
  switch (configDefault.responseType) {
    case 'json':
      res = await response.json()
      break
    case 'text':
      res = await response.text()
      break
    case 'blod':
      res = await response.blod()
      break
    default:
      res = await response.json()
      break
  }
  return res
}

function request(method, path, data, config) {
  let myInit = {
    method,
    ...configDefault,
    ...config,
    body: JSON.stringify(data),
  }
  if (method === 'GET') {
    let params = ''
    if(data) {
      // 对象转url参数
      params = JSON.stringify(data).replace(/:/g, '=')
        .replace(/"/g, '')
        .replace(/,/g, '&')
        .match(/\{([^)]*)\}/)[1]
    }
    return Nfetch(`${path}?${params}`, {
      ...configDefault,
      ...config
    })
  }
  return Nfetch(path, myInit)
}

function get(path, data, config) {
  return request('GET', path, data, config)
}
function post(path, data, config) {
  return request('POST', path, data, config)
}
function put(path, data, config) {
  return request('PUT', path, data, config)
}
function del(path, data, config) {
  return request('DELETE', path, data, config)
}

export default {
  fetch: Nfetch,
  get,
  post,
  put,
  delete: del
}