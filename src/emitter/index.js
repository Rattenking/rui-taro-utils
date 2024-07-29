// 请求监听器
export class EventEmitter{
  constructor(){
    this.event = new Map();
    this.eventNames = new Set();
  }
  has(type){
    return this.eventNames.has(type)
  }
  init(type){
    if(!this.eventNames.has(type)){
      this.eventNames.add(type)
    }
  }
  delete(type){
    this.event.delete(type)
    this.eventNames.delete(type)
  }
  clear(){
    this.event.clear()
    this.eventNames.clear()
  }
  once(type, callback){
    if(!this.has(type)){
      this.init(type)
      callback?.(this.delete.bind(this,type))
    }
  }
  all(type, resolve, reject, callback){
    this.on(type, resolve, reject)
    if(this.has(type)){
      return false;
    }
    this.init(type)
    callback?.(this.delete.bind(this,type))
  }
  on(type, resolve, reject){
    if(!this.event.has(type)){
      this.event.set(type, [{resolve, reject}])
    } else {
      this.event.get(type).push({resolve, reject})
    }
  }
  emit(type, data, ansType){
    if(this.event.has(type)){
      this.event.get(type).forEach(item => {
        if(ansType ==='resolve'){
          item.resolve(data)
        } else if(ansType ==='reject'){
          item.reject(data)
        }
      })
      this.delete(type)
    }
  }
}