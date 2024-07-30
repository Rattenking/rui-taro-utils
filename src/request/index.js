import Axios from './axios';
import config from './config';

const createInstance = (defaultConfig) => {
  let context = new Axios(defaultConfig);
  let instance = Axios.prototype.request.bind(context)
  Object.keys(Axios.prototype).forEach(key => {
    instance[key] = Axios.prototype[key].bind(context);
  })
  Object.keys(context).forEach(key => {
    instance[key] = context[key];
  })
  return instance
};
const axios = createInstance(config);

export default axios;