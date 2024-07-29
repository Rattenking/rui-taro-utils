import barcode from './utils/barcode';
import { createQrCodeImg } from './utils/qrcode';

function isValidASCII(str) {
  // 使用正则表达式判断是否只包含 ASCII 0-127 的字符
  const regex = /^[\x00-\x7F]*$/;
  return regex.test(str);
}

// 条码参数校验
const getBarCode = (text, opts) => {
  if(text && isValidASCII(text)){
    let { scale = 4 } = opts || {};
    return barcode({text, scale});
  }
  return '';
}

// 二维码参数默认
const getQrCode = (text, opts) => {
  if(text){
    const { size=100, scale=4, typeNumber=2, errorCorrectLevel='M' } = opts || {};
    const options = { errorCorrectLevel, typeNumber, size: size * scale };
    return createQrCodeImg(text, options)
  }
  return '';
}

export {
  getBarCode,
  getQrCode
}