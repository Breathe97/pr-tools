import { arrSlice } from './pr-array'

/**
 * 分段执行
 * @param _cuont 一共执行多少次 最小为 0
 * @param _step 每次执行多少次 最小为 1
 * @example stepExe(98, 7, ()=>{})
 * @returns 筛选后结果 传入对象返回对象 传入数组返回数组
 */
export const stepExe = async (_cuont: number, _step: number, _cb = async (_index: number, _cuonts: number[]) => {}) => {
  const cuont = Math.max(0, _cuont)
  const step = Math.min(cuont, Math.max(1, _step))

  let arr = Array(cuont)
  arr = Array.from(arr, (_, k) => k)
  arr = arrSlice(arr, step)
  for (const [index, cuonts] of arr.entries()) {
    await _cb(index, cuonts)
  }
  return arr
}
