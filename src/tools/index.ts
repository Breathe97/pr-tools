/**
 * 修正时间戳 失败返回 0
 * @param _val Date | number | string
 * @param _offset 时区差值 如中国 +480，不传则以当前环境为准 不进行修正
 * @example offsetTimeStamp(1727550913097, 480)
 * @returns 转换后的时间戳 | 0
 */
export const offsetTimeStamp = (_val?: Date | number | string, _offset?: number) => {
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
