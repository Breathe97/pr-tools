/**
 * 格式化时间
 * @param {String} dateTime 时间戳
 * @param {String} format 默认的格式化内容 yyyy-mm-dd hh:MM:ss
 * @returns {String} 格式化后的字符串
 */
export const timeFormat = (dateTime = '', format = 'yyyy-mm-dd') => {
  if (!dateTime) return ''
  // 如果可以转为数字 则优先认为是时间戳
  let timestamp = Number(dateTime)
  let date = new Date(timestamp || dateTime)
  // 无效的日期格式
  if (`${date}` === 'Invalid Date') return dateTime

  // 正常对日期的处理
  let opt = {
    'y+': date.getFullYear().toString(), // 年
    'm+': (date.getMonth() + 1).toString(), // 月
    'd+': date.getDate().toString(), // 日
    'h+': date.getHours().toString(), // 时
    'M+': date.getMinutes().toString(), // 分
    's+': date.getSeconds().toString() // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  }
  let ret
  for (let k in opt) {
    ret = new RegExp('(' + k + ')').exec(format)
    if (ret) {
      let str = ret[1]
      // @ts-ignore
      let k_val = opt[k]
      let k_format = k_val.padStart(str.length, '0') // 生成替换内容 补足0位
      format = format.replace(str, k_format) // 替换
    }
  }
  return format
}

/**
 * 格式化时间
 * @param {String} dateTime 时间戳
 * @param {String} format 默认的格式化内容 yyyy-mm-dd hh:MM:ss
 * @returns {String} 格式化后的字符串
 */
export const timeFrom = (dateTime = '', format = 'yyyy-mm-dd') => {
  if (!dateTime) return ''
  // 如果可以转为数字 则优先认为是时间戳
  let timestamp = Number(dateTime)
  let date = new Date(timestamp || dateTime)
  // 无效的日期格式
  if (`${date}` === 'Invalid Date') return dateTime

  // 如果要优先处理为 多久之前
  let timer = new Date().getTime() - timestamp
  timer = Math.floor(timer / 1000)
  // 如果小于5分钟,则返回"刚刚",其他以此类推
  let tips = ''
  switch (true) {
    case timer < 300:
      tips = '刚刚'
      break
    case timer >= 300 && timer < 3600:
      tips = Math.floor(timer / 60) + '分钟前'
      break
    case timer >= 3600 && timer < 86400:
      tips = Math.floor(timer / 3600) + '小时前'
      break
    case timer >= 86400 && timer < 2592000:
      tips = Math.floor(timer / 86400) + '天前'
      break
    default:
      // 如果format为false，则无论什么时间戳，都显示xx之前
      if (!format) {
        if (timer >= 2592000 && timer < 365 * 86400) {
          tips = Math.floor(timer / (86400 * 30)) + '个月前'
        } else {
          tips = Math.floor(timer / (86400 * 365)) + '年前'
        }
      } else {
        tips = timeFormat(`${timer}`, format)
      }
  }
  return tips
}

/**
 * ArrayBuffer转十六进制
 * @param {ArrayBuffer} buffer arrayBuffer
 * @returns {String} 十六进制字符串
 */
export const ab2hex = (buffer = new ArrayBuffer(0)) => {
  if (!buffer) return buffer
  const hexArr = Array.prototype.map.call(new Uint8Array(buffer), function (bit) {
    return ('00' + bit.toString(16)).slice(-2)
  })
  // console.log(hexArr.join(''))
  return hexArr.join('').toUpperCase()
}

/**
 * 十六进制转ArrayBuffer
 * @param {String} str 十六进制字符串
 * @returns {ArrayBuffer} buffer
 */
export const hex2ab = (str = '') => {
  let buffer = new ArrayBuffer(str.length * 0.5)
  let dataView = new DataView(buffer)
  for (let i = 0; i < str.length; i++) {
    if (i % 2 === 0) {
      dataView.setUint8(i * 0.5, parseInt(str.slice(i, i + 2), 16))
    }
  }
  return buffer
}

/**
 * 十六进制转ASCII码
 * @param {String} hexCharCodeStr 16进制字符串
 * @returns {String} 转换后的ASCII码
 */
export const hex2str = (hexCharCodeStr = '') => {
  let trimedStr = hexCharCodeStr.trim()
  let rawStr = trimedStr.substr(0, 2).toLowerCase() === '0x' ? trimedStr.substr(2) : trimedStr
  let len = rawStr.length
  if (len % 2 !== 0) {
    console.log('存在非法字符')
    return '*'
  }
  let curCharCode
  let resultStr = []
  for (let i = 0; i < len; i = i + 2) {
    curCharCode = parseInt(rawStr.substr(i, 2), 16)
    resultStr.push(String.fromCharCode(curCharCode))
  }
  // console.log(hexCharCodeStr, trimedStr, rawStr, resultStr.join(''))
  return resultStr.join('')
}

/**
 * 短划线转换驼峰
 * @param {String} str 短横线字符串
 * @returns {String} 驼峰字符串
 */
export const line2hump = (str = '') => {
  const _str = str.replace(/\-(\w)/g, (_, letter) => {
    const new_letter = letter.toUpperCase()
    return new_letter
  })
  return _str
}

/**
 * 驼峰转换短横线
 * @param {String} str 驼峰字符串
 * @returns {String} 短横线字符串
 */
export const hump2line = (str = '') => {
  let _str = str.replace(/([A-Z])/g, '-$1').toLowerCase()
  // 头部横线
  const isGreat = _str.slice(0, 1) === '-'
  if (isGreat) {
    _str = _str.replace('-', '')
  }

  return _str
}

/**
 * 去除首尾空格
 * @param {String} str 字符串
 * @returns {String} 结果字符串
 */
export const delSpaces = (str = '') => {
  return str.replace(/(^\s*)|(\s*$)/g, '')
}

/**
 * 获取校准后的当前时间时间戳
 * @param {Number} offset 校准小时
 * @returns {Number} timestamp 13位时间戳
 */
export const getTime = (offset = 0) => {
  return new Date().getTime() + 1000 * 60 * 60 * offset // + 8小时
}
