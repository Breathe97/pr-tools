/**
 * 随机生成uuid
 * @param _len 长度
 * @param _radix 进制
 * @returns 随机uuid
 */
export const uuid = (_len: number = 32, _radix: 2 | 10 | 16 = 16) => {
  let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
  let uuid: string[] = [],
    i
  _radix = _radix || chars.length
  if (_len) {
    // Compact form
    for (i = 0; i < _len; i++) uuid[i] = chars[0 | (Math.random() * _radix)]
  } else {
    // rfc4122, version 4 form
    let r
    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
    uuid[14] = '4'
    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16)
        uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r]
      }
    }
  }
  return uuid.join('')
}

/**
 * 随机生成区间数字
 * @param _min 最小数字（大于等于0）
 * @param _max 最大数字（大于等于1）
 * @returns 随机区间数字
 */
export const random = (_min = 0, _max = 1) => {
  _min = Math.max(0, _min)
  _max = Math.max(1, _max)
  let num = Math.random() * (_max - _min + 1) + _min
  return parseInt(`${num}`, 10)
}

/**
 * 随机生成昵称
 * @param _min 最小名称长度(最小1)
 * @param _max 最大名称长度(大于等于1)
 * @returns 随机昵称
 */
const mameStr = '徒靡绪风颢阳曜灵越扶应图町歧蜀魄漠泊穆皇星霜云今在兮译文欲行予墨青来上卿思贤望古子吟知有易寒非梦居然念唐致远听贤约书何夕北歌清川明庭之恒景行景湛清如问渠凌洲鸣珂彬蔚溯光广思南风到源至诚天诚归远知许沅芷澹雅池雨相宜漪涵遥清易安灵均梦西若云何君远山鹤扬亦河柳新雨晴盛晨惊鸿亦安阑梦如初一心亦行与谐凤兮夕照梧秋思悠得安清秋悠然钟秀冉竹如是喻新弦思月人青时望舒心素桑瑜暄和婉晚芊眠素晚穆沐霜秋'
export const randomName = (_min = 1, _max = 1) => {
  _min = Math.max(1, _min)
  _max = Math.max(1, _max)
  let startIndex = random(1, mameStr.length - (_max - _min))
  let endIndex = startIndex + random(_min, _max)
  let str = mameStr.slice(startIndex, endIndex)
  return str
}

/**
 * 把数字分割为千分位计量的字符串
 * @param _number 数值
 * @returns 千分位计量的字符串
 */
export const num2split = (_number = '') => {
  // 传入的是空字符串
  if (_number === '') return _number
  let n = Number(_number)
  // 如果传入的是非数 直接返回
  if (isNaN(n)) return _number
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
 * 把一纬数组按指定长度分割
 * @param _arr 一纬数组
 * @param _size 分割长度
 * @returns 分割后的二维数组
 */
export const arrSlice = (_arr = [], _size = 0) => {
  // size=5，要分割的长度
  const arrNum = Math.ceil(_arr.length / _size) // Math.ceil()向上取整的方法，用来计算拆分后数组的长度
  let index = 0 // 定义初始索引
  let resIndex = 0 // 用来保存每次拆分的长度
  const result = []
  while (index < arrNum) {
    result[index] = _arr.slice(resIndex, _size + resIndex)
    resIndex += _size
    index++
  }
  return result
}

/**
 * 在数组里面向上向下取整数的一个范围
 * @param _arr 多个数值的数组
 * @param _accuracy 间隔精度
 * @returns [min,max]
 * @notes 例如传入[-13,37,67] 返回 [-20,70] ,类似于[0,0]将会返回[0,10]
 * @notes 常在echart中使用  const [yAxisMin, yAxisMax] = getArrRange([1,87], 10) // 取区间整数 [1,87] => [0,90]
 * @example
 * getArrRange([-13, 37, 67]) // [-20,70]
 * getArrRange([0, 0], 10) // [0,10]
 */

export const getArrRange = (_arr = [], _accuracy = 10) => {
  let min = 0
  let max = 100
  // 去除非数
  _arr = _arr.filter((item) => !isNaN(item))
  // 对arr进行排序
  _arr = _arr.sort((a, b) => (Number(a) < Number(b) ? -1 : 1))
  min = _arr[0]
  _arr.reverse()
  max = _arr[0]
  // 根据精度处理min，max
  min = Math.floor(min / _accuracy) * _accuracy
  max = Math.ceil(max / _accuracy) * _accuracy
  // 如果min与max相等max需要递增一个差值
  if (min === max) {
    max += _accuracy
  }
  return [min, max]
}

/**
 * 筛选对象中指定的key
 * @param _obj 需要筛选的对象
 * @param _keys 需要哪些字段
 * @param _ignoreUndefined 是否忽略值为undefined的字段 默认为true
 * @returns {} 筛选后的对象
 */
export const filter_Keys = <T extends { [key: string]: unknown }>(_obj: T, _keys: (keyof T)[] = [], _ignoreUndefined = true): { [key: string]: unknown } => {
  let data: any = {}
  if (_keys.length === 0) return data
  for (const key of _keys) {
    const val = _obj[key]
    if (_ignoreUndefined && val === undefined) {
      data[key] = val
      continue
    }
    data[key] = val
  }
  return data
}
