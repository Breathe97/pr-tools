import { offsetTimeStamp, week_enum, d_timestamp } from '../tools/index'
import type { K_week } from '../tools/index'

/**
 * 获取时间戳 失败返回 0
 * @param _val Date | number | string
 * @example timeStamp()
 * @example timeStamp('2024-05-23')
 * @returns 转换后的时间戳 | 0
 */
export const timeStamp = (_val?: Date | number | string) => offsetTimeStamp(_val)

/**
 * 格式化时间
 * @param _val Date | number | string
 * @param _format 格式化模板 YYYY-MM-DD hh:mm:ss
 * @param _offset 时区差值 如中国 +480，不传则以当前环境为准 不进行修正
 * @param _empty_str 占位符 格式化失败显示的内容 默认为 -
 * @example timeFormat('2024/09/24 04:06:06', 'YYYY-MM-DD hh:mm:ss')
 * @returns 格式化后的字符串
 */
export const timeFormat = (_val?: any, _format: string = 'YYYY-MM-DD hh:mm:ss', _offset?: number, _empty_str: string = '-'): string => {
  const timestamp = offsetTimeStamp(_val, _offset) // 尝试转为数字时间戳并修正时区

  if (Number(_val) !== 0 && timestamp === 0) return _empty_str // 错误时间

  const date = new Date(timestamp)

  // 正常对日期的处理
  const opts = [
    { k: 'Y+', v: `${date.getFullYear()}` }, // 年
    { k: 'M+', v: `${date.getMonth() + 1}` }, // 月
    { k: 'D+', v: `${date.getDate()}` }, // 日
    { k: 'W+', v: `${date.getDay()}` }, // 周
    { k: 'h+', v: `${date.getHours()}` }, // 时
    { k: 'm+', v: `${date.getMinutes()}` }, // 分
    { k: 's+', v: `${date.getSeconds()}` } // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  ]

  let ret
  for (let { k, v } of opts) {
    ret = new RegExp(`(${k})`).exec(_format)
    if (ret) {
      const str = ret[1]
      let k_format = v.padStart(str.length, '0') // 生成替换内容 补足0位
      // 周需要单独处理
      if (str.includes('W')) {
        k_format = week_enum[k_format.slice(0, 2) as K_week]
      }
      _format = _format.replace(str, k_format) // 替换
    }
  }
  return _format
}

/**
 * 多久之前时间
 * @param _val Date | number | string
 * @param format 格式化模板 YYYY-MM-DD hh:mm:ss
 * @param _offset 时区差值 如中国 +480，不传则以当前环境为准 不进行修正
 * @param _empty_str 占位符 格式化失败显示的内容 默认为 -
 * @example timeFrom(new Date().getTime() - 5600000)
 * @returns 格式化后的字符串
 */
export const timeFrom = (_val?: any, _format: string = 'YYYY-MM-DD hh:mm:ss', _offset?: number, _empty_str: string = '-'): string => {
  const timestamp = offsetTimeStamp(_val, _offset) // 尝试转为数字时间戳并修正时区

  if (Number(_val) !== 0 && timestamp === 0) return _empty_str // 错误时间

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
 * 获取某个时间的范围日期
 * @param _val Date | number | string
 * @param _range_type 本周 | 本月 'week' | 'month' = 'month'
 * @param _offset 时区差值 如中国 +480，不传则以当前环境为准 不进行修正
 * @param _empty_str 占位符 格式化失败显示的内容 默认为 -
 * @example timeRange(new Date().getTime())
 * @returns [] 该范围的每一天集合
 */
export const timeRange = (_val?: any, _range_type: 'week' | 'month' = 'month', _offset?: number, _empty_str: string = '-') => {
  const timestamp = offsetTimeStamp(_val, _offset) // 尝试转为数字时间戳并修正时区
  if (isNaN(_val) && timestamp === 0) return Array(31).fill(_empty_str) // 错误时间 返回最大长度的数组占位
  const time_str = timeFormat(timestamp, 'YYYY-MM-D-W')
  const [Y, M, D, W] = time_str.split('-')

  // 开始生成
  let arr = []
  switch (_range_type) {
    case 'week':
      {
        let startTimestamp = timestamp - Number(W) * d_timestamp
        let index = 0
        while (index < 7) {
          index++
          const timestamp = startTimestamp + index * d_timestamp
          const str = timeFormat(timestamp, 'YY/MM/DD')
          arr.push(str)
        }
      }
      break
    case 'month':
      {
        let startTimestamp = timestamp - Number(D) * d_timestamp
        let index = 0
        while (index < 31) {
          index++
          const timestamp = startTimestamp + index * d_timestamp
          const str = timeFormat(timestamp, 'DD')
          arr.push(str)
        }
        arr = [...new Set(arr)]
        arr = Array.from(arr, (D) => `${Y}/${M}/${D}`)
      }
      break
  }
  return arr
}
