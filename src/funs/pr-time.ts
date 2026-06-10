import { offsetTimeStamp, week_enum, d_timestamp, h_timestamp, m_timestamp, s_timestamp } from '../tools/index'
import type { K_week } from '../tools/index'

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
 * 格式化 token 替换（timeFormat / clockFormat 共用）
 * @param format 待替换的格式模板字符串
 * @param tokens token 列表，k 为正则片段（如 Y+），v 为对应值
 * @param onWeekToken 可选，处理含 W 的星期 token
 * @example applyFormatTokens('YYYY-MM', [{ k: 'Y+', v: '2024' }, { k: 'M+', v: '3' }])
 * @example applyFormatTokens('hh:mm', [{ k: 'h+', v: '9' }, { k: 'm+', v: '5' }])
 */
const applyFormatTokens = (format: string, tokens: { k: string; v: string }[], onWeekToken?: (matched: string, padded: string) => string): string => {
  let result = format
  for (const { k, v } of tokens) {
    result = result.replace(new RegExp(k, 'g'), (matched) => {
      let out = v.padStart(matched.length, '0')
      if (onWeekToken && matched.includes('W')) {
        out = onWeekToken(matched, out)
      }
      return out
    })
  }
  return result
}

/**
 * 获取时间戳，失败返回 0
 * @param _val 日期实例、毫秒时间戳或日期字符串，不传则取当前时间
 * @example timeStamp()
 * @example timeStamp('2024-05-23')
 * @example timeStamp(new Date('2024/11/06'))
 * @returns 毫秒时间戳
 */
export const timeStamp = (_val?: Date | number | string) => offsetTimeStamp(_val)

/**
 * 格式化时间
 * @param _val 待格式化的日期、时间戳或日期字符串
 * @param _format 格式模板，支持 YYYY、MM、DD、hh、mm、ss、WW（星期）、d（年第几天）、w（年第几周）等
 * @param _options 可选配置
 * @param _options.offset 时区差值，如中国 +480
 * @param _options.empty_str 无效时间时的占位符，默认 '-'
 * @example timeFormat('2024/11/06 04:06:06', 'YYYY-MM-DD hh:mm:ss')
 * @example timeFormat(Date.now(), 'YYYY-MM-DD 星期WW')
 * @example timeFormat(1727550913097, 'YYYY年第w周')
 * @returns 格式化字符串，失败返回 empty_str（默认 '-'）
 */
export const timeFormat = (_val?: Date | number | string, _format: string = 'YYYY-MM-DD hh:mm:ss', _options: Time_Options = {}): string => {
  const options = { empty_str: '-', ..._options }
  const { empty_str, offset } = options
  const timestamp = offsetTimeStamp(_val, offset)
  if (Number(_val) !== 0 && timestamp === 0) return empty_str
  const date = new Date(timestamp)
  const year = date.getFullYear()
  const monthNum = date.getMonth() + 1
  const Y = `${year}`
  const M = `${monthNum}`
  const Q = `${Math.ceil(monthNum / 3)}` // 用数字算季度
  const D = `${date.getDate()}`
  const W = `${date.getDay() === 0 ? 7 : date.getDay()}`
  const h = `${date.getHours()}`
  const m = `${date.getMinutes()}`
  const s = `${date.getSeconds()}`
  const yearStart = new Date(year, 0, 1).getTime()
  const dayOfYear = Math.floor((timestamp - yearStart) / d_timestamp) + 1
  const d = `${dayOfYear}`
  const w = `${Math.ceil((dayOfYear - Number(W)) / 7) + 1}`
  return applyFormatTokens(_format, [{ k: 'Y+', v: Y }, { k: 'M+', v: M }, { k: 'Q+', v: Q }, { k: 'D+', v: D }, { k: 'W+', v: W }, { k: 'h+', v: h }, { k: 'm+', v: m }, { k: 's+', v: s }, { k: 'd+', v: d }, { k: 'w+', v: w }], (_matched, padded) => week_enum[padded.slice(0, 2) as K_week] ?? padded)
}

/**
 * 相对时间描述（刚刚、N分钟前等）
 * @param _val 目标时间，Date、时间戳或日期字符串
 * @param _format 超过约 30 天后使用的绝对时间格式；不传则继续显示「N个月前」「N年前」
 * @param _options 可选配置
 * @param _options.offset 时区差值
 * @param _options.empty_str 无效时间占位符，默认 '-'
 * @example timeFrom(Date.now() - 5600000) // '1小时前'
 * @example timeFrom(Date.now() - 120000)  // '刚刚'
 * @example timeFrom('2020-01-01', 'YYYY-MM-DD') // 过久时显示绝对日期
 * @returns 相对或绝对时间字符串
 */
export const timeFrom = (_val?: Date | number | string, _format?: string, _options: Time_Options = {}): string => {
  const options = { empty_str: '-', ..._options }
  const { empty_str, offset } = options
  const timestamp = offsetTimeStamp(_val, offset)
  if (Number(_val) !== 0 && timestamp === 0) return empty_str
  let seconds = Math.floor((Date.now() - timestamp) / 1000)
  // 未来时间
  if (seconds < 0) {
    return _format ? timeFormat(timestamp, _format, _options) : '刚刚'
  }
  if (seconds < 300) return '刚刚'
  if (seconds < 3600) return `${Math.floor(seconds / 60)}分钟前`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}小时前`
  if (seconds < 2592000) return `${Math.floor(seconds / 86400)}天前`
  if (!_format) {
    // 近似：月=30天，年=365天
    if (seconds < 365 * 86400) return `${Math.floor(seconds / (86400 * 30))}个月前`
    return `${Math.floor(seconds / (86400 * 365))}年前`
  }
  return timeFormat(timestamp, _format, _options)
}

/**
 * 将毫秒时长格式化为 DD:hh:mm:ss 等
 * @param _val 毫秒时长
 * @param _format 格式模板，支持 D（天）、h（时）、m（分）、s（秒）
 * @example clockFormat(3661000, 'hh:mm:ss') // '01:01:01'
 * @example clockFormat(90061000, 'D天hh:mm:ss')
 * @example clockFormat(65000, 'mm:ss') // '01:05'
 * @returns 格式化后的时长字符串
 */
export const clockFormat = (_val: number, _format: string = 'hh:mm:ss'): string => {
  let remain = _val
  const D = `${Math.floor(remain / d_timestamp)}`
  if (_format.includes('D')) remain %= d_timestamp
  const H = `${Math.floor(remain / h_timestamp)}`
  if (_format.includes('h')) remain %= h_timestamp
  const M = `${Math.floor(remain / m_timestamp)}`
  if (_format.includes('m')) remain %= m_timestamp
  const S = `${Math.floor(remain / s_timestamp)}`
  return applyFormatTokens(_format, [{ k: 'D+', v: D }, { k: 'h+', v: H }, { k: 'm+', v: M }, { k: 's+', v: S }])
}

/**
 * 获取某个时间所在周/月/自定义天数的日期列表
 * @param _val 基准时间，Date、时间戳或日期字符串
 * @param _options 可选配置
 * @param _options.range 范围类型：'week' 本周、'month' 本月，或数字表示连续天数
 * @param _options.split 是否按基准日分割为三段，默认 false
 * @param _options.offset_d 天数偏移，-1 表示整体向前移 1 天
 * @param _options.format 输出日期格式，默认 'YYYY-MM-DD'
 * @param _options.offset 时区差值
 * @param _options.empty_str 无效时间占位符
 * @example timeRange(new Date().getTime())
 * @example timeRange(Date.now(), { range: 'week' })
 * @example timeRange(Date.now(), { range: 10, format: 'MM/DD' })
 * @returns 日期字符串数组
 */
export const timeRange = (_val?: Date | number | string, _options: TimeRange_Options = {}) => {
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

/**
 * 按时间维度生成区间内的标签序列
 * @param _start 开始时间戳（毫秒）
 * @param _end 结束时间戳（毫秒）
 * @param dimension 时间维度：H 时、D 天、W 周、M 月、Q 季、Y 年
 * @example timeDimension(start, end, 'D') // ['2024-06-01', '2024-06-02', ...]
 * @example timeDimension(start, end, 'M') // ['2024-06', '2024-07', ...]
 * @example timeDimension(start, end, 'H') // ['2024-06-01 10:00', ...]
 * @returns 格式化后的时间标签数组
 */
export const timeDimension = (_start: number, _end: number, dimension: 'H' | 'D' | 'W' | 'M' | 'Q' | 'Y' = 'D'): string[] => {
  const arr: string[] = []
  const end = timeStamp(_end)
  let cur = new Date(timeStamp(_start))
  const formatMap = {
    H: 'YYYY-MM-DD hh:00',
    D: 'YYYY-MM-DD',
    W: 'YYYY-MM-DD',
    M: 'YYYY-MM',
    Q: 'YYYY-QQ',
    Y: 'YYYY'
  } as const
  while (cur.getTime() <= end) {
    arr.push(timeFormat(cur.getTime(), formatMap[dimension]))
    switch (dimension) {
      case 'H':
        cur = new Date(cur.getTime() + h_timestamp)
        break
      case 'D':
        cur = new Date(cur.getTime() + d_timestamp)
        break
      case 'W':
        cur = new Date(cur.getTime() + d_timestamp * 7)
        break
      case 'M':
        cur = new Date(cur.getFullYear(), cur.getMonth() + 1, 1)
        break
      case 'Q':
        cur = new Date(cur.getFullYear(), cur.getMonth() + 3, 1)
        break
      case 'Y':
        cur = new Date(cur.getFullYear() + 1, 0, 1)
        break
    }
  }
  return arr
}
