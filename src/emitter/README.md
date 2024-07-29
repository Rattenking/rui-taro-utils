### 1. 介绍
> EventEmitter 是通过发布-订阅模式实现的事件通知机制。用于防止重复点击和重复请求数据，提高用户体验。

### 2. 安装
```
npm install rui-taro-utils
```

### 3. 使用
```
import { EventEmitter } from 'rui-taro-utils';

const eventEmitter = new EventEmitter();

// 订阅事件
eventEmitter.on('event', resolve, reject);

// 发布事件
// 成功发布
eventEmitter.emit('event', data, 'resolve');
// 失败发布
eventEmitter.emit('event', err,'reject');
```

### 4. API 介绍
#### 4.1. on(event: string, resolve: Function, reject: Function)
> 订阅事件。event 事件名称，resolve 成功回调函数，reject 失败回调函数。

#### 4.2. once(event: string, listener: Function)
> 订阅一次性事件。event 事件名称，listener 监听函数。

#### 4.3. all(event: string, resolve: Function, reject: Function, listener: Function)
> 相同订阅事件，监听第一次的执行，第一次执行完成，其他直接返回第一次的结果。 event 事件名称，resolve 成功回调函数，reject 失败回调函数，listener 监听函数。

#### 4.4. emit(event: string, data: any, type: string)
> 发布事件。event 事件名称，data 事件数据，type 事件类型，resolve 成功回调函数类型，reject 失败回调函数类型。

#### 4.5. delete(event: string)
> 删除指定事件的所有订阅。event 事件名称。

#### 4.5. clear()
> 清空所有订阅事件。