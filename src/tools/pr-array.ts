/**
 * 把一纬数组按指定长度分割
 * @param _arr 一纬数组
 * @param _size 分割长度
 * @example arrSlice([1, 2, 3, 4, 5], 2)
 * @returns 分割后的二维数组
 */
export const arrSlice = (_arr: any[] = [], _size = 0) => {
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
 * @notes 常在echart中使用  const [yAxisMin, yAxisMax] = arrRange([1,87], 10) // 取区间整数 [1,87] => [0,90]
 * @example
 * arrRange([-13, 37, 67]) // [-20,70]
 * arrRange([0, 0], 10) // [0,10]
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
 * @param _cover 如果有重复 是否进行覆盖
 * @example arrFilterDup(arr, ['name', 'age'])
 * @returns 去重后的数组
 */
export const arrFilterDup = <T extends { [key: string]: unknown }>(_arr: T[], _keys: Array<keyof T> = [], _cover = true) => {
  const map = new Map()!
  for (const obj of _arr) {
    let key = 'map'
    for (const _key of _keys) {
      key += `-${obj[_key]}`
    }
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
