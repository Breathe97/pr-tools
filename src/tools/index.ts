/**
 * 修正时间戳，失败返回 0
 * @param _val 日期、时间戳或日期字符串
 * @param _offset 时区差值，如中国 +480；不传则按当前环境
 * @example offsetTimeStamp() // 当前时间戳
 * @example offsetTimeStamp('2024-05-23') // 日期字符串
 * @example offsetTimeStamp(1727550913097, 480) // 指定时区偏移
 * @returns 毫秒时间戳，失败为 0
 */
export const offsetTimeStamp = (_val?: Date | number | string, _offset?: number) => {
  try {
    // 空值视为无效输入
    if (_val === undefined || _val === null || _val === '') return 0
    let timestamp: number
    if (_val instanceof Date) {
      timestamp = _val.getTime()
    } else if (typeof _val === 'number') {
      timestamp = _val
    } else {
      const date = new Date(_val)
      if (Number.isNaN(date.getTime())) return 0
      timestamp = date.getTime()
    }
    if (Number.isNaN(timestamp)) return 0
    // 修正到目标时区
    if (_offset !== undefined) {
      const timezoneOffset = new Date().getTimezoneOffset()
      timestamp += (timezoneOffset + _offset) * 60 * 1000
    }
    return timestamp
  } catch (error) {
    console.error('offsetTimeStamp error', { _val, _offset, error })
    return 0
  }
}

/**
 * 一秒的毫秒数
 * @example s_timestamp // 1000
 */
export const s_timestamp = 1000 // 秒

/**
 * 一分钟的毫秒数
 * @example m_timestamp // 60000
 */
export const m_timestamp = s_timestamp * 60 // 分

/**
 * 一小时的毫秒数
 * @example h_timestamp // 3600000
 */
export const h_timestamp = m_timestamp * 60 // 时

/**
 * 一天的毫秒数
 * @example d_timestamp // 86400000
 */
export const d_timestamp = h_timestamp * 24 // 天

/**
 * 星期数字与中文映射表，供 timeFormat 的 WW 占位符使用
 * @example week_enum['01'] // '一'
 */
export const week_enum = {
  ['1']: '1',
  ['2']: '2',
  ['3']: '3',
  ['4']: '4',
  ['5']: '5',
  ['6']: '6',
  ['7']: '7',
  ['01']: '一',
  ['02']: '二',
  ['03']: '三',
  ['04']: '四',
  ['05']: '五',
  ['06']: '六',
  ['07']: '日'
} as const

export type T_week = typeof week_enum
export type K_week = keyof T_week
