### 1. 安装
```
npm install rui-taro-utils
```

### 2. 订阅-发布
```
import { EventEmitter } from 'rui-taro-utils';

// 创建事件管理器
const ev = new EventEmitter();

// 判断事件是否已订阅
ev.has('eventName');

// 订阅事件
ev.on('eventName', resolve, reject);

// 失败发布
ev.emit('eventName', err, 'reject');
// 成功发布
ev.emit('eventName', data, 'resolve');

// 取消订阅
ev.delete('eventName')

// 提交等操作一次订阅
ev.once('eventName', (done) => {
  // 异步操作
  setTimeout(() => {
    // 完成订阅-发布操作，并通知完成，可以进行下次操作
    done();
  }, 1000);
});
```

### 3. 将 Taro.request 简单封装 axios 实现拦截
```
import { axios } from 'rui-taro-utils';

axios.defaults.baseURL = 'https://api.github.com'
//请求拦截器
axios.interceptors.request.use(config=>{
    console.log('请求配置信息：',config);
    return config
})

//响应拦截器
axios.interceptors.response.use(res=>{
  console.log('请求响应信息',res)
  return res;
})

export default axios;
```

### 4. 二维码和条形码
> 直接返回 base64 字符串，可直接使用。
```
import { getBarCode, getQrCode } from 'rui-taro-utils';

// 生成条形码
getBarCode('1234567890')

// 生成二维码
getQrCode('https://www.baidu.com')
```