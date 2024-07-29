import Taro from "@tarojs/taro";
import Interceptor from './util/Interceptor';
import { deepClone, mergeConfig } from './util/index';
class Axios{
  constructor(config) {
    // 默认配置
    this.defaults = deepClone(config);
    //拦截器
    this.interceptors = {
      request : new Interceptor(),
      response : new Interceptor()
    }
  }
  get (url,config={}) {
    config.method = 'GET';
    config.url = url;
    return this.request(config);
  }
  post (url, data = {}, config={}){
    config.method = 'POST';
    config.url = url;
    config.data = data;
    return this.request(config);
  }
  create (config) {
    return new Axios(config);
  }
  //request请求
  request (config) {
    //配置合并
    let configs = mergeConfig(this.defaults, config);
    //将配置转成 Promise 对象，链式调用和返回 Promise 对象
    let promise = Promise.resolve(configs);
    
    //请求拦截器，遍历 interceptors.request 里的处理函数
    let requestHandlers = this.interceptors.request.handlers;
    requestHandlers.forEach(handler => {
      promise = promise.then(handler.resolvedHandler, handler.rejectedHandler)
    });
    
    //数据请求
    promise = promise.then(this.send)
    
    //相应拦截器，遍历 interceptors.response 里的处理函数
    let responseHandlers = this.interceptors.response.handlers;
    responseHandlers.forEach(handler => {
      promise = promise.then(handler.resolvedHandler, handler.rejectedHandler)
    })
    
    //返回响应信息
    return promise;
  }
  send (configs) {
    return new Promise((resolve, reject) => {
      Taro.request({
        url: configs.baseURL + configs.url,
        header: {
          ...configs.headers
        },
        timeout: configs.timeout,
        method: configs.method,
        data: configs.data,
        success: resolve,
        fail: reject
      })
    })
  }
}
export default Axios;