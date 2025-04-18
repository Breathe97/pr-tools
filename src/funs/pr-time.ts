import { offsetTimeStamp, week_enum, d_timestamp, h_timestamp, m_timestamp, s_timestamp } from '../tools/index'
import type { K_week } from '../tools/index'

interface Time_Options {
  /**
   * 时区差值 如中国 +480，不传则以当前环境为准 不进行修正
   */
  offset?: number

  /**
   * 占位符 格式化失败显示的内容 默认为 -
   */
  empty_str?: string
}

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
 * @param _options _options: { offset?: number; empty_str?: string }
 * @example timeFormat('2024/09/24 04:06:06', 'YYYY-MM-DD hh:mm:ss')
 * @returns 格式化后的字符串
 */
export const timeFormat = (_val?: any, _format: string = 'YYYY-MM-DD hh:mm:ss', _options: Time_Options = {}): string => {
  const options = { empty_str: '-', ..._options }
  const { empty_str, offset } = options

  const timestamp = offsetTimeStamp(_val, offset) // 尝试转为数字时间戳并修正时区

  if (Number(_val) !== 0 && timestamp === 0) return empty_str // 错误时间

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
 * @param _options _options: { offset?: number; empty_str?: string }
 * @example timeFrom(new Date().getTime() - 5600000)
 * @returns 格式化后的字符串
 */
export const timeFrom = (_val?: any, _format: string = 'YYYY-MM-DD hh:mm:ss', _options: Time_Options = {}): string => {
  const options = { empty_str: '-', ..._options }
  const { empty_str, offset } = options

  const timestamp = offsetTimeStamp(_val, offset) // 尝试转为数字时间戳并修正时区

  if (Number(_val) !== 0 && timestamp === 0) return empty_str // 错误时间

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

interface TimeRange_Options extends Time_Options {
  /**
   * 生成范围 本周 | 本月 'week' | 'month' = 'month'
   */
  range?: 'week' | 'month' | number

  /**
   * 是否按照传入时间进行分割 默认为 false
   */
  split?: boolean

  /**
   * 如果偏移天数 默认为 0 , -1 则所有结果向前偏移1天
   */
  offset_d?: number

  /**
   * 输出的日期格式 默认为 YYYY-MM-DD
   */
  format?: string
}

/**
 * 时钟格式化
 * @param _val Date | number | string
 * @param format 格式化模板 DD:hh:mm:ss
 * @example clockFormat(new Date().getTime() - 5600000)
 * @returns 格式化后的字符串
 */
export const clockFormat = (_val: number, _format: string = 'hh:mm:ss'): string => {
  const D = `${Math.floor(_val / d_timestamp)}`
  if (_format.includes('D')) {
    _val = _val % d_timestamp
  }

  const H = `${Math.floor(_val / h_timestamp)}`
  if (_format.includes('h')) {
    _val = _val % h_timestamp
  }

  const M = `${Math.floor(_val / m_timestamp)}`
  if (_format.includes('m')) {
    _val = _val % m_timestamp
  }

  const S = `${Math.floor(_val / s_timestamp)}`
  if (_format.includes('s')) {
    _val = _val % s_timestamp
  }
  // 正常对日期的处理
  const opts = [
    { k: 'D+', v: D }, // 日
    { k: 'h+', v: H }, // 时
    { k: 'm+', v: M }, // 分
    { k: 's+', v: S } // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  ]

  let ret
  for (let { k, v } of opts) {
    ret = new RegExp(`(${k})`).exec(_format)
    if (ret) {
      const str = ret[1]
      let k_format = v.padStart(str.length, '0') // 生成替换内容 补足0位
      _format = _format.replace(str, k_format) // 替换
    }
  }
  return _format
}

/**
 * 获取某个时间的范围日期
 * @param _val Date | number | string
 * @param _options _options: { offset?: number; empty_str?: string }
 * @example timeRange(new Date().getTime())
 * @returns [] 该范围的每一天集合
 */
export const timeRange = (_val?: any, _options: TimeRange_Options = {}) => {
  const options = { range: 'month', format: 'YYYY-MM-DD', empty_str: '-', split: false, offset_d: 0, ..._options }
  const { range, empty_str, offset, split, offset_d, format } = options

  const timestamp = offsetTimeStamp(_val, offset) // 尝试转为数字时间戳并修正时区

  if (Number(_val) !== 0 && timestamp === 0) return Array(31).fill(empty_str) // 错误时间 返回最大长度的数组占位

  const time_str = timeFormat(timestamp, 'YYYY-MM-D-W')
  const [Y, M, D, W] = time_str.split('-')
  let max_length = 0 // 数组个数
  let _offset_d = -offset_d

  switch (range) {
    case 'week':
      {
        _offset_d = _offset_d + Number(W)
        max_length = 7
      }
      break
    case 'month':
      {
        _offset_d = _offset_d + Number(D)
        max_length = new Date(Number(Y), Number(M), 0).getDate() // 当前月最大天数
      }
      break
    default:
      {
        _offset_d = _offset_d + 1
        max_length = typeof range === 'number' ? range : 0
      }
      break
  }

  // 开始生成
  let arr = []
  {
    let startTimestamp = timestamp - _offset_d * d_timestamp // 开始
    let index = 0
    while (index < max_length) {
      index++
      const _timestamp = startTimestamp + index * d_timestamp
      const str = timeFormat(_timestamp, format)
      arr.push(str)
    }
  }
  // 分割
  if (split) {
    const index = _offset_d - 1 // 目标天索引
    arr = [arr.slice(0, index), arr.slice(index, _offset_d), arr.slice(_offset_d)]
  }
  return arr
}
