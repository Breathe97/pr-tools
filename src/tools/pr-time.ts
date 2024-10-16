/**
 * 时间戳 失败返回 0
 * @param _val Date | number | string
 * @param _offset 协调世界时（UTC）相对于当前时区的时间差值，单位为分钟
 * @example timeStamp()
 * @example timeStamp(1727550913097, 480)
 * @returns 转换后的时间戳 | 0
 */
export const timeStamp = (_val?: Date | number | string, _offset?: number) => {
  try {
    // 尝试转为数字
    let timestamp = Number(_val)

    // 如果不是数字 尝试转为标准时间 并获取时间戳
    if (isNaN(timestamp)) {
      const date = new Date(`${_val}`)
      if (`${date}` === 'Invalid Date') return 0
      timestamp = date.getTime()
    }

    // 传入时区差
    if (_offset !== undefined) {
      const timezoneOffset = new Date().getTimezoneOffset() // 当前时区偏差 例如 中国为 -480 传入 _offset = 480 的时候先纠正到0时区 再 + _offset
      timestamp += (timezoneOffset + _offset) * 60 * 1000
    }
    return timestamp
  } catch (error) {
    console.error('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->timeStamp:err`, { _val, _offset, error })
    return 0
  }
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
