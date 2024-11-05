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
 * 字节单位转换
 * @param _bytes 字节
 * @param _splitStr 值与单位的分割符 默认为一个空格
 * @returns 格式化后的字符串
 */

export const bytesFormat = (_bytes: number, _splitStr = ' '): string => {
  const units = ['KB', 'MB', 'GB', 'TB']
  let unit = 'B'
  let num = _bytes
  for (const key of units) {
    unit = key
    num = num / 1024
    if (num < 1024) break
  }
  return `${num.toFixed(2)}${_splitStr}${unit}`
}

/**
 * 把数字分割为千分位计量的字符串
 * @param _number 数值
 * @example num2split(123456789)
 * @returns 千分位计量的字符串
 */
export const num2split = (_number: number | string): string => {
  let n = Number(_number)
  // 如果传入的是非数 直接返回
  if (isNaN(n)) return `${_number}`
  let r = ''
  let temp
  let mod
  do {
    // 求模的值， 用于获取高三位，这里可能有小数
    mod = n % 1000
    // 值是不是大于1，是继续的条件
    n = n / 1000
    // 高三位
    temp = ~~mod
    r = (n >= 1 ? `${temp}`.padStart(3, '0') : temp) + (!!r ? ',' + r : '')
  } while (n >= 1)
  const strNumber = _number + ''
  let index = strNumber.indexOf('.')
  // 拼接小数部分
  if (index >= 0) {
    r += strNumber.substring(index)
  }
  return r
}

/**
 * 筛选 对象 中指定的key
 * @param _obj 需要筛选的 对象
 * @param _keys 需要筛选哪些字段
 * @example filterKeys(_obj, ['lable', 'name'])
 * @returns 筛选后结果 传入对象返回对象 传入数组返回数组
 */
export const filterKeys = <T extends Record<string | number, any>, K extends keyof T>(_obj: T, _keys: K[] = []) => {
  const obj = { ..._obj }
  const keys = Object.keys(obj)
  for (const key of keys) {
    const index = _keys.findIndex((_key) => String(_key) === key)
    // 需要删除
    if (index === -1) {
      delete obj[key]
    }
  }
  return obj
}

/**
 * 生成高亮字符串的html
 * @param _text 过来的字符串
 * @param _keys 关键词数组 string[]
 * @example highlight('123456', ['3', '5'])
 * @returns 处理后的 html 字符串
 */
export const highlight = (_text: string, _keys: string[], _options: { flags?: 'g' | 'gi'; style?: string } = {}) => {
  const keys = _keys.filter((val) => val !== '')
  if (keys.length === 0) return _text
  const options = { flags: 'gi', style: 'text-decoration: underline;text-decoration-color: red;text-underline-offset: 0.2em;', ..._options }
  const { flags, style } = options
  const key_str = keys.join('|')
  const reg = new RegExp(`(${key_str})`, flags)
  const arr = _text.split(reg)
  const endArr = []
  for (const val of arr) {
    const fall = reg.test(val)
    const str = fall ? `<span style="${style}">${val}</span>` : val
    endArr.push(str)
  }
  const str = endArr.join('')
  return str
}
