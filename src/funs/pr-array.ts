import { filterKeys } from './pr-transfer'
/**
 * 一维数组按长度切分为二维数组
 * @param _arr 待切分的一维数组
 * @param _size 每段长度，最小为 1
 * @example arrSlice([1, 2, 3, 4, 5], 2) // [[1,2],[3,4],[5]]
 * @example arrSlice(['a', 'b', 'c'], 1) // [['a'],['b'],['c']]
 * @example arrSlice([], 3) // []
 * @returns 二维数组
 */
export const arrSlice = <T>(_arr: T[], _size: number): T[][] => {
  const size = Math.max(1, _size)
  const result: T[][] = []
  for (let i = 0; i < _arr.length; i += size) {
    result.push(_arr.slice(i, i + size))
  }
  return result
}

/**
 * 计算图表 Y 轴友好区间 [min, max]
 * @param _arr 数值数组，非数字项会被忽略
 * @param _accuracy 刻度对齐精度，默认 10
 * @example arrRange([-13, 37, 67]) // [-20, 70]
 * @example arrRange([0, 0], 10) // [0, 10]
 * @example arrRange([1, 87], 10) // [0, 90]
 * @returns [min, max]
 */
export const arrRange = (_arr: Array<any> = [], _accuracy = 10) => {
  let min = Infinity
  let max = -Infinity
  for (const item of _arr) {
    const n = Number(item)
    if (Number.isNaN(n)) continue
    if (n < min) min = n
    if (n > max) max = n
  }
  if (min === Infinity) return [0, _accuracy]
  min = Math.floor(min / _accuracy) * _accuracy
  max = Math.ceil(max / _accuracy) * _accuracy
  if (min === max) max += _accuracy
  return [min, max]
}

/**
 * 按字段组合去重
 * @param _arr 对象数组
 * @param _keys 参与去重的字段名列表；为空则返回浅拷贝
 * @param _cover 重复时是否用后者覆盖前者，默认 true
 * @example arrFilterDup([{age:10},{age:10},{age:12}], ['age']) // 保留两条 age 不同
 * @example arrFilterDup(arr, ['name','age'], true)  // 重复时后者覆盖
 * @example arrFilterDup(arr, ['name','age'], false) // 重复时保留前者
 * @returns 去重后的数组
 */
export const arrFilterDup = <T extends Record<string | number, any>, K extends keyof T>(_arr: T[], _keys: K[] = [], _cover = true): T[] => {
  if (_keys.length === 0) return [..._arr]
  const map = new Map<string, T>()
  for (const obj of _arr) {
    const key = JSON.stringify(_keys.map((k) => obj[k]))
    if (!map.has(key)) {
      map.set(key, obj)
      continue
    }
    if (_cover) map.set(key, obj)
  }
  return [...map.values()]
}

/**
 * 批量筛选对象数组中的指定字段
 * @param _arr 对象数组
 * @param _keys 需要保留的字段名列表
 * @example arrFilterKeys([{a:1,b:2},{a:3,b:4}], ['a']) // [{a:1},{a:3}]
 * @example arrFilterKeys(users, ['name', 'age'])
 * @example arrFilterKeys([], ['id']) // []
 * @returns 筛选后的对象数组
 */
export const arrFilterKeys = <T extends Record<string | number, any>, K extends keyof T>(_arr: T[], _keys: K[] = []) => _arr.map((obj) => filterKeys(obj, _keys))

/**
 * 枚举对象转 { label, value } 数组
 * @param _enum 枚举对象，键为 value，值为 label
 * @param _value_name 输出对象中 value 字段名，默认 'value'
 * @param _label_name 输出对象中 label 字段名，默认 'label'
 * @example arrFromEnum({ a: '标签A', b: '标签B' }) // [{label:'标签A',value:'a'},...]
 * @example arrFromEnum(obj, 'key', 'name')
 * @example arrFromEnum({ 1: '一', 2: '二' }, 'id', 'text')
 * @returns 键值对数组
 */
export const arrFromEnum = <T extends Record<string | number, any>, K extends string | number = 'value', V extends string | number = 'label'>(_enum: T, _value_name = 'value' as K, _label_name = 'label' as V) => {
  type Obj = { [key in K | V]: any }
  const arr: Obj[] = []
  for (const [value, label] of Object.entries(_enum)) {
    arr.push({ [_label_name]: label, [_value_name]: value } as Obj)
  }
  return arr
}
