interface TimeStamp {
  (): number
  (_val?: undefined): 0
  (_val?: string): number | 0
  (_val?: Date): number
  (_val?: number): number
}

/**
 * 转换时间戳
 * @param _val 任意可转换时间 不传则默认当前时间 转换失败返回 0
 * @returns 转换后的时间戳 | 0
 */
export const timeStamp = ((...args) => {
  // 如果没有传入参数
  if (args.length === 0) return Date.now()
  const [_val] = args
  // 如果传入 undefined
  if (_val === undefined) return 0

  let date
  // 如果传入的是字符串
  if (typeof _val === 'string') {
    date = new Date(_val)
    // 无效的日期格式
    if (`${date}` === 'Invalid Date') {
      // 尝试转为number再次转换
      date = new Date(Number(_val))
    }
  }
  if (!date || `${date}` === 'Invalid Date') return 0

  return date.getTime()
}) as TimeStamp

let a = 0
a = timeStamp(undefined)
console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:timeStamp(undefined)`, a)

a = timeStamp()
console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:timeStamp()`, a)
