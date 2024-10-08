/**
 * 时间戳 失败返回 0
 * @param _val Date | number | string
 * @example timeStamp()
 * @example timeStamp(new Date())
 * @example timeStamp(1727550913097)
 * @example timeStamp('2024')
 * @returns 转换后的时间戳 | 0
 */
export const timeStamp = (_val?: Date | number | string) => {
  // 尝试转为数字
  const timestamp = Number(_val)
  if (!isNaN(timestamp)) return timestamp

  // 尝试转为标准时间
  const date = new Date(`${_val}`)
  if (date.getTime) return date.getTime()
  return 0
}

/**
 * 格式化时间
 * @param _val Date | number | string
 * @param _format 格式化模板 YYYY-MM-DD hh:mm:ss
 * @example timeFormat('2024/09/24 04:06:06', 'YYYY-MM-DD hh:mm:ss')
 * @returns 格式化后的字符串
 */
export const timeFormat = (_val?: Date | number | string, _format: string = 'YYYY-MM-DD'): string => {
  const timestamp = timeStamp(_val) // 尝试转为数字时间戳

  const date = new Date(timestamp)

  // 正常对日期的处理
  const opts = [
    { k: 'Y+', v: `${date.getFullYear()}` }, // 年
    { k: 'M+', v: `${date.getMonth() + 1}` }, // 月
    { k: 'D+', v: `${date.getDate()}` }, // 日
    { k: 'h+', v: `${date.getHours()}` }, // 时
    { k: 'm+', v: `${date.getMinutes()}` }, // 分
    { k: 's+', v: `${date.getSeconds()}` } // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  ]

  let ret
  for (let { k, v } of opts) {
    ret = new RegExp(`(${k})`).exec(_format)
    if (ret) {
      let str = ret[1]
      let k_format = v.padStart(str.length, '0') // 生成替换内容 补足0位
      _format = _format.replace(str, k_format) // 替换
    }
  }
  return _format
}

/**
 * 多久之前时间
 * @param _val Date | number | string
 * @param format 格式化模板 YYYY-MM-DD hh:mm:ss
 * @example timeFrom(new Date().getTime() - 5600000)
 * @returns 格式化后的字符串
 */
export const timeFrom = (_val?: Date | number | string, _format: string = 'YYYY-MM-DD'): string => {
  const timestamp = timeStamp(_val) // 尝试转为数字时间戳

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
      if (!_format) {
        if (timer >= 2592000 && timer < 365 * 86400) {
          tips = Math.floor(timer / (86400 * 30)) + '个月前'
        } else {
          tips = Math.floor(timer / (86400 * 365)) + '年前'
        }
      } else {
        tips = `${timeFormat(timer, _format)}`
      }
  }
  return tips
}

/**
 * ArrayBuffer转十六进制
 * @param _buffer arrayBuffer
 * @returns 十六进制字符串
 */
export const ab2hex = (_buffer: ArrayBuffer = new ArrayBuffer(0)): string => {
  if (!_buffer) return _buffer
  const hexArr = Array.prototype.map.call(new Uint8Array(_buffer), function (bit) {
    return ('00' + bit.toString(16)).slice(-2)
  })
  return hexArr.join('').toUpperCase()
}

/**
 * 十六进制转ArrayBuffer
 * @param _str 十六进制字符串
 * @returns buffer
 */
export const hex2ab = (_str: string = ''): ArrayBuffer => {
  let buffer = new ArrayBuffer(_str.length * 0.5)
  let dataView = new DataView(buffer)
  for (let i = 0; i < _str.length; i++) {
    if (i % 2 === 0) {
      dataView.setUint8(i * 0.5, parseInt(_str.slice(i, i + 2), 16))
    }
  }
  return buffer
}

/**
 * 十六进制转ASCII码
 * @param _hexCharCodeStr 16进制字符串
 * @returns 转换后的ASCII码
 */
export const hex2str = (_hexCharCodeStr: string = ''): string => {
  let trimedStr = _hexCharCodeStr.trim()
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
  return resultStr.join('')
}

/**
 * 短划线转换驼峰
 * @param _str 短横线字符串
 * @returns 驼峰字符串
 */
export const line2hump = (_str: string = ''): string => {
  const str = _str.replace(/\-(\w)/g, (_, letter) => {
    const new_letter = letter.toUpperCase()
    return new_letter
  })
  return str
}

/**
 * 驼峰转换短横线
 * @param _str 驼峰字符串
 * @returns 短横线字符串
 */
export const hump2line = (_str: string = ''): string => {
  let str = _str.replace(/([A-Z])/g, '-$1').toLowerCase()
  // 头部横线
  const isGreat = str.slice(0, 1) === '-'
  if (isGreat) {
    str = str.replace('-', '')
  }

  return str
}

/**
 * 去除首尾空格
 * @param _str 字符串
 * @returns 结果字符串
 */
export const delSpaces = (_str: string = ''): string => {
  return _str.replace(/(^\s*)|(\s*$)/g, '')
}

/**
 * 获取校准后的当前时间时间戳
 * @param _offset 校准小时
 * @returns timestamp 13位时间戳
 */
export const getTime = (_offset: number = 0): number => {
  return new Date().getTime() + 1000 * 60 * 60 * _offset // + 8小时
}
