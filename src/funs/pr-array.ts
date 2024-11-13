import { filterKeys } from './pr-transfer'
/**
 * 把一纬数组按指定长度分割
 * @param _arr 一纬数组
 * @param _size 分割长度
 * @example arrSlice([1, 2, 3, 4, 5], 2)
 * @returns 分割后的二维数组
 */
export const arrSlice = (_arr: Array<any>, _size: number) => {
  const size = Math.max(1, _size)
  const arrNum = Math.ceil(_arr.length / size) // Math.ceil()向上取整的方法，用来计算拆分后数组的长度
  const result = []
  for (let i = 0; i < arrNum; i++) {
    const start = i * size
    const end = Math.min(start + size, _arr.length)
    result.push(_arr.slice(start, end))
  }
  return result
}

/**
 * 在数组里面向上向下取整数的一个范围
 * @param _arr 多个数值的数组
 * @param _accuracy 间隔精度
 * @returns [min,max]
 * @notes 例如传入[-13,37,67] 返回 [-20,70] ,类似于[0,0]将会返回[0,10]
 * @notes 常在echart中使用  const [yAxisMin, yAxisMax] = arrRange([1,87], 10) // 取区间整数 [1,87] => [0,90]
 * @example arrRange([-13, 37, 67]) // [-20,70]
 * @example arrRange([0, 0], 10) // [0,10]
 */

export const arrRange = (_arr = [], _accuracy = 10) => {
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
 * 数组去重
 * @param _arr 数组
 * @param _keys 根据哪些字段去重
 * @param _cover 如果有重复 是否进行覆盖 默认为 true
 * @example arrFilterDup(arr, ['name', 'age'])
 * @returns 去重后的数组
 */
export const arrFilterDup = <T extends Record<string | number, any>, K extends keyof T>(_arr: T[], _keys: K[] = [], _cover = true): T[] => {
  const map = new Map()!
  for (const obj of _arr) {
    const arr = []
    for (const _key of _keys) {
      arr.push(obj[_key])
    }
    const key = `map-${arr.join('-')}`
    const has = map.has(key)
    if (!has) {
      map.set(key, obj)
      continue
    }
    // 进行覆盖
    if (_cover) {
      map.set(key, obj)
    }
  }
  const values = map.entries()
  const arr = Array.from(values, ([_, value]) => value)
  return arr
}

/**
 * 筛选 数组对象 中指定的key
 * @param _arr 需要筛选的对象数组
 * @param _keys 需要筛选哪些字段
 * @example arrFilterKeys(arr, ['label', 'name'])
 * @returns 筛选后结果 传入对象返回对象 传入数组返回数组
 */
export const arrFilterKeys = <T extends Record<string | number, any>, K extends keyof T>(_arr: T[], _keys: K[] = []) => {
  const arr = []
  for (const _obj of _arr) {
    const obj = filterKeys(_obj, _keys)
    arr.push(obj)
  }
  return arr
}

/**
 * 根据一个枚举对象生成 常用的键值对数组
 * @param _enum 枚举对象 { value: label }
 * @param _value_name 值名
 * @param _label_name 键名
 * @example arrFromEnum(obj, ['value', 'label'])
 * @returns 键值对数组
 */
export const arrFromEnum = <T extends Record<string | number, any>, K extends string | number = 'value', V extends string | number = 'label'>(_enum: T, _value_name = 'value' as K, _label_name = 'label' as V) => {
  type Obj = { [key in K | V]: any }
  const arr = []
  const items = Object.entries(_enum)
  for (const [value, label] of items) {
    const obj = { [_label_name]: label, [_value_name]: value } as Obj
    arr.push(obj)
  }
  return arr
}
